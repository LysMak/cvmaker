import type { Metadata } from 'next';
import Link from 'next/link';
import CVDisplay from '@/components/CVDisplay';
import DeleteButton from '@/components/DeleteButton';
import PrintButton from '@/components/PrintButton';
import ShareByEmail from '@/components/ShareByEmail';
import { getCVBySlug } from '@/lib/cvStore';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const cv = await getCVBySlug(params.slug);
  if (!cv) return { title: 'CV not found' };

  const title = `${cv.name} — ${cv.headline}`;
  const description = cv.about || `${cv.name}'s CV`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      locale: params.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CVPage({
  params,
  searchParams,
}: {
  params: { locale: string; slug: string };
  searchParams: { token?: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'cs';
  const dict = getDictionary(locale);
  const cv = await getCVBySlug(params.slug);

  if (!cv) {
    return (
      <main className="main">
        <div className="container not-found">
          <h1>{dict.cv.notFoundTitle}</h1>
          <p>{dict.cv.notFoundBody}</p>
          <Link href={`/${locale}`}>{dict.cv.backHome}</Link>
        </div>
      </main>
    );
  }

  const isOwner = Boolean(searchParams.token) && searchParams.token === cv.editToken;

  return (
    <CVDisplay cv={cv} dict={dict.cv}>
      <ShareByEmail
        name={cv.name}
        subjectPrefix={dict.cv.shareEmailSubject}
        bodyIntro={dict.cv.shareEmailBody}
        placeholder={dict.cv.shareEmailPlaceholder}
        buttonLabel={dict.cv.shareEmailButton}
      />
      <div className="cv-actions">
        <Link href={`/${locale}`}>{dict.cv.backHome}</Link>
        {isOwner && (
          <div className="cv-actions__group">
            <PrintButton label={dict.cv.printAction} />
            <Link href={`/${locale}/cv/${cv.slug}/edit?token=${cv.editToken}`}>{dict.cv.editAction}</Link>
            <DeleteButton
              slug={cv.slug}
              editToken={cv.editToken}
              locale={locale}
              label={dict.cv.deleteAction}
              pendingLabel={dict.cv.deletePending}
              confirmMessage={dict.cv.deleteConfirm}
            />
          </div>
        )}
      </div>
      {isOwner && (
        <div className="edit-banner">
          <strong>{dict.cv.editBannerTitle}</strong> {dict.cv.editBannerBody}
        </div>
      )}
    </CVDisplay>
  );
}
