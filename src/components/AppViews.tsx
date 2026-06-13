import { Show } from '@clerk/react';
import styles from '../App.module.css';
import { DinnersPage } from './DinnersPage/DinnersPage';
import { DinnerDetail } from './DinnerDetail/DinnerDetail';
import { StyleGuide } from './StyleGuide/StyleGuide';
import { LandingHero } from './LandingHero/LandingHero';
import { LandingIntro } from './LandingIntro/LandingIntro';
import { MemberList } from './MemberList/MemberList';
import { GatePrompt } from './Auth/GatePrompt';
import { useFilterState } from '../hooks/useFilterState';
import type { Member } from '../types';
import type { Dinner } from '../types';

export type View = 'home' | 'people' | 'dinners' | 'dinner-detail' | 'styleguide';

export interface ContentProps {
  view: View;
  setView: (v: View) => void;
  selectedDinnerSlug: string | null;
  setSelectedDinnerSlug: (s: string | null) => void;
  heroSentinelRef: React.RefObject<HTMLDivElement | null>;
}

export interface ViewsProps extends ContentProps {
  members: Member[];
  dinners: Dinner[];
  membersLoading: boolean;
  dinnersLoading: boolean;
  gated: boolean;
}

export function AppViews({
  view, setView,
  selectedDinnerSlug, setSelectedDinnerSlug,
  heroSentinelRef,
  members, dinners,
  membersLoading, dinnersLoading,
  gated,
}: ViewsProps) {
  const { filters, toggleFilter, clearFilters, hasActiveFilters, filterMembers } = useFilterState();
  const filteredMembers = filterMembers(members);

  const handleSelectDinner = (slug: string) => {
    setSelectedDinnerSlug(slug);
    setView('dinner-detail');
  };

  const handleBackToDinners = () => {
    setView('dinners');
    setSelectedDinnerSlug(null);
  };

  return (
    <>
      {view === 'home' && (
        <>
          <LandingHero
            latestDinner={dinners[0]}
            memberCount={membersLoading ? undefined : members.length}
            onViewChange={setView}
          />
          <div ref={heroSentinelRef} style={{ height: 0 }} />
          <LandingIntro />
        </>
      )}

      {view === 'people' && (
        gated ? (
          <>
            <Show when="signed-in">
              <section className={styles.section}>
                <MemberList members={filteredMembers} filters={filters} toggleFilter={toggleFilter} clearFilters={clearFilters} hasActiveFilters={hasActiveFilters} />
              </section>
            </Show>
            <Show when="signed-out"><GatePrompt /></Show>
          </>
        ) : (
          <section className={styles.section}>
            <MemberList members={filteredMembers} filters={filters} toggleFilter={toggleFilter} clearFilters={clearFilters} hasActiveFilters={hasActiveFilters} />
          </section>
        )
      )}

      {view === 'dinners' && (
        gated ? (
          <>
            <Show when="signed-in">
              <section className={styles.section}>
                <DinnersPage dinners={dinnersLoading ? [] : dinners} onSelectDinner={handleSelectDinner} />
              </section>
            </Show>
            <Show when="signed-out"><GatePrompt /></Show>
          </>
        ) : (
          <section className={styles.section}>
            <DinnersPage dinners={dinners} onSelectDinner={handleSelectDinner} />
          </section>
        )
      )}

      {view === 'dinner-detail' && selectedDinnerSlug && (
        gated ? (
          <>
            <Show when="signed-in">
              <section className={styles.section}>
                <DinnerDetail dinnerSlug={selectedDinnerSlug} onBack={handleBackToDinners} />
              </section>
            </Show>
            <Show when="signed-out"><GatePrompt /></Show>
          </>
        ) : (
          <section className={styles.section}>
            <DinnerDetail dinnerSlug={selectedDinnerSlug} onBack={handleBackToDinners} />
          </section>
        )
      )}

      {view === 'styleguide' && <StyleGuide />}
    </>
  );
}
