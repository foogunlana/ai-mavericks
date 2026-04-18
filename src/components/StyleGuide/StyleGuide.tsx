import { useState, useRef, useCallback, useEffect } from 'react';

export function StyleGuide() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <style>{KEYFRAMES}</style>
      <header className="mb-16">
        <h1 style={{ fontFamily: FONT, fontWeight: 300, fontSize: '2.369rem', lineHeight: 1.15, color: COLORS.text }} className="mb-3">
          Style Guide
        </h1>
        <p style={{ fontFamily: FONT, fontWeight: 400, fontSize: '1rem', lineHeight: 1.45, color: COLORS.textSecondary }}>
          Atom components — building blocks of the design system.
        </p>
      </header>

      <Section title="Typography">
        <div className="space-y-10">
          {TYPE_OPTIONS.map(opt => (
            <div key={opt.name} className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
              <OptionHeader label={opt.name} />
              <div style={{ backgroundColor: COLORS.bg, padding: '32px', maxWidth: '560px' }}>
                <p style={{ fontFamily: FONT, fontSize: TYPE.heading.size, fontWeight: opt.headingWeight, lineHeight: TYPE.heading.lineHeight, color: COLORS.text, letterSpacing: opt.headingTracking, textTransform: opt.headingCase }}>
                  March 2025 Dinner
                </p>
                <p style={{ fontFamily: FONT, fontSize: TYPE.subheading.size, fontWeight: opt.subheadingWeight, lineHeight: TYPE.subheading.lineHeight, color: COLORS.text, marginTop: '8px', letterSpacing: opt.subheadingTracking, textTransform: opt.subheadingCase }}>
                  The Shard, Level 31
                </p>
                <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, fontWeight: TYPE.body.weight, lineHeight: TYPE.body.lineHeight, color: opt.bodyColor, marginTop: '12px' }}>
                  Eight builders sat down to talk about AI agents in production. The conversation ranged from orchestration frameworks to the surprising ways customers actually use autonomous systems.
                </p>
                <p style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, lineHeight: TYPE.small.lineHeight, color: COLORS.textMuted, marginTop: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  8 attendees · 3 topics · Mar 15, 2025
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Button">
        <div className="space-y-10">
          {/* Flashy */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="Flashy — shimmering purple gradient, confetti on click" />
            <div style={{ backgroundColor: COLORS.bg, padding: '48px', display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'center' }}>
              <FlashyBtn>Read recap</FlashyBtn>
              <FlashyBtn>Join Discord</FlashyBtn>
              <FlashyBtn>Subscribe</FlashyBtn>
            </div>
          </div>

          {/* Shimmer border */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="Shimmer border — white fill, purple orbit on border, periodic" />
            <div style={{ backgroundColor: COLORS.bg, padding: '48px', display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'center' }}>
              <ShimmerBorderBtn>Read recap</ShimmerBorderBtn>
              <ShimmerBorderBtn>Join Discord</ShimmerBorderBtn>
              <ShimmerBorderBtn>Subscribe</ShimmerBorderBtn>
            </div>
          </div>

          {/* Ghost */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="Ghost — no fill, grey bg on hover" />
            <div style={{ backgroundColor: COLORS.bg, padding: '32px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Btn variant="ghost">People</Btn>
              <Btn variant="ghost">Dinners</Btn>
              <Btn variant="ghost">Clear filters</Btn>
              <Btn variant="ghost">{'\u2190'} Back</Btn>
            </div>
          </div>

          {/* Ghost disabled */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="Ghost disabled — faded, not-allowed cursor" />
            <div style={{ backgroundColor: COLORS.bg, padding: '32px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Btn variant="ghost" disabled>People</Btn>
              <Btn variant="ghost" disabled>Dinners</Btn>
            </div>
          </div>

          {/* Outline */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="Outline — surface bg + darker border on hover" />
            <div style={{ backgroundColor: COLORS.bg, padding: '32px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Btn variant="outline">View newsletter</Btn>
              <Btn variant="outline">See all dinners</Btn>
            </div>
          </div>

          {/* Outline disabled */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="Outline disabled — faded, not-allowed cursor" />
            <div style={{ backgroundColor: COLORS.bg, padding: '32px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Btn variant="outline" disabled>View newsletter</Btn>
              <Btn variant="outline" disabled>See all dinners</Btn>
            </div>
          </div>

          {/* Flashy disabled */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="Flashy disabled — desaturated, no animation" />
            <div style={{ backgroundColor: COLORS.bg, padding: '48px', display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'center' }}>
              <FlashyBtn disabled>Read recap</FlashyBtn>
              <ShimmerBorderBtn disabled>Join Discord</ShimmerBorderBtn>
            </div>
          </div>

          {/* Hierarchy */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="Together — hierarchy in context (hover them)" />
            <div style={{ backgroundColor: COLORS.bg, padding: '48px', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
              <FlashyBtn>Read recap</FlashyBtn>
              <Btn variant="outline">Join Discord</Btn>
              <Btn variant="ghost">Cancel</Btn>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ─── Constants ─── */

const FONT = "'Space Grotesk', sans-serif";

const COLORS = {
  bg: '#ffffff',
  text: '#1a1a1a',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  border: '#e5e7eb',
  borderLight: '#f3f4f6',
  surface: '#f9fafb',
  accent: '#1a1a1a',
  accentText: '#ffffff',
};

const TYPE = {
  heading:    { weight: 300, lineHeight: 1.15, size: '2.369rem' },
  subheading: { weight: 500, lineHeight: 1.25, size: '1.333rem' },
  body:       { weight: 400, lineHeight: 1.45, size: '1rem' },
  list:       { weight: 400, lineHeight: 1.35, size: '1rem' },
  small:      { weight: 500, lineHeight: 1.2,  size: '0.688rem' },
  caption:    { weight: 500, lineHeight: 1.1,  size: '0.5rem' },
};

type TextTransform = 'uppercase' | 'none' | 'lowercase' | 'capitalize';

const TYPE_OPTIONS: {
  name: string;
  headingWeight: number;
  headingTracking: string;
  headingCase: TextTransform;
  subheadingWeight: number;
  subheadingTracking: string;
  subheadingCase: TextTransform;
  bodyColor: string;
}[] = [
  {
    name: 'A · Elegant — light heading, secondary body, no uppercase',
    headingWeight: 300, headingTracking: 'normal', headingCase: 'none',
    subheadingWeight: 500, subheadingTracking: 'normal', subheadingCase: 'none',
    bodyColor: COLORS.textSecondary,
  },
  {
    name: 'B · Editorial — light heading, tracked subheading uppercase, darker body',
    headingWeight: 300, headingTracking: '-0.5px', headingCase: 'none',
    subheadingWeight: 500, subheadingTracking: '2px', subheadingCase: 'uppercase',
    bodyColor: '#4b5563',
  },
  {
    name: 'C · Bold — medium heading, dark body, all sentence case',
    headingWeight: 500, headingTracking: '-0.5px', headingCase: 'none',
    subheadingWeight: 400, subheadingTracking: 'normal', subheadingCase: 'none',
    bodyColor: COLORS.text,
  },
  {
    name: 'D · All-caps heading — tracked uppercase heading, light weight',
    headingWeight: 300, headingTracking: '4px', headingCase: 'uppercase',
    subheadingWeight: 500, subheadingTracking: 'normal', subheadingCase: 'none',
    bodyColor: COLORS.textSecondary,
  },
  {
    name: 'E · High contrast — semibold heading, tight tracking, muted body',
    headingWeight: 600, headingTracking: '-1px', headingCase: 'none',
    subheadingWeight: 300, subheadingTracking: 'normal', subheadingCase: 'none',
    bodyColor: COLORS.textSecondary,
  },
  {
    name: 'F · Magazine — regular heading, uppercase subheading, dark body',
    headingWeight: 400, headingTracking: 'normal', headingCase: 'none',
    subheadingWeight: 600, subheadingTracking: '1.5px', subheadingCase: 'uppercase',
    bodyColor: '#4b5563',
  },
];

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
@keyframes confetti-spread {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(var(--cx), var(--cy)) rotate(var(--cr)); opacity: 0; }
}
@keyframes border-sweep {
  0% { transform: rotate(0deg); opacity: 0; }
  3% { opacity: 0.8; }
  5% { opacity: 1; }
  32% { opacity: 1; }
  37% { transform: rotate(360deg); opacity: 0; }
  100% { transform: rotate(360deg); opacity: 0; }
}

/* Hover & disabled states */
.btn-ghost { transition: background-color 0.15s, color 0.15s; }
.btn-ghost:hover { background-color: ${COLORS.borderLight}; color: ${COLORS.text}; }
.btn-ghost:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-ghost:disabled:hover { background-color: transparent; color: ${COLORS.textSecondary}; }

.btn-outline { transition: background-color 0.15s, border-color 0.15s, color 0.15s; }
.btn-outline:hover { background-color: ${COLORS.surface}; border-color: ${COLORS.textMuted}; }
.btn-outline:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-outline:disabled:hover { background-color: transparent; border-color: ${COLORS.border}; }

.btn-flashy { transition: filter 0.15s, transform 0.15s; }
.btn-flashy:hover { filter: brightness(1.15); transform: translateY(-1px); }
.btn-flashy:disabled { filter: saturate(0.3) brightness(0.8); cursor: not-allowed; animation: none !important; }
.btn-flashy:disabled:hover { filter: saturate(0.3) brightness(0.8); transform: none; }

.btn-shimmer-wrap { transition: transform 0.15s; }
.btn-shimmer-wrap:hover { transform: translateY(-1px); }
.btn-shimmer-wrap:hover .btn-shimmer-inner { background-color: ${COLORS.surface}; }
.btn-shimmer-disabled { opacity: 0.4; cursor: not-allowed; }
.btn-shimmer-disabled .btn-shimmer-orbit { animation: none !important; opacity: 0 !important; }
.btn-shimmer-disabled:hover { transform: none; }
`;

/* ─── Sub-components ─── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-20">
      <h2 style={{ fontFamily: FONT, fontWeight: TYPE.subheading.weight, fontSize: TYPE.subheading.size, lineHeight: TYPE.subheading.lineHeight, color: COLORS.text, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '12px' }} className="mb-8">
        {title}
      </h2>
      {children}
    </section>
  );
}

function OptionHeader({ label }: { label: string }) {
  return (
    <div className="px-6 py-4" style={{ borderBottom: `1px solid ${COLORS.border}`, backgroundColor: COLORS.surface }}>
      <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, color: COLORS.text }}>{label}</span>
    </div>
  );
}

const BTN_BASE: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: TYPE.small.size,
  fontWeight: TYPE.small.weight,
  lineHeight: TYPE.small.lineHeight,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  padding: '8px 18px',
  borderRadius: '3px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
};

const BTN_VARIANTS: Record<string, React.CSSProperties> = {
  ghost: {
    backgroundColor: 'transparent',
    color: COLORS.textSecondary,
    border: '1px solid transparent',
    padding: '8px 10px',
  },
  outline: {
    backgroundColor: 'transparent',
    color: COLORS.text,
    border: `1px solid ${COLORS.border}`,
  },
};

function Btn({ variant = 'ghost', disabled, children }: { variant?: 'ghost' | 'outline'; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      className={`btn-${variant}`}
      disabled={disabled}
      style={{ ...BTN_BASE, ...BTN_VARIANTS[variant] }}
    >
      {children}
    </button>
  );
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  shape: 'circle' | 'square' | 'strip';
}

function FlashyBtn({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
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
      <button
        className="btn-flashy"
        onClick={disabled ? undefined : boom}
        disabled={disabled}
        style={{
          ...BTN_BASE,
          background: 'linear-gradient(135deg, #5b21b6, #7c3aed, #a855f7, #7c3aed, #5b21b6)',
          backgroundSize: '300% 300%',
          animation: disabled ? 'none' : 'shimmer 3s linear infinite, glow-pulse 3s ease-in-out infinite',
          color: '#ffffff',
          border: '1px solid rgba(91, 33, 182, 0.3)',
          padding: '10px 24px',
          fontWeight: 600,
          letterSpacing: '1.5px',
        }}
      >
        {children}
      </button>

      {/* Confetti layer */}
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

function ShimmerBorderBtn({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  return (
    <div className={disabled ? 'btn-shimmer-wrap btn-shimmer-disabled' : 'btn-shimmer-wrap'} style={{
      position: 'relative',
      display: 'inline-flex',
      borderRadius: '4px',
      padding: '1.5px',
      overflow: 'hidden',
      background: COLORS.border,
    }}>
      {/* Orbiting gradient — spins one direction, fades in/out with a pause */}
      <div className="btn-shimmer-orbit" style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: disabled ? 'none' : 'border-sweep 4s linear infinite',
      }}>
        <div style={{
          width: Math.max(200, 300) + '%',
          height: Math.max(200, 300) + '%',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, transparent 0%, transparent 75%, #7c3aed 83%, #a855f7 89%, #c4b5fd 94%, #a855f7 97%, transparent 100%)',
        }} />
      </div>

      {/* Inner button */}
      <button
        className="btn-shimmer-inner"
        disabled={disabled}
        style={{
          ...BTN_BASE,
          position: 'relative',
          backgroundColor: COLORS.bg,
          color: COLORS.text,
          border: 'none',
          borderRadius: '3px',
          padding: '10px 24px',
          fontWeight: 600,
          letterSpacing: '1.5px',
          zIndex: 1,
          transition: 'background-color 0.15s',
        }}
      >
        {children}
      </button>
    </div>
  );
}
