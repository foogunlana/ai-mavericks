import { useState } from 'react';
import styles from './Nav.module.css';
import type { View } from '../../App';
import { SignInButton } from '../Auth/SignInButton';
import { UserButton } from '../Auth/UserButton';

interface Props {
  currentView: View;
  onViewChange: (view: View) => void;
  hidden?: boolean;
  // When true (auth enabled but signed-out), the gated People/Dinners views are
  // unreachable, so their nav buttons are disabled rather than leading to a gate.
  locked?: boolean;
}

export function Nav({ currentView, onViewChange, hidden = false, locked = false }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const lockedProps = locked
    ? { disabled: true, title: 'Sign in to access', style: { opacity: 0.4, cursor: 'not-allowed' as const } }
    : {};

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
        <div className="flex items-center gap-8 ml-auto">
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
              {...lockedProps}
            >
              People
            </button>
            <button
              className={`${styles.link} ${currentView === 'dinners' || currentView === 'dinner-detail' ? styles.active : ''}`}
              onClick={() => navigate('dinners')}
              {...lockedProps}
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
          <div className="flex items-center gap-3">
            <SignInButton />
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
