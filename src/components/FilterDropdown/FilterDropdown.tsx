import { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
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
        <SlidersHorizontal size={14} strokeWidth={2} />
        {hasActiveFilters && <span className={styles.dot} />}
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.section}>
            <span className={styles.label}>Role</span>
            <div className={styles.pills}>
              {roles.map((tag) => (
                <button
                  key={tag.id}
                  className={`${styles.pill} ${filters.roles.includes(tag.id) ? styles.pillActive : ''}`}
                  onClick={() => toggleFilter('roles', tag.id)}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <span className={styles.label}>Interest</span>
            <div className={styles.pills}>
              {interests.map((tag) => (
                <button
                  key={tag.id}
                  className={`${styles.pill} ${filters.interests.includes(tag.id) ? styles.pillActive : ''}`}
                  onClick={() => toggleFilter('interests', tag.id)}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button className={styles.clear} onClick={() => { clearFilters(); setOpen(false); }}>
              <X size={12} strokeWidth={2} />
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
