export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ??
  'https://lady-fitness-humenne.michal-susko.chatgpt.site';

export function assetPath(path: string) {
  return `${siteBasePath}${path.startsWith('/') ? path : `/${path}`}`;
}

export function siteUrl(path = '/') {
  return `${siteOrigin}${assetPath(path)}`;
}
