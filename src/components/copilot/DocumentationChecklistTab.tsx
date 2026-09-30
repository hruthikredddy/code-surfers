import { useState } from 'react';
import { CheckSquare, Square, AlertTriangle, Sparkles, Copy, Check, Filter } from 'lucide-react';
import { DOCUMENTATION_CHECKLIST, DocumentChecklistItem } from '../../data/complianceCopilotData.ts';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface DocumentationChecklistTabProps {
  completedDocs: string[];
  onToggleDoc: (id: string) => void;
  onQueryAssistant: (prompt: string) => void;
}

export function DocumentationChecklistTab({
  completedDocs,
  onToggleDoc,
  onQueryAssistant
}: DocumentationChecklistTabProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'Legal & Administrative', 'Manufacturing Plant', 'Lab & Quality Control', 'Raw Material & Suppliers'];

  const filteredDocs = DOCUMENTATION_CHECKLIST.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const completionPercent = Math.round(
    (completedDocs.length / DOCUMENTATION_CHECKLIST.length) * 100
  );

  const handleCopyChecklist = () => {
    const summary = DOCUMENTATION_CHECKLIST.map((doc) => {
      const status = completedDocs.includes(doc.id) ? '[COMPLETED]' : '[PENDING]';
      return `${status} ${doc.title} (${doc.category}) - ${doc.importance}`;
    }).join('\n');

    navigator.clipboard.writeText(`BIS Compliance Documentation Checklist\nProgress: ${completedDocs.length}/${DOCUMENTATION_CHECKLIST.length} (${completionPercent}%)\n\n${summary}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Progress & Header */}
      <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3.5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E1E1D5]">
              {t('copilot.checklist.title', 'Audit Documentation Dossier')}
            </h4>
            <p className="text-[11px] text-[#AAA785]">
              {t('copilot.checklist.subtitle', 'Verify statutory filings, factory records, and lab calibration certificates required by auditors')}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FDFDF5]">
            <span>{completedDocs.length} / {DOCUMENTATION_CHECKLIST.length}</span>
            <span className="rounded-full bg-[#2A2E28] px-2 py-0.5 text-[11px] font-semibold text-[#E1E1D5] border border-[rgba(170,167,133,0.20)]">
              {completionPercent}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#2A2E28]">
          <div
            className="h-full bg-[#AAA785] text-[#232323] hover:bg-[#E1E1D5] transition-all duration-300"
            style={{ width: `${completionPercent}%` }}
          />
        </div>

        {/* Action button row */}
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-[rgba(170,167,133,0.15)]">
          <span className="text-[11px] text-[#AAA785]">
            {t('common.status', 'Status')} ({completedDocs.length} / {DOCUMENTATION_CHECKLIST.length})
          </span>
          <button
            type="button"
            onClick={handleCopyChecklist}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#E1E1D5] hover:text-[#FDFDF5] border border-[rgba(170,167,133,0.20)] rounded px-2 py-0.5 hover:bg-[#2A2E28] transition-colors cursor-pointer"
          >
            {copied ? <Check className="h-3 w-3 text-[#AAA785]" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? t('common.copied', 'Copied') : t('common.copy', 'Copy Summary')}</span>
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] mr-1 flex items-center gap-1 shrink-0">
          <Filter className="h-3 w-3" />
          {t('common.filter', 'Filter')}:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#233A23] text-[#FDFDF5]'
                : 'bg-[#232323] text-[#E1E1D5] border border-[rgba(170,167,133,0.20)] hover:bg-[#2A2E28]'
            }`}
          >
            {cat === 'All' ? t('common.all', 'All') : cat}
          </button>
        ))}
      </div>

      {/* Document Items List */}
      <div className="space-y-2.5">
        {filteredDocs.map((item: DocumentChecklistItem) => {
          const isDone = completedDocs.includes(item.id);

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all p-3.5 ${
                isDone
                  ? 'border-[rgba(170,167,133,0.25)] bg-[#2A2E28]/25'
                  : 'border-[rgba(170,167,133,0.20)] bg-[#232323] hover:border-[rgba(170,167,133,0.30)]'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  id={`toggle-doc-${item.id}`}
                  onClick={() => onToggleDoc(item.id)}
                  aria-label={isDone ? 'Mark document pending' : 'Mark document ready'}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors cursor-pointer ${
                    isDone
                      ? 'border-emerald-600 bg-[#AAA785] text-[#232323] hover:bg-[#E1E1D5] text-white'
                      : 'border-[rgba(170,167,133,0.30)] bg-[#232323] hover:border-[rgba(170,167,133,0.40)] text-transparent'
                  }`}
                >
                  {isDone ? <CheckSquare className="h-3.5 w-3.5" /> : <Square className="h-3.5 w-3.5" />}
                </button>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#AAA785]">
                      {item.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        item.importance === 'Strictly Mandatory'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200/80'
                          : 'bg-[#2A2E28] text-[#E1E1D5]'
                      }`}
                    >
                      {item.importance}
                    </span>
                  </div>

                  <h5 className={`text-xs font-bold ${isDone ? 'text-[#E1E1D5] line-through' : 'text-[#FDFDF5]'}`}>
                    {item.title}
                  </h5>

                  <p className="text-[11px] text-[#E1E1D5] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Audit Trap Note */}
                  <div className="flex items-start gap-1.5 rounded-lg bg-[#2A2E28]/70 border border-[rgba(170,167,133,0.25)]/70 p-2 text-[11px] text-[#FDFDF5]">
                    <AlertTriangle className="h-3 w-3 mt-0.5 text-[#AAA785] shrink-0" />
                    <div>
                      <span className="font-semibold text-[10px] uppercase tracking-wider block">Auditor Scrutiny Check:</span>
                      <span className="text-[#E1E1D5]">{item.auditTrapNote}</span>
                    </div>
                  </div>

                  {/* Ask Sahayak Draft Template Action */}
                  <div className="pt-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onQueryAssistant(item.samplePrompt)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[#E1E1D5] hover:text-[#FDFDF5] transition-colors cursor-pointer"
                    >
                      <Sparkles className="h-3 w-3 text-[#AAA785]" />
                      <span>Ask Sahayak for format & sample</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
