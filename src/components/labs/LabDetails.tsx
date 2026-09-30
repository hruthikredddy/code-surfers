import { BisLabItem } from '../../types/index.ts';
import {
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  ExternalLink,
  ShieldCheck,
  Award,
  Clock,
  FlaskConical,
  Building,
  Navigation
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface LabDetailsProps {
  lab: BisLabItem | null;
  onClose: () => void;
  onOpenStandardFinder?: (isNumber: string) => void;
}

export function LabDetails({
  lab,
  onClose,
  onOpenStandardFinder
}: LabDetailsProps) {
  const { t } = useLanguage();

  if (!lab) return null;

  const isCentral = lab.type === 'Central Laboratory';
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${lab.name} ${lab.location}`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lab-details-title"
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="flex flex-col max-h-[92vh] w-full max-w-2xl rounded-2xl border border-[rgba(170,167,133,0.20)] bg-[#232323] shadow-xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] bg-[#2A2E28]/80 px-4 sm:px-6 py-3.5 shrink-0">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                isCentral
                  ? 'bg-[#233A23] text-[#FDFDF5] border border-[rgba(170,167,133,0.25)]'
                  : 'bg-[#233A23] text-[#FDFDF5] border border-[rgba(170,167,133,0.25)]'
              }`}
            >
              {isCentral ? 'Statutory BIS Laboratory' : 'BIS Recognized Laboratory'}
            </span>
            <span className="font-mono text-xs text-[#AAA785]">
              LIMS: {lab.contact_info.lims_id || 'LRS-VALID'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#AAA785] hover:bg-[#2A2E28] hover:text-[#E1E1D5] transition-colors cursor-pointer"
            title={t('common.close', 'Close')}
            aria-label={t('common.close', 'Close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-[#E1E1D5]">
          {/* Lab Name and Region */}
          <div>
            <h3
              id="lab-details-title"
              className="text-base sm:text-lg font-bold text-[#FDFDF5] leading-snug mb-1"
            >
              {lab.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[#AAA785]">
              <span className="font-medium text-[#FDFDF5]">{lab.city}, {lab.state}</span>
              <span>•</span>
              <span>{lab.region} Region</span>
            </div>
          </div>

          {/* Accreditation Banner */}
          <div className="rounded-xl border border-[rgba(170,167,133,0.25)] bg-[#2A2E28] p-3 text-xs flex items-start gap-2.5">
            <Award className="h-4 w-4 text-[#AAA785] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#FDFDF5] block mb-0.5">Accreditation & Recognition</span>
              <p className="text-[#FDFDF5] leading-relaxed text-[11px]">
                {lab.accreditation}
              </p>
            </div>
          </div>

          {/* Supported Indian Standards Scope */}
          <div>
            <h4 className="text-xs font-bold text-[#FDFDF5] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FlaskConical className="h-3.5 w-3.5 text-[#AAA785]" />
              <span>Recognized Testing Standards Scope ({lab.supported_standards.length})</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lab.supported_standards.map((std) => (
                <div
                  key={std}
                  className="flex items-center justify-between rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A2E28]/60 p-2 text-xs"
                >
                  <span className="font-mono font-semibold text-[#FDFDF5]">{std}</span>
                  {onOpenStandardFinder && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenStandardFinder(std);
                      }}
                      className="text-[10px] font-medium text-[#AAA785] hover:underline"
                    >
                      View Standard
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Testing Turnaround and Sample Handling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3">
              <span className="text-[11px] font-semibold text-[#AAA785] block mb-1">
                Estimated Turnaround Time:
              </span>
              <div className="flex items-center gap-1.5 font-bold text-[#FDFDF5]">
                <Clock className="h-4 w-4 text-[#AAA785]" />
                <span>{lab.turnaround_time}</span>
              </div>
            </div>

            <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3">
              <span className="text-[11px] font-semibold text-[#AAA785] block mb-1">
                Sample Submission Mode:
              </span>
              <p className="text-xs text-[#E1E1D5]">
                LIMS Blind Sample Coding or Direct Referral Delivery
              </p>
            </div>
          </div>

          {/* Contact and Location Card */}
          <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#2A2E28]/60 p-3.5 space-y-2">
            <h4 className="text-xs font-bold text-[#FDFDF5] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Building className="h-3.5 w-3.5 text-[#E1E1D5]" />
              <span>Contact Information & Facility Address</span>
            </h4>

            <div className="flex items-start gap-2 text-xs text-[#E1E1D5]">
              <MapPin className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#FDFDF5]">{lab.contact_info.address}</p>
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#AAA785] hover:underline mt-1"
                >
                  <Navigation className="h-3 w-3" />
                  <span>View address on Google Maps</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[rgba(170,167,133,0.20)] text-xs">
              {lab.contact_info.phone && (
                <div className="flex items-center gap-1.5 text-[#E1E1D5]">
                  <Phone className="h-3.5 w-3.5 text-[#AAA785]" />
                  <span>{lab.contact_info.phone}</span>
                </div>
              )}
              {lab.contact_info.email && (
                <div className="flex items-center gap-1.5 text-[#E1E1D5]">
                  <Mail className="h-3.5 w-3.5 text-[#AAA785]" />
                  <span>{lab.contact_info.email}</span>
                </div>
              )}
            </div>

            {lab.contact_info.website && (
              <div className="pt-1 text-xs">
                <a
                  href={lab.contact_info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#AAA785] hover:underline"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>{lab.contact_info.website}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>

          {/* Authoritative Source Reference */}
          <div className="text-[11px] text-[#AAA785] pt-1">
            <strong>Source Authority:</strong> {lab.source_reference}. Tested and accredited per ISO/IEC 17025 under the BIS Laboratory Recognition Scheme (LRS).
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[rgba(170,167,133,0.20)] bg-[#2A2E28] px-4 sm:px-6 py-3 shrink-0">
          <a
            href="https://lims.bis.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#AAA785] hover:underline"
          >
            <span>BIS LIMS Official Directory</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#232323] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#E1E1D5] hover:text-[#232323] transition-colors cursor-pointer shadow-2xs"
          >
            {t('common.close', 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
}
