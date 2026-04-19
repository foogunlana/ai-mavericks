import type { Dinner } from '../types';

const dinnerModules = import.meta.glob<{ default: Dinner }>(
  '../../content/dinners/*.json',
  { eager: true }
);

const BASE = import.meta.env.BASE_URL;

function resolvePhoto(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE}${clean}`;
}

export const dinners: Dinner[] = Object.values(dinnerModules)
  .map((d) => ({
    ...d.default,
    groupPhoto: resolvePhoto(d.default.groupPhoto) as string,
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getDinnerBySlug(slug: string): Dinner | undefined {
  return dinners.find((d) => d.slug === slug);
}
