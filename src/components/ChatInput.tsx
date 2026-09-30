import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent, DragEvent, ClipboardEvent } from 'react';
import {
  Send,
  Loader2,
  Sparkles,
  Mic,
  MicOff,
  Paperclip,
  Image as ImageIcon,
  FileText,
  Film,
  X,
  UploadCloud,
  FileSpreadsheet,
  FileCode,
  File,
  Eye,
  AlertCircle
} from 'lucide-react';
import { SupportedLanguage, AttachedFile, AttachedFileType } from '../types/index.ts';
import { useLanguage } from '../i18n/LanguageContext.tsx';

interface ChatInputProps {
  onSendMessage: (text: string, attachments?: AttachedFile[]) => void;
  isLoading: boolean;
  selectedLanguage?: SupportedLanguage;
  onPreviewFile?: (file: AttachedFile) => void;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionResultItem {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: {
    readonly length: number;
    [index: number]: SpeechRecognitionResultItem;
    isFinal?: boolean;
  };
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: ISpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: ISpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

const LANGUAGE_LOCALE_MAP: Record<SupportedLanguage, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  te: 'te-IN',
  ta: 'ta-IN',
  kn: 'kn-IN'
};

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function determineCategory(file: File): AttachedFileType {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  return 'document';
}

export function ChatInput({
  onSendMessage,
  isLoading,
  selectedLanguage = 'en',
  onPreviewFile
}: ChatInputProps) {
  const { currentLanguage, t, isRTL } = useLanguage();
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // File Upload State
  const [stagedFiles, setStagedFiles] = useState<AttachedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [showFileMenu, setShowFileMenu] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const baseInputRef = useRef<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSpeech = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
      setIsSpeechSupported(Boolean(hasSpeech));
    }
  }, []);

  useEffect(() => {
    if (!isLoading && textareaRef.current && !isListening) {
      textareaRef.current.focus();
    }
  }, [isLoading, isListening]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore cleanup abort error
        }
      }
    };
  }, []);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const processFile = async (file: File): Promise<AttachedFile> => {
    const category = determineCategory(file);
    const id = `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    let previewUrl: string | undefined;
    let dataUrl: string | undefined;
    let textContent: string | undefined;
    let duration: number | undefined;

    try {
      previewUrl = URL.createObjectURL(file);
    } catch {
      // fallback
    }

    if (file.size <= 35 * 1024 * 1024) {
      try {
        dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } catch {
        console.warn('Failed to read data URL for', file.name);
      }
    }

    const isTextReadable =
      file.type.startsWith('text/') ||
      file.name.match(/\.(txt|csv|json|md|xml|log|ts|js|html|css)$/i);

    if (isTextReadable && file.size <= 5 * 1024 * 1024) {
      try {
        textContent = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsText(file);
        });
      } catch {
        console.warn('Failed to read text content for', file.name);
      }
    }

    if (category === 'video' && previewUrl) {
      try {
        const videoEl = document.createElement('video');
        videoEl.preload = 'metadata';
        videoEl.src = previewUrl;
        await new Promise<void>((resolve) => {
          videoEl.onloadedmetadata = () => {
            duration = Math.round(videoEl.duration);
            resolve();
          };
          videoEl.onerror = () => resolve();
          setTimeout(resolve, 2000);
        });
      } catch {
        // ignore
      }
    }

    return {
      id,
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
      category,
      previewUrl,
      dataUrl,
      textContent,
      duration,
      lastModified: file.lastModified
    };
  };

  const handleFilesAdded = async (fileList: FileList | File[]) => {
    setFileError(null);
    setShowFileMenu(false);
    const filesArray = Array.from(fileList);

    if (filesArray.length === 0) return;

    if (stagedFiles.length + filesArray.length > 10) {
      setFileError('You can attach up to 10 files at a time.');
      return;
    }

    const oversized = filesArray.find((f) => f.size > 35 * 1024 * 1024);
    if (oversized) {
      setFileError(`File "${oversized.name}" exceeds the 35 MB size limit.`);
      return;
    }

    try {
      const processed = await Promise.all(filesArray.map(processFile));
      setStagedFiles((prev) => [...prev, ...processed]);
      setTimeout(adjustTextareaHeight, 0);
    } catch (err) {
      console.error('File processing error:', err);
      setFileError('Unable to process some files. Please try again.');
    }
  };

  const handleRemoveStagedFile = (fileId: string) => {
    setStagedFiles((prev) => {
      const target = prev.find((f) => f.id === fileId);
      if (target?.previewUrl && target.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const handleClearAllFiles = () => {
    stagedFiles.forEach((f) => {
      if (f.previewUrl && f.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(f.previewUrl);
      }
    });
    setStagedFiles([]);
    setFileError(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFilesAdded(e.dataTransfer.files);
    }
  };

  const handlePaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
    if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
      const files: File[] = [];
      for (let i = 0; i < e.clipboardData.files.length; i++) {
        files.push(e.clipboardData.files[i]);
      }
      if (files.length > 0) {
        await handleFilesAdded(files);
      }
    }
  };

  const startListening = () => {
    if (isLoading) return;
    setSpeechError(null);

    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: new () => ISpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => ISpeechRecognition }).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setIsSpeechSupported(false);
      setSpeechError(t('input.micUnsupported', 'Speech recognition is not supported in this browser. Please use Chrome, Edge, or another Chromium browser.'));
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }

      const recognition = new SpeechRecognitionClass();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = LANGUAGE_LOCALE_MAP[currentLanguage] || 'en-IN';

      baseInputRef.current = input;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimText = '';
        let finalText = '';

        for (let i = 0; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item && item[0]) {
            if (item.isFinal) {
              finalText += item[0].transcript + ' ';
            } else {
              interimText += item[0].transcript;
            }
          }
        }

        const prefix = baseInputRef.current ? baseInputRef.current.trim() + ' ' : '';
        const combined = `${prefix}${finalText}${interimText}`.trimStart();
        setInput(combined);
        setTimeout(adjustTextareaHeight, 0);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setSpeechError('Microphone access was denied. Please allow microphone permissions in your browser to speak your question.');
        } else if (event.error !== 'no-speech') {
          setSpeechError(`Voice input issue: ${event.error}. Please try again.`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Speech recognition startup error:', err);
      setIsListening(false);
      setSpeechError('Unable to start microphone recording. Please check browser permissions.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSend = () => {
    if (isListening) {
      stopListening();
    }

    const hasText = Boolean(input.trim());
    const hasFiles = stagedFiles.length > 0;

    if ((!hasText && !hasFiles) || isLoading) return;

    let sendPrompt = input.trim();
    if (!sendPrompt && hasFiles) {
      const fileNames = stagedFiles.map((f) => f.name).join(', ');
      sendPrompt = `Please evaluate the attached file(s) (${fileNames}) for Bureau of Indian Standards (BIS) compliance, applicable standards, and certification roadmap.`;
    }

    onSendMessage(sendPrompt, stagedFiles.length > 0 ? stagedFiles : undefined);

    setInput('');
    setStagedFiles([]);
    setFileError(null);
    baseInputRef.current = '';
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    baseInputRef.current = e.target.value;
    adjustTextareaHeight();
  };

  const quickPills = [
    {
      label: t('pill.immersion.label', 'Immersion Heater'),
      query: t('pill.immersion.query', 'I manufacture immersion water heaters. Which Indian Standard applies and is it mandatory?')
    },
    {
      label: t('pill.led.label', 'LED Bulbs'),
      query: t('pill.led.query', 'What Indian Standard applies to LED bulbs for home use?')
    },
    {
      label: t('pill.water.label', 'Packaged Water'),
      query: t('pill.water.query', 'What standard applies to packaged drinking water plants (IS 14543)?')
    },
    {
      label: t('pill.isi.label', 'ISI Licensing Flow'),
      query: t('pill.isi.query', 'What is the step-by-step licensing process for Scheme-I (ISI Mark)?')
    },
    {
      label: t('pill.huid.label', 'Gold HUID Verification'),
      query: t('pill.huid.query', 'How does a consumer verify the 6-digit HUID code on gold jewellery?')
    },
    {
      label: t('pill.labs.label', 'Find Testing Labs'),
      query: t('pill.labs.query', 'Find a BIS recognized testing lab for helmets (IS 4151)')
    }
  ];

  const getDocIconMini = (file: AttachedFile) => {
    if (file.type.includes('pdf') || file.name.toLowerCase().endsWith('.pdf')) {
      return <FileText className="h-4 w-4 text-rose-500 shrink-0" />;
    }
    if (file.name.match(/\.(xlsx?|csv)$/i)) {
      return <FileSpreadsheet className="h-4 w-4 text-emerald-600 shrink-0" />;
    }
    if (file.name.match(/\.(json|xml|md)$/i)) {
      return <FileCode className="h-4 w-4 text-indigo-500 shrink-0" />;
    }
    return <File className="h-4 w-4 text-blue-500 shrink-0" />;
  };

  return (
    <div
      className="border-t border-[rgba(210,230,190,0.10)] bg-[#171C13]/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 pt-2.5 sm:pt-3.5 pb-3 sm:pb-4 transition-colors shrink-0 z-20"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.json,.md,.rtf,.xml"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFilesAdded(e.target.files);
          e.target.value = '';
        }}
      />
      <input
        ref={photoInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFilesAdded(e.target.files);
          e.target.value = '';
        }}
      />
      <input
        ref={docInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.json,.md,.rtf,.xml"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFilesAdded(e.target.files);
          e.target.value = '';
        }}
      />
      <input
        ref={videoInputRef}
        type="file"
        multiple
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFilesAdded(e.target.files);
          e.target.value = '';
        }}
      />

      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl">
        {/* Quick Suggestion Buttons (Horizontally scrollable on small screens, single row desktop) */}
        <div className="mb-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
          <span className="text-xs font-semibold text-[#858D7D] shrink-0 flex items-center gap-1.5 leading-normal select-none">
            <Sparkles className="h-3.5 w-3.5 text-[#B8F23D]" />
            {t('input.quick', 'Quick:')}
          </span>
          {quickPills.map((pill, idx) => (
            <button
              key={idx}
              disabled={isLoading || isListening}
              onClick={() => onSendMessage(pill.query)}
              className="shrink-0 rounded-lg border border-[rgba(210,230,190,0.10)] bg-[#292F22] min-h-[30px] inline-flex items-center px-3 py-1 text-xs font-medium text-[#C0C7B7] hover:border-[rgba(184,242,61,0.25)] hover:text-[#B8F23D] hover:bg-[#343B2B] transition-colors disabled:opacity-50 cursor-pointer leading-normal select-none"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Live Speech Recognition Feedback Banner */}
        {isListening && (
          <div className="mb-2 flex items-center justify-between rounded-lg bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 text-xs text-rose-300 animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
              <span className="font-medium">
                {t('input.listeningBanner', 'Listening hands-free... Speak your question about Indian Standards or BIS schemes')}
              </span>
            </div>
            <button
              type="button"
              onClick={stopListening}
              className="font-semibold text-rose-400 hover:text-rose-200 underline underline-offset-2 cursor-pointer text-[11px] ml-2 shrink-0"
            >
              {t('input.finishSpeaking', 'Finish speaking')}
            </button>
          </div>
        )}

        {/* Speech Error Banner */}
        {speechError && (
          <div className="mb-2 flex items-center justify-between rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-xs text-amber-300 animate-in fade-in duration-150">
            <span className="leading-snug">{speechError}</span>
            <button
              type="button"
              onClick={() => setSpeechError(null)}
              className="text-amber-400 hover:text-amber-200 font-bold ml-2 text-sm leading-none cursor-pointer"
              aria-label="Dismiss error message"
            >
              ×
            </button>
          </div>
        )}

        {/* File Error Banner */}
        {fileError && (
          <div className="mb-2 flex items-center justify-between rounded-lg bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 px-3 py-1.5 text-xs text-[#FF6B6B] animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-[#FF6B6B] shrink-0" />
              <span>{fileError}</span>
            </div>
            <button
              type="button"
              onClick={() => setFileError(null)}
              className="text-[#FF6B6B] hover:text-white font-bold ml-2 text-sm leading-none cursor-pointer"
              aria-label="Dismiss file error"
            >
              ×
            </button>
          </div>
        )}

        {/* Drag and Drop Overlay Zone */}
        {isDragging && (
          <div className="mb-2 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#B8F23D]/50 bg-[#26351D]/40 p-4 text-sm font-semibold text-[#B8F23D] animate-in fade-in duration-150">
            <UploadCloud className="h-6 w-6 text-[#B8F23D] animate-bounce" />
            <span>{t('input.dropzone', 'Drop photos, documents, or videos here to upload')}</span>
          </div>
        )}

        {/* Staged Attached Files Tray */}
        {stagedFiles.length > 0 && (
          <div className="mb-2 rounded-xl border border-[rgba(210,230,190,0.10)] bg-[#292F22] p-2.5 animate-in fade-in duration-150">
            <div className="mb-2 flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F1F4EA]">
                <Paperclip className="h-3.5 w-3.5 text-[#B8F23D]" />
                <span>
                  {t('input.attachedFiles', 'Attached Files')} ({stagedFiles.length})
                </span>
                <span className="text-[11px] font-normal text-[#C0C7B7]">
                  • {t('input.readyToSend', 'Ready to send with query')}
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearAllFiles}
                className="text-[11px] font-medium text-[#C0C7B7] hover:text-[#FF6B6B] transition-colors cursor-pointer"
              >
                {t('common.clearAll', 'Clear all')}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {stagedFiles.map((file) => (
                <div
                  key={file.id}
                  className="group relative flex items-center gap-2 rounded-lg border border-[rgba(210,230,190,0.10)] bg-[#343B2B] p-1.5 pr-2 hover:border-[rgba(184,242,61,0.25)] hover:bg-[#3B4430] transition-all max-w-[260px]"
                >
                  <div
                    onClick={() => onPreviewFile?.(file)}
                    className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded bg-[#292F22] cursor-pointer"
                    title="Click to preview file"
                  >
                    {file.category === 'image' && (file.previewUrl || file.dataUrl) ? (
                      <img
                        src={file.previewUrl || file.dataUrl}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                    ) : file.category === 'video' ? (
                      <div className="flex h-full w-full items-center justify-center bg-violet-950/40 text-violet-400">
                        <Film className="h-5 w-5" />
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        {getDocIconMini(file)}
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="h-3.5 w-3.5 text-[#B8F23D]" />
                    </div>
                  </div>

                  <div
                    onClick={() => onPreviewFile?.(file)}
                    className="min-w-0 flex-1 cursor-pointer"
                    title="Click to preview"
                  >
                    <p className="truncate text-xs font-semibold text-[#F1F4EA]">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#C0C7B7]">
                      <span className="capitalize font-medium text-[#C0C7B7]">
                        {file.category === 'image' ? t('filePreview.photo', 'Photo') : file.category === 'video' ? t('filePreview.video', 'Video') : t('filePreview.document', 'Document')}
                      </span>
                      <span>•</span>
                      <span>{formatBytes(file.size)}</span>
                      {file.duration ? (
                        <>
                          <span>•</span>
                          <span>{file.duration}s</span>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveStagedFile(file.id);
                    }}
                    className="flex h-5 w-5 items-center justify-center rounded-full text-[#C0C7B7] hover:bg-white/[0.08] hover:text-[#F1F4EA] transition-colors cursor-pointer shrink-0"
                    title="Remove file"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Box */}
        <div
          className={`relative flex items-center rounded-2xl border bg-[#1A2016] p-2 shadow-[0_2px_12px_rgba(0,0,0,0.25)] transition-all min-h-[58px] ${
            isListening
              ? 'border-rose-500/50 ring-2 ring-rose-500/20'
              : 'border-[rgba(210,230,190,0.12)] focus-within:border-[rgba(210,230,190,0.30)] focus-within:shadow-[0_2px_14px_rgba(0,0,0,0.35)]'
          }`}
        >
          {/* Add Files Dropdown / Button */}
          <div className="relative flex items-center pl-0.5">
            <button
              id="add-files-button"
              type="button"
              onClick={() => setShowFileMenu((prev) => !prev)}
              disabled={isLoading}
              className={`flex h-9 items-center gap-1.5 rounded-xl px-2.5 text-xs font-medium transition-colors cursor-pointer ${
                stagedFiles.length > 0
                  ? 'bg-[#292F22] text-[#B8F23D] border border-[#B8F23D]/30'
                  : 'bg-[#292F22] text-[#C0C7B7] hover:text-[#F1F4EA] hover:bg-[#343B2B] border border-[rgba(210,230,190,0.10)]'
              }`}
              title={t('input.addFilesTooltip', 'Add files: photos, documents, and videos')}
              aria-label={t('input.addFiles', 'Add files')}
              aria-expanded={showFileMenu}
            >
              <Paperclip className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t('input.addFiles', 'Add files')}</span>
              {stagedFiles.length > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#B8F23D] text-[10px] font-bold text-[#10150F] leading-none">
                  {stagedFiles.length}
                </span>
              )}
            </button>

            {/* Quick File Category Menu */}
            {showFileMenu && (
              <div
                className="absolute bottom-12 left-0 z-30 w-64 sm:w-72 rounded-xl border border-[rgba(210,230,190,0.10)] bg-[#292F22] p-2 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-2.5 py-1 text-xs font-semibold text-[#858D7D] leading-normal">
                  {t('input.uploadTitle', 'Upload to BIS Sahayak')}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowFileMenu(false);
                    photoInputRef.current?.click();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-[#C0C7B7] hover:bg-[#343B2B] hover:text-[#F1F4EA] transition-colors cursor-pointer"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-[#343B2B] text-[#B8F23D] shrink-0">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[#F1F4EA] leading-snug">{t('input.photosTitle', 'Photos & Images')}</div>
                    <div className="text-[11px] text-[#C0C7B7] leading-normal">{t('input.photosDesc', 'Products, ISI marks, labels (PNG, JPG)')}</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowFileMenu(false);
                    docInputRef.current?.click();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-[#C0C7B7] hover:bg-[#343B2B] hover:text-[#F1F4EA] transition-colors cursor-pointer"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-[#343B2B] text-[#B8F23D] shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[#F1F4EA] leading-snug">{t('input.docsTitle', 'Documents & Reports')}</div>
                    <div className="text-[11px] text-[#C0C7B7] leading-normal">{t('input.docsDesc', 'Test reports, specs (PDF, DOCX, TXT)')}</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowFileMenu(false);
                    videoInputRef.current?.click();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs text-[#C0C7B7] hover:bg-[#343B2B] hover:text-[#F1F4EA] transition-colors cursor-pointer"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-[#343B2B] text-violet-400 shrink-0">
                    <Film className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[#F1F4EA] leading-snug">{t('input.videosTitle', 'Videos')}</div>
                    <div className="text-[11px] text-[#C0C7B7] leading-normal">{t('input.videosDesc', 'Lab testing, STI routines (MP4, WebM)')}</div>
                  </div>
                </button>

                <div className="my-1 border-t border-[rgba(210,230,190,0.10)]" />

                <button
                  type="button"
                  onClick={() => {
                    setShowFileMenu(false);
                    fileInputRef.current?.click();
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium text-[#C0C7B7] hover:bg-[#343B2B] hover:text-[#F1F4EA] transition-colors cursor-pointer leading-normal"
                >
                  <Paperclip className="h-3.5 w-3.5 text-[#858D7D] shrink-0" />
                  <span>{t('input.browseAll', 'Browse all file formats')}</span>
                </button>
              </div>
            )}
          </div>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            disabled={isLoading}
            placeholder={
              isLoading
                ? t('input.retrieving', 'Retrieving authoritative Indian Standard context...')
                : isListening
                ? t('input.listening', 'Listening... Speak now...')
                : stagedFiles.length > 0
                ? t('input.readyToSend', 'Add questions about the attached files or click Send to evaluate compliance...')
                : t('input.placeholder', 'Describe your product, enter an IS number (e.g. IS 302), or ask about BIS schemes...')
            }
            dir={isRTL ? 'rtl' : 'ltr'}
            rows={1}
            className="w-full min-h-[44px] max-h-36 resize-none bg-transparent px-3 py-2.5 text-sm text-[#F1F4EA] placeholder-[#858D7D] outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none disabled:opacity-60 leading-relaxed"
          />

          <div className="flex items-center gap-1.5 pl-1 pr-0.5">
            {/* Microphone Button */}
            <button
              id="voice-input-button"
              type="button"
              onClick={toggleVoiceInput}
              disabled={isLoading || !isSpeechSupported}
              className={`flex h-9 w-9 min-h-[36px] min-w-[36px] items-center justify-center rounded-xl transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-xs ring-2 ring-rose-500/30'
                  : isSpeechSupported
                  ? 'bg-[#292F22] text-[#C0C7B7] hover:text-[#F1F4EA] hover:bg-[#343B2B] border border-[rgba(210,230,190,0.08)]'
                  : 'bg-[#171C13] text-[#858D7D] cursor-not-allowed opacity-50'
              }`}
              title={
                !isSpeechSupported
                  ? t('input.micUnsupported', 'Voice-to-text is not supported in this browser')
                  : isListening
                  ? t('input.micStop', 'Stop voice recording')
                  : t('input.micStart', 'Ask hands-free with microphone (voice-to-text)')
              }
              aria-label={isListening ? t('input.micStop', 'Stop voice recording') : t('input.micStart', 'Start voice input')}
              aria-pressed={isListening}
            >
              {isListening ? (
                <MicOff className="h-4 w-4 animate-pulse text-rose-400" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </button>

            {/* Send Button */}
            <button
              id="send-message-button"
              type="button"
              onClick={handleSend}
              disabled={(!input.trim() && stagedFiles.length === 0) || isLoading}
              className={`flex h-9 w-9 min-h-[36px] min-w-[36px] items-center justify-center rounded-xl transition-colors cursor-pointer ${
                (input.trim() || stagedFiles.length > 0) && !isLoading
                  ? 'bg-[#B8F23D] text-[#10150F] hover:bg-[#C8FF52] font-semibold glow-lime-subtle'
                  : 'bg-[#292F22] text-[#858D7D] cursor-not-allowed border border-[rgba(210,230,190,0.08)]'
              }`}
              title={t('input.sendQuery', 'Send query')}
              aria-label={t('input.sendQuery', 'Send query')}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-[#858D7D]" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Disclaimer & Shortcuts */}
        <div className="mt-1.5 flex flex-wrap items-center justify-between gap-1 text-[11px] text-[#858D7D] px-1 leading-normal">
          <span>
            {t('input.shortcuts', 'Upload photos, documents, and videos or press Enter to submit')}
          </span>
          <span className="hidden sm:inline">
            {t('input.pasteTip', 'Drag & drop or paste screenshots directly into chat')}
          </span>
        </div>
      </div>
    </div>
  );
}
