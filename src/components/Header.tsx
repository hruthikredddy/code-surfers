import { useState, useRef, useEffect } from 'react';
import { Globe, BookOpen, RotateCcw, ShieldCheck, PanelLeft, ChevronDown, Check, LayoutDashboard } from 'lucide-react';
import { SupportedLanguage, QueryCapability, UserProfile } from '../types/index.ts';
import { CAPABILITY_LABELS } from '../services/classifierAndRetriever.ts';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import { SUPPORTED_LANGUAGES } from '../i18n/languages.ts';
import { LanguageModal } from './LanguageModal.tsx';
import { SupportedLanguageCode } from '../i18n/types.ts';
import { ProfileDropdown } from './profile/ProfileDropdown.tsx';

interface HeaderProps {
  currentCapability: QueryCapability | null;
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenDirectory: () => void;
  onResetChat: () => void;
  onToggleCopilot?: () => void;
  isCopilotOpen?: boolean;
  messageCount: number;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  onOpenDashboard?: () => void;
  activeView?: string;
  userProfile?: UserProfile;
  onOpenSettings?: (tab?: 'preferences' | 'profile' | 'notifications') => void;
  onLogout?: () => void;
}

export function Header({
  currentCapability,
  selectedLanguage,
  onLanguageChange,
  onOpenDirectory,
  onResetChat,
  messageCount,
  onToggleSidebar,
  isSidebarOpen,
  onOpenDashboard,
  activeView,
  userProfile,
  onOpenSettings,
  onLogout
}: HeaderProps) {
  const { currentLanguage, languageInfo, setLanguage, t, isRTL } = useLanguage();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code: SupportedLanguageCode) => {
    setLanguage(code, 'manual');
    onLanguageChange(code);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[rgba(170,167,133,0.20)] bg-[#2A3328]/95 backdrop-blur-md">
        {/* Top micro-bar for Government of India institutional context */}
        <div className="bg-[#233A23] border-b border-[rgba(170,167,133,0.18)] px-4 py-1 text-[11px] text-[#E1E1D5] flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 leading-normal">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#FDFDF5]">
              {t('header.goi', 'GOVERNMENT OF INDIA')}
            </span>
            <span className="text-[#AAA785]">|</span>
            <span className="text-[#E1E1D5]">
              {t('header.bis', 'BUREAU OF INDIAN STANDARDS (BIS)')}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[#AAA785]">
            <span className="inline-flex items-center gap-1 text-[#E1E1D5]">
              <ShieldCheck className="h-3 w-3 text-[#AAA785]" />
              <span>{t('header.manakBhawan', 'Manak Bhawan, New Delhi')}</span>
            </span>
            <span className="text-white/10">•</span>
            <span className="text-[#AAA785] font-mono text-[10px]">
              {t('header.demoNotice', 'Verified BIS Standards')}
            </span>
          </div>
        </div>

        {/* Main Navigation Row */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-4 py-2.5">
          {/* Left: Sidebar Toggle + Brand / Title */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {onToggleSidebar && (
              <button
                type="button"
                id="header-toggle-sidebar-button"
                onClick={onToggleSidebar}
                className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] p-1.5 text-[#FDFDF5] hover:border-[rgba(170,167,133,0.30)] hover:text-[#AAA785] transition-colors cursor-pointer shrink-0"
                title={isSidebarOpen ? t('header.collapseSidebar', 'Collapse sidebar') : t('header.openSidebar', 'Open sidebar')}
                aria-label={isSidebarOpen ? t('header.collapseSidebar', 'Collapse sidebar') : t('header.openSidebar', 'Open sidebar')}
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            )}

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm sm:text-base font-bold text-[#FDFDF5] tracking-tight leading-snug">
                  {t('app.title', 'BIS Sahayak')}
                </span>
                <span className="hidden md:inline-block rounded-md bg-[#2A2E28] px-1.5 py-0.5 text-[10px] font-medium text-[#AAA785] border border-[rgba(170,167,133,0.20)] leading-normal">
                  {t('app.subtitle', 'AI Advisory Assistant')}
                </span>
              </div>
              <p className="text-[11px] text-[#E1E1D5] font-normal leading-normal mt-0.5 hidden sm:block">
                {t('app.tagline', 'Standards, Conformity Assessment, Hallmarking & LIMS Lab Search')}
              </p>
            </div>
          </div>

          {/* Center: Current Active Capability Badge */}
          <div className="hidden lg:flex items-center">
            {currentCapability ? (
              <div className="flex items-center gap-2 rounded-full bg-[#232323] px-3 py-1 text-xs font-medium text-[#FDFDF5] border border-[rgba(170,167,133,0.20)] leading-normal max-w-sm truncate">
                <span className="h-2 w-2 rounded-full bg-[#AAA785] animate-pulse shrink-0"></span>
                <span className="text-[#AAA785] text-[11px] shrink-0">{t('header.activeFocus', 'Active Focus:')}</span>
                <span className="font-semibold text-[#FDFDF5] truncate">
                  {t(`capability.${currentCapability}`, CAPABILITY_LABELS[currentCapability])}
                </span>
              </div>
            ) : (
              <div className="text-xs text-[#AAA785] font-medium leading-normal">
                {t('header.readyInquiry', 'Ready for standards inquiry')}
              </div>
            )}
          </div>

          {/* Right: Controls (Dashboard, Language Selector, Directory, Reset, Profile) */}
          <div className="flex items-center gap-2">
            {/* My Dashboard Top Section Button */}
            {onOpenDashboard && (
              <button
                type="button"
                id="header-open-my-dashboard"
                onClick={onOpenDashboard}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] min-h-[34px] px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-[#FDFDF5] hover:border-[rgba(170,167,133,0.30)] hover:text-[#AAA785] transition-colors cursor-pointer leading-normal"
                title={t('sidebar.my-dashboard', 'My Dashboard')}
              >
                <LayoutDashboard className="h-3.5 w-3.5 text-[#AAA785] shrink-0" />
                <span>{t('sidebar.my-dashboard', 'My Dashboard')}</span>
              </button>
            )}

            {/* Header Language Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                id="header-open-language-selector"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                title={t('language.selectTitle', 'Select Application Language')}
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-1.5 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] min-h-[34px] py-1.5 px-2.5 text-xs font-medium text-[#FDFDF5] hover:border-[rgba(170,167,133,0.30)] transition-colors cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5 text-[#AAA785] shrink-0" />
                <span className="font-semibold text-[#FDFDF5] leading-normal">
                  {languageInfo.nativeName}
                </span>
                <span className="text-[11px] text-[#E1E1D5] hidden md:inline leading-normal">
                  ({languageInfo.name})
                </span>
                <ChevronDown className={`h-3 w-3 text-[#E1E1D5] shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Selection Popover Dropdown */}
              {isDropdownOpen && (
                <div
                  role="listbox"
                  aria-label="Select language"
                  className="absolute right-0 top-full mt-1.5 z-50 w-56 sm:w-60 rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="px-2.5 py-1 text-[11px] font-semibold text-[#AAA785] border-b border-[rgba(170,167,133,0.20)] mb-1 leading-normal">
                    {t('language.selectTitle', 'Select Language')}
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = currentLanguage === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelectLanguage(lang.code)}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors cursor-pointer text-left ${
                          isSelected
                            ? 'bg-[#233A23] text-[#AAA785] font-semibold'
                            : 'text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5]'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 leading-normal">
                          <span className="text-sm font-medium">{lang.nativeName}</span>
                          <span className="text-[11px] text-[#AAA785]">({lang.name})</span>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 text-[#AAA785] shrink-0" />}
                      </button>
                    );
                  })}
                  <div className="mt-1 pt-1 border-t border-[rgba(170,167,133,0.20)]">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsLangModalOpen(true);
                      }}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-medium text-[#E1E1D5] hover:text-[#AAA785] hover:bg-[#2A2E28] transition-colors leading-normal"
                    >
                      <Globe className="h-3 w-3 shrink-0" />
                      <span>{t('language.allLanguages', 'Language Details')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Standards Catalog & Schemes Drawer Button */}
            <button
              onClick={onOpenDirectory}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] min-h-[34px] px-2.5 py-1.5 text-xs font-medium text-[#FDFDF5] hover:border-[rgba(170,167,133,0.30)] hover:text-[#AAA785] transition-colors cursor-pointer leading-normal"
              title={t('catalog.title', 'Browse Standards Catalog')}
            >
              <BookOpen className="h-3.5 w-3.5 text-[#E1E1D5] shrink-0" />
              <span className="hidden sm:inline">{t('header.catalog', 'Catalog')}</span>
            </button>

            {/* Reset Chat button (when on chat view) */}
            {activeView === 'chat' && messageCount > 0 && (
              <button
                onClick={onResetChat}
                className="inline-flex items-center justify-center rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] min-h-[34px] min-w-[34px] p-1.5 text-[#E1E1D5] hover:text-[#FDFDF5] hover:border-[rgba(170,167,133,0.30)] transition-colors cursor-pointer"
                title={t('header.clearChat', 'Clear conversation history')}
                aria-label={t('header.clearChat', 'Clear conversation history')}
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}

            {/* Profile Dropdown */}
            {userProfile && (
              <ProfileDropdown
                userProfile={userProfile}
                onOpenSettings={onOpenSettings || (() => {})}
                onOpenLanguage={() => setIsLangModalOpen(true)}
                onLogout={onLogout || (() => {})}
                onOpenDashboard={onOpenDashboard}
              />
            )}
          </div>
        </div>
      </header>

      {/* Language Modal */}
      <LanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
      />
    </>
  );
}
