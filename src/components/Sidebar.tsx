import { useState, useRef, useEffect } from 'react';
import {
  PanelLeftClose,
  Search,
  X,
  User,
  Settings,
  Globe,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { SIDEBAR_NAV_ITEMS, SidebarItem } from '../config/sidebarConfig.ts';
import { CopilotTabType } from './copilot/ComplianceCopilot.tsx';
import { TestingTabType } from './testing/TestingIntelligence.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import { UserProfile } from '../types/index.ts';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onOpenCopilot: (tab?: CopilotTabType) => void;
  isCopilotActive: boolean;
  onOpenCatalog: () => void;
  onOpenTesting?: (tab?: TestingTabType) => void;
  onOpenSmartFinder?: (query?: string) => void;
  onOpenLabFinder?: (standard?: string) => void;
  onOpenHallmarking?: (topic?: string) => void;
  onOpenFeeCalculator?: (standardId?: string) => void;
  activeView?:
    | 'dashboard'
    | 'chat'
    | 'copilot'
    | 'catalog'
    | 'testing'
    | 'smart_finder'
    | 'lab_finder'
    | 'hallmarking'
    | 'fee_calculator';
  userProfile?: UserProfile;
  onOpenSettings?: (tab?: 'preferences' | 'profile' | 'notifications') => void;
  onOpenLanguage?: () => void;
  onLogout?: () => void;
}

export function Sidebar({
  isOpen,
  onToggle,
  onNewChat,
  onOpenCopilot,
  isCopilotActive,
  onOpenCatalog,
  onOpenTesting,
  onOpenSmartFinder,
  onOpenLabFinder,
  onOpenHallmarking,
  onOpenFeeCalculator,
  activeView,
  userProfile,
  onOpenSettings,
  onOpenLanguage,
  onLogout
}: SidebarProps) {
  const { t, languageInfo } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string>('new-chat');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getItemLabel = (item: SidebarItem): string => {
    return t(`sidebar.${item.id}`, item.label);
  };

  const getItemDesc = (item: SidebarItem): string => {
    return item.description ? t(`sidebar.${item.id}.desc`, item.description) : '';
  };

  const filteredItems = SIDEBAR_NAV_ITEMS.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const label = getItemLabel(item).toLowerCase();
    const desc = getItemDesc(item).toLowerCase();
    return (
      label.includes(query) ||
      desc.includes(query) ||
      (item.badge && item.badge.toLowerCase().includes(query))
    );
  });

  const handleItemClick = (item: SidebarItem) => {
    setActiveItemId(item.id);

    switch (item.action.type) {
      case 'new_chat':
        onNewChat();
        break;
      case 'open_smart_finder':
        onOpenSmartFinder?.(item.action.initialQuery);
        break;
      case 'open_copilot':
        onOpenCopilot(item.action.tab);
        break;
      case 'open_fee_calculator':
        onOpenFeeCalculator?.(item.action.standardId);
        break;
      case 'open_testing':
        onOpenTesting?.(item.action.tab);
        break;
      case 'open_lab_finder':
        onOpenLabFinder?.(item.action.initialStandard);
        break;
      case 'open_hallmarking':
        onOpenHallmarking?.(item.action.initialTopic);
        break;
      case 'open_catalog':
        onOpenCatalog();
        break;
    }
  };

  const isItemActive = (item: SidebarItem): boolean => {
    if (activeView) {
      if (item.id === 'smart-standard-finder') return activeView === 'smart_finder';
      if (item.id === 'certification-copilot') return activeView === 'copilot';
      if (item.id === 'fee-calculator') return activeView === 'fee_calculator';
      if (item.id === 'testing-intelligence') return activeView === 'testing';
      if (item.id === 'lab-finder') return activeView === 'lab_finder';
      if (item.id === 'hallmarking-assistant') return activeView === 'hallmarking';
      if (item.id === 'standards-library') return activeView === 'catalog';
      if (item.id === 'new-chat') return activeView === 'chat';
    }
    if (item.id === 'certification-copilot') {
      return isCopilotActive;
    }
    return activeItemId === item.id;
  };

  const initials = userProfile
    ? userProfile.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : 'RR';

  return (
    <aside
      id="app-navigation-sidebar"
      aria-label="Navigation Sidebar"
      className={`flex flex-col bg-[#232323] text-[#FDFDF5] border-r border-[rgba(170,167,133,0.20)] transition-all duration-200 ease-in-out select-none shrink-0 ${
        isOpen
          ? 'w-72 min-w-[270px] max-w-[288px]'
          : 'w-0 min-w-0 max-w-0 overflow-hidden border-none opacity-0 pointer-events-none'
      }`}
    >
      {/* Top Header Row matching ChatGPT sidebar layout */}
      <div className="flex h-14 items-center justify-between px-3 border-b border-[rgba(170,167,133,0.20)]">
        <div className="flex flex-col truncate pl-1">
          <span className="text-sm font-bold text-[#FDFDF5] tracking-tight leading-normal truncate">
            {t('app.title', 'BIS Sahayak')}
          </span>
          <span className="text-[11px] text-[#AAA785] font-medium leading-normal">
            {t('sidebar.nationalPortal', 'Govt of India Portal')}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Quick Search Toggle Button */}
          <button
            type="button"
            id="sidebar-search-button"
            onClick={() => setShowSearchInput((prev) => !prev)}
            aria-label={t('sidebar.searchNav', 'Search navigation')}
            title={t('sidebar.searchNav', 'Search navigation')}
            className={`rounded-md p-1.5 text-[#E1E1D5] hover:text-[#FDFDF5] hover:bg-[#2A2E28] transition-colors cursor-pointer ${
              showSearchInput ? 'bg-[#2A2E28] text-[#AAA785]' : ''
            }`}
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Sidebar Collapse Toggle Icon Button */}
          <button
            type="button"
            id="sidebar-collapse-button"
            onClick={onToggle}
            aria-label={t('header.collapseSidebar', 'Collapse sidebar')}
            title={t('header.collapseSidebar', 'Collapse sidebar')}
            className="rounded-md p-1.5 text-[#E1E1D5] hover:text-[#FDFDF5] hover:bg-[#2A2E28] transition-colors cursor-pointer"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Optional Quick Search Input Filter */}
      {showSearchInput && (
        <div className="p-2 border-b border-[rgba(170,167,133,0.20)] animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#AAA785]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('common.search', 'Search...')}
              autoFocus
              className="w-full rounded-md bg-[#232323] py-1.5 pl-8 pr-7 text-xs text-[#FDFDF5] placeholder-[#AAA785] border border-[rgba(170,167,133,0.20)] focus:border-[rgba(170,167,133,0.30)] focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-2 text-[#E1E1D5] hover:text-[#FDFDF5] cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Primary Navigation Items */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item);
          const label = getItemLabel(item);
          const desc = getItemDesc(item);

          return (
            <button
              key={item.id}
              type="button"
              id={`sidebar-item-${item.id}`}
              onClick={() => handleItemClick(item)}
              title={desc || label}
              className={`w-full group flex items-center justify-between gap-2.5 rounded-lg px-2.5 py-2.5 text-xs font-medium transition-all text-left cursor-pointer ${
                active
                  ? 'bg-[#233A23] text-[#AAA785] border border-[#AAA785]/30 font-semibold shadow-xs'
                  : 'text-[#E1E1D5] hover:bg-[#232323] hover:text-[#FDFDF5] border border-transparent hover:border-[rgba(170,167,133,0.20)]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    active ? 'text-[#AAA785]' : 'text-[#E1E1D5] group-hover:text-[#FDFDF5]'
                  }`}
                />
                <span className="leading-snug break-words line-clamp-2">{label}</span>
              </div>

              {item.badge && (
                <span
                  className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold leading-normal ${
                    active
                      ? 'bg-[#AAA785]/20 text-[#AAA785] border border-[#AAA785]/40'
                      : 'bg-[#232323] text-[#E1E1D5] border border-[rgba(170,167,133,0.20)]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="py-6 text-center text-xs text-[#AAA785]">
            {t('sidebar.noMatch', 'No matching items')}
          </div>
        )}
      </div>

      {/* User Profile Area & Options Menu */}
      {userProfile && (
        <div className="border-t border-[rgba(170,167,133,0.20)] bg-[#233A23] p-2 relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-[#232323] border border-[rgba(170,167,133,0.20)] hover:border-[rgba(170,167,133,0.30)] hover:bg-[#2A2E28] transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2A2E28] text-[#AAA785] border border-[#AAA785]/30 font-bold text-xs shrink-0">
                {initials}
              </div>
              <div className="min-w-0 truncate">
                <span className="text-xs font-semibold text-[#FDFDF5] block truncate leading-tight">
                  {userProfile.name}
                </span>
                <span className="text-[10px] text-[#E1E1D5] block truncate font-mono mt-0.5">
                  {userProfile.applicantId}
                </span>
              </div>
            </div>
            <ChevronDown className={`h-3.5 w-3.5 text-[#E1E1D5] transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile options popup */}
          {isProfileMenuOpen && (
            <div className="absolute bottom-full left-2 right-2 mb-2 z-50 rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-1.5 shadow-2xl text-xs space-y-0.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <div className="px-2.5 py-2 border-b border-[rgba(170,167,133,0.20)] bg-[#2A2E28] rounded-lg">
                <span className="font-bold text-[#FDFDF5] block truncate">{userProfile.name}</span>
                <span className="text-[10px] text-[#E1E1D5] font-mono block truncate">{userProfile.email}</span>
                <span className="text-[9px] text-[#AAA785] font-semibold block mt-0.5">Verified BIS Applicant</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  onOpenSettings?.('profile');
                }}
                className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] transition-colors cursor-pointer text-left"
              >
                <User className="h-3.5 w-3.5 text-[#AAA785]" />
                <span>{t('profile.myProfile', 'My Profile & Entity')}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  onOpenSettings?.('preferences');
                }}
                className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] transition-colors cursor-pointer text-left"
              >
                <Settings className="h-3.5 w-3.5 text-[#AAA785]" />
                <span>{t('profile.settings', 'Settings & Preferences')}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  onOpenLanguage?.();
                }}
                className="w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-[#AAA785]" />
                  <span>{t('profile.language', 'Language')}</span>
                </div>
                <span className="text-[10px] text-[#AAA785] font-medium">
                  {languageInfo.nativeName}
                </span>
              </button>

              <div className="my-1 border-t border-[rgba(170,167,133,0.20)]" />

              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  onLogout?.();
                }}
                className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[#FF6B6B] hover:bg-[#FF6B6B]/10 transition-colors cursor-pointer text-left"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>{t('profile.logout', 'Sign out')}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
