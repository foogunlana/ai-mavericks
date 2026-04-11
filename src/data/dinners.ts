import type { Dinner } from '../types';

const dinnerModules = import.meta.glob<{ default: Dinner }>(
  '../../content/dinners/*.json',
  { eager: true }
);

export const dinners: Dinner[] = Object.values(dinnerModules)
  .map((d) => d.default)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getDinnerBySlug(slug: string): Dinner | undefined {
  return dinners.find((d) => d.slug === slug);
}
