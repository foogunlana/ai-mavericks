import type { Dinner } from '../types';

const BASE = import.meta.env.BASE_URL;

function resolvePhoto(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE}${clean}`;
}

// Only load JSON content in dev — production uses Neon (data/dinners.ts is
// a DEV-only fallback). import.meta.env.DEV is statically replaced by Vite
// at build time so the glob branch is dead-code-eliminated in production,
// preventing private dinner data from being bundled into the shipped JS.
export const dinners: Dinner[] = import.meta.env.DEV
  ? (() => {
      const dinnerModules = import.meta.glob<{ default: Dinner }>(
        '../../content/dinners/*.json',
        { eager: true },
      );
      return Object.values(dinnerModules)
        .map((d) => ({
          ...d.default,
          groupPhoto: resolvePhoto(d.default.groupPhoto) as string,
        }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    })()
  : [];

export function getDinnerBySlug(slug: string): Dinner | undefined {
  return dinners.find((d) => d.slug === slug);
}
