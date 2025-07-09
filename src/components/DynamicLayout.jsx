'use client';

import { useI18n } from '@/components/I18nProvider';
import { useEffect } from 'react';

export default function DynamicLayout({ children }) {
  const { locale } = useI18n();

  useEffect(() => {
    // Actualizar el atributo lang del HTML
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return <>{children}</>;
}
