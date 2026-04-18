import { useState } from 'react';
import styles from './App.module.css';
import { Nav } from './components/Nav/Nav';
import { FilterBar } from './components/FilterBar/FilterBar';
import { MemberGrid } from './components/MemberGrid/MemberGrid';
import { DinnersList } from './components/DinnersList/DinnersList';
import { DinnerDetail } from './components/DinnerDetail/DinnerDetail';
import { Footer } from './components/Footer/Footer';
import { StyleGuide } from './components/StyleGuide/StyleGuide';
import { useFilterState } from './hooks/useFilterState';
import { members } from './data/members';

export type View = 'people' | 'dinners' | 'dinner-detail' | 'styleguide';

function App() {
  const [view, setView] = useState<View>('people');
  const [selectedDinnerSlug, setSelectedDinnerSlug] = useState<string | null>(null);

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

  return (
    <>
      <Nav currentView={view} onViewChange={setView} />
      <div className={styles.app}>
        <main>
          {view === 'people' && (
            <section className={styles.section}>
              <FilterBar
                filters={filters}
                toggleFilter={toggleFilter}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
              <MemberGrid members={filteredMembers} />
            </section>
          )}
          {view === 'dinners' && (
            <section className={styles.section}>
              <DinnersList onSelectDinner={handleSelectDinner} />
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
