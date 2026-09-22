import Link from 'next/link';
import AccentStyle from '@/components/AccentStyle';
import { getCVsPage } from '@/lib/cvStore';
import { formatDate } from '@/lib/format';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { accentOptions } from '@/lib/types';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 20;

export default async function AllCVsPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { page?: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'cs';
  const dict = getDictionary(locale);
  const page = Math.max(1, Number(searchParams.page) || 1);
  const { cvs, total } = await getCVsPage(page, PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main className="main">
      <AccentStyle accent={accentOptions[0].value} />
      <div className="container">
        <div className="hero">
          <h1>{dict.all.title}</h1>
        </div>

        {cvs.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--color-muted)' }}>{dict.all.empty}</p>
        ) : (
          <>
            <div className="card recent-list">
              {cvs.map((cv) => (
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

            <div className="pagination">
              {page > 1 ? (
                <Link href={`/${locale}/all?page=${page - 1}`}>{dict.all.prevPage}</Link>
              ) : (
                <span className="pagination__disabled">{dict.all.prevPage}</span>
              )}
              <span className="pagination__info">
                {dict.all.pageInfo.replace('{current}', String(page)).replace('{total}', String(totalPages))}
              </span>
              {page < totalPages ? (
                <Link href={`/${locale}/all?page=${page + 1}`}>{dict.all.nextPage}</Link>
              ) : (
                <span className="pagination__disabled">{dict.all.nextPage}</span>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
