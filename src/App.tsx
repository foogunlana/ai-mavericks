import styles from './App.module.css';
import { Nav } from './components/Nav/Nav';
import { FilterBar } from './components/FilterBar/FilterBar';
import { MemberGrid } from './components/MemberGrid/MemberGrid';
import { DinnerSection } from './components/DinnerSection/DinnerSection';
import { Footer } from './components/Footer/Footer';
import { useFilterState } from './hooks/useFilterState';
import { members } from './data/members';

function App() {
  const { filters, toggleFilter, clearFilters, hasActiveFilters, filterMembers, dinnerOptions } =
    useFilterState();

  const filteredMembers = filterMembers(members);

  return (
    <>
      <Nav />
      <div className={styles.app}>
        <main>
          <section id="members" className={styles.section}>
            <FilterBar
              filters={filters}
              toggleFilter={toggleFilter}
              clearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              dinnerOptions={dinnerOptions}
            />
            <MemberGrid members={filteredMembers} />
          </section>
          <section id="dinners" className={styles.section}>
            <DinnerSection />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
