import { useEffect } from 'react';
import { X, PanelLeft, LogIn, UserPlus } from 'lucide-react';
import { ShellNavigationProps, NavItemConfig } from './types.ts';
import { PRIMARY_NAV_ITEMS } from './Sidebar.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { HelpCircle, Settings, LogOut, UserCheck } from 'lucide-react';

interface MobileNavigationProps extends ShellNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({
  isOpen,
  onClose,
  activeView,
  onNavigate,
  userProfile,
  onOpenSettings,
  onOpenHelp,
  onLogout,
  onOpenAuth
}: MobileNavigationProps) {
  const { t } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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

  const handleItemSelect = (id: any) => {
    onNavigate(id);
    onClose();
  };

  const mainItems = PRIMARY_NAV_ITEMS.filter((item) => item.section === 'main');
  const businessItems = PRIMARY_NAV_ITEMS.filter((item) => item.section === 'business');
  const consumerItems = PRIMARY_NAV_ITEMS.filter((item) => item.section === 'consumer');

  const renderItem = (item: NavItemConfig) => {
    const isActive = activeView === item.id;
    const Icon = item.icon;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => handleItemSelect(item.id)}
        aria-current={isActive ? 'page' : undefined}
        className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs transition-colors cursor-pointer min-h-[42px] select-none ${
          isActive
            ? 'bg-[#233A23] text-[#FDFDF5] font-semibold border border-[rgba(170,167,133,0.30)] shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
            : 'text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] font-medium'
        }`}
      >
        {isActive && (
          <span
            className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#AAA785]"
            aria-hidden="true"
          />
        )}

        <Icon
          className={`h-4 w-4 shrink-0 transition-colors ${
            isActive ? 'text-[#AAA785]' : 'text-[#AAA785] group-hover:text-[#FDFDF5]'
          }`}
          aria-hidden="true"
        />

        <div className="flex-1 truncate">
          <span className="truncate leading-normal block">{item.label}</span>
        </div>

        {item.badge && (
          <span
            className={`shrink-0 rounded px-1.5 py-0.5 text-[9.5px] font-semibold tracking-wide uppercase ${
              isActive
                ? 'bg-[#232323] text-[#AAA785] border border-[rgba(170,167,133,0.30)]'
                : 'bg-[#2A2E28] text-[#AAA785] border border-[rgba(170,167,133,0.18)]'
            }`}
          >
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation Drawer">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-250 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="relative flex h-full w-[280px] max-w-[85vw] flex-col bg-[#232323] text-[#FDFDF5] shadow-2xl border-r border-[rgba(170,167,133,0.20)] animate-in slide-in-from-left duration-250 ease-out">
        {/* Brand and close button */}
        <div className="flex h-15 items-center justify-between border-b border-[rgba(170,167,133,0.20)] px-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#233A23] border border-[rgba(170,167,133,0.30)] text-[#AAA785] font-serif font-bold text-xs tracking-wider"
              aria-hidden="true"
            >
              BIS
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[#FDFDF5] tracking-tight leading-snug truncate">
                {t('app.title', 'BIS Sahayak')}
              </span>
              <span className="text-[10.5px] text-[#AAA785] font-medium leading-tight truncate">
                {t('sidebar.nationalPortal', 'Govt of India Portal')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-1.5 text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] transition-colors cursor-pointer"
          >
            <X className="h-4.5 w-4.5 text-[#AAA785]" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
          <div>
            <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#AAA785]">
              {t('sidebar.sectionMain', 'Main')}
            </div>
            <div className="space-y-1">{mainItems.map(renderItem)}</div>
          </div>

          <div>
            <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#AAA785]">
              {t('sidebar.sectionBusiness', 'Business & Compliance')}
            </div>
            <div className="space-y-1">{businessItems.map(renderItem)}</div>
          </div>

          <div>
            <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#AAA785]">
              {t('sidebar.sectionConsumer', 'Consumer')}
            </div>
            <div className="space-y-1">{consumerItems.map(renderItem)}</div>
          </div>
        </nav>

        {/* Bottom user profile & settings */}
        <div className="border-t border-[rgba(170,167,133,0.20)] p-2.5 space-y-1 bg-[#232323]">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenHelp?.();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] transition-colors cursor-pointer"
          >
            <HelpCircle className="h-4 w-4 text-[#AAA785] shrink-0" />
            <span>{t('sidebar.help', 'Help & Support')}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSettings?.('preferences');
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-[#E1E1D5] hover:bg-[#2A2E28] hover:text-[#FDFDF5] transition-colors cursor-pointer"
          >
            <Settings className="h-4 w-4 text-[#AAA785] shrink-0" />
            <span>{t('sidebar.settings', 'Settings')}</span>
          </button>

          {!userProfile ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAuth?.('signin');
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#AAA785] hover:bg-[#E1E1D5] text-[#232323] py-2.5 px-3 text-xs font-bold transition-colors cursor-pointer mt-2 hover:-translate-y-px"
            >
              <LogIn className="h-4 w-4" />
              <span>Sign In with Google</span>
            </button>
          ) : (
            <div className="space-y-1.5 mt-2">
              <div className="flex items-center gap-2.5 rounded-xl bg-[#2A2E28] border border-[rgba(170,167,133,0.20)] px-2.5 py-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#233A23] border border-[rgba(170,167,133,0.20)] text-[#AAA785] font-bold text-xs">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[#FDFDF5] truncate">{userName}</div>
                  <div className="text-[10px] text-[#AAA785] font-mono truncate">{applicantId}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuth?.('switch_account');
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-[#AAA785] hover:bg-[#2A2E28] transition-colors cursor-pointer"
              >
                <UserPlus className="h-3.5 w-3.5 text-[#AAA785]" />
                <span>Switch / Add Gmail</span>
              </button>

              {onLogout && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-[#FF6B6B] hover:bg-red-950/20 transition-colors cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5 text-[#FF6B6B]" />
                  <span>Sign out</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
