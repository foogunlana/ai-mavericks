import { useState, useRef, useCallback, useEffect } from 'react';

type SectionId = 'landing-hero' | 'member-hover' | 'member-flip' | 'typography' | 'button' | 'tag' | 'avatar' | 'card' | 'icons' | 'logo' | 'filter';

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
            First thing visitors see. Goal: inspire them to attend a dinner. Shows the most recent dinner as proof of what they're missing.
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

const HERO_PHOTO = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&h=800&fit=crop&crop=center';

const HERO_OPTIONS = [
  { name: 'A — Full-bleed cinematic', variant: 'cinematic' as const },
  { name: 'B — Split editorial', variant: 'split' as const },
  { name: 'C — Stacked minimal', variant: 'stacked' as const },
];

function LandingHeroDemo({ variant }: { variant: 'cinematic' | 'split' | 'stacked' }) {
  if (variant === 'cinematic') return <HeroCinematic />;
  if (variant === 'split') return <HeroSplit />;
  return <HeroStacked />;
}

/* Option A: Full-bleed photo, dark overlay, centered text, flashy CTA */
function HeroCinematic() {
  return (
    <div style={{
      position: 'relative',
      height: '480px',
      overflow: 'hidden',
      backgroundColor: '#0a0a0a',
    }}>
      <img
        src={HERO_PHOTO}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(100%) contrast(1.1)',
          opacity: 0.5,
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
      }} />
      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        gap: '12px',
      }}>
        <img src="/images/logo.avif" alt="" style={{ width: 40, height: 40, borderRadius: '4px' }} />
        <span style={{
          fontFamily: FONT,
          fontSize: TYPE.caption.size,
          fontWeight: TYPE.caption.weight,
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          letterSpacing: '3px',
        }}>
          Q1 2026 · Pizza Express Live Holborn
        </span>
        <h1 style={{
          fontFamily: FONT,
          fontWeight: TYPE.heading.weight,
          fontSize: '2.8rem',
          lineHeight: 1.1,
          color: '#ffffff',
          margin: 0,
        }}>
          AI Mavericks
        </h1>
        <p style={{
          fontFamily: FONT,
          fontWeight: TYPE.body.weight,
          fontSize: TYPE.body.size,
          lineHeight: TYPE.body.lineHeight,
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '420px',
          margin: 0,
        }}>
          Where AI builders meet. Intimate dinners for founders, engineers, and operators shaping the future.
        </p>
        <p style={{
          fontFamily: FONT,
          fontSize: TYPE.small.size,
          fontWeight: TYPE.small.weight,
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          margin: '4px 0 8px',
        }}>
          7 builders · One table · Real talk
        </p>
        <FlashyBtn>Join the Next Dinner</FlashyBtn>
      </div>
    </div>
  );
}

/* Option B: Left text / right photo, editorial feel */
function HeroSplit() {
  return (
    <div style={{
      display: 'flex',
      height: '480px',
      overflow: 'hidden',
      backgroundColor: COLORS.bg,
    }}>
      {/* Left: text */}
      <div style={{
        flex: '1 1 50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 40px',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <img src="/images/logo.avif" alt="" style={{ width: 28, height: 28, borderRadius: '4px' }} />
          <span style={{
            fontFamily: FONT,
            fontSize: TYPE.small.size,
            fontWeight: TYPE.small.weight,
            color: COLORS.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            AI Mavericks
          </span>
        </div>
        <span style={{
          fontFamily: FONT,
          fontSize: TYPE.caption.size,
          fontWeight: TYPE.caption.weight,
          color: COLORS.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '3px',
        }}>
          Most recent dinner
        </span>
        <h1 style={{
          fontFamily: FONT,
          fontWeight: TYPE.heading.weight,
          fontSize: '2.369rem',
          lineHeight: TYPE.heading.lineHeight,
          color: COLORS.text,
          margin: 0,
        }}>
          Q1 2026 Dinner
        </h1>
        <p style={{
          fontFamily: FONT,
          fontWeight: TYPE.subheading.weight,
          fontSize: TYPE.subheading.size,
          lineHeight: TYPE.subheading.lineHeight,
          color: COLORS.text,
          margin: 0,
        }}>
          Pizza Express Live Holborn
        </p>
        <p style={{
          fontFamily: FONT,
          fontWeight: TYPE.body.weight,
          fontSize: TYPE.body.size,
          lineHeight: TYPE.body.lineHeight,
          color: COLORS.textSecondary,
          maxWidth: '380px',
          margin: '4px 0',
        }}>
          7 builders debating whether junior devs should bother learning to code, AI in education, and LLMs in African fintech.
        </p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px', alignItems: 'center' }}>
          <FlashyBtn>Join the Next Dinner</FlashyBtn>
          <button style={{
            ...BTN_BASE,
            ...BTN_VARIANTS.outline,
          }}>
            See All Dinners
          </button>
        </div>
      </div>
      {/* Right: photo */}
      <div style={{
        flex: '1 1 50%',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src={HERO_PHOTO}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(100%) contrast(1.1)',
          }}
        />
        {/* Attendee count pill */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderRadius: '3px',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span style={{
            fontFamily: FONT,
            fontSize: TYPE.caption.size,
            fontWeight: TYPE.caption.weight,
            color: 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            7 Attendees
          </span>
        </div>
      </div>
    </div>
  );
}

/* Option C: Stacked — photo strip on top, text block below, compact */
function HeroStacked() {
  return (
    <div style={{
      overflow: 'hidden',
      backgroundColor: '#0a0a0a',
    }}>
      {/* Photo strip — short and wide */}
      <div style={{
        position: 'relative',
        height: '200px',
        overflow: 'hidden',
      }}>
        <img
          src={HERO_PHOTO}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            filter: 'grayscale(100%) contrast(1.1)',
            opacity: 0.7,
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, #0a0a0a 100%)',
        }} />
      </div>
      {/* Text content */}
      <div style={{
        padding: '0 40px 48px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <img src="/images/logo.avif" alt="" style={{ width: 28, height: 28, borderRadius: '4px' }} />
          <span style={{
            fontFamily: FONT,
            fontSize: TYPE.small.size,
            fontWeight: TYPE.small.weight,
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            AI Mavericks
          </span>
        </div>
        <h1 style={{
          fontFamily: FONT,
          fontWeight: TYPE.heading.weight,
          fontSize: '2.369rem',
          lineHeight: TYPE.heading.lineHeight,
          color: '#ffffff',
          margin: 0,
        }}>
          The table where AI gets real
        </h1>
        <p style={{
          fontFamily: FONT,
          fontWeight: TYPE.body.weight,
          fontSize: TYPE.body.size,
          lineHeight: TYPE.body.lineHeight,
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '500px',
          margin: 0,
        }}>
          Intimate dinners for builders, founders, and operators. No panels. No pitches. Just honest conversation over good food.
        </p>
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          marginTop: '12px',
        }}>
          <FlashyBtn>Join the Next Dinner</FlashyBtn>
          <span style={{
            fontFamily: FONT,
            fontSize: TYPE.small.size,
            fontWeight: TYPE.small.weight,
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            Q1 2026 · 7 builders · Holborn
          </span>
        </div>
      </div>
    </div>
  );
}

