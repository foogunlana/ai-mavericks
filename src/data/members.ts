import type { Member } from '../types';

const memberModules = import.meta.glob<{ default: Member }>(
  '../../content/members/*.json',
  { eager: true }
);

export const members: Member[] = Object.values(memberModules).map((m) => m.default);

export function getMemberBySlug(slug: string): Member | undefined {
  return members.find((m) => m.slug === slug);
}
