import {
  MessageSquare,
  Search,
  Compass,
  FlaskConical,
  Award,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface QuickActionsGridProps {
  onOpenChat: (initialPrompt?: string) => void;
  onOpenCatalog: (tab?: 'STANDARDS' | 'SCHEMES' | 'HALLMARKING' | 'PORTALS') => void;
  onOpenCopilot: (tab?: string) => void;
  onOpenTesting: (tab?: string) => void;
  onOpenSmartFinder?: () => void;
  onOpenLabFinder?: () => void;
  onOpenHallmarking?: () => void;
  onOpenFeeCalculator?: () => void;
}

export function QuickActionsGrid({
  onOpenChat,
  onOpenCatalog,
  onOpenCopilot,
  onOpenTesting,
  onOpenSmartFinder,
  onOpenLabFinder,
  onOpenHallmarking,
  onOpenFeeCalculator
}: QuickActionsGridProps) {
  const { t } = useLanguage();

  const actions = [
    {
      id: 'ai-assistant',
      title: t('dashboard.qaAiAssistant', 'BIS AI Assistant'),
      description: t('dashboard.qaAiAssistantDesc', 'Ask regulatory queries, evaluate compliance, and get instant grounded answers'),
      icon: MessageSquare,
      color: 'bg-[#2A2E28] text-[#AAA785] border-[rgba(170,167,133,0.25)] group-hover:bg-blue-600 group-hover:text-white',
      badge: 'Interactive AI',
      onClick: () => onOpenChat()
    },
    {
      id: 'standard-finder',
      title: t('dashboard.qaStandardFinder', 'Smart Standard Finder'),
      description: t('dashboard.qaStandardFinderDesc', 'Semantic & keyword search across 21,000+ standards, ICS codes, scopes & QCOs'),
      icon: Search,
      color: 'bg-[#2A2E28] text-[#AAA785] border-[rgba(170,167,133,0.25)] group-hover:bg-[#AAA785] text-[#232323] hover:bg-[#E1E1D5] group-hover:text-white',
      badge: 'Smart Search',
      onClick: () => (onOpenSmartFinder ? onOpenSmartFinder() : onOpenCatalog('STANDARDS'))
    },
    {
      id: 'cert-guidance',
      title: t('dashboard.qaCertGuidance', 'Certification Guidance'),
      description: t('dashboard.qaCertGuidanceDesc', '6-Phase roadmap, licensing guides (Scheme-I, CRS, FMCS) & factory checklists'),
      icon: Compass,
      color: 'bg-[#2A2E28] text-[#AAA785] border-[rgba(170,167,133,0.25)] group-hover:bg-amber-600 group-hover:text-white',
      badge: 'Copilot',
      onClick: () => onOpenCopilot('roadmap')
    },
    {
      id: 'lab-finder',
      title: t('dashboard.qaLabFinder', 'Laboratory Finder'),
      description: t('dashboard.qaLabFinderDesc', 'Find BIS Central, Regional & recognized commercial labs across India via LIMS'),
      icon: FlaskConical,
      color: 'bg-teal-50 text-teal-600 border-teal-200 group-hover:bg-teal-600 group-hover:text-white',
      badge: 'LIMS Labs',
      onClick: () => (onOpenLabFinder ? onOpenLabFinder() : onOpenTesting('labs'))
    },
    {
      id: 'hallmarking',
      title: t('dashboard.qaHallmarking', 'Hallmarking Assistant'),
      description: t('dashboard.qaHallmarkingDesc', 'Verify 6-digit HUID code, check mandatory districts & consumer purity rules'),
      icon: Award,
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200 group-hover:bg-yellow-600 group-hover:text-white',
      badge: 'HUID & Gold',
      onClick: () => (onOpenHallmarking ? onOpenHallmarking() : onOpenCatalog('HALLMARKING'))
    },
    {
      id: 'consumer-assistant',
      title: t('dashboard.qaConsumerAssistant', 'Consumer Assistant'),
      description: t('dashboard.qaConsumerAssistantDesc', 'Verify genuine ISI mark via CM/L license number or report substandard products'),
      icon: ShieldAlert,
      color: 'bg-rose-50 text-rose-600 border-rose-200 group-hover:bg-rose-600 group-hover:text-white',
      badge: 'BIS Care',
      onClick: () => onOpenChat('How do I verify a genuine ISI mark on a product using the CM/L number or BIS Care App?')
    }
  ];

  return (
    <div className="rounded-2xl border border-[rgba(170,167,133,0.22)] bg-[#232323] p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] pb-3 mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#FDFDF5] leading-snug">
            {t('dashboard.quickActionsTitle', 'Workspace Quick Actions')}
          </h3>
          <p className="text-xs text-[#E1E1D5] leading-normal mt-0.5">
            {t('dashboard.quickActionsSubtitle', 'Direct access to official standards, licensing workflows & testing intelligence')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              className="group flex flex-col justify-between p-4 rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] hover:bg-[#232323] hover:border-[rgba(170,167,133,0.35)] hover:shadow-sm transition-all text-left cursor-pointer min-h-[115px]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2A3328] border border-[#AAA785]/25 text-[#AAA785]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="rounded bg-[#2A3328] px-2 py-0.5 text-[10px] font-semibold text-[#AAA785] border border-[#AAA785]/20">
                      {act.badge}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#AAA785] group-hover:text-[#AAA785] transition-colors" />
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#FDFDF5] leading-snug group-hover:text-[#AAA785] transition-colors">
                  {act.title}
                </h4>
                <p className="text-[11px] text-[#E1E1D5] leading-relaxed mt-1 line-clamp-2">
                  {act.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
