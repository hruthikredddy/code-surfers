import React from 'react';
import { Search, Sparkles, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface HallmarkSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  onQuickAction: (actionKey: string) => void;
  activeQuickAction: string;
  isLoading?: boolean;
}

export const QUICK_ACTIONS = [
  { id: 'mandatory-marks', label: 'Mandatory Marks' },
  { id: 'verify-huid', label: 'Verify HUID' },
  { id: 'purity-standards', label: 'Purity Information' },
  { id: 'hallmarking-process', label: 'Hallmarking Process' },
  { id: 'jeweller-registration', label: 'Jeweller Registration' },
  { id: 'assaying-centres', label: 'Assaying Centres (AHC)' },
  { id: 'consumer-guidance', label: 'Consumer FAQ' }
];

export function HallmarkSearch({
  query,
  onQueryChange,
  onSearch,
  onQuickAction,
  activeQuickAction,
  isLoading
}: HallmarkSearchProps) {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="rounded-2xl border border-[rgba(210,230,190,0.10)] bg-[#1A2016] p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#F5C451]" />
        <h3 className="text-sm sm:text-base font-bold text-[#F1F4EA]">
          Hallmarking Intelligence & Consumer Assurance
        </h3>
      </div>
      <p className="text-xs text-[#C0C7B7] max-w-2xl leading-relaxed">
        Ask any natural-language question regarding gold/silver hallmarking (e.g., "What does 916 mean?", "How does hallmarking work?", "How to verify HUID?", or "How does a jeweller register with BIS?").
      </p>

      {/* Search Input Bar */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3.5 h-5 w-5 text-[#858D7D]" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Ask about gold purity, 6-digit HUID, AHC centres, or jeweller rules..."
            className="w-full rounded-xl border border-[rgba(210,230,190,0.12)] bg-[#10150F] py-3.5 pl-11 pr-28 sm:pr-36 text-sm text-[#F1F4EA] placeholder-[#858D7D] focus:border-[#F5C451]/60 focus:bg-[#141A11] outline-none transition-all"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                onQueryChange('');
                onSearch('');
              }}
              className="absolute right-24 sm:right-32 text-[#858D7D] hover:text-[#F1F4EA] p-1 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-1.5 inline-flex items-center gap-1.5 rounded-lg bg-[#F5C451] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-[#10150F] hover:bg-[#FADB6A] transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#10150F] border-t-transparent" />
                <span className="hidden sm:inline">Searching...</span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <span>Inquire</span>
                <ArrowRight className="h-3.5 w-3.5 hidden sm:inline" />
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Quick Action Navigation Buttons */}
      <div className="pt-2 border-t border-[rgba(210,230,190,0.08)]">
        <div className="text-[11px] font-semibold text-[#858D7D] mb-2">
          Quick Regulatory Topics:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_ACTIONS.map((action) => {
            const isActive = activeQuickAction === action.id;
            return (
              <button
                key={action.id}
                type="button"
                onClick={() => onQuickAction(action.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F5C451] text-[#10150F] font-bold shadow-2xs'
                    : 'bg-[#22291C] text-[#C0C7B7] hover:bg-[#292F22] hover:text-[#F1F4EA] hover:border-[rgba(184,242,61,0.25)] border border-[rgba(210,230,190,0.08)]'
                }`}
              >
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
