import { useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Clock,
  FileText,
  Lightbulb,
  Building2,
  Calendar
} from 'lucide-react';
import { TESTING_ROADMAP_STEPS } from '../../data/testingIntelligenceData.ts';

interface TestingRoadmapTabProps {
  onQueryAssistant: (prompt: string) => void;
  onNavigateToTab?: (tab: string) => void;
}

export function TestingRoadmapTab({
  onQueryAssistant,
  onNavigateToTab
}: TestingRoadmapTabProps) {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 uppercase tracking-wide">
                9. Testing Lifecycle Roadmap
              </span>
              <span className="rounded bg-slate-100 text-slate-600 text-[11px] font-medium px-2 py-0.5">
                End-to-End Workflow
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Official 6-Stage BIS Testing & Certification Lifecycle
            </h3>
            <p className="text-xs text-slate-600">
              A structured roadmap guiding manufacturers through sample drawing, in-house laboratory calibration, third-party lab booking on LIMS, and report submission.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onQueryAssistant(
                  'Walk me through the exact testing roadmap and sample drawing protocol for BIS certification.'
                )
              }
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer shadow-2xs"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Sahayak AI</span>
            </button>
          </div>
        </div>

        {/* Step indicator bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-4">
          {TESTING_ROADMAP_STEPS.map((step) => {
            const isSelected = activeStep === step.step_number;

            return (
              <button
                key={step.step_number}
                type="button"
                onClick={() => setActiveStep(step.step_number)}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 text-slate-900 shadow-2xs ring-1 ring-emerald-600'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
                  <span>Stage {step.step_number}</span>
                  <span className="text-slate-400">{step.timeline}</span>
                </div>
                <div className="text-xs font-bold truncate leading-tight">{step.stage_name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Step Detailed Card */}
      {(() => {
        const current = TESTING_ROADMAP_STEPS.find((s) => s.step_number === activeStep) || TESTING_ROADMAP_STEPS[0];

        return (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-sm">
                  {current.step_number}
                </span>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{current.stage_name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{current.short_description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  <Clock className="h-3.5 w-3.5 text-slate-500" />
                  <span>Timeline: {current.timeline}</span>
                </span>
              </div>
            </div>

            {/* Action items */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Mandatory Operational Actions:
              </h5>
              <div className="space-y-2.5">
                {current.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Deliverable & Pro Tip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="rounded-lg bg-emerald-50/60 p-3.5 border border-emerald-200/80 text-xs">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Key Deliverable</span>
                </span>
                <p className="font-bold text-slate-900 mt-1">{current.key_deliverable}</p>
              </div>

              <div className="rounded-lg bg-amber-50/60 p-3.5 border border-amber-200/80 text-xs">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1">
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span>Testing Pro-Tip</span>
                </span>
                <p className="text-slate-800 mt-1 leading-relaxed">{current.tips}</p>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <button
                type="button"
                disabled={activeStep === 1}
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                className="rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous Stage
              </button>

              <div className="flex items-center gap-2">
                {current.official_portal && (
                  <a
                    href={current.official_portal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-700 font-semibold hover:underline"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="h-3 w-3 text-slate-400" />
                  </a>
                )}

                <button
                  type="button"
                  disabled={activeStep === 6}
                  onClick={() => setActiveStep((prev) => Math.min(6, prev + 1))}
                  className="rounded-lg bg-slate-900 px-3.5 py-1.5 font-semibold text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next Stage
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
