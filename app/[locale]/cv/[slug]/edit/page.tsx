import AccentStyle from '@/components/AccentStyle';
import CVForm from '@/components/CVForm';
import { getCVBySlug } from '@/lib/cvStore';
import { getDictionary, isLocale, type Locale } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export default async function EditCVPage({
  params,
  searchParams,
}: {
  params: { locale: string; slug: string };
  searchParams: { token?: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'cs';
  const dict = getDictionary(locale);
  const cv = await getCVBySlug(params.slug);

  const isOwner = Boolean(cv) && Boolean(searchParams.token) && searchParams.token === cv?.editToken;

  if (!cv || !isOwner) {
    return (
      <main className="main">
        <div className="container not-found">
          <h1>{dict.edit.notAuthorizedTitle}</h1>
          <p>{dict.edit.notAuthorizedBody}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <AccentStyle accent={cv.accent} />
      <div className="container">
        <div className="hero">
          <h1>{dict.edit.title}</h1>
        </div>
        <CVForm
          locale={locale}
          dict={dict.form}
          initial={cv}
          editToken={searchParams.token}
          submitLabels={{ idle: dict.edit.saveButton, pending: dict.edit.savePending }}
        />
      </div>
    </main>
  );
}
