import { useState } from 'react';
import {
  X,
  ArrowLeft,
  FlaskConical,
  CheckSquare,
  Building2,
  Activity,
  FileCheck,
  MapPin,
  HelpCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { TestRequirementDiscovery } from './TestRequirementDiscovery.tsx';
import { TestingChecklistTab } from './TestingChecklistTab.tsx';
import { LabFinderTab } from './LabFinderTab.tsx';
import { TestGapAnalysisTab } from './TestGapAnalysisTab.tsx';
import { TestReportIntelligenceTab } from './TestReportIntelligenceTab.tsx';
import { TestingRoadmapTab } from './TestingRoadmapTab.tsx';
import { TestingQATab } from './TestingQATab.tsx';
import { ContextualMiniBrain } from '../minibrain/ContextualMiniBrain.tsx';

export type TestingTabType =
  | 'requirements'
  | 'checklist'
  | 'labs'
  | 'gaps'
  | 'reports'
  | 'roadmap'
  | 'qa';

interface TestingIntelligenceProps {
  isOpen: boolean;
  onClose: () => void;
  onQueryAssistant: (prompt: string) => void;
  initialTab?: TestingTabType;
}

export function TestingIntelligence({
  isOpen,
  onClose,
  onQueryAssistant,
  initialTab = 'requirements'
}: TestingIntelligenceProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TestingTabType>(initialTab);
  const [activeTestFilter, setActiveTestFilter] = useState<string | undefined>(undefined);

  if (!isOpen) return null;

  const tabs: {
    id: TestingTabType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: 'requirements', label: t('testing.tabRequirements', '1 & 2. Requirements & Methods'), icon: FlaskConical },
    { id: 'checklist', label: t('testing.tabChecklist', '3. Testing Checklist'), icon: CheckSquare },
    { id: 'labs', label: t('testing.tabLabFinder', '4 & 5. Lab Finder & Matching'), icon: Building2 },
    { id: 'gaps', label: t('testing.tabGapAnalysis', '7. Gap Analysis'), icon: Activity },
    { id: 'reports', label: t('testing.tabReportScrutiny', '8. Report Scrutiny'), icon: FileCheck, badge: 'AI Audit' },
    { id: 'roadmap', label: t('testing.tabRoadmap', '9. Testing Roadmap'), icon: MapPin },
    { id: 'qa', label: t('testing.tabQA', '11 & 12. Multilingual Q&A'), icon: HelpCircle }
  ];

  const handleSelectLabForTest = (testId: string) => {
    setActiveTestFilter(testId);
    setActiveTab('labs');
  };

  return (
    <div
      id="testing-intelligence-panel"
      aria-label="Testing & Laboratory Intelligence"
      className="fixed inset-0 z-50 flex flex-col h-screen w-screen bg-[#10150F] text-[#F1F4EA] overflow-hidden animate-in fade-in duration-200"
    >
      {/* Institutional Top Header */}
      <div className="flex items-center justify-between border-b border-[rgba(210,230,190,0.10)] bg-[#171C13] px-4 sm:px-6 py-2.5 shrink-0">
        <div className="flex items-center gap-3">
          {/* Small compact Back Arrow to return to chat */}
          <button
            type="button"
            id="back-from-testing-button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[rgba(210,230,190,0.15)] bg-[#292F22] text-[#C0C7B7] hover:bg-[#343B2B] hover:text-[#F1F4EA] hover:border-[#B8F23D]/30 transition-all cursor-pointer shadow-2xs shrink-0"
            title={t('testing.backToChat', 'Back to chat')}
            aria-label={t('testing.backToChat', 'Back to chat')}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-[rgba(210,230,190,0.10)]" />

          {/* Clean Left-aligned Heading */}
          <div className="flex flex-col justify-center">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F4EA] leading-snug">
              {t('testing.title', 'Testing & Laboratory Intelligence')}
            </h2>
            <p className="text-[11px] text-[#858D7D] font-normal leading-normal hidden sm:block">
              {t('testing.subtitle', 'BIS laboratory finder, test methods, test report scrutiny & gap analysis')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://lims.bis.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-[rgba(210,230,190,0.15)] bg-[#292F22] min-h-[32px] px-3 py-1.5 text-xs font-medium text-[#C0C7B7] hover:bg-[#343B2B] hover:text-[#F1F4EA] transition-colors leading-normal"
          >
            <span>BIS LIMS Official</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#858D7D]" />
          </a>

          <button
            type="button"
            id="close-testing-button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#858D7D] hover:bg-[#292F22] hover:text-[#F1F4EA] transition-colors cursor-pointer"
            title="Return to chat"
            aria-label="Return to chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Workspace Navigation Tab Bar */}
      <div className="border-b border-[rgba(210,230,190,0.10)] bg-[#171C13] px-4 sm:px-6 py-2 shrink-0 overflow-x-auto scrollbar-none">
        <nav className="flex space-x-1 sm:space-x-2 min-w-max" aria-label="Testing Intelligence Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg min-h-[34px] px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer select-none leading-normal ${
                  isActive
                    ? 'bg-[#292F22] text-[#B8F23D] border border-[#B8F23D]/30 shadow-2xs'
                    : 'text-[#C0C7B7] hover:bg-[#292F22]/60 hover:text-[#F1F4EA]'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-[#B8F23D]' : 'text-[#858D7D]'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-semibold leading-normal ${
                      isActive ? 'bg-[#B8F23D] text-[#10150F]' : 'bg-[#171C13] text-[#858D7D] border border-[rgba(210,230,190,0.10)]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Tab Content Body (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#10150F]">
        <div className="mx-auto max-w-6xl">
          {activeTab === 'requirements' && (
            <TestRequirementDiscovery
              onSelectLabForTest={handleSelectLabForTest}
              onQueryAssistant={onQueryAssistant}
            />
          )}

          {activeTab === 'checklist' && (
            <TestingChecklistTab onQueryAssistant={onQueryAssistant} />
          )}

          {activeTab === 'labs' && (
            <LabFinderTab
              initialTestFilter={activeTestFilter}
              onQueryAssistant={onQueryAssistant}
            />
          )}

          {activeTab === 'gaps' && (
            <TestGapAnalysisTab
              onNavigateToLabs={handleSelectLabForTest}
              onQueryAssistant={onQueryAssistant}
            />
          )}

          {activeTab === 'reports' && (
            <TestReportIntelligenceTab
              onQueryAssistant={onQueryAssistant}
              onNavigateToGaps={() => setActiveTab('gaps')}
            />
          )}

          {activeTab === 'roadmap' && (
            <TestingRoadmapTab
              onQueryAssistant={onQueryAssistant}
              onNavigateToTab={(tab) => setActiveTab(tab as TestingTabType)}
            />
          )}

          {activeTab === 'qa' && (
            <TestingQATab onQueryAssistant={onQueryAssistant} />
          )}
        </div>
      </div>

      {/* Lightweight Contextual Mini-Brain for Testing Guidance */}
      <ContextualMiniBrain
        capability="TESTING_GUIDANCE"
        context={{
          currentPage: 'Testing & Laboratory Intelligence',
          activeTab,
          activeTestFilter
        }}
      />
    </div>
  );
}
