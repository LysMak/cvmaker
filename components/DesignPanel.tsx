'use client';

import { useState } from 'react';
import { updateCVDesignAction } from '@/app/actions';
import SubmitButton from './SubmitButton';
import { accentOptions, templates, type Template } from '@/lib/types';
import type { Dictionary, Locale } from '@/lib/i18n';

const templateLabelKey: Record<Template, keyof Dictionary['form']> = {
  minimal: 'templateMinimal',
  modern: 'templateModern',
  creative: 'templateCreative',
};

export default function DesignPanel({
  slug,
  locale,
  initialTemplate,
  initialAccent,
  formDict,
  cvDict,
}: {
  slug: string;
  locale: Locale;
  initialTemplate: Template;
  initialAccent: string;
  formDict: Dictionary['form'];
  cvDict: Dictionary['cv'];
}) {
  const [open, setOpen] = useState(false);
  const [template, setTemplate] = useState<Template>(initialTemplate);
  const [accent, setAccent] = useState(initialAccent);

  function applyTemplate(t: Template) {
    setTemplate(t);
    document.querySelector('.cv-root')?.setAttribute('data-template', t);
  }

  function applyAccent(a: string) {
    setAccent(a);
    const root = document.querySelector<HTMLElement>('.cv-root');
    root?.style.setProperty('--color-accent', a);
    document.documentElement.style.setProperty('--color-accent', a);
  }

  return (
    <div className="design-toggle">
      <button type="button" className="design-toggle__btn" onClick={() => setOpen((v) => !v)}>
        {cvDict.customizeAction}
      </button>

      {open && (
        <form action={updateCVDesignAction} className="card design-panel">
          <input type="hidden" name="slug" value={slug} />
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="template" value={template} />
          <input type="hidden" name="accent" value={accent} />

          <div className="field field--center">
            <label>{formDict.templateLabel}</label>
            <div className="option-grid">
              {templates.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`template-option${t === template ? ' is-selected' : ''}`}
                  onClick={() => applyTemplate(t)}
                >
                  {formDict[templateLabelKey[t]]}
                </button>
              ))}
            </div>
          </div>

          <div className="field field--center" style={{ marginBottom: 0 }}>
            <label>{formDict.accentLabel}</label>
            <div className="option-grid">
              {accentOptions.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  aria-label={a.id}
                  className={`accent-swatch${a.value === accent ? ' is-selected' : ''}`}
                  style={{ background: a.value }}
                  onClick={() => applyAccent(a.value)}
                />
              ))}
            </div>
          </div>

          <SubmitButton idleLabel={cvDict.saveDesignButton} pendingLabel={cvDict.savingDesign} />
        </form>
      )}
    </div>
  );
}
