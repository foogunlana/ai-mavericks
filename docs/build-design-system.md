# Building the Design System

How to build (or rebuild) the Mavericks design system from scratch. Each step produces a fully usable system — stop at any point and you have a complete system, just with fewer layers of refinement.

## Principles

- **Always shippable**: After every step, the design system works end-to-end. No half-built states.
- **Atoms before molecules**: Pick raw tokens first, then compose them into components.
- **Side-by-side options**: At each step, render 2-3 options in the style guide so you can compare visually before committing.
- **One bead per step**: Each step gets a tracked issue. Implement, update the style guide, close the bead, then move on.

## Step Order

Each step depends on the ones above it.

### Step 1: Fonts

Pick 1-2 font families (serif, sans-serif, or mono). Text is 80-90% of any UI — this is the most impactful single decision.

- **Deliverable**: `@theme { --font-*}` tokens updated, fonts loaded, style guide shows font specimens
- **Options to compare**: Render the same paragraph in 2-3 candidate fonts side by side

### Step 2: Type Scale

Define font sizes, weights, and line-heights. Choose a modular scale ratio:
- 1.200 (Minor Third) — subtle, good for dense UIs
- 1.250 (Major Third) — balanced, most common
- 1.333 (Perfect Fourth) — more dramatic headings

- **Deliverable**: `--font-size-*`, `--line-height-*`, `--letter-spacing-*` tokens, style guide type scale table updated
- **Depends on**: Step 1 (scale looks different in different fonts)

### Step 3: Colors

Define palette groups:
1. **Primary** (brand color, 10 shades)
2. **Neutrals** (text, backgrounds, borders — 10 shades)
3. **Semantic** (success, warning, error, info — 10 shades each)
4. **Secondary/accent** (optional, 0-2 colors)

- **Deliverable**: `--color-*` tokens updated, style guide swatches updated
- **Depends on**: Step 2 (need type sizes to verify contrast ratios)

### Step 4: Spacing

Adopt a base unit (4px or 8px) and define named stops. Should harmonize with your type scale's line-heights.

- **Deliverable**: Spacing scale documented in style guide, any custom `--spacing-*` tokens defined
- **Depends on**: Step 2 (spacing follows vertical rhythm of text)

### Step 5: Shape & Elevation

- **Border radii**: Pick 2-4 values (e.g. 4px inputs, 8px cards, 9999px pills)
- **Shadows**: 2-3 levels (sm, md, lg)
- **Motion**: Default duration (150-200ms) and easing

- **Deliverable**: `--radius-*`, `--shadow-*` tokens, style guide section updated
- **Depends on**: Steps 1-4 (shape/shadow applied to surfaces sized by spacing)

### Step 6: Icons

Pick one icon set (Lucide, Phosphor, Heroicons, etc.). Define default size relative to body text.

- **Deliverable**: Icon library installed, default size set, style guide shows icon specimens
- **Depends on**: Steps 2, 4 (icons sized to match type and spacing)

### Step 7: Atom Components

Build the smallest reusable pieces, in priority order:

1. Button (primary, secondary, ghost variants; sm/md/lg sizes; hover/active/disabled states)
2. Input / TextField (label, placeholder, error, helper text)
3. Typography (Heading, Text, Label, Caption components)
4. Badge / Tag
5. Avatar
6. Divider / Separator

- **Deliverable**: Each atom rendered in style guide with all variants
- **Depends on**: Steps 1-6 (atoms consume all tokens)

### Step 8: Composite Components

Compose atoms into Mavericks-specific patterns:

| Category | Components |
|----------|-----------|
| Navigation | Nav, Tabs, FilterBar |
| Data Display | MemberCard, DinnerBlock, AttendeeCard |
| Layout | Section, Container, Grid |
| Feedback | Empty state, Loading skeleton |

- **Deliverable**: Each composite rendered in style guide with real data examples
- **Depends on**: Step 7 (composites are built from atoms)

## How to Re-run This Process

1. Start a new session
2. Reference this document
3. Ask to brainstorm the design system starting from Step N
4. For each step: create a bead, implement, update style guide, close bead
5. Each step should be a self-contained commit

## Key Resources

- **Tailwind config**: `src/tailwind.css` (all `@theme` tokens)
- **Style guide**: `src/components/StyleGuide/StyleGuide.tsx`
- **Design spec**: `docs/superpowers/specs/2026-04-11-ai-mavericks-directory-design.md`
- **Original theme**: `src/theme.css` (legacy CSS custom properties)
