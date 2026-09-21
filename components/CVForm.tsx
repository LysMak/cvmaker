'use client';

import { useState } from 'react';
import { createCVAction, updateCVAction } from '@/app/actions';
import AccentSync from './AccentSync';
import SpamGuardFields from './SpamGuardFields';
import SubmitButton from './SubmitButton';
import { accentOptions, templates, type CV, type CertificateEntry, type EducationEntry, type Template } from '@/lib/types';
import type { Dictionary, Locale } from '@/lib/i18n';
import { formatPhone } from '@/lib/phone';

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return idCounter;
}

const templateLabelKey: Record<Template, keyof Dictionary['form']> = {
  minimal: 'templateMinimal',
  modern: 'templateModern',
  creative: 'templateCreative',
};

export default function CVForm({
  locale,
  dict,
  initial,
  editToken,
  submitLabels,
}: {
  locale: Locale;
  dict: Dictionary['form'];
  initial?: CV;
  editToken?: string;
  submitLabels: { idle: string; pending: string };
}) {
  const [educationRows, setEducationRows] = useState<{ id: number; data?: EducationEntry }[]>(() =>
    initial && initial.education.length > 0
      ? initial.education.map((e) => ({ id: nextId(), data: e }))
      : [{ id: nextId(), data: undefined }],
  );
  const [certificateRows, setCertificateRows] = useState<{ id: number; data?: CertificateEntry }[]>(() =>
    (initial?.certificates ?? []).map((c) => ({ id: nextId(), data: c })),
  );
  const [template, setTemplate] = useState<Template>(initial?.template ?? 'minimal');
  const [accent, setAccent] = useState(initial?.accent ?? accentOptions[0].value);

  const isEdit = Boolean(initial);
  const action = isEdit ? updateCVAction : createCVAction;

  return (
    <form action={action} className="card form-card">
      <AccentSync accent={accent} />
      <SpamGuardFields />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="template" value={template} />
      <input type="hidden" name="accent" value={accent} />
      {isEdit && (
        <>
          <input type="hidden" name="slug" value={initial!.slug} />
          <input type="hidden" name="editToken" value={editToken} />
        </>
      )}

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">{dict.nameLabel}</label>
          <input id="name" name="name" required placeholder={dict.namePlaceholder} defaultValue={initial?.name} />
        </div>
        <div className="field">
          <label htmlFor="headline">{dict.headlineLabel}</label>
          <input id="headline" name="headline" placeholder={dict.headlinePlaceholder} defaultValue={initial?.headline} />
        </div>
        <div className="field">
          <label htmlFor="location">{dict.locationLabel}</label>
          <input id="location" name="location" placeholder={dict.locationPlaceholder} defaultValue={initial?.location} />
        </div>
        <div className="field">
          <label htmlFor="phone">{dict.phoneLabel}</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={dict.phonePlaceholder}
            defaultValue={initial?.phone}
            onChange={(e) => {
              e.target.value = formatPhone(e.target.value);
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="email">{dict.emailLabel}</label>
          <input id="email" name="email" type="email" placeholder={dict.emailPlaceholder} defaultValue={initial?.email} />
        </div>
        <div className="field">
          <label htmlFor="driverLicense">{dict.driverLicenseLabel}</label>
          <input id="driverLicense" name="driverLicense" placeholder={dict.driverLicensePlaceholder} defaultValue={initial?.driverLicense} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="about">{dict.aboutLabel}</label>
        <textarea id="about" name="about" rows={4} placeholder={dict.aboutPlaceholder} defaultValue={initial?.about} />
      </div>

      <div className="form-grid form-grid--three">
        <div className="field">
          <label htmlFor="skills">{dict.skillsLabel}</label>
          <textarea id="skills" name="skills" rows={5} placeholder={dict.skillsPlaceholder} defaultValue={initial?.skills.join('\n')} />
        </div>
        <div className="field">
          <label htmlFor="languages">{dict.languagesLabel}</label>
          <textarea id="languages" name="languages" rows={5} placeholder={dict.languagesPlaceholder} defaultValue={initial?.languages.join('\n')} />
        </div>
        <div className="field">
          <label htmlFor="hobbies">{dict.hobbiesLabel}</label>
          <textarea id="hobbies" name="hobbies" rows={5} placeholder={dict.hobbiesPlaceholder} defaultValue={initial?.hobbies.join('\n')} />
        </div>
      </div>

      <div className="form-section">
        <h3>{dict.educationSectionTitle}</h3>
        {educationRows.map((row) => (
          <div key={row.id} className="row-card">
            <div className="form-grid form-grid--three">
              <div className="field">
                <label>{dict.educationSchoolLabel}</label>
                <input name="education_school" placeholder={dict.educationSchoolPlaceholder} defaultValue={row.data?.school} />
              </div>
              <div className="field">
                <label>{dict.educationDegreeLabel}</label>
                <input name="education_degree" placeholder={dict.educationDegreePlaceholder} defaultValue={row.data?.degree} />
              </div>
              <div className="field">
                <label>{dict.educationPeriodLabel}</label>
                <input name="education_period" placeholder={dict.educationPeriodPlaceholder} defaultValue={row.data?.period} />
              </div>
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>{dict.educationNoteLabel}</label>
              <input name="education_note" placeholder={dict.educationNotePlaceholder} defaultValue={row.data?.note} />
            </div>
            {educationRows.length > 1 && (
              <button
                type="button"
                className="btn-remove"
                onClick={() => setEducationRows((rows) => rows.filter((r) => r.id !== row.id))}
              >
                {dict.removeAction}
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn btn-add"
          onClick={() => setEducationRows((rows) => [...rows, { id: nextId(), data: undefined }])}
        >
          {dict.addEducation}
        </button>
      </div>

      <div className="form-section">
        <h3>{dict.certificatesSectionTitle}</h3>
        {certificateRows.map((row) => (
          <div key={row.id} className="row-card">
            <div className="form-grid">
              <div className="field">
                <label>{dict.certTitleLabel}</label>
                <input name="certificate_title" placeholder={dict.certTitlePlaceholder} defaultValue={row.data?.title} />
              </div>
              <div className="field">
                <label>{dict.certInstitutionLabel}</label>
                <input name="certificate_institution" placeholder={dict.certInstitutionPlaceholder} defaultValue={row.data?.institution} />
              </div>
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>{dict.certDescriptionLabel}</label>
              <input name="certificate_description" placeholder={dict.certDescriptionPlaceholder} defaultValue={row.data?.description} />
            </div>
            <button
              type="button"
              className="btn-remove"
              onClick={() => setCertificateRows((rows) => rows.filter((r) => r.id !== row.id))}
            >
              {dict.removeAction}
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-add"
          onClick={() => setCertificateRows((rows) => [...rows, { id: nextId(), data: undefined }])}
        >
          {dict.addCertificate}
        </button>
      </div>

      <div className="form-section">
        <h3>{dict.designSectionTitle}</h3>
        <div className="field">
          <label>{dict.templateLabel}</label>
          <div className="option-grid">
            {templates.map((t) => (
              <button
                key={t}
                type="button"
                className={`template-option${t === template ? ' is-selected' : ''}`}
                onClick={() => setTemplate(t)}
              >
                {dict[templateLabelKey[t]]}
              </button>
            ))}
          </div>
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>{dict.accentLabel}</label>
          <div className="option-grid">
            {accentOptions.map((a) => (
              <button
                key={a.id}
                type="button"
                aria-label={a.id}
                className={`accent-swatch${a.value === accent ? ' is-selected' : ''}`}
                style={{ background: a.value }}
                onClick={() => setAccent(a.value)}
              />
            ))}
          </div>
        </div>
      </div>

      <SubmitButton idleLabel={submitLabels.idle} pendingLabel={submitLabels.pending} />
    </form>
  );
}
