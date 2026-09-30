import { BisLabItem } from '../../types/index.ts';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Clock,
  FlaskConical,
  Award
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface LabCardProps {
  lab: BisLabItem;
  matchedStandards?: string[];
  matchedContext?: string;
  onViewDetails: (lab: BisLabItem) => void;
  onSelectStandard?: (isNumber: string) => void;
}

export function LabCard({
  lab,
  matchedStandards = [],
  matchedContext,
  onViewDetails,
  onSelectStandard
}: LabCardProps) {
  const { t } = useLanguage();

  const isCentral = lab.type === 'Central Laboratory';
  const hasMatchedScope = matchedStandards.length > 0;

  return (
    <div className="group rounded-2xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-[rgba(170,167,133,0.35)] transition-all">
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Recognition Status Tag */}
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold ${
              isCentral
                ? 'bg-[#233A23] text-[#FDFDF5] border border-[rgba(170,167,133,0.25)]'
                : 'bg-[#233A23] text-[#FDFDF5] border border-[rgba(170,167,133,0.25)]'
            }`}
          >
            <ShieldCheck className="h-3 w-3" />
            <span>
              {isCentral ? 'Statutory BIS Laboratory' : 'BIS Recognized Laboratory'}
            </span>
          </span>

          {hasMatchedScope && (
            <span className="rounded-md bg-[#2A2E28] border border-[rgba(170,167,133,0.25)] px-2 py-0.5 text-[10px] font-bold text-[#FDFDF5]">
              Testing Scope Verified
            </span>
          )}

          <span className="rounded-md bg-[#2A2E28] px-2 py-0.5 text-[10px] font-medium text-[#E1E1D5]">
            LIMS ID: {lab.contact_info.lims_id || 'BIS-LRS'}
          </span>
        </div>

        {/* Location Tag */}
        <div className="flex items-center gap-1 text-[11px] font-semibold text-[#E1E1D5] bg-[#2A2E28] px-2 py-0.5 rounded-md shrink-0">
          <MapPin className="h-3 w-3 text-red-500 shrink-0" />
          <span>{lab.city}, {lab.state}</span>
        </div>
      </div>

      {/* Lab Name */}
      <h4 className="text-sm sm:text-base font-bold text-[#FDFDF5] leading-snug group-hover:text-[#FDFDF5] transition-colors mb-1.5">
        {lab.name}
      </h4>

      {/* Location line */}
      <p className="text-xs text-[#AAA785] mb-3 flex items-center gap-1">
        <span>{lab.location}</span>
      </p>

      {/* Matched Context if query matches a specific query */}
      {matchedContext && (
        <div className="mb-3 rounded-lg bg-[#2A2E28]/70 border border-[rgba(170,167,133,0.25)]/80 px-3 py-2 text-xs text-emerald-950">
          <strong className="font-semibold text-[#FDFDF5]">Testing Match: </strong>
          {matchedContext}
        </div>
      )}

      {/* Accreditation */}
      <div className="rounded-lg bg-[#2A2E28] p-2 text-xs text-[#E1E1D5] mb-3 flex items-start gap-1.5">
        <Award className="h-3.5 w-3.5 text-[#AAA785] shrink-0 mt-0.5" />
        <span className="text-[11px] leading-relaxed line-clamp-1">
          {lab.accreditation}
        </span>
      </div>

      {/* Supported Standards Grid */}
      <div className="mb-3">
        <span className="text-[11px] font-semibold text-[#E1E1D5] mb-1 block">
          Authorized Standards Scope:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {lab.supported_standards.map((std) => {
            const isMatch = matchedStandards.includes(std);
            return (
              <button
                key={std}
                type="button"
                onClick={() => onSelectStandard?.(std)}
                className={`rounded px-2 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                  isMatch
                    ? 'bg-[#233A23] text-[#FDFDF5] font-bold border border-[rgba(170,167,133,0.35)]'
                    : 'bg-[#2A2E28] text-[#E1E1D5] hover:bg-[#2A2E28]'
                }`}
                title="Filter by or inspect this standard"
              >
                {std}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Details Row: Turnaround & Contact */}
      <div className="flex items-center justify-between gap-2 text-xs text-[#E1E1D5] mb-3 pt-2 border-t border-[rgba(170,167,133,0.15)] flex-wrap">
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-[#AAA785]" />
          <span className="text-[11px]">Turnaround: <strong>{lab.turnaround_time}</strong></span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          {lab.contact_info.phone && (
            <span className="inline-flex items-center gap-1 text-[#E1E1D5]">
              <Phone className="h-3 w-3 text-[#AAA785]" />
              <span>{lab.contact_info.phone.split('/')[0]}</span>
            </span>
          )}
          {lab.contact_info.email && (
            <span className="inline-flex items-center gap-1 text-[#E1E1D5] hidden md:inline-flex">
              <Mail className="h-3 w-3 text-[#AAA785]" />
              <span>{lab.contact_info.email}</span>
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-[rgba(170,167,133,0.15)]">
        <span className="text-[10px] text-[#AAA785] truncate">
          Source: {lab.source_reference}
        </span>

        <button
          type="button"
          onClick={() => onViewDetails(lab)}
          className="inline-flex items-center gap-1 rounded-lg bg-[#232323] px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-2xs shrink-0"
        >
          <span>View Scope & Details</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
