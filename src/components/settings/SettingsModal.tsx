import { useState, useEffect } from 'react';
import {
  X,
  Settings,
  Globe,
  Palette,
  Bell,
  FileCheck,
  User,
  Building,
  Check,
  Download
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages.ts';
import { SupportedLanguageCode } from '../../i18n/types.ts';
import { UserProfile, UserSettings } from '../../types/index.ts';
import { LogIn, LogOut, UserPlus } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfile | null;
  userSettings: UserSettings;
  onSaveProfile: (profile: UserProfile) => void;
  onSaveSettings: (settings: UserSettings) => void;
  onOpenLanguageModal: () => void;
  onLogout?: () => void;
  onOpenAuth?: (mode?: 'signin' | 'switch_account' | 'add_account') => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  userProfile,
  userSettings,
  onSaveProfile,
  onSaveSettings,
  onOpenLanguageModal,
  onLogout,
  onOpenAuth
}: SettingsModalProps) {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'preferences' | 'profile' | 'notifications'>('preferences');
  const [profileForm, setProfileForm] = useState<UserProfile>(
    () =>
      userProfile || {
        name: 'Applicant',
        email: '',
        organization: 'Apex Consumer Tech & Appliances Ltd.',
        role: 'Quality Assurance & Regulatory Compliance Lead',
        applicantId: 'BIS/2026/DL-8360',
        licenseTier: 'Scheme-I (ISI Mark) & CRS Active Applicant',
        joinedDate: 'January 2026'
      }
  );
  const [settingsForm, setSettingsForm] = useState<UserSettings>({ ...userSettings });
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setProfileForm({ ...userProfile });
    }
  }, [userProfile]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveProfile(profileForm);
    onSaveSettings(settingsForm);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-2xl rounded-2xl border border-[rgba(170,167,133,0.20)] bg-[#232323] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] bg-[#2A2E28] px-5 py-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#233A23] text-[#FDFDF5] shadow-2xs">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 id="settings-modal-title" className="text-base font-bold text-[#FDFDF5] leading-snug">
                {t('settings.modalTitle', 'Workspace & Account Settings')}
              </h2>
              <p className="text-xs text-[#AAA785] leading-normal">
                {t('settings.modalSubtitle', 'Configure language, regulatory focus, appearance, and alerts')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#AAA785] hover:bg-[#2A2E28] hover:text-[#FDFDF5] transition-colors cursor-pointer"
            aria-label={t('common.close', 'Close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[rgba(170,167,133,0.20)] bg-[#232323] px-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('preferences')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'preferences'
                ? 'border-blue-600 text-[#AAA785] font-bold'
                : 'border-transparent text-[#AAA785] hover:text-[#FDFDF5]'
            }`}
          >
            {t('settings.tabPreferences', 'Preferences & Language')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'border-blue-600 text-[#AAA785] font-bold'
                : 'border-transparent text-[#AAA785] hover:text-[#FDFDF5]'
            }`}
          >
            {t('settings.tabProfile', 'Organization Profile')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notifications')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'notifications'
                ? 'border-blue-600 text-[#AAA785] font-bold'
                : 'border-transparent text-[#AAA785] hover:text-[#FDFDF5]'
            }`}
          >
            {t('settings.tabAlerts', 'Notifications & QCO Alerts')}
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              {/* Language Selection */}
              <div>
                <label className="block text-xs font-bold text-[#FDFDF5] mb-1.5 flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-[#AAA785]" />
                  <span>{t('language.selectTitle', 'Application Language')}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = currentLanguage === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => setLanguage(lang.code as SupportedLanguageCode, 'manual')}
                        className={`flex items-center justify-between p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-[#2A2E28]/70 text-[#FDFDF5] font-bold shadow-2xs'
                            : 'border-[rgba(170,167,133,0.20)] bg-[#232323] hover:bg-[#2A2E28] text-[#E1E1D5]'
                        }`}
                      >
                        <div className="min-w-0">
                          <span className="text-xs font-semibold block">{lang.nativeName}</span>
                          <span className="text-[10px] text-[#AAA785] block">({lang.name})</span>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 text-[#AAA785] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenLanguageModal();
                  }}
                  className="mt-2 text-xs font-semibold text-[#AAA785] hover:underline cursor-pointer"
                >
                  {t('language.allLanguages', 'View all 22 official languages of India')} →
                </button>
              </div>

              {/* Theme / Appearance Selection */}
              <div className="pt-3 border-t border-[rgba(170,167,133,0.15)]">
                <label className="block text-xs font-bold text-[#FDFDF5] mb-1.5 flex items-center gap-1.5">
                  <Palette className="h-4 w-4 text-purple-600" />
                  <span>{t('settings.appearanceTheme', 'Appearance & Theme')}</span>
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['light', 'dark', 'system'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setSettingsForm({ ...settingsForm, theme: mode })}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        settingsForm.theme === mode
                          ? 'border-blue-600 bg-[#2A2E28] font-bold text-[#FDFDF5] ring-1 ring-blue-500/20'
                          : 'border-[rgba(170,167,133,0.20)] bg-[#232323] hover:bg-[#2A2E28] text-[#E1E1D5]'
                      }`}
                    >
                      <span className="text-xs capitalize font-semibold block">{mode}</span>
                      <span className="text-[10px] text-[#AAA785] block mt-0.5">
                        {mode === 'light' ? 'Standard BIS White' : mode === 'dark' ? 'Institutional Slate' : 'System Default'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Default Standard Category Focus */}
              <div className="pt-3 border-t border-[rgba(170,167,133,0.15)]">
                <label className="block text-xs font-bold text-[#FDFDF5] mb-1.5 flex items-center gap-1.5">
                  <FileCheck className="h-4 w-4 text-[#AAA785]" />
                  <span>{t('settings.defaultCategory', 'Primary Product Sector / Standard Discipline')}</span>
                </label>
                <select
                  value={settingsForm.defaultCategory}
                  onChange={(e) => setSettingsForm({ ...settingsForm, defaultCategory: e.target.value })}
                  className="w-full rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-3 py-2 text-xs text-[#FDFDF5] focus:border-blue-500 focus:outline-hidden"
                >
                  <option value="Electronics & Electrical (IS 302 / IS 1293)">Electronics & Electrical (IS 302 / IS 1293)</option>
                  <option value="Mechanical & Automotive (IS 17803 / IS 4151)">Mechanical & Automotive (IS 17803 / IS 4151)</option>
                  <option value="Chemical & Food Water (IS 14543 / IS 17526)">Chemical & Food Water (IS 14543 / IS 17526)</option>
                  <option value="Consumer Goods & Toys (IS 9873 / IS 1786)">Consumer Goods & Toys (IS 9873 / IS 1786)</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#E1E1D5] mb-1">
                  {t('settings.fullName', 'Authorized Contact Person')}
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-3 py-2 text-xs text-[#FDFDF5] focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E1E1D5] mb-1">
                  {t('settings.organization', 'Company / Manufacturing Entity')}
                </label>
                <input
                  type="text"
                  value={profileForm.organization}
                  onChange={(e) => setProfileForm({ ...profileForm, organization: e.target.value })}
                  className="w-full rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-3 py-2 text-xs text-[#FDFDF5] focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#E1E1D5] mb-1">
                    {t('settings.applicantId', 'BIS Applicant Registration Number')}
                  </label>
                  <input
                    type="text"
                    value={profileForm.applicantId}
                    onChange={(e) => setProfileForm({ ...profileForm, applicantId: e.target.value })}
                    className="w-full rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-3 py-2 text-xs text-[#FDFDF5] font-mono focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#E1E1D5] mb-1">
                    {t('settings.email', 'Notification Email')}
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-3 py-2 text-xs text-[#FDFDF5] font-mono focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E1E1D5] mb-1">
                  {t('settings.role', 'Professional Role & Authority')}
                </label>
                <input
                  type="text"
                  value={profileForm.role}
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                  className="w-full rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-3 py-2 text-xs text-[#FDFDF5] focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E1E1D5] mb-1">
                  {t('settings.licenseTier', 'Conformity Scheme Registration')}
                </label>
                <input
                  type="text"
                  value={profileForm.licenseTier}
                  onChange={(e) => setProfileForm({ ...profileForm, licenseTier: e.target.value })}
                  className="w-full rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-3 py-2 text-xs text-[#FDFDF5] focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              {/* Account Connection & Switcher */}
              <div className="pt-3 border-t border-[rgba(170,167,133,0.20)]">
                <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#2A2E28]/80 p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#FDFDF5] block">
                        Google / Gmail Authentication
                      </span>
                      <span className="text-[11px] text-[#AAA785] font-mono">
                        {userProfile ? userProfile.email : 'No account currently connected'}
                      </span>
                    </div>
                    {userProfile && (
                      <span className="rounded bg-[#233A23] text-[#E1E1D5] text-[10px] font-bold px-2 py-0.5 border border-[rgba(170,167,133,0.35)]">
                        Signed In
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenAuth?.('switch_account');
                      }}
                      className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      <span>{userProfile ? 'Switch / Add Another Gmail' : 'Sign in with Google'}</span>
                    </button>

                    {userProfile && onLogout && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onLogout();
                        }}
                        className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-[#232323] hover:bg-red-50 text-red-600 px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign out</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#2A2E28]">
                <div className="pr-4">
                  <span className="text-xs font-bold text-[#FDFDF5] block leading-snug">
                    {t('settings.qcoNotifications', 'Mandatory QCO Gazetted Notification Alerts')}
                  </span>
                  <p className="text-[11px] text-[#AAA785] leading-normal mt-0.5">
                    Receive instant alerts whenever the Government of India / DPIIT notifies new Quality Control Orders under BIS.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settingsForm.qcoAlerts}
                  onChange={(e) => setSettingsForm({ ...settingsForm, qcoAlerts: e.target.checked })}
                  className="h-4 w-4 rounded border-[rgba(170,167,133,0.30)] text-[#AAA785] focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#2A2E28]">
                <div className="pr-4">
                  <span className="text-xs font-bold text-[#FDFDF5] block leading-snug">
                    {t('settings.emailNotifications', 'License Renewal & Audit Reminders')}
                  </span>
                  <p className="text-[11px] text-[#AAA785] leading-normal mt-0.5">
                    Get scheduled reminders 60 days before annual BIS CM/L license renewal and calibration expirations.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settingsForm.emailNotifications}
                  onChange={(e) => setSettingsForm({ ...settingsForm, emailNotifications: e.target.checked })}
                  className="h-4 w-4 rounded border-[rgba(170,167,133,0.30)] text-[#AAA785] focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#2A2E28]">
                <div className="pr-4">
                  <span className="text-xs font-bold text-[#FDFDF5] block leading-snug">
                    {t('settings.autoSaveChats', 'Automatic Conversation History Synchronization')}
                  </span>
                  <p className="text-[11px] text-[#AAA785] leading-normal mt-0.5">
                    Preserve multi-turn conversations and attached test report scrutinies across browser sessions.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settingsForm.autoSaveChats}
                  onChange={(e) => setSettingsForm({ ...settingsForm, autoSaveChats: e.target.checked })}
                  className="h-4 w-4 rounded border-[rgba(170,167,133,0.30)] text-[#AAA785] focus:ring-blue-500 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-[rgba(170,167,133,0.20)] bg-[#2A2E28] px-5 py-3 shrink-0">
          <div>
            {saveToast && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#E1E1D5] bg-[#2A2E28] px-2 py-1 rounded border border-[rgba(170,167,133,0.25)]">
                <Check className="h-3.5 w-3.5" />
                {t('settings.savedSuccess', 'Settings saved successfully!')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[rgba(170,167,133,0.20)] bg-[#232323] px-3 py-1.5 text-xs font-semibold text-[#E1E1D5] hover:bg-[#2A2E28] transition-colors cursor-pointer"
            >
              {t('common.cancel', 'Cancel')}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-[#232323] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#E1E1D5] hover:text-[#232323] transition-colors cursor-pointer shadow-2xs"
            >
              {t('common.saveChanges', 'Save Changes')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
