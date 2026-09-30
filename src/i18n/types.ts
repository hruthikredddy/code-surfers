export type SupportedLanguageCode = 'en' | 'hi' | 'te' | 'ta' | 'kn';

export type LanguageSelectionMode = 'auto' | 'manual';

export interface LanguageDefinition {
  code: SupportedLanguageCode;
  name: string;
  nativeName: string;
  script: string;
  direction: 'ltr' | 'rtl';
  region: string;
  localePrefixes: string[];
}

export type TranslationKey = string;
export type TranslationDictionary = Record<string, string>;
