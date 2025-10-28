import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type SupportedLanguage = 'id' | 'en';
export type SupportedTheme = 'twilight' | 'daylight' | 'sakura';

interface SettingsContextValue {
  language: SupportedLanguage;
  theme: SupportedTheme;
  setLanguage: (language: SupportedLanguage) => void;
  setTheme: (theme: SupportedTheme) => void;
  languageOptions: Array<{ value: SupportedLanguage; label: string }>;
  themeOptions: Array<{ value: SupportedTheme; label: string; description: string }>;
}

const languageOptions: SettingsContextValue['languageOptions'] = [
  { value: 'id', label: 'Bahasa Indonesia' },
  { value: 'en', label: 'English' },
];

const themeOptions: SettingsContextValue['themeOptions'] = [
  { value: 'twilight', label: 'Twilight', description: 'Calming dark theme.' },
  { value: 'daylight', label: 'Daylight', description: 'Bright theme with soft blues.' },
  { value: 'sakura', label: 'Sakura', description: 'Pastel pink study vibes.' },
];

const STORAGE_KEYS = {
  language: 'bunpou.language',
  theme: 'bunpou.theme',
} as const;

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

function getInitialSetting<T extends string>(key: keyof typeof STORAGE_KEYS, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const stored = window.localStorage.getItem(STORAGE_KEYS[key]);
  return stored ? (stored as T) : fallback;
}

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(() => getInitialSetting('language', 'id'));
  const [theme, setTheme] = useState<SupportedTheme>(() => getInitialSetting('theme', 'twilight'));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEYS.language, language);
    }
  }, [language]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEYS.theme, theme);
    }

    if (typeof document !== 'undefined') {
      document.body.dataset.theme = theme;
    }
  }, [theme]);

  const value = useMemo<SettingsContextValue>(
    () => ({
      language,
      theme,
      setLanguage,
      setTheme,
      languageOptions,
      themeOptions,
    }),
    [language, theme]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}

export { SettingsProvider };
