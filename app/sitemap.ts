import type { MetadataRoute } from 'next';
import { getAllCVSlugs } from '@/lib/cvStore';
import { locales } from '@/lib/i18n';
import { getSiteUrl } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const cvs = await getAllCVSlugs();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${base}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });
    entries.push({
      url: `${base}/${locale}/all`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    });
    for (const cv of cvs) {
      entries.push({
        url: `${base}/${locale}/cv/${cv.slug}`,
        lastModified: new Date(cv.createdAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
