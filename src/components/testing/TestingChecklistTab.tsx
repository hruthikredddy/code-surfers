import { useState, useEffect, useMemo } from 'react';
import {
  CheckSquare,
  Square,
  RotateCcw,
  Sparkles,
  Download,
  CheckCircle2,
  AlertCircle,
  Filter,
  FileCheck
} from 'lucide-react';
import { PRODUCT_TESTING_PROFILES } from '../../data/testingIntelligenceData.ts';
import { ProductTestingProfile, TestRequirementItem } from '../../types/index.ts';

const STORAGE_KEY_TEST_CHECKLIST = 'bis_testing_checklist_state_v1';

interface TestingChecklistTabProps {
  onQueryAssistant: (prompt: string) => void;
}

export function TestingChecklistTab({ onQueryAssistant }: TestingChecklistTabProps) {
  const [selectedProfileId, setSelectedProfileId] = useState<string>('ss-water-bottle-non-insulated');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const profile: ProductTestingProfile = useMemo(() => {
    return (
      PRODUCT_TESTING_PROFILES.find((p) => p.id === selectedProfileId) ||
      PRODUCT_TESTING_PROFILES[0]
    );
  }, [selectedProfileId]);

  // Completed test IDs stored in localStorage
  const [completedTestIds, setCompletedTestIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TEST_CHECKLIST);
      return saved ? JSON.parse(saved) : ['ss-test-dims', 'ss-test-handle-tensile'];
    } catch {
      return ['ss-test-dims', 'ss-test-handle-tensile'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TEST_CHECKLIST, JSON.stringify(completedTestIds));
    } catch (e) {
      console.warn('Failed to persist checklist state:', e);
    }
  }, [completedTestIds]);

  const handleToggleTest = (testId: string) => {
    setCompletedTestIds((prev) =>
      prev.includes(testId) ? prev.filter((id) => id !== testId) : [...prev, testId]
    );
  };

  const handleResetChecklist = () => {
    setCompletedTestIds([]);
  };

  // Group tests by category
  const categorizedTests = useMemo(() => {
    const map = new Map<string, TestRequirementItem[]>();
    profile.required_tests.forEach((test) => {
      const list = map.get(test.category) || [];
      list.push(test);
      map.set(test.category, list);
    });
    return map;
  }, [profile]);

  // Overall stats
  const totalTests = profile.required_tests.length;
  const completedInProfile = profile.required_tests.filter((t) =>
    completedTestIds.includes(t.id)
  ).length;
  const progressPercent = Math.round((completedInProfile / totalTests) * 100);

  const handleExportSummary = () => {
    const lines = [
      `BIS TESTING CHECKLIST - ${profile.product_name.toUpperCase()}`,
      `Standard: ${profile.is_number} (${profile.standard_title})`,
      `Progress: ${completedInProfile} of ${totalTests} Completed (${progressPercent}%)`,
      `Generated via BIS Sahayak Testing Intelligence`,
      '-------------------------------------------------------',
      ''
    ];

    profile.required_tests.forEach((t) => {
      const isDone = completedTestIds.includes(t.id);
      lines.push(`${isDone ? '[X]' : '[ ]'} ${t.test_name} (${t.relevant_clause})`);
      lines.push(`    Category: ${t.category}`);
      lines.push(`    Method: ${t.required_test_method}`);
      lines.push(`    Acceptance: ${t.acceptance_criteria}`);
      lines.push(`    Status: ${isDone ? 'COMPLETED' : 'PENDING'}`);
      lines.push('');
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BIS_Testing_Checklist_${profile.is_number.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Progress Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 uppercase tracking-wide">
                3. Testing Checklist
              </span>
              <span className="rounded bg-slate-100 text-slate-600 text-[11px] font-medium px-2 py-0.5">
                Structured Testing Tracking
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Interactive Testing Tracker: {profile.product_name}
            </h3>
            <p className="text-xs text-slate-600">
              Track which required laboratory tests have been completed, verified in in-house labs, or remain pending for BIS licence audit.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportSummary}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>Export Checklist</span>
            </button>

            <button
              type="button"
              onClick={handleResetChecklist}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Reset checklist"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Product selector & Status Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Product:</span>
            <select
              value={selectedProfileId}
              onChange={(e) => setSelectedProfileId(e.target.value)}
              className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-slate-800 focus:outline-hidden"
            >
              {PRODUCT_TESTING_PROFILES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.product_name} ({p.is_number})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`rounded px-2.5 py-1 text-xs font-medium cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({totalTests})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('pending')}
              className={`rounded px-2.5 py-1 text-xs font-medium cursor-pointer ${
                statusFilter === 'pending'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Pending ({totalTests - completedInProfile})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('completed')}
              className={`rounded px-2.5 py-1 text-xs font-medium cursor-pointer ${
                statusFilter === 'completed'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Completed ({completedInProfile})
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span>Audit Readiness Score</span>
            <span>
              {completedInProfile} / {totalTests} Tests Complete ({progressPercent}%)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                progressPercent === 100
                  ? 'bg-emerald-600'
                  : progressPercent > 50
                  ? 'bg-emerald-500'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Structured Checklist Grouped by Category */}
      <div className="space-y-4">
        {Array.from(categorizedTests.entries()).map(([category, tests]) => {
          const displayedTests = tests.filter((t) => {
            const isDone = completedTestIds.includes(t.id);
            if (statusFilter === 'completed') return isDone;
            if (statusFilter === 'pending') return !isDone;
            return true;
          });

          if (displayedTests.length === 0) return null;

          return (
            <div key={category} className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {category}
                  </h4>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                    {displayedTests.length} Tests
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {displayedTests.map((test) => {
                  const isDone = completedTestIds.includes(test.id);

                  return (
                    <div
                      key={test.id}
                      onClick={() => handleToggleTest(test.id)}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer select-none ${
                        isDone
                          ? 'border-emerald-200 bg-emerald-50/40 text-slate-800'
                          : 'border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label={isDone ? 'Mark pending' : 'Mark completed'}
                      >
                        {isDone ? (
                          <CheckSquare className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <Square className="h-5 w-5 text-slate-400" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-xs font-bold ${
                              isDone ? 'line-through text-slate-500' : 'text-slate-900'
                            }`}
                          >
                            {test.test_name}
                          </span>
                          <span className="rounded bg-white px-1.5 py-0.2 text-[10px] font-bold text-slate-600 border border-slate-200">
                            {test.relevant_clause}
                          </span>
                          {test.mandatory && (
                            <span className="rounded bg-amber-50 px-1.5 py-0.2 text-[9px] font-bold text-amber-700 border border-amber-200">
                              Mandatory
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                          <strong>Method:</strong> {test.required_test_method}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          <strong>Criteria:</strong> {test.acceptance_criteria}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            isDone
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {isDone ? 'Passed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
