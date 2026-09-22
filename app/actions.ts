'use server';

import { redirect } from 'next/navigation';
import { createCV, deleteCV, updateCV, updateCVDesign } from '@/lib/cvStore';
import { parseCVText } from '@/lib/openai';
import { formatPhone } from '@/lib/phone';
import { sanitizeAccent, sanitizeCVInput, sanitizeTemplate } from '@/lib/validate';
import type { CVInput } from '@/lib/types';

// Hard caps on repeatable form fields, checked before we even build the CV
// object — independent from the per-field length limits in sanitizeCVInput.
const MAX_ROWS = 50;

function splitLines(value: FormDataEntryValue | null): string[] {
  return (value as string ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, MAX_ROWS);
}

function str(value: FormDataEntryValue | null): string {
  return (value as string ?? '').trim();
}

function readTemplate(formData: FormData) {
  return sanitizeTemplate(str(formData.get('template')));
}

function readAccent(formData: FormData) {
  return sanitizeAccent(str(formData.get('accent')));
}

/** Basic bot defense: a honeypot field bots tend to fill, plus a minimum
 * time-on-page check. Neither is visible or meaningful to real users. A
 * false positive here should never crash the page for a real visitor, so
 * callers treat a "true" result as a quiet no-op rather than throwing. */
function isSpam(formData: FormData): boolean {
  if (str(formData.get('hp_reference_code'))) return true;
  const startedAt = Number(formData.get('formRenderedAt'));
  if (!startedAt || Date.now() - startedAt < 400) return true;
  return false;
}

function extractCVInput(formData: FormData): Omit<CVInput, 'template' | 'accent'> {
  const schoolList = (formData.getAll('education_school') as string[]).slice(0, MAX_ROWS);
  const degreeList = formData.getAll('education_degree') as string[];
  const periodList = formData.getAll('education_period') as string[];
  const noteList = formData.getAll('education_note') as string[];

  const education = schoolList
    .map((school, i) => ({
      school: (school ?? '').trim(),
      degree: (degreeList[i] ?? '').trim(),
      period: (periodList[i] ?? '').trim(),
      note: (noteList[i] ?? '').trim(),
    }))
    .filter((entry) => entry.school || entry.degree);

  const certTitleList = (formData.getAll('certificate_title') as string[]).slice(0, MAX_ROWS);
  const certInstitutionList = formData.getAll('certificate_institution') as string[];
  const certDescriptionList = formData.getAll('certificate_description') as string[];

  const certificates = certTitleList
    .map((title, i) => ({
      title: (title ?? '').trim(),
      institution: (certInstitutionList[i] ?? '').trim(),
      description: (certDescriptionList[i] ?? '').trim(),
    }))
    .filter((entry) => entry.title);

  return {
    name: str(formData.get('name')),
    headline: str(formData.get('headline')),
    location: str(formData.get('location')),
    email: str(formData.get('email')),
    phone: formatPhone(str(formData.get('phone'))),
    about: str(formData.get('about')),
    skills: splitLines(formData.get('skills')),
    languages: splitLines(formData.get('languages')),
    driverLicense: str(formData.get('driverLicense')),
    education,
    certificates,
    hobbies: splitLines(formData.get('hobbies')),
  };
}

export async function createCVAction(formData: FormData) {
  const locale = str(formData.get('locale')) || 'cs';
  if (isSpam(formData)) {
    redirect(`/${locale}`);
  }

  const input: CVInput = sanitizeCVInput({
    ...extractCVInput(formData),
    template: readTemplate(formData),
    accent: readAccent(formData),
  });

  if (!input.name) {
    throw new Error('Name is required');
  }

  const cv = await createCV(input);
  redirect(`/${locale}/cv/${cv.slug}?token=${cv.editToken}`);
}

export async function parseCVAction(formData: FormData) {
  const locale = str(formData.get('locale')) || 'cs';
  if (isSpam(formData)) {
    redirect(`/${locale}`);
  }

  const text = str(formData.get('text')).slice(0, 20000);
  if (!text) {
    throw new Error('Please paste your CV text');
  }

  const parsed = await parseCVText(text);
  if (!parsed.name) {
    throw new Error('Could not detect a name in the pasted text');
  }

  const input: CVInput = sanitizeCVInput({
    ...parsed,
    phone: formatPhone(parsed.phone),
    template: readTemplate(formData),
    accent: readAccent(formData),
  });

  const cv = await createCV(input);
  redirect(`/${locale}/cv/${cv.slug}?token=${cv.editToken}`);
}

export async function updateCVAction(formData: FormData) {
  const slug = str(formData.get('slug'));
  const editToken = str(formData.get('editToken'));
  const locale = str(formData.get('locale')) || 'cs';

  const input: CVInput = sanitizeCVInput({
    ...extractCVInput(formData),
    template: readTemplate(formData),
    accent: readAccent(formData),
  });

  if (!input.name) {
    throw new Error('Name is required');
  }

  const cv = await updateCV(slug, editToken, input);
  if (!cv) {
    throw new Error('Not authorized to edit this CV');
  }

  redirect(`/${locale}/cv/${cv.slug}?token=${editToken}`);
}

export async function updateCVDesignAction(formData: FormData) {
  const slug = str(formData.get('slug'));
  const locale = str(formData.get('locale')) || 'cs';

  const cv = await updateCVDesign(slug, readTemplate(formData), readAccent(formData));
  if (!cv) {
    throw new Error('CV not found');
  }

  redirect(`/${locale}/cv/${cv.slug}`);
}

export async function deleteCVAction(formData: FormData) {
  const slug = str(formData.get('slug'));
  const editToken = str(formData.get('editToken'));
  const locale = str(formData.get('locale')) || 'cs';

  const deleted = await deleteCV(slug, editToken);
  if (!deleted) {
    throw new Error('Not authorized to delete this CV');
  }

  redirect(`/${locale}`);
}
