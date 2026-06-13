import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import styles from './App.module.css';
import { Nav } from './components/Nav/Nav';
import { Footer } from './components/Footer/Footer';
import { AppViews } from './components/AppViews';
import { useClaimProfile } from './hooks/useClaimProfile';
import { useMembers } from './hooks/useMembers';
import { useDinners } from './hooks/useDinners';
import { authEnabled } from './lib/authConfig';
import type { ContentProps, View } from './components/AppViews';

// Re-exported so existing consumers (Nav, LandingHero) can keep importing from './App'.
export type { View } from './components/AppViews';

// DEV-only lazy fallback — Vite replaces import.meta.env.DEV with `false` in
// production builds, so this dynamic import is dead-code-eliminated and the
// static member/dinner JSON files are never bundled into the production JS.
const StaticContent = import.meta.env.DEV
  ? lazy(() => import('./StaticContent'))
  : null;

// ── Authenticated inner app (Clerk + Neon hooks) ─────────────────────────────
// Only rendered when authEnabled=true, so useAuth() calls are always inside
// a real ClerkProvider context.

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
            : StaticContent
              ? <Suspense fallback={null}><StaticContent {...contentProps} /></Suspense>
              : null}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
