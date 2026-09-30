import React from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface StandardSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const EXAMPLE_SEARCHES = [
  'LED bulbs for home lighting',
  'IS 302 electrical appliances',
  'Stainless steel water bottles',
  'Packaged drinking water',
  'Protective helmets for two wheelers',
  'TMT steel bars for construction',
  'Immersion water heater rod'
];

export function StandardSearch({
  query,
  onQueryChange,
  onSearch,
  isLoading
}: StandardSearchProps) {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleSelectExample = (example: string) => {
    onQueryChange(example);
    onSearch(example);
  };

  return (
    <div className="rounded-2xl border border-[rgba(170,167,133,0.22)] bg-[#232323] p-4 sm:p-6 shadow-sm">
      {/* 5.1 HEADER TEXT */}
      <div className="flex items-center gap-2 mb-1.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2A3328] border border-[#AAA785]/25 text-[#AAA785]">
          <Search className="h-4 w-4" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#FDFDF5]">
          Smart Standard Finder
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-[#E1E1D5] mb-4 max-w-2xl leading-relaxed">
        Find the relevant Indian Standard for your product, material or industry.
      </p>

      {/* Main Search Bar (5.1 & 5.2) */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3.5 h-4.5 w-4.5 text-[#AAA785]" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by product, material, IS number or keyword..."
            className="w-full rounded-xl border border-[rgba(170,167,133,0.25)] bg-[#2A3328] py-3 pl-11 pr-24 text-xs sm:text-sm text-[#FDFDF5] placeholder-[#AAA785] focus:border-[rgba(170,167,133,0.45)] focus:ring-2 focus:ring-[#AAA785]/10 focus:outline-none transition-all"
          />

          <div className="absolute right-2 flex items-center gap-1.5">
            {query && (
              <button
                type="button"
                onClick={() => {
                  onQueryChange('');
                  onSearch('');
                }}
                className="rounded-lg p-1 text-[#AAA785] hover:text-[#FDFDF5] transition-colors"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-[#AAA785] px-3.5 py-1.5 text-xs font-bold text-[#232323] hover:bg-[#E1E1D5] transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {/* Suggestion Chips */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-[11px] font-semibold text-[#AAA785] flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-[#AAA785]" />
          Examples:
        </span>
        {EXAMPLE_SEARCHES.map((example, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelectExample(example)}
            className="rounded-md border border-[rgba(170,167,133,0.18)] bg-[#232323] px-2 py-0.5 text-[11px] text-[#E1E1D5] hover:border-[rgba(170,167,133,0.30)] hover:text-[#AAA785] transition-colors cursor-pointer"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
