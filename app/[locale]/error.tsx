'use client';

import { usePathname } from 'next/navigation';

export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const pathname = usePathname() ?? '/cs';
  const locale = pathname.startsWith('/en') ? 'en' : 'cs';
  const isEn = locale === 'en';

  return (
    <main className="main">
      <div className="container not-found">
        <h1>{isEn ? 'Something went wrong' : 'Něco se nepovedlo'}</h1>
        <p>
          {isEn
            ? 'Please check the form and try again.'
            : 'Zkontrolujte prosím formulář a zkuste to znovu.'}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            border: '1px solid var(--color-navy)',
            background: 'var(--color-navy)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: 'var(--radius)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {isEn ? 'Try again' : 'Zkusit znovu'}
        </button>
      </div>
    </main>
  );
}
