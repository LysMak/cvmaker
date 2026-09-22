import { ImageResponse } from 'next/og';
import { getCVBySlug } from '@/lib/cvStore';

export const runtime = 'nodejs';
export const alt = 'CV preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const FONT_URL = 'https://raw.githubusercontent.com/google/fonts/main/ofl/roboto/Roboto%5Bwdth%2Cwght%5D.ttf';

async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(FONT_URL);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: { slug: string } }) {
  const [cv, fontData] = await Promise.all([getCVBySlug(params.slug), loadFont()]);

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
      fonts: fontData ? [{ name: 'Roboto', data: fontData, style: 'normal', weight: 400 }] : undefined,
    },
  );
}
