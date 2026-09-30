import { SupportedLanguageCode, TranslationDictionary } from './types.ts';
import { SUPPORTED_LANGUAGES, LANGUAGE_MAP, detectBrowserLanguage } from './languages.ts';
import { en } from './locales/en.ts';
import { hi } from './locales/hi.ts';
import { te } from './locales/te.ts';
import { ta } from './locales/ta.ts';
import { kn } from './locales/kn.ts';

export * from './types.ts';
export * from './languages.ts';

export const DICTIONARIES: Record<SupportedLanguageCode, TranslationDictionary> = {
  en,
  hi,
  te,
  ta,
  kn
};

/**
 * Returns translated string for key, falling back to English if missing in target locale
 */
export function translate(key: string, lang: SupportedLanguageCode): string {
  const dict = DICTIONARIES[lang];
  if (dict && dict[key]) {
    return dict[key];
  }
  // Fallback to English
  if (en[key]) {
    return en[key];
  }
  // If not found in English, return key itself
  return key;
}
