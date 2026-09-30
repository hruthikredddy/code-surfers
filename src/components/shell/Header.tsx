import { useState, useRef, useEffect } from 'react';
import {
  PanelLeft,
  LayoutDashboard,
  Globe,
  BookOpen,
  ChevronDown,
  UserCheck,
  Settings,
  LogOut,
  Check,
  LogIn,
  UserPlus
} from 'lucide-react';
import { NavViewId } from './types.ts';
import { UserProfile } from '../../types/index.ts';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages.ts';
import { SupportedLanguageCode } from '../../i18n/types.ts';

interface ShellHeaderProps {
  activeView: NavViewId;
  pageTitle?: string;
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  onOpenDashboard?: () => void;
  onOpenCatalog?: () => void;
  userProfile?: UserProfile | null;
  onOpenSettings?: (tab?: 'preferences' | 'profile' | 'notifications') => void;
  onLogout?: () => void;
  onOpenAuth?: (mode?: 'signin' | 'switch_account' | 'add_account') => void;
}

const VIEW_TITLES: Record<NavViewId, string> = {
  chat: 'BIS Sahayak',
  smart_finder: 'Smart Standard Finder',
  copilot: 'Certificate Compliance',
  fee_calculator: 'BIS Fee Calculator',
  testing: 'Testing & Laboratory Intelligence',
  lab_finder: 'Laboratory Finder',
  hallmarking: 'Hallmarking Assistant',
  consumer: 'Consumer Assistant',
  catalog: 'Standards Library',
  dashboard: 'My Dashboard'
};

export function Header({
  activeView,
  pageTitle,
  onToggleSidebar,
  isSidebarCollapsed,
  onOpenDashboard,
  onOpenCatalog,
  userProfile,
  onOpenSettings,
  onLogout,
  onOpenAuth
}: ShellHeaderProps) {
  const { currentLanguage, languageInfo, setLanguage, t } = useLanguage();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTitle = pageTitle || VIEW_TITLES[activeView] || 'BIS Sahayak';

  const userName = userProfile?.name || 'Applicant';
  const applicantId = userProfile?.applicantId || 'BIS/2026/DL-8360';
  const userEmail = userProfile?.email || '';
  const initials = userProfile
    ? userProfile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase() || 'RR'
    : '';

  const handleSelectLanguage = (code: SupportedLanguageCode) => {
    setLanguage(code, 'manual');
    setIsLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-[rgba(170,167,133,0.20)] bg-[#232323] px-3 sm:px-5 backdrop-blur-md select-none transition-colors">
      {/* Left side: Sidebar Toggle Button + Dynamic Current Page Title */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
        <button
          type="button"
          id="shell-sidebar-toggle-button"
          onClick={onToggleSidebar}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="flex h-8.5 w-8.5 items-center justify-center rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] text-[#FDFDF5] hover:border-[#AAA785] hover:bg-[#2A2E28] hover:text-[#E1E1D5] transition-colors cursor-pointer shrink-0"
        >
          <PanelLeft className="h-4 w-4 text-[#AAA785]" />
        </button>

        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <h1 className="text-sm sm:text-base font-bold text-[#FDFDF5] tracking-tight truncate leading-tight">
            {activeView === 'chat' ? 'BIS Sahayak' : (t(`view.${activeView}`, currentTitle))}
          </h1>
          {activeView === 'chat' && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#233A23] px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[10.5px] font-medium text-[#AAA785] border border-[rgba(170,167,133,0.25)] shrink-0 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-[#AAA785] animate-pulse"></span>
              <span>{t('header.aiOnline', 'Live Knowledge Base')}</span>
            </span>
          )}
        </div>
      </div>

      {/* Right side: My Dashboard, Language selector, Catalog, User profile */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* 1. My Dashboard */}
        {onOpenDashboard && (
          <button
            type="button"
            id="shell-open-dashboard"
            onClick={onOpenDashboard}
            title={t('sidebar.my-dashboard', 'My Dashboard')}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer min-h-[34px] leading-normal ${
              activeView === 'dashboard'
                ? 'bg-[#233A23] text-[#FDFDF5] border-[#AAA785] shadow-[0_1px_4px_rgba(0,0,0,0.2)]'
                : 'border-[rgba(170,167,133,0.20)] bg-[#232323] text-[#E1E1D5] hover:border-[#AAA785] hover:text-[#FDFDF5] hover:bg-[#2A2E28]'
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5 text-[#AAA785] shrink-0" />
            <span className="hidden xs:inline">{t('sidebar.my-dashboard', 'My Dashboard')}</span>
          </button>
        )}

        {/* 2. Catalog / Directory */}
        {onOpenCatalog && (
          <button
            type="button"
            id="shell-open-catalog"
            onClick={onOpenCatalog}
            title={t('sidebar.standardsLibrary', 'Catalog')}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer min-h-[34px] leading-normal ${
              activeView === 'catalog'
                ? 'bg-[#233A23] text-[#FDFDF5] border-[#AAA785]'
                : 'border-[rgba(170,167,133,0.20)] bg-[#232323] text-[#E1E1D5] hover:border-[#AAA785] hover:text-[#FDFDF5] hover:bg-[#2A2E28]'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 text-[#AAA785] shrink-0" />
            <span className="hidden sm:inline">{t('sidebar.standardsLibrary', 'Catalog')}</span>
          </button>
        )}

        {/* 3. Compact Language Selector */}
        <div className="relative" ref={langRef}>
          <button
            type="button"
            id="shell-language-selector-button"
            onClick={() => setIsLangDropdownOpen((prev) => !prev)}
            aria-label={`Select Language, currently ${languageInfo.name}`}
            aria-expanded={isLangDropdownOpen}
            aria-haspopup="menu"
            className="flex items-center gap-1.5 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] min-h-[34px] px-2 sm:px-2.5 py-1.5 text-xs font-medium text-[#E1E1D5] hover:border-[#AAA785] hover:text-[#FDFDF5] hover:bg-[#2A2E28] transition-colors cursor-pointer leading-normal"
          >
            <Globe className="h-3.5 w-3.5 text-[#AAA785] shrink-0" />
            <span className="font-semibold hidden sm:inline">{languageInfo.name}</span>
            <span className="font-semibold sm:hidden">{languageInfo.code.toUpperCase()}</span>
            <ChevronDown
              className={`h-3 w-3 text-[#AAA785] transition-transform duration-200 ${
                isLangDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isLangDropdownOpen && (
            <div
              role="menu"
              aria-label="Supported Languages"
              className="absolute right-0 mt-1.5 w-48 rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="px-2.5 py-1.5 text-[10px] font-semibold text-[#AAA785] uppercase tracking-wider border-b border-[rgba(170,167,133,0.15)] mb-1">
                Select Language
              </div>
              <div className="max-h-56 overflow-y-auto space-y-0.5">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = currentLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      role="menuitem"
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#233A23] text-[#FDFDF5] font-semibold'
                          : 'text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5]'
                      }`}
                    >
                      <div className="flex flex-col text-left">
                        <span>{lang.name}</span>
                        <span className="text-[10px] text-[#AAA785]">{lang.nativeName}</span>
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 text-[#AAA785] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 4. Compact User Profile Button or Sign-In Button */}
        {!userProfile ? (
          <button
            type="button"
            id="shell-signin-button"
            onClick={() => onOpenAuth?.('signin')}
            className="flex items-center gap-1.5 rounded-lg bg-[#AAA785] hover:bg-[#E1E1D5] text-[#232323] min-h-[34px] px-3 py-1 text-xs font-bold transition-all shadow-sm cursor-pointer hover:-translate-y-px"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In</span>
          </button>
        ) : (
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              id="shell-user-profile-button"
              onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
              aria-expanded={isProfileDropdownOpen}
              aria-haspopup="menu"
              aria-label={`User profile menu for ${userName}`}
              className="flex items-center gap-1.5 rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] min-h-[34px] px-2 sm:px-2.5 py-1 text-xs font-semibold text-[#FDFDF5] hover:border-[#AAA785] hover:bg-[#2A2E28] transition-colors cursor-pointer leading-normal"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#233A23] border border-[rgba(170,167,133,0.20)] text-[#AAA785] text-[11px] font-bold">
                {initials}
              </div>
              <span className="hidden md:inline max-w-[110px] truncate">{userName}</span>
              <ChevronDown
                className={`h-3 w-3 text-[#AAA785] transition-transform duration-200 ${
                  isProfileDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isProfileDropdownOpen && (
              <div
                role="menu"
                aria-label="User profile options"
                className="absolute right-0 mt-1.5 w-60 rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-2.5 py-2 border-b border-[rgba(170,167,133,0.15)] mb-1">
                  <div className="text-xs font-semibold text-[#FDFDF5] truncate">{userName}</div>
                  {userEmail && (
                    <div className="text-[10px] text-[#E1E1D5] font-mono truncate mt-0.5">{userEmail}</div>
                  )}
                  <div className="text-[10px] text-[#AAA785] font-mono truncate mt-0.5">{applicantId}</div>
                  <div className="mt-1 inline-flex items-center gap-1 rounded bg-[#233A23] px-1.5 py-0.5 text-[9.5px] font-medium text-[#AAA785] border border-[rgba(170,167,133,0.25)]">
                    <UserCheck className="h-2.5 w-2.5" />
                    <span>Scheme-I Lead</span>
                  </div>
                </div>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    onOpenSettings?.('profile');
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] transition-colors cursor-pointer"
                >
                  <Settings className="h-3.5 w-3.5 text-[#AAA785]" />
                  <span>Profile</span>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    onOpenSettings?.('preferences');
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] transition-colors cursor-pointer"
                >
                  <Settings className="h-3.5 w-3.5 text-[#AAA785]" />
                  <span>Settings</span>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    onOpenAuth?.('switch_account');
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#AAA785] hover:bg-[#2A2E28] transition-colors cursor-pointer"
                >
                  <UserPlus className="h-3.5 w-3.5 text-[#AAA785]" />
                  <span>Switch / Add Gmail</span>
                </button>

                {onLogout && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      onLogout();
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#FF6B6B] hover:bg-[#2A2E28] transition-colors cursor-pointer border-t border-[rgba(170,167,133,0.15)] mt-1 pt-1.5"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign out</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
