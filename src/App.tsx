import { useState, useRef, useEffect } from 'react';
import { Show } from '@clerk/react';
import styles from './App.module.css';
import { Nav } from './components/Nav/Nav';
import { DinnersPage } from './components/DinnersPage/DinnersPage';
import { DinnerDetail } from './components/DinnerDetail/DinnerDetail';
import { Footer } from './components/Footer/Footer';
import { StyleGuide } from './components/StyleGuide/StyleGuide';
import { LandingHero } from './components/LandingHero/LandingHero';
import { LandingIntro } from './components/LandingIntro/LandingIntro';
import { MemberList } from './components/MemberList/MemberList';
import { GatePrompt } from './components/Auth/GatePrompt';
import { useFilterState } from './hooks/useFilterState';
import { useMembers } from './hooks/useMembers';
import { useDinners } from './hooks/useDinners';
import { useClaimProfile } from './hooks/useClaimProfile';
import { members as staticMembers } from './data/members';
import { dinners as staticDinners } from './data/dinners';
import { authEnabled } from './lib/authConfig';
import type { Member } from './types';
import type { Dinner } from './types';

export type View = 'home' | 'people' | 'dinners' | 'dinner-detail' | 'styleguide';

// ── Authenticated inner app (Clerk + Neon hooks) ─────────────────────────────
// Only rendered when authEnabled=true, so useAuth() calls are always inside
// a real ClerkProvider context.

interface ContentProps {
  view: View;
  setView: (v: View) => void;
  selectedDinnerSlug: string | null;
  setSelectedDinnerSlug: (s: string | null) => void;
  heroSentinelRef: React.RefObject<HTMLDivElement | null>;
}

function AuthContent({ view, setView, selectedDinnerSlug, setSelectedDinnerSlug, heroSentinelRef }: ContentProps) {
  useClaimProfile();
  const { members, loading: membersLoading } = useMembers();
  const { dinners, loading: dinnersLoading } = useDinners();
  return <AppViews
    view={view} setView={setView}
    selectedDinnerSlug={selectedDinnerSlug} setSelectedDinnerSlug={setSelectedDinnerSlug}
    heroSentinelRef={heroSentinelRef}
    members={members} dinners={dinners}
    membersLoading={membersLoading} dinnersLoading={dinnersLoading}
    gated
  />;
}

// ── Static fallback (no credentials configured) ───────────────────────────────

function StaticContent({ view, setView, selectedDinnerSlug, setSelectedDinnerSlug, heroSentinelRef }: ContentProps) {
  return <AppViews
    view={view} setView={setView}
    selectedDinnerSlug={selectedDinnerSlug} setSelectedDinnerSlug={setSelectedDinnerSlug}
    heroSentinelRef={heroSentinelRef}
    members={staticMembers} dinners={staticDinners}
    membersLoading={false} dinnersLoading={false}
    gated={false}
  />;
}

// ── Shared view rendering ─────────────────────────────────────────────────────

interface ViewsProps extends ContentProps {
  members: Member[];
  dinners: Dinner[];
  membersLoading: boolean;
  dinnersLoading: boolean;
  gated: boolean;
}

function AppViews({
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

// ── App shell (routing, scroll tracking) ─────────────────────────────────────

function App() {
  const [view, setView] = useState<View>('home');
  const [selectedDinnerSlug, setSelectedDinnerSlug] = useState<string | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const heroSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view !== 'home') {
      setHeroVisible(true);
      return;
    }
    const update = () => {
      const sentinel = heroSentinelRef.current;
      if (!sentinel) return;
      setHeroVisible(sentinel.getBoundingClientRect().top > 64);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [view]);

  const navHidden = view === 'home' && heroVisible;
  const contentProps: ContentProps = { view, setView, selectedDinnerSlug, setSelectedDinnerSlug, heroSentinelRef };

  return (
    <>
      <Nav currentView={view} onViewChange={setView} hidden={navHidden} />
      <div className={styles.app}>
        <main>
          {authEnabled
            ? <AuthContent {...contentProps} />
            : <StaticContent {...contentProps} />
          }
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
