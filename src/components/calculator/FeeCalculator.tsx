import { useState, useEffect } from 'react';
import { FeeInputForm, FeeInputState } from './FeeInputForm.tsx';
import { FeeBreakdown } from './FeeBreakdown.tsx';
import { FeeResult } from './FeeResult.tsx';
import { FeeSource } from './FeeSource.tsx';
import { FeeDisclaimer } from './FeeDisclaimer.tsx';
import { ContextualMiniBrain } from '../minibrain/ContextualMiniBrain.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import {
  ArrowLeft,
  Calculator,
  ExternalLink,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface FeeCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  onQueryAssistant: (prompt: string) => void;
  onOpenRoadmap?: () => void;
  onOpenCopilotTab?: (tab: string) => void;
  initialStandardId?: string;
}

export function FeeCalculator({
  isOpen,
  onClose,
  onQueryAssistant,
  onOpenRoadmap,
  onOpenCopilotTab,
  initialStandardId
}: FeeCalculatorProps) {
  const { t } = useLanguage();

  const [inputs, setInputs] = useState<FeeInputState>({
    standardId: initialStandardId || 'IS-17803',
    manufacturerType: 'MICRO_STARTUP',
    activity: 'NEW_SIMPLIFIED',
    auditDays: 1
  });

  useEffect(() => {
    if (initialStandardId) {
      setInputs((prev) => ({ ...prev, standardId: initialStandardId }));
    }
  }, [initialStandardId]);

  const handleReset = () => {
    setInputs({
      standardId: 'IS-17803',
      manufacturerType: 'MICRO_STARTUP',
      activity: 'NEW_SIMPLIFIED',
      auditDays: 1
    });
  };

  if (!isOpen) return null;

  return (
    <div
      id="fee-calculator-panel"
      aria-label="BIS Fee Calculator Workspace"
      className="fixed inset-0 z-50 flex flex-col h-screen w-screen bg-[#233A23] overflow-hidden animate-in fade-in duration-150"
    >
      {/* Top Workspace Header */}
      <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] bg-[#232323] px-4 sm:px-6 py-2.5 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] transition-colors cursor-pointer shadow-2xs shrink-0"
            title={t('copilot.backToChat', 'Back to chat')}
            aria-label={t('copilot.backToChat', 'Back to chat')}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-[#2A2E28]" />

          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-[#AAA785] hidden sm:inline" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-[#FDFDF5] leading-snug">
                  BIS Fee Calculator
                </h2>
                <span className="rounded bg-[#233A23] px-2 py-0.5 text-[10px] font-bold text-[#FDFDF5]">
                  DPIIT CONCESSIONS
                </span>
              </div>
              <p className="text-[11px] text-[#AAA785] font-normal leading-normal hidden sm:block">
                Transparent statutory BIS application, audit, marking fees, and MSME/Startup discounts
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-2.5 py-1.5 text-xs font-medium text-[#E1E1D5] hover:bg-[#2A2E28] transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <a
            href="https://www.bis.gov.in/product-certification/product-certification-fee/?lang=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-2.5 py-1.5 text-[11px] font-medium text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#E1E1D5] transition-colors"
          >
            <span>Gazette Schedule</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-5">
          {/* Statutory Disclaimer Notice */}
          <FeeDisclaimer />

          {/* User Input Configuration Form */}
          <FeeInputForm inputs={inputs} onChange={setInputs} onReset={handleReset} />

          {/* Itemized Calculation Breakdown Table */}
          <FeeBreakdown inputs={inputs} />

          {/* Actions & Next Steps */}
          <FeeResult
            inputs={inputs}
            onOpenRoadmap={onOpenRoadmap}
            onOpenLicensingGuidance={() => onOpenCopilotTab?.('checklist')}
          />

          {/* Statutory Source Information */}
          <FeeSource />
        </div>
      </div>

      {/* Lightweight Contextual Mini-Brain for BIS Fee Calculator */}
      <ContextualMiniBrain
        capability="FEE_CALCULATOR"
        context={{
          currentPage: 'BIS Fee Calculator',
          selectedStandard: inputs.standardId,
          feeState: inputs
        }}
      />
    </div>
  );
}
