import { useState } from 'react';
import {
  Check,
  Copy,
  Printer,
  Compass,
  ArrowRight,
  ShieldCheck,
  BadgePercent
} from 'lucide-react';
import { FeeInputState } from './FeeInputForm.tsx';
import { INDIAN_STANDARDS } from '../../data/standards.ts';

interface FeeResultProps {
  inputs: FeeInputState;
  onOpenRoadmap?: () => void;
  onOpenLicensingGuidance?: () => void;
}

export function FeeResult({
  inputs,
  onOpenRoadmap,
  onOpenLicensingGuidance
}: FeeResultProps) {
  const [copied, setCopied] = useState(false);
  const standard = INDIAN_STANDARDS.find((s) => s.id === inputs.standardId) || INDIAN_STANDARDS[0];

  const handleCopySummary = () => {
    const text = `BIS Certification Fee Estimate for ${standard.is_number} (${standard.common_products[0] || standard.title}):
- Enterprise Type: ${inputs.manufacturerType}
- Activity: ${inputs.activity}
- Statutory Gazette Reference: bis.gov.in/product-certification-fee
Generated via BIS Sahayak Fee Intelligence Calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-5 sm:p-6 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.15)] pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <BadgePercent className="h-5 w-5 text-[#AAA785]" />
          <h3 className="text-sm sm:text-base font-bold text-[#FDFDF5]">
            Official Compliance & Application Actions
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-3 py-1.5 text-xs font-semibold text-[#E1E1D5] hover:bg-[#2A2E28] transition-colors cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[#AAA785]" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      <p className="text-xs text-[#E1E1D5] leading-relaxed">
        Ready to initiate your certification journey? Review the step-by-step audit milestones or documentation requirements for <strong>{standard.is_number}</strong>:
      </p>

      {/* Navigation Buttons to Copilot / Roadmap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {onOpenRoadmap && (
          <button
            type="button"
            onClick={onOpenRoadmap}
            className="flex items-center justify-between rounded-xl border border-[rgba(170,167,133,0.25)] bg-[#2A2E28] p-3 text-left hover:bg-[#31362E] transition-all cursor-pointer shadow-2xs group"
          >
            <div>
              <span className="font-bold text-xs text-[#FDFDF5] block">
                Open Certification Roadmap
              </span>
              <span className="text-[11px] text-[#FDFDF5]">
                Track the 12-step journey from application to marking
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-[#AAA785] group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}

        {onOpenLicensingGuidance && (
          <button
            type="button"
            onClick={onOpenLicensingGuidance}
            className="flex items-center justify-between rounded-xl border border-[rgba(170,167,133,0.25)] bg-[#2A2E28] p-3 text-left hover:bg-[#31362E] transition-all cursor-pointer shadow-2xs group"
          >
            <div>
              <span className="font-bold text-xs text-[#FDFDF5] block">
                Documentation & Audit Checklist
              </span>
              <span className="text-[11px] text-[#FDFDF5]">
                Verify mandatory factory equipment & Form-V records
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-[#AAA785] group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
