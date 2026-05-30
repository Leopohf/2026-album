import React from 'react';
import { Locale, LOCALES } from '../../i18n/types';

interface LangSwitcherProps {
  currentLocale: Locale;
  onSwitch: (locale: Locale) => void;
}

export const LangSwitcher: React.FC<LangSwitcherProps> = ({ currentLocale, onSwitch }) => {
  return (
    <div
      className="flex items-center gap-1 font-mono"
      role="group"
      aria-label="Language selector"
    >
      {LOCALES.map((locale, index) => (
        <React.Fragment key={locale.value}>
          {index > 0 && (
            <span className="text-[10px] text-muted select-none" aria-hidden="true">
              |
            </span>
          )}
          <button
            onClick={() => onSwitch(locale.value)}
            aria-pressed={currentLocale === locale.value}
            aria-label={`Switch language to ${locale.label}`}
            className={`text-[10px] font-bold tracking-widest px-1 transition-colors duration-150 ${
              currentLocale === locale.value
                ? 'text-ink underline'
                : 'text-muted hover:text-ink'
            }`}
          >
            {locale.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};
