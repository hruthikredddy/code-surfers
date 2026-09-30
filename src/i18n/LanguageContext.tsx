import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  SupportedLanguageCode,
  LanguageDefinition,
  LanguageSelectionMode
} from './types.ts';
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_MAP,
  detectBrowserLanguage
} from './languages.ts';
import { translate } from './index.ts';

interface LanguageContextType {
  currentLanguage: SupportedLanguageCode;
  languageInfo: LanguageDefinition;
  direction: 'ltr' | 'rtl';
  isRTL: boolean;
  selectionMode: LanguageSelectionMode;
  setLanguage: (code: SupportedLanguageCode, mode?: LanguageSelectionMode) => void;
  resetToAutoDetect: () => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY_LANG = 'bis_sahayak_lang_v2';
const STORAGE_KEY_MODE = 'bis_sahayak_lang_mode_v2';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<SupportedLanguageCode>('en');
  const [selectionMode, setSelectionMode] = useState<LanguageSelectionMode>('auto');

  // Initialize from storage or browser auto-detection
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem(STORAGE_KEY_MODE) as LanguageSelectionMode | null;
      const savedLang = localStorage.getItem(STORAGE_KEY_LANG) as SupportedLanguageCode | null;

      if (savedMode === 'manual' && savedLang && LANGUAGE_MAP.has(savedLang)) {
        setCurrentLanguageState(savedLang);
        setSelectionMode('manual');
      } else {
        const autoDetected = detectBrowserLanguage();
        setCurrentLanguageState(autoDetected);
        setSelectionMode('auto');
      }
    } catch {
      setCurrentLanguageState('en');
      setSelectionMode('auto');
    }
  }, []);

  const languageInfo = useMemo(() => {
    return LANGUAGE_MAP.get(currentLanguage) || LANGUAGE_MAP.get('en')!;
  }, [currentLanguage]);

  const direction = languageInfo.direction;
  const isRTL = direction === 'rtl';

  // Apply HTML lang, dir, and data-lang attributes to root document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLanguage;
      document.documentElement.dir = direction;
      document.documentElement.dataset.lang = currentLanguage;
    }
  }, [currentLanguage, direction]);

  const setLanguage = useCallback((code: SupportedLanguageCode, mode: LanguageSelectionMode = 'manual') => {
    if (LANGUAGE_MAP.has(code)) {
      setCurrentLanguageState(code);
      setSelectionMode(mode);
      try {
        localStorage.setItem(STORAGE_KEY_LANG, code);
        localStorage.setItem(STORAGE_KEY_MODE, mode);
      } catch {
        // Storage access gracefully handled
      }
    }
  }, []);

  const resetToAutoDetect = useCallback(() => {
    const detected = detectBrowserLanguage();
    setCurrentLanguageState(detected);
    setSelectionMode('auto');
    try {
      localStorage.removeItem(STORAGE_KEY_LANG);
      localStorage.setItem(STORAGE_KEY_MODE, 'auto');
    } catch {
      // Storage access gracefully handled
    }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const translated = translate(key, currentLanguage);
      if (translated === key && fallback) {
        return fallback;
      }
      return translated;
    },
    [currentLanguage]
  );

  const value = useMemo(
    () => ({
      currentLanguage,
      languageInfo,
      direction,
      isRTL,
      selectionMode,
      setLanguage,
      resetToAutoDetect,
      t
    }),
    [currentLanguage, languageInfo, direction, isRTL, selectionMode, setLanguage, resetToAutoDetect, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
