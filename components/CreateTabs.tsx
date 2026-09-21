'use client';

import { useState } from 'react';
import CVForm from './CVForm';
import PasteForm from './PasteForm';
import type { Dictionary, Locale } from '@/lib/i18n';

export default function CreateTabs({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [tab, setTab] = useState<'manual' | 'paste'>('manual');

  return (
    <div>
      <div className="option-grid" style={{ marginBottom: 18 }}>
        <button
          type="button"
          className={`template-option${tab === 'manual' ? ' is-selected' : ''}`}
          onClick={() => setTab('manual')}
        >
          {dict.home.tabManual}
        </button>
        <button
          type="button"
          className={`template-option${tab === 'paste' ? ' is-selected' : ''}`}
          onClick={() => setTab('paste')}
        >
          {dict.home.tabPaste}
          <span className="badge">{dict.home.pasteBadge}</span>
        </button>
      </div>

      {tab === 'paste' ? (
        <PasteForm dict={dict.home} />
      ) : (
        <CVForm
          locale={locale}
          dict={dict.form}
          submitLabels={{ idle: dict.form.submitButton, pending: dict.form.submitPending }}
        />
      )}
    </div>
  );
}
