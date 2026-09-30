import { useState, useEffect } from 'react';
import {
  X,
  Compass,
  MapPin,
  CheckSquare,
  ShieldCheck,
  FlaskConical,
  Activity,
  GitFork,
  BookOpen,
  Sparkles,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { CertificationRoadmapTab } from './CertificationRoadmapTab.tsx';
import { ComplianceAssessmentTab } from './ComplianceAssessmentTab.tsx';
import { DocumentationChecklistTab } from './DocumentationChecklistTab.tsx';
import { GapAnalysisTab } from './GapAnalysisTab.tsx';
import { LicensingGuidanceTab } from './LicensingGuidanceTab.tsx';
import { TestingRequirementsTab } from './TestingRequirementsTab.tsx';
import { WorkflowsTab } from './WorkflowsTab.tsx';
import { CERTIFICATION_ROADMAP, DOCUMENTATION_CHECKLIST } from '../../data/complianceCopilotData.ts';
import { ContextualMiniBrain } from '../minibrain/ContextualMiniBrain.tsx';

export type CopilotTabType =
  | 'roadmap'
  | 'assessment'
  | 'checklist'
  | 'licensing'
  | 'testing'
  | 'gaps'
  | 'workflows';

interface ComplianceCopilotProps {
  isOpen: boolean;
  onClose: () => void;
  onQueryAssistant: (prompt: string) => void;
  initialTab?: CopilotTabType;
}

const STORAGE_KEY_MILESTONES = 'bis_copilot_completed_milestones_v1';
const STORAGE_KEY_DOCS = 'bis_copilot_completed_docs_v1';

export function ComplianceCopilot({
  isOpen,
  onClose,
  onQueryAssistant,
  initialTab = 'roadmap'
}: ComplianceCopilotProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<CopilotTabType>(initialTab);

  // Sync tab if parent updates initialTab (e.g., from sidebar navigation)
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const [completedMilestones, setCompletedMilestones] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MILESTONES);
      return saved ? JSON.parse(saved) : ['milestone-1'];
    } catch {
      return ['milestone-1'];
    }
  });

  const [completedDocs, setCompletedDocs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DOCS);
      return saved ? JSON.parse(saved) : ['doc-2'];
    } catch {
      return ['doc-2'];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MILESTONES, JSON.stringify(completedMilestones));
    } catch (e) {
      console.warn('Unable to persist milestones:', e);
    }
  }, [completedMilestones]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(completedDocs));
    } catch (e) {
      console.warn('Unable to persist documents:', e);
    }
  }, [completedDocs]);

  const handleToggleMilestone = (id: string) => {
    setCompletedMilestones((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleToggleDoc = (id: string) => {
    setCompletedDocs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleResetProgress = () => {
    setCompletedMilestones([]);
    setCompletedDocs([]);
  };

  // Overall certification progress combines both milestones and documents
  const totalTasks = CERTIFICATION_ROADMAP.length + DOCUMENTATION_CHECKLIST.length;
  const completedTotal = completedMilestones.length + completedDocs.length;
  const overallProgress = Math.round((completedTotal / totalTasks) * 100);

  if (!isOpen) return null;

  const tabs: { id: CopilotTabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'roadmap', label: t('copilot.tabRoadmap', 'Roadmap'), icon: MapPin },
    { id: 'assessment', label: t('copilot.tabAssessment', 'Assessment'), icon: Compass },
    { id: 'checklist', label: t('copilot.tabChecklist', 'Checklist'), icon: CheckSquare },
    { id: 'licensing', label: t('copilot.tabLicensing', 'Licensing'), icon: ShieldCheck },
    { id: 'testing', label: t('copilot.tabTesting', 'Testing & Labs'), icon: FlaskConical },
    { id: 'gaps', label: t('copilot.tabAudit', 'Gap Analysis'), icon: Activity },
    { id: 'workflows', label: t('copilot.tabWorkflows', 'Workflows'), icon: GitFork }
  ];

  return (
    <div
      id="compliance-copilot-panel"
      aria-label="Certificate Compliance"
      className="fixed inset-0 z-50 flex flex-col h-screen w-screen bg-[#233A23] text-[#FDFDF5] overflow-hidden animate-in fade-in duration-200"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] bg-[#2A3328] px-4 sm:px-6 py-2.5 shrink-0">
        <div className="flex items-center gap-3">
          {/* Small compact Back Arrow to return to chat */}
          <button
            type="button"
            id="back-from-copilot-button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[rgba(170,167,133,0.25)] bg-[#232323] text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] hover:border-[#AAA785]/30 transition-all cursor-pointer shadow-2xs shrink-0"
            title={t('copilot.backToChat', 'Back to chat')}
            aria-label={t('copilot.backToChat', 'Back to chat')}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-[rgba(170,167,133,0.20)]" />

          {/* Clean Left-aligned Heading */}
          <div className="flex flex-col justify-center">
            <h2 className="text-sm sm:text-base font-bold text-[#FDFDF5] leading-snug">
              {t('copilot.title', 'Certificate Compliance')}
            </h2>
            <p className="text-[11px] text-[#AAA785] font-normal leading-normal hidden sm:block">
              {t('copilot.subtitle', 'Interactive BIS certification roadmap, licensing guidance & audit readiness')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetProgress}
            className="inline-flex items-center gap-1 rounded-lg border border-[rgba(170,167,133,0.25)] bg-[#232323] min-h-[32px] px-2.5 py-1.5 text-xs font-medium text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] transition-colors cursor-pointer leading-normal"
            title={t('common.reset', 'Reset progress')}
            aria-label={t('common.reset', 'Reset progress')}
          >
            <RotateCcw className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden md:inline text-[11px]">{t('common.reset', 'Reset Progress')}</span>
          </button>

          <button
            type="button"
            id="close-copilot-button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#AAA785] hover:bg-[#232323] hover:text-[#FDFDF5] transition-colors cursor-pointer"
            title={t('common.close', 'Return to chat')}
            aria-label={t('common.close', 'Return to chat')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Persistent Overall Progress Strip */}
      <div className="border-b border-[rgba(170,167,133,0.20)] bg-[#232323] px-4 py-2 text-[#FDFDF5]">
        <div className="flex items-center justify-between text-xs mb-1 leading-normal">
          <span className="font-semibold text-[#FDFDF5] flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#AAA785] animate-pulse shrink-0"></span>
            {t('copilot.overallReadiness', 'Overall Certification Readiness:')}
          </span>
          <span className="font-mono font-bold text-[#AAA785]">
            {overallProgress}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#232323]">
          <div
            className="h-full bg-[#AAA785] transition-all duration-300 shadow-[0_0_8px_rgba(170,167,133,0.30)]"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-[#AAA785] mt-1 leading-normal">
          <span>{completedMilestones.length}/{CERTIFICATION_ROADMAP.length} Milestones</span>
          <span>{completedDocs.length}/{DOCUMENTATION_CHECKLIST.length} Documents</span>
        </div>
      </div>

      {/* Horizontal Nav Tabs */}
      <div className="flex items-center overflow-x-auto border-b border-[rgba(170,167,133,0.20)] bg-[#2A3328] px-2 py-1 gap-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`copilot-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg min-h-[34px] px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer leading-normal ${
                isActive
                  ? 'bg-[#232323] text-[#AAA785] border border-[#AAA785]/30 shadow-2xs'
                  : 'text-[#E1E1D5] hover:bg-[#232323]/60 hover:text-[#FDFDF5]'
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Scrollable Tab Content View */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#233A23]">
        <div className="mx-auto max-w-5xl">
          {activeTab === 'roadmap' && (
            <CertificationRoadmapTab
              completedMilestones={completedMilestones}
              onToggleMilestone={handleToggleMilestone}
              onQueryAssistant={onQueryAssistant}
            />
          )}

          {activeTab === 'assessment' && (
            <ComplianceAssessmentTab onQueryAssistant={onQueryAssistant} />
          )}

          {activeTab === 'checklist' && (
            <DocumentationChecklistTab
              completedDocs={completedDocs}
              onToggleDoc={handleToggleDoc}
              onQueryAssistant={onQueryAssistant}
            />
          )}

          {activeTab === 'licensing' && (
            <LicensingGuidanceTab onQueryAssistant={onQueryAssistant} />
          )}

          {activeTab === 'testing' && (
            <TestingRequirementsTab onQueryAssistant={onQueryAssistant} />
          )}

          {activeTab === 'gaps' && (
            <GapAnalysisTab onQueryAssistant={onQueryAssistant} />
          )}

          {activeTab === 'workflows' && (
            <WorkflowsTab onQueryAssistant={onQueryAssistant} />
          )}
        </div>
      </div>

      {/* Bottom Sticky Assistant Shortcut Bar */}
      <div className="border-t border-[rgba(170,167,133,0.20)] bg-[#2A3328] p-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-[#E1E1D5] text-[11px]">
          <Sparkles className="h-3.5 w-3.5 text-[#AAA785]" />
          <span>Need real-time audit guidance?</span>
        </div>
        <button
          type="button"
          onClick={() =>
            onQueryAssistant(
              'Help me map out a custom BIS certification roadmap for my factory, detailing costs, in-house lab requirements, and audit timelines.'
            )
          }
          className="rounded-lg bg-[#232323] hover:bg-[#2A2E28] px-3 py-1.5 text-[11px] font-semibold text-[#AAA785] border border-[rgba(170,167,133,0.25)] hover:border-[#AAA785]/40 transition-colors cursor-pointer"
        >
          Consult Sahayak
        </button>
      </div>

      {/* Lightweight Contextual Mini-Brain for Certification Roadmap & Guidance */}
      <ContextualMiniBrain
        capability={activeTab === 'roadmap' ? 'COPILOT_ROADMAP' : 'COPILOT_GUIDANCE'}
        context={{
          currentPage: activeTab === 'roadmap' ? 'Certification Roadmap' : 'Certification Guidance',
          activeTab,
          completedMilestonesCount: completedMilestones.length,
          completedDocsCount: completedDocs.length
        }}
      />
    </div>
  );
}

// Named alias for cleaner imports
export const CertificationCopilot = ComplianceCopilot;
