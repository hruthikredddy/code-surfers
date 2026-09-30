import {
  X,
  Award,
  ExternalLink,
  ShieldCheck,
  Building,
  Flame,
  FileCheck2,
  DollarSign
} from 'lucide-react';
import { SourceCitation } from '../finder/SourceCitation.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface HallmarkDetailsProps {
  isOpen: boolean;
  topicId: string;
  onClose: () => void;
  onOpenLabFinder?: () => void;
}

export function HallmarkDetails({
  isOpen,
  topicId,
  onClose,
  onOpenLabFinder
}: HallmarkDetailsProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hallmark-details-title"
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="flex flex-col max-h-[92vh] w-full max-w-2xl rounded-2xl border border-[rgba(210,230,190,0.14)] bg-[#171C13] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[rgba(210,230,190,0.10)] bg-[#1A2016] px-4 sm:px-6 py-3.5 shrink-0">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-[#F5C451]" />
            <h3
              id="hallmark-details-title"
              className="text-sm sm:text-base font-bold text-[#F1F4EA]"
            >
              {topicId === 'registration'
                ? 'Jeweller Registration with BIS'
                : 'Assaying & Hallmarking Centres (AHC) Regulatory Norms'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#858D7D] hover:bg-[#292F22] hover:text-[#F1F4EA] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-[#C0C7B7] leading-relaxed">
          {topicId === 'registration' ? (
            <>
              <div className="rounded-xl border border-[#F5C451]/30 bg-[#F5C451]/10 p-4 space-y-2">
                <span className="font-bold text-[#F5C451] block">Zero Statutory Fee for Jeweller Registration</span>
                <p className="text-[#F1F4EA] text-xs">
                  To facilitate ease of doing business for small and traditional goldsmiths, the Government of India and BIS have waived all registration fees for jewellers. Registration is completely free and valid for lifetime.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#F1F4EA] uppercase tracking-wider text-xs">
                  Registration Prerequisites & Steps:
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#C0C7B7]">
                  <li>Visit the official portal: <strong className="text-[#F1F4EA]">manakonline.in</strong>.</li>
                  <li>Click on "Hallmarking" and select "Register as Jeweller".</li>
                  <li>Upload Firm Registration (GSTIN or Udyam Aadhar), PAN card, and premise address proof.</li>
                  <li>Instant issuance of statutory Certificate of Registration upon electronic validation.</li>
                </ol>
              </div>

              <div className="rounded-xl border border-[rgba(210,230,190,0.08)] bg-[#22291C] p-3.5 text-xs text-[#C0C7B7]">
                <strong className="text-[#F1F4EA]">Mandatory Retail Display:</strong> Registered jewellers must prominently exhibit the BIS Certificate of Registration and a magnifying glass (minimum 10X magnification) on retail sales counters for consumer inspection of HUID marks.
              </div>
            </>
          ) : (
            <>
              <div className="rounded-xl border border-[#B8F23D]/30 bg-[#B8F23D]/10 p-4 space-y-2">
                <span className="font-bold text-[#B8F23D] block">Setting Up an Assaying & Hallmarking Centre (AHC)</span>
                <p className="text-[#F1F4EA] text-xs">
                  Assaying & Hallmarking Centres (AHCs) are third-party testing institutions accredited under ISO/IEC 17025 and recognized by BIS under the BIS (Hallmarking) Regulations, 2018.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#F1F4EA] uppercase tracking-wider text-xs">
                  Mandatory Testing Equipment:
                </h4>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-[#C0C7B7]">
                  <li><strong className="text-[#F1F4EA]">Fire Assay Cupellation Furnace</strong> conforming to IS 1418 with precise temperature controllers (1050°C).</li>
                  <li><strong className="text-[#F1F4EA]">Precision Microbalance</strong> with sensitivity of 0.001 mg (1 microgram).</li>
                  <li><strong className="text-[#F1F4EA]">X-Ray Fluorescence (XRF) Spectrometer</strong> for non-destructive preliminary purity mapping.</li>
                  <li><strong className="text-[#F1F4EA]">Micro-laser Marking Machine</strong> with safe laser enclosure for inscribing 6-character HUID codes.</li>
                </ul>
              </div>

              {onOpenLabFinder && (
                <div className="rounded-xl border border-[rgba(210,230,190,0.10)] bg-[#22291C] p-3.5 flex items-center justify-between gap-3">
                  <span className="text-xs text-[#F1F4EA] font-medium">
                    Looking for accredited laboratories and assaying facilities across states?
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenLabFinder();
                    }}
                    className="rounded-lg bg-[#B8F23D] px-3 py-1.5 text-xs font-bold text-[#10150F] hover:bg-[#C8FF52] transition-colors cursor-pointer shrink-0"
                  >
                    Open Lab Finder
                  </button>
                </div>
              )}
            </>
          )}

          <div className="pt-2">
            <SourceCitation
              title="Bureau of Indian Standards — Hallmarking Portal"
              url="https://www.bis.gov.in/hallmarking-overview/?lang=en"
              sourceName="BIS Hallmarking Department"
              relevanceNote="Statutory regulatory orders, list of 343+ mandatory districts, and recognized Assaying & Hallmarking Centres."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-[rgba(210,230,190,0.10)] bg-[#1A2016] px-4 sm:px-6 py-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#292F22] border border-[rgba(210,230,190,0.12)] px-4 py-1.5 text-xs font-bold text-[#F1F4EA] hover:border-[rgba(184,242,61,0.25)] hover:text-[#B8F23D] transition-colors cursor-pointer shadow-2xs"
          >
            {t('common.close', 'Done')}
          </button>
        </div>
      </div>
    </div>
  );
}
