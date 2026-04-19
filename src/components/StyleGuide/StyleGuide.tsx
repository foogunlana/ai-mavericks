import { useState, useRef, useCallback, useEffect } from 'react';

type SectionId = 'landing-hero' | 'member-hover' | 'member-flip' | 'typography' | 'button' | 'tag' | 'avatar' | 'card' | 'icons' | 'logo' | 'filter' | 'nav' | 'member-list' | 'view-toggle' | 'member-views' | 'dinner-card' | 'dinner-list' | 'dinner-hero';

const SECTION_LABELS: { id: SectionId; label: string }[] = [
  { id: 'landing-hero', label: 'Landing Hero' },
  { id: 'member-hover', label: 'MemberCard — Hover' },
  { id: 'member-flip',  label: 'MemberCard — Flip' },
  { id: 'typography',   label: 'Typography' },
  { id: 'button',       label: 'Button' },
  { id: 'tag',          label: 'Tag' },
  { id: 'avatar',       label: 'Avatar' },
  { id: 'card',         label: 'Card' },
  { id: 'icons',        label: 'Icons' },
  { id: 'filter',       label: 'Filter' },
  { id: 'logo',         label: 'Logo' },
  { id: 'nav',          label: 'Nav' },
  { id: 'member-list',  label: 'Member List' },
  { id: 'view-toggle',  label: 'View Toggle' },
  { id: 'member-views', label: 'Member Views' },
  { id: 'dinner-card', label: 'Dinner Card' },
  { id: 'dinner-list', label: 'Dinner List' },
  { id: 'dinner-hero', label: 'Dinner Hero' },
];

export function StyleGuide() {
  const [activeSection, setActiveSection] = useState<SectionId>('landing-hero');

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <style>{KEYFRAMES}</style>
      <header className="mb-8">
        <h1 style={{ fontFamily: FONT, fontWeight: 300, fontSize: '2.369rem', lineHeight: 1.15, color: COLORS.text }} className="mb-3">
          Style Guide
        </h1>
        <p style={{ fontFamily: FONT, fontWeight: 400, fontSize: '1rem', lineHeight: 1.45, color: COLORS.textSecondary }}>
          Atom components — building blocks of the design system.
        </p>
      </header>

      {/* Section switcher */}
      <nav style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '48px' }}>
        {SECTION_LABELS.map(({ id, label }) => (
          <button
            key={id}
            className="btn-ghost"
            onClick={() => setActiveSection(id)}
            style={{
              ...BTN_BASE,
              ...BTN_VARIANTS.ghost,
              backgroundColor: activeSection === id ? COLORS.borderLight : 'transparent',
              color: activeSection === id ? COLORS.text : COLORS.textSecondary,
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {activeSection === 'landing-hero' && (
        <Section title="Landing Page — Hero">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Fullscreen, no background image. Animated, colourful, alive. Three viewport options: 100vh, ~90vh with peek, and dynamic grid.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {HERO_OPTIONS.map(opt => (
              <div key={opt.name} style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
                <OptionHeader label={opt.name} />
                <LandingHeroDemo variant={opt.variant} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {activeSection === 'member-hover' && (
        <Section title="MemberCard — Hover Overlay">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            All three shown in "hovered" state so you can compare. Front: portrait + name + role. Hover reveals bio, interests, last dinner.
          </p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {HOVER_OPTIONS.map((opt, i) => (
              <div key={opt.name} className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}`, flex: '1 1 280px' }}>
                <OptionHeader label={opt.name} />
                <MemberCardHoverDemo variant={opt.variant} member={SAMPLE_MEMBERS[i]} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {activeSection === 'member-flip' && (
        <Section title="MemberCard — Click to Flip">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Click to flip. Front: option B (full overlay). Back: stacked dark layout.
          </p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {SAMPLE_MEMBERS.map(member => (
              <div key={member.name} style={{ flex: '1 1 280px' }}>
                <MemberCardFlipDemo member={member} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {activeSection === 'typography' && (
        <Section title="Typography">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Six type treatments — heading weight, subheading tracking, and body colour. All use Space Grotesk.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {TYPE_OPTIONS.map(opt => (
              <div key={opt.name} style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
                <OptionHeader label={opt.name} />
                <div style={{ padding: '28px 24px', backgroundColor: COLORS.bg }}>
                  <h2 style={{
                    fontFamily: FONT,
                    fontWeight: opt.headingWeight,
                    fontSize: TYPE.heading.size,
                    lineHeight: TYPE.heading.lineHeight,
                    color: COLORS.text,
                    letterSpacing: opt.headingTracking,
                    textTransform: opt.headingCase,
                    marginBottom: '8px',
                  }}>
                    The Founders' Table
                  </h2>
                  <p style={{
                    fontFamily: FONT,
                    fontWeight: opt.subheadingWeight,
                    fontSize: TYPE.subheading.size,
                    lineHeight: TYPE.subheading.lineHeight,
                    color: COLORS.text,
                    letterSpacing: opt.subheadingTracking,
                    textTransform: opt.subheadingCase,
                    marginBottom: '12px',
                  }}>
                    Intimate dinners for people building the future
                  </p>
                  <p style={{
                    fontFamily: FONT,
                    fontWeight: TYPE.body.weight,
                    fontSize: TYPE.body.size,
                    lineHeight: TYPE.body.lineHeight,
                    color: opt.bodyColor,
                  }}>
                    Twelve founders, operators, and investors. One table. Real conversations about what it actually takes — the messy middle, the near-misses, the breakthroughs that came from nowhere.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {activeSection === 'button' && (
        <Section title="Button">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            All variants — active and disabled states.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Flashy */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Flashy — animated gradient, confetti on click" />
              <div style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <FlashyBtn>Join the Table</FlashyBtn>
                <FlashyBtn disabled>Join the Table</FlashyBtn>
                <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>disabled →</span>
              </div>
            </div>

            {/* Shimmer border */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Shimmer border — orbiting gradient border" />
              <div style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <ShimmerBorderBtn>Apply Now</ShimmerBorderBtn>
                <ShimmerBorderBtn disabled>Apply Now</ShimmerBorderBtn>
                <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>disabled →</span>
              </div>
            </div>

            {/* Ghost */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Ghost — transparent, subtle hover" />
              <div style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <Btn variant="ghost">Learn More</Btn>
                <Btn variant="ghost" disabled>Learn More</Btn>
                <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>disabled →</span>
              </div>
            </div>

            {/* Outline */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Outline — bordered, solid hover" />
              <div style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <Btn variant="outline">View Profile</Btn>
                <Btn variant="outline" disabled>View Profile</Btn>
                <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>disabled →</span>
              </div>
            </div>

            {/* Together — hierarchy */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Together — hierarchy (primary → secondary → tertiary)" />
              <div style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <FlashyBtn>Join the Table</FlashyBtn>
                <Btn variant="outline">View Profile</Btn>
                <Btn variant="ghost">Learn More</Btn>
              </div>
            </div>
          </div>
        </Section>
      )}

      {activeSection === 'tag' && (
        <Section title="Tag / Pill">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Outline tag style — used for interests and filters.
          </p>
          <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
            <OptionHeader label="Outline tag — dark border, sentence case" />
            <div style={{ padding: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {SAMPLE_TAGS.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily: FONT,
                    fontSize: TYPE.small.size,
                    fontWeight: TYPE.small.weight,
                    color: COLORS.text,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: '3px',
                    padding: '4px 10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    backgroundColor: COLORS.bg,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Section>
      )}

      {activeSection === 'avatar' && (
        <Section title="Avatar">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Four sizes — sm (32px), back-thumbnail (36px), md (48px), lg (80px). Grayscale + contrast filter, 4px border radius. Initials fallback shown on the right.
          </p>
          <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' }}>
            <OptionHeader label="Photo avatars — all sizes" />
            <div style={{ padding: '24px', display: 'flex', gap: '24px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              {AVATAR_SIZES.map(({ label, size }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <img
                    src={SAMPLE_MEMBERS[0].photo}
                    alt={SAMPLE_MEMBERS[0].name}
                    style={{
                      width: size,
                      height: size,
                      borderRadius: '4px',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      filter: 'grayscale(100%) contrast(1.1)',
                    }}
                  />
                  <span style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {label} · {size}px
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
            <OptionHeader label="Initials fallback — all sizes" />
            <div style={{ padding: '24px', display: 'flex', gap: '24px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              {AVATAR_SIZES.map(({ label, size }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: size,
                      height: size,
                      borderRadius: '4px',
                      backgroundColor: COLORS.surface,
                      border: `1px solid ${COLORS.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: FONT,
                      fontWeight: 500,
                      fontSize: Math.round(size * 0.35),
                      color: COLORS.textSecondary,
                    }}
                  >
                    AK
                  </div>
                  <span style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {label} · {size}px
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {activeSection === 'card' && (
        <Section title="Card">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Two shadow levels. White background, 4px radius.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Elevated */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Elevated — 0 4px 12px rgba(0,0,0,0.10) · for photo cards" />
              <div style={{ padding: '24px', backgroundColor: COLORS.surface, display: 'flex', gap: '16px' }}>
                {SAMPLE_MEMBERS.slice(0, 3).map(member => (
                  <div key={member.name} style={{
                    borderRadius: '4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
                    overflow: 'hidden',
                    flex: '1 1 200px',
                    aspectRatio: '3/4',
                    position: 'relative',
                    backgroundColor: '#1a1a1a',
                  }}>
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%) contrast(1.1)', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)' }}>
                      <p style={{ fontFamily: FONT, fontWeight: TYPE.subheading.weight, fontSize: TYPE.subheading.size, color: '#fff', lineHeight: TYPE.subheading.lineHeight }}>{member.name}</p>
                      <p style={{ fontFamily: FONT, fontWeight: TYPE.small.weight, fontSize: TYPE.small.size, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>{member.role}</p>
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '8px' }}>
                        {member.interests.map(tag => (
                          <span key={tag} style={{
                            fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight,
                            color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '3px', padding: '2px 6px', textTransform: 'uppercase', letterSpacing: '0.5px',
                          }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Subtle — 0 1px 3px rgba(0,0,0,0.06) · for list items" />
              <div style={{ padding: '24px', backgroundColor: COLORS.surface, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {SAMPLE_MEMBERS.map(member => (
                  <div
                    key={member.name}
                    style={{
                      backgroundColor: COLORS.bg,
                      borderRadius: '4px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{ width: 36, height: 36, borderRadius: '4px', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%) contrast(1.1)', flexShrink: 0 }}
                    />
                    <div>
                      <p style={{ fontFamily: FONT, fontWeight: 500, fontSize: TYPE.small.size, color: COLORS.text, lineHeight: 1.2 }}>{member.name}</p>
                      <p style={{ fontFamily: FONT, fontWeight: TYPE.body.weight, fontSize: TYPE.caption.size, color: COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}
      {activeSection === 'icons' && (
        <Section title="Icons">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Lucide for UI icons. Outlined circle treatment for social brand icons.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* UI Icons — Lucide */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="UI Icons — Lucide, 2px stroke, 20px default" />
              <div style={{ padding: '32px', display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                {UI_ICONS.map(icon => (
                  <div key={icon.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={icon.path} />
                    </svg>
                    <span style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{icon.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Icons — outlined circle */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Social Icons — outlined circle + brand SVG, 36px" />
              <div style={{ padding: '32px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                {(['x', 'linkedin', 'discord'] as const).map(type => (
                  <div key={type} style={{
                    width: 36, height: 36, borderRadius: '50%', border: `1.5px solid ${COLORS.textMuted}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <SocialIcon type={type} />
                  </div>
                ))}
              </div>
            </div>

            {/* Social Icons — bare (card back usage) */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Social Icons — bare, 14px (used on card back)" />
              <div style={{ padding: '32px', backgroundColor: DARK.bg, display: 'flex', gap: '12px', alignItems: 'center' }}>
                {(['x', 'linkedin', 'discord'] as const).map(type => (
                  <SocialIcon key={type} type={type} />
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {activeSection === 'filter' && (
        <Section title="Filter Dropdown">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Single filter icon in nav. Badge when active. Dropdown panel with category checklists.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Filter icon states */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Filter icon states — inactive, active with badge" />
              <div style={{ padding: '32px', display: 'flex', gap: '32px', alignItems: 'center' }}>
                {/* Inactive */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                  </svg>
                  <span style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>No filters</span>
                </div>
                {/* Active with badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ position: 'relative' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                    </svg>
                    <div style={{
                      position: 'absolute', top: -4, right: -6,
                      width: 14, height: 14, borderRadius: '50%', backgroundColor: COLORS.text,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontFamily: FONT, fontSize: '7px', fontWeight: 600, color: COLORS.bg }}>3</span>
                    </div>
                  </div>
                  <span style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>3 active</span>
                </div>
              </div>
            </div>

            {/* Dropdown panel */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Dropdown panel — 320px, category checklists" />
              <div style={{ padding: '32px', backgroundColor: COLORS.surface }}>
                <div style={{
                  width: '320px', backgroundColor: COLORS.bg, borderRadius: '4px',
                  border: `1px solid ${COLORS.border}`, boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: `1px solid ${COLORS.border}` }}>
                    <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, color: COLORS.text, textTransform: 'uppercase', letterSpacing: '1px' }}>Filters</span>
                    <button style={{ ...BTN_BASE, ...BTN_VARIANTS.ghost, fontSize: TYPE.caption.size, padding: '4px 8px' }}>Clear all</button>
                  </div>
                  {/* Role section */}
                  <div style={{ padding: '8px 0' }}>
                    <p style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', padding: '4px 16px' }}>Role</p>
                    {['Founder', 'Engineer', 'Data Scientist', 'Product Manager'].map((role, i) => (
                      <div key={role} style={{
                        padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                        backgroundColor: i < 2 ? COLORS.borderLight : 'transparent',
                      }}>
                        <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: i < 2 ? 600 : 400, color: i < 2 ? COLORS.text : COLORS.textSecondary }}>{role}</span>
                        {i < 2 && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.text} strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>}
                      </div>
                    ))}
                  </div>
                  {/* Interest section */}
                  <div style={{ padding: '8px 0', borderTop: `1px solid ${COLORS.border}` }}>
                    <p style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', padding: '4px 16px' }}>Interest</p>
                    {['AI Agents', 'LLMs', 'Fintech', 'Healthcare'].map((interest, i) => (
                      <div key={interest} style={{
                        padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                        backgroundColor: i === 0 ? COLORS.borderLight : 'transparent',
                      }}>
                        <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? COLORS.text : COLORS.textSecondary }}>{interest}</span>
                        {i === 0 && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.text} strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {activeSection === 'member-list' && (
        <Section title="Member List — Filter + Grid Composite">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            How the filter and member grid relate visually. Filter should be obvious, clearly connected to the grid, and minimal.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

            {/* Confirmed: Socials below intro */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Socials below intro — icons sit under the description text, left-aligned" />
              <div style={{ backgroundColor: COLORS.bg, padding: '32px' }}>
                <div style={{ maxWidth: '600px', marginBottom: '32px' }}>
                  <h3 style={{ fontFamily: FONT, fontWeight: TYPE.heading.weight, fontSize: TYPE.subheading.size, lineHeight: TYPE.subheading.lineHeight, color: COLORS.text, margin: '0 0 8px' }}>
                    A community of AI builders
                  </h3>
                  <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, fontWeight: TYPE.body.weight, lineHeight: TYPE.body.lineHeight, color: COLORS.textSecondary, margin: '0 0 16px' }}>
                    We bring together engineers, researchers, and founders who are building with AI — over intimate dinners designed for real conversation. Explore the people and the gatherings that make up Mavericks.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {(['x', 'linkedin', 'discord'] as const).map(type => (
                      <div key={type} style={{
                        width: 36, height: 36, borderRadius: '50%', border: `1.5px solid ${COLORS.textMuted}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      }}>
                        <SocialIcon type={type} />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Toolbar — icons left, count right */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0', borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`,
                  marginBottom: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Filter icon */}
                    <div style={{ position: 'relative', cursor: 'pointer' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                      </svg>
                      <div style={{
                        position: 'absolute', top: -4, right: -6,
                        width: 14, height: 14, borderRadius: '50%', backgroundColor: COLORS.text,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{ fontFamily: FONT, fontSize: '7px', fontWeight: 600, color: COLORS.bg }}>2</span>
                      </div>
                    </div>
                    {/* View toggle — active filled, inactive stroke */}
                    {VIEW_TOGGLE_MODES.map((v, i) => (
                      <div key={v.label} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill={i === 0 ? COLORS.text : 'none'} stroke={i === 0 ? 'none' : COLORS.textMuted} strokeWidth="1.5">
                          <path d={v.icon} />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {SAMPLE_MEMBERS.length} Members · Filter by role or interest
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px' }}>
                  {SAMPLE_MEMBERS.map(m => (
                    <MiniCard key={m.name} member={m} />
                  ))}
                </div>
              </div>
            </div>


          </div>
        </Section>
      )}

      {activeSection === 'view-toggle' && (
        <Section title="View Toggle">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Segmented control for switching between list layouts. Reusable atom — can apply to any list, not just members.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {/* Confirmed: Minimal icons — active filled, inactive stroke, no underline */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Minimal icons (confirmed) — active filled dark, inactive stroke muted, no underline" />
              <div style={{ padding: '32px', backgroundColor: COLORS.bg }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {VIEW_TOGGLE_MODES.map((v, i) => (
                    <div key={v.label} style={{
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={i === 0 ? COLORS.text : 'none'} stroke={i === 0 ? 'none' : COLORS.textMuted} strokeWidth="1.5">
                        <path d={v.icon} />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {activeSection === 'member-views' && (
        <Section title="Member Views">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Two view modes: photo cards and detailed list. Both confirmed.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

            {/* Photo cards — confirmed */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Photo cards (confirmed) — 3-col grid, 3/4 portrait, 32px gap" />
              <div style={{ padding: '24px', backgroundColor: COLORS.bg }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px' }}>
                  {SAMPLE_MEMBERS.map(m => (
                    <MiniCard key={m.name} member={m} />
                  ))}
                </div>
              </div>
            </div>

            {/* ─── LIST VIEW (confirmed: B · Detailed) ─── */}

            {/* List B: Detailed — confirmed */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="List B · Detailed (confirmed) — 48px avatar, bio snippet, name + role inline, tags" />
              <div style={{ padding: '24px', backgroundColor: COLORS.bg }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {SAMPLE_MEMBERS.map((m, i) => (
                    <div key={m.name} style={{
                      display: 'flex', gap: '12px', padding: '14px 0', cursor: 'pointer',
                      borderTop: i === 0 ? 'none' : `1px solid ${COLORS.borderLight}`,
                    }}>
                      <img src={m.photo} alt={m.name} style={{ width: 48, height: 48, borderRadius: '4px', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%) contrast(1.1)', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                          <p style={{ fontFamily: FONT, fontWeight: TYPE.subheading.weight, fontSize: TYPE.small.size, color: COLORS.text, lineHeight: TYPE.small.lineHeight, margin: 0 }}>{m.name}</p>
                          <p style={{ fontFamily: FONT, fontWeight: TYPE.small.weight, fontSize: TYPE.caption.size, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.role}</p>
                        </div>
                        <p style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.body.weight, color: COLORS.textSecondary, lineHeight: 1.4, marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{m.bio}</p>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
                          {m.interests.map(tag => (
                            <span key={tag} style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}`, borderRadius: '3px', padding: '1px 5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── ALPHA JUMP ─── */}
            <div style={{ borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '8px', marginBottom: '-24px' }}>
              <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, color: COLORS.text, textTransform: 'uppercase', letterSpacing: '1px' }}>Alphabetical Quick-Jump</span>
            </div>

            {/* Alpha jump demo */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Sticky letter bar — A–Z strip, click to scroll, active letter highlighted" />
              <div style={{ padding: '24px', backgroundColor: COLORS.bg }}>
                {/* Letter bar */}
                <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', marginBottom: '20px', padding: '8px 0', borderBottom: `1px solid ${COLORS.border}` }}>
                  {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => {
                    const hasMembers = ['A', 'J', 'S'].includes(letter);
                    const isActive = letter === 'A';
                    return (
                      <span key={letter} style={{
                        fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: isActive ? 600 : TYPE.small.weight,
                        color: isActive ? COLORS.bg : hasMembers ? COLORS.text : COLORS.textMuted,
                        backgroundColor: isActive ? COLORS.text : 'transparent',
                        width: '22px', height: '22px', borderRadius: '3px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: hasMembers ? 'pointer' : 'default',
                        opacity: hasMembers || isActive ? 1 : 0.4,
                      }}>{letter}</span>
                    );
                  })}
                </div>
                {/* Example grouped list */}
                <div>
                  <p style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: 600, color: COLORS.text, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px', padding: '4px 0', borderBottom: `1px solid ${COLORS.borderLight}` }}>A</p>
                  {SAMPLE_MEMBERS.slice(0, 1).map(m => (
                    <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0' }}>
                      <img src={m.photo} alt={m.name} style={{ width: 48, height: 48, borderRadius: '4px', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%) contrast(1.1)', flexShrink: 0 }} />
                      <div>
                        <p style={{ fontFamily: FONT, fontWeight: TYPE.subheading.weight, fontSize: TYPE.small.size, color: COLORS.text, margin: 0 }}>{m.name}</p>
                        <p style={{ fontFamily: FONT, fontWeight: TYPE.small.weight, fontSize: TYPE.caption.size, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '1px' }}>{m.role}</p>
                      </div>
                    </div>
                  ))}
                  <p style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: 600, color: COLORS.text, textTransform: 'uppercase', letterSpacing: '1px', margin: '16px 0 8px', padding: '4px 0', borderBottom: `1px solid ${COLORS.borderLight}` }}>J</p>
                  {SAMPLE_MEMBERS.slice(1, 2).map(m => (
                    <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0' }}>
                      <img src={m.photo} alt={m.name} style={{ width: 48, height: 48, borderRadius: '4px', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%) contrast(1.1)', flexShrink: 0 }} />
                      <div>
                        <p style={{ fontFamily: FONT, fontWeight: TYPE.subheading.weight, fontSize: TYPE.small.size, color: COLORS.text, margin: 0 }}>{m.name}</p>
                        <p style={{ fontFamily: FONT, fontWeight: TYPE.small.weight, fontSize: TYPE.caption.size, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '1px' }}>{m.role}</p>
                      </div>
                    </div>
                  ))}
                  <p style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: 600, color: COLORS.text, textTransform: 'uppercase', letterSpacing: '1px', margin: '16px 0 8px', padding: '4px 0', borderBottom: `1px solid ${COLORS.borderLight}` }}>S</p>
                  {SAMPLE_MEMBERS.slice(2, 3).map(m => (
                    <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0' }}>
                      <img src={m.photo} alt={m.name} style={{ width: 48, height: 48, borderRadius: '4px', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%) contrast(1.1)', flexShrink: 0 }} />
                      <div>
                        <p style={{ fontFamily: FONT, fontWeight: TYPE.subheading.weight, fontSize: TYPE.small.size, color: COLORS.text, margin: 0 }}>{m.name}</p>
                        <p style={{ fontFamily: FONT, fontWeight: TYPE.small.weight, fontSize: TYPE.caption.size, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '1px' }}>{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </Section>
      )}

      {activeSection === 'dinner-card' && (
        <Section title="Dinner Card & Dinner List Composite">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Dinner card atom (confirmed: elevated, full-colour 16:9 photo, hover zoom-out) and composite listing layout.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

            {/* ─── Confirmed dinner card spec ─── */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Dinner Card (confirmed) — elevated, full-colour 16:9, hover zoom-out, 4px radius" />
              <div style={{ padding: '24px', backgroundColor: COLORS.surface, maxWidth: '380px' }}>
                <DinnerCardDemo
                  cardBg={COLORS.bg}
                  textColor={COLORS.text}
                  secondaryColor={COLORS.textSecondary}
                  mutedColor={COLORS.textMuted}
                  tagBorder={COLORS.border}
                  shadow="0 4px 12px rgba(0,0,0,0.10)"
                />
              </div>
            </div>

          </div>
        </Section>
      )}

      {activeSection === 'dinner-list' && (
        <Section title="Dinner List Composite">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Full dinners page layout: intro with CTA, toolbar with count, 3-column grid of dinner cards.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Dinner List — intro + flashy CTA + toolbar + 3-col grid, 32px gap" />
              <div style={{ padding: '32px', backgroundColor: COLORS.bg }}>
                {/* Intro */}
                <div style={{ maxWidth: '600px', marginBottom: '32px' }}>
                  <h3 style={{
                    fontFamily: FONT, fontWeight: TYPE.heading.weight, fontSize: TYPE.subheading.size,
                    lineHeight: TYPE.subheading.lineHeight, color: COLORS.text, margin: '0 0 8px',
                  }}>
                    AI Mavericks Dinners
                  </h3>
                  <p style={{
                    fontFamily: FONT, fontSize: TYPE.body.size, fontWeight: TYPE.body.weight,
                    lineHeight: TYPE.body.lineHeight, color: COLORS.textSecondary, margin: '0 0 16px',
                  }}>
                    Intimate gatherings where AI builders share ideas, debate the future, and connect over good food. No panels, no pitches — just real conversation.
                  </p>
                  <FlashyBtn>Join the Next Dinner</FlashyBtn>
                </div>
                {/* Toolbar */}
                <div style={{
                  display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
                  padding: '12px 0', borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`,
                  marginBottom: '24px',
                }}>
                  <span style={{
                    fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight,
                    color: COLORS.textMuted, textTransform: 'uppercase' as const, letterSpacing: '0.5px',
                  }}>
                    6 Dinners
                  </span>
                </div>
                {/* 3-col grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px' }}>
                  {[
                    { date: 'Mar 21, 2026', name: 'Q1 2026 Dinner', venue: 'Pizza Express Live', attendees: 8, desc: 'Builders debating whether junior devs should bother learning to code, AI in education, and LLMs in African fintech.', seed: 'mar2026' },
                    { date: 'Dec 29, 2025', name: 'December 2025 Dinner', venue: 'Pizza Express Live', attendees: 7, desc: 'A festive gathering exploring multi-agent orchestration, voice AI, and the future of AI-native startups.', seed: 'dec2025' },
                    { date: 'Oct 9, 2024', name: 'October 2024 Dinner', venue: 'London', attendees: 7, desc: 'The inaugural AI Mavericks dinner bringing together builders, founders and consultants working on AI.', seed: '2024-10-october' },
                  ].map(d => (
                    <DinnerCardMini key={d.seed} dinner={d} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {activeSection === 'dinner-hero' && (
        <Section title="Dinner Hero — Latest Dinner Showcase">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Split hero for the dinners page. Photo left, details right. Shows off the latest dinner — topics, attendees, venue.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <DinnerHeroB />
          </div>
        </Section>
      )}

      {activeSection === 'nav' && (
        <Section title="Nav Bar">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Sticky top bar — logo left, links right, bottom border. Compare sizing, spacing, and typography across options.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {NAV_OPTIONS.map(opt => (
              <div key={opt.name} style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
                <OptionHeader label={opt.name} />
                <div style={{ backgroundColor: COLORS.bg }}>
                  <div style={{
                    height: `${opt.height}px`, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: `0 ${opt.hPad}px`, borderBottom: `1px solid ${COLORS.border}`,
                  }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: `${opt.logoGap}px`, cursor: 'pointer' }}>
                      <img src="/ai-mavericks-logo.avif" alt="AI Mavericks" style={{ width: opt.logoSize, height: opt.logoSize, borderRadius: '4px' }} />
                      <span style={{ fontFamily: FONT, fontSize: opt.fontSize, fontWeight: opt.fontWeight, color: COLORS.text, textTransform: 'uppercase', letterSpacing: opt.letterSpacing }}>
                        AI Mavericks
                      </span>
                    </div>
                    {/* Links */}
                    <div style={{ display: 'flex', gap: `${opt.linkGap}px` }}>
                      {NAV_LINKS.map(link => (
                        <span
                          key={link.label}
                          style={{
                            fontFamily: FONT,
                            fontSize: opt.fontSize,
                            fontWeight: opt.fontWeight,
                            color: link.active ? COLORS.text : COLORS.textMuted,
                            textTransform: 'uppercase',
                            letterSpacing: opt.letterSpacing,
                            paddingBottom: '2px',
                            borderBottom: link.active ? `1px solid ${COLORS.text}` : '1px solid transparent',
                            cursor: 'pointer',
                          }}
                        >
                          {link.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Inline specs */}
                <div style={{ padding: '10px 16px', backgroundColor: COLORS.surface, display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {[
                    `Height: ${opt.height}px`,
                    `H-pad: ${opt.hPad}px`,
                    `Link gap: ${opt.linkGap}px`,
                    `Logo: ${opt.logoSize}px`,
                    `Font: ${opt.fontSize}`,
                    `Weight: ${opt.fontWeight}`,
                  ].map(s => (
                    <span key={s} style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {activeSection === 'logo' && (
        <Section title="Logo">
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, color: COLORS.textSecondary, marginBottom: '24px' }}>
            Logo mark + wordmark. Tracked uppercase Small type.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Nav context */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="In nav context — logo mark + AI MAVERICKS" />
              <div style={{ padding: '0', backgroundColor: COLORS.bg }}>
                <div style={{
                  height: '56px', display: 'flex', alignItems: 'center', padding: '0 24px',
                  borderBottom: `1px solid ${COLORS.border}`, gap: '10px',
                }}>
                  <img src="/ai-mavericks-logo.avif" alt="AI Mavericks" style={{ width: 28, height: 28, borderRadius: '4px' }} />
                  <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, color: COLORS.text, textTransform: 'uppercase', letterSpacing: '2px' }}>
                    AI Mavericks
                  </span>
                </div>
              </div>
            </div>

            {/* Standalone */}
            <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
              <OptionHeader label="Standalone — larger, centered" />
              <div style={{ padding: '48px', backgroundColor: COLORS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <img src="/ai-mavericks-logo.avif" alt="AI Mavericks" style={{ width: 40, height: 40, borderRadius: '4px' }} />
                <span style={{ fontFamily: FONT, fontSize: TYPE.subheading.size, fontWeight: TYPE.small.weight, color: COLORS.text, textTransform: 'uppercase', letterSpacing: '3px' }}>
                  AI Mavericks
                </span>
              </div>
            </div>
          </div>
        </Section>
      )}
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


const NAV_LINKS = [
  { label: 'Home', active: false },
  { label: 'People', active: true },
  { label: 'Dinners', active: false },
  { label: 'Style Guide', active: false },
];

const NAV_OPTIONS = [
  { name: 'Airy — 64px height, 32px padding, 32px gaps, 32px logo', height: 64, hPad: 32, linkGap: 32, logoSize: 32, logoGap: 10, fontSize: TYPE.small.size, fontWeight: 500, letterSpacing: '2px' },
];

const SAMPLE_TAGS = ['AI Agents', 'Infra', 'LLMs', 'Fintech', 'Healthcare', 'Dev Tools', 'Series B'];

const AVATAR_SIZES: { label: string; size: number }[] = [
  { label: 'sm',   size: 32 },
  { label: 'back', size: 36 },
  { label: 'md',   size: 48 },
  { label: 'lg',   size: 80 },
];

const UI_ICONS = [
  { label: 'Filter', path: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z' },
  { label: 'X / Close', path: 'M18 6 6 18M6 6l12 12' },
  { label: 'Arrow Left', path: 'M19 12H5M12 19l-7-7 7-7' },
  { label: 'External', path: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3' },
  { label: 'Check', path: 'M20 6 9 17l-5-5' },
  { label: 'ChevronDown', path: 'M6 9l6 6 6-6' },
  { label: 'Menu', path: 'M4 12h16M4 6h16M4 18h16' },
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
@keyframes aurora-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
@keyframes aurora-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-40px, 30px) scale(1.15); }
  66% { transform: translate(30px, -20px) scale(0.95); }
}
@keyframes aurora-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(50px, 30px) scale(1.05); }
  66% { transform: translate(-30px, -40px) scale(1.1); }
}
@keyframes text-shimmer {
  0% { background-position: 100% 50%; }
  100% { background-position: -100% 50%; }
}
@keyframes mesh-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes scroll-hint {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
  50% { transform: translateX(-50%) translateY(8px); opacity: 1; }
}
@keyframes dot-glow {
  0%, 100% { opacity: 0.2; box-shadow: none; }
  50% { opacity: 1; box-shadow: 0 0 8px rgba(124, 58, 237, 0.6); }
}
@keyframes beam-sweep {
  0% { left: -50%; }
  100% { left: 150%; }
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

.card-flip { perspective: 1000px; }
.card-flip-inner { position: relative; width: 100%; transition: transform 0.6s ease; transform-style: preserve-3d; }
.card-flip-inner.flipped { transform: rotateY(180deg); }
.card-flip-front, .card-flip-back { backface-visibility: hidden; }
.card-flip-back { transform: rotateY(180deg); position: absolute; inset: 0; }
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

function MiniCard({ member }: { member: typeof SAMPLE_MEMBERS[number] }) {
  return (
    <div style={{
      borderRadius: '4px', overflow: 'hidden', aspectRatio: '3/4',
      position: 'relative', backgroundColor: '#1a1a1a',
      boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
    }}>
      <img
        src={member.photo}
        alt={member.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%) contrast(1.1)', display: 'block' }}
      />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
      }}>
        <p style={{ fontFamily: FONT, fontWeight: TYPE.subheading.weight, fontSize: TYPE.small.size, color: '#fff', lineHeight: TYPE.small.lineHeight }}>{member.name}</p>
        <p style={{ fontFamily: FONT, fontWeight: TYPE.small.weight, fontSize: TYPE.caption.size, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>{member.role}</p>
      </div>
    </div>
  );
}

const VIEW_TOGGLE_MODES = [
  { label: 'Cards', icon: 'M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z' },
  { label: 'List', icon: 'M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z' },
];

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

/* ─── MemberCard hover overlay options ─── */

const HOVER_OPTIONS: { name: string; variant: 'gradient' | 'full' | 'slide' }[] = [
  { name: 'A · Bottom gradient — dark fade from bottom, text over portrait', variant: 'gradient' },
  { name: 'B · Full overlay — semi-transparent dark layer, centered text', variant: 'full' },
  { name: 'C · Slide-up panel — solid panel from bottom, portrait peeks above', variant: 'slide' },
];

const SAMPLE_MEMBERS = [
  {
    name: 'Amara Kone',
    role: 'CTO, Lattice AI',
    bio: 'Building autonomous agents for enterprise workflows. Previously led ML infrastructure at Stripe for 4 years.',
    fullBio: 'Building autonomous agents for enterprise workflows. Previously led ML infrastructure at Stripe for 4 years, shipping the real-time fraud detection pipeline that processes 50M events/day. Before that, research at DeepMind on multi-agent coordination. Passionate about closing the gap between research and production AI.',
    interests: ['AI Agents', 'Infra', 'Series B'],
    lastDinner: 'Mar 2025 — The Shard',
    allDinners: ['Mar 2025 — The Shard', 'Jan 2025 — Shoreditch House', 'Nov 2024 — The Ned'],
    company: 'Lattice AI',
    socials: { x: '@amarakone', linkedin: 'amarakone', discord: 'amara#1234' },
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop&crop=face',
  },
  {
    name: 'James Chen',
    role: 'Founder, Nexus Labs',
    bio: 'Serial founder exploring the intersection of AI and developer tooling. Two exits, now building autonomous code review.',
    fullBio: 'Serial founder exploring the intersection of AI and developer tooling. Sold first company (CodePilot) to GitHub in 2021, second (InferDB) to Snowflake in 2023. Now building Nexus Labs — autonomous code review that actually understands your codebase. YC W24 batch. Based in London, originally from Vancouver.',
    interests: ['Dev Tools', 'LLMs', 'Fintech'],
    lastDinner: 'Feb 2025 — Shoreditch House',
    allDinners: ['Feb 2025 — Shoreditch House', 'Dec 2024 — The Shard'],
    company: 'Nexus Labs',
    socials: { x: '@jameschen_ai', linkedin: 'jameschenai' },
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=face',
  },
  {
    name: 'Sarah Okafor',
    role: 'VP Eng, Cohere',
    bio: 'Scaling inference infrastructure for production LLMs. Former SRE lead at Google Cloud, passionate about reliability.',
    fullBio: 'Scaling inference infrastructure for production LLMs at Cohere, leading a team of 40 engineers across Toronto and London. Former SRE lead at Google Cloud where she built the internal GPU scheduling system. Speaks regularly at SREcon and KubeCon. Advisor to three early-stage infra startups.',
    interests: ['Infrastructure', 'AI Agents', 'Healthcare'],
    lastDinner: 'Mar 2025 — The Shard',
    allDinners: ['Mar 2025 — The Shard', 'Feb 2025 — Shoreditch House', 'Jan 2025 — Shoreditch House', 'Nov 2024 — The Ned'],
    company: 'Cohere',
    socials: { x: '@sarahokafor', linkedin: 'sarahokafor', discord: 'sarah#5678' },
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&crop=face',
  },
];

function MemberCardHoverDemo({ variant, member }: { variant: 'gradient' | 'full' | 'slide'; member: typeof SAMPLE_MEMBERS[number] }) {
  const [hovered, setHovered] = useState(false);
  const cardH = 420;

  const overlayContent = (
    <>
      <p style={{ fontFamily: FONT, fontSize: TYPE.subheading.size, fontWeight: TYPE.subheading.weight, color: '#ffffff', lineHeight: TYPE.subheading.lineHeight }}>
        {member.name}
      </p>
      <p style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>
        {member.role}
      </p>
      <p style={{ fontFamily: FONT, fontSize: '0.813rem', fontWeight: 400, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4, marginTop: '10px' }}>
        {member.bio}
      </p>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
        {member.interests.map(tag => (
          <span key={tag} style={{
            fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight,
            color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '3px', padding: '2px 6px', textTransform: 'uppercase', letterSpacing: '0.5px',
          }}>{tag}</span>
        ))}
      </div>
      <p style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: 'rgba(255,255,255,0.5)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Last: {member.lastDinner}
      </p>
    </>
  );

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: cardH,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0 0 4px 4px',
        cursor: 'pointer',
        backgroundColor: '#1a1a1a',
      }}
    >
      {/* Portrait photo — zoomed in by default, zooms out on hover */}
      <img
        src={member.photo}
        alt={member.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          filter: 'grayscale(100%) contrast(1.1)',
          transform: hovered ? 'scale(1)' : 'scale(1.15)',
          transition: 'transform 0.4s ease',
        }}
      />

      {/* Name + role — always visible at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
        zIndex: 1,
        opacity: hovered ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}>
        <p style={{ fontFamily: FONT, fontSize: TYPE.subheading.size, fontWeight: TYPE.subheading.weight, color: '#ffffff', lineHeight: TYPE.subheading.lineHeight }}>
          {member.name}
        </p>
        <p style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>
          {member.role}
        </p>
      </div>

      {/* Hover overlay */}
      {variant === 'gradient' && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px 16px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)',
          zIndex: 2,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          {overlayContent}
        </div>
      )}

      {variant === 'full' && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.75)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '24px 20px',
          zIndex: 2,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          {overlayContent}
        </div>
      )}

      {variant === 'slide' && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px 16px',
          backgroundColor: 'rgba(26,26,26,0.95)',
          zIndex: 2,
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease',
        }}>
          {overlayContent}
        </div>
      )}
    </div>
  );
}


const DARK = {
  bg: '#1a1a1a',
  surface: '#242424',
  border: '#333333',
  text: '#f0f0f0',
  secondary: '#9ca3af',
  muted: '#6b7280',
  tagBorder: '#444444',
};

function MemberCardFlipDemo({ member }: { member: typeof SAMPLE_MEMBERS[number] }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardH = 420;

  return (
    <div className="card-flip" style={{ height: cardH, borderRadius: '4px' }}>
      <div className={`card-flip-inner${flipped ? ' flipped' : ''}`} style={{ height: '100%' }}>
        {/* Front — option B (full overlay) */}
        <div
          className="card-flip-front"
          onClick={() => setFlipped(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
            borderRadius: '4px', cursor: 'pointer', backgroundColor: '#1a1a1a',
          }}
        >
          <img src={member.photo} alt={member.name} style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
            filter: 'grayscale(100%) contrast(1.1)',
            transform: hovered ? 'scale(1)' : 'scale(1.15)', transition: 'transform 0.4s ease',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
            opacity: hovered ? 0 : 1, transition: 'opacity 0.3s ease',
          }}>
            <p style={{ fontFamily: FONT, fontSize: TYPE.subheading.size, fontWeight: TYPE.subheading.weight, color: '#fff', lineHeight: TYPE.subheading.lineHeight }}>{member.name}</p>
            <p style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>{member.role}</p>
          </div>
          <div style={{
            position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px 20px',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease',
          }}>
            <p style={{ fontFamily: FONT, fontSize: TYPE.subheading.size, fontWeight: TYPE.subheading.weight, color: '#fff', lineHeight: TYPE.subheading.lineHeight }}>{member.name}</p>
            <p style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>{member.role}</p>
            <p style={{ fontFamily: FONT, fontSize: '0.813rem', fontWeight: 400, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4, marginTop: '10px' }}>{member.bio}</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
              {member.interests.map(tag => (
                <span key={tag} style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '3px', padding: '2px 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tag}</span>
              ))}
            </div>
            <p style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: 'rgba(255,255,255,0.5)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Last: {member.lastDinner}</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="card-flip-back"
          onClick={() => setFlipped(false)}
          style={{
            width: '100%', height: '100%', borderRadius: '4px',
            backgroundColor: DARK.bg, cursor: 'pointer', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}
        >
          <BackStacked member={member} />
        </div>
      </div>
    </div>
  );
}

/* ─── Back variants ─── */

function BackLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: DARK.muted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
      {children}
    </p>
  );
}

function BackTags({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
      {tags.map(t => (
        <span key={t} style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: DARK.secondary, border: `1px solid ${DARK.tagBorder}`, borderRadius: '3px', padding: '2px 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t}</span>
      ))}
    </div>
  );
}

function SocialIcon({ type }: { type: 'x' | 'linkedin' | 'discord' }) {
  const size = 14;
  const style = { width: size, height: size, color: DARK.secondary, display: 'block' } as const;
  if (type === 'x') return (
    <svg viewBox="0 0 20 20" fill="none" style={style}><path d="M11.27 8.9 16.54 3h-1.25L10.7 8.09 6.84 3H3l5.54 7.8L3 17h1.25l4.84-5.42L13.16 17H17L11.27 8.9Zm-1.71 1.92-.56-.78-4.46-6.17H6.2l3.6 4.99.56.78 4.68 6.47h-1.66l-3.82-5.29Z" fill="currentColor"/></svg>
  );
  if (type === 'linkedin') return (
    <svg viewBox="0 0 20 20" fill="none" style={style}><path d="M5.37 7.33H3v9.34h2.37V7.33ZM4.19 6.3a1.37 1.37 0 1 0 0-2.74 1.37 1.37 0 0 0 0 2.74ZM17 11.37c0-2.24-1.09-3.28-2.85-3.28-1.31 0-1.9.72-2.22 1.22V7.33H9.57c.03.68 0 9.34 0 9.34h2.36v-5.21c0-.21.02-.42.08-.57.17-.42.56-.86 1.21-.86.86 0 1.2.65 1.2 1.61v5.03H17v-5.3Z" fill="currentColor"/></svg>
  );
  return (
    <svg viewBox="0 0 20 20" fill="none" style={style}><path d="M15.37 4.6A14.22 14.22 0 0 0 11.87 3.5c-.16.29-.35.68-.48.99a13.17 13.17 0 0 0-3.78 0A10.5 10.5 0 0 0 7.13 3.5a14.27 14.27 0 0 0-3.5 1.1C1.32 7.54.76 10.4 1.04 13.22a14.4 14.4 0 0 0 4.3 2.1c.35-.46.66-.95.92-1.46a9.3 9.3 0 0 1-1.45-.68c.12-.09.24-.18.35-.28a10.27 10.27 0 0 0 8.68 0c.11.1.23.19.35.28-.46.27-.94.5-1.45.68.26.51.57 1 .92 1.46a14.34 14.34 0 0 0 4.3-2.1c.35-3.3-.57-6.16-2.09-8.62ZM7.2 11.47c-.81 0-1.48-.73-1.48-1.62 0-.9.65-1.63 1.48-1.63.82 0 1.49.73 1.48 1.63 0 .89-.66 1.62-1.48 1.62Zm5.6 0c-.82 0-1.48-.73-1.48-1.62 0-.9.65-1.63 1.48-1.63.82 0 1.49.73 1.47 1.63 0 .89-.65 1.62-1.47 1.62Z" fill="currentColor"/></svg>
  );
}

function BackSocials({ socials }: { socials: typeof SAMPLE_MEMBERS[number]['socials'] }) {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      {socials.x && <SocialIcon type="x" />}
      {socials.linkedin && <SocialIcon type="linkedin" />}
      {socials.discord && <SocialIcon type="discord" />}
    </div>
  );
}

/* A · Stacked — socials + interests, divider, bio, prominent dinners */
function BackStacked({ member }: { member: typeof SAMPLE_MEMBERS[number] }) {
  const maxDinners = 3;
  const shownDinners = member.allDinners.slice(0, maxDinners);
  const extraCount = member.allDinners.length - maxDinners;

  return (
    <>
      {/* Header */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '14px 16px' }}>
        <img src={member.photo} alt={member.name} style={{ width: 36, height: 36, borderRadius: '4px', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)' }} />
        <div>
          <p style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.subheading.weight, color: DARK.text, lineHeight: 1.2 }}>{member.name}</p>
          <p style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: DARK.muted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{member.company}</p>
        </div>
      </div>
      {/* Scrollable body */}
      <div style={{ flex: 1, overflow: 'auto', padding: '0' }}>
        {/* Socials + Interests — single row, no labels */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', padding: '8px 16px' }}>
          <BackSocials socials={member.socials} />
          <span style={{ color: DARK.border }}>|</span>
          <BackTags tags={member.interests} />
        </div>
        {/* Divider + Bio */}
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${DARK.border}` }}>
          <p style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: 400, color: DARK.secondary, lineHeight: 1.45 }}>{member.fullBio}</p>
        </div>
        {/* Dinners — prominent */}
        <div style={{ padding: '12px 16px' }}>
          <BackLabel>Dinners attended ({member.allDinners.length})</BackLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
            {shownDinners.map(d => (
              <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: DARK.muted, flexShrink: 0 }} />
                <p style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: 400, color: DARK.text, lineHeight: 1.3 }}>{d}</p>
              </div>
            ))}
            {extraCount > 0 && (
              <p style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: DARK.muted, textTransform: 'uppercase', letterSpacing: '0.5px', paddingLeft: '12px' }}>+{extraCount} more</p>
            )}
          </div>
        </div>
      </div>
    </>
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

/* ─── Landing Hero ─── */

const HERO_OPTIONS = [
  { name: 'A — Aurora Fullscreen (100vh) — drifting purple blobs, shimmer text', variant: 'aurora' as const },
  { name: 'B — Mesh Gradient (~90vh peek) — rotating conic gradient, scroll hint', variant: 'mesh' as const },
  { name: 'C — Living Grid (dynamic) — dot field with glowing accents, sweep beam', variant: 'grid' as const },
];

function LandingHeroDemo({ variant }: { variant: 'aurora' | 'mesh' | 'grid' }) {
  if (variant === 'aurora') return <HeroAurora />;
  if (variant === 'mesh') return <HeroMesh />;
  return <HeroGrid />;
}

/* Option A: Aurora — drifting blurred purple blobs, shimmer gradient text, 100vh */
function HeroAurora() {
  return (
    <div style={{
      position: 'relative', height: '600px', overflow: 'hidden', backgroundColor: '#0a0a0a',
    }}>
      {/* Aurora blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', filter: 'blur(80px)', opacity: 0.6 }}>
        <div style={{
          position: 'absolute', width: '50%', height: '50%', borderRadius: '50%',
          background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
          top: '10%', left: '15%', animation: 'aurora-1 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: '40%', height: '45%', borderRadius: '50%',
          background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
          top: '40%', right: '10%', animation: 'aurora-2 10s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: '35%', height: '40%', borderRadius: '50%',
          background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
          bottom: '5%', left: '35%', animation: 'aurora-3 12s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: '30%', height: '35%', borderRadius: '50%',
          background: 'radial-gradient(circle, #c4b5fd 0%, transparent 70%)',
          top: '25%', left: '55%', animation: 'aurora-1 14s ease-in-out infinite reverse',
        }} />
      </div>
      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1, height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '24px', gap: '12px',
      }}>
        <img src="/images/logo.avif" alt="" style={{ width: 44, height: 44, borderRadius: '4px' }} />
        <span style={{
          fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.caption.weight,
          color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const, letterSpacing: '3px',
        }}>
          Q1 2026 · Pizza Express Live Holborn
        </span>
        <h1 style={{
          fontFamily: FONT, fontWeight: TYPE.heading.weight,
          fontSize: '3.5rem', lineHeight: 1.1, margin: 0,
          background: 'linear-gradient(90deg, #ffffff 0%, #c4b5fd 30%, #ffffff 50%, #a78bfa 70%, #ffffff 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'text-shimmer 4s linear infinite',
        }}>
          AI Mavericks
        </h1>
        <p style={{
          fontFamily: FONT, fontWeight: TYPE.body.weight, fontSize: TYPE.body.size,
          lineHeight: TYPE.body.lineHeight, color: 'rgba(255,255,255,0.7)',
          maxWidth: '420px', margin: 0,
        }}>
          Where AI builders meet. Intimate dinners for founders, engineers, and operators shaping the future.
        </p>
        <p style={{
          fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight,
          color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const,
          letterSpacing: '1px', margin: '4px 0 8px',
        }}>
          7 builders · One table · Real talk
        </p>
        <FlashyBtn>Join the Next Dinner</FlashyBtn>
      </div>
    </div>
  );
}

/* Option B: Mesh — drifting purple clouds with slow rotation, ~90vh with scroll hint */
function HeroMesh() {
  return (
    <div style={{
      position: 'relative', height: '540px', overflow: 'hidden', backgroundColor: '#0a0a0a',
    }}>
      {/* Slow-rotating conic base */}
      <div style={{
        position: 'absolute', inset: '-50%',
        background: 'conic-gradient(from 0deg at 50% 50%, #0a0a0a 0deg, #1e1b4b 60deg, #312e81 120deg, #4c1d95 180deg, #312e81 240deg, #1e1b4b 300deg, #0a0a0a 360deg)',
        animation: 'mesh-rotate 28s linear infinite',
        filter: 'blur(80px)', opacity: 0.5,
      }} />
      {/* Drifting cloud blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', filter: 'blur(70px)' }}>
        <div style={{
          position: 'absolute', width: '55%', height: '55%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76, 29, 149, 0.5) 0%, transparent 70%)',
          top: '5%', left: '10%', animation: 'aurora-1 11s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: '45%', height: '50%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)',
          top: '35%', right: '5%', animation: 'aurora-2 14s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: '40%', height: '45%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%)',
          bottom: '0%', left: '30%', animation: 'aurora-3 17s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: '35%', height: '40%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          top: '20%', left: '50%', animation: 'aurora-2 12s ease-in-out infinite reverse',
        }} />
      </div>
      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1, height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '24px', gap: '12px',
      }}>
        <img src="/images/logo.avif" alt="" style={{ width: 44, height: 44, borderRadius: '4px' }} />
        <span style={{
          fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.caption.weight,
          color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const, letterSpacing: '3px',
        }}>
          Q1 2026 · Pizza Express Live Holborn
        </span>
        <h1 style={{
          fontFamily: FONT, fontWeight: TYPE.heading.weight,
          fontSize: '3.5rem', lineHeight: 1.1, color: '#ffffff', margin: 0,
        }}>
          AI Mavericks
        </h1>
        <p style={{
          fontFamily: FONT, fontWeight: TYPE.body.weight, fontSize: TYPE.body.size,
          lineHeight: TYPE.body.lineHeight, color: 'rgba(255,255,255,0.7)',
          maxWidth: '420px', margin: 0,
        }}>
          Where AI builders meet. Intimate dinners for founders, engineers, and operators shaping the future.
        </p>
        <p style={{
          fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight,
          color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const,
          letterSpacing: '1px', margin: '4px 0 8px',
        }}>
          7 builders · One table · Real talk
        </p>
        <FlashyBtn>Join the Next Dinner</FlashyBtn>
      </div>
      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
        animation: 'scroll-hint 2s ease-in-out infinite',
      }}>
        <span style={{
          fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.caption.weight,
          color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const, letterSpacing: '2px',
        }}>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

/* Option C: Living Grid — dot field with glowing purple accents, sweeping beam */
function HeroGrid() {
  const glowDots = [
    { top: '18%', left: '22%', delay: '0s' },
    { top: '55%', left: '72%', delay: '1.5s' },
    { top: '38%', left: '48%', delay: '3s' },
    { top: '72%', left: '15%', delay: '2s' },
    { top: '12%', left: '78%', delay: '0.8s' },
    { top: '85%', left: '55%', delay: '4s' },
    { top: '30%', left: '88%', delay: '2.5s' },
    { top: '65%', left: '35%', delay: '1s' },
  ];

  return (
    <div style={{
      position: 'relative', height: '600px', overflow: 'hidden', backgroundColor: '#0a0a0a',
    }}>
      {/* Dot grid via CSS background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '32px 32px', backgroundPosition: '16px 16px',
      }} />
      {/* Accent glow dots */}
      {glowDots.map((d, i) => (
        <div key={i} style={{
          position: 'absolute', top: d.top, left: d.left,
          width: '4px', height: '4px', borderRadius: '50%',
          backgroundColor: '#7c3aed',
          animation: `dot-glow 4s ease-in-out ${d.delay} infinite`,
        }} />
      ))}
      {/* Sweeping beam */}
      <div style={{
        position: 'absolute', top: 0, left: '-50%',
        width: '30%', height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.04), rgba(124, 58, 237, 0.08), rgba(124, 58, 237, 0.04), transparent)',
        animation: 'beam-sweep 8s ease-in-out infinite',
      }} />
      {/* Subtle radial glow behind content */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '60%', height: '60%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)',
      }} />
      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1, height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '24px', gap: '12px',
      }}>
        <img src="/images/logo.avif" alt="" style={{ width: 44, height: 44, borderRadius: '4px' }} />
        <span style={{
          fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.caption.weight,
          color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const, letterSpacing: '3px',
        }}>
          Q1 2026 · Pizza Express Live Holborn
        </span>
        <h1 style={{
          fontFamily: FONT, fontWeight: TYPE.heading.weight,
          fontSize: '3.5rem', lineHeight: 1.1, color: '#ffffff', margin: 0,
          textShadow: '0 0 40px rgba(124, 58, 237, 0.3)',
        }}>
          AI Mavericks
        </h1>
        <p style={{
          fontFamily: FONT, fontWeight: TYPE.body.weight, fontSize: TYPE.body.size,
          lineHeight: TYPE.body.lineHeight, color: 'rgba(255,255,255,0.7)',
          maxWidth: '420px', margin: 0,
        }}>
          Where AI builders meet. Intimate dinners for founders, engineers, and operators shaping the future.
        </p>
        <p style={{
          fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight,
          color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const,
          letterSpacing: '1px', margin: '4px 0 8px',
        }}>
          7 builders · One table · Real talk
        </p>
        <FlashyBtn>Join the Next Dinner</FlashyBtn>
      </div>
    </div>
  );
}

/* ─── Dinner Card Mini (for composite preview) ─── */
function DinnerCardMini({ dinner }: { dinner: { date: string; name: string; venue: string; attendees: number; desc: string; seed: string } }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.10)', backgroundColor: COLORS.bg, cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ overflow: 'hidden', aspectRatio: '16 / 9' }}>
        <img
          src={`https://picsum.photos/seed/${dinner.seed}/1400/800`}
          alt=""
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1)' : 'scale(1.15)',
            transition: 'transform 0.4s ease',
          }}
        />
      </div>
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textMuted, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>{dinner.date}</span>
          <span style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textMuted, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>{dinner.attendees} attendees</span>
        </div>
        <h3 style={{ fontFamily: FONT, fontSize: TYPE.subheading.size, fontWeight: TYPE.subheading.weight, lineHeight: TYPE.subheading.lineHeight, color: COLORS.text, margin: '0 0 8px' }}>{dinner.name}</h3>
        <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, fontWeight: TYPE.body.weight, lineHeight: TYPE.body.lineHeight, color: COLORS.textSecondary, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{dinner.desc}</p>
        <div style={{ marginTop: '12px' }}>
          <span style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}`, borderRadius: '3px', padding: '2px 6px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>{dinner.venue}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Dinner Card Demo ─── */
/* ─── Dinner Hero Demos ─── */

const DINNER_HERO_DATA = {
  name: 'Q1 2026 Dinner',
  date: 'Mar 4, 2026',
  venue: 'Pizza Express Live Holborn',
  description: 'The first AI Mavericks dinner of 2026, reflecting on AI tooling, education, and the road ahead.',
  photo: 'https://picsum.photos/seed/2026-q1/1400/800',
  topics: [
    { text: 'Should junior developers bother learning traditional coding?', attribution: 'Group' },
    { text: 'AI in education and teaching AI usage', attribution: 'David' },
    { text: 'Building AI products for defence and creative media', attribution: 'Farhath' },
    { text: 'LLMs in African fintech data intelligence', attribution: 'Bode' },
  ],
  attendees: [
    { name: 'Bode Ogunlana', role: 'Engineering', photo: SAMPLE_MEMBERS[0]?.photo || '' },
    { name: 'David Farrell', role: 'Education', photo: SAMPLE_MEMBERS[1]?.photo || '' },
    { name: 'Farhath Razzaque', role: 'Product', photo: SAMPLE_MEMBERS[2]?.photo || '' },
    { name: 'Neil Cameron', role: 'Consulting', photo: SAMPLE_MEMBERS[0]?.photo || '' },
    { name: 'Rene Muhire', role: 'Founder', photo: SAMPLE_MEMBERS[1]?.photo || '' },
    { name: 'Eddie Forson', role: 'Founder', photo: SAMPLE_MEMBERS[2]?.photo || '' },
    { name: 'Liberatus', role: 'Engineering', photo: SAMPLE_MEMBERS[0]?.photo || '' },
  ],
};

/* Dinner Hero (confirmed) — white split, photo left, wrapping attendee chips */
function DinnerHeroB() {
  const d = DINNER_HERO_DATA;
  return (
    <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: '4px', overflow: 'hidden' }}>
      <OptionHeader label="Dinner Hero (confirmed) — white split, photo left 45%, details right, wrapping attendee chips" />
      <div style={{ display: 'flex', height: '480px', overflow: 'hidden', backgroundColor: COLORS.bg }}>
        {/* Left: photo */}
        <div style={{ flex: '0 0 45%', overflow: 'hidden' }}>
          <img src={d.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        {/* Right: details */}
        <div style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'auto' }}>
          <div>
            <span style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textMuted, textTransform: 'uppercase' as const, letterSpacing: '2px' }}>
              Latest Dinner · {d.date}
            </span>
            <h2 style={{ fontFamily: FONT, fontWeight: TYPE.heading.weight, fontSize: TYPE.subheading.size, lineHeight: TYPE.subheading.lineHeight, color: COLORS.text, margin: '8px 0 0' }}>
              {d.name}
            </h2>
          </div>
          <p style={{ fontFamily: FONT, fontSize: TYPE.body.size, fontWeight: TYPE.body.weight, lineHeight: TYPE.body.lineHeight, color: COLORS.textSecondary, margin: 0 }}>
            {d.description}
          </p>
          {/* Venue */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
            <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: TYPE.small.weight, color: COLORS.textSecondary }}>{d.venue}</span>
          </div>
          {/* Topics */}
          <div>
            <span style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textMuted, textTransform: 'uppercase' as const, letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Topics Discussed</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {d.topics.map(t => (
                <div key={t.text} style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: COLORS.textMuted, flexShrink: 0, marginTop: '6px' }} />
                  <span style={{ fontFamily: FONT, fontSize: TYPE.small.size, fontWeight: 400, color: COLORS.text, lineHeight: 1.4 }}>{t.text} <span style={{ color: COLORS.textMuted }}>— {t.attribution}</span></span>
                </div>
              ))}
            </div>
          </div>
          {/* Attendees — horizontal wrapping chips */}
          <div>
            <span style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.textMuted, textTransform: 'uppercase' as const, letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>{d.attendees.length} Attendees</span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {d.attendees.map(a => (
                <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px 4px 4px', border: `1px solid ${COLORS.border}`, borderRadius: '4px' }}>
                  <img src={a.photo} alt="" style={{ width: 24, height: 24, borderRadius: '3px', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%) contrast(1.1)' }} />
                  <span style={{ fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight, color: COLORS.text, whiteSpace: 'nowrap' as const }}>{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DinnerCardDemo({ cardBg, textColor, secondaryColor, mutedColor, tagBorder, shadow }: {
  cardBg: string; textColor: string; secondaryColor: string; mutedColor: string; tagBorder: string; shadow: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: shadow, backgroundColor: cardBg, cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo — full colour, 16:9, hover zoom-out */}
      <div style={{ overflow: 'hidden', aspectRatio: '16 / 9' }}>
        <img
          src="https://picsum.photos/seed/2024-10-october/1400/800"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hovered ? 'scale(1)' : 'scale(1.15)',
            transition: 'transform 0.4s ease',
          }}
        />
      </div>
      {/* Card body */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{
            fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight,
            color: mutedColor, textTransform: 'uppercase' as const, letterSpacing: '0.5px',
          }}>
            Oct 9, 2024
          </span>
          <span style={{
            fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight,
            color: mutedColor, textTransform: 'uppercase' as const, letterSpacing: '0.5px',
          }}>
            7 attendees
          </span>
        </div>
        <h3 style={{
          fontFamily: FONT, fontSize: TYPE.subheading.size, fontWeight: TYPE.subheading.weight,
          lineHeight: TYPE.subheading.lineHeight, color: textColor, margin: '0 0 8px',
        }}>
          October 2024 Dinner
        </h3>
        <p style={{
          fontFamily: FONT, fontSize: TYPE.body.size, fontWeight: TYPE.body.weight,
          lineHeight: TYPE.body.lineHeight, color: secondaryColor, margin: 0,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden',
        }}>
          The inaugural AI Mavericks dinner bringing together builders, founders and consultants working on AI.
        </p>
        <div style={{ marginTop: '12px' }}>
          <span style={{
            fontFamily: FONT, fontSize: TYPE.caption.size, fontWeight: TYPE.small.weight,
            color: secondaryColor, border: `1px solid ${tagBorder}`,
            borderRadius: '3px', padding: '2px 6px',
            textTransform: 'uppercase' as const, letterSpacing: '0.5px',
          }}>
            London
          </span>
        </div>
      </div>
    </div>
  );
}

