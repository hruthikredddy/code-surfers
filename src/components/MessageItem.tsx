import { useState, useEffect, useRef } from 'react';
import {
  AlertCircle,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Compass,
  FastForward,
  Paperclip,
  Image as ImageIcon,
  Film,
  FileText,
  FileSpreadsheet,
  FileCode,
  File,
  Play,
  Eye,
  Download
} from 'lucide-react';
import { ChatMessage, NextStepSuggestion, AttachedFile } from '../types/index.ts';
import { CitationCard } from './CitationCard.tsx';
import { FormattedAIResponse } from './FormattedAIResponse.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';

interface MessageItemProps {
  message: ChatMessage;
  onSelectNextStep?: (suggestion: NextStepSuggestion) => void;
  onStreamingComplete?: (messageId: string) => void;
  onScrollRequest?: () => void;
  onPreviewFile?: (file: AttachedFile) => void;
  onOpenStandard?: (isNumber: string) => void;
}

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function MessageItem({
  message,
  onSelectNextStep,
  onStreamingComplete,
  onScrollRequest,
  onPreviewFile,
  onOpenStandard
}: MessageItemProps) {
  const { t } = useLanguage();
  const isUser = message.role === 'user';
  const fullContent = message.content;
  const isStreamingInitial = Boolean(message.isStreaming);

  const [displayedText, setDisplayedText] = useState(
    isStreamingInitial ? '' : fullContent
  );
  const [isTyping, setIsTyping] = useState(isStreamingInitial);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollCounterRef = useRef<number>(0);

  useEffect(() => {
    if (!isStreamingInitial) {
      setDisplayedText(fullContent);
      setIsTyping(false);
      return;
    }

    let currentIndex = 0;
    setIsTyping(true);

    const step = () => {
      if (currentIndex < fullContent.length) {
        // Dynamic adaptive chunk size: smooth typing cadence in ~1.5 - 2.5s
        const remaining = fullContent.length - currentIndex;
        const chunkSize = Math.min(
          remaining,
          Math.max(2, Math.floor(fullContent.length / 65))
        );
        currentIndex += chunkSize;
        setDisplayedText(fullContent.slice(0, currentIndex));

        scrollCounterRef.current += 1;
        if (scrollCounterRef.current % 4 === 0) {
          onScrollRequest?.();
        }

        typingTimerRef.current = setTimeout(step, 14);
      } else {
        setDisplayedText(fullContent);
        setIsTyping(false);
        onScrollRequest?.();
        onStreamingComplete?.(message.id);
      }
    };

    step();

    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, [message.id, fullContent, isStreamingInitial]);

  const handleSkip = () => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    setDisplayedText(fullContent);
    setIsTyping(false);
    onScrollRequest?.();
    onStreamingComplete?.(message.id);
  };

  const getDocIcon = (file: AttachedFile) => {
    if (file.type.includes('pdf') || file.name.toLowerCase().endsWith('.pdf')) {
      return <FileText className="h-4 w-4 text-rose-400 shrink-0" />;
    }
    if (file.name.match(/\.(xlsx?|csv)$/i)) {
      return <FileSpreadsheet className="h-4 w-4 text-emerald-400 shrink-0" />;
    }
    if (file.name.match(/\.(json|xml|md)$/i)) {
      return <FileCode className="h-4 w-4 text-indigo-300 shrink-0" />;
    }
    return <File className="h-4 w-4 text-blue-300 shrink-0" />;
  };

  const renderAttachments = (attachments: AttachedFile[], theme: 'user' | 'assistant') => {
    return (
      <div className="mb-2.5 flex flex-wrap gap-2">
        {attachments.map((file) => {
          const isImg = file.category === 'image';
          const isVid = file.category === 'video';
          const categoryLabel = isImg ? t('filePreview.photo', 'Photo') : isVid ? t('filePreview.video', 'Video') : t('filePreview.document', 'Document');

          return (
            <div
              key={file.id}
              onClick={() => onPreviewFile?.(file)}
              className={`group flex items-center gap-2 rounded-xl p-1.5 pr-2.5 transition-all cursor-pointer ${
                theme === 'user'
                  ? 'bg-[#232323] hover:bg-[#232323] border border-white/[0.08] text-[#FDFDF5] hover:border-[rgba(170,167,133,0.35)]'
                  : 'bg-[#232323] hover:bg-[#232323] border border-white/[0.08] text-[#FDFDF5] hover:border-[rgba(170,167,133,0.35)]'
              }`}
              title={`Click to preview ${file.name}`}
            >
              {/* Media Thumbnail */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black/20">
                {isImg && (file.previewUrl || file.dataUrl) ? (
                  <img
                    src={file.previewUrl || file.dataUrl}
                    alt={file.name}
                    className="h-full w-full object-cover"
                  />
                ) : isVid ? (
                  <div className="flex h-full w-full items-center justify-center bg-violet-950/60 text-violet-300">
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    {getDocIcon(file)}
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="h-3.5 w-3.5 text-[#AAA785]" />
                </div>
              </div>

              {/* Info */}
              <div className="min-w-0 max-w-[170px]">
                <p className="truncate text-xs font-semibold leading-tight text-[#FDFDF5]">
                  {file.name}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-[#E1E1D5]">
                  <span className="capitalize">{categoryLabel}</span>
                  <span>•</span>
                  <span>{formatBytes(file.size)}</span>
                  {file.duration ? <span>• {file.duration}s</span> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (isUser) {
    return (
      <div className="flex justify-end py-2">
        <div className="max-w-[750px] rounded-2xl rounded-tr-xs bg-[#232323] border border-[rgba(170,167,133,0.22)] px-4.5 py-3 text-xs sm:text-sm text-[#FDFDF5] shadow-xs leading-relaxed">
          {/* User Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            renderAttachments(message.attachments, 'user')
          )}
          <p className="whitespace-pre-wrap">{message.content}</p>
          <div className="mt-1 text-right text-[10px] text-[#AAA785]">
            {message.timestamp}
          </div>
        </div>
      </div>
    );
  }

  const isLowConfidence = message.isLowConfidence || message.groundingStatus === 'LOW_CONFIDENCE';
  const isProcedural = message.groundingStatus === 'PROCEDURAL_GUIDE';

  return (
    <div className="flex justify-start py-2">
      <div className="w-full max-w-[850px] rounded-2xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4.5 sm:p-6 shadow-sm">
        {/* Header Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(170,167,133,0.20)] pb-2.5 mb-3.5">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#2A3328] text-[10px] font-bold text-[#AAA785] border border-[#AAA785]/30 shrink-0">
              BIS
            </div>
            <span className="text-xs font-semibold text-[#FDFDF5] leading-normal">
              {t('app.title', 'BIS Sahayak')}
            </span>
            {message.capability && (
              <span className="rounded-md bg-[#2A2E28] px-2 py-0.5 text-xs font-medium text-[#AAA785] border border-[rgba(170,167,133,0.20)] leading-normal">
                {t(`capability.${message.capability}`, message.capabilityLabel || '')}
              </span>
            )}
            {isTyping && (
              <button
                type="button"
                onClick={handleSkip}
                className="inline-flex items-center gap-1 rounded-md bg-[#2A2E28] hover:bg-[#31362E] px-2 py-0.5 text-xs font-medium text-[#E1E1D5] hover:text-[#FDFDF5] border border-[rgba(170,167,133,0.20)] transition-colors cursor-pointer leading-normal"
                title={t('message.skip', 'Skip typing')}
              >
                <FastForward className="h-3 w-3 shrink-0" />
                <span>{t('message.skip', 'Skip')}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs flex-wrap">
            {isLowConfidence ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#2A2E28]0/10 px-2.5 py-1 text-xs font-medium text-amber-400 border border-amber-500/30 leading-normal">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {t('message.lowConfidence', 'No Direct Authoritative Match')}
              </span>
            ) : isProcedural ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#2A2E28] px-2.5 py-1 text-xs font-medium text-[#E1E1D5] border border-[rgba(170,167,133,0.20)] leading-normal">
                <Compass className="h-3.5 w-3.5 shrink-0" />
                {t('message.proceduralGuide', 'Official Procedural Guide')}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#233A23] px-2.5 py-1 text-xs font-medium text-[#AAA785] border border-[#AAA785]/30 leading-normal">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                {t('message.groundedMatch', 'Grounded Knowledge Match')} {message.confidenceScore ? `(${message.confidenceScore}%)` : ''}
              </span>
            )}
            <span className="text-[11px] text-[#AAA785] shrink-0 leading-normal">{message.timestamp}</span>
          </div>
        </div>

        {/* Assistant Attachments if any */}
        {message.attachments && message.attachments.length > 0 && (
          renderAttachments(message.attachments, 'assistant')
        )}

        {/* Low Confidence Fallback Banner */}
        {isLowConfidence && (
          <div className="mb-4 rounded-lg border border-amber-500/30 bg-[#2A2E28]0/10 p-3 text-xs text-amber-300 leading-normal">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 text-amber-400 shrink-0" />
              <div>
                <p className="font-semibold text-amber-300">{t('message.limitationTitle', 'Knowledge Base Limitation Notice')}</p>
                <p className="mt-0.5 text-amber-300/80 leading-relaxed">
                  {t('message.limitationDesc', 'To prevent regulatory non-compliance or misinformation, BIS Sahayak does not generate unverified Indian Standard numbers. Please verify directly on the official Bureau of Indian Standards databases.')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Substantive Plain Language Explanation with Markdown, Tables & Links */}
        <div className="text-sm sm:text-base text-[#FDFDF5] leading-relaxed break-words">
          <FormattedAIResponse content={displayedText} isStreaming={isTyping} />
        </div>

        {/* Source-Backed Citations (Cards) */}
        {!isTyping && message.citations && message.citations.length > 0 && (
          <div className="mt-4 pt-3 border-t border-[rgba(170,167,133,0.20)] animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#E1E1D5] leading-normal">
                {t('message.citationsTitle', 'Authoritative Citations & References')}
              </span>
              <span className="text-[11px] text-[#AAA785] leading-normal">
                {message.citations.length} {message.citations.length === 1 ? t('message.citedItem', 'cited item') : t('message.citedItems', 'cited items')}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {message.citations.map((citation, idx) => (
                <CitationCard
                  key={idx}
                  citation={citation}
                  onOpenStandard={onOpenStandard}
                />
              ))}
            </div>
          </div>
        )}

        {/* Official Procedural Links */}
        {!isTyping && message.proceduralLinks && message.proceduralLinks.length > 0 && (
          <div className="mt-3.5 rounded-lg bg-[#2A2E28] p-3 border border-[rgba(170,167,133,0.20)] animate-in fade-in duration-300">
            <span className="block text-xs font-semibold text-[#E1E1D5] mb-1.5 leading-normal">
              {t('message.portalsTitle', 'Official Government Portals')}
            </span>
            <div className="flex flex-wrap gap-2">
              {message.proceduralLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-[#232323] min-h-[30px] px-2.5 py-1 text-xs font-medium text-[#FDFDF5] hover:text-[#AAA785] border border-[rgba(170,167,133,0.20)] hover:border-[rgba(170,167,133,0.30)] transition-colors leading-normal"
                  title={link.note}
                >
                  <span>{link.label}</span>
                  <ExternalLink className="h-3 w-3 text-[#E1E1D5] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Tappable Next Step Suggestions */}
        {!isTyping && message.nextSteps && message.nextSteps.length > 0 && onSelectNextStep && (
          <div className="mt-4 pt-3 border-t border-[rgba(170,167,133,0.20)] animate-in fade-in duration-300">
            <span className="block text-xs font-medium text-[#E1E1D5] mb-2 leading-normal">
              {t('message.nextStepsTitle', 'Suggested Next Compliance Steps:')}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {message.nextSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => onSelectNextStep(step)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(170,167,133,0.20)] bg-[#2A2E28] min-h-[30px] px-3 py-1 text-xs font-medium text-[#E1E1D5] hover:bg-[#232323] hover:text-[#AAA785] hover:border-[rgba(170,167,133,0.30)] transition-colors cursor-pointer text-left leading-normal"
                >
                  <span>{step.label}</span>
                  <ArrowRight className="h-3 w-3 text-[#AAA785] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
