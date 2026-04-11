import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

export function Nav() {
  const [active, setActive] = useState<'members' | 'dinners'>('members');

  useEffect(() => {
    const handleScroll = () => {
      const dinnersEl = document.getElementById('dinners');
      if (dinnersEl) {
        const rect = dinnersEl.getBoundingClientRect();
        setActive(rect.top <= 100 ? 'dinners' : 'members');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <span className={styles.logo}>AI Mavericks</span>
        <div className={styles.links}>
          <button
            className={`${styles.link} ${active === 'members' ? styles.active : ''}`}
            onClick={() => scrollTo('members')}
          >
            Members
          </button>
          <button
            className={`${styles.link} ${active === 'dinners' ? styles.active : ''}`}
            onClick={() => scrollTo('dinners')}
          >
            Dinners
          </button>
        </div>
      </div>
    </nav>
  );
}
