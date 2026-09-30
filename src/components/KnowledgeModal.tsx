import { useState } from 'react';
import { X, Search, ShieldCheck, ExternalLink, Layers, Award, FileText, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { INDIAN_STANDARDS } from '../data/standards.ts';
import { BIS_SCHEMES } from '../data/schemes.ts';
import { HALLMARKING_DATA } from '../data/hallmarking.ts';
import { StandardEntry, SchemeInfo } from '../types/index.ts';
import { useLanguage } from '../i18n/LanguageContext.tsx';

interface KnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStandardPrompt: (promptText: string) => void;
}

export function KnowledgeModal({ isOpen, onClose, onSelectStandardPrompt }: KnowledgeModalProps) {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<'STANDARDS' | 'SCHEMES' | 'HALLMARKING' | 'PORTALS'>('STANDARDS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  if (!isOpen) return null;

  const categories = ['ALL', ...Array.from(new Set(INDIAN_STANDARDS.map((s) => s.category)))];

  const filteredStandards = INDIAN_STANDARDS.filter((s) => {
    const matchesCategory = selectedCategory === 'ALL' || s.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      s.is_number.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.ics_code.toLowerCase().includes(q) ||
      s.keywords.some((k) => k.toLowerCase().includes(q)) ||
      s.common_products.some((p) => p.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#232323] overflow-hidden animate-in fade-in duration-150" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex h-full w-full flex-col bg-[#232323] overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] bg-[#2A2E28] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              id="back-from-catalog-button"
              className="flex items-center gap-1.5 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-2.5 py-1.5 text-xs font-semibold text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] transition-colors cursor-pointer shadow-2xs"
              title={t('common.back', 'Back to Chat')}
              aria-label={t('common.back', 'Back to Chat')}
            >
              <ArrowLeft className="h-4 w-4 text-[#E1E1D5]" />
              <span className="hidden sm:inline">{t('common.back', 'Back to Chat')}</span>
              <span className="sm:hidden">{t('common.back', 'Back')}</span>
            </button>

            <div className="h-4 w-px bg-[#2A2E28] hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-[#233A23] text-[#FDFDF5] font-serif font-bold text-xs">
                BIS
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#FDFDF5] leading-snug">
                  {t('catalog.title', 'BIS Reference Knowledge Catalog')}
                </h2>
                <p className="text-xs text-[#AAA785] leading-normal">
                  {t('catalog.subtitle', 'Authoritative reference datasets preloaded into BIS Sahayak')}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#AAA785] hover:bg-[#2A2E28] hover:text-[#FDFDF5] transition-colors cursor-pointer"
            aria-label={t('common.close', 'Close catalog')}
            title={t('common.close', 'Close catalog')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[rgba(170,167,133,0.20)] bg-[#2A2E28] px-4 sm:px-6 text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('STANDARDS')}
            className={`flex items-center gap-1.5 border-b-2 min-h-[36px] py-2 px-3 transition-colors cursor-pointer whitespace-nowrap leading-normal ${
              activeTab === 'STANDARDS'
                ? 'border-[#AAA785] text-[#FDFDF5] font-semibold'
                : 'border-transparent text-[#AAA785] hover:text-[#FDFDF5]'
            }`}
          >
            <FileText className="h-3.5 w-3.5 shrink-0" />
            <span>{t('sidebar.standardsLibrary', 'Indian Standards')} ({INDIAN_STANDARDS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('SCHEMES')}
            className={`flex items-center gap-1.5 border-b-2 min-h-[36px] py-2 px-3 transition-colors cursor-pointer whitespace-nowrap leading-normal ${
              activeTab === 'SCHEMES'
                ? 'border-[#AAA785] text-[#FDFDF5] font-semibold'
                : 'border-transparent text-[#AAA785] hover:text-[#FDFDF5]'
            }`}
          >
            <Layers className="h-3.5 w-3.5 shrink-0" />
            <span>{t('sidebar.schemesQcos', 'Certification Schemes')} ({BIS_SCHEMES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('HALLMARKING')}
            className={`flex items-center gap-1.5 border-b-2 min-h-[36px] py-2 px-3 transition-colors cursor-pointer whitespace-nowrap leading-normal ${
              activeTab === 'HALLMARKING'
                ? 'border-[#AAA785] text-[#FDFDF5] font-semibold'
                : 'border-transparent text-[#AAA785] hover:text-[#FDFDF5]'
            }`}
          >
            <Award className="h-3.5 w-3.5 shrink-0" />
            <span>{t('sidebar.hallmarking', 'Hallmarking & HUID')}</span>
          </button>

          <button
            onClick={() => setActiveTab('PORTALS')}
            className={`flex items-center gap-1.5 border-b-2 min-h-[36px] py-2 px-3 transition-colors cursor-pointer whitespace-nowrap leading-normal ${
              activeTab === 'PORTALS'
                ? 'border-[#AAA785] text-[#FDFDF5] font-semibold'
                : 'border-transparent text-[#AAA785] hover:text-[#FDFDF5]'
            }`}
          >
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            <span>{t('message.portalsTitle', 'Official Portals')}</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* TAB 1: INDIAN STANDARDS */}
          {activeTab === 'STANDARDS' && (
            <div className="space-y-4">
              {/* Search & Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#AAA785]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('catalog.searchPlaceholder', 'Search by IS number (e.g. IS 302), product, or keyword...')}
                    className="w-full rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] py-2 pl-9 pr-3 text-xs text-[#FDFDF5] placeholder-[#AAA785] focus:border-[rgba(170,167,133,0.40)] focus:outline-hidden"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] py-2 px-3 text-xs text-[#E1E1D5] focus:border-[rgba(170,167,133,0.40)] focus:outline-hidden"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'ALL' ? t('catalog.allCategories', 'All Product Categories') : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Count note */}
              <div className="text-xs text-[#AAA785] font-medium">
                {filteredStandards.length} / {INDIAN_STANDARDS.length} {t('catalog.totalStandards', 'verified standards')}
              </div>

              {/* Standards Cards */}
              <div className="grid grid-cols-1 gap-3">
                {filteredStandards.map((std) => (
                  <div
                    key={std.id}
                    className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A2E28]/60 p-4 transition-colors hover:border-[rgba(170,167,133,0.30)] hover:bg-[#2A2E28]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#FDFDF5] text-sm font-mono">
                            {std.is_number}
                          </span>
                          <span className="rounded bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-800 border border-sky-200/60">
                            {std.scheme}
                          </span>
                          <span
                            className={`rounded px-2 py-0.5 text-[11px] font-medium border ${
                              std.mandatory
                                ? 'bg-[#2A2E28] text-[#E1E1D5] border-[rgba(170,167,133,0.25)]'
                                : 'bg-[#2A2E28] text-[#E1E1D5] border-[rgba(170,167,133,0.20)]'
                            }`}
                          >
                            {std.mandatory ? t('citation.mandatoryQco', 'Mandatory under QCO') : t('citation.voluntary', 'Voluntary')}
                          </span>
                        </div>
                        <h3 className="mt-1 text-xs font-semibold text-[#FDFDF5]">
                          {std.title}
                        </h3>
                      </div>

                      <button
                        onClick={() => {
                          onSelectStandardPrompt(`What are the key compliance requirements and clauses for ${std.is_number}?`);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 rounded bg-[#232323] px-2.5 py-1 text-xs font-medium text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] border border-[rgba(170,167,133,0.20)] transition-colors cursor-pointer shrink-0"
                      >
                        <span>{t('catalog.viewDetails', 'Query Sahayak')}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#E1E1D5] pt-2 border-t border-[rgba(170,167,133,0.20)]/60">
                      <div>
                        <span className="font-medium text-[#E1E1D5]">ICS Code:</span>{' '}
                        <span className="font-mono">{std.ics_code}</span> ({std.ics_chapter})
                      </div>
                      <div>
                        <span className="font-medium text-[#E1E1D5]">Testing Lab Discipline:</span>{' '}
                        {std.testing_lab_discipline}
                      </div>
                      <div className="sm:col-span-2">
                        <span className="font-medium text-[#E1E1D5]">Quality Control Order:</span>{' '}
                        {std.qco_reference}
                      </div>
                      <div className="sm:col-span-2">
                        <span className="font-medium text-[#E1E1D5]">Scope:</span>{' '}
                        {std.scope_summary}
                      </div>
                    </div>

                    {/* Key Clauses */}
                    <div className="mt-2.5 pt-2 border-t border-[rgba(170,167,133,0.20)]/60">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#AAA785] block mb-1">
                        Key Tested Clauses:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#E1E1D5]">
                        {std.key_clauses.slice(0, 4).map((c, idx) => (
                          <div key={idx} className="rounded bg-[#232323] p-1.5 border border-[rgba(170,167,133,0.20)]/70">
                            <span className="font-semibold text-[#FDFDF5]">{c.clause}:</span>{' '}
                            <span>{c.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CERTIFICATION SCHEMES */}
          {activeTab === 'SCHEMES' && (
            <div className="space-y-4">
              <p className="text-xs text-[#E1E1D5] leading-relaxed">
                The Bureau of Indian Standards operates multiple conformity assessment schemes under Schedule II of the BIS (Conformity Assessment) Regulations, 2018.
              </p>

              <div className="space-y-4">
                {BIS_SCHEMES.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A2E28]/70 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[#232323] px-2 py-0.5 text-xs font-bold text-white font-mono">
                          {scheme.code}
                        </span>
                        <h3 className="text-sm font-bold text-[#FDFDF5]">
                          {scheme.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          onSelectStandardPrompt(`What is the complete step-by-step licensing process for ${scheme.name}?`);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 rounded bg-[#232323] px-2.5 py-1 text-xs font-medium text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] border border-[rgba(170,167,133,0.20)] transition-colors cursor-pointer"
                      >
                        <span>{t('copilot.tabLicensing', 'Explain Process Flow')}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                    <p className="mt-2 text-xs text-[#E1E1D5] leading-relaxed">
                      {scheme.short_description}
                    </p>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#E1E1D5] bg-[#232323] p-3 rounded-lg border border-[rgba(170,167,133,0.20)]/80">
                      <div>
                        <span className="font-semibold text-[#FDFDF5]">Applicable To:</span>
                        <p className="mt-0.5">{scheme.applicable_to}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-[#FDFDF5]">Portal / System:</span>
                        <p className="mt-0.5">
                          <a
                            href={scheme.portal_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-700 underline font-medium"
                          >
                            {scheme.portal_name}
                          </a>
                        </p>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="font-semibold text-[#FDFDF5]">Key Distinctions:</span>
                        <p className="mt-0.5">{scheme.key_differences}</p>
                      </div>
                    </div>

                    {/* Step-by-step preview */}
                    <div className="mt-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#AAA785] block mb-1.5">
                        Sequential Process Steps:
                      </span>
                      <div className="space-y-1.5">
                        {scheme.process_steps.map((step) => (
                          <div
                            key={step.step_number}
                            className="flex items-start gap-2 text-xs text-[#E1E1D5] rounded bg-[#232323] px-2.5 py-1.5 border border-[rgba(170,167,133,0.20)]/60"
                          >
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2A2E28] text-[10px] font-bold text-[#FDFDF5] mt-0.5">
                              {step.step_number}
                            </span>
                            <div>
                              <span className="font-semibold text-[#FDFDF5]">{step.title}</span>{' '}
                              <span className="text-[#AAA785] font-mono text-[11px]">({step.estimated_timeline})</span>: {step.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HALLMARKING & HUID */}
          {activeTab === 'HALLMARKING' && (
            <div className="space-y-4">
              <p className="text-xs text-[#E1E1D5] leading-relaxed">
                Hallmarking provides third-party assurance of the marked purity of gold and silver jewellery, protecting consumers and fostering trust in precious metal transactions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HALLMARKING_DATA.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#2A2E28]/70 p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded bg-[#2A2E28] px-2 py-0.5 text-[10px] font-bold text-[#FDFDF5] uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="mt-2 text-sm font-bold text-[#FDFDF5]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-[#E1E1D5] leading-relaxed">
                        {item.summary}
                      </p>

                      <ul className="mt-2.5 space-y-1 text-xs text-[#E1E1D5]">
                        {item.details.slice(0, 3).map((d, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#AAA785] mt-0.5">•</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => {
                        onSelectStandardPrompt(`Explain ${item.title} and consumer verification steps in detail.`);
                        onClose();
                      }}
                      className="mt-3 inline-flex items-center justify-center gap-1 rounded bg-[#232323] px-2.5 py-1.5 text-xs font-medium text-[#E1E1D5] hover:bg-[#2A2E28] border border-[rgba(170,167,133,0.20)] transition-colors cursor-pointer w-full"
                    >
                      <span>{t('catalog.viewDetails', 'Ask Sahayak About This')}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: OFFICIAL PORTALS */}
          {activeTab === 'PORTALS' && (
            <div className="space-y-3">
              <p className="text-xs text-[#E1E1D5] leading-relaxed">
                Authentic Government of India Bureau of Indian Standards digital services:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://www.bis.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 hover:border-[rgba(170,167,133,0.30)] hover:bg-[#2A2E28] transition-colors block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#FDFDF5] text-sm">bis.gov.in</span>
                    <ExternalLink className="h-4 w-4 text-[#AAA785] group-hover:text-[#E1E1D5]" />
                  </div>
                  <p className="mt-1 text-xs text-[#E1E1D5] leading-snug">
                    Official Central Portal of the Bureau of Indian Standards. Quality Control Orders, policies, gazette orders.
                  </p>
                </a>

                <a
                  href="https://standards.bis.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 hover:border-[rgba(170,167,133,0.30)] hover:bg-[#2A2E28] transition-colors block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#FDFDF5] text-sm">standards.bis.gov.in</span>
                    <ExternalLink className="h-4 w-4 text-[#AAA785] group-hover:text-[#E1E1D5]" />
                  </div>
                  <p className="mt-1 text-xs text-[#E1E1D5] leading-snug">
                    BIS Standards Search Engine. Access full texts, revisions, and gazettes for over 20,000+ Indian Standards.
                  </p>
                </a>

                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 hover:border-[rgba(170,167,133,0.30)] hover:bg-[#2A2E28] transition-colors block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#FDFDF5] text-sm">manakonline.in</span>
                    <ExternalLink className="h-4 w-4 text-[#AAA785] group-hover:text-[#E1E1D5]" />
                  </div>
                  <p className="mt-1 text-xs text-[#E1E1D5] leading-snug">
                    e-BIS Manakonline gateway. Submit applications for Scheme-I (ISI mark), audit scheduling, and license renewals.
                  </p>
                </a>

                <a
                  href="https://lims.bis.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 hover:border-[rgba(170,167,133,0.30)] hover:bg-[#2A2E28] transition-colors block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#FDFDF5] text-sm">lims.bis.gov.in</span>
                    <ExternalLink className="h-4 w-4 text-[#AAA785] group-hover:text-[#E1E1D5]" />
                  </div>
                  <p className="mt-1 text-xs text-[#E1E1D5] leading-snug">
                    Laboratory Information Management System (LIMS). Search BIS-recognized testing laboratories by standard or discipline.
                  </p>
                </a>

                <a
                  href="https://www.crsbis.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 hover:border-[rgba(170,167,133,0.30)] hover:bg-[#2A2E28] transition-colors block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#FDFDF5] text-sm">crsbis.in</span>
                    <ExternalLink className="h-4 w-4 text-[#AAA785] group-hover:text-[#E1E1D5]" />
                  </div>
                  <p className="mt-1 text-xs text-[#E1E1D5] leading-snug">
                    Dedicated Compulsory Registration Scheme portal for IT and Electronic goods. R-number verification and applications.
                  </p>
                </a>

                <a
                  href="https://services.bis.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 hover:border-[rgba(170,167,133,0.30)] hover:bg-[#2A2E28] transition-colors block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#FDFDF5] text-sm">services.bis.gov.in</span>
                    <ExternalLink className="h-4 w-4 text-[#AAA785] group-hover:text-[#E1E1D5]" />
                  </div>
                  <p className="mt-1 text-xs text-[#E1E1D5] leading-snug">
                    Public verification services for CM/L licences, HUID hallmarking, and consumer grievance submission.
                  </p>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
