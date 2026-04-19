import { useState } from 'react';
import styles from './Nav.module.css';
import type { View } from '../../App';

interface Props {
  currentView: View;
  onViewChange: (view: View) => void;
  hidden?: boolean;
}

export function Nav({ currentView, onViewChange, hidden = false }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  function navigate(view: View) {
    onViewChange(view);
    setMenuOpen(false);
  }

  return (
    <nav className={`${styles.nav}${hidden ? ` ${styles.hidden}` : ''}`}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => navigate('home')}>
          <img src={`${import.meta.env.BASE_URL}ai-mavericks-logo.avif`} alt="AI Mavericks" className={styles.logoMark} />
          AI Mavericks
        </button>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
        </button>
        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <button
            className={`${styles.link} ${currentView === 'home' ? styles.active : ''}`}
            onClick={() => navigate('home')}
          >
            Home
          </button>
          <button
            className={`${styles.link} ${currentView === 'people' ? styles.active : ''}`}
            onClick={() => navigate('people')}
          >
            People
          </button>
          <button
            className={`${styles.link} ${currentView === 'dinners' || currentView === 'dinner-detail' ? styles.active : ''}`}
            onClick={() => navigate('dinners')}
          >
            Dinners
          </button>
          {import.meta.env.DEV && (
            <button
              className={`${styles.link} ${currentView === 'styleguide' ? styles.active : ''}`}
              onClick={() => navigate('styleguide')}
            >
              Style Guide
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
