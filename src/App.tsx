import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { useAuth, useUser } from '@clerk/react';
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
  const { user } = useUser();
  const { members, loading: membersLoading } = useMembers();
  const { dinners, loading: dinnersLoading } = useDinners();
  return <AppViews
    view={view} setView={setView}
    selectedDinnerSlug={selectedDinnerSlug} setSelectedDinnerSlug={setSelectedDinnerSlug}
    heroSentinelRef={heroSentinelRef}
    members={members} dinners={dinners}
    membersLoading={membersLoading} dinnersLoading={dinnersLoading}
    firstName={user?.firstName ?? undefined}
    gated
  />;
}

// Reports Clerk signed-in state up to the shell so the global Nav can stay
// visible on the signed-in home view (which shows MemberHome, not the hero).
// Only rendered when authEnabled, so useAuth() is always inside ClerkProvider.
function SignedInReporter({ onChange }: { onChange: (v: boolean) => void }) {
  const { isSignedIn } = useAuth();
  useEffect(() => {
    onChange(Boolean(isSignedIn));
  }, [isSignedIn, onChange]);
  return null;
}

// ── App shell (routing, scroll tracking) ─────────────────────────────────────

function App() {
  const [view, setView] = useState<View>('home');
  const [selectedDinnerSlug, setSelectedDinnerSlug] = useState<string | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
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

  const navHidden = view === 'home' && heroVisible && !signedIn;
  // Gated views (People/Dinners) are unreachable when auth is on but signed-out.
  const navLocked = authEnabled && !signedIn;
  const contentProps: ContentProps = { view, setView, selectedDinnerSlug, setSelectedDinnerSlug, heroSentinelRef };

  return (
    <>
      {authEnabled && <SignedInReporter onChange={setSignedIn} />}
      <Nav currentView={view} onViewChange={setView} hidden={navHidden} locked={navLocked} />
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
