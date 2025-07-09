import { useI18n } from '@/components/I18nProvider';

export function useLanguageSwitcher() {
  const { locale, switchLanguage } = useI18n();

  const handleLanguageSwitch = (newLocale) => {
    switchLanguage(newLocale);
  };

  const getCurrentLanguage = () => {
    return locale;
  };

  const getAvailableLanguages = () => {
    return [
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'en', name: 'English', flag: '🇺🇸' }
    ];
  };

  return {
    switchLanguage: handleLanguageSwitch,
    getCurrentLanguage,
    getAvailableLanguages,
    currentLanguage: getCurrentLanguage()
  };
}
