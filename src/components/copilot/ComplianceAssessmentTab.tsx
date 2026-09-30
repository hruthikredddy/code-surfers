import { useState } from 'react';
import { ShieldCheck, AlertCircle, Clock, CheckCircle2, Sparkles, ArrowRight, Layers, Search } from 'lucide-react';
import { PRODUCT_COMPLIANCE_ASSESSMENTS, ProductAssessmentCategory } from '../../data/complianceCopilotData.ts';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface ComplianceAssessmentTabProps {
  onQueryAssistant: (prompt: string) => void;
}

export function ComplianceAssessmentTab({ onQueryAssistant }: ComplianceAssessmentTabProps) {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>(PRODUCT_COMPLIANCE_ASSESSMENTS[0]?.id || '');
  const [customSearch, setCustomSearch] = useState('');

  const activeAssessment: ProductAssessmentCategory | undefined =
    PRODUCT_COMPLIANCE_ASSESSMENTS.find((item) => item.id === selectedId) || PRODUCT_COMPLIANCE_ASSESSMENTS[0];

  const handleCustomQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSearch.trim()) return;
    onQueryAssistant(
      `Conduct a BIS product compliance assessment for: "${customSearch.trim()}". What Indian Standard, scheme, mandatory QCO status, and factory testing apparatus are strictly required?`
    );
  };

  return (
    <div className="space-y-4">
      {/* Search & Custom Assessment Form */}
      <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-3.5 shadow-2xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E1E1D5] mb-1">
          {t('copilot.assessment.title', 'Product Compliance Assessment')}
        </h4>
        <p className="text-[11px] text-[#AAA785] mb-2.5">
          {t('copilot.assessment.subtitle', 'Select a benchmark product category or enter any custom product to evaluate mandatory QCO status, required Indian Standard, and scheme eligibility.')}
        </p>

        <form onSubmit={handleCustomQuery} className="flex items-center gap-1.5">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#AAA785]" />
            <input
              type="text"
              value={customSearch}
              onChange={(e) => setCustomSearch(e.target.value)}
              placeholder={t('copilot.assessment.placeholder', 'Or enter custom product (e.g., solar panels, toys, cement)...')}
              className="w-full rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A2E28] py-1.5 pl-8 pr-3 text-xs text-[#FDFDF5] placeholder-[#AAA785] focus:border-[rgba(170,167,133,0.40)] focus:bg-[#232323] focus:outline-hidden"
            />
          </div>
          <button
            type="submit"
            disabled={!customSearch.trim()}
            className="inline-flex items-center gap-1 rounded-lg bg-[#2A2E28] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#E1E1D5] hover:text-[#232323] transition-colors disabled:opacity-40 cursor-pointer shrink-0"
          >
            <span>{t('copilot.assessment.assessBtn', 'Assess')}</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </form>
      </div>

      {/* Category Selector Pills */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] block mb-1.5 px-0.5">
          {t('copilot.assessment.standardCategories', 'Standard Indian Product Categories:')}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PRODUCT_COMPLIANCE_ASSESSMENTS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer text-left ${
                selectedId === item.id
                  ? 'bg-[#233A23] text-[#FDFDF5] shadow-xs'
                  : 'bg-[#232323] text-[#E1E1D5] border border-[rgba(170,167,133,0.20)] hover:bg-[#2A2E28] hover:border-[rgba(170,167,133,0.30)]'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Assessment Profile Card */}
      {activeAssessment && (
        <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 shadow-2xs space-y-3.5">
          {/* Top Title & Badges */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
              <span className="font-mono text-xs font-bold text-[#AAA785] bg-[#2A2E28] px-2 py-0.5 rounded border border-blue-100">
                {activeAssessment.isNumber}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  activeAssessment.mandatoryStatus.includes('MANDATORY')
                    ? 'bg-rose-50 text-rose-800 border border-rose-200'
                    : 'bg-[#2A2E28] text-[#E1E1D5] border border-[rgba(170,167,133,0.25)]'
                }`}
              >
                {activeAssessment.mandatoryStatus}
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#FDFDF5] leading-snug">
              {activeAssessment.name}
            </h3>
            <p className="text-[11px] text-[#AAA785] mt-0.5">
              {activeAssessment.standardTitle}
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-[#2A2E28] p-2.5 border border-[rgba(170,167,133,0.15)]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#AAA785] block mb-0.5">
                Conformity Scheme
              </span>
              <span className="font-semibold text-[#FDFDF5] flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[#AAA785]" />
                {activeAssessment.scheme}
              </span>
            </div>
            <div className="rounded-lg bg-[#2A2E28] p-2.5 border border-[rgba(170,167,133,0.15)]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#AAA785] block mb-0.5">
                Estimated Timeline
              </span>
              <span className="font-semibold text-[#FDFDF5] flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-[#E1E1D5]" />
                {activeAssessment.estimatedTimeline}
              </span>
            </div>
          </div>

          {/* QCO Regulatory Scope */}
          <div className="rounded-lg border border-[rgba(170,167,133,0.25)]/80 bg-[#2A2E28] p-2.5 text-xs text-[#FDFDF5]">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 text-[#AAA785] shrink-0" />
              <div>
                <span className="font-semibold block text-[11px]">Regulatory Order (QCO) Notice:</span>
                <p className="text-[11px] text-[#E1E1D5] leading-relaxed mt-0.5">
                  {activeAssessment.qcoDetails}
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Route */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] block mb-1">
              Optimal Licensing Pathway:
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FDFDF5] bg-[#2A2E28]/70 p-2 rounded-lg border border-[rgba(170,167,133,0.20)]/60">
              <Layers className="h-3.5 w-3.5 text-[#E1E1D5]" />
              <span>{activeAssessment.recommendedRoute}</span>
            </div>
          </div>

          {/* Mandatory In-House Lab Equipment */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] block mb-1.5">
              Mandatory In-House Testing Apparatus (SIT):
            </span>
            <ul className="space-y-1 text-xs text-[#E1E1D5] bg-[#2A2E28] p-2.5 rounded-lg border border-[rgba(170,167,133,0.15)]">
              {activeAssessment.inHouseTestingNeeds.map((need, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                  <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-[#AAA785] shrink-0" />
                  <span>{need}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Clauses and Risks */}
          <div className="text-xs text-[#E1E1D5]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAA785] block mb-0.5">
              Auditor Focus Areas & Essential Clauses:
            </span>
            <p className="text-[11px] leading-relaxed bg-[#2A2E28] p-2 rounded border border-[rgba(170,167,133,0.15)] text-[#E1E1D5]">
              {activeAssessment.keyRisksAndClauses}
            </p>
          </div>

          {/* Prompt Assistant Button */}
          <div className="pt-2 border-t border-[rgba(170,167,133,0.15)]">
            <button
              type="button"
              onClick={() => onQueryAssistant(activeAssessment.samplePrompt)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2A2E28] px-3 py-2 text-xs font-medium text-white hover:bg-[#E1E1D5] hover:text-[#232323] transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Ask BIS Sahayak about this Product</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
