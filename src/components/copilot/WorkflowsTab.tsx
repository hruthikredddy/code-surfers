import { useState } from 'react';
import { GitFork, Clock, FileText, Lightbulb, Sparkles, CheckCircle2 } from 'lucide-react';
import { WORKFLOW_GUIDES, WorkflowGuide } from '../../data/complianceCopilotData.ts';

interface WorkflowsTabProps {
  onQueryAssistant: (prompt: string) => void;
}

export function WorkflowsTab({ onQueryAssistant }: WorkflowsTabProps) {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(WORKFLOW_GUIDES[0]?.id || 'simplified-route');

  const activeWorkflow: WorkflowGuide | undefined =
    WORKFLOW_GUIDES.find((w) => w.id === selectedWorkflowId) || WORKFLOW_GUIDES[0];

  return (
    <div className="space-y-4">
      {/* Workflow Route Switcher */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] block px-0.5">
          Select Certification Route:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {WORKFLOW_GUIDES.map((guide) => (
            <button
              key={guide.id}
              onClick={() => setSelectedWorkflowId(guide.id)}
              className={`rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                selectedWorkflowId === guide.id
                  ? 'border-[#AAA785] bg-[#233A23] text-[#FDFDF5] shadow-2xs'
                  : 'border-[rgba(170,167,133,0.20)] bg-[#232323] text-[#FDFDF5] hover:border-[rgba(170,167,133,0.30)] hover:bg-[#2A2E28]'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  selectedWorkflowId === guide.id ? 'text-[#E1E1D5]' : 'text-[#AAA785]'
                }`}>
                  {guide.totalEstimatedTime}
                </span>
              </div>
              <h5 className="text-xs font-bold leading-snug">
                {guide.title}
              </h5>
            </button>
          ))}
        </div>
      </div>

      {/* Active Workflow Details */}
      {activeWorkflow && (
        <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 shadow-2xs space-y-3.5">
          {/* Header */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#AAA785] font-medium mb-1">
              <Clock className="h-3.5 w-3.5 text-[#AAA785]" />
              <span>Overall Duration: <strong>{activeWorkflow.totalEstimatedTime}</strong></span>
            </div>
            <h4 className="text-sm font-bold text-[#FDFDF5]">
              {activeWorkflow.title}
            </h4>
            <p className="text-[11px] text-[#AAA785] mt-0.5">
              <strong>Best For:</strong> {activeWorkflow.suitability}
            </p>
          </div>

          {/* Steps Timeline */}
          <div className="space-y-3 pt-1 border-t border-[rgba(170,167,133,0.15)]">
            {activeWorkflow.steps.map((s) => (
              <div key={s.step} className="flex items-start gap-3 relative">
                {/* Step circle */}
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#233A23] text-[#FDFDF5] font-bold text-xs shadow-2xs">
                  {s.step}
                </div>

                <div className="flex-1 min-w-0 rounded-lg bg-[#2A2E28] p-3 border border-[rgba(170,167,133,0.15)] space-y-1.5">
                  <h6 className="text-xs font-bold text-[#FDFDF5]">
                    {s.title}
                  </h6>

                  <p className="text-[11px] text-[#E1E1D5] leading-relaxed">
                    {s.action}
                  </p>

                  {/* Documents needed */}
                  <div className="pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] flex items-center gap-1 mb-0.5">
                      <FileText className="h-3 w-3" />
                      Documents / Outputs:
                    </span>
                    <ul className="space-y-0.5 text-[11px] text-[#E1E1D5]">
                      {s.documents.map((doc, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1">
                          <span className="text-[#AAA785]">•</span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Auditor Tip */}
                  <div className="flex items-start gap-1.5 rounded bg-[#2A2E28]/70 border border-[rgba(170,167,133,0.25)]/70 p-1.5 text-[11px] text-[#FDFDF5] mt-1">
                    <Lightbulb className="h-3.5 w-3.5 text-[#AAA785] shrink-0 mt-0.5" />
                    <span><strong>Auditor Tip:</strong> {s.tips}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action button */}
          <div className="pt-2 border-t border-[rgba(170,167,133,0.15)]">
            <button
              type="button"
              onClick={() => onQueryAssistant(`Please provide a detailed step-by-step guidance on how to navigate the ${activeWorkflow.title} for my product, including avoiding common rejection traps.`)}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#2A2E28] px-3 py-2 text-xs font-medium text-white hover:bg-[#E1E1D5] hover:text-[#232323] transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Ask Sahayak for Tailored Workflow Assistance</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
