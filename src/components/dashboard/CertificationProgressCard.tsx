import { ShieldCheck, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { getComplianceMetrics } from '../../services/dashboardDataService.ts';

interface CertificationProgressCardProps {
  onOpenCopilot: (tab?: string) => void;
  onOpenTesting: (tab?: string) => void;
}

export function CertificationProgressCard({ onOpenCopilot, onOpenTesting }: CertificationProgressCardProps) {
  const { t } = useLanguage();
  const metrics = getComplianceMetrics();

  return (
    <div className="rounded-2xl border border-[rgba(170,167,133,0.22)] bg-[#232323] p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A3328] text-[#AAA785] border border-[#AAA785]/25 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#FDFDF5] leading-snug">
                {t('dashboard.certProgressTitle', 'Certification Readiness')}
              </h3>
              <p className="text-xs text-[#E1E1D5] leading-normal mt-0.5">
                {t('dashboard.certProgressSubtitle', 'Scheme-I (ISI Mark) & CRS Compliance Milestone Progress')}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-[#FDFDF5] leading-none">
              {metrics.compliancePercentage}%
            </span>
            <span className="block text-[10px] font-semibold text-[#AAA785] mt-0.5">
              {t('dashboard.onTrack', 'On Track')}
            </span>
          </div>
        </div>

        {/* Progress Bar with segmented visuals */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-xs text-[#E1E1D5] font-medium leading-normal">
            <span>{t('dashboard.overallReadiness', 'Overall Statutory Readiness')}</span>
            <span className="font-semibold text-[#FDFDF5]">{metrics.passed} / {metrics.total} {t('dashboard.items', 'Items Analyzed')}</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#2A3328] border border-[rgba(170,167,133,0.18)] overflow-hidden flex">
            <div
              className="bg-[#AAA785] h-full transition-all duration-500"
              style={{ width: `${(metrics.passed / metrics.total) * 100}%` }}
              title={`Passed: ${metrics.passed}`}
            />
            <div
              className="bg-amber-400 h-full transition-all duration-500"
              style={{ width: `${(metrics.pending / metrics.total) * 100}%` }}
              title={`Pending: ${metrics.pending}`}
            />
            <div
              className="bg-rose-500 h-full transition-all duration-500"
              style={{ width: `${(metrics.failed / metrics.total) * 100}%` }}
              title={`Failed/Action: ${metrics.failed}`}
            />
          </div>
        </div>

        {/* Checklist Highlights */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#232323] border border-[rgba(170,167,133,0.18)] text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#AAA785] shrink-0" />
              <div>
                <span className="font-semibold text-[#FDFDF5]">
                  {t('dashboard.phase12Ready', 'Phase 1 & 2: IS Standard & Scope')}
                </span>
                <p className="text-[11px] text-[#E1E1D5]">IS 302-2-15 & IS 17803 classified, QCO confirmed</p>
              </div>
            </div>
            <span className="font-semibold text-[#AAA785] bg-[#233A23] px-2 py-0.5 rounded border border-[#AAA785]/25 text-[11px]">
              {t('common.completed', 'Completed')}
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#232323] border border-[rgba(170,167,133,0.18)] text-xs">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-semibold text-[#FDFDF5]">
                  {t('dashboard.phase3Testing', 'Phase 3 & 4: In-House STI & Lab Testing')}
                </span>
                <p className="text-[11px] text-[#E1E1D5]">5 sample test batches in progress at recognized labs</p>
              </div>
            </div>
            <span className="font-semibold text-amber-400 bg-[#2A2E28]0/10 px-2 py-0.5 rounded border border-amber-500/30 text-[11px]">
              {t('common.pending', 'In Progress')}
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#232323] border border-[rgba(170,167,133,0.18)] text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
              <div>
                <span className="font-semibold text-[#FDFDF5]">
                  {t('dashboard.gapAlert', 'Action Required: Migration Test Report')}
                </span>
                <p className="text-[11px] text-[#E1E1D5]">IS 9845 overall migration test omitted on SS bottle</p>
              </div>
            </div>
            <span className="font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30 text-[11px]">
              {t('dashboard.actionNeeded', 'Action Req')}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-[rgba(170,167,133,0.20)] flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onOpenCopilot('roadmap')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#AAA785] hover:underline transition-colors cursor-pointer"
        >
          <span>{t('dashboard.viewFullRoadmap', 'View Full 6-Phase Roadmap')}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onOpenTesting('report')}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#232323] hover:bg-[#2A2E28] border border-[rgba(170,167,133,0.22)] text-[#FDFDF5] px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
        >
          <span>{t('dashboard.scrutinizeReport', 'Scrutinize Test Report')}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
