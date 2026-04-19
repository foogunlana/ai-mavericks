import { useState, useRef, useCallback, useEffect } from 'react';
import type { Dinner } from '../../types';
import type { View } from '../../App';
import styles from './LandingHero.module.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  shape: 'circle' | 'square' | 'strip';
}

const CONFETTI_COLORS = ['#7c3aed', '#a78bfa', '#c4b5fd', '#f472b6', '#818cf8', '#e879f9', '#fbbf24', '#34d399'];

function FlashyBtn({ children }: { children: React.ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const boom = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const shapes: Particle['shape'][] = ['circle', 'square', 'strip'];

    const newParticles: Particle[] = Array.from({ length: 24 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 80;
      return {
        id: nextId.current++,
        x: cx + Math.cos(angle) * distance,
        y: cy + Math.sin(angle) * distance,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 720 - 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      };
    });

    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => setParticles([]), 800);
    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-flex' }}>
      <button className={styles.flashyBtn} onClick={boom}>
        {children}
      </button>
      {particles.length > 0 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible', zIndex: 10 }}>
          {particles.map(p => {
            const size = p.shape === 'strip' ? { width: 3, height: 10 } : { width: 6, height: 6 };
            return (
              <div
                key={p.id}
                className={styles.confettiParticle}
                style={{
                  left: p.x,
                  top: p.y,
                  ...size,
                  backgroundColor: p.color,
                  borderRadius: p.shape === 'circle' ? '50%' : '1px',
                  transform: `rotate(${p.rotation}deg)`,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function formatDinnerMeta(dinner: Dinner): string {
  const date = new Date(dinner.date);
  const quarter = `Q${Math.ceil((date.getMonth() + 1) / 3)} ${date.getFullYear()}`;
  const venue = dinner.venue;
  return `${quarter} · ${venue}`;
}

interface LandingHeroProps {
  latestDinner: Dinner;
  onViewChange: (view: View) => void;
}

export function LandingHero({ latestDinner, onViewChange }: LandingHeroProps) {
  const count = latestDinner.attendees.length;

  return (
    <div className={styles.hero}>
      <div className={styles.meshBg} />
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
      <div className={`${styles.blob} ${styles.blob4}`} />

      <nav className={styles.landingNav}>
        <button className={styles.landingNavLogo} onClick={() => onViewChange('home')}>
          <img src="/images/logo.avif" alt="AI Mavericks" className={styles.landingNavLogoMark} />
          <span>AI Mavericks</span>
        </button>
        <div className={styles.landingNavLinks}>
          <button className={styles.landingNavLink} onClick={() => onViewChange('people')}>People</button>
          <button className={styles.landingNavLink} onClick={() => onViewChange('dinners')}>Dinners</button>
          <a className={styles.landingNavLink} href="#">Newsletter</a>
          <button className={styles.landingNavJoin}>Join Us</button>
        </div>
      </nav>

      <div className={styles.content}>
        <span className={styles.dinnerMeta}>
          {formatDinnerMeta(latestDinner)}
        </span>
        <h1 className={styles.heading}>
          AI Mavericks
        </h1>
        <p className={styles.tagline}>
          Where AI builders meet. Intimate dinners for founders, engineers, and operators shaping the future.
        </p>
        <p className={styles.attendeeCount}>
          {count} builder{count !== 1 ? 's' : ''} · One table · Real talk
        </p>
        <FlashyBtn>Join the Next Dinner</FlashyBtn>
      </div>

      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Scroll</span>
      </div>
    </div>
  );
}
