import React, { useEffect, useRef, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import type { SupportedLanguage, SupportedTheme } from '../context/SettingsContext';
import { useTranslation } from '../src/i18n';

const SettingsPanel: React.FC = () => {
  const { language, theme, setLanguage, setTheme, languageOptions, themeOptions } = useSettings();
  const { t, get } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const languageDescriptions = get<Record<SupportedLanguage, string>>('settings.languageDescriptions');
  const themeDescriptions = get<Record<SupportedTheme, string>>('settings.themeDescriptions');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="pill-button text-[0.6rem]"
      >
        {t('settings.buttonLabel')}
      </button>

      {isOpen && (
        <div className="glass-panel absolute right-0 mt-3 w-80 space-y-5 p-6 text-sm text-muted shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-strong">{t('settings.title')}</h3>
              <p className="mt-1 text-xs text-muted">{t('settings.description')}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="pill-button text-[0.55rem] tracking-[0.3em]"
            >
              {t('settings.closeLabel')}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                {t('settings.languageLabel')}
              </p>
              <div className="mt-3 space-y-2">
                {languageOptions.map((option) => {
                  const isActive = language === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-3 py-3 transition ${
                        isActive ? 'border-strong bg-surface' : 'border-soft bg-surface-soft'
                      }`}
                    >
                      <input
                        type="radio"
                        name="interface-language"
                        value={option.value}
                        checked={isActive}
                        onChange={() => setLanguage(option.value)}
                        className="mt-1 h-4 w-4"
                        style={{ accentColor: 'var(--accent)' }}
                      />
                      <div>
                        <span className="text-sm font-semibold text-strong">{option.label}</span>
                        <p className="mt-1 text-xs text-muted">{languageDescriptions[option.value]}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                {t('settings.themeLabel')}
              </p>
              <div className="mt-3 space-y-2">
                {themeOptions.map((option) => {
                  const isActive = theme === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-3 py-3 transition ${
                        isActive ? 'border-strong bg-surface' : 'border-soft bg-surface-soft'
                      }`}
                    >
                      <input
                        type="radio"
                        name="theme"
                        value={option.value}
                        checked={isActive}
                        onChange={() => setTheme(option.value)}
                        className="mt-1 h-4 w-4"
                        style={{ accentColor: 'var(--accent)' }}
                      />
                      <div>
                        <span className="text-sm font-semibold text-strong">{option.label}</span>
                        <p className="mt-1 text-xs text-muted">{themeDescriptions[option.value]}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
