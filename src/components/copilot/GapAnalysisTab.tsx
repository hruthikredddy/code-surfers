import { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Sparkles, RotateCcw, ShieldAlert, ArrowRight } from 'lucide-react';
import { GAP_ANALYSIS_QUESTIONS, GapAnalysisQuestion } from '../../data/complianceCopilotData.ts';

interface GapAnalysisTabProps {
  onQueryAssistant: (prompt: string) => void;
}

export function GapAnalysisTab({ onQueryAssistant }: GapAnalysisTabProps) {
  // Record chosen option index for each question
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const totalQuestions = GAP_ANALYSIS_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

  const maxPoints = totalQuestions * 2;
  const currentPoints = Object.entries(answers).reduce((acc, [qId, optIdx]) => {
    const q = GAP_ANALYSIS_QUESTIONS.find((item) => item.id === qId);
    if (!q || q.options[optIdx] === undefined) return acc;
    return acc + q.options[optIdx].points;
  }, 0);

  const readinessScore = answeredCount > 0 ? Math.round((currentPoints / maxPoints) * 100) : 0;

  const handleSelect = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleReset = () => {
    setAnswers({});
  };

  const getReadinessTier = () => {
    if (answeredCount < totalQuestions) {
      return {
        label: 'Assessment In Progress',
        desc: `Answer all ${totalQuestions} dimensions to calculate official readiness score.`,
        color: 'text-[#E1E1D5]',
        bg: 'bg-[#2A2E28]',
        border: 'border-[rgba(170,167,133,0.20)]'
      };
    }
    if (readinessScore >= 85) {
      return {
        label: 'Audit Ready (High Confidence)',
        desc: 'Your manufacturing premises and in-house laboratory satisfy standard BIS scrutiny criteria.',
        color: 'text-[#E1E1D5]',
        bg: 'bg-[#2A2E28]',
        border: 'border-[rgba(170,167,133,0.25)]'
      };
    }
    if (readinessScore >= 55) {
      return {
        label: 'Moderate Readiness (Gaps Identified)',
        desc: 'Key testing or calibration gaps must be remediated prior to scheduling your factory audit.',
        color: 'text-[#E1E1D5]',
        bg: 'bg-[#2A2E28]',
        border: 'border-[rgba(170,167,133,0.25)]'
      };
    }
    return {
      label: 'High Risk of Audit Non-Conformance',
      desc: 'Significant deficits in testing facilities, calibration, or personnel will result in audit rejection.',
      color: 'text-rose-800',
      bg: 'bg-rose-50',
      border: 'border-rose-200'
    };
  };

  const tier = getReadinessTier();

  // Find questions with score < 2 for action items
  const identifiedGaps = GAP_ANALYSIS_QUESTIONS.filter((q) => {
    const ansIdx = answers[q.id];
    return ansIdx !== undefined && q.options[ansIdx].points < 2;
  });

  const handleConsultSahayak = () => {
    const gapList = identifiedGaps
      .map((g) => {
        const opt = g.options[answers[g.id]];
        return `- ${g.category}: ${opt.feedback}`;
      })
      .join('\n');

    onQueryAssistant(
      `Based on my BIS factory compliance gap analysis (Readiness score: ${readinessScore}%), I have the following compliance gaps:\n${gapList}\n\nWhat is the recommended priority action plan to resolve these gaps before a BIS auditor visit?`
    );
  };

  return (
    <div className="space-y-4">
      {/* Score Overview Card */}
      <div className={`rounded-xl border p-4 shadow-2xs ${tier.bg} ${tier.border}`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <ShieldAlert className={`h-4 w-4 ${tier.color}`} />
              <span className={`text-xs font-bold uppercase tracking-wider ${tier.color}`}>
                {tier.label}
              </span>
            </div>
            <p className="text-[11px] text-[#E1E1D5] leading-relaxed">
              {tier.desc}
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-2xl font-black tracking-tight text-[#FDFDF5]">
              {answeredCount === 0 ? '—' : `${readinessScore}%`}
            </div>
            <div className="text-[10px] font-semibold text-[#AAA785]">
              {answeredCount}/{totalQuestions} Answered
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#2A2E28]/80">
          <div
            className={`h-full transition-all duration-300 ${
              readinessScore >= 85
                ? 'bg-[#AAA785] text-[#232323] hover:bg-[#E1E1D5]'
                : readinessScore >= 55
                ? 'bg-[#2A2E28]0'
                : 'bg-rose-500'
            }`}
            style={{ width: `${readinessScore}%` }}
          />
        </div>

        {answeredCount > 0 && (
          <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[rgba(170,167,133,0.20)]/70">
            <span className="text-[11px] text-[#AAA785]">
              {identifiedGaps.length} compliance {identifiedGaps.length === 1 ? 'gap' : 'gaps'} identified
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[11px] text-[#AAA785] hover:text-[#FDFDF5] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset answers</span>
            </button>
          </div>
        )}
      </div>

      {/* Questions list */}
      <div className="space-y-3">
        {GAP_ANALYSIS_QUESTIONS.map((q: GapAnalysisQuestion, qIdx) => {
          const selectedOptionIndex = answers[q.id];

          return (
            <div key={q.id} className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785]">
                  Dimension {qIdx + 1}: {q.category}
                </span>
                {selectedOptionIndex !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      q.options[selectedOptionIndex].points === 2
                        ? 'bg-[#2A2E28] text-[#E1E1D5]'
                        : q.options[selectedOptionIndex].points === 1
                        ? 'bg-[#2A2E28] text-[#E1E1D5]'
                        : 'bg-rose-50 text-rose-800'
                    }`}
                  >
                    {q.options[selectedOptionIndex].points === 2 ? 'Compliant' : q.options[selectedOptionIndex].points === 1 ? 'Partial' : 'Deficit'}
                  </span>
                )}
              </div>

              <h5 className="text-xs font-bold text-[#FDFDF5] leading-snug">
                {q.question}
              </h5>
              <p className="text-[11px] text-[#AAA785] leading-relaxed">
                {q.helpText}
              </p>

              {/* Options */}
              <div className="space-y-1.5 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isChecked = selectedOptionIndex === optIdx;

                  return (
                    <label
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`flex items-start gap-2.5 rounded-lg border p-2 text-xs transition-colors cursor-pointer ${
                        isChecked
                          ? opt.points === 2
                            ? 'border-[rgba(170,167,133,0.35)] bg-[#2A2E28]/50 text-[#FDFDF5]'
                            : opt.points === 1
                            ? 'border-[rgba(170,167,133,0.35)] bg-[#2A2E28]/50 text-[#FDFDF5]'
                            : 'border-rose-300 bg-rose-50/50 text-[#FDFDF5]'
                          : 'border-[rgba(170,167,133,0.20)] bg-[#2A2E28]/60 hover:bg-[#2A2E28] text-[#E1E1D5]'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`gap-${q.id}`}
                        checked={isChecked}
                        onChange={() => handleSelect(q.id, optIdx)}
                        className="mt-0.5 h-3.5 w-3.5 text-[#FDFDF5] focus:ring-slate-400"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium block leading-snug">{opt.label}</span>
                        {isChecked && (
                          <span className={`block text-[11px] mt-1 font-semibold ${
                            opt.points === 2 ? 'text-[#E1E1D5]' : opt.points === 1 ? 'text-[#E1E1D5]' : 'text-rose-700'
                          }`}>
                            {opt.feedback}
                          </span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Identified Gaps Action Box */}
      {identifiedGaps.length > 0 && (
        <div className="rounded-xl border border-[rgba(170,167,133,0.25)] bg-[#2A2E28]/70 p-3.5 text-xs space-y-2.5">
          <div className="flex items-center gap-1.5 text-[#FDFDF5] font-bold">
            <AlertTriangle className="h-4 w-4 text-[#AAA785]" />
            <span>Remediation Roadmap ({identifiedGaps.length} Areas to Fix):</span>
          </div>
          <ul className="space-y-1 text-[11px] text-[#E1E1D5]">
            {identifiedGaps.map((g) => {
              const opt = g.options[answers[g.id]];
              return (
                <li key={g.id} className="flex items-start gap-1.5">
                  <span className="text-[#AAA785] font-bold">•</span>
                  <span><strong>{g.category}:</strong> {opt.feedback}</span>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={handleConsultSahayak}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-800 px-3 py-2 text-xs font-medium text-white hover:bg-amber-900 transition-colors cursor-pointer shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Generate Auditor-Proof Action Plan with Sahayak</span>
          </button>
        </div>
      )}
    </div>
  );
}
