import React, { useState, useMemo, useEffect } from 'react';
import { StandardEntry } from '../../types/index.ts';
import { INDIAN_STANDARDS } from '../../data/standards.ts';
import { validateStandardRelevance } from '../../services/semanticRelevanceValidator.ts';
import { StandardSearch } from './StandardSearch.tsx';
import { StandardCard } from './StandardCard.tsx';
import { StandardDetails } from './StandardDetails.tsx';
import { FilterPanel, StandardFilterState } from './FilterPanel.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import {
  ArrowLeft,
  Search,
  AlertCircle,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

interface SmartStandardFinderProps {
  isOpen: boolean;
  onClose: () => void;
  onQueryAssistant: (prompt: string) => void;
  onOpenLabs?: (standardId?: string) => void;
  onOpenFees?: (standardId?: string) => void;
  initialQuery?: string;
}

interface ScoredStandardItem {
  standard: StandardEntry;
  score: number;
  matchExplanation: string;
}

export function SmartStandardFinder({
  isOpen,
  onClose,
  onQueryAssistant,
  onOpenLabs,
  onOpenFees,
  initialQuery = ''
}: SmartStandardFinderProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState<StandardEntry | null>(null);
  const [hasError, setHasError] = useState(false);

  // Filters State (5.3)
  const [filters, setFilters] = useState<StandardFilterState>({
    category: 'ALL',
    scheme: 'ALL',
    mandatoryOnly: false,
    status: 'ALL',
    discipline: 'ALL'
  });

  // Extract unique categories & disciplines
  const categories = useMemo(() => {
    return Array.from(new Set(INDIAN_STANDARDS.map((s) => s.category))).sort();
  }, []);

  const disciplines = useMemo(() => {
    return Array.from(
      new Set(
        INDIAN_STANDARDS.map((s) => s.testing_lab_discipline).filter(Boolean)
      )
    ).sort();
  }, []);

  // Sync initialQuery prop
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  // Execute Search (5.2)
  const searchResults: ScoredStandardItem[] = useMemo(() => {
    try {
      setHasError(false);
      const trimmed = query.trim().toLowerCase();

      // If query is empty, return all standards sorted by importance
      if (!trimmed) {
        return INDIAN_STANDARDS.map((std) => ({
          standard: std,
          score: std.mandatory ? 50 : 30,
          matchExplanation: std.mandatory
            ? `Mandatory Indian Standard under ${std.qco_reference || 'Gazetted QCO'}`
            : `Voluntary quality certification standard under ${std.scheme}`
        }));
      }

      const tokens = trimmed.split(/[\s,.;:/?!]+/).filter((t) => t.length > 1);
      const scored: ScoredStandardItem[] = [];

      for (const std of INDIAN_STANDARDS) {
        const relevance = validateStandardRelevance(trimmed, std);
        if (!relevance.isRelevant) {
          continue;
        }

        let score = relevance.score;
        const matchReasons: string[] = [];

        const isClean = std.is_number.toLowerCase().replace(/[^a-z0-9]/g, '');
        const queryClean = trimmed.replace(/[^a-z0-9]/g, '');

        // 1. Direct IS number match
        if (
          std.is_number.toLowerCase().includes(trimmed) ||
          (queryClean.length >= 3 && isClean.includes(queryClean))
        ) {
          score += 150;
          matchReasons.push(`Exact standard code match (${std.is_number})`);
        }

        // 2. Title match
        if (std.title.toLowerCase().includes(trimmed)) {
          score += 90;
          matchReasons.push('Direct title phrase match');
        }

        // 3. Keywords & Aliases
        for (const kw of std.keywords) {
          const kwLower = kw.toLowerCase();
          if (trimmed.includes(kwLower) || kwLower.includes(trimmed)) {
            score += 45;
            matchReasons.push(`Matched product keyword "${kw}"`);
            break;
          }
        }

        // 4. Common Products
        for (const prod of std.common_products) {
          if (trimmed.includes(prod.toLowerCase()) || prod.toLowerCase().includes(trimmed)) {
            score += 55;
            matchReasons.push(`Covers product "${prod}"`);
            break;
          }
        }

        // 5. Category Match
        if (std.category.toLowerCase().includes(trimmed)) {
          score += 35;
          matchReasons.push(`Belongs to category "${std.category}"`);
        }

        // 6. Token matching
        let tokenMatches = 0;
        for (const token of tokens) {
          if (token.length > 3) {
            if (std.scope_summary.toLowerCase().includes(token)) tokenMatches++;
            if (std.testing_lab_discipline.toLowerCase().includes(token)) tokenMatches++;
            if (std.title.toLowerCase().includes(token)) tokenMatches++;
          }
        }

        if (tokenMatches > 0) {
          score += tokenMatches * 8;
          if (matchReasons.length === 0) {
            matchReasons.push(`Technical match on ${tokenMatches} specification term(s)`);
          }
        }

        if (score > 0) {
          scored.push({
            standard: std,
            score,
            matchExplanation:
              matchReasons.length > 0
                ? matchReasons.slice(0, 2).join(' • ')
                : 'Relevant standard match identified from technical scope and specifications.'
          });
        }
      }

      scored.sort((a, b) => b.score - a.score);
      return scored;
    } catch (err) {
      setHasError(true);
      return [];
    }
  }, [query]);

  // Apply User Filters (5.3)
  const filteredResults = useMemo(() => {
    return searchResults.filter(({ standard }) => {
      // Category filter
      if (filters.category !== 'ALL' && standard.category !== filters.category) {
        return false;
      }

      // Scheme filter
      if (filters.scheme !== 'ALL') {
        if (filters.scheme === 'Scheme-I' && !standard.scheme.includes('Scheme-I')) return false;
        if (filters.scheme === 'CRS' && !standard.scheme.includes('CRS')) return false;
        if (filters.scheme === 'Hallmarking' && !standard.scheme.includes('Hallmarking')) return false;
      }

      // Mandatory only filter
      if (filters.mandatoryOnly && !standard.mandatory) {
        return false;
      }

      // Discipline filter
      if (filters.discipline !== 'ALL' && standard.testing_lab_discipline !== filters.discipline) {
        return false;
      }

      return true;
    });
  }, [searchResults, filters]);

  if (!isOpen) return null;

  return (
    <div
      id="smart-standard-finder-panel"
      aria-label="Smart Standard Finder Workspace"
      className="fixed inset-0 z-50 flex flex-col h-screen w-screen bg-[#233A23] text-[#FDFDF5] overflow-hidden animate-in fade-in duration-150"
    >
      {/* 5.1 & 5.7 Top Workspace Header & Navigation */}
      <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] bg-[#2A3328] px-4 sm:px-6 py-2.5 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-3 py-1.5 text-xs font-bold text-[#FDFDF5] hover:border-[rgba(170,167,133,0.30)] hover:text-[#AAA785] transition-colors cursor-pointer shrink-0"
            title="Return to previous screen"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="h-4 w-px bg-[rgba(170,167,133,0.20)]" />

          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-[#AAA785] hidden sm:inline" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-[#FDFDF5] leading-snug">
                  Smart Standard Finder
                </h2>
                <span className="rounded bg-[#232323] px-2 py-0.5 text-[10px] font-bold text-[#AAA785] border border-[rgba(170,167,133,0.20)]">
                  BIS REPOSITORY
                </span>
              </div>
              <p className="text-[11px] text-[#AAA785] font-normal hidden sm:block">
                Identify applicable Indian Standards, gazetted QCO mandates, and testing criteria
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://standards.bis.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-2.5 py-1.5 text-xs font-medium text-[#E1E1D5] hover:border-[rgba(170,167,133,0.30)] hover:text-[#AAA785] transition-colors"
          >
            <span>Live Portal (BIS)</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Main Scrollable Workspace */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-5">
          {/* Prominent Search Component (5.1 & 5.2) */}
          <StandardSearch
            query={query}
            onQueryChange={setQuery}
            onSearch={(q) => {
              setIsSearching(true);
              setTimeout(() => setIsSearching(false), 150);
            }}
            isLoading={isSearching}
          />

          {/* Filters Bar (5.3) */}
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            categories={categories}
            disciplines={disciplines}
            totalResults={filteredResults.length}
          />

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-[#AAA785] px-1">
            <span className="font-semibold text-[#E1E1D5]">
              Showing {filteredResults.length} Indian Standard{filteredResults.length === 1 ? '' : 's'}
              {query.trim() && ` matching "${query}"`}
            </span>
            <span className="text-[11px] text-[#AAA785] hidden sm:inline">
              Verified against Published Standards Directory & Gazette Notifications
            </span>
          </div>

          {/* 5.5 RESULT STATES: Loading Skeleton */}
          {isSearching && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-5 animate-pulse space-y-3"
                >
                  <div className="h-4 bg-[#2A2E28] rounded w-1/4" />
                  <div className="h-5 bg-[#2A2E28] rounded w-3/4" />
                  <div className="h-3 bg-[#2A2E28] rounded w-full" />
                  <div className="h-8 bg-[#2A2E28] rounded w-1/3" />
                </div>
              ))}
            </div>
          )}

          {/* 5.5 RESULT STATES: Error State */}
          {hasError && !isSearching && (
            <div className="rounded-2xl border border-[#FF6B6B]/30 bg-[#FF6B6B]/10 p-6 text-center space-y-3">
              <AlertCircle className="mx-auto h-8 w-8 text-[#FF6B6B]" />
              <h4 className="text-sm sm:text-base font-bold text-[#FDFDF5]">
                Unable to retrieve standards.
              </h4>
              <p className="text-xs text-[#E1E1D5]">
                A temporary error occurred while querying the standards catalog.
              </p>
              <button
                type="button"
                onClick={() => {
                  setHasError(false);
                  setIsSearching(true);
                  setTimeout(() => setIsSearching(false), 150);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF6B6B]/20 hover:bg-[#FF6B6B]/30 text-white px-4 py-2 text-xs font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          )}

          {/* 5.5 RESULT STATES: No Results Found */}
          {!isSearching && !hasError && filteredResults.length === 0 && (
            <div className="rounded-2xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-8 sm:p-12 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2A3328] border border-[rgba(170,167,133,0.22)] text-[#AAA785]">
                <Search className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-[#FDFDF5]">
                No matching standard found.
              </h4>
              <p className="text-xs sm:text-sm text-[#E1E1D5] max-w-md mx-auto">
                Try another product name, keyword or IS number. You can also consult the AI Assistant for natural language classification.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onQueryAssistant(`Which Indian Standard applies to "${query}"?`);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#AAA785] px-4 py-2 text-xs font-bold text-[#232323] hover:bg-[#E1E1D5] transition-colors cursor-pointer"
                >
                  <span>Ask AI Assistant about this</span>
                </button>
              </div>
            </div>
          )}

          {/* 5.4 RESULTS: Search Result Cards List */}
          {!isSearching && !hasError && filteredResults.length > 0 && (
            <div className="space-y-3.5">
              {filteredResults.map(({ standard, matchExplanation }) => (
                <StandardCard
                  key={standard.id}
                  standard={standard}
                  matchExplanation={matchExplanation}
                  onViewDetails={(std) => setSelectedStandard(std)}
                  onOpenLabs={(std) => onOpenLabs?.(std.is_number)}
                  onCalculateFees={(std) => onOpenFees?.(std.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5.6 STANDARD DETAILS MODAL / VIEW */}
      {selectedStandard && (
        <StandardDetails
          standard={selectedStandard}
          onClose={() => setSelectedStandard(null)}
          onQueryAssistant={onQueryAssistant}
          onOpenLabs={(std) => onOpenLabs?.(std.is_number)}
          onCalculateFees={(std) => onOpenFees?.(std.id)}
        />
      )}
    </div>
  );
}
