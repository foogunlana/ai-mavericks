import { X } from 'lucide-react';
import type { FilterState } from '../../hooks/useFilterState';
import { getTagsByCategory } from '../../data/tags';
import styles from './FilterBar.module.css';

interface Props {
  filters: FilterState;
  toggleFilter: (dimension: keyof FilterState, value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function FilterBar({ filters, toggleFilter, clearFilters, hasActiveFilters }: Props) {
  const roles = getTagsByCategory('role');
  const interests = getTagsByCategory('interest');

  return (
    <div className={styles.bar}>
      <div className={styles.group}>
        {roles.map((tag) => (
          <button
            key={tag.id}
            className={`${styles.pill} ${filters.roles.includes(tag.id) ? styles.active : ''}`}
            onClick={() => toggleFilter('roles', tag.id)}
          >
            {tag.label}
          </button>
        ))}
      </div>
      <div className={styles.group}>
        {interests.map((tag) => (
          <button
            key={tag.id}
            className={`${styles.pill} ${filters.interests.includes(tag.id) ? styles.active : ''}`}
            onClick={() => toggleFilter('interests', tag.id)}
          >
            {tag.label}
          </button>
        ))}
      </div>
      {hasActiveFilters && (
        <button className={styles.clear} onClick={clearFilters}>
          <X size={14} strokeWidth={2} />
        Clear all
        </button>
      )}
    </div>
  );
}
