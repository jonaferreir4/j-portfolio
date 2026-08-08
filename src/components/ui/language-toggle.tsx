'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLocale = locale === 'pt' ? 'en' : 'pt';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold bg-void border border-borderTech hover:border-tacticalHighlight hover:text-tacticalHighlight text-steel rounded-sm transition-colors uppercase"
      aria-label={`Mudar idioma para ${locale === 'pt' ? 'Inglês' : 'Português'}`}
      title={locale === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <Globe size={14} className="text-tacticalHighlight" />
      <span>{locale === 'pt' ? 'EN' : 'PT'}</span>
    </button>
  );
}
