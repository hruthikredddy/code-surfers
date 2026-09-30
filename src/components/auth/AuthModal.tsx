import { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Building2,
  Mail,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { UserProfile } from '../../types/index.ts';
import {
  signInWithGooglePopup,
  signInWithGmailAddress,
  getSavedAccounts,
  switchActiveAccount,
  removeAccountFromList,
  SavedAccountItem
} from '../../services/firebaseAuth.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (profile: UserProfile) => void;
  initialMode?: 'signin' | 'switch_account' | 'add_account';
}

export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'signin'
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'google' | 'direct' | 'saved'>('google');
  const [gmailInput, setGmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [orgInput, setOrgInput] = useState('Apex Consumer Tech & Appliances Ltd.');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedAccounts, setSavedAccounts] = useState<SavedAccountItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      setIsLoading(false);
      const accounts = getSavedAccounts();
      setSavedAccounts(accounts);
      if (initialMode === 'switch_account' && accounts.length > 0) {
        setActiveTab('saved');
      } else if (initialMode === 'add_account') {
        setActiveTab('direct');
      } else {
        setActiveTab('google');
      }
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await signInWithGooglePopup();
      if (res.success && res.profile) {
        onSuccess(res.profile);
        onClose();
      } else {
        // If popup was blocked or failed, give a friendly prompt and suggest direct Gmail entry
        setErrorMessage(
          res.error || 'Google Sign-In popup could not complete. You can also sign in directly with your Gmail address below.'
        );
        setActiveTab('direct');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication error. Please try direct Gmail sign-in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectGmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gmailInput.trim() || !gmailInput.includes('@')) {
      setErrorMessage('Please enter a valid Gmail or Google account address.');
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await signInWithGmailAddress(
        gmailInput.trim(),
        nameInput.trim() || undefined,
        orgInput.trim() || undefined
      );
      if (res.success && res.profile) {
        onSuccess(res.profile);
        onClose();
      } else {
        setErrorMessage(res.error || 'Could not sign in with this Gmail address.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchAccount = async (email: string) => {
    setIsLoading(true);
    try {
      const profile = await switchActiveAccount(email);
      if (profile) {
        onSuccess(profile);
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to switch account.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAccount = (e: React.MouseEvent, email: string) => {
    e.stopPropagation();
    removeAccountFromList(email);
    setSavedAccounts(getSavedAccounts());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[rgba(170,167,133,0.25)] bg-[#232323] text-[#FDFDF5] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[rgba(170,167,133,0.20)] px-6 py-4 bg-[#232323]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#232323] border border-[#AAA785]/30 text-[#AAA785]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 id="auth-modal-title" className="text-base font-bold text-[#FDFDF5]">
                {initialMode === 'switch_account'
                  ? 'Switch or Add Gmail Account'
                  : 'Sign in to BIS Sahayak'}
              </h2>
              <p className="text-[11px] text-[#E1E1D5]">
                Official National Standards & Certification Advisory System
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#E1E1D5] hover:bg-[#232323] hover:text-[#FDFDF5] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-3 border-b border-[rgba(170,167,133,0.20)] bg-[#2A3328]/60 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('google');
              setErrorMessage(null);
            }}
            className={`py-2.5 px-3 border-b-2 text-center transition-colors cursor-pointer ${
              activeTab === 'google'
                ? 'border-[#AAA785] text-[#AAA785] bg-[#232323]/50'
                : 'border-transparent text-[#E1E1D5] hover:text-[#FDFDF5] hover:bg-[#232323]/20'
            }`}
          >
            Google Sign-In
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('direct');
              setErrorMessage(null);
            }}
            className={`py-2.5 px-3 border-b-2 text-center transition-colors cursor-pointer ${
              activeTab === 'direct'
                ? 'border-[#AAA785] text-[#AAA785] bg-[#232323]/50'
                : 'border-transparent text-[#E1E1D5] hover:text-[#FDFDF5] hover:bg-[#232323]/20'
            }`}
          >
            Add / Enter Gmail
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('saved');
              setErrorMessage(null);
            }}
            className={`py-2.5 px-3 border-b-2 text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'saved'
                ? 'border-[#AAA785] text-[#AAA785] bg-[#232323]/50'
                : 'border-transparent text-[#E1E1D5] hover:text-[#FDFDF5] hover:bg-[#232323]/20'
            }`}
          >
            <span>Saved Accounts</span>
            {savedAccounts.length > 0 && (
              <span className="rounded-full bg-[#2A2E28] px-1.5 py-0.2 text-[10px] text-[#AAA785]">
                {savedAccounts.length}
              </span>
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Error Banner */}
          {errorMessage && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold block">Authentication Notice</span>
                <span className="text-[11px] text-red-300/90">{errorMessage}</span>
              </div>
            </div>
          )}

          {/* TAB 1: GOOGLE SIGN-IN */}
          {activeTab === 'google' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] p-4 text-center">
                <p className="text-xs text-[#E1E1D5] mb-4 leading-relaxed">
                  Sign in or switch between accounts with Google. You can choose any existing Gmail or click{' '}
                  <strong className="text-[#FDFDF5]">"Use another account"</strong> in the Google prompt to add a new Gmail.
                </p>

                {/* Google Sign-in Button */}
                <button
                  type="button"
                  id="google-signin-popup-button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 rounded-xl bg-[#232323] hover:bg-[#2A2E28] text-[#FDFDF5] font-semibold text-sm py-3 px-4 shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group border border-[rgba(170,167,133,0.20)]"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin text-[#E1E1D5]" />
                  ) : (
                    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.67v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.16z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.37 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.98 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                  )}
                  <span>{isLoading ? 'Connecting to Google...' : 'Sign in with Google / Gmail'}</span>
                </button>
              </div>

              {/* Quick direct option shortcut */}
              <div className="flex items-center justify-between text-xs text-[#AAA785] px-1">
                <span>Want to type a specific Gmail directly?</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('direct')}
                  className="text-[#AAA785] hover:underline font-semibold cursor-pointer"
                >
                  Enter Gmail address &rarr;
                </button>
              </div>

              {/* Notice */}
              <div className="rounded-xl border border-[rgba(170,167,133,0.18)] bg-[#2A3328]/40 p-3 text-[11px] text-[#E1E1D5] space-y-1">
                <span className="font-semibold text-[#FDFDF5] block">BIS Certified Applicant Access</span>
                <p>
                  Connecting your verified Gmail links your laboratory test reports, QCO mandatory alerts, and product certification roadmaps.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: DIRECT GMAIL INPUT / ADD ANOTHER GMAIL */}
          {activeTab === 'direct' && (
            <form onSubmit={handleDirectGmailSignIn} className="space-y-3.5">
              <p className="text-xs text-[#E1E1D5]">
                Enter any Gmail address or Google Workspace email to sign in or add a new account session.
              </p>

              <div>
                <label className="block text-xs font-semibold text-[#E1E1D5] mb-1">
                  Gmail / Google Account Address <span className="text-[#AAA785]">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[#AAA785]" />
                  <input
                    type="email"
                    required
                    value={gmailInput}
                    onChange={(e) => setGmailInput(e.target.value)}
                    placeholder="e.g. ihruthikreddy836@gmail.com"
                    className="w-full rounded-xl border border-[rgba(170,167,133,0.25)] bg-[#232323] pl-9 pr-3 py-2 text-xs text-[#FDFDF5] placeholder:text-[#AAA785] focus:border-[#AAA785] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#E1E1D5] mb-1">
                    Contact / Applicant Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-[#AAA785]" />
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="e.g. Hruthik Reddy"
                      className="w-full rounded-xl border border-[rgba(170,167,133,0.25)] bg-[#232323] pl-9 pr-3 py-2 text-xs text-[#FDFDF5] placeholder:text-[#AAA785] focus:border-[#AAA785] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#E1E1D5] mb-1">
                    Manufacturing Entity / Company
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-[#AAA785]" />
                    <input
                      type="text"
                      value={orgInput}
                      onChange={(e) => setOrgInput(e.target.value)}
                      placeholder="e.g. Apex Consumer Tech Ltd."
                      className="w-full rounded-xl border border-[rgba(170,167,133,0.25)] bg-[#232323] pl-9 pr-3 py-2 text-xs text-[#FDFDF5] placeholder:text-[#AAA785] focus:border-[#AAA785] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !gmailInput.trim()}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#AAA785] hover:bg-[#E1E1D5] text-[#232323] hover:-translate-y-px transition-all shadow-sm font-bold text-xs py-2.5 px-4 shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
                <span>Sign in & Switch to this Gmail</span>
              </button>
            </form>
          )}

          {/* TAB 3: SAVED ACCOUNTS LIST */}
          {activeTab === 'saved' && (
            <div className="space-y-3">
              <p className="text-xs text-[#E1E1D5]">
                Select an account to switch your session, or remove previous accounts:
              </p>

              {savedAccounts.length === 0 ? (
                <div className="p-4 text-center text-xs text-[#AAA785] border border-dashed border-[rgba(170,167,133,0.20)] rounded-xl">
                  No other saved accounts. Use Google Sign-In or "Add / Enter Gmail" to add one.
                </div>
              ) : (
                <div className="space-y-2">
                  {savedAccounts.map((account) => {
                    const initials = account.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .substring(0, 2)
                      .toUpperCase();

                    return (
                      <div
                        key={account.email}
                        onClick={() => handleSwitchAccount(account.email)}
                        className="flex items-center justify-between p-3 rounded-xl border border-[rgba(170,167,133,0.20)] bg-[#232323] hover:border-[#AAA785]/40 hover:bg-[#232323] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A3328] border border-[rgba(170,167,133,0.25)] text-[#AAA785] font-bold text-xs">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-[#FDFDF5] truncate">
                                {account.name}
                              </span>
                              <span className="rounded bg-[#2A3328] px-1.5 py-0.2 text-[9.5px] font-mono text-[#AAA785]">
                                {account.applicantId}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#E1E1D5] font-mono block truncate">
                              {account.email}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => handleRemoveAccount(e, account.email)}
                            title="Remove account from saved list"
                            className="p-1.5 rounded-lg text-[#AAA785] hover:text-red-400 hover:bg-[#2A3328] transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-xs font-semibold text-[#AAA785] group-hover:translate-x-0.5 transition-transform">
                            Switch &rarr;
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <button
                type="button"
                onClick={() => setActiveTab('direct')}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-[rgba(170,167,133,0.25)] hover:border-[#AAA785]/50 bg-[#2A3328]/40 p-2.5 text-xs text-[#AAA785] font-semibold transition-colors cursor-pointer mt-3"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add another Gmail account</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[rgba(170,167,133,0.20)] px-6 py-3 bg-[#232323] flex items-center justify-between text-[11px] text-[#AAA785]">
          <span>Protected under BIS Act 2016</span>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-[#FDFDF5] transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
