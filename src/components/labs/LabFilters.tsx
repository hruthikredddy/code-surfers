import { RotateCcw, Filter, MapPin } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

export interface LabFilterState {
  state: string;
  type: string;
  standard: string;
  sortBy: 'relevance' | 'location' | 'turnaround';
}

interface LabFiltersProps {
  filters: LabFilterState;
  onChange: (filters: LabFilterState) => void;
  availableStates: string[];
  availableStandards: string[];
  totalResults: number;
}

export function LabFilters({
  filters,
  onChange,
  availableStates,
  availableStandards,
  totalResults
}: LabFiltersProps) {
  const { t } = useLanguage();

  const handleReset = () => {
    onChange({
      state: 'ALL',
      type: 'ALL',
      standard: 'ALL',
      sortBy: 'relevance'
    });
  };

  const isFiltered =
    filters.state !== 'ALL' ||
    filters.type !== 'ALL' ||
    filters.standard !== 'ALL' ||
    filters.sortBy !== 'relevance';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            {t('labs.filterLabs', 'Filter Laboratories')}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
            {totalResults} {t('labs.matching', 'matching')}
          </span>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 hover:text-blue-900 hover:underline cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>{t('common.reset', 'Reset filters')}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* State Filter */}
        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1 flex items-center gap-1">
            <MapPin className="h-3 w-3 text-slate-400" />
            <span>State / Territory</span>
          </label>
          <select
            value={filters.state}
            onChange={(e) => onChange({ ...filters, state: e.target.value })}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-hidden"
          >
            <option value="ALL">All States (National Network)</option>
            {availableStates.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Laboratory Recognition Type */}
        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">
            Laboratory Type / Status
          </label>
          <select
            value={filters.type}
            onChange={(e) => onChange({ ...filters, type: e.target.value })}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-hidden"
          >
            <option value="ALL">All Laboratory Types</option>
            <option value="Central Laboratory">Central / Regional BIS Lab</option>
            <option value="BIS Recognized Commercial Lab">BIS Recognized Empanelled Lab</option>
          </select>
        </div>

        {/* Supported Standard Filter */}
        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">
            Supported Indian Standard
          </label>
          <select
            value={filters.standard}
            onChange={(e) => onChange({ ...filters, standard: e.target.value })}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-hidden"
          >
            <option value="ALL">All Standards</option>
            {availableStandards.map((std) => (
              <option key={std} value={std}>
                {std}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">
            Sort Order
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onChange({
                ...filters,
                sortBy: e.target.value as 'relevance' | 'location' | 'turnaround'
              })
            }
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-hidden"
          >
            <option value="relevance">Highest Relevance Score</option>
            <option value="location">Location (Alphabetical)</option>
            <option value="turnaround">Turnaround Speed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
