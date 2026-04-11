import styles from './Nav.module.css';
import type { View } from '../../App';

interface Props {
  currentView: View;
  onViewChange: (view: View) => void;
}

export function Nav({ currentView, onViewChange }: Props) {
  const activeSection = currentView === 'people' ? 'people' : 'dinners';

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => onViewChange('people')}>
          AI Mavericks
        </button>
        <div className={styles.links}>
          <button
            className={`${styles.link} ${activeSection === 'people' ? styles.active : ''}`}
            onClick={() => onViewChange('people')}
          >
            People
          </button>
          <button
            className={`${styles.link} ${activeSection === 'dinners' ? styles.active : ''}`}
            onClick={() => onViewChange('dinners')}
          >
            Dinners
          </button>
        </div>
      </div>
    </nav>
  );
}
