import { accentOptions, templates, type CVInput, type Template } from './types';

/** Server-side input limits. Applied uniformly regardless of how the data
 * arrived (manual form, AI-parsed paste, or a raw request bypassing the UI
 * entirely) so nothing oversized or malformed ever reaches the database. */
const MAX = {
  name: 100,
  headline: 150,
  location: 100,
  email: 254,
  phone: 30,
  driverLicense: 20,
  about: 2000,
  listItem: 80,
  listItems: 30,
  eduField: 150,
  eduNote: 300,
  eduPeriod: 40,
  eduRows: 15,
  certField: 150,
  certDescription: 400,
  certRows: 15,
};

// Loose but effective: rejects obvious garbage without over-engineering
// full RFC 5322 email validation.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HEX_COLOR_RE = /^#[0-9a-f]{6}$/i;

function clip(value: string, max: number): string {
  return value.trim().slice(0, max);
}

function clipList(values: string[], itemMax: number, listMax: number): string[] {
  return values
    .slice(0, listMax)
    .map((v) => clip(v, itemMax))
    .filter(Boolean);
}

export function sanitizeCVInput(input: CVInput): CVInput {
  const email = clip(input.email, MAX.email);

  return {
    template: input.template,
    accent: input.accent,
    name: clip(input.name, MAX.name),
    headline: clip(input.headline, MAX.headline),
    location: clip(input.location, MAX.location),
    email: EMAIL_RE.test(email) ? email : '',
    phone: clip(input.phone, MAX.phone),
    driverLicense: clip(input.driverLicense, MAX.driverLicense),
    about: clip(input.about, MAX.about),
    skills: clipList(input.skills, MAX.listItem, MAX.listItems),
    languages: clipList(input.languages, MAX.listItem, MAX.listItems),
    hobbies: clipList(input.hobbies, MAX.listItem, MAX.listItems),
    education: input.education.slice(0, MAX.eduRows).map((e) => ({
      school: clip(e.school, MAX.eduField),
      degree: clip(e.degree, MAX.eduField),
      period: clip(e.period, MAX.eduPeriod),
      note: clip(e.note, MAX.eduNote),
    })),
    certificates: input.certificates.slice(0, MAX.certRows).map((c) => ({
      title: clip(c.title, MAX.certField),
      institution: clip(c.institution, MAX.certField),
      description: clip(c.description, MAX.certDescription),
    })),
  };
}

/** Whitelist validation for the two design fields — never trust a raw
 * client-submitted string here, always resolve to one of the known-safe
 * constants before it can reach the database or be interpolated into CSS. */
export function sanitizeTemplate(value: string): Template {
  return (templates as readonly string[]).includes(value) ? (value as Template) : 'minimal';
}

export function sanitizeAccent(value: string): string {
  const known = accentOptions.find((a) => a.value === value);
  if (known) return known.value;
  return HEX_COLOR_RE.test(value) ? value : accentOptions[0].value;
}
