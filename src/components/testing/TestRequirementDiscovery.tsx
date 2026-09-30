import { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building2,
  ExternalLink,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  PRODUCT_TESTING_PROFILES,
  BIS_RECOGNIZED_LABS
} from '../../data/testingIntelligenceData.ts';
import { ProductTestingProfile, TestRequirementItem, TestCategory } from '../../types/index.ts';

interface TestRequirementDiscoveryProps {
  onSelectLabForTest?: (testId: string, standard: string) => void;
  onAddToChecklist?: (testId: string) => void;
  onQueryAssistant: (prompt: string) => void;
}

export function TestRequirementDiscovery({
  onSelectLabForTest,
  onAddToChecklist,
  onQueryAssistant
}: TestRequirementDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState('stainless steel water bottles');
  const [selectedProfileId, setSelectedProfileId] = useState<string>('ss-water-bottle-non-insulated');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTestId, setExpandedTestId] = useState<string | null>('ss-test-chem-comp');

  // Find matching profiles
  const matchingProfiles = useMemo(() => {
    if (!searchQuery.trim()) return PRODUCT_TESTING_PROFILES;
    const q = searchQuery.toLowerCase().trim();
    return PRODUCT_TESTING_PROFILES.filter((profile) => {
      return (
        profile.product_name.toLowerCase().includes(q) ||
        profile.is_number.toLowerCase().includes(q) ||
        profile.category.toLowerCase().includes(q) ||
        profile.product_aliases.some((alias) => alias.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  // Selected profile
  const currentProfile: ProductTestingProfile | undefined = useMemo(() => {
    return (
      PRODUCT_TESTING_PROFILES.find((p) => p.id === selectedProfileId) ||
      matchingProfiles[0] ||
      PRODUCT_TESTING_PROFILES[0]
    );
  }, [selectedProfileId, matchingProfiles]);

  // Categories available in current profile
  const availableCategories = useMemo(() => {
    if (!currentProfile) return [];
    const set = new Set<TestCategory>();
    currentProfile.required_tests.forEach((t) => set.add(t.category));
    return Array.from(set);
  }, [currentProfile]);

  // Filtered tests in profile
  const filteredTests = useMemo(() => {
    if (!currentProfile) return [];
    if (selectedCategory === 'all') return currentProfile.required_tests;
    return currentProfile.required_tests.filter((t) => t.category === selectedCategory);
  }, [currentProfile, selectedCategory]);

  const handleSelectQuickPrompt = (productName: string, profileId: string) => {
    setSearchQuery(productName);
    setSelectedProfileId(profileId);
    setSelectedCategory('all');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Search Query Box */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 uppercase tracking-wide">
                1. Test Requirement Identification
              </span>
              <span className="rounded bg-slate-100 text-slate-600 text-[11px] font-medium px-2 py-0.5">
                Product → Standard → Tests
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Determine Mandatory BIS Tests for Your Product
            </h3>
            <p className="text-xs text-slate-600">
              Enter your product or manufacturing category to extract applicable Indian Standards, governing QCO mandates, and required test methods.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onQueryAssistant(`What tests are mandatory for ${currentProfile?.product_name || 'my product'} under ${currentProfile?.is_number || 'BIS'}?`)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Ask Sahayak AI</span>
            </button>
          </div>
        </div>

        {/* Input box */}
        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. I manufacture stainless steel water bottles, or electric kettles, or helmets..."
            className="w-full rounded-lg border border-slate-300 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-slate-800 focus:bg-white focus:outline-hidden transition-colors"
          />
        </div>

        {/* Quick select sample pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[11px] font-semibold text-slate-500">Quick Examples:</span>
          <button
            type="button"
            onClick={() => handleSelectQuickPrompt('stainless steel water bottles', 'ss-water-bottle-non-insulated')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              selectedProfileId === 'ss-water-bottle-non-insulated'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Stainless Steel Bottles (IS 17803)
          </button>
          <button
            type="button"
            onClick={() => handleSelectQuickPrompt('vacuum flask insulated bottle', 'ss-water-bottle-vacuum-insulated')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              selectedProfileId === 'ss-water-bottle-vacuum-insulated'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Vacuum Insulated Flasks (IS 17526)
          </button>
          <button
            type="button"
            onClick={() => handleSelectQuickPrompt('helmets for two wheeler', 'helmet-two-wheeler')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              selectedProfileId === 'helmet-two-wheeler'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Two-Wheeler Helmets (IS 4151)
          </button>
          <button
            type="button"
            onClick={() => handleSelectQuickPrompt('packaged drinking water', 'packaged-drinking-water')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              selectedProfileId === 'packaged-drinking-water'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Packaged Drinking Water (IS 14543)
          </button>
          <button
            type="button"
            onClick={() => handleSelectQuickPrompt('electric kettle immersion water heater', 'electric-liquid-heaters')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              selectedProfileId === 'electric-liquid-heaters'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Electric Kettles / Heaters (IS 302-2-15)
          </button>
          <button
            type="button"
            onClick={() => handleSelectQuickPrompt('tmt steel bars', 'tmt-steel-bars')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              selectedProfileId === 'tmt-steel-bars'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            TMT Steel Bars (IS 1786)
          </button>
          <button
            type="button"
            onClick={() => handleSelectQuickPrompt('children toys safety', 'toys-mechanical-chemical')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              selectedProfileId === 'toys-mechanical-chemical'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Toys Safety (IS 9873)
          </button>
        </div>
      </div>

      {/* Product → Standard → Scheme Mapping Card */}
      {currentProfile && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Target Product:
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  {currentProfile.product_name}
                </h4>
                <span className="rounded bg-blue-100 text-blue-800 text-[11px] font-bold px-2 py-0.5">
                  {currentProfile.scheme}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Category: <span className="font-semibold text-slate-700">{currentProfile.category}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://standards.bis.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
              >
                <span>BIS Standards Portal</span>
                <ExternalLink className="h-3 w-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Standard & QCO Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-3 text-xs">
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Governing Indian Standard
              </span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{currentProfile.is_number}</p>
              <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{currentProfile.standard_title}</p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Mandatory Quality Control Order (QCO)
              </span>
              <p className="text-xs font-bold text-emerald-700 mt-0.5">Mandatory Compliance</p>
              <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{currentProfile.qco_reference}</p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Sample Drawing & Testing Turnaround
              </span>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{currentProfile.estimated_turnaround_days}</p>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{currentProfile.sample_size_requirement}</p>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 pt-3 overflow-x-auto border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 mr-2 shrink-0">Filter Tests:</span>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Tests ({currentProfile.required_tests.length})
            </button>
            {availableCategories.map((cat) => {
              const count = currentProfile.required_tests.filter((t) => t.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Identified Required Tests List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 uppercase tracking-wide">
              2. Test Method Intelligence
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              Required Test Clauses ({filteredTests.length} Tests Identified)
            </h4>
          </div>
          <span className="text-xs text-slate-500">
            Showing full method intelligence & parameters
          </span>
        </div>

        {filteredTests.map((test, index) => {
          const isExpanded = expandedTestId === test.id;
          const capableLabs = BIS_RECOGNIZED_LABS.filter((lab) =>
            test.capable_lab_ids.includes(lab.id)
          );

          return (
            <div
              key={test.id}
              className={`rounded-xl border transition-all ${
                isExpanded
                  ? 'border-emerald-300 bg-white shadow-sm ring-1 ring-emerald-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              {/* Header Row */}
              <div
                onClick={() => setExpandedTestId(isExpanded ? null : test.id)}
                className="flex items-start justify-between gap-3 p-4 cursor-pointer select-none"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h5 className="text-sm font-bold text-slate-900">{test.test_name}</h5>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 border border-slate-200">
                        {test.relevant_clause}
                      </span>
                      <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                        {test.category}
                      </span>
                      {test.mandatory && (
                        <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                          Mandatory
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                      <span className="font-semibold text-slate-700">Purpose:</span> {test.purpose}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">
                    {capableLabs.length} Authorized Labs
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded Method Intelligence Detail (Capability 2 & 10) */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-4 bg-slate-50/50 space-y-3 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white p-3 border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        What is being tested & Purpose
                      </span>
                      <p className="text-slate-800 font-medium mt-1 leading-relaxed">{test.purpose}</p>
                    </div>

                    <div className="rounded-lg bg-white p-3 border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        How it is tested & Test Method
                      </span>
                      <p className="text-slate-800 font-medium mt-1 leading-relaxed">{test.required_test_method}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white p-3 border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        Important Test Conditions & Sample Preparation
                      </span>
                      <p className="text-slate-700 mt-1 leading-relaxed">{test.important_conditions}</p>
                    </div>

                    <div className="rounded-lg bg-white p-3 border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        Required Parameters & Acceptance Criteria
                      </span>
                      <p className="text-emerald-800 font-semibold mt-1 leading-relaxed">{test.acceptance_criteria}</p>
                      <p className="text-slate-500 text-[11px] mt-1">Limits: {test.parameters}</p>
                    </div>
                  </div>

                  {/* Traceability & Clause reference */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-200 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                      <span>
                        <strong className="text-slate-700">Authoritative Source:</strong> {test.traceability_source} ({test.relevant_standard})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {onSelectLabForTest && (
                        <button
                          type="button"
                          onClick={() => onSelectLabForTest(test.id, test.relevant_standard)}
                          className="inline-flex items-center gap-1 rounded bg-slate-900 px-2.5 py-1 text-white text-[11px] font-semibold hover:bg-slate-800 cursor-pointer shadow-2xs"
                        >
                          <Building2 className="h-3 w-3" />
                          <span>View Capable Labs ({capableLabs.length})</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onQueryAssistant(`Explain the test method for "${test.test_name}" under ${test.relevant_standard} ${test.relevant_clause} and how to set up the testing bench.`)}
                        className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2 py-1 text-slate-700 text-[11px] font-medium hover:bg-slate-100 cursor-pointer"
                      >
                        <Sparkles className="h-3 w-3 text-emerald-600" />
                        <span>Bench Guide</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
