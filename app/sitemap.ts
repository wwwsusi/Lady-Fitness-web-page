import type { MetadataRoute } from 'next';
import { siteUrl } from './site-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/prechadzka', '/v2'].map((path) => ({
    url: siteUrl(path),
    lastModified: new Date(),
  }));
}
