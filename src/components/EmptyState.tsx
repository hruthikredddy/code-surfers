import React from 'react';
import { Sparkles, Search, Compass, FlaskConical, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.tsx';

interface EmptyStateProps {
  onSelectPrompt: (promptText: string) => void;
  onOpenDirectory?: () => void;
  onOpenCopilot?: () => void;
  onOpenTesting?: () => void;
}

export function EmptyState({
  onSelectPrompt,
  onOpenDirectory,
  onOpenCopilot,
  onOpenTesting
}: EmptyStateProps) {
  const { t } = useLanguage();

  const primarySuggestions = [
    {
      id: 'led-bulbs',
      label: 'Find the BIS standard for LED bulbs',
      prompt: 'Find the BIS standard for LED bulbs and check if there is a mandatory Quality Control Order (QCO).'
    },
    {
      id: 'certification',
      label: 'Which BIS certification applies to my product?',
      prompt: 'Which BIS certification scheme applies to my product (ISI Mark Scheme-I, Compulsory Registration Scheme CRS, or FMCS)?'
    },
    {
      id: 'testing-reqs',
      label: 'What testing is required?',
      prompt: 'What testing is required for my product to obtain a BIS license and what are the Scheme of Testing and Inspection (STI) requirements?'
    },
    {
      id: 'find-lab',
      label: 'Find a laboratory for my product',
      prompt: 'Find a BIS recognized or empanelled laboratory for testing my product and verifying compliance.'
    }
  ];

  const secondarySuggestions = [
    {
      id: 'water-bottles',
      prompt: 'What are the mandatory clauses and migration tests for stainless steel water bottles under IS 17803?'
    },
    {
      id: 'huid-gold',
      prompt: 'Explain the 6-digit HUID hallmarking rules for 22K (916) and 18K (750) gold jewellery.'
    },
    {
      id: 'isi-verify',
      prompt: 'How do I verify if an ISI mark or CM/L license number on a product is genuine using the BIS portal?'
    }
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-3 sm:pt-5 pb-10 sm:pb-12 flex flex-col items-center justify-center text-center">
      {/* BIS Sahayak Logo / Emblem */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#171C13] border border-[#B8F23D]/30 shadow-[0_0_24px_rgba(184,242,61,0.12)] mb-5 transition-transform hover:scale-105 duration-200">
        <span className="font-serif font-black text-2xl text-[#B8F23D] tracking-wider select-none">
          BIS
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F1F4EA] tracking-tight">
        BIS Sahayak
      </h1>
      <p className="mt-2 text-base sm:text-lg font-medium text-[#C0C7B7]">
        How can I help you today?
      </p>
      <p className="mt-1 text-xs sm:text-sm text-[#858D7D] max-w-lg leading-relaxed">
        Ask about Indian Standards, certification schemes, testing protocols, recognized laboratories, or hallmarking.
      </p>

      {/* Quick Action Feature Shortcuts */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full">
        {onOpenDirectory && (
          <button
            type="button"
            onClick={onOpenDirectory}
            className="flex flex-col items-start p-4 rounded-xl border border-[rgba(210,230,190,0.10)] bg-[#1A2016] hover:bg-[#232B1E] hover:border-[rgba(184,242,61,0.30)] transition-all cursor-pointer group text-left shadow-2xs"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#292F22] border border-[rgba(210,230,190,0.12)] text-[#B8F23D] mb-3 group-hover:scale-105 transition-transform shrink-0">
              <Search className="h-4.5 w-4.5" />
            </div>
            <div className="text-xs font-bold text-[#F1F4EA] group-hover:text-[#B8F23D] transition-colors leading-tight">
              Smart Standard Finder
            </div>
            <div className="text-[11px] text-[#858D7D] mt-1.5 leading-snug line-clamp-2">
              Explore 21,000+ Indian Standards, scopes & QCOs
            </div>
          </button>
        )}

        {onOpenCopilot && (
          <button
            type="button"
            onClick={onOpenCopilot}
            className="flex flex-col items-start p-4 rounded-xl border border-[rgba(210,230,190,0.10)] bg-[#1A2016] hover:bg-[#232B1E] hover:border-[rgba(184,242,61,0.30)] transition-all cursor-pointer group text-left shadow-2xs"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#292F22] border border-[rgba(210,230,190,0.12)] text-[#B8F23D] mb-3 group-hover:scale-105 transition-transform shrink-0">
              <Compass className="h-4.5 w-4.5" />
            </div>
            <div className="text-xs font-bold text-[#F1F4EA] group-hover:text-[#B8F23D] transition-colors leading-tight">
              Compliance Copilot
            </div>
            <div className="text-[11px] text-[#858D7D] mt-1.5 leading-snug line-clamp-2">
              Licensing roadmap, schemes & documentation checklist
            </div>
          </button>
        )}

        {onOpenTesting && (
          <button
            type="button"
            onClick={onOpenTesting}
            className="flex flex-col items-start p-4 rounded-xl border border-[rgba(210,230,190,0.10)] bg-[#1A2016] hover:bg-[#232B1E] hover:border-[rgba(184,242,61,0.30)] transition-all cursor-pointer group text-left shadow-2xs"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#292F22] border border-[rgba(210,230,190,0.12)] text-[#B8F23D] mb-3 group-hover:scale-105 transition-transform shrink-0">
              <FlaskConical className="h-4.5 w-4.5" />
            </div>
            <div className="text-xs font-bold text-[#F1F4EA] group-hover:text-[#B8F23D] transition-colors leading-tight">
              Testing Intelligence
            </div>
            <div className="text-[11px] text-[#858D7D] mt-1.5 leading-snug line-clamp-2">
              Mandatory clauses, test reports & recognized labs
            </div>
          </button>
        )}
      </div>

      {/* Suggested Questions Section */}
      <div className="mt-8 w-full space-y-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#858D7D] text-left px-1">
          Common Inquiries
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {primarySuggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectPrompt(item.prompt)}
              className="group flex items-center justify-between rounded-xl border border-[rgba(210,230,190,0.10)] bg-[#20271B] hover:bg-[#292F22] hover:border-[rgba(184,242,61,0.30)] p-3.5 text-left transition-all cursor-pointer shadow-2xs"
            >
              <span className="text-xs font-semibold text-[#F1F4EA] group-hover:text-[#B8F23D] transition-colors leading-snug">
                {item.label}
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#858D7D] group-hover:text-[#B8F23D] group-hover:translate-x-0.5 transition-all ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Specific Prompt Pills */}
      <div className="mt-4 w-full text-left">
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {secondarySuggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectPrompt(item.prompt)}
              className="rounded-full border border-[rgba(210,230,190,0.08)] bg-[#171C13] hover:bg-[#20271B] px-3.5 py-1.5 text-xs text-[#858D7D] hover:text-[#F1F4EA] hover:border-[rgba(184,242,61,0.20)] transition-colors cursor-pointer text-left line-clamp-1"
            >
              "{item.prompt}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
