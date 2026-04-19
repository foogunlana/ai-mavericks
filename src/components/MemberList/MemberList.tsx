import type { FilterState } from '../../hooks/useFilterState';
import { FilterDropdown } from '../FilterDropdown/FilterDropdown';
import { MemberGrid } from '../MemberGrid/MemberGrid';
import { SocialIcons } from '../SocialIcons/SocialIcons';
import type { Member } from '../../types';
import styles from './MemberList.module.css';

interface Props {
  members: Member[];
  filters: FilterState;
  toggleFilter: (dimension: keyof FilterState, value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function MemberList({ members, filters, toggleFilter, clearFilters, hasActiveFilters }: Props) {
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
        <FilterDropdown
          filters={filters}
          toggleFilter={toggleFilter}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      <MemberGrid members={members} />
    </div>
  );
}
