# Tailwind Design System Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a complete design system with Tailwind CSS v4 tokens (typography with EB Garamond serif + Helvetica Neue sans, warm palette with semantic colors, spacing scale), and build a comprehensive visual StyleGuide component that showcases design tokens with color swatches, typography samples, and spacing scale.

**Architecture:** 
- Enhance `src/tailwind.css` with EB Garamond + Helvetica Neue typography tokens, secondary/semantic color palette (success, error, warning, info), and documented spacing/component scales
- Refactor existing `src/components/StyleGuide/StyleGuide.tsx` to use Tailwind utilities throughout instead of inline styles
- Add new StyleGuide sections: Color Palette (swatches with hex codes), Typography (font samples with size/weight/line-height), Spacing Scale (visual grid), and semantic color examples
- Keep existing CSS Modules working alongside Tailwind (coexist without conflict)
- Ensure StyleGuide is the canonical reference for design tokens (visible in dev, accessible to designers)

**Tech Stack:** Tailwind CSS v4 (already installed), React 19, Vite, CSS Modules (existing, coexist)

---

## File Structure

### New/Modified Files
- **src/tailwind.css** — Add font-family tokens (EB Garamond serif, Helvetica Neue sans), secondary/semantic color tokens, document spacing scale
- **src/components/StyleGuide/StyleGuide.tsx** — Refactor to use Tailwind classes; add Color Palette, Typography samples, Spacing Scale sections
- **src/components/StyleGuide/components/** (new directory) — Reusable components for StyleGuide sections (ColorSwatch, TypographySample, SpacingGrid, etc.)

### Design Token Strategy
- **Colors:** Keep existing cool monochrome (bg, text, secondary, muted, border, surface, accent) + add semantic colors (success #10b981, error #ef4444, warning #f97316, info #3b82f6)
- **Typography:** `--font-serif: 'EB Garamond', serif` and `--font-sans: 'Helvetica Neue', Helvetica, Arial, sans-serif`; keep existing perfect fourth scale (1.333 ratio)
- **Spacing:** Use Tailwind defaults (4, 8, 12, 16, 20, 24, ...) + named semantic stops (nav-height, section-gap, etc.)
- **Named Utility Classes:** Define component patterns (buttons, tags, cards) as Tailwind classes in `@layer components` for reuse

---

## Tasks

### Task 1: Add Google Fonts and Update Typography Tokens

**Files:**
- Modify: `index.html` (add font link)
- Modify: `src/tailwind.css` (update font-family tokens)

- [ ] **Step 1: Add EB Garamond and Helvetica Neue to index.html**

Open `index.html` and add the following in the `<head>` (after existing meta tags):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
```

System fonts for Helvetica Neue will fall back to sans-serif (no import needed).

- [ ] **Step 2: Update tailwind.css typography tokens**

In `src/tailwind.css`, find the typography section and replace:

```css
/* ─── Typography ─── */
--font-serif: 'EB Garamond', serif;
--font-sans: 'Helvetica Neue', Helvetica, Arial, sans-serif;

/* Font sizes - perfect fourth scale (1.333) */
--font-size-xs: 0.5rem;       /* 8px   — caption */
--font-size-sm: 0.688rem;     /* ~11px — small */
--font-size-base: 1rem;       /* 16px  — body */
--font-size-md: 1.333rem;     /* ~21px — subheading */
--font-size-lg: 1.777rem;     /* ~28px — h3 */
--font-size-xl: 2.369rem;     /* ~38px — h2/heading */
--font-size-2xl: 3.157rem;    /* ~51px — display sm */
--font-size-3xl: 4.209rem;    /* ~67px — display md */
--font-size-4xl: 5.610rem;    /* ~90px — display lg */
--font-size-5xl: 7.478rem;    /* ~120px — display xl */

/* Line heights — per type role spec */
--line-height-tight: 1.15;    /* heading */
--line-height-snug: 1.25;     /* subheading */
--line-height-normal: 1.45;   /* body */
--line-height-relaxed: 1.2;   /* small */

/* Letter spacing */
--letter-spacing-tight: -0.02em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.05em;
--letter-spacing-wider: 0.1em;

/* ─── Font Weights ─── */
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

- [ ] **Step 3: Add semantic color tokens to tailwind.css**

In the Colors section, after the accent color, add:

```css
/* ─── Semantic Colors ─── */
--color-success: #10b981;
--color-success-light: #d1fae5;
--color-error: #ef4444;
--color-error-light: #fee2e2;
--color-warning: #f97316;
--color-warning-light: #ffedd5;
--color-info: #3b82f6;
--color-info-light: #dbeafe;
```

- [ ] **Step 4: Test fonts load in browser**

Run `npm run dev`, open browser dev tools Network tab, verify Google Fonts CSS loads (no 404s). Confirm EB Garamond displays in any Tailwind-styled text.

- [ ] **Step 5: Commit**

```bash
git add index.html src/tailwind.css
git commit -m "feat: add EB Garamond serif + Helvetica Neue sans typography tokens and semantic color palette"
```

---

### Task 2: Create StyleGuide Component Utility Components

**Files:**
- Create: `src/components/StyleGuide/components/ColorSwatch.tsx`
- Create: `src/components/StyleGuide/components/TypographySample.tsx`
- Create: `src/components/StyleGuide/components/SpacingGrid.tsx`
- Create: `src/components/StyleGuide/components/index.ts`

- [ ] **Step 1: Create ColorSwatch component**

Create `src/components/StyleGuide/components/ColorSwatch.tsx`:

```tsx
interface ColorSwatchProps {
  name: string;
  value: string;
  hex: string;
}

export function ColorSwatch({ name, value, hex }: ColorSwatchProps) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-32 h-32 rounded border border-gray-200"
        style={{ backgroundColor: value }}
        title={value}
      />
      <div className="text-sm">
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-gray-500 font-mono text-xs">{hex}</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create TypographySample component**

Create `src/components/StyleGuide/components/TypographySample.tsx`:

```tsx
interface TypographySampleProps {
  name: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  letterSpacing?: string;
  family: 'serif' | 'sans';
  sample: string;
}

export function TypographySample({
  name,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing = 'normal',
  family,
  sample,
}: TypographySampleProps) {
  const fontFamily = family === 'serif' ? 'EB Garamond, serif' : 'Helvetica Neue, sans-serif';
  
  return (
    <div className="border border-gray-200 rounded p-6 bg-white">
      <div
        style={{
          fontFamily,
          fontSize,
          fontWeight,
          lineHeight,
          letterSpacing,
          marginBottom: '12px',
          color: '#1a1a1a',
        }}
      >
        {sample}
      </div>
      <div className="text-xs text-gray-500 space-y-1 font-mono">
        <div>{name}</div>
        <div>Size: {fontSize} | Weight: {fontWeight} | Line Height: {lineHeight}</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create SpacingGrid component**

Create `src/components/StyleGuide/components/SpacingGrid.tsx`:

```tsx
const SPACING_SCALE = [
  { name: '1', px: '4px' },
  { name: '2', px: '8px' },
  { name: '3', px: '12px' },
  { name: '4', px: '16px' },
  { name: '5', px: '20px' },
  { name: '6', px: '24px' },
  { name: '7', px: '32px' },
  { name: '8', px: '40px' },
  { name: '9', px: '48px' },
  { name: '10', px: '56px' },
  { name: '11', px: '64px' },
  { name: '12', px: '80px' },
  { name: '13', px: '96px' },
  { name: '14', px: '120px' },
  { name: '15', px: '160px' },
];

export function SpacingGrid() {
  return (
    <div className="space-y-6">
      {SPACING_SCALE.map(({ name, px }) => (
        <div key={name} className="flex items-center gap-4">
          <div
            className="bg-blue-500 rounded"
            style={{ width: px, height: '40px' }}
          />
          <div className="font-mono text-sm">
            <div className="font-semibold text-gray-900">Space {name}</div>
            <div className="text-gray-500">{px}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create index.ts barrel export**

Create `src/components/StyleGuide/components/index.ts`:

```ts
export { ColorSwatch } from './ColorSwatch';
export { TypographySample } from './TypographySample';
export { SpacingGrid } from './SpacingGrid';
```

- [ ] **Step 5: Commit**

```bash
git add src/components/StyleGuide/components/
git commit -m "feat: create StyleGuide utility components (ColorSwatch, TypographySample, SpacingGrid)"
```

---

### Task 3: Refactor StyleGuide Component to Use Tailwind + Add Token Sections

**Files:**
- Modify: `src/components/StyleGuide/StyleGuide.tsx` (major refactor)

- [ ] **Step 1: Import new components at top of file**

Add to the imports section of `StyleGuide.tsx`:

```tsx
import { ColorSwatch, TypographySample, SpacingGrid } from './components';
```

- [ ] **Step 2: Replace inline styles with Tailwind in header**

Find and replace the header section to use Tailwind:

```tsx
<div className="max-w-6xl mx-auto px-6 py-12">
  <header className="mb-8">
    <h1 className="text-5xl font-serif font-light text-gray-900 mb-3">
      Design System
    </h1>
    <p className="text-base font-sans font-normal text-gray-600 leading-relaxed">
      Complete design token reference: colors, typography, spacing, and components.
    </p>
  </header>
```

- [ ] **Step 3: Update section navigation to Tailwind classes**

Replace the nav element with:

```tsx
{/* Section switcher */}
<nav className="flex gap-1 flex-wrap mb-12">
  {SECTION_LABELS.map(({ id, label }) => (
    <button
      key={id}
      onClick={() => setActiveSection(id)}
      className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
        activeSection === id
          ? 'bg-gray-100 text-gray-900'
          : 'bg-transparent text-gray-600 hover:text-gray-900'
      }`}
    >
      {label}
    </button>
  ))}
</nav>
```

- [ ] **Step 4: Add type and label updates for new sections**

Update the type declaration and SECTION_LABELS array:

```tsx
type SectionId = 'color-palette' | 'typography' | 'spacing' | 'landing-hero' | 'hero-redesign' | 'member-hover' | 'member-flip' | 'typography-styles' | 'button' | 'tag' | 'avatar' | 'card' | 'icons' | 'logo' | 'filter' | 'nav' | 'member-list' | 'view-toggle' | 'member-views' | 'dinner-card' | 'dinner-list' | 'dinner-hero' | 'dinner-detail-hero';

const SECTION_LABELS: { id: SectionId; label: string }[] = [
  { id: 'color-palette', label: '🎨 Colors' },
  { id: 'typography', label: '✍️ Typography' },
  { id: 'spacing', label: '📐 Spacing' },
  { id: 'landing-hero', label: 'Landing Hero' },
  // ... keep all existing sections ...
];
```

- [ ] **Step 5: Add new section content before closing div**

Add three new sections for design tokens. Find the place where all the `{activeSection === ...}` blocks end, and add before the final closing `</div>`:

```tsx
{activeSection === 'color-palette' && (
  <Section title="Color Palette">
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monochrome — Core</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ColorSwatch name="Background" value="#ffffff" hex="#ffffff" />
          <ColorSwatch name="Text" value="#1a1a1a" hex="#1a1a1a" />
          <ColorSwatch name="Secondary Text" value="#6b7280" hex="#6b7280" />
          <ColorSwatch name="Muted" value="#9ca3af" hex="#9ca3af" />
          <ColorSwatch name="Border" value="#e5e7eb" hex="#e5e7eb" />
          <ColorSwatch name="Border Light" value="#f3f4f6" hex="#f3f4f6" />
          <ColorSwatch name="Surface" value="#f9fafb" hex="#f9fafb" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Semantic Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ColorSwatch name="Success" value="#10b981" hex="#10b981" />
          <ColorSwatch name="Success Light" value="#d1fae5" hex="#d1fae5" />
          <ColorSwatch name="Error" value="#ef4444" hex="#ef4444" />
          <ColorSwatch name="Error Light" value="#fee2e2" hex="#fee2e2" />
          <ColorSwatch name="Warning" value="#f97316" hex="#f97316" />
          <ColorSwatch name="Warning Light" value="#ffedd5" hex="#ffedd5" />
          <ColorSwatch name="Info" value="#3b82f6" hex="#3b82f6" />
          <ColorSwatch name="Info Light" value="#dbeafe" hex="#dbeafe" />
        </div>
      </div>
    </div>
  </Section>
)}

{activeSection === 'typography' && (
  <Section title="Typography Styles">
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Serif (EB Garamond)</h3>
        <div className="grid gap-6">
          <TypographySample
            name="Display XL"
            fontSize="7.478rem"
            fontWeight={400}
            lineHeight={1.15}
            family="serif"
            sample="The quick brown fox"
          />
          <TypographySample
            name="Heading (H1)"
            fontSize="2.369rem"
            fontWeight={400}
            lineHeight={1.15}
            family="serif"
            sample="Main heading example"
          />
          <TypographySample
            name="Subheading"
            fontSize="1.333rem"
            fontWeight={500}
            lineHeight={1.25}
            family="serif"
            sample="Secondary heading"
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sans (Helvetica Neue)</h3>
        <div className="grid gap-6">
          <TypographySample
            name="Body"
            fontSize="1rem"
            fontWeight={400}
            lineHeight={1.45}
            family="sans"
            sample="Body text flows like this, readable and comfortable for longer passages."
          />
          <TypographySample
            name="Small"
            fontSize="0.688rem"
            fontWeight={500}
            lineHeight={1.2}
            family="sans"
            sample="Small text for labels and captions"
          />
          <TypographySample
            name="Caption"
            fontSize="0.5rem"
            fontWeight={500}
            lineHeight={1.1}
            family="sans"
            sample="TINY CAPTION TEXT"
          />
        </div>
      </div>
    </div>
  </Section>
)}

{activeSection === 'spacing' && (
  <Section title="Spacing Scale">
    <p className="text-gray-600 mb-8">
      Based on an 8px grid. Each spacing level builds on the previous (4, 8, 12, 16, ..., 160px).
      Use for margins, padding, and gaps throughout the design.
    </p>
    <SpacingGrid />
  </Section>
)}
```

- [ ] **Step 6: Run dev server and verify sections display**

```bash
npm run dev
```

Navigate to StyleGuide, verify:
- Colors section shows color swatches with names and hex codes
- Typography section shows serif and sans samples
- Spacing section shows 15-item grid with visual blocks
- All using Tailwind classes (inspect elements, should see `class="text-lg font-semibold"` etc)

- [ ] **Step 7: Commit**

```bash
git add src/components/StyleGuide/
git commit -m "feat: refactor StyleGuide to use Tailwind utilities and add design token sections (colors, typography, spacing)"
```

---

### Task 4: Verify Build, Types, and Coexistence

**Files:**
- Verify: `src/tailwind.css` (no changes)
- Verify: `src/App.tsx` and `src/components/Nav/Nav.tsx` (CSS Modules still work)
- Verify: Build output

- [ ] **Step 1: Run TypeScript check**

```bash
npm run build
```

Expected: `tsc -b` completes with no errors.

- [ ] **Step 2: Check Tailwind + CSS Modules coexist**

Run dev mode and inspect elements in browser dev tools:
- Any Tailwind-styled element should have classes like `text-lg`, `font-semibold`
- Any CSS Module-styled element (Nav, etc.) should have classes like `Nav_nav__abc123`
- No class name conflicts, no overrides

- [ ] **Step 3: Verify all views render correctly**

Navigate through all views:
- Home (hero, member list)
- People (filter, member cards)
- Dinners (dinner list, detail)
- Style Guide (color palette, typography, spacing, components)

All should render with proper styling.

- [ ] **Step 4: Build for production**

```bash
npm run build
```

Expected: Succeeds, creates `dist/` with no errors or warnings.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: verify Tailwind + CSS Modules coexist and build succeeds"
```

---

## Verification Checklist

- [ ] EB Garamond loads from Google Fonts (Network tab in dev tools)
- [ ] Helvetica Neue sans displays correctly (system font fallback)
- [ ] Colors section shows all monochrome + semantic colors with hex codes
- [ ] Typography section shows serif and sans samples with sizes/weights
- [ ] Spacing section shows 15-item grid (4px → 160px) with visual blocks
- [ ] All StyleGuide content uses Tailwind classes (no inline styles)
- [ ] CSS Modules still work (Nav, App, etc. render correctly)
- [ ] TypeScript builds cleanly (`npm run build`)
- [ ] Production build succeeds (`dist/` created)
- [ ] No class name conflicts between Tailwind and CSS Modules
- [ ] StyleGuide nav link visible in dev mode
- [ ] All views navigate and render correctly

---

## Next Steps

- Use StyleGuide as canonical reference for design tokens
- Apply Tailwind utilities to all new components
- CSS Modules coexist but use Tailwind for new work going forward
