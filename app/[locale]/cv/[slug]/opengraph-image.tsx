import fs from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';
import { getCVBySlug } from '@/lib/cvStore';

export const runtime = 'nodejs';
export const alt = 'CV preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const fontData = fs.readFileSync(path.join(process.cwd(), 'assets/fonts/Roboto-Variable.ttf'));

export default async function Image({ params }: { params: { slug: string } }) {
  const cv = await getCVBySlug(params.slug);

  const name = cv?.name || 'CV';
  const headline = cv?.headline || '';
  const location = cv?.location || '';
  const accent = cv?.accent || '#16233f';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#16233f',
          color: '#ffffff',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', fontSize: 22, letterSpacing: 4, opacity: 0.7, textTransform: 'uppercase' }}>
          CV Profile
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>{name}</div>
          {headline && (
            <div style={{ display: 'flex', fontSize: 34, marginTop: 18, opacity: 0.92 }}>{headline}</div>
          )}
          {location && (
            <div style={{ display: 'flex', fontSize: 24, marginTop: 12, opacity: 0.7 }}>{location}</div>
          )}
        </div>
        <div style={{ display: 'flex', height: 10, width: '100%', background: accent }} />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Roboto', data: fontData, style: 'normal', weight: 400 }],
    },
  );
}
