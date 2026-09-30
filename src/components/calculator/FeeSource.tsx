import { ExternalLink, ShieldCheck } from 'lucide-react';

export function FeeSource() {
  return (
    <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3.5 text-xs text-[#E1E1D5] shadow-2xs">
      <div className="flex items-center gap-2 mb-1.5">
        <ShieldCheck className="h-4 w-4 text-[#AAA785]" />
        <span className="font-bold text-[#FDFDF5]">Authoritative Statutory Fee Gazette</span>
      </div>
      <p className="text-[11px] text-[#E1E1D5] leading-relaxed mb-2">
        Statutory fees are mandated by the Bureau of Indian Standards (Conformity Assessment) Regulations, 2018 and Government of India Gazette S.O. 2781(E).
      </p>
      <div className="flex items-center justify-between gap-2 flex-wrap text-[11px]">
        <span className="text-[#AAA785]">Official Portal: bis.gov.in/product-certification-fee</span>
        <a
          href="https://www.bis.gov.in/product-certification/product-certification-fee/?lang=en"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-[#AAA785] hover:text-[#FDFDF5] hover:underline"
        >
          <span>View Official Gazette Fee Schedule</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
