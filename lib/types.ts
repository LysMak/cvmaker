export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  note: string;
}

export interface CertificateEntry {
  title: string;
  institution: string;
  description: string;
}

export const templates = ['minimal', 'modern', 'creative'] as const;
export type Template = (typeof templates)[number];

export const accentOptions = [
  { id: 'navy', value: '#16233f' },
  { id: 'burgundy', value: '#7a1f2b' },
  { id: 'forest', value: '#1f4d3d' },
  { id: 'bronze', value: '#8a6d3b' },
  { id: 'slate', value: '#3a4556' },
] as const;

export interface CV {
  slug: string;
  createdAt: string;
  editToken: string;
  template: Template;
  accent: string;
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  about: string;
  skills: string[];
  languages: string[];
  driverLicense: string;
  education: EducationEntry[];
  certificates: CertificateEntry[];
  hobbies: string[];
}

export type CVInput = Omit<CV, 'slug' | 'createdAt' | 'editToken'>;
