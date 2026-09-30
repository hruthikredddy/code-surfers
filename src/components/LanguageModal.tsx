import React, { useState, useMemo } from 'react';
import { Search, Globe, Check, Sparkles, X, Languages, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import { SUPPORTED_LANGUAGES } from '../i18n/languages.ts';
import { SupportedLanguageCode } from '../i18n/types.ts';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
  const { currentLanguage, selectionMode, setLanguage, resetToAutoDetect, t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return SUPPORTED_LANGUAGES;
    return SUPPORTED_LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(q) ||
        lang.nativeName.toLowerCase().includes(q) ||
        lang.code.toLowerCase().includes(q) ||
        lang.script.toLowerCase().includes(q) ||
        lang.region.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#232323]/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-[#232323] border border-white/[0.08] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 bg-[#232323]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#232323] text-[#AAA785] border border-[#AAA785]/30 shadow-xs">
              <Languages className="h-5 w-5" />
            </div>
            <div>
              <h2 id="language-modal-title" className="text-base font-bold text-[#FDFDF5] leading-snug">
                {t('language.selectTitle', 'Select Interaction Language')}
              </h2>
              <p className="text-xs text-[#E1E1D5] mt-0.5 leading-normal">
                {t(
                  'language.selectSubtitle',
                  'English + all 22 constitutionally recognized languages of India with full native script support.'
                )}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close', 'Close')}
            className="rounded-lg p-1.5 text-[#E1E1D5] hover:text-[#FDFDF5] hover:bg-[#232323] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search & Auto-detect bar */}
        <div className="p-4 border-b border-white/[0.08] bg-[#232323] space-y-3">
          {/* Search input */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#AAA785]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('language.searchPlaceholder', 'Search language by name or native script (e.g. Telugu, हिन्दी, اردو)...')}
              className="w-full rounded-xl border border-white/[0.08] bg-[#232323] pl-9 pr-4 py-2 text-sm text-[#FDFDF5] placeholder-[#6F7771] focus:border-[rgba(170,167,133,0.35)] focus:outline-hidden transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#E1E1D5] hover:text-[#FDFDF5] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Auto-detect button */}
          <button
            type="button"
            onClick={() => {
              resetToAutoDetect();
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
              selectionMode === 'auto'
                ? 'border-[#AAA785]/40 bg-[#AAA785]/10 text-[#AAA785] shadow-xs'
                : 'border-white/[0.08] bg-[#232323] text-[#E1E1D5] hover:text-[#FDFDF5] hover:border-[rgba(170,167,133,0.35)]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-[#AAA785] shrink-0" />
              <div className="text-left rtl:text-right">
                <span className="font-semibold text-[#FDFDF5]">{t('language.autoDetect', 'Auto-Detect (Browser / Device)')}</span>
                <span className="block text-[11px] text-[#E1E1D5] font-normal">
                  {t('language.autoDetectActive', 'Currently Auto-Detected:')} {SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.name} ({SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.nativeName})
                </span>
              </div>
            </div>
            {selectionMode === 'auto' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#AAA785] bg-[#AAA785]/20 border border-[#AAA785]/40 px-2 py-0.5 rounded-md">
                <Check className="h-3 w-3" />
                {t('language.activeBadge', 'Active')}
              </span>
            )}
          </button>
        </div>

        {/* Language Grid */}
        <div className="p-4 overflow-y-auto flex-1 divide-y divide-white/[0.05]">
          <div className="mb-2 px-1 text-xs font-semibold text-[#AAA785] leading-normal">
            {t('language.allLanguages', 'Constitutional Languages of India')} ({filteredLanguages.length})
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {filteredLanguages.map((lang) => {
              const isSelected = currentLanguage === lang.code && selectionMode === 'manual';
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code as SupportedLanguageCode, 'manual');
                    onClose();
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#AAA785]/40 bg-[#AAA785]/10 text-[#AAA785] shadow-xs'
                      : 'border-white/[0.08] bg-[#232323] text-[#E1E1D5] hover:border-[rgba(170,167,133,0.35)] hover:text-[#FDFDF5]'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-[#FDFDF5] leading-snug">
                        {lang.nativeName}
                      </span>
                      <span className="text-xs text-[#E1E1D5] font-medium">({lang.name})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#AAA785] mt-0.5">
                      <span>{lang.script}</span>
                      <span>•</span>
                      <span>{lang.region}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-[#AAA785] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
