import {
  FileText,
  Search,
  Compass,
  MessageSquare,
  FlaskConical,
  Award,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { RecentActivityItem, ActivityType } from '../../types/index.ts';

interface RecentActivitySectionProps {
  activities: RecentActivityItem[];
  onNavigate: (target: {
    view: 'chat' | 'copilot' | 'catalog' | 'testing' | 'smart_finder' | 'lab_finder' | 'hallmarking' | 'fee_calculator';
    tab?: string;
    query?: string;
  }) => void;
}

export function RecentActivitySection({ activities, onNavigate }: RecentActivitySectionProps) {
  const { t } = useLanguage();

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'file_analysis':
        return <FileText className="h-4 w-4 text-[#AAA785]" />;
      case 'standard_search':
        return <Search className="h-4 w-4 text-[#AAA785]" />;
      case 'copilot_guidance':
        return <Compass className="h-4 w-4 text-[#AAA785]" />;
      case 'ai_query':
        return <MessageSquare className="h-4 w-4 text-[#AAA785]" />;
      case 'lab_search':
        return <FlaskConical className="h-4 w-4 text-[#AAA785]" />;
      case 'hallmarking_check':
        return <Award className="h-4 w-4 text-[#AAA785]" />;
      default:
        return <FileText className="h-4 w-4 text-[#AAA785]" />;
    }
  };

  const getStatusBadgeClass = (statusType?: 'passed' | 'pending' | 'failed' | 'info') => {
    switch (statusType) {
      case 'passed':
        return 'bg-[#233A23] text-[#AAA785] border-[#AAA785]/25';
      case 'pending':
        return 'bg-[#2A2E28]0/15 text-amber-400 border-amber-500/30';
      case 'failed':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'info':
      default:
        return 'bg-[#2A2E28] text-[#E1E1D5] border-[rgba(170,167,133,0.22)]';
    }
  };

  return (
    <div className="rounded-2xl border border-[rgba(170,167,133,0.22)] bg-[#232323] p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] pb-3 mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#FDFDF5] leading-snug">
            {t('dashboard.recentActivityTitle', 'Recent Activity & Audits')}
          </h3>
          <p className="text-xs text-[#E1E1D5] leading-normal mt-0.5">
            {t('dashboard.recentActivitySubtitle', 'Your recent standard searches, file scrutinies, and advisory interactions')}
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {activities.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-3 p-3 rounded-xl border border-[rgba(170,167,133,0.18)] bg-[#232323] hover:bg-[#232323] hover:border-[rgba(170,167,133,0.30)] transition-colors"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2A3328] border border-[rgba(170,167,133,0.20)] shrink-0 mt-0.5">
                {getActivityIcon(item.type)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-[#FDFDF5] leading-snug">
                    {item.title}
                  </h4>
                  {item.statusBadge && (
                    <span
                      className={`rounded px-1.5 py-0.2 text-[10px] font-semibold border ${getStatusBadgeClass(
                        item.statusType
                      )}`}
                    >
                      {item.statusBadge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#E1E1D5] leading-relaxed mt-0.5 line-clamp-2">
                  {item.description}
                </p>
                <span className="text-[10px] text-[#AAA785] font-medium block mt-1">
                  {item.timestamp}
                </span>
              </div>
            </div>

            {item.actionTarget && (
              <button
                type="button"
                onClick={() => onNavigate(item.actionTarget!)}
                className="shrink-0 p-1.5 rounded-lg text-[#AAA785] hover:text-[#AAA785] hover:bg-[#232323] transition-colors cursor-pointer"
                title={t('common.viewDetails', 'View details')}
                aria-label={t('common.viewDetails', 'View details')}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}

        {activities.length === 0 && (
          <div className="py-8 text-center text-xs text-[#AAA785]">
            {t('dashboard.noActivities', 'No recent activity recorded yet.')}
          </div>
        )}
      </div>
    </div>
  );
}
