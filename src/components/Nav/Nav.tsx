import styles from './Nav.module.css';
import type { View } from '../../App';

interface Props {
  currentView: View;
  onViewChange: (view: View) => void;
  hidden?: boolean;
}

export function Nav({ currentView, onViewChange, hidden = false }: Props) {
  return (
    <nav className={`${styles.nav}${hidden ? ` ${styles.hidden}` : ''}`}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => onViewChange('home')}>
          <img src="/ai-mavericks-logo.avif" alt="AI Mavericks" className={styles.logoMark} />
          AI Mavericks
        </button>
        <div className={styles.links}>
          <button
            className={`${styles.link} ${currentView === 'home' ? styles.active : ''}`}
            onClick={() => onViewChange('home')}
          >
            Home
          </button>
          <button
            className={`${styles.link} ${currentView === 'people' ? styles.active : ''}`}
            onClick={() => onViewChange('people')}
          >
            People
          </button>
          <button
            className={`${styles.link} ${currentView === 'dinners' || currentView === 'dinner-detail' ? styles.active : ''}`}
            onClick={() => onViewChange('dinners')}
          >
            Dinners
          </button>
          <button
            className={`${styles.link} ${currentView === 'styleguide' ? styles.active : ''}`}
            onClick={() => onViewChange('styleguide')}
          >
            Style Guide
          </button>
        </div>
      </div>
    </nav>
  );
}
