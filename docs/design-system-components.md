# Design System Components Reference

All atom and composite components designed and confirmed during the design system brainstorm (Steps 7-8).
Currently rendered in `src/components/StyleGuide/StyleGuide.tsx` as inline-styled demos.
Use this document to extract them into proper reusable components.

## Decision Log

Decisions made during the brainstorm sessions, including rejected alternatives:

- **Tag:** Outline only. Rejected filled/active variant — dropdown filter handles selection.
- **Avatar:** Confirmed 3 sizes (32/48/80). Square with 4px radius, not circular.
- **Card:** Elevated for photos, subtle for lists. Rejected: border-only, naked, sharp (0px radius), inset.
- **Button flashy:** Deep purple (#5b21b6 base). Originally brighter/shinier — tuned down. Shimmer animates one direction only (no bounce-back).
- **Button shimmer border:** Orbiting element is circular (not square) to avoid speeding up at corners. One sweep per cycle then disappears. Brighter arc with #c4b5fd peak.
- **Typography:** "Elegant" (option A). Rejected: Editorial (uppercase sub), Bold (500 heading), All-caps heading, High contrast (600/300), Magazine (uppercase sub).
- **Filter dropdown:** Confirmed pattern. NOT in the nav bar — placement is a composite-level decision.
- **MemberCard hover:** Option B (full overlay). Rejected: gradient-from-bottom, slide-up panel.
- **MemberCard flip back:** Stacked dark layout. Socials (icons) + interest tags inline (no labels, pipe separator), divider, full bio, prominent dinners (bulleted, max 3 shown, "+x more").
- **Dinner photos:** Should use landscape crop even from portrait sources.
- **Purple accent:** #5b21b6 is the ONLY non-monochrome color. Used exclusively on CTA buttons.

---

## Design Tokens (Locked In)

```ts
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
```

---

## Typography Style: Elegant (Option A — confirmed)

- Heading: weight 300, normal case, normal tracking
- Subheading: weight 500, normal case, normal tracking
- Body: weight 400, color `#6b7280` (textSecondary)
- Small/Caption: weight 500, uppercase, tracked

---

## 1. Tag

**Confirmed style:** Outline only, no fill.

```
- Border: 1px solid #e5e7eb
- Radius: 3px
- Text: uppercase, Small type (0.688rem, weight 500), letter-spacing 0.5px
- Color: #6b7280 (textSecondary)
- Padding: 4px 10px
- No filled variant — dropdown filter handles selection state
```

### Usage
- On member cards (interest tags)
- On dinner blocks (topic labels)
- In card flip back (interests section)

---

## 2. Avatar

Three sizes confirmed:

| Size | Dimensions | Usage |
|------|-----------|-------|
| sm   | 32px      | Compact lists, attendee grids |
| md   | 48px      | Card flip back header, inline references |
| lg   | 80px      | Hero/profile display |

```
- Border radius: 4px
- Filter: grayscale(100%) contrast(1.05)
- Fallback: surface bg (#f9fafb) + border + centered initials (uppercase, muted color)
- flexShrink: 0 (prevents compression in flex layouts)
```

---

## 3. Card

Two elevation levels confirmed:

| Level | Shadow | Usage |
|-------|--------|-------|
| Elevated | 0 4px 12px rgba(0,0,0,0.10) | Photo cards (member grid) |
| Subtle   | 0 1px 3px rgba(0,0,0,0.06) | List items, data cards |

```
- Border radius: 4px
- Background: #ffffff
```

---

## 4. Button

Four variants confirmed:

### Ghost
```css
background: transparent;
color: #6b7280;
border: 1px solid transparent;
padding: 8px 10px;
/* Hover: bg #f3f4f6, color #1a1a1a */
/* Disabled: opacity 0.4, cursor not-allowed */
```

### Outline
```css
background: transparent;
color: #1a1a1a;
border: 1px solid #e5e7eb;
padding: 8px 18px;
/* Hover: bg #f9fafb, border #9ca3af */
/* Disabled: opacity 0.4, cursor not-allowed */
```

### Flashy (Primary CTA)
```css
background: linear-gradient(135deg, #5b21b6, #7c3aed, #a855f7, #7c3aed, #5b21b6);
background-size: 300% 300%;
animation: shimmer 3s linear infinite, glow-pulse 3s ease-in-out infinite;
color: #ffffff;
border: 1px solid rgba(91, 33, 182, 0.3);
padding: 10px 24px;
font-weight: 600;
letter-spacing: 1.5px;
/* Hover: brightness(1.15), translateY(-1px) */
/* Click: confetti particle burst (24 particles, purple/pink/gold palette) */
/* Disabled: saturate(0.3) brightness(0.8), no animation */
```

**Note:** Purple (#5b21b6) is the ONLY non-monochrome color in the system.
Used exclusively on CTA buttons.

#### Confetti particle system
```ts
const CONFETTI_COLORS = ['#7c3aed', '#a78bfa', '#c4b5fd', '#f472b6', '#818cf8', '#e879f9', '#fbbf24', '#34d399'];
// 24 particles per click
// Shapes: circle (6x6), square (6x6), strip (3x10)
// Spread: random angle, 40-80px distance
// Animation: confetti-fall 0.8s ease-out
// Auto-cleanup after 800ms
```

### Shimmer Border
```css
/* Wrapper: 1.5px padding, overflow hidden, border-radius 4px, bg #e5e7eb */
/* Orbiting element: CIRCULAR (not square) for uniform corner speed */
/*   - Container: absolute, inset 0, flex centered */
/*   - Inner circle: 300% width/height, border-radius 50% */
/*   - Gradient: conic-gradient with purple arc (75%-100% of circle) */
/*   - Arc colors: #7c3aed → #a855f7 → #c4b5fd (peak) → #a855f7 */
/* Animation: border-sweep 4s linear infinite */
/*   - Fades in at 3%, full opacity 5-32%, fades out by 37% */
/*   - One full rotation per visible sweep, then hidden for ~2.5s */
/* Inner button: white bg (#ffffff), dark text, 3px radius, z-index 1 */
/* Hover: translateY(-1px), inner bg becomes surface (#f9fafb) */
/* Disabled: opacity 0.4, orbit hidden */
```

### All buttons shared base
```css
font-family: 'Space Grotesk';
font-size: 0.688rem;       /* Small */
font-weight: 500;
line-height: 1.2;
text-transform: uppercase;
letter-spacing: 1px;
border-radius: 3px;
cursor: pointer;
display: inline-flex;
align-items: center;
gap: 6px;
```

---

## 5. Filter Dropdown

**Confirmed pattern:** Single filter icon in the nav bar.

### Closed state (no filters)
- Filter icon (Lucide) in nav, after People/Dinners links
- No badge

### Closed state (filters active)
- Filter icon + dark circular badge with count

### Open state
- Dropdown panel floats over content
- Width: 320px, positioned right-aligned to nav
- Shadow: 0 4px 16px rgba(0,0,0,0.1)
- Border: 1px solid #e5e7eb, radius 4px

#### Panel structure
```
┌─ Header: "FILTERS" + "Clear all" button ─┐
├─ ROLE (label) ───────────────────────────┤
│  Founder                              ✓  │
│  Engineer                             ✓  │
│  Data Scientist                       ✓  │
│  Product Manager                         │
│  ...                                     │
├─ INTEREST (label) ───────────────────────┤
│  AI Agents                            ✓  │
│  LLMs                                 ✓  │
│  FinTech                                 │
│  ...                                     │
├─ DINNER (label) ─────────────────────────┤
│  Oct 2024                                │
│  Nov 2024                                │
│  ...                                     │
└──────────────────────────────────────────┘
```

- Active items: light gray bg (#f3f4f6), bold text, checkmark icon
- Inactive items: normal weight, secondary color
- Category labels: caption type, uppercase, tracked, muted color

---

## 6. Social Icons

**Confirmed style:** Outlined circle with brand icon inside.

```css
width: 36px;
height: 36px;
border-radius: 50%;
border: 1.5px solid #9ca3af;
display: flex;
align-items: center;
justify-content: center;
```

### Brand icons (filled SVG, not stroked)
- **X (Twitter):** 14x14, filled with COLORS.text
- **LinkedIn:** 14x14, stroked with COLORS.text (Lucide style)
- **Discord:** 16x16, filled with COLORS.text

---

## 7. MemberCard — Hover Overlay (Option B default, all 3 kept)

**Default: Option B — Full overlay.** Options A (bottom gradient) and C (slide-up panel) are kept in the StyleGuide for potential future use.

### Card dimensions & default state
```
- Height: 420px, width: flexible (fills container)
- Background: #1a1a1a
- Border radius: 4px
- Default (no hover): portrait photo fills card, name bar at bottom
  - Name bar: gradient from bottom (rgba(0,0,0,0.7) to transparent)
  - Shows: name (subheading, white) + role (small, uppercase, white 70%)
  - Padding: 16px
```

### Content shown on each state
```
At glance (default): portrait photo + name + role
On hover: short bio (truncated), interests (tags), last dinner attended
On click: flips to back — full bio, social links, company, all dinners, everything from front
```

**Shared behaviour (all variants):**
```
- Cursor: pointer
- Photo: grayscale(100%) contrast(1.1), zoomed in at scale(1.15) by default
- On hover: photo zooms out to scale(1), 0.4s ease transition
- Name bar at bottom fades out (opacity 0), 0.3s ease
```

**Option B — Full overlay (confirmed default):**
```
- Overlay: full card coverage, rgba(0,0,0,0.75), opacity fade 0.3s
- Content centered vertically, 24px 20px padding
- Shows: name, role, bio (0.813rem), interest tags, last dinner
```

**Option A — Bottom gradient (kept):**
```
- Gradient from bottom: rgba(0,0,0,0.85) to transparent
- Content pinned to bottom, 20px 16px padding
```

**Option C — Slide-up panel (kept):**
```
- Solid panel rgba(26,26,26,0.95) slides up from translateY(100%) to translateY(0)
- 0.3s ease transition
```

### Overlay content layout
```
Name (subheading size/weight, white)
Role (small, uppercase, tracked, white 70%)
Bio (0.813rem, weight 400, white 85%, mt 10px)
[Tag] [Tag] [Tag] (caption, outlined white 30%, mt 10px)
Last: Mar 2025 — The Shard (caption, white 50%, mt 8px)
```

---

## 8. MemberCard — Click to Flip

**Front:** Option B hover overlay (described above)
**Back:** Stacked dark layout (confirmed)

### Back card dark colors
```ts
const DARK = {
  bg: '#1a1a1a',
  surface: '#242424',
  border: '#333333',
  text: '#f0f0f0',
  secondary: '#9ca3af',
  muted: '#6b7280',
  tagBorder: '#444444',
};
```

### Back card structure
```
┌─ Header: 36px avatar + name + company ───┐
│                                           │
│ [X] [LinkedIn] [Discord] | [Tag] [Tag]    │  ← icons + tags inline, no labels
├───────────────────────────────────────────┤  ← single divider
│ Full bio (small type, secondary color)    │
│                                           │
│ DINNERS ATTENDED (3) (caption label)      │
│ • Mar 2025 — The Shard                   │  ← white text, bullet dots
│ • Jan 2025 — Shoreditch House            │
│ • Nov 2024 — The Ned                     │
│   +1 more                                │  ← if > 3 dinners
└───────────────────────────────────────────┘
```

### Key decisions
- Dark background (#1a1a1a) — matches front card feel
- Social links use brand SVG icons (14px), not text labels
- Interests + socials on one row with `|` separator, no section labels
- Only one divider (above bio)
- Dinners are prominent (white text, bullet dots, larger than other back text)
- Max 3 dinners shown, "+x more" in muted caption if overflow
- Rejected alternatives: compact grid (converged with stacked), minimal (too sparse)

### Flip animation
```css
.card-flip { perspective: 1000px; }
.card-flip-inner {
  position: relative;
  width: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
}
.card-flip-inner.flipped { transform: rotateY(180deg); }
.card-flip-front, .card-flip-back { backface-visibility: hidden; }
.card-flip-back {
  transform: rotateY(180deg);
  position: absolute;
  inset: 0;
}
```

---

## Keyframe Animations

```css
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

@keyframes border-sweep {
  0% { transform: rotate(0deg); opacity: 0; }
  3% { opacity: 0.8; }
  5% { opacity: 1; }
  32% { opacity: 1; }
  37% { transform: rotate(360deg); opacity: 0; }
  100% { transform: rotate(360deg); opacity: 0; }
}
```

---

## Sample Data Used in Demos

```ts
const SAMPLE_MEMBERS = [
  {
    name: 'Amara Kone',
    role: 'CTO, Lattice AI',
    bio: 'Building autonomous agents for enterprise workflows...',
    fullBio: 'Building autonomous agents for enterprise workflows. Previously led ML infrastructure at Stripe...',
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
    bio: 'Serial founder exploring the intersection of AI and developer tooling...',
    fullBio: 'Serial founder exploring the intersection of AI and developer tooling. Sold first company...',
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
    bio: 'Scaling inference infrastructure for production LLMs...',
    fullBio: 'Scaling inference infrastructure for production LLMs at Cohere, leading a team of 40 engineers...',
    interests: ['Infrastructure', 'AI Agents', 'Healthcare'],
    lastDinner: 'Mar 2025 — The Shard',
    allDinners: ['Mar 2025 — The Shard', 'Feb 2025 — Shoreditch House', 'Jan 2025 — Shoreditch House', 'Nov 2024 — The Ned'],
    company: 'Cohere',
    socials: { x: '@sarahokafor', linkedin: 'sarahokafor', discord: 'sarah#5678' },
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&crop=face',
  },
];
```

---

## Stock Photos Used (StyleGuide demos)

| Member | Unsplash photo ID |
|--------|-------------------|
| Amara Kone | `photo-1531746020798-e6953c6e8e04` |
| James Chen | `photo-1506794778202-cad84cf45f1d` |
| Sarah Okafor | `photo-1534528741775-53994a69daeb` |

All from Unsplash, format: `https://images.unsplash.com/{id}?w=600&h=800&fit=crop&crop=face`

---

## What's Next: Step 8 — Remaining Composite Components

MemberCard composite is confirmed (hover + flip). Remaining composites to design:

- **DinnerCard** — landscape crop, photo + date + title + attendee count
- **Filter dropdown** — placement TBD (confirmed as atom but NOT in nav)
- **Nav** — logo + links + filter icon, 56px height, 24px padding
- **Tabs** — People/Dinners toggle
- **Footer** — outlined circle social icons (X, LinkedIn, Discord) + caption text
- **AttendeeGrid** — compact member list inside dinner detail
- **Empty state** — when no results match filters
- **Loading skeleton** — placeholder while data loads
