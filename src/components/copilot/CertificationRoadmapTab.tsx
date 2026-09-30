import { useState } from 'react';
import { CheckCircle2, Clock, HelpCircle, ExternalLink, AlertTriangle, Sparkles, Filter } from 'lucide-react';
import { CERTIFICATION_ROADMAP, RoadmapMilestone } from '../../data/complianceCopilotData.ts';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface CertificationRoadmapTabProps {
  completedMilestones: string[];
  onToggleMilestone: (id: string) => void;
  onQueryAssistant: (prompt: string) => void;
}

export function CertificationRoadmapTab({
  completedMilestones,
  onToggleMilestone,
  onQueryAssistant
}: CertificationRoadmapTabProps) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(CERTIFICATION_ROADMAP[0]?.id || null);

  const filteredMilestones = CERTIFICATION_ROADMAP.filter((m) => {
    const isDone = completedMilestones.includes(m.id);
    if (filter === 'completed') return isDone;
    if (filter === 'pending') return !isDone;
    return true;
  });

  const completionPercent = Math.round(
    (completedMilestones.length / CERTIFICATION_ROADMAP.length) * 100
  );

  return (
    <div className="space-y-4">
      {/* Overview & Filter Bar */}
      <div className="rounded-2xl border border-[rgba(170,167,133,0.22)] bg-[#232323] p-4 sm:p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#AAA785]">
              {t('copilot.roadmap.title', 'Certification Milestone Roadmap')}
            </h4>
            <p className="text-[11px] text-[#E1E1D5] mt-0.5">
              {t('copilot.roadmap.subtitle', '6-Phase journey from Indian Standard scrutiny to post-grant ISI surveillance')}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FDFDF5]">
            <span>{completedMilestones.length} / {CERTIFICATION_ROADMAP.length} {t('copilot.roadmap.completed', 'completed')}</span>
            <span className="rounded-full bg-[#232323] px-2.5 py-0.5 text-[11px] text-[#AAA785] border border-[#AAA785]/25 font-mono">
              {completionPercent}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#232323]">
          <div
            className="h-full bg-[#AAA785] transition-all duration-300 shadow-[0_0_8px_rgba(170,167,133,0.30)]"
            style={{ width: `${completionPercent}%` }}
          />
        </div>

        {/* Filters */}
        <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-[rgba(170,167,133,0.20)]">
          <div className="flex items-center gap-1.5 text-[11px] text-[#AAA785]">
            <Filter className="h-3 w-3" />
            <span>{t('copilot.roadmap.show', 'Show:')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {(['all', 'pending', 'completed'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer capitalize ${
                  filter === mode
                    ? 'bg-[#AAA785] text-[#232323] shadow-2xs'
                    : 'bg-[#232323] text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5]'
                }`}
              >
                {mode === 'all'
                  ? t('copilot.roadmap.all', 'All')
                  : mode === 'pending'
                  ? t('copilot.roadmap.pending', 'Pending')
                  : t('copilot.roadmap.completedBadge', 'Completed')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-3">
        {filteredMilestones.map((m: RoadmapMilestone, idx) => {
          const isDone = completedMilestones.includes(m.id);
          const isExpanded = expandedId === m.id;
          const isCurrentActive = !isDone && (idx === 0 || completedMilestones.includes(filteredMilestones[idx - 1]?.id));

          return (
            <div
              key={m.id}
              className={`rounded-2xl border transition-all duration-200 ${
                isDone
                  ? 'border-[#AAA785]/30 bg-[#232323] hover:border-[#AAA785]/50'
                  : isCurrentActive
                  ? 'border-[#AAA785]/60 bg-[#232323] shadow-[0_0_12px_rgba(170,167,133,0.20)]'
                  : 'border-[rgba(170,167,133,0.20)] bg-[#232323] hover:bg-[#232323] hover:border-[rgba(170,167,133,0.25)]'
              }`}
            >
              {/* Header row */}
              <div className="flex items-start gap-3.5 p-4">
                <button
                  type="button"
                  id={`toggle-milestone-${m.id}`}
                  onClick={() => onToggleMilestone(m.id)}
                  aria-label={isDone ? 'Mark milestone pending' : 'Mark milestone completed'}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all cursor-pointer ${
                    isDone
                      ? 'border-[#AAA785] bg-[#AAA785] text-[#232323] shadow-[0_0_6px_rgba(170,167,133,0.30)]'
                      : isCurrentActive
                      ? 'border-[#AAA785] bg-[#2A3328] hover:bg-[#232323]'
                      : 'border-[rgba(170,167,133,0.25)] bg-[#2A3328] hover:border-[#AAA785]/60'
                  }`}
                >
                  {isDone && <CheckCircle2 className="h-3.5 w-3.5" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785]">
                      {m.phaseTitle}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#E1E1D5] font-medium bg-[#2A3328] px-2 py-0.5 rounded-full border border-[rgba(170,167,133,0.18)]">
                      <Clock className="h-3 w-3 text-[#AAA785]" />
                      {m.estimatedTimeline}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : m.id)}
                    className="mt-1 text-left font-bold text-xs sm:text-sm text-[#FDFDF5] hover:text-[#AAA785] transition-colors w-full cursor-pointer flex items-center justify-between"
                  >
                    <span className={isDone ? 'line-through text-[#AAA785]' : ''}>
                      {m.title}
                    </span>
                    <span className="text-[10px] text-[#AAA785] ml-2 font-medium shrink-0">
                      {isExpanded ? t('common.close', 'Hide') : t('common.details', 'Details & Actions')}
                    </span>
                  </button>

                  <p className="mt-1 text-[11.5px] text-[#E1E1D5] leading-relaxed line-clamp-2">
                    {m.description}
                  </p>
                </div>
              </div>

              {/* Expanded Details Body */}
              {isExpanded && (
                <div className="border-t border-[rgba(170,167,133,0.20)] bg-[#2A3328]/80 p-4 text-xs space-y-3 animate-in fade-in duration-150 rounded-b-2xl">
                  {m.mandatoryNote && (
                    <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-950/30 p-2.5 text-amber-200 text-[11px]">
                      <AlertTriangle className="h-3.5 w-3.5 mt-0.5 text-amber-400 shrink-0" />
                      <span>{m.mandatoryNote}</span>
                    </div>
                  )}

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] block mb-1.5">
                      Key Deliverables & Action Items:
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-[#E1E1D5]">
                      {m.keyDeliverables.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-[#AAA785] mt-0.5">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[rgba(170,167,133,0.20)]">
                    <button
                      type="button"
                      onClick={() => onQueryAssistant(m.assistantPrompt)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#232323] border border-[rgba(170,167,133,0.25)] hover:border-[#AAA785]/40 hover:bg-[#2A2E28] px-3 py-1.5 text-[11px] font-semibold text-[#FDFDF5] transition-all cursor-pointer shadow-2xs"
                    >
                      <Sparkles className="h-3 w-3 text-[#AAA785]" />
                      <span>{t('copilot.roadmap.askSahayak', 'Ask Sahayak about this step')}</span>
                    </button>

                    {m.portalActionUrl && (
                      <a
                        href={m.portalActionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#AAA785] hover:underline underline-offset-2"
                      >
                        <span>{m.portalActionLabel || 'Official Portal'}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
