import type { Member } from '../types';

const memberModules = import.meta.glob<{ default: Member }>(
  '../../content/members/*.json',
  { eager: true }
);

const BASE = import.meta.env.BASE_URL;

function resolvePhoto(path: string | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // Strip leading slash so BASE_URL + path doesn't double-slash
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE}${clean}`;
}

export const members: Member[] = Object.values(memberModules).map((m) => ({
  ...m.default,
  photo: resolvePhoto(m.default.photo),
}));

export function getMemberBySlug(slug: string): Member | undefined {
  return members.find((m) => m.slug === slug);
}
