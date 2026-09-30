import { useState, useMemo, useEffect } from 'react';
import { BisLabItem, StandardEntry } from '../../types/index.ts';
import { BIS_RECOGNIZED_LABS } from '../../data/testingIntelligenceData.ts';
import { INDIAN_STANDARDS } from '../../data/standards.ts';
import { LabSearch } from './LabSearch.tsx';
import { LabCard } from './LabCard.tsx';
import { LabDetails } from './LabDetails.tsx';
import { LabFilters, LabFilterState } from './LabFilters.tsx';
import { ContextualMiniBrain } from '../minibrain/ContextualMiniBrain.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import {
  ArrowLeft,
  Building2,
  AlertCircle,
  ExternalLink,
  FlaskConical,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface LaboratoryFinderProps {
  isOpen: boolean;
  onClose: () => void;
  onQueryAssistant: (prompt: string) => void;
  onOpenStandardFinder?: (isNumber?: string) => void;
  initialQuery?: string;
  initialStandard?: string;
}

interface ScoredLabItem {
  lab: BisLabItem;
  score: number;
  matchedStandards: string[];
  matchedContext?: string;
}

export function LaboratoryFinder({
  isOpen,
  onClose,
  onQueryAssistant,
  onOpenStandardFinder,
  initialQuery = '',
  initialStandard
}: LaboratoryFinderProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState(initialStandard || initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLab, setSelectedLab] = useState<BisLabItem | null>(null);

  const [filters, setFilters] = useState<LabFilterState>({
    state: 'ALL',
    type: 'ALL',
    standard: initialStandard || 'ALL',
    sortBy: 'relevance'
  });

  // Extract unique states and standards
  const availableStates = useMemo(() => {
    return Array.from(new Set(BIS_RECOGNIZED_LABS.map((lab) => lab.state))).sort();
  }, []);

  const availableStandards = useMemo(() => {
    const stds = new Set<string>();
    BIS_RECOGNIZED_LABS.forEach((lab) => {
      lab.supported_standards.forEach((s) => stds.add(s));
    });
    return Array.from(stds).sort();
  }, []);

  useEffect(() => {
    if (initialStandard) {
      setQuery(initialStandard);
      setFilters((prev) => ({ ...prev, standard: initialStandard }));
    } else if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialStandard, initialQuery]);

  // Execute multi-parameter search
  const scoredLabs = useMemo<ScoredLabItem[]>(() => {
    const trimmed = query.trim().toLowerCase();

    // If query is empty, return all labs with base score
    if (!trimmed) {
      return BIS_RECOGNIZED_LABS.map((lab) => ({
        lab,
        score: lab.type === 'Central Laboratory' ? 50 : 40,
        matchedStandards: [],
        matchedContext: undefined
      }));
    }

    const tokens = trimmed.split(/[\s,.;:/?!]+/).filter((t) => t.length > 1);

    // Identify if query matches a known product or standard
    const matchingStandard = INDIAN_STANDARDS.find(
      (s) =>
        trimmed.includes(s.is_number.toLowerCase()) ||
        s.is_number.toLowerCase().includes(trimmed) ||
        s.keywords.some((k) => trimmed.includes(k.toLowerCase())) ||
        s.common_products.some((p) => trimmed.includes(p.toLowerCase()))
    );

    const scored: ScoredLabItem[] = [];

    for (const lab of BIS_RECOGNIZED_LABS) {
      let score = 0;
      const matchedStds: string[] = [];
      const matchReasons: string[] = [];

      // 1. Direct State or City match (e.g. "laboratories in Telangana", "Telangana", "Hyderabad")
      if (
        trimmed.includes(lab.state.toLowerCase()) ||
        lab.state.toLowerCase().includes(trimmed) ||
        trimmed.includes(lab.city.toLowerCase()) ||
        lab.city.toLowerCase().includes(trimmed)
      ) {
        score += 80;
        matchReasons.push(`Located in ${lab.city}, ${lab.state}`);
      }

      // 2. Direct Lab Name match
      if (lab.name.toLowerCase().includes(trimmed)) {
        score += 100;
        matchReasons.push('Exact laboratory name match');
      }

      // 3. Supported standards match
      for (const std of lab.supported_standards) {
        const stdLower = std.toLowerCase();
        if (trimmed.includes(stdLower) || stdLower.includes(trimmed)) {
          score += 60;
          matchedStds.push(std);
          matchReasons.push(`Accredited for standard ${std}`);
        } else if (matchingStandard && stdLower.includes(matchingStandard.is_number.toLowerCase())) {
          score += 50;
          matchedStds.push(std);
          matchReasons.push(`Covers applicable standard ${matchingStandard.is_number}`);
        }
      }

      // 4. Testing discipline or test name match (e.g. "electrical appliance testing", "water testing")
      if (
        (trimmed.includes('electrical') && lab.supported_standards.some((s) => s.includes('302') || s.includes('1293'))) ||
        (trimmed.includes('water bottle') && lab.supported_standards.some((s) => s.includes('17803') || s.includes('17526'))) ||
        (trimmed.includes('drinking water') && lab.supported_standards.some((s) => s.includes('14543'))) ||
        (trimmed.includes('helmet') && lab.supported_standards.some((s) => s.includes('4151'))) ||
        (trimmed.includes('steel') && lab.supported_standards.some((s) => s.includes('1786')))
      ) {
        score += 45;
        matchReasons.push('Specialized testing discipline & equipment verified');
      }

      // 5. Keyword token overlap
      for (const token of tokens) {
        if (token.length > 3) {
          if (lab.location.toLowerCase().includes(token)) score += 10;
          if (lab.accreditation.toLowerCase().includes(token)) score += 8;
        }
      }

      if (score > 0) {
        scored.push({
          lab,
          score,
          matchedStandards: Array.from(new Set(matchedStds)),
          matchedContext: matchReasons.length > 0 ? matchReasons.join(' • ') : undefined
        });
      }
    }

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);
    return scored;
  }, [query]);

  // Apply filters and sorting
  const filteredLabs = useMemo(() => {
    return scoredLabs
      .filter(({ lab }) => {
        // State filter
        if (filters.state !== 'ALL' && lab.state !== filters.state) {
          return false;
        }

        // Type filter
        if (filters.type !== 'ALL' && lab.type !== filters.type) {
          return false;
        }

        // Standard filter
        if (filters.standard !== 'ALL' && !lab.supported_standards.includes(filters.standard)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'location') {
          return a.lab.city.localeCompare(b.lab.city);
        }
        if (filters.sortBy === 'turnaround') {
          return parseInt(a.lab.turnaround_time) - parseInt(b.lab.turnaround_time);
        }
        return b.score - a.score;
      });
  }, [scoredLabs, filters]);

  if (!isOpen) return null;

  return (
    <div
      id="laboratory-finder-panel"
      aria-label="Laboratory Finder Workspace"
      className="fixed inset-0 z-50 flex flex-col h-screen w-screen bg-[#233A23] text-[#FDFDF5] overflow-hidden animate-in fade-in duration-200"
    >
      {/* Top Workspace Header */}
      <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] bg-[#2A3328] px-4 sm:px-6 py-2.5 shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[rgba(170,167,133,0.25)] bg-[#232323] text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] hover:border-[#AAA785]/30 transition-all cursor-pointer shadow-2xs shrink-0"
            title={t('copilot.backToChat', 'Back to chat')}
            aria-label={t('copilot.backToChat', 'Back to chat')}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-[rgba(170,167,133,0.20)]" />

          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[#AAA785] hidden sm:inline" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-[#FDFDF5] leading-snug">
                  Laboratory Finder
                </h2>
                <span className="rounded bg-[#233A23] px-2 py-0.5 text-[10px] font-bold text-[#AAA785] border border-[#AAA785]/25">
                  LIMS NETWORK
                </span>
              </div>
              <p className="text-[11px] text-[#AAA785] font-normal leading-normal hidden sm:block">
                Locate statutory Central, Regional and empanelled BIS testing laboratories with valid ISO/IEC 17025 scope
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://lims.bis.gov.in/home/labs/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-[rgba(170,167,133,0.25)] bg-[#232323] px-2.5 py-1.5 text-[11px] font-medium text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#AAA785] transition-colors"
          >
            <span>Live LIMS Directory</span>
            <ExternalLink className="h-3 w-3 text-[#AAA785]" />
          </a>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#233A23]">
        <div className="mx-auto max-w-5xl space-y-5">
          {/* Prominent Search Bar */}
          <LabSearch
            query={query}
            onQueryChange={setQuery}
            onSearch={() => {
              setIsSearching(true);
              setTimeout(() => setIsSearching(false), 150);
            }}
            isLoading={isSearching}
          />

          {/* Filter Bar */}
          <LabFilters
            filters={filters}
            onChange={setFilters}
            availableStates={availableStates}
            availableStandards={availableStandards}
            totalResults={filteredLabs.length}
          />

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-[#E1E1D5] px-1">
            <span className="font-semibold text-[#FDFDF5]">
              Showing {filteredLabs.length} Accredited Laborator{filteredLabs.length === 1 ? 'y' : 'ies'}
              {query.trim() && ` for "${query}"`}
            </span>
            <span className="text-[11px] text-[#AAA785]">
              Enforcing BIS Laboratory Recognition Scheme (LRS) & NABL ISO/IEC 17025
            </span>
          </div>

          {/* Result Cards */}
          {!isSearching && filteredLabs.length > 0 && (
            <div className="space-y-3.5">
              {filteredLabs.map(({ lab, matchedStandards, matchedContext }) => (
                <LabCard
                  key={lab.id}
                  lab={lab}
                  matchedStandards={matchedStandards}
                  matchedContext={matchedContext}
                  onViewDetails={setSelectedLab}
                  onSelectStandard={(std) => {
                    setQuery(std);
                    setFilters((prev) => ({ ...prev, standard: std }));
                  }}
                />
              ))}
            </div>
          )}

          {/* Empty / No Results State */}
          {!isSearching && filteredLabs.length === 0 && (
            <div className="rounded-2xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-8 text-center shadow-xs">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2A2E28] border border-[rgba(170,167,133,0.25)] mb-3">
                <AlertCircle className="h-6 w-6 text-[#AAA785]" />
              </div>
              <h3 className="text-base font-bold text-[#FDFDF5] mb-1">
                No Matching Laboratory Scope Found
              </h3>
              <p className="text-xs text-[#E1E1D5] max-w-md mx-auto mb-4 leading-relaxed">
                Could not find an empanelled laboratory directly matching "{query}" in the active database. Search the official online LIMS portal or reset filters:
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                <a
                  href="https://lims.bis.gov.in/home/labs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#AAA785] text-[#232323] hover:bg-[#E1E1D5] px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
                >
                  <span>Search BIS LIMS National Portal</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setFilters({
                      state: 'ALL',
                      type: 'ALL',
                      standard: 'ALL',
                      sortBy: 'relevance'
                    });
                  }}
                  className="rounded-lg border border-[rgba(170,167,133,0.30)] bg-[#232323] px-3.5 py-2 text-xs font-semibold text-[#E1E1D5] hover:bg-[#2A2E28] transition-colors cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lab Details Modal */}
      <LabDetails
        lab={selectedLab}
        onClose={() => setSelectedLab(null)}
        onOpenStandardFinder={(isNumber) => {
          setSelectedLab(null);
          onOpenStandardFinder?.(isNumber);
        }}
      />

      {/* Lightweight Contextual Mini-Brain for Laboratory Finder */}
      <ContextualMiniBrain
        capability="LAB_FINDER"
        context={{
          currentPage: 'Laboratory Finder',
          searchQuery: query,
          selectedLab: selectedLab?.name,
          activeFilters: filters,
          retrievedCount: filteredLabs.length
        }}
      />
    </div>
  );
}
