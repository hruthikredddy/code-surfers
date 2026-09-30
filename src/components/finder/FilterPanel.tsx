import React, { useState } from 'react';
import { RotateCcw, Filter, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

export interface StandardFilterState {
  category: string;
  scheme: string;
  mandatoryOnly: boolean;
  status: string;
  discipline: string;
}

interface FilterPanelProps {
  filters: StandardFilterState;
  onChange: (filters: StandardFilterState) => void;
  categories: string[];
  disciplines?: string[];
  totalResults: number;
}

export function FilterPanel({
  filters,
  onChange,
  categories,
  disciplines = [],
  totalResults
}: FilterPanelProps) {
  const { t } = useLanguage();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleReset = () => {
    onChange({
      category: 'ALL',
      scheme: 'ALL',
      mandatoryOnly: false,
      status: 'ALL',
      discipline: 'ALL'
    });
  };

  const isFiltered =
    filters.category !== 'ALL' ||
    filters.scheme !== 'ALL' ||
    filters.mandatoryOnly ||
    filters.status !== 'ALL' ||
    filters.discipline !== 'ALL';

  return (
    <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3 sm:p-4 shadow-sm">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.18)] pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#AAA785]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#FDFDF5]">
            Filters
          </span>
          <span className="rounded-full bg-[#2A3328] border border-[rgba(170,167,133,0.22)] px-2 py-0.5 text-[10px] font-semibold text-[#AAA785]">
            {totalResults} available
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isFiltered && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#AAA785] hover:underline cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}

          {/* Mobile toggle button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="sm:hidden inline-flex items-center gap-1 rounded-lg border border-[rgba(170,167,133,0.22)] bg-[#2A3328] px-2 py-1 text-xs text-[#E1E1D5]"
          >
            <span>Options</span>
            <ChevronDown className={`h-3 w-3 transition-transform ${isMobileOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Select Controls (5.3) */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs ${isMobileOpen ? 'block' : 'hidden sm:grid'}`}>
        {/* Category Filter */}
        <div>
          <label className="block text-[11px] font-medium text-[#AAA785] mb-1">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="w-full rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A3328] px-2.5 py-1.5 text-xs text-[#FDFDF5] focus:border-[#AAA785]/50 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Standard Type / Scheme Filter */}
        <div>
          <label className="block text-[11px] font-medium text-[#AAA785] mb-1">
            Standard Type / Scheme
          </label>
          <select
            value={filters.scheme}
            onChange={(e) => onChange({ ...filters, scheme: e.target.value })}
            className="w-full rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A3328] px-2.5 py-1.5 text-xs text-[#FDFDF5] focus:border-[#AAA785]/50 focus:outline-none"
          >
            <option value="ALL">All Schemes</option>
            <option value="Scheme-I">Scheme-I (ISI Mark)</option>
            <option value="CRS">CRS (Compulsory Registration)</option>
            <option value="Hallmarking">Hallmarking Scheme</option>
          </select>
        </div>

        {/* Mandate Status Filter */}
        <div>
          <label className="block text-[11px] font-medium text-[#AAA785] mb-1">
            Status
          </label>
          <select
            value={filters.mandatoryOnly ? 'MANDATORY' : 'ALL'}
            onChange={(e) =>
              onChange({
                ...filters,
                mandatoryOnly: e.target.value === 'MANDATORY'
              })
            }
            className="w-full rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A3328] px-2.5 py-1.5 text-xs text-[#FDFDF5] focus:border-[#AAA785]/50 focus:outline-none"
          >
            <option value="ALL">All Standards</option>
            <option value="MANDATORY">Mandatory (QCO Order)</option>
          </select>
        </div>

        {/* Discipline / Industry Filter */}
        <div>
          <label className="block text-[11px] font-medium text-[#AAA785] mb-1">
            Testing Discipline
          </label>
          <select
            value={filters.discipline}
            onChange={(e) => onChange({ ...filters, discipline: e.target.value })}
            className="w-full rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A3328] px-2.5 py-1.5 text-xs text-[#FDFDF5] focus:border-[#AAA785]/50 focus:outline-none"
          >
            <option value="ALL">All Disciplines</option>
            {disciplines.map((disc) => (
              <option key={disc} value={disc}>
                {disc}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
