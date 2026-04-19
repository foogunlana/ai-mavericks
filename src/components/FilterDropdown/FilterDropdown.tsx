import { useState, useRef, useEffect } from 'react';
import { Filter } from 'lucide-react';
import type { FilterState } from '../../hooks/useFilterState';
import { getTagsByCategory } from '../../data/tags';
import styles from './FilterDropdown.module.css';

interface Props {
  filters: FilterState;
  toggleFilter: (dimension: keyof FilterState, value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function FilterDropdown({ filters, toggleFilter, clearFilters, hasActiveFilters }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const roles = getTagsByCategory('role');
  const interests = getTagsByCategory('interest');
  const activeCount = filters.roles.length + filters.interests.length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={`${styles.trigger} ${hasActiveFilters ? styles.active : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Filter members"
      >
        <Filter size={18} strokeWidth={2} />
        {hasActiveFilters && (
          <span className={styles.badge}>{activeCount}</span>
        )}
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <span className={styles.headerLabel}>Filters</span>
            <button
              className={styles.clearBtn}
              onClick={() => { clearFilters(); setOpen(false); }}
            >
              Clear all
            </button>
          </div>

          <div className={styles.section}>
            <p className={styles.categoryLabel}>Role</p>
            {roles.map((tag) => {
              const selected = filters.roles.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  className={`${styles.option} ${selected ? styles.selected : ''}`}
                  onClick={() => toggleFilter('roles', tag.id)}
                >
                  <span>{tag.label}</span>
                  {selected && (
                    <svg className={styles.checkmark} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          <div className={styles.section}>
            <p className={styles.categoryLabel}>Interest</p>
            {interests.map((tag) => {
              const selected = filters.interests.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  className={`${styles.option} ${selected ? styles.selected : ''}`}
                  onClick={() => toggleFilter('interests', tag.id)}
                >
                  <span>{tag.label}</span>
                  {selected && (
                    <svg className={styles.checkmark} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
