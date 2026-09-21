import type { CVInput } from './types';

export type ParsedCV = Omit<CVInput, 'template' | 'accent'>;

const CV_SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    headline: { type: 'string' },
    location: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
    about: { type: 'string' },
    skills: { type: 'array', items: { type: 'string' } },
    languages: { type: 'array', items: { type: 'string' } },
    driverLicense: { type: 'string' },
    education: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          school: { type: 'string' },
          degree: { type: 'string' },
          period: { type: 'string' },
          note: { type: 'string' },
        },
        required: ['school', 'degree', 'period', 'note'],
        additionalProperties: false,
      },
    },
    certificates: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          institution: { type: 'string' },
          description: { type: 'string' },
        },
        required: ['title', 'institution', 'description'],
        additionalProperties: false,
      },
    },
    hobbies: { type: 'array', items: { type: 'string' } },
  },
  required: [
    'name', 'headline', 'location', 'email', 'phone', 'about',
    'skills', 'languages', 'driverLicense', 'education', 'certificates', 'hobbies',
  ],
  additionalProperties: false,
} as const;

const SYSTEM_PROMPT = `You turn free-form CV/resume text into structured data.
Rules:
- Never invent facts that are not present or clearly implied in the source text.
- Keep the original language of the source text (do not translate).
- Lightly clean up obvious typos and awkward phrasing, but preserve meaning and tone.
- If a field is not present in the source, return an empty string ("") or empty array ([]) for it — never a placeholder.
- "about" should be a short first-person or neutral professional summary, a few sentences.
- Extract structured entries for education, certificates/training, skills, languages, and hobbies wherever mentioned.`;

export async function parseCVText(text: string): Promise<ParsedCV> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY environment variable');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: text },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: { name: 'cv', strict: true, schema: CV_SCHEMA },
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${detail}`);
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error('OpenAI returned an empty response');

  return JSON.parse(content) as ParsedCV;
}
