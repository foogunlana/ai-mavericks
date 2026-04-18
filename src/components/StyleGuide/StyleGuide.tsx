export function StyleGuide() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-16">
        <h1 style={{ fontFamily: FONT, fontWeight: 300, fontSize: '2.369rem', lineHeight: 1.15, color: COLORS.text }} className="mb-3">
          Style Guide
        </h1>
        <p style={{ fontFamily: FONT, fontWeight: 400, fontSize: '1rem', lineHeight: 1.45, color: COLORS.textSecondary }}>
          Single dropdown filter — minimal, out of the way.
        </p>
      </header>

      <Section title="Tag / Pill">
        <div className="space-y-10">
          {/* Outline variant */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="Outline — default / unselected / display" />
            <div style={{ backgroundColor: COLORS.bg, padding: '32px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Engineer', 'Founder', 'Data Scientist', 'Product Manager', 'Consultant'].map(t => (
                <Tag key={t} variant="outline">{t}</Tag>
              ))}
            </div>
          </div>

          {/* Filled variant */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="Filled — active / selected" />
            <div style={{ backgroundColor: COLORS.bg, padding: '32px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['AI Agents', 'LLMs', 'FinTech', 'Healthcare', 'Creative AI'].map(t => (
                <Tag key={t} variant="filled">{t}</Tag>
              ))}
            </div>
          </div>

          {/* Mixed — realistic filter bar */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="Mixed — realistic filter bar with 2 active" />
            <div style={{ backgroundColor: COLORS.bg, padding: '32px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Tag variant="filled">Engineer</Tag>
              <Tag variant="outline">Founder</Tag>
              <Tag variant="outline">Data Scientist</Tag>
              <Tag variant="filled">AI Agents</Tag>
              <Tag variant="outline">LLMs</Tag>
              <Tag variant="outline">FinTech</Tag>
              <Tag variant="outline">Healthcare</Tag>
            </div>
          </div>

          {/* On dark surface */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="On card — tags displayed as metadata" />
            <div style={{ backgroundColor: COLORS.bg, padding: '32px' }}>
              <div style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', maxWidth: '280px' }}>
                <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                  <img src={PHOTOS[0].photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.05)', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 12px 10px', background: 'linear-gradient(transparent, rgba(0,0,0,0.55))' }}>
                    <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, fontWeight: TYPE.body.weight, lineHeight: 1.2, color: '#fff' }}>Amara Osei</p>
                    <p style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Engineer</p>
                  </div>
                </div>
                <div style={{ padding: '10px 12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <Tag variant="outline">AI Agents</Tag>
                  <Tag variant="outline">LLMs</Tag>
                  <Tag variant="outline">RAG</Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Filter Pattern">
        <div className="space-y-10">
          {/* Closed state */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="Closed — no filters active" />
            <div style={{ backgroundColor: COLORS.bg }}>
              <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', margin: '32px' }}>
                <NavBar filterCount={0} />
                <MemberGrid />
              </div>
            </div>
          </div>

          {/* Closed with active filters */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="Closed — 5 filters active (badge shows count)" />
            <div style={{ backgroundColor: COLORS.bg }}>
              <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', margin: '32px' }}>
                <NavBar filterCount={5} />
                <MemberGrid />
              </div>
            </div>
          </div>

          {/* Open state */}
          <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
            <OptionHeader label="Open — dropdown panel showing all categories" />
            <div style={{ backgroundColor: COLORS.bg }}>
              <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', margin: '32px' }}>
                <NavBar filterCount={5} open />

                {/* Dropdown panel */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', top: 0, right: 24, width: '320px', zIndex: 10,
                    backgroundColor: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: '4px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  }}>
                    {/* Header */}
                    <div style={{ padding: '12px 16px', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, color: COLORS.text, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
                        Filters
                      </span>
                      <button style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.caption.weight, color: COLORS.textMuted, background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
                        Clear all
                      </button>
                    </div>

                    {/* Roles */}
                    <FilterGroup label="Role" items={ROLE_TAGS} activeCount={3} />

                    {/* Interests */}
                    <FilterGroup label="Interest" items={INTEREST_TAGS} activeCount={2} />

                    {/* Dinners */}
                    <FilterGroup label="Dinner" items={DINNER_DATES} activeCount={0} />
                  </div>
                </div>

                <MemberGrid />
              </div>
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

const LUCIDE = {
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  x: 'M18 6 6 18M6 6l12 12',
  check: 'M20 6 9 17l-5-5',
};

const PHOTOS = [
  { name: 'Amara Osei', role: 'Engineer', photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=533&fit=crop&crop=face' },
  { name: 'Marcus Webb', role: 'Product Manager', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=533&fit=crop&crop=face' },
  { name: 'Priya Nair', role: 'Data Scientist', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=533&fit=crop&crop=face' },
];

const ROLE_TAGS = ['Founder', 'Engineer', 'Data Scientist', 'Product Manager', 'Consultant', 'Designer', 'Investor'];
const INTEREST_TAGS = ['AI Agents', 'LLMs', 'FinTech', 'Healthcare', 'Robotics', 'Creative AI', 'Education', 'Marketing', 'RAG'];
const DINNER_DATES = ['Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Dec 2025', 'Q1 2026'];

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

function Icon({ path, size = 20, color = 'currentColor', strokeWidth = 2 }: { path: string; size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

function OptionHeader({ label }: { label: string }) {
  return (
    <div className="px-6 py-4" style={{ borderBottom: `1px solid ${COLORS.border}`, backgroundColor: COLORS.surface }}>
      <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, color: COLORS.text }}>{label}</span>
    </div>
  );
}

function NavBar({ filterCount, open }: { filterCount: number; open?: boolean }) {
  return (
    <nav style={{ height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: `1px solid ${COLORS.border}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/images/logo.avif" alt="" style={{ width: '30px', height: '30px', borderRadius: '4px' }} />
        <span style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.caption.weight, textTransform: 'uppercase' as const, letterSpacing: '3px', color: COLORS.text }}>
          AI Mavericks
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, textTransform: 'uppercase' as const, letterSpacing: '1.5px', color: COLORS.text }}>People</span>
        <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, textTransform: 'uppercase' as const, letterSpacing: '1.5px', color: COLORS.textMuted }}>Dinners</span>

        {/* Filter button */}
        <button style={{
          fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight,
          color: open ? COLORS.text : COLORS.textSecondary,
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          padding: 0,
        }}>
          <Icon path={LUCIDE.filter} size={14} color={open ? COLORS.text : COLORS.textSecondary} />
          {filterCount > 0 && (
            <span style={{
              fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.caption.weight,
              color: COLORS.accentText, backgroundColor: COLORS.accent,
              borderRadius: '9999px', padding: '1px 5px', minWidth: '16px', textAlign: 'center' as const,
            }}>
              {filterCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

function FilterGroup({ label, items, activeCount }: { label: string; items: string[]; activeCount: number }) {
  return (
    <div style={{ borderBottom: `1px solid ${COLORS.borderLight}` }}>
      <div style={{ padding: '10px 16px 6px' }}>
        <span style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.caption.weight, color: COLORS.textMuted, textTransform: 'uppercase' as const, letterSpacing: '1px' }}>
          {label}
        </span>
      </div>
      <div>
        {items.map((item, i) => {
          const isActive = i < activeCount;
          return (
            <div
              key={item}
              style={{
                padding: '6px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer',
                backgroundColor: isActive ? COLORS.borderLight : 'transparent',
              }}
            >
              <span style={{
                fontFamily: FONT,
                fontSize: TYPE.small.size,
                fontWeight: isActive ? 600 : TYPE.small.weight,
                color: isActive ? COLORS.text : COLORS.textSecondary,
              }}>
                {item}
              </span>
              {isActive && <Icon path={LUCIDE.check} size={14} color={COLORS.text} strokeWidth={2} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Tag({ variant = 'outline', children }: { variant?: 'outline' | 'filled'; children: React.ReactNode }) {
  const isFilled = variant === 'filled';
  return (
    <span style={{
      fontFamily: FONT,
      fontSize: TYPE.small.size,
      fontWeight: TYPE.small.weight,
      lineHeight: TYPE.small.lineHeight,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      padding: '4px 10px',
      borderRadius: '3px',
      display: 'inline-block',
      ...(isFilled
        ? { backgroundColor: COLORS.accent, color: COLORS.accentText, border: '1px solid transparent' }
        : { backgroundColor: 'transparent', color: COLORS.textSecondary, border: `1px solid ${COLORS.border}` }
      ),
    }}>
      {children}
    </span>
  );
}

function MemberGrid() {
  return (
    <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {PHOTOS.map(({ name, role, photo }) => (
        <div key={name} style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
            <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.05)', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 12px 10px', background: 'linear-gradient(transparent, rgba(0,0,0,0.55))' }}>
              <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, fontWeight: TYPE.body.weight, lineHeight: 1.2, color: '#fff' }}>{name}</p>
              <p style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, textTransform: 'uppercase' as const, letterSpacing: '0.5px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>{role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
