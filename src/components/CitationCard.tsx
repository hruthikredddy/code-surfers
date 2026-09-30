import { ExternalLink, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { CitationItem } from '../types/index.ts';
import { useLanguage } from '../i18n/LanguageContext.tsx';

interface CitationCardProps {
  citation: CitationItem;
  onOpenStandard?: (isNumber: string) => void;
}

export function CitationCard({ citation, onOpenStandard }: CitationCardProps) {
  const { t } = useLanguage();

  return (
    <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#2A2E28] p-3.5 transition-colors hover:border-[rgba(170,167,133,0.30)]">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#232323] text-[#AAA785] border border-[rgba(170,167,133,0.20)]">
            <FileText className="h-3.5 w-3.5" />
          </div>
          {citation.is_number ? (
            <span className="font-semibold text-[#FDFDF5] text-sm leading-normal">
              {citation.is_number}
            </span>
          ) : (
            <span className="font-medium text-[#FDFDF5] text-sm leading-normal">
              {citation.title}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {citation.scheme && (
            <span className="inline-flex items-center rounded-md bg-[#232323] px-2 py-0.5 text-xs font-medium text-[#AAA785] border border-[#AAA785]/25 leading-normal">
              {citation.scheme}
            </span>
          )}
          {typeof citation.mandatory === 'boolean' && (
            <span
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium border leading-normal ${
                citation.mandatory
                  ? 'bg-[#AAA785]/10 text-[#AAA785] border-[#AAA785]/30'
                  : 'bg-[#232323] text-[#E1E1D5] border-[rgba(170,167,133,0.20)]'
              }`}
            >
              <ShieldCheck className="h-3 w-3" />
              {citation.mandatory ? t('citation.mandatoryQco', 'Mandatory under QCO') : t('citation.voluntary', 'Voluntary Scheme')}
            </span>
          )}
        </div>
      </div>

      {citation.is_number && (
        <p className="mt-1.5 text-xs text-[#E1E1D5] font-medium leading-relaxed">
          {citation.title}
        </p>
      )}

      {citation.ics_code && (
        <p className="mt-1 text-[11px] text-[#AAA785] font-mono leading-normal">
          {t('citation.icsCode', 'ICS Code:')} {citation.ics_code}
        </p>
      )}

      {citation.qco_reference && (
        <div className="mt-1.5 flex items-start gap-1.5 text-xs text-[#E1E1D5] bg-[#232323] rounded-lg px-2 py-1 border border-[rgba(170,167,133,0.20)] leading-normal">
          <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-[#AAA785] shrink-0" />
          <span>{citation.qco_reference}</span>
        </div>
      )}

      {citation.relevance_note && (
        <p className="mt-1.5 text-xs text-[#AAA785] leading-normal">
          {t('citation.note', 'Note:')} {citation.relevance_note}
        </p>
      )}

      <div className="mt-2.5 pt-2 border-t border-[rgba(170,167,133,0.20)] flex items-center justify-between gap-2 flex-wrap">
        <a
          href={citation.source_url || 'https://standards.bis.gov.in'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[#E1E1D5] hover:text-[#AAA785] font-medium transition-colors"
        >
          <span>{t('citation.verifyOnPortal', 'Verify on official BIS Portal')}</span>
          <ExternalLink className="h-3 w-3" />
        </a>

        {onOpenStandard && citation.is_number && (
          <button
            type="button"
            onClick={() => onOpenStandard(citation.is_number!)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#AAA785] hover:underline cursor-pointer"
          >
            <span>Explore in Standard Finder →</span>
          </button>
        )}
      </div>
    </div>
  );
}
