import { useState, useRef, useEffect } from 'react';
import styles from './App.module.css';
import { Nav } from './components/Nav/Nav';
import { DinnersPage } from './components/DinnersPage/DinnersPage';
import { DinnerDetail } from './components/DinnerDetail/DinnerDetail';
import { Footer } from './components/Footer/Footer';
import { StyleGuide } from './components/StyleGuide/StyleGuide';
import { LandingHero } from './components/LandingHero/LandingHero';
import { MemberList } from './components/MemberList/MemberList';
import { useFilterState } from './hooks/useFilterState';
import { members } from './data/members';
import { dinners } from './data/dinners';

export type View = 'home' | 'people' | 'dinners' | 'dinner-detail' | 'styleguide';

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
    const sentinel = heroSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [view]);

  const { filters, toggleFilter, clearFilters, hasActiveFilters, filterMembers } =
    useFilterState();

  const filteredMembers = filterMembers(members);

  const handleSelectDinner = (slug: string) => {
    setSelectedDinnerSlug(slug);
    setView('dinner-detail');
  };

  const handleBackToDinners = () => {
    setView('dinners');
    setSelectedDinnerSlug(null);
  };

  const navHidden = view === 'home' && heroVisible;

  return (
    <>
      <Nav currentView={view} onViewChange={setView} hidden={navHidden} />
      {view === 'home' && (
        <>
          <LandingHero latestDinner={dinners[0]} />
          <div ref={heroSentinelRef} style={{ height: 0 }} />
        </>
      )}
      <div className={styles.app}>
        <main>
          {view === 'home' && (
            <>
              <section className={styles.section}>
                <MemberList
                  members={filteredMembers}
                  filters={filters}
                  toggleFilter={toggleFilter}
                  clearFilters={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                />
              </section>
            </>
          )}
          {view === 'people' && (
            <section className={styles.section}>
              <MemberList
                members={filteredMembers}
                filters={filters}
                toggleFilter={toggleFilter}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </section>
          )}
          {view === 'dinners' && (
            <section className={styles.section}>
              <DinnersPage onSelectDinner={handleSelectDinner} />
            </section>
          )}
          {view === 'dinner-detail' && selectedDinnerSlug && (
            <section className={styles.section}>
              <DinnerDetail dinnerSlug={selectedDinnerSlug} onBack={handleBackToDinners} />
            </section>
          )}
          {view === 'styleguide' && (
            <StyleGuide />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
