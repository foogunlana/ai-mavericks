const BASE = import.meta.env.BASE_URL

/**
 * Resolve an image path coming from the database into a usable URL.
 *
 * Remote URLs (http/https — e.g. CDN or stock photos) pass through unchanged.
 * Local paths (e.g. "/images/dinners/foo.jpeg") are prefixed with the app base
 * path (e.g. "/ai-mavericks/") so they resolve correctly under the deployed
 * sub-path instead of the site root. Mirrors the old static-data resolvePhoto().
 */
export function resolveAsset(path: string | null | undefined): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${BASE}${clean}`
}
