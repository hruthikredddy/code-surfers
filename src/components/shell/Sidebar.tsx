import { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  SquarePen,
  Search,
  Compass,
  Calculator,
  FlaskConical,
  Building2,
  Award,
  Users,
  HelpCircle,
  Settings,
  PanelLeftClose,
  PanelLeft,
  ChevronDown,
  LogOut,
  UserCheck,
  LogIn,
  UserPlus
} from 'lucide-react';
import { NavViewId, ShellNavigationProps, NavItemConfig } from './types.ts';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

export const PRIMARY_NAV_ITEMS: NavItemConfig[] = [
  // SECTION: MAIN
  {
    id: 'chat',
    label: 'New Chat',
    icon: SquarePen,
    description: 'Start a fresh standards inquiry or advisory session',
    section: 'main'
  },
  {
    id: 'smart_finder',
    label: 'Smart Standard Finder',
    icon: Search,
    badge: 'AI SEARCH',
    badgeColor: 'lime',
    description: 'Semantic & keyword search across 21,000+ Indian Standards',
    section: 'main'
  },

  // SECTION: BUSINESS & COMPLIANCE
  {
    id: 'copilot',
    label: 'Certificate Compliance',
    icon: Compass,
    badge: 'COPILOT',
    badgeColor: 'forest',
    description: 'Interactive roadmap, licensing guide & checklist',
    section: 'business'
  },
  {
    id: 'fee_calculator',
    label: 'BIS Fee Calculator',
    icon: Calculator,
    badge: 'MSME 50%',
    badgeColor: 'lime',
    description: 'Statutory fee breakdown, MSME concessions & marking fees',
    section: 'business'
  },
  {
    id: 'testing',
    label: 'Testing & Laboratory Intelligence',
    icon: FlaskConical,
    badge: 'LIMS',
    badgeColor: 'sage',
    description: 'Test protocols, mandatory clauses & test gap analysis',
    section: 'business'
  },
  {
    id: 'lab_finder',
    label: 'Laboratory Finder',
    icon: Building2,
    badge: '250+ LABS',
    badgeColor: 'forest',
    description: 'Locate BIS recognized and empanelled laboratories',
    section: 'business'
  },

  // SECTION: CONSUMER
  {
    id: 'hallmarking',
    label: 'Hallmarking Assistant',
    icon: Award,
    badge: 'HUID',
    badgeColor: 'lime',
    description: 'Gold & silver hallmarking guide, 3 marks & HUID verification',
    section: 'consumer'
  },
  {
    id: 'consumer',
    label: 'Consumer Assistant',
    icon: Users,
    badge: 'GRIEVANCE',
    badgeColor: 'sage',
    description: 'Verify ISI/CRS, check counterfeit marks & file BIS complaints',
    section: 'consumer'
  }
];

export function Sidebar({
  activeView,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  userProfile,
  onOpenSettings,
  onOpenHelp,
  onLogout,
  onOpenAuth
}: ShellNavigationProps) {
  const { t } = useLanguage();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userName = userProfile?.name || 'Applicant';
  const applicantId = userProfile?.applicantId || 'BIS/2026/DL-8360';
  const initials = userProfile
    ? userProfile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase() || 'RR'
    : '';

  const mainItems = PRIMARY_NAV_ITEMS.filter((item) => item.section === 'main');
  const businessItems = PRIMARY_NAV_ITEMS.filter((item) => item.section === 'business');
  const consumerItems = PRIMARY_NAV_ITEMS.filter((item) => item.section === 'consumer');

  const renderNavItem = (item: NavItemConfig) => {
    const isActive = activeView === item.id;
    const Icon = item.icon;

    if (isCollapsed) {
      return (
        <button
          key={item.id}
          type="button"
          onClick={() => onNavigate(item.id)}
          title={`${item.label} — ${item.description || ''}`}
          aria-label={item.label}
          aria-current={isActive ? 'page' : undefined}
          className={`group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
            isActive
              ? 'bg-[#292F22] text-[#B8F23D] border border-[rgba(184,242,61,0.30)] shadow-[0_0_12px_rgba(184,242,61,0.12)]'
              : 'text-[#C0C7B7] hover:bg-[#343B2B]/60 hover:text-[#F1F4EA]'
          }`}
        >
          <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-[#B8F23D]' : 'text-[#C0C7B7] group-hover:text-[#F1F4EA]'}`} />
          {isActive && (
            <span
              className="absolute left-1 top-2.5 bottom-2.5 w-1 rounded-full bg-[#B8F23D]"
              aria-hidden="true"
            />
          )}
        </button>
      );
    }

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => onNavigate(item.id)}
        aria-current={isActive ? 'page' : undefined}
        title={item.description}
        className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs transition-all duration-200 cursor-pointer min-h-[40px] select-none ${
          isActive
            ? 'bg-[#292F22] text-[#F1F4EA] font-semibold border border-[rgba(184,242,61,0.25)] shadow-[0_1px_3px_rgba(0,0,0,0.2)]'
            : 'text-[#C0C7B7] hover:bg-[#343B2B]/60 hover:text-[#F1F4EA] font-medium'
        }`}
      >
        {/* Active electric lime indicator pill */}
        {isActive && (
          <span
            className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#B8F23D] shadow-[0_0_8px_rgba(184,242,61,0.5)]"
            aria-hidden="true"
          />
        )}

        <Icon
          className={`h-4 w-4 shrink-0 transition-colors ${
            isActive
              ? 'text-[#B8F23D]'
              : 'text-[#858D7D] group-hover:text-[#F1F4EA]'
          }`}
          aria-hidden="true"
        />

        <div className="flex-1 truncate">
          <span className="truncate leading-normal block">{item.label}</span>
        </div>

        {item.badge && (
          <span
            className={`shrink-0 rounded px-1.5 py-0.5 text-[9.5px] font-semibold tracking-wide uppercase transition-colors ${
              isActive
                ? 'bg-[#10150F] text-[#B8F23D] border border-[#B8F23D]/30'
                : 'bg-[#292F22] text-[#858D7D] border border-[rgba(210,230,190,0.10)] group-hover:text-[#C0C7B7]'
            }`}
          >
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside
      id="app-navigation-sidebar"
      aria-label="Application Navigation Sidebar"
      className={`fixed lg:sticky top-0 z-40 flex h-full flex-col bg-[#1A2016] text-[#F1F4EA] border-r border-[rgba(210,230,190,0.10)] transition-[width] duration-250 ease-in-out select-none shrink-0 ${
        isCollapsed ? 'w-[74px]' : 'w-[268px]'
      }`}
    >
      {/* 1. TOP BRAND AREA */}
      <div className="flex h-15 items-center justify-between border-b border-[rgba(210,230,190,0.10)] px-3">
        {isCollapsed ? (
          <div className="mx-auto flex flex-col items-center">
            <button
              type="button"
              onClick={onToggleCollapse}
              title="BIS Sahayak - Expand sidebar"
              aria-label="Expand sidebar"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#10150F] border border-[#B8F23D]/30 text-[#B8F23D] font-serif font-bold text-xs tracking-wider hover:border-[#B8F23D]/60 transition-colors cursor-pointer"
            >
              BIS
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2.5 min-w-0 pl-1">
              {/* BIS Institutional Visual Emblem Mark */}
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#10150F] border border-[#B8F23D]/30 text-[#B8F23D] font-serif font-bold text-xs tracking-wider shadow-inner"
                aria-hidden="true"
              >
                BIS
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-[#F1F4EA] tracking-tight leading-snug truncate">
                  {t('app.title', 'BIS Sahayak')}
                </span>
                <span className="text-[10.5px] text-[#858D7D] font-medium leading-tight truncate">
                  {t('sidebar.nationalPortal', 'Govt of India Portal')}
                </span>
              </div>
            </div>

            {/* Sidebar Collapse Toggle Button */}
            <button
              type="button"
              id="sidebar-collapse-button"
              onClick={onToggleCollapse}
              aria-label={t('header.collapseSidebar', 'Collapse sidebar')}
              title={t('header.collapseSidebar', 'Collapse sidebar')}
              className="rounded-lg p-1.5 text-[#C0C7B7] hover:text-[#F1F4EA] hover:bg-[#343B2B] transition-colors cursor-pointer shrink-0"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* 2. NAVIGATION BODY WITH THREE LOGICAL SECTIONS */}
      <nav
        aria-label="Main Navigation"
        className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-4"
      >
        {/* MAIN SECTION */}
        <div>
          {!isCollapsed && (
            <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#858D7D]">
              {t('sidebar.sectionMain', 'Main')}
            </div>
          )}
          <div className={isCollapsed ? 'flex flex-col items-center space-y-1.5' : 'space-y-1'}>
            {mainItems.map(renderNavItem)}
          </div>
        </div>

        {/* BUSINESS & COMPLIANCE SECTION */}
        <div>
          {!isCollapsed && (
            <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#858D7D]">
              {t('sidebar.sectionBusiness', 'Business & Compliance')}
            </div>
          )}
          <div className={isCollapsed ? 'flex flex-col items-center space-y-1.5' : 'space-y-1'}>
            {businessItems.map(renderNavItem)}
          </div>
        </div>

        {/* CONSUMER SECTION */}
        <div>
          {!isCollapsed && (
            <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#858D7D]">
              {t('sidebar.sectionConsumer', 'Consumer')}
            </div>
          )}
          <div className={isCollapsed ? 'flex flex-col items-center space-y-1.5' : 'space-y-1'}>
            {consumerItems.map(renderNavItem)}
          </div>
        </div>
      </nav>

      {/* 3. SIDEBAR BOTTOM AREA (Help, Settings, Compact User Profile) */}
      <div className="border-t border-[rgba(210,230,190,0.10)] p-2 space-y-1">
        {/* Help & Support */}
        {isCollapsed ? (
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={onOpenHelp}
              title={t('sidebar.help', 'Help & Support')}
              aria-label={t('sidebar.help', 'Help & Support')}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#C0C7B7] hover:bg-[#343B2B]/60 hover:text-[#F1F4EA] transition-colors cursor-pointer"
            >
              <HelpCircle className="h-4.5 w-4.5 text-[#858D7D]" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenHelp}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-[#C0C7B7] hover:bg-[#343B2B]/60 hover:text-[#F1F4EA] transition-colors cursor-pointer min-h-[38px]"
          >
            <HelpCircle className="h-4 w-4 text-[#858D7D] shrink-0" />
            <span className="truncate">{t('sidebar.help', 'Help & Support')}</span>
          </button>
        )}

        {/* Settings */}
        {isCollapsed ? (
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onOpenSettings?.('preferences')}
              title={t('sidebar.settings', 'Settings')}
              aria-label={t('sidebar.settings', 'Settings')}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#C0C7B7] hover:bg-[#343B2B]/60 hover:text-[#F1F4EA] transition-colors cursor-pointer"
            >
              <Settings className="h-4.5 w-4.5 text-[#858D7D]" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onOpenSettings?.('preferences')}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-[#C0C7B7] hover:bg-[#343B2B]/60 hover:text-[#F1F4EA] transition-colors cursor-pointer min-h-[38px]"
          >
            <Settings className="h-4 w-4 text-[#858D7D] shrink-0" />
            <span className="truncate">{t('sidebar.settings', 'Settings')}</span>
          </button>
        )}

        {/* Compact User Profile Area / Sign In */}
        {!userProfile ? (
          <div className="pt-2">
            <button
              type="button"
              id="sidebar-signin-button"
              onClick={() => onOpenAuth?.('signin')}
              title="Sign in with Google / Gmail"
              className={`flex items-center justify-center gap-2 rounded-xl bg-[#B8F23D] hover:bg-[#a6df34] text-[#10150F] font-bold text-xs transition-colors cursor-pointer shadow-sm ${
                isCollapsed ? 'h-10 w-10 mx-auto' : 'w-full py-2.5 px-3 min-h-[44px]'
              }`}
            >
              <LogIn className="h-4 w-4 shrink-0" />
              {!isCollapsed && <span>Sign In</span>}
            </button>
          </div>
        ) : (
          <div className="relative pt-1" ref={profileMenuRef}>
            {isCollapsed ? (
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  title={`${userName} (${applicantId})`}
                  aria-label={`User profile for ${userName}`}
                  aria-expanded={isProfileMenuOpen}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#292F22] border border-[rgba(210,230,190,0.15)] text-[#B8F23D] font-bold text-xs hover:border-[rgba(184,242,61,0.30)] transition-colors cursor-pointer"
                >
                  {initials}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                aria-label={`User profile for ${userName}`}
                aria-expanded={isProfileMenuOpen}
                className="flex w-full items-center gap-2.5 rounded-xl bg-[#292F22] border border-[rgba(210,230,190,0.10)] px-2.5 py-2 text-left hover:border-[rgba(184,242,61,0.25)] hover:bg-[#343B2B] transition-colors cursor-pointer min-h-[44px]"
              >
                {/* Initials Avatar */}
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#171C13] border border-[rgba(210,230,190,0.15)] text-[#B8F23D] font-bold text-xs"
                  aria-hidden="true"
                >
                  {initials}
                </div>

                {/* Name & Applicant ID */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[#F1F4EA] truncate leading-tight">
                    {userName}
                  </div>
                  <div className="text-[10px] text-[#858D7D] font-mono truncate leading-tight mt-0.5">
                    {applicantId}
                  </div>
                </div>

                <ChevronDown
                  className={`h-3.5 w-3.5 text-[#858D7D] shrink-0 transition-transform duration-200 ${
                    isProfileMenuOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            )}

            {/* User Profile Popover Menu */}
            {isProfileMenuOpen && (
              <div
                role="menu"
                aria-label="User profile options"
                className={`absolute bottom-full mb-2 z-50 rounded-xl border border-[rgba(210,230,190,0.15)] bg-[#292F22] p-1.5 shadow-xl animate-in fade-in duration-150 ${
                  isCollapsed ? 'left-2 w-56' : 'left-0 right-0'
                }`}
              >
                <div className="px-2.5 py-2 border-b border-[rgba(210,230,190,0.10)] mb-1">
                  <div className="text-xs font-semibold text-[#F1F4EA] truncate">{userName}</div>
                  <div className="text-[10.5px] text-[#858D7D] font-mono truncate mt-0.5">{applicantId}</div>
                  <div className="mt-1 inline-flex items-center gap-1 rounded bg-[#171C13] px-1.5 py-0.5 text-[9.5px] font-medium text-[#B8F23D] border border-[#B8F23D]/20">
                    <UserCheck className="h-2.5 w-2.5" />
                    <span>Scheme-I Applicant</span>
                  </div>
                </div>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onOpenSettings?.('profile');
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#C0C7B7] hover:bg-[#343B2B] hover:text-[#F1F4EA] transition-colors cursor-pointer"
                >
                  <Settings className="h-3.5 w-3.5 text-[#858D7D]" />
                  <span>Profile & Account</span>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onOpenSettings?.('preferences');
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#C0C7B7] hover:bg-[#343B2B] hover:text-[#F1F4EA] transition-colors cursor-pointer"
                >
                  <Settings className="h-3.5 w-3.5 text-[#858D7D]" />
                  <span>Preferences</span>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onOpenAuth?.('switch_account');
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#B8F23D] hover:bg-[#343B2B] transition-colors cursor-pointer"
                >
                  <UserPlus className="h-3.5 w-3.5 text-[#B8F23D]" />
                  <span>Switch / Add Gmail</span>
                </button>

                {onLogout && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onLogout();
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#FF6B6B] hover:bg-[#343B2B] transition-colors cursor-pointer border-t border-[rgba(210,230,190,0.08)] mt-1 pt-1.5"
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
    </aside>
  );
}
