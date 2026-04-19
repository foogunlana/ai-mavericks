import { useState, useRef, useCallback, useEffect } from 'react';
import { dinners } from '../../data/dinners';
import { DinnerHero } from '../DinnerHero/DinnerHero';
import { DinnerCard } from '../DinnerCard/DinnerCard';
import styles from './DinnersPage.module.css';

interface Props {
  onSelectDinner: (slug: string) => void;
}

const CONFETTI_COLORS = ['#7c3aed', '#a78bfa', '#c4b5fd', '#f472b6', '#818cf8', '#e879f9', '#fbbf24', '#34d399'];

const KEYFRAMES = `
@keyframes shimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 8px rgba(91, 33, 182, 0.25), 0 0 16px rgba(91, 33, 182, 0.1); }
  50% { box-shadow: 0 0 14px rgba(91, 33, 182, 0.35), 0 0 28px rgba(91, 33, 182, 0.15); }
}
@keyframes confetti-fall {
  0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
  100% { transform: translateY(120px) rotate(720deg) scale(0); opacity: 0; }
}
.btn-flashy { transition: filter 0.15s, transform 0.15s; }
.btn-flashy:hover { filter: brightness(1.15); transform: translateY(-1px); }
`;

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  shape: 'circle' | 'square' | 'strip';
}

function FlashyBtn({ children }: { children: React.ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);

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
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        className="btn-flashy"
        onClick={boom}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          padding: '10px 24px',
          borderRadius: '3px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #5b21b6, #7c3aed, #a855f7, #7c3aed, #5b21b6)',
          backgroundSize: '300% 300%',
          animation: 'shimmer 3s linear infinite, glow-pulse 3s ease-in-out infinite',
          color: '#ffffff',
          border: '1px solid rgba(91, 33, 182, 0.3)',
        }}
      >
        {children}
      </button>
      {particles.length > 0 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible', zIndex: 10 }}>
          {particles.map(p => {
            const size = p.shape === 'strip' ? { width: 3, height: 10 } : { width: 6, height: 6 };
            return (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: p.x,
                  top: p.y,
                  ...size,
                  backgroundColor: p.color,
                  borderRadius: p.shape === 'circle' ? '50%' : '1px',
                  animation: 'confetti-fall 0.8s ease-out forwards',
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

export function DinnersPage({ onSelectDinner }: Props) {
  const latestDinner = dinners[0];
  const remainingDinners = dinners.slice(1);

  return (
    <div className={styles.page}>
      <style>{KEYFRAMES}</style>

      {/* Hero — latest dinner */}
      {latestDinner && (
        <div className={styles.heroWrap}>
          <DinnerHero dinner={latestDinner} />
        </div>
      )}

      {/* Dinner List composite */}
      <div className={styles.listSection}>
        {/* Intro */}
        <div className={styles.intro}>
          <h2 className={styles.introHeading}>AI Mavericks Dinners</h2>
          <p className={styles.introBody}>
            Intimate gatherings where AI builders share ideas, debate the future, and connect over good food.
            No panels, no pitches — just real conversation.
          </p>
          <FlashyBtn>Join the Next Dinner</FlashyBtn>
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <span className={styles.count}>{remainingDinners.length} Dinners</span>
        </div>

        {/* 3-column grid */}
        <div className={styles.grid}>
          {remainingDinners.map(dinner => (
            <DinnerCard
              key={dinner.slug}
              dinner={dinner}
              onClick={() => onSelectDinner(dinner.slug)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
