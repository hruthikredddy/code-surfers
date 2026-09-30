import React from 'react';
import { StandardEntry } from '../../types/index.ts';
import {
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  FlaskConical,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface StandardCardProps {
  standard: StandardEntry;
  matchExplanation?: string;
  onViewDetails: (standard: StandardEntry) => void;
  onOpenLabs?: (standard: StandardEntry) => void;
  onCalculateFees?: (standard: StandardEntry) => void;
}

export function StandardCard({
  standard,
  matchExplanation,
  onViewDetails,
  onOpenLabs
}: StandardCardProps) {
  const { t } = useLanguage();

  return (
    <div className="group rounded-2xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4.5 sm:p-5 transition-all hover:border-[rgba(170,167,133,0.35)] hover:bg-[#2A2E28] hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)] flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Standard Number (5.4) */}
            <span className="rounded-lg bg-[#2A3328] border border-[#AAA785]/30 px-2.5 py-1 text-xs sm:text-sm font-bold font-mono text-[#AAA785]">
              {standard.is_number}
            </span>

            {/* Mandatory Status */}
            {standard.mandatory ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#FF6B6B]/10 px-2 py-0.5 text-[11px] font-semibold text-[#FF6B6B] border border-[#FF6B6B]/25">
                <ShieldAlert className="h-3 w-3" />
                <span>Mandatory QCO</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#2A3328] px-2 py-0.5 text-[11px] font-semibold text-[#AAA785] border border-[rgba(170,167,133,0.20)]">
                <ShieldCheck className="h-3 w-3" />
                <span>Voluntary</span>
              </span>
            )}

            {/* Scheme Code */}
            <span className="rounded-md bg-[#2A3328] px-2 py-0.5 text-[10px] font-medium text-[#E1E1D5] border border-[rgba(170,167,133,0.18)]">
              {standard.scheme_code || standard.scheme}
            </span>
          </div>

          <span className="shrink-0 rounded-full bg-[#233A23] px-2 py-0.5 text-[10px] font-bold text-[#AAA785] border border-[#AAA785]/20">
            Active
          </span>
        </div>

        {/* Title (5.4) */}
        <h4 className="text-sm sm:text-base font-bold text-[#FDFDF5] leading-snug group-hover:text-[#AAA785] transition-colors mb-2">
          {standard.title}
        </h4>

        {/* Short Description (5.4) */}
        <p className="text-xs text-[#E1E1D5] line-clamp-2 leading-relaxed mb-3">
          {standard.scope_summary}
        </p>

        {/* Category & Relevant Product / Industry (5.4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#E1E1D5] mb-3 bg-[#2A3328] p-2.5 rounded-xl border border-[rgba(170,167,133,0.15)]">
          <div>
            <span className="text-[10.5px] uppercase font-semibold text-[#AAA785] block">
              Category
            </span>
            <span className="font-medium text-[#FDFDF5] truncate block mt-0.5">
              {standard.category}
            </span>
          </div>

          <div>
            <span className="text-[10.5px] uppercase font-semibold text-[#AAA785] block">
              Relevant Product / Industry
            </span>
            <span className="font-medium text-[#FDFDF5] truncate block mt-0.5">
              {standard.common_products && standard.common_products.length > 0
                ? standard.common_products.slice(0, 2).join(', ')
                : standard.ics_chapter || standard.category}
            </span>
          </div>
        </div>

        {/* Match reason if provided */}
        {matchExplanation && (
          <div className="mb-2 text-[11px] text-[#AAA785] flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#AAA785]" />
            <span className="truncate">{matchExplanation}</span>
          </div>
        )}
      </div>

      {/* Action Footer (5.4 CTA: [View Standard →]) */}
      <div className="mt-2 pt-3 border-t border-[rgba(170,167,133,0.18)] flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {onOpenLabs && (
            <button
              type="button"
              onClick={() => onOpenLabs(standard)}
              className="inline-flex items-center gap-1 text-xs text-[#AAA785] hover:text-[#FDFDF5] transition-colors"
            >
              <FlaskConical className="h-3.5 w-3.5" />
              <span>Testing Labs</span>
            </button>
          )}

          <a
            href={standard.source_url || 'https://standards.bis.gov.in'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#AAA785] hover:text-[#AAA785] transition-colors ml-2"
          >
            <span>BIS Portal</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => onViewDetails(standard)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#2A2E28] hover:bg-[#AAA785] hover:text-[#232323] px-3 py-1.5 text-xs font-bold text-[#FDFDF5] transition-all cursor-pointer shadow-2xs"
        >
          <span>View Standard</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
