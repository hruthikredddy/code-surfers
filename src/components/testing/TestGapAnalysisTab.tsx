import { useState, useMemo } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Building2,
  ArrowRight,
  Sparkles,
  Layers,
  RotateCcw,
  Check
} from 'lucide-react';
import {
  PRODUCT_TESTING_PROFILES,
  BIS_RECOGNIZED_LABS
} from '../../data/testingIntelligenceData.ts';
import { ProductTestingProfile, TestRequirementItem } from '../../types/index.ts';

interface TestGapAnalysisTabProps {
  onNavigateToLabs?: (testId: string) => void;
  onQueryAssistant: (prompt: string) => void;
}

export function TestGapAnalysisTab({
  onNavigateToLabs,
  onQueryAssistant
}: TestGapAnalysisTabProps) {
  const [selectedProfileId, setSelectedProfileId] = useState<string>('ss-water-bottle-non-insulated');

  // Tests that the user's existing report currently covers
  // Default simulated state: user has passed mechanical tests, but missed chemical migration!
  const [passedInReport, setPassedInReport] = useState<string[]>([
    'ss-test-chem-comp',
    'ss-test-dims',
    'ss-test-hydro-leak',
    'ss-test-drop-impact',
    'ss-test-handle-tensile',
    'ss-test-corrosion-salt'
  ]);

  const profile: ProductTestingProfile = useMemo(() => {
    return (
      PRODUCT_TESTING_PROFILES.find((p) => p.id === selectedProfileId) ||
      PRODUCT_TESTING_PROFILES[0]
    );
  }, [selectedProfileId]);

  const handleTogglePassed = (testId: string) => {
    setPassedInReport((prev) =>
      prev.includes(testId) ? prev.filter((id) => id !== testId) : [...prev, testId]
    );
  };

  const handleMarkAll = () => {
    setPassedInReport(profile.required_tests.map((t) => t.id));
  };

  const handleClearAll = () => {
    setPassedInReport([]);
  };

  // Missing tests calculation
  const missingTests: TestRequirementItem[] = useMemo(() => {
    return profile.required_tests.filter((t) => !passedInReport.includes(t.id));
  }, [profile, passedInReport]);

  const passedTests: TestRequirementItem[] = useMemo(() => {
    return profile.required_tests.filter((t) => passedInReport.includes(t.id));
  }, [profile, passedInReport]);

  const hasCriticalGap = missingTests.some((t) => t.mandatory);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[rgba(170,167,133,0.20)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#233A23] text-[#E1E1D5] text-[11px] font-bold px-2 py-0.5 uppercase tracking-wide">
                7. Testing Gap Analysis
              </span>
              <span className="rounded bg-[#2A2E28] text-[#E1E1D5] text-[11px] font-medium px-2 py-0.5">
                Audit Scrutiny Engine
              </span>
            </div>
            <h3 className="text-base font-bold text-[#FDFDF5] mt-1">
              Compare Existing Test Reports Against Mandatory BIS STI
            </h3>
            <p className="text-xs text-[#E1E1D5]">
              Select which tests your current factory or third-party laboratory reports contain. The system immediately identifies missing mandatory clauses that would trigger application rejection.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleMarkAll}
              className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-2.5 py-1.5 text-xs font-medium text-[#E1E1D5] hover:bg-[#2A2E28] cursor-pointer shadow-2xs"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-2.5 py-1.5 text-xs font-medium text-[#E1E1D5] hover:bg-[#2A2E28] cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Product selector */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#AAA785]">Target Standard:</span>
            <select
              value={selectedProfileId}
              onChange={(e) => {
                setSelectedProfileId(e.target.value);
                setPassedInReport([]);
              }}
              className="rounded-lg border border-[rgba(170,167,133,0.30)] bg-[#2A2E28] px-3 py-1.5 text-xs font-semibold text-[#FDFDF5] focus:border-[#AAA785] focus:outline-hidden"
            >
              {PRODUCT_TESTING_PROFILES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.product_name} ({p.is_number})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-[#E1E1D5] font-bold">{passedTests.length} Covered</span>
            <span className="text-[#E1E1D5]">|</span>
            <span className={`font-bold ${missingTests.length > 0 ? 'text-[#AAA785]' : 'text-[#AAA785]'}`}>
              {missingTests.length} Missing
            </span>
          </div>
        </div>
      </div>

      {/* Gap Analysis Summary Card */}
      <div
        className={`rounded-xl border p-5 transition-all ${
          missingTests.length === 0
            ? 'border-[rgba(170,167,133,0.25)] bg-[#2A2E28]/50'
            : hasCriticalGap
            ? 'border-[rgba(170,167,133,0.25)] bg-[#2A2E28]/40'
            : 'border-[rgba(170,167,133,0.20)] bg-[#232323]'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {missingTests.length === 0 ? (
              <CheckCircle2 className="h-6 w-6 text-[#AAA785] shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-[#AAA785] shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className="text-sm font-bold text-[#FDFDF5]">
                {missingTests.length === 0
                  ? 'Zero Gaps Detected: Ready for BIS Technical Submission'
                  : `Audit Discrepancy Alert: ${missingTests.length} Mandatory Clauses Missing`}
              </h4>
              <p className="text-xs text-[#E1E1D5] mt-1 leading-relaxed">
                {missingTests.length === 0
                  ? 'All mandatory clauses required under the BIS Scheme of Testing and Inspection (STI) are fully verified in your report documentation.'
                  : `Your test dossier lacks ${missingTests.length} mandatory testing requirements. Under BIS (Conformity Assessment) Regulations 2018, submitting an incomplete test dossier results in a Discrepancy Notice or immediate rejection.`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              onQueryAssistant(
                `Generate a Testing CAPA (Corrective Action Plan) for my ${profile.product_name} missing the following tests: ${missingTests.map((t) => t.test_name).join(', ')}.`
              )
            }
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#232323] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#E1E1D5] hover:text-[#232323] shrink-0 cursor-pointer shadow-2xs"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Generate CAPA Plan</span>
          </button>
        </div>
      </div>

      {/* Missing Tests Breakdown (Identified Gaps) */}
      {missingTests.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FDFDF5] flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 text-[#AAA785]" />
              <span>Identified Testing Gaps ({missingTests.length} Clauses)</span>
            </h4>
            <span className="text-xs text-[#AAA785]">
              Must be tested at a recognized laboratory before submission
            </span>
          </div>

          <div className="space-y-3">
            {missingTests.map((test) => {
              const capableLabs = BIS_RECOGNIZED_LABS.filter((lab) =>
                test.capable_lab_ids.includes(lab.id)
              );

              return (
                <div
                  key={test.id}
                  className="rounded-xl border border-[rgba(170,167,133,0.25)] bg-[#232323] p-4 shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="rounded bg-[#233A23] text-[#FDFDF5] px-2 py-0.5 text-xs font-bold">
                          ⚠️ GAP: {test.relevant_clause}
                        </span>
                        <h5 className="text-sm font-bold text-[#FDFDF5]">{test.test_name}</h5>
                        <span className="rounded bg-[#2A2E28] px-1.5 py-0.5 text-[10px] font-semibold text-[#E1E1D5]">
                          {test.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#E1E1D5] mt-1.5">
                        <strong className="text-[#FDFDF5]">Critical Risk:</strong> {test.purpose}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <span className="rounded bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        High Rejection Risk
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#2A2E28] p-2.5 border border-[rgba(170,167,133,0.15)] text-xs text-[#E1E1D5] space-y-1">
                    <div>
                      <strong>Required Test Method:</strong> {test.required_test_method}
                    </div>
                    <div>
                      <strong>Acceptance Threshold:</strong> {test.acceptance_criteria}
                    </div>
                    <div>
                      <strong>STI Traceability:</strong> {test.traceability_source}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[11px] text-[#AAA785]">
                      {capableLabs.length} verified laboratories have active test benches for this clause.
                    </span>

                    {onNavigateToLabs && (
                      <button
                        type="button"
                        onClick={() => onNavigateToLabs(test.id)}
                        className="inline-flex items-center gap-1 font-semibold text-[#E1E1D5] hover:text-[#FDFDF5] cursor-pointer"
                      >
                        <Building2 className="h-3.5 w-3.5" />
                        <span>Find Labs for this Clause</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tests Present In Report Section (Toggleable checklist) */}
      <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[rgba(170,167,133,0.15)]">
          <div>
            <h4 className="text-sm font-bold text-[#FDFDF5]">
              Checklist of Tests Included in Your Existing Report
            </h4>
            <p className="text-xs text-[#AAA785]">
              Click any clause to toggle its inclusion in your gap analysis model.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#E1E1D5]">
            {passedTests.length} / {profile.required_tests.length} Clauses
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
          {profile.required_tests.map((test) => {
            const isChecked = passedInReport.includes(test.id);

            return (
              <div
                key={test.id}
                onClick={() => handleTogglePassed(test.id)}
                className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer select-none transition-colors ${
                  isChecked
                    ? 'border-[rgba(170,167,133,0.25)] bg-[#2A2E28]/50 text-[#FDFDF5]'
                    : 'border-[rgba(170,167,133,0.20)] bg-[#2A2E28]/60 text-[#AAA785] hover:bg-[#2A2E28]'
                }`}
              >
                <div
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded mt-0.5 ${
                    isChecked
                      ? 'bg-[#AAA785] text-[#232323] hover:bg-[#E1E1D5] text-white'
                      : 'border border-[rgba(170,167,133,0.40)] bg-[#232323]'
                  }`}
                >
                  {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                </div>

                <div className="min-w-0 flex-1 text-xs">
                  <div className="font-semibold truncate">
                    {test.relevant_clause}: {test.test_name}
                  </div>
                  <div className="text-[10px] text-[#AAA785] truncate">{test.category}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
