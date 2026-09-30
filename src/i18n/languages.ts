import { LanguageDefinition, SupportedLanguageCode } from './types.ts';

export const SUPPORTED_LANGUAGES: LanguageDefinition[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    script: 'Latin',
    direction: 'ltr',
    region: 'Pan-India / International',
    localePrefixes: ['en', 'en-in', 'en-us', 'en-gb']
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'Devanagari',
    direction: 'ltr',
    region: 'North & Central India',
    localePrefixes: ['hi', 'hi-in']
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telugu',
    direction: 'ltr',
    region: 'Andhra Pradesh, Telangana',
    localePrefixes: ['te', 'te-in']
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil',
    direction: 'ltr',
    region: 'Tamil Nadu, Puducherry',
    localePrefixes: ['ta', 'ta-in', 'ta-lk', 'ta-sg']
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    script: 'Kannada',
    direction: 'ltr',
    region: 'Karnataka',
    localePrefixes: ['kn', 'kn-in']
  }
];

export const LANGUAGE_MAP = new Map<SupportedLanguageCode, LanguageDefinition>(
  SUPPORTED_LANGUAGES.map((lang) => [lang.code, lang])
);

/**
 * Detects the preferred language from browser/device navigator.languages
 * Falls back to 'en' if not one of the 5 supported languages
 */
export function detectBrowserLanguage(): SupportedLanguageCode {
  if (typeof window === 'undefined' || !window.navigator) {
    return 'en';
  }

  const browserLocales: string[] = [];
  if (Array.isArray(window.navigator.languages)) {
    browserLocales.push(...window.navigator.languages);
  }
  if (window.navigator.language) {
    browserLocales.push(window.navigator.language);
  }

  for (const rawLocale of browserLocales) {
    const normalized = rawLocale.toLowerCase().trim();
    for (const lang of SUPPORTED_LANGUAGES) {
      if (lang.localePrefixes.some((prefix) => normalized === prefix || normalized.startsWith(prefix + '-'))) {
        return lang.code;
      }
    }
  }

  return 'en';
}
