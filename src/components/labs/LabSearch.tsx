import React from 'react';
import { Search, Building2, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface LabSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const LAB_SEARCH_SUGGESTIONS = [
  'IS 302 testing',
  'electrical appliance testing',
  'laboratories in Telangana',
  'IS 17803 water bottle testing',
  'Packaged drinking water IS 14543',
  'Helmets IS 4151',
  'TMT Steel Bars IS 1786'
];

export function LabSearch({
  query,
  onQueryChange,
  onSearch,
  isLoading
}: LabSearchProps) {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleSelectChip = (chip: string) => {
    onQueryChange(chip);
    onSearch(chip);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <Building2 className="h-4 w-4 text-emerald-600" />
        <h3 className="text-sm sm:text-base font-bold text-slate-900">
          {t('labs.searchTitle', 'Search BIS Recognized & Empanelled Laboratories')}
        </h3>
      </div>
      <p className="text-xs text-slate-600 mb-4 max-w-2xl leading-relaxed">
        {t(
          'labs.searchSubtitle',
          'Search authorized testing facilities across India by product name, IS number, test requirement, state (e.g. "laboratories in Telangana"), or lab name.'
        )}
      </p>

      {/* Main Search Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3.5 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t(
              'labs.searchPlaceholder',
              'Search by standard (e.g. IS 302 testing), product, state (e.g. Telangana), or lab name...'
            )}
            className="w-full rounded-xl border border-slate-300 bg-slate-50/40 py-3.5 pl-11 pr-28 sm:pr-36 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-100 transition-all"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                onQueryChange('');
                onSearch('');
              }}
              className="absolute right-24 sm:right-32 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              title={t('common.clear', 'Clear query')}
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-1.5 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span className="hidden sm:inline">Searching...</span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <span>Find Labs</span>
                <ArrowRight className="h-3.5 w-3.5 hidden sm:inline" />
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Suggested Quick Searches */}
      <div className="mt-3.5 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-2">
          <span>{t('labs.popularQueries', 'Recommended test searches:')}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {LAB_SEARCH_SUGGESTIONS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleSelectChip(chip)}
              className="rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900 px-2.5 py-1 text-[11px] text-slate-700 transition-colors cursor-pointer text-left"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
