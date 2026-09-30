import { Info, AlertCircle } from 'lucide-react';

export function FeeDisclaimer() {
  return (
    <div className="rounded-xl border border-[rgba(170,167,133,0.25)] bg-[#2A2E28]/70 p-3.5 text-xs text-[#FDFDF5] flex items-start gap-2.5">
      <AlertCircle className="h-4 w-4 text-[#AAA785] shrink-0 mt-0.5" />
      <div className="space-y-1">
        <span className="font-bold text-[#FDFDF5] block">
          Statutory Regulatory Notice — Estimated Reference Calculation
        </span>
        <p className="text-[11px] leading-relaxed text-[#FDFDF5]">
          This fee breakdown is computed strictly from the gazetted BIS Product Certification Fee schedules and Department for Promotion of Industry and Internal Trade (DPIIT) MSME concession notifications. Final statutory amounts are validated on Manakonline based on actual audit duration, traveling expenses at actuals, and independent referral laboratory quotation.
        </p>
      </div>
    </div>
  );
}
