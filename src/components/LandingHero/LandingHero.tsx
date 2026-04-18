import { useState, useRef, useCallback, useEffect } from 'react';
import type { Dinner } from '../../types';
import styles from './LandingHero.module.css';

const FONT = "'Space Grotesk', sans-serif";

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
  const count = dinner.attendees.length;
  const venue = dinner.venue;
  return `${quarter} · ${count} builder${count !== 1 ? 's' : ''} · ${venue}`;
}

interface LandingHeroProps {
  latestDinner: Dinner;
}

export function LandingHero({ latestDinner }: LandingHeroProps) {
  return (
    <div className={styles.hero}>
      {/* Photo strip */}
      <div className={styles.photoStrip}>
        <img
          src={latestDinner.groupPhoto}
          alt=""
          className={styles.photo}
        />
        <div className={styles.photoGradient} />
      </div>

      {/* Text content */}
      <div className={styles.content}>
        <div className={styles.logoRow}>
          <img src="/images/logo.avif" alt="" className={styles.logoMark} />
          <span className={styles.brandName}>AI Mavericks</span>
        </div>
        <h1 className={styles.heading} style={{ fontFamily: FONT }}>
          The table where AI gets real
        </h1>
        <p className={styles.tagline} style={{ fontFamily: FONT }}>
          Intimate dinners for builders, founders, and operators. No panels. No pitches. Just honest conversation over good food.
        </p>
        <div className={styles.ctaRow}>
          <FlashyBtn>Join the Next Dinner</FlashyBtn>
          <span className={styles.dinnerMeta} style={{ fontFamily: FONT }}>
            {formatDinnerMeta(latestDinner)}
          </span>
        </div>
      </div>
    </div>
  );
}
