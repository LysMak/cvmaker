import type { Metadata } from 'next';
import Link from 'next/link';
import '../globals.css';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const THEME_INIT_SCRIPT = `
try {
  var t = localStorage.getItem('theme');
  if (t === 'dim' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
  var b = localStorage.getItem('brightness');
  if (b && b !== '100') document.documentElement.style.filter = 'brightness(' + b + '%)';
} catch (e) {}
`;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : 'cs';
  const dict = getDictionary(locale);
  return {
    title: dict.siteName,
    description: dict.home.heroTitle,
    openGraph: {
      title: dict.siteName,
      description: dict.home.heroTitle,
      type: 'website',
      locale,
    },
    twitter: {
      card: 'summary',
      title: dict.siteName,
      description: dict.home.heroTitle,
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'cs';
  const dict = getDictionary(locale);

  return (
    <html lang={locale}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <div className="page">
          <header className="site-header">
            <div className="container site-header__inner">
              <div className="site-title">
                <Link href={`/${locale}`}>{dict.siteName}</Link>
              </div>
              <div className="header-controls">
                <ThemeSwitcher />
                <LanguageSwitcher locale={locale} />
              </div>
            </div>
          </header>
          {children}
          <footer className="site-footer">
            <div className="container site-footer__inner">
              <span>© {new Date().getFullYear()} {dict.siteName}</span>
              <span className="site-footer__sep">·</span>
              <span>{dict.footer.demoNote}</span>
              <span className="site-footer__sep">·</span>
              <a href="https://github.com/LysMak/cvmaker" target="_blank" rel="noopener noreferrer">
                {dict.footer.githubLabel}
              </a>
              <span className="site-footer__sep">·</span>
              <span>
                {dict.footer.authorLabel}: Maksym Lysytsyn ·{' '}
                <a href="tel:+420606133269">+420 606 133 269</a> ·{' '}
                <a href="mailto:maximax1990makc@gmail.com">maximax1990makc@gmail.com</a>
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
