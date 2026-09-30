import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  AlertCircle,
  Smartphone,
  ExternalLink,
  CheckCircle,
  HelpCircle,
  Info
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

export function HUIDVerification() {
  const { t } = useLanguage();
  const [huidCode, setHuidCode] = useState('');
  const [validationState, setValidationState] = useState<{
    tested: boolean;
    validFormat: boolean;
    message: string;
  } | null>(null);

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = huidCode.trim().toUpperCase();

    // HUID format: Exactly 6 alphanumeric characters (no special characters)
    const isValidFormat = /^[A-Z0-9]{6}$/.test(clean);

    if (!clean) {
      setValidationState(null);
      return;
    }

    if (!isValidFormat) {
      setValidationState({
        tested: true,
        validFormat: false,
        message: 'Invalid HUID format. An authentic BIS Hallmark Unique Identification code consists of exactly 6 alphanumeric characters (e.g. "AB12CD" or "7K9Y2M").'
      });
    } else {
      setValidationState({
        tested: true,
        validFormat: true,
        message: `Format valid: "${clean}" is a valid 6-character HUID alphanumeric structure.`
      });
    }
  };

  return (
    <div id="verify-huid" className="rounded-2xl border border-[rgba(210,230,190,0.10)] bg-[#1A2016] p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-[#F5C451]" />
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#F1F4EA]">
            HUID Format Check & Consumer Verification Guide
          </h3>
          <p className="text-xs text-[#C0C7B7]">
            Hallmark Unique Identification (HUID) is laser-etched onto gold jewellery for public traceability
          </p>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleValidate} className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-[#C0C7B7] mb-1.5">
            Enter 6-Digit Alphanumeric HUID Code:
          </label>
          <div className="flex items-center gap-2 max-w-md">
            <input
              type="text"
              maxLength={6}
              value={huidCode}
              onChange={(e) => {
                setHuidCode(e.target.value.toUpperCase());
                setValidationState(null);
              }}
              placeholder="e.g. AB12CD or 9F3B8Q"
              className="w-full rounded-xl border border-[rgba(210,230,190,0.12)] bg-[#10150F] py-2.5 px-3.5 text-sm font-mono uppercase tracking-widest text-[#F1F4EA] placeholder-[#858D7D] focus:border-[#F5C451]/60 focus:bg-[#141A11] outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#F5C451] px-4 py-2.5 text-xs font-bold text-[#10150F] hover:bg-[#FADB6A] transition-colors cursor-pointer shadow-2xs shrink-0"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Check Format</span>
            </button>
          </div>
        </div>

        {/* Validation Result Box */}
        {validationState && (
          <div
            className={`rounded-xl p-3.5 text-xs border ${
              validationState.validFormat
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                : 'bg-red-500/10 border-red-500/30 text-red-200'
            }`}
          >
            <div className="flex items-start gap-2">
              {validationState.validFormat ? (
                <CheckCircle className="h-4 w-4 text-[#B8F23D] shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <span className="font-bold block text-xs">
                  {validationState.validFormat ? 'Valid HUID Syntax Structure' : 'Format Discrepancy'}
                </span>
                <p className="text-[11px] leading-relaxed">
                  {validationState.message}
                </p>
                {validationState.validFormat && (
                  <p className="text-[11px] text-[#C0C7B7] pt-1">
                    <strong className="text-[#F1F4EA]">Official Next Step:</strong> To inspect the live confidential government registry for this specific piece (jeweller identity, article type, purity karat, date, and AHC registration), enter this code in the official <strong className="text-[#F5C451]">BIS Care Mobile App</strong> or visit <strong className="text-[#F5C451]">services.bis.gov.in</strong>.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Verification Instructions Card */}
      <div className="rounded-xl border border-[rgba(210,230,190,0.08)] bg-[#22291C] p-4 space-y-3">
        <h4 className="text-xs font-bold text-[#F1F4EA] uppercase tracking-wider flex items-center gap-1.5">
          <Smartphone className="h-4 w-4 text-[#B8F23D]" />
          <span>How to Verify Live Details via BIS Care App</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#C0C7B7]">
          <div className="space-y-1 bg-[#1A2016] p-3 rounded-lg border border-[rgba(210,230,190,0.06)]">
            <span className="font-semibold text-[#F1F4EA] block mb-1">What the BIS Care App Reveals:</span>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-[#C0C7B7]">
              <li>Jeweller BIS Registration Number & Registered Brand</li>
              <li>Assaying & Hallmarking Centre (AHC) Name & City</li>
              <li>Jewellery Article Type (Bangle, Ring, Chain, Earring)</li>
              <li>Purity Fineness Grade (e.g. 22K916)</li>
              <li>Official Timestamp of Laser Inscription</li>
            </ul>
          </div>

          <div className="space-y-1 bg-[#1A2016] p-3 rounded-lg border border-[rgba(210,230,190,0.06)]">
            <span className="font-semibold text-[#F1F4EA] block mb-1">Steps to Verify Before Paying:</span>
            <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-[#C0C7B7]">
              <li>Download the official "BIS Care" app from Play Store or App Store.</li>
              <li>Tap "Verify HUID" on the home dashboard.</li>
              <li>Type the 6 characters laser-marked on your jewellery piece.</li>
              <li>Check that the article type & purity match what the jeweller claims.</li>
            </ol>
          </div>
        </div>

        <div className="pt-2 border-t border-[rgba(210,230,190,0.08)] flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[11px] text-[#858D7D]">
            Official government verification service by Department of Consumer Affairs & BIS
          </span>
          <a
            href="https://services.bis.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#B8F23D] hover:underline"
          >
            <span>Open services.bis.gov.in</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
