import { RotateCcw, Calculator, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { INDIAN_STANDARDS } from '../../data/standards.ts';

export interface FeeInputState {
  standardId: string;
  manufacturerType: 'MICRO_STARTUP' | 'SMALL' | 'MEDIUM_LARGE';
  activity: 'NEW_SIMPLIFIED' | 'NEW_NORMAL' | 'RENEWAL_1YR' | 'RENEWAL_2YR' | 'SCOPE_CHANGE';
  auditDays: number;
}

interface FeeInputFormProps {
  inputs: FeeInputState;
  onChange: (inputs: FeeInputState) => void;
  onReset: () => void;
}

export function FeeInputForm({ inputs, onChange, onReset }: FeeInputFormProps) {
  const { t } = useLanguage();

  return (
    <div className="rounded-2xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-5 sm:p-6 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.15)] pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-[#AAA785]" />
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#FDFDF5]">
              Select Certification Activity & Enterprise Profile
            </h3>
            <p className="text-xs text-[#AAA785]">
              Calculates statutory fees with DPIIT MSME concessions & 18% GST
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#AAA785] hover:text-[#FDFDF5] hover:bg-[#2A2E28] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {/* Product / Standard Selector */}
        <div>
          <label className="block text-xs font-semibold text-[#E1E1D5] mb-1">
            Product & Indian Standard (IS):
          </label>
          <select
            value={inputs.standardId}
            onChange={(e) => onChange({ ...inputs, standardId: e.target.value })}
            className="w-full rounded-xl border border-[rgba(170,167,133,0.30)] bg-[#2A2E28] py-2.5 px-3 text-xs text-[#FDFDF5] focus:border-emerald-600 focus:bg-[#232323] focus:outline-hidden"
          >
            {INDIAN_STANDARDS.map((std) => (
              <option key={std.id} value={std.id}>
                {std.is_number} — {std.common_products[0] || std.title.slice(0, 35)}
              </option>
            ))}
          </select>
        </div>

        {/* Enterprise Type & Concession */}
        <div>
          <label className="block text-xs font-semibold text-[#E1E1D5] mb-1">
            Enterprise Category / MSME Status:
          </label>
          <select
            value={inputs.manufacturerType}
            onChange={(e) =>
              onChange({
                ...inputs,
                manufacturerType: e.target.value as FeeInputState['manufacturerType']
              })
            }
            className="w-full rounded-xl border border-[rgba(170,167,133,0.30)] bg-[#2A2E28] py-2.5 px-3 text-xs text-[#FDFDF5] focus:border-emerald-600 focus:bg-[#232323] focus:outline-hidden font-medium"
          >
            <option value="MICRO_STARTUP">
              Micro / DPIIT Startup / Women-Led (50% Concession)
            </option>
            <option value="SMALL">Small Enterprise (20% Concession)</option>
            <option value="MEDIUM_LARGE">Medium / Large Enterprise (Standard Rates)</option>
          </select>
        </div>

        {/* Certification Activity */}
        <div>
          <label className="block text-xs font-semibold text-[#E1E1D5] mb-1">
            Certification Activity / Pathway:
          </label>
          <select
            value={inputs.activity}
            onChange={(e) =>
              onChange({
                ...inputs,
                activity: e.target.value as FeeInputState['activity']
              })
            }
            className="w-full rounded-xl border border-[rgba(170,167,133,0.30)] bg-[#2A2E28] py-2.5 px-3 text-xs text-[#FDFDF5] focus:border-emerald-600 focus:bg-[#232323] focus:outline-hidden"
          >
            <option value="NEW_SIMPLIFIED">New Grant — Simplified Route (Option 2 - 30 Days)</option>
            <option value="NEW_NORMAL">New Grant — Normal Route (Option 1 - Factory Testing)</option>
            <option value="RENEWAL_1YR">Licence Renewal (1 Year Extension)</option>
            <option value="RENEWAL_2YR">Licence Renewal (2 Years Extension)</option>
            <option value="SCOPE_CHANGE">Scope Endorsement / Brand Addition</option>
          </select>
        </div>
      </div>
    </div>
  );
}
