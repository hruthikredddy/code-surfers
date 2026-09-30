import { ShieldCheck, Award, Building2, User, Sparkles, LogIn } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { UserProfile } from '../../types/index.ts';

interface UserProfileHeaderProps {
  userProfile?: UserProfile | null;
  onOpenSettings: () => void;
  onOpenCopilot: () => void;
  onOpenAuth?: (mode?: 'signin' | 'switch_account' | 'add_account') => void;
}

export function UserProfileHeader({ userProfile, onOpenSettings, onOpenCopilot, onOpenAuth }: UserProfileHeaderProps) {
  const { t } = useLanguage();

  if (!userProfile) {
    return (
      <div className="rounded-2xl border border-[rgba(170,167,133,0.22)] bg-[#232323] p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#232323] border border-[rgba(170,167,133,0.25)] text-[#AAA785] font-bold text-lg shadow-sm shrink-0">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#FDFDF5] leading-snug">
              Welcome to BIS Sahayak
            </h2>
            <p className="text-xs text-[#E1E1D5] mt-1 max-w-xl">
              Sign in with your Google or official Gmail account to track your organization's testing certificates, Indian Standards compliance, and regulatory deadlines.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onOpenAuth?.('signin')}
          className="flex items-center gap-2 rounded-xl bg-[#AAA785] hover:bg-[#E1E1D5] text-[#232323] hover:-translate-y-px transition-all shadow-sm font-bold text-xs py-2.5 px-4 shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <LogIn className="h-4 w-4" />
          <span>Sign In with Google</span>
        </button>
      </div>
    );
  }

  // Get initials
  const initials = userProfile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-2xl border border-[rgba(170,167,133,0.22)] bg-[#232323] p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* User Info & Identity */}
        <div className="flex items-start gap-4">
          {/* Avatar with BIS Verification Ring */}
          <div className="relative shrink-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#232323] border border-[rgba(170,167,133,0.25)] text-[#AAA785] font-bold text-lg shadow-sm">
              {initials}
            </div>
            <div
              className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#AAA785] text-[#232323] border-2 border-[#232323] shadow-2xs font-bold"
              title={t('dashboard.verifiedApplicant', 'Verified BIS Applicant')}
            >
              <ShieldCheck className="h-3 w-3" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold text-[#FDFDF5] leading-snug">
                {t('dashboard.welcomeBack', 'Welcome back,')} {userProfile.name}
              </h2>
              <span className="rounded bg-[#232323] px-2 py-0.5 text-[10px] font-semibold text-[#AAA785] border border-[#AAA785]/30">
                {userProfile.applicantId}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-[#E1E1D5]">
              <span className="flex items-center gap-1 font-medium text-[#FDFDF5]">
                <Building2 className="h-3.5 w-3.5 text-[#AAA785] shrink-0" />
                {userProfile.organization}
              </span>
              <span>•</span>
              <span className="text-[#E1E1D5]">{userProfile.role}</span>
              <span>•</span>
              <span className="text-[#AAA785] font-mono text-[11px]">{userProfile.email}</span>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#232323] px-2.5 py-0.5 text-[11px] font-medium text-[#E1E1D5] border border-[rgba(170,167,133,0.20)]">
                <Award className="h-3 w-3 text-[#AAA785]" />
                <span>{userProfile.licenseTier}</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#233A23] px-2.5 py-0.5 text-[11px] font-medium text-[#AAA785] border border-[#AAA785]/25">
                <span className="h-1.5 w-1.5 rounded-full bg-[#AAA785]"></span>
                <span>Active QCO Surveillance 2026</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-[rgba(170,167,133,0.20)] gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCopilot}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#AAA785] text-[#232323] px-4 py-2 text-xs font-bold hover:bg-[#E1E1D5] transition-colors cursor-pointer shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#232323]" />
            <span>{t('dashboard.launchCopilot', 'Certification Copilot')}</span>
          </button>

          <span className="text-[11px] text-[#AAA785] font-medium">
            {t('dashboard.workspaceStatus', 'Workspace: All Systems Operational')}
          </span>
        </div>
      </div>
    </div>
  );
}
