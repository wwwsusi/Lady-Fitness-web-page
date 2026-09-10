import type { MetadataRoute } from 'next';

const base = 'https://lady-fitness-humenne.michal-susko.chatgpt.site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/prechadzka', '/v2'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
