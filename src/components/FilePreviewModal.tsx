import { useState, useEffect } from 'react';
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  Film,
  Image as ImageIcon,
  Copy,
  Check,
  ShieldCheck,
  FileSpreadsheet,
  FileCode,
  File
} from 'lucide-react';
import { AttachedFile } from '../types/index.ts';
import { useLanguage } from '../i18n/LanguageContext.tsx';

interface FilePreviewModalProps {
  file: AttachedFile | null;
  onClose: () => void;
  onAskAboutFile?: (file: AttachedFile, queryPrompt?: string) => void;
}

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function FilePreviewModal({ file, onClose, onAskAboutFile }: FilePreviewModalProps) {
  const { t } = useLanguage();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setZoomLevel(1);
    setHasCopied(false);
  }, [file]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!file) return null;

  const isImage = file.category === 'image';
  const isVideo = file.category === 'video';
  const isDocument = file.category === 'document';
  const isPDF = file.type.includes('pdf') || file.name.toLowerCase().endsWith('.pdf');

  const handleCopyText = () => {
    if (file.textContent) {
      navigator.clipboard.writeText(file.textContent);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const src = file.previewUrl || file.dataUrl;
    if (!src) return;
    const link = document.createElement('a');
    link.href = src;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getDocIcon = () => {
    if (isPDF) return <FileText className="h-10 w-10 text-rose-400" />;
    if (file.name.match(/\.(xlsx?|csv)$/i)) return <FileSpreadsheet className="h-10 w-10 text-[#AAA785]" />;
    if (file.name.match(/\.(json|xml|md)$/i)) return <FileCode className="h-10 w-10 text-indigo-400" />;
    return <File className="h-10 w-10 text-[#AAA785]" />;
  };

  const categoryLabel = isImage
    ? t('filePreview.photo', 'Photo')
    : isVideo
    ? t('filePreview.video', 'Video')
    : t('filePreview.document', 'Document');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Preview of ${file.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#232323]/85 p-3 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex h-full max-h-[92vh] w-full max-w-5xl flex-col rounded-2xl bg-[#232323] border border-white/[0.08] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#232323] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#232323] border border-white/[0.08] shadow-xs">
              {isImage && <ImageIcon className="h-5 w-5 text-[#AAA785]" />}
              {isVideo && <Film className="h-5 w-5 text-violet-400" />}
              {isDocument && <FileText className="h-5 w-5 text-[#AAA785]" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-sm font-bold text-[#FDFDF5]" title={file.name}>
                  {file.name}
                </h3>
                <span className="shrink-0 rounded-md bg-[#232323] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#AAA785] border border-[#AAA785]/20">
                  {categoryLabel}
                </span>
              </div>
              <p className="text-xs text-[#E1E1D5]">
                {formatBytes(file.size)} • {file.type || 'Standard Document'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {isImage && (
              <div className="hidden sm:flex items-center rounded-lg border border-white/[0.08] bg-[#232323] p-0.5 shadow-xs">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.25))}
                  className="rounded p-1.5 text-[#E1E1D5] hover:text-[#FDFDF5] hover:bg-[#232323]/[0.06] transition-colors"
                  title={t('filePreview.zoomOut', 'Zoom out')}
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="px-2 text-xs font-mono font-medium text-[#FDFDF5]">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
                  className="rounded p-1.5 text-[#E1E1D5] hover:text-[#FDFDF5] hover:bg-[#232323]/[0.06] transition-colors"
                  title={t('filePreview.zoomIn', 'Zoom in')}
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="rounded p-1.5 text-[#E1E1D5] hover:text-[#FDFDF5] hover:bg-[#232323]/[0.06] transition-colors"
                  title={t('filePreview.resetZoom', 'Reset zoom')}
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            )}

            {(file.previewUrl || file.dataUrl) && (
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#232323] px-2.5 py-1.5 text-xs font-medium text-[#FDFDF5] hover:border-[rgba(170,167,133,0.35)] hover:text-[#AAA785] transition-colors cursor-pointer"
                title={t('common.download', 'Download file')}
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t('common.download', 'Download')}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#E1E1D5] hover:bg-[#232323] hover:text-[#FDFDF5] transition-colors cursor-pointer"
              title={t('common.close', 'Close')}
              aria-label={t('common.close', 'Close')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Display Area */}
        <div className="flex-1 overflow-auto bg-[#232323] p-4 sm:p-6 flex items-center justify-center">
          {/* Photo Preview */}
          {isImage && (
            <div className="relative flex max-h-full max-w-full items-center justify-center overflow-auto rounded-lg">
              <img
                src={file.previewUrl || file.dataUrl}
                alt={file.name}
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.15s ease' }}
                className="max-h-[68vh] max-w-full rounded-md object-contain shadow-md"
              />
            </div>
          )}

          {/* Video Preview */}
          {isVideo && (
            <div className="flex max-h-full w-full max-w-3xl flex-col items-center justify-center rounded-xl bg-black p-2 shadow-lg border border-white/[0.08]">
              <video
                src={file.previewUrl || file.dataUrl}
                controls
                autoPlay
                className="max-h-[65vh] w-full rounded-lg object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Document Preview */}
          {isDocument && (
            <div className="flex h-full w-full max-w-4xl flex-col rounded-xl border border-white/[0.08] bg-[#232323] shadow-sm overflow-hidden">
              {isPDF && (file.previewUrl || file.dataUrl) ? (
                <div className="flex-1 flex flex-col h-full min-h-[450px]">
                  <iframe
                    src={file.previewUrl || file.dataUrl}
                    title={file.name}
                    className="w-full flex-1 border-0 rounded-t-xl"
                  />
                </div>
              ) : file.textContent ? (
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#232323] px-4 py-2">
                    <span className="text-xs font-semibold text-[#E1E1D5]">
                      {t('filePreview.extractedText', 'Extracted Document Content')}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyText}
                      className="inline-flex items-center gap-1 rounded bg-[#232323] border border-white/[0.08] px-2 py-1 text-xs text-[#E1E1D5] hover:text-[#AAA785] transition-colors"
                    >
                      {hasCopied ? (
                        <>
                          <Check className="h-3 w-3 text-[#AAA785]" />
                          <span>{t('common.copied', 'Copied')}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>{t('common.copyText', 'Copy Text')}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="flex-1 overflow-auto p-4 text-xs font-mono text-[#FDFDF5] bg-[#232323] leading-relaxed whitespace-pre-wrap select-text">
                    {file.textContent}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#232323] border border-white/[0.08]">
                    {getDocIcon()}
                  </div>
                  <h4 className="text-sm font-bold text-[#FDFDF5]">{file.name}</h4>
                  <p className="mt-1 text-xs text-[#E1E1D5] max-w-sm">
                    {t(
                      'filePreview.binaryDocNotice',
                      'This binary document is ready to be sent to BIS Sahayak for compliance analysis and clause scrutiny.'
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer / Quick Query Shortcuts for this file */}
        <div className="border-t border-white/[0.08] bg-[#232323] px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#E1E1D5]">
              <ShieldCheck className="h-4 w-4 text-[#AAA785] shrink-0" />
              <span>
                {t(
                  'filePreview.readyTip',
                  'File staged for official BIS conformity audit, STI verification & test report scrutiny.'
                )}
              </span>
            </div>

            {onAskAboutFile && (
              <div className="flex flex-wrap items-center gap-2">
                {isImage && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onAskAboutFile(file, 'Inspect the ISI mark, CML number, CRS R-number, or 6-digit HUID code in this photo.');
                      }}
                      className="rounded-lg border border-white/[0.08] bg-[#232323] px-2.5 py-1 text-xs font-medium text-[#E1E1D5] hover:text-[#AAA785] hover:border-[rgba(170,167,133,0.35)] transition-colors cursor-pointer"
                    >
                      {t('filePreview.verifyMarkLabels', 'Verify Mark & Labels')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onAskAboutFile(file, 'Identify this product and list the applicable Indian Standards (IS), mandatory QCO status, and Scheme.');
                      }}
                      className="rounded-lg border border-white/[0.08] bg-[#232323] px-2.5 py-1 text-xs font-medium text-[#E1E1D5] hover:text-[#AAA785] hover:border-[rgba(170,167,133,0.35)] transition-colors cursor-pointer"
                    >
                      {t('filePreview.findApplicableStandards', 'Find Applicable IS Standards')}
                    </button>
                  </>
                )}

                {isVideo && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onAskAboutFile(file, 'Review this testing/manufacturing video against BIS Scheme of Testing and Inspection (STI) guidelines.');
                    }}
                    className="rounded-lg border border-white/[0.08] bg-[#232323] px-2.5 py-1 text-xs font-medium text-[#E1E1D5] hover:text-[#AAA785] hover:border-[rgba(170,167,133,0.35)] transition-colors cursor-pointer"
                  >
                    {t('filePreview.analyzeTestingRoutine', 'Analyze Testing Routine in Video')}
                  </button>
                )}

                {isDocument && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onAskAboutFile(file, 'Scrutinize this test report/document against BIS specification limits and highlight pass/fail clauses.');
                      }}
                      className="rounded-lg border border-white/[0.08] bg-[#232323] px-2.5 py-1 text-xs font-medium text-[#E1E1D5] hover:text-[#AAA785] hover:border-[rgba(170,167,133,0.35)] transition-colors cursor-pointer"
                    >
                      {t('filePreview.scrutinizeTestReport', 'Scrutinize Test Report')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onAskAboutFile(file, 'Verify the technical documentation checklist and regulatory requirements in this file.');
                      }}
                      className="rounded-lg border border-white/[0.08] bg-[#232323] px-2.5 py-1 text-xs font-medium text-[#E1E1D5] hover:text-[#AAA785] hover:border-[rgba(170,167,133,0.35)] transition-colors cursor-pointer"
                    >
                      {t('filePreview.auditDocumentation', 'Audit Documentation')}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
