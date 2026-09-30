import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { UserProfile } from '../types/index.ts';
import firebaseConfig from '../../firebase-applet-config.json';

export const STORAGE_KEY_PROFILE = 'bis_sahayak_user_profile_v2';
export const STORAGE_KEY_SAVED_ACCOUNTS = 'bis_sahayak_saved_accounts_v2';
export const STORAGE_KEY_LOGGED_OUT = 'bis_sahayak_logged_out_flag_v2';

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Configure Google Provider to always prompt for account selection
// This ensures users can select another account or add a new Gmail account!
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export interface SavedAccountItem {
  name: string;
  email: string;
  avatarUrl?: string;
  organization?: string;
  applicantId: string;
  lastActive: string;
}

/**
 * Deterministic applicant ID based on email
 */
function generateApplicantId(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = (hash << 5) - hash + email.charCodeAt(i);
    hash |= 0;
  }
  const num = Math.abs(hash) % 9000 + 1000;
  return `BIS/2026/DL-${num}`;
}

export const INITIAL_SAVED_ACCOUNTS: SavedAccountItem[] = [
  {
    name: 'Hruthik Reddy',
    email: 'ihruthikreddy836@gmail.com',
    organization: 'Apex Consumer Tech & Appliances Ltd.',
    applicantId: 'BIS/2026/DL-8360',
    lastActive: 'Active account'
  },
  {
    name: 'Ruthik Reddy',
    email: 'ihruthikreddy1599@gmail.com',
    organization: 'Apex Consumer Tech & Appliances Ltd.',
    applicantId: 'BIS/2026/DL-9942',
    lastActive: 'Previous session'
  }
];

export function getSavedAccounts(): SavedAccountItem[] {
  if (typeof window === 'undefined') return INITIAL_SAVED_ACCOUNTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVED_ACCOUNTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_SAVED_ACCOUNTS, JSON.stringify(INITIAL_SAVED_ACCOUNTS));
      return INITIAL_SAVED_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SAVED_ACCOUNTS;
  } catch {
    return INITIAL_SAVED_ACCOUNTS;
  }
}

export function saveAccountToList(account: SavedAccountItem): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getSavedAccounts();
    const filtered = existing.filter((a) => a.email.toLowerCase() !== account.email.toLowerCase());
    const updated = [account, ...filtered].slice(0, 10);
    localStorage.setItem(STORAGE_KEY_SAVED_ACCOUNTS, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save account to list:', err);
  }
}

export function removeAccountFromList(email: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getSavedAccounts();
    const updated = existing.filter((a) => a.email.toLowerCase() !== email.toLowerCase());
    localStorage.setItem(STORAGE_KEY_SAVED_ACCOUNTS, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to remove account from list:', err);
  }
}

/**
 * Build UserProfile from Google User or Email details
 */
export function buildUserProfileFromDetails(
  email: string,
  name?: string,
  avatarUrl?: string,
  organization?: string,
  role?: string,
  applicantId?: string
): UserProfile {
  const derivedName = name || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const derivedApplicantId = applicantId || generateApplicantId(email);

  return {
    name: derivedName,
    email: email.trim().toLowerCase(),
    organization: organization || 'Apex Consumer Tech & Appliances Ltd.',
    role: role || 'Quality Assurance & Regulatory Compliance Lead',
    applicantId: derivedApplicantId,
    licenseTier: 'Scheme-I (ISI Mark) & CRS Active Applicant',
    avatarUrl: avatarUrl || undefined,
    joinedDate: 'January 2026'
  };
}

/**
 * Get current active user profile, or null if logged out
 */
export function getActiveUserProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const isLoggedOut = localStorage.getItem(STORAGE_KEY_LOGGED_OUT);
    if (isLoggedOut === 'true') {
      return null;
    }
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (!raw || raw === 'null') {
      // Default to initial active profile
      const defaultProfile = buildUserProfileFromDetails(
        'ihruthikreddy836@gmail.com',
        'Hruthik Reddy',
        undefined,
        'Apex Consumer Tech & Appliances Ltd.',
        'Quality Assurance & Regulatory Compliance Lead',
        'BIS/2026/DL-8360'
      );
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(defaultProfile));
      return defaultProfile;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Save active user profile and persist session
 */
export function setActiveUserProfile(profile: UserProfile | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (profile === null) {
      localStorage.setItem(STORAGE_KEY_LOGGED_OUT, 'true');
      localStorage.removeItem(STORAGE_KEY_PROFILE);
    } else {
      localStorage.removeItem(STORAGE_KEY_LOGGED_OUT);
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
      saveAccountToList({
        name: profile.name,
        email: profile.email,
        avatarUrl: profile.avatarUrl,
        organization: profile.organization,
        applicantId: profile.applicantId,
        lastActive: 'Just now'
      });
    }
  } catch (err) {
    console.warn('Failed to set active user profile:', err);
  }
}

/**
 * Sign In with Google Popup (Firebase Auth)
 */
export async function signInWithGooglePopup(): Promise<{
  success: boolean;
  profile?: UserProfile;
  error?: string;
}> {
  try {
    // Ensure select_account is enforced every time
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });

    const result = await signInWithPopup(auth, googleProvider);
    const user: User = result.user;

    if (!user.email) {
      throw new Error('No email returned from Google authentication.');
    }

    const profile = buildUserProfileFromDetails(
      user.email,
      user.displayName || undefined,
      user.photoURL || undefined
    );

    setActiveUserProfile(profile);
    return { success: true, profile };
  } catch (err: any) {
    console.error('Google Sign-In Error:', err);
    return {
      success: false,
      error: err?.message || 'Google Sign-In failed or popup was closed.'
    };
  }
}

/**
 * Sign In with custom / direct Gmail address (allows adding another Gmail seamlessly)
 */
export async function signInWithGmailAddress(
  email: string,
  name?: string,
  organization?: string
): Promise<{ success: boolean; profile?: UserProfile; error?: string }> {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !trimmed.includes('@')) {
    return { success: false, error: 'Please enter a valid Gmail address.' };
  }

  const profile = buildUserProfileFromDetails(
    trimmed,
    name,
    undefined,
    organization
  );

  setActiveUserProfile(profile);
  return { success: true, profile };
}

/**
 * Switch to an existing saved account
 */
export async function switchActiveAccount(email: string): Promise<UserProfile | null> {
  const accounts = getSavedAccounts();
  const found = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
  if (found) {
    const profile = buildUserProfileFromDetails(
      found.email,
      found.name,
      found.avatarUrl,
      found.organization,
      undefined,
      found.applicantId
    );
    setActiveUserProfile(profile);
    return profile;
  }
  return null;
}

/**
 * Sign Out current user
 */
export async function signOutCurrentUser(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (err) {
    console.warn('Firebase signOut error:', err);
  } finally {
    setActiveUserProfile(null);
  }
}
