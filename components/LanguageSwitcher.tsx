'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';

function withLocale(pathname: string, locale: Locale): string {
  const rest = pathname.replace(/^\/(cs|en)/, '') || '/';
  return `/${locale}${rest === '/' ? '' : rest}`;
}

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;

  return (
    <nav className="lang-switch" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={withLocale(pathname, l)}
          className={l === locale ? 'is-active' : undefined}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
