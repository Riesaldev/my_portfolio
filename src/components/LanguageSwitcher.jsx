import { useState } from 'react';
import { useI18n } from '@/components/I18nProvider';
import { useLanguageSwitcher } from '@/hooks/useLanguageSwitcher';

export default function LanguageSwitcher({ className = '' }) {
  const { t } = useI18n();
  const { switchLanguage, getCurrentLanguage, getAvailableLanguages } = useLanguageSwitcher();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (locale) => {
    switchLanguage(locale);
    setIsOpen(false);
  };

  const currentLang = getCurrentLanguage();
  const availableLanguages = getAvailableLanguages();
  const currentLanguageInfo = availableLanguages.find(lang => lang.code === currentLang);

  return (
    <div className={`relative z-50 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 relative z-50"
        aria-label={t('language.switch')}
      >
        <span className="text-sm">{currentLanguageInfo?.flag}</span>
        <span className="text-sm font-medium">{currentLanguageInfo?.code.toUpperCase()}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[100]">
          <div className="py-2">
            {availableLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 ${
                  currentLang === language.code 
                    ? 'bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-base">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
                {currentLang === language.code && (
                  <span className="ml-auto text-purple-600 dark:text-purple-400">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
