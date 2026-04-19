import { useState } from 'react';
import type { FilterState } from '../../hooks/useFilterState';
import { FilterDropdown } from '../FilterDropdown/FilterDropdown';
import { MemberGrid } from '../MemberGrid/MemberGrid';
import { MemberListView } from '../MemberListView/MemberListView';
import { SocialIcons } from '../SocialIcons/SocialIcons';
import type { Member } from '../../types';
import styles from './MemberList.module.css';

const GRID_ICON = 'M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z';
const LIST_ICON = 'M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z';

interface Props {
  members: Member[];
  filters: FilterState;
  toggleFilter: (dimension: keyof FilterState, value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function MemberList({ members, filters, toggleFilter, clearFilters, hasActiveFilters }: Props) {
  const [view, setView] = useState<'cards' | 'list'>('cards');

  return (
    <div className={styles.wrapper}>
      <div className={styles.intro}>
        <h2 className={styles.heading}>A community of AI builders</h2>
        <p className={styles.body}>
          We bring together engineers, researchers, and founders who are building with AI — over
          intimate dinners designed for real conversation. Explore the people and the gatherings
          that make up Mavericks.
        </p>
        <SocialIcons />
      </div>

      <div className={styles.toolbar}>
        <span className={styles.count}>{members.length} Members · Filter by role or interest</span>
        <div className={styles.toolbarRight}>
          <div className={styles.viewToggle}>
            {([
              { key: 'cards', icon: GRID_ICON, label: 'Cards view' },
              { key: 'list',  icon: LIST_ICON,  label: 'List view'  },
            ] as const).map(({ key, icon, label }) => (
              <button
                key={key}
                className={`${styles.viewBtn} ${view === key ? styles.viewBtnActive : ''}`}
                onClick={() => setView(key)}
                aria-label={label}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d={icon} />
                </svg>
              </button>
            ))}
          </div>
          <FilterDropdown
            filters={filters}
            toggleFilter={toggleFilter}
            clearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </div>

      {view === 'cards' ? (
        <MemberGrid members={members} />
      ) : (
        <MemberListView members={members} />
      )}
    </div>
  );
}
