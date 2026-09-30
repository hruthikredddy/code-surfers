import React, { useState } from 'react';
import { StandardEntry } from '../../types/index.ts';
import {
  ArrowLeft,
  X,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  FlaskConical,
  MessageSquare,
  Copy,
  Check,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface StandardDetailsProps {
  standard: StandardEntry | null;
  onClose: () => void;
  onQueryAssistant?: (prompt: string) => void;
  onOpenLabs?: (standard: StandardEntry) => void;
  onCalculateFees?: (standard: StandardEntry) => void;
}

export function StandardDetails({
  standard,
  onClose,
  onQueryAssistant,
  onOpenLabs
}: StandardDetailsProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!standard) return null;

  const handleCopyIS = () => {
    navigator.clipboard.writeText(`${standard.is_number}: ${standard.title}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="standard-details-title"
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="flex flex-col max-h-[90vh] w-full max-w-3xl rounded-2xl border border-[rgba(170,167,133,0.25)] bg-[#232323] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 text-[#FDFDF5]">
        {/* Top Header with "← Back to results" button (5.6) */}
        <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] bg-[#2A3328] px-4 sm:px-6 py-3.5 shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(170,167,133,0.22)] bg-[#232323] px-3 py-1.5 text-xs font-semibold text-[#FDFDF5] hover:border-[rgba(170,167,133,0.35)] hover:text-[#AAA785] transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to results</span>
            </button>

            <span className="font-mono text-xs sm:text-sm font-bold text-[#AAA785] bg-[#232323] border border-[#AAA785]/30 px-2.5 py-1 rounded-lg">
              {standard.is_number}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyIS}
              className="rounded-lg p-1.5 text-[#AAA785] hover:bg-[#232323] hover:text-[#FDFDF5] transition-colors cursor-pointer"
              title="Copy IS number and title"
            >
              {copied ? <Check className="h-4 w-4 text-[#AAA785]" /> : <Copy className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-[#AAA785] hover:bg-[#232323] hover:text-[#FDFDF5] transition-colors cursor-pointer"
              title="Close details"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body (5.6 Structure) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
          {/* 1. Standard Number & Title */}
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {standard.mandatory ? (
                <span className="inline-flex items-center gap-1 rounded bg-[#FF6B6B]/15 px-2 py-0.5 text-xs font-bold text-[#FF6B6B] border border-[#FF6B6B]/30">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Mandatory QCO Gazetted</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded bg-[#232323] px-2 py-0.5 text-xs font-semibold text-[#AAA785] border border-[rgba(170,167,133,0.20)]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Voluntary Certification</span>
                </span>
              )}
              <span className="rounded bg-[#232323] px-2 py-0.5 text-xs font-medium text-[#AAA785] border border-[rgba(170,167,133,0.20)]">
                {standard.scheme}
              </span>
              <span className="rounded bg-[#2A3328] px-2 py-0.5 text-xs font-mono text-[#AAA785]">
                ICS {standard.ics_code}
              </span>
            </div>

            <h3 id="standard-details-title" className="text-base sm:text-lg font-bold text-[#FDFDF5] leading-snug">
              {standard.title}
            </h3>
          </div>

          {/* 2. Description (Scope Summary) */}
          <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#AAA785] mb-1.5">
              Technical Scope Summary
            </h4>
            <p className="text-xs sm:text-sm text-[#E1E1D5] leading-relaxed">
              {standard.scope_summary}
            </p>
          </div>

          {/* 3. Applicable Products & Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#AAA785] block mb-1">
                Product Category
              </span>
              <span className="font-semibold text-[#FDFDF5] block">
                {standard.category}
              </span>
              <span className="text-[11px] text-[#AAA785] block mt-1">
                Chapter: {standard.ics_chapter || 'Published Indian Standards'}
              </span>
            </div>

            <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#AAA785] block mb-1">
                Common Covered Products
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {standard.common_products && standard.common_products.length > 0 ? (
                  standard.common_products.map((p, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-[#2A3328] border border-[rgba(170,167,133,0.20)] px-2 py-0.5 text-xs text-[#FDFDF5]"
                    >
                      {p}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#AAA785]">Refer to scope summary</span>
                )}
              </div>
            </div>
          </div>

          {/* 4. Mandatory Quality Control Order (QCO) Reference */}
          {standard.qco_reference && (
            <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#AAA785]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#FDFDF5]">
                  Quality Control Order (QCO) Mandate
                </h4>
              </div>
              <p className="text-xs text-[#E1E1D5] leading-relaxed">
                {standard.qco_reference}
              </p>
            </div>
          )}

          {/* 5. Key Clauses & Scheme of Testing and Inspection (STI) */}
          {standard.key_clauses && standard.key_clauses.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#AAA785] mb-2.5">
                Key Standard Clauses & Test Parameters
              </h4>
              <div className="space-y-2">
                {standard.key_clauses.map((clause, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[rgba(170,167,133,0.18)] bg-[#232323] p-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#AAA785]">
                        {clause.clause}
                      </span>
                      <span className="text-xs font-semibold text-[#FDFDF5]">
                        {clause.title}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#E1E1D5] leading-relaxed pl-1">
                      {clause.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Testing Discipline & Key Parameters */}
          <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 space-y-2.5">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-[#AAA785]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FDFDF5]">
                Laboratory Testing Discipline
              </h4>
            </div>
            <p className="text-xs text-[#E1E1D5]">
              {standard.testing_lab_discipline || 'Recognized BIS Laboratory Testing Hub'}
            </p>

            {standard.key_test_parameters && standard.key_test_parameters.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold text-[#AAA785] block mb-1.5">
                  Mandatory STI Routine Test Parameters:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {standard.key_test_parameters.map((param, pIdx) => (
                    <span
                      key={pIdx}
                      className="rounded bg-[#2A3328] border border-[rgba(170,167,133,0.20)] px-2 py-0.5 text-xs text-[#E1E1D5]"
                    >
                      {param}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-[rgba(170,167,133,0.20)] bg-[#2A3328] px-4 sm:px-6 py-3 flex items-center justify-between gap-3 flex-wrap">
          <a
            href={standard.source_url || 'https://standards.bis.gov.in'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#AAA785] hover:underline"
          >
            <span>Official Portal Verification</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <div className="flex items-center gap-2">
            {onOpenLabs && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLabs(standard);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(170,167,133,0.22)] bg-[#232323] px-3 py-1.5 text-xs font-medium text-[#FDFDF5] hover:border-[rgba(170,167,133,0.35)] hover:text-[#AAA785] transition-colors cursor-pointer"
              >
                <FlaskConical className="h-3.5 w-3.5" />
                <span>Find Recognized Labs</span>
              </button>
            )}

            {onQueryAssistant && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onQueryAssistant(
                    `Explain compliance, test methods and licensing procedure for ${standard.is_number} (${standard.title})`
                  );
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#AAA785] px-3.5 py-1.5 text-xs font-bold text-[#232323] hover:bg-[#E1E1D5] transition-colors cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Ask AI Assistant</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
