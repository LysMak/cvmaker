import { supabase } from './supabaseClient';
import type { CV, CVInput } from './types';

interface CVRow {
  slug: string;
  created_at: string;
  edit_token: string;
  template: CV['template'];
  accent: string;
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  about: string;
  skills: string[];
  languages: string[];
  driver_license: string;
  education: CV['education'];
  certificates: CV['certificates'];
  hobbies: string[];
}

function rowToCV(row: CVRow): CV {
  return {
    slug: row.slug,
    createdAt: row.created_at,
    editToken: row.edit_token,
    template: row.template,
    accent: row.accent,
    name: row.name,
    headline: row.headline,
    location: row.location,
    email: row.email,
    phone: row.phone,
    about: row.about,
    skills: row.skills,
    languages: row.languages,
    driverLicense: row.driver_license,
    education: row.education,
    certificates: row.certificates,
    hobbies: row.hobbies,
  };
}

function slugify(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return base || 'cv';
}

function toPayload(input: CVInput) {
  return {
    name: input.name,
    headline: input.headline,
    location: input.location,
    email: input.email,
    phone: input.phone,
    about: input.about,
    skills: input.skills,
    languages: input.languages,
    driver_license: input.driverLicense,
    education: input.education,
    certificates: input.certificates,
    hobbies: input.hobbies,
    template: input.template,
    accent: input.accent,
  };
}

export async function getRecentCVs(limit = 10): Promise<CV[]> {
  const { data, error } = await supabase
    .from('cvs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data as CVRow[]).map(rowToCV);
}

export async function getCVBySlug(slug: string): Promise<CV | undefined> {
  const { data, error } = await supabase
    .from('cvs')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? rowToCV(data as CVRow) : undefined;
}

export async function createCV(input: CVInput): Promise<CV> {
  const base = slugify(input.name);
  const payload = toPayload(input);

  for (let attempt = 0; attempt < 50; attempt += 1) {
    const slug = attempt === 0 ? base : `${base}-${attempt + 1}`;
    const { data, error } = await supabase
      .from('cvs')
      .insert({ ...payload, slug })
      .select()
      .single();

    if (!error) return rowToCV(data as CVRow);
    if (error.code !== '23505') throw new Error(error.message);
  }

  throw new Error('Could not generate a unique slug for this CV');
}

export async function updateCV(slug: string, editToken: string, input: CVInput): Promise<CV | undefined> {
  const { data, error } = await supabase
    .from('cvs')
    .update(toPayload(input))
    .eq('slug', slug)
    .eq('edit_token', editToken)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? rowToCV(data as CVRow) : undefined;
}

export async function deleteCV(slug: string, editToken: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('cvs')
    .delete()
    .eq('slug', slug)
    .eq('edit_token', editToken)
    .select('slug')
    .maybeSingle();

  if (error) throw new Error(error.message);
  return Boolean(data);
}
