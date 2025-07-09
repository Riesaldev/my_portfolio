'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const I18nContext = createContext();

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('es');
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const loadTranslations = async (newLocale) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/locales/${newLocale}/common.json`);
      const data = await response.json();
      setTranslations(data);
      setLocale(newLocale);
      
      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-language', newLocale);
      }
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback a español si hay error
      if (newLocale !== 'es') {
        loadTranslations('es');
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Cargar idioma guardado o detectar del navegador
    const getSavedOrBrowserLocale = () => {
      if (typeof window === 'undefined') return 'es';
      
      const savedLocale = localStorage.getItem('preferred-language');
      if (savedLocale && ['es', 'en'].includes(savedLocale)) {
        return savedLocale;
      }
      
      // Detectar idioma del navegador
      const browserLocale = navigator.language || navigator.userLanguage;
      if (browserLocale.startsWith('en')) {
        return 'en';
      }
      
      return 'es'; // Fallback por defecto
    };
    
    const initialLocale = getSavedOrBrowserLocale();
    loadTranslations(initialLocale);
  }, []);

  const t = (key, params = {}) => {
    if (isLoading) return String(key);
    
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    if (typeof value === 'string') {
      // Reemplazar parámetros si los hay
      return value.replace(/\{\{(\w+)\}\}/g, (match, param) => params[param] || match);
    }
    
    return String(key); // Asegurar que siempre devuelva un string
  };

  const switchLanguage = (newLocale) => {
    if (newLocale !== locale && ['es', 'en'].includes(newLocale)) {
      loadTranslations(newLocale);
    }
  };

  return (
    <I18nContext.Provider value={{ 
      t, 
      locale, 
      switchLanguage,
      availableLocales: ['es', 'en'],
      isLoading
    }}>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen bg-[#a842b1]">
          <div className="text-white">Cargando...</div>
        </div>
      ) : (
        children
      )}
    </I18nContext.Provider>
  );
}
