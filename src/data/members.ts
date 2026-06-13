import type { Member } from '../types';

const BASE = import.meta.env.BASE_URL;

function resolvePhoto(path: string | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // Strip leading slash so BASE_URL + path doesn't double-slash
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE}${clean}`;
}

// Only load JSON content in dev — production uses Neon (data/members.ts is
// a DEV-only fallback). import.meta.env.DEV is statically replaced by Vite
// at build time so the glob branch is dead-code-eliminated in production,
// preventing private member bios from being bundled into the shipped JS.
export const members: Member[] = import.meta.env.DEV
  ? (() => {
      const memberModules = import.meta.glob<{ default: Member }>(
        '../../content/members/*.json',
        { eager: true },
      );
      return Object.values(memberModules).map((m) => ({
        ...m.default,
        photo: resolvePhoto(m.default.photo),
      }));
    })()
  : [];

export function getMemberBySlug(slug: string): Member | undefined {
  return members.find((m) => m.slug === slug);
}
