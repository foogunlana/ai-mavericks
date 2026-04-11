import tagsData from '../../content/tags/tags.json';
import type { Tag } from '../types';

export const tags: Tag[] = tagsData.tags as Tag[];

export function getTagsByCategory(category: 'interest' | 'role'): Tag[] {
  return tags.filter((t) => t.category === category);
}

export function getTagLabel(id: string): string {
  return tags.find((t) => t.id === id)?.label ?? id;
}
