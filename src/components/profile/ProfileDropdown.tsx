import { useState, useRef, useEffect } from 'react';
import {
  User,
  Settings,
  Globe,
  LogOut,
  ChevronDown,
  Building2,
  ShieldCheck,
  Check,
  LayoutDashboard,
  UserPlus
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { UserProfile } from '../../types/index.ts';

interface ProfileDropdownProps {
  userProfile: UserProfile;
  onOpenSettings: (tab?: 'preferences' | 'profile' | 'notifications') => void;
  onOpenLanguage: () => void;
  onLogout: () => void;
  onOpenDashboard?: () => void;
  onOpenAuth?: (mode?: 'signin' | 'switch_account' | 'add_account') => void;
}

export function ProfileDropdown({
  userProfile,
  onOpenSettings,
  onOpenLanguage,
  onLogout,
  onOpenDashboard,
  onOpenAuth
}: ProfileDropdownProps) {
  const { currentLanguage, languageInfo, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = userProfile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        id="user-profile-menu-button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-xl border border-[rgba(210,230,190,0.10)] bg-[#292F22] p-1.5 pr-2.5 text-xs font-medium text-[#F1F4EA] hover:border-[rgba(184,242,61,0.25)] hover:bg-[#343B2B] transition-all cursor-pointer"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#343B2B] text-[#B8F23D] border border-[#B8F23D]/30 font-bold text-xs shrink-0">
          {initials}
        </div>
        <div className="text-left hidden sm:block max-w-[120px] truncate leading-tight">
          <span className="font-semibold text-[#F1F4EA] block truncate">{userProfile.name}</span>
          <span className="text-[10px] text-[#C0C7B7] block truncate">{userProfile.applicantId}</span>
        </div>
        <ChevronDown className={`h-3.5 w-3.5 text-[#C0C7B7] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1.5 z-50 w-64 rounded-xl border border-[rgba(210,230,190,0.10)] bg-[#292F22] p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {/* Identity Header */}
          <div className="p-2.5 border-b border-[rgba(210,230,190,0.10)] bg-[#343B2B] rounded-lg mb-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#F1F4EA]">{userProfile.name}</span>
              <span className="rounded-md bg-[#26351D] text-[#B8F23D] border border-[#B8F23D]/30 text-[9px] font-bold px-1.5 py-0.5">
                VERIFIED
              </span>
            </div>
            <p className="text-[11px] text-[#C0C7B7] font-mono truncate">{userProfile.email}</p>
            <p className="text-[10px] text-[#858D7D] mt-1 flex items-center gap-1 truncate">
              <Building2 className="h-3 w-3 shrink-0 text-[#C0C7B7]" />
              <span className="truncate">{userProfile.organization}</span>
            </p>
          </div>

          {/* Menu Items */}
          <div className="space-y-0.5">
            {onOpenDashboard && (
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  onOpenDashboard();
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#B8F23D] bg-[#26351D] hover:bg-[#26351D]/80 transition-colors cursor-pointer text-left"
              >
                <LayoutDashboard className="h-4 w-4 text-[#B8F23D]" />
                <span>{t('sidebar.my-dashboard', 'My Workspace Dashboard')}</span>
              </button>
            )}

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onOpenSettings('profile');
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-[#C0C7B7] hover:bg-[#343B2B] hover:text-[#F1F4EA] transition-colors cursor-pointer text-left"
            >
              <User className="h-4 w-4 text-[#858D7D]" />
              <span>{t('profile.myProfile', 'My Profile & Entity')}</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onOpenSettings('preferences');
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-[#C0C7B7] hover:bg-[#343B2B] hover:text-[#F1F4EA] transition-colors cursor-pointer text-left"
            >
              <Settings className="h-4 w-4 text-[#858D7D]" />
              <span>{t('profile.settings', 'Settings & Preferences')}</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onOpenLanguage();
              }}
              className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs text-[#C0C7B7] hover:bg-[#343B2B] hover:text-[#F1F4EA] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-[#B8F23D]" />
                <span>{t('profile.language', 'Language')}</span>
              </div>
              <span className="text-[11px] text-[#858D7D] font-medium">
                {languageInfo.nativeName}
              </span>
            </button>

            {onOpenAuth && (
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  onOpenAuth('switch_account');
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-[#B8F23D] hover:bg-[#343B2B] transition-colors cursor-pointer text-left"
              >
                <UserPlus className="h-4 w-4 text-[#B8F23D]" />
                <span>Switch / Add Gmail Account</span>
              </button>
            )}
          </div>

          <div className="my-1 border-t border-[rgba(210,230,190,0.10)]" />

          {/* Logout button */}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-[#FF6B6B] hover:bg-[#FF6B6B]/10 transition-colors cursor-pointer text-left"
          >
            <LogOut className="h-4 w-4 text-[#FF6B6B]" />
            <span>{t('profile.logout', 'Sign out of BIS Sahayak')}</span>
          </button>
        </div>
      )}
    </div>
  );
}
