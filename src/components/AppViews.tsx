import { Show } from '@clerk/react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import styles from '../App.module.css';
import { DinnersPage } from './DinnersPage/DinnersPage';
import { DinnerDetail } from './DinnerDetail/DinnerDetail';
import { StyleGuide } from './StyleGuide/StyleGuide';
import { LandingHero } from './LandingHero/LandingHero';
import { LandingIntro } from './LandingIntro/LandingIntro';
import { ObjectionSection } from './ObjectionSection/ObjectionSection';
import { MemberHome } from './MemberHome/MemberHome';
import { MemberList } from './MemberList/MemberList';
import { GatePrompt } from './Auth/GatePrompt';
import { useFilterState } from '../hooks/useFilterState';
import type { Member } from '../types';
import type { Dinner } from '../types';

export type View = 'home' | 'people' | 'dinners' | 'styleguide';

/** Map a logical view to its URL path (basename-relative). */
export function viewToPath(view: View): string {
  switch (view) {
    case 'home': return '/';
    case 'people': return '/people';
    case 'dinners': return '/dinners';
    case 'styleguide': return '/styleguide';
  }
}

/** Derive the logical view from a basename-relative pathname. */
export function pathToView(pathname: string): View {
  if (pathname.startsWith('/people')) return 'people';
  if (pathname.startsWith('/dinners')) return 'dinners'; // covers /dinners/:slug
  if (pathname.startsWith('/styleguide')) return 'styleguide';
  return 'home';
}

export interface ContentProps {
  heroSentinelRef: React.RefObject<HTMLDivElement | null>;
}

export interface ViewsProps extends ContentProps {
  members: Member[];
  dinners: Dinner[];
  membersLoading: boolean;
  dinnersLoading: boolean;
  gated: boolean;
  firstName?: string;
}

// Wrap an element in Clerk gating when `gated`: signed-in sees it, signed-out
// gets the GatePrompt. When not gated (no auth configured), render as-is.
function gate(gated: boolean, element: React.ReactNode): React.ReactNode {
  if (!gated) return element;
  return (
    <>
      <Show when="signed-in">{element}</Show>
      <Show when="signed-out"><GatePrompt /></Show>
    </>
  );
}

export function AppViews({
  members, dinners,
  membersLoading, dinnersLoading,
  gated,
  firstName,
  heroSentinelRef,
}: ViewsProps) {
  const navigate = useNavigate();
  const { filters, toggleFilter, clearFilters, hasActiveFilters, filterMembers } = useFilterState();
  const filteredMembers = filterMembers(members);

  const goToView = (view: View) => navigate(viewToPath(view));
  const goToDinner = (slug: string) => navigate(`/dinners/${slug}`);

  const publicLanding = (
    <>
      <LandingHero
        latestDinner={dinners[0]}
        onViewChange={goToView}
        navLocked={gated}
      />
      <div ref={heroSentinelRef} style={{ height: 0 }} />
      <LandingIntro />
      <ObjectionSection />
    </>
  );

  const home = gated ? (
    <>
      <Show when="signed-in">
        <MemberHome
          dinners={dinnersLoading ? [] : dinners}
          memberCount={membersLoading ? undefined : members.length}
          firstName={firstName}
          onViewChange={goToView}
          onSelectDinner={goToDinner}
        />
      </Show>
      <Show when="signed-out">{publicLanding}</Show>
    </>
  ) : publicLanding;

  const people = (
    <section className={styles.section}>
      <MemberList members={filteredMembers} filters={filters} toggleFilter={toggleFilter} clearFilters={clearFilters} hasActiveFilters={hasActiveFilters} />
    </section>
  );

  const dinnersList = (
    <section className={styles.section}>
      <DinnersPage dinners={dinnersLoading ? [] : dinners} onSelectDinner={goToDinner} />
    </section>
  );

  return (
    <Routes>
      <Route path="/" element={home} />
      <Route path="/people" element={gate(gated, people)} />
      <Route path="/dinners" element={gate(gated, dinnersList)} />
      <Route
        path="/dinners/:slug"
        element={
          <DinnerDetailRoute
            dinners={dinnersLoading ? [] : dinners}
            members={members}
            gated={gated}
            onBack={() => navigate('/dinners')}
          />
        }
      />
      {import.meta.env.DEV && <Route path="/styleguide" element={<StyleGuide />} />}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function DinnerDetailRoute({
  dinners, members, gated, onBack,
}: {
  dinners: Dinner[];
  members: Member[];
  gated: boolean;
  onBack: () => void;
}) {
  const { slug } = useParams();
  const detail = (
    <section className={styles.section}>
      <DinnerDetail dinnerSlug={slug ?? ''} dinners={dinners} members={members} onBack={onBack} />
    </section>
  );
  return <>{gate(gated, detail)}</>;
}
