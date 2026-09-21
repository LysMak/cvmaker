import Link from 'next/link';
import AccentStyle from '@/components/AccentStyle';
import CreateTabs from '@/components/CreateTabs';
import { getRecentCVs } from '@/lib/cvStore';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { accentOptions } from '@/lib/types';

export const dynamic = 'force-dynamic';

function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'cs' ? 'cs-CZ' : 'en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso));
}

export default async function Home({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'cs';
  const dict = getDictionary(locale);
  const recentCVs = await getRecentCVs(10);

  return (
    <main className="main">
      <AccentStyle accent={accentOptions[0].value} />
      <div className="container">
        <div className="hero">
          <h1>{dict.home.heroTitle}</h1>
          <p>{dict.home.heroSubtitle}</p>
        </div>

        <div className="disclaimer-banner">{dict.home.disclaimer}</div>

        <CreateTabs locale={locale} dict={dict} />

        {recentCVs.length > 0 && (
          <section className="recent">
            <h2>{dict.home.recentTitle}</h2>
            <div className="card recent-list">
              {recentCVs.map((cv) => (
                <Link key={cv.slug} href={`/${locale}/cv/${cv.slug}`} className="recent-list__item">
                  <div>
                    <div className="recent-list__name">{cv.name}</div>
                    {cv.headline && <div className="recent-list__headline">{cv.headline}</div>}
                  </div>
                  <div>
                    <div className="recent-list__date">{formatDate(cv.createdAt, locale)}</div>
                    <div className="recent-list__link">{dict.home.viewAction} →</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
