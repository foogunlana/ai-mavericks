# AI Mavericks Directory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page React directory showcasing ~55 AI Mavericks dinner community members with card-flip profiles, combinable filters, and stacked dinner recaps.

**Architecture:** React SPA built with Vite, styled with CSS Modules, content managed via Keystatic (git-backed CMS storing JSON files). Single page with sticky nav anchoring to Members and Dinners sections. EB Garamond + Helvetica Neue font pairing on a warm cream background.

**Tech Stack:** React 18, Vite, Keystatic, CSS Modules, EB Garamond (Google Fonts), deployed to Vercel/Netlify.

---

## File Structure

```
src/
  main.tsx                    # App entry point, renders <App />
  App.tsx                     # Top-level layout: Nav + Members + Dinners + Footer
  App.module.css              # App-level styles (page bg, max-width, font imports)
  components/
    Nav/
      Nav.tsx                 # Sticky nav with logo, Members/Dinners anchor links
      Nav.module.css
    FilterBar/
      FilterBar.tsx           # Combinable pill-style tag filters
      FilterBar.module.css
    MemberCard/
      MemberCard.tsx          # Single member card with flip animation
      MemberCard.module.css
    MemberGrid/
      MemberGrid.tsx          # 2-column grid of MemberCards, applies filters
      MemberGrid.module.css
    DinnerBlock/
      DinnerBlock.tsx         # Single dinner: hero + topics + attendee grid
      DinnerBlock.module.css
    DinnerSection/
      DinnerSection.tsx       # Stacks all DinnerBlocks vertically
      DinnerSection.module.css
    AttendeeCard/
      AttendeeCard.tsx        # Small YC-style card for dinner attendee list
      AttendeeCard.module.css
    Footer/
      Footer.tsx              # Discord, Beehiiv, social links
      Footer.module.css
  hooks/
    useFilterState.ts         # Filter state management + URL sync
  data/
    members.ts                # Reads and exports typed member data
    dinners.ts                # Reads and exports typed dinner data
    tags.ts                   # Reads and exports tag taxonomy
  types.ts                    # Shared TypeScript interfaces
  theme.css                   # CSS custom properties (colors, spacing, typography)
content/
  members/                    # Keystatic-managed JSON files (one per member)
  dinners/                    # Keystatic-managed JSON files (one per dinner)
  tags/
    tags.json                 # Tag taxonomy
public/
  images/
    members/                  # Member headshots (placeholder SVGs initially)
    dinners/                  # Group dinner photos
keystatic.config.ts           # Keystatic schema definitions
index.html                    # Vite entry HTML
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/App.module.css`, `src/theme.css`

- [ ] **Step 1: Scaffold Vite React project**

```bash
cd /Users/folusoogunlana/code/oss/mavericks
npm create vite@latest . -- --template react-ts
```

Select "Ignore files and continue" if prompted about existing files.

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

- [ ] **Step 3: Create theme.css with design tokens**

Create `src/theme.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;1,400&display=swap');

:root {
  --bg-primary: #f9f8f6;
  --text-primary: #2a2a2a;
  --text-secondary: #999;
  --text-muted: #bbb;
  --border: #e0dcd6;
  --filter-bg: transparent;
  --filter-border: #d5d0c8;
  --filter-active-bg: #2a2a2a;
  --filter-active-text: #f9f8f6;
  --card-overlay: rgba(30, 25, 20, 0.55);
  --photo-filter: grayscale(100%) sepia(15%);

  --font-serif: 'EB Garamond', Georgia, serif;
  --font-sans: 'Helvetica Neue', Helvetica, Arial, sans-serif;

  --max-width: 960px;
  --card-gap: 14px;
  --section-padding: 40px;
  --nav-height: 48px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 4: Create App shell**

Replace `src/App.tsx`:

```tsx
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <header>AI Mavericks</header>
      <main>
        <section id="members">Members section</section>
        <section id="dinners">Dinners section</section>
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
```

Create `src/App.module.css`:

```css
.app {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
}
```

- [ ] **Step 5: Update main.tsx to import theme**

Replace `src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './theme.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 6: Verify dev server runs**

```bash
npm run dev
```

Expected: App loads at `http://localhost:5173` with "AI Mavericks" header on cream background.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html src/ .gitignore
git commit -m "feat: scaffold Vite React project with theme tokens"
```

---

## Task 2: TypeScript Types + Static Data

**Files:**
- Create: `src/types.ts`, `content/tags/tags.json`, `src/data/tags.ts`, `src/data/members.ts`, `src/data/dinners.ts`

- [ ] **Step 1: Define shared types**

Create `src/types.ts`:

```ts
export interface Member {
  name: string;
  slug: string;
  title: string;
  company: string;
  bio: string;
  photo: string;
  linkedin: string;
  twitter: string;
  website: string;
  tags: string[];
  roleType: string;
  dinners: string[];
}

export interface Topic {
  text: string;
  attribution: string;
  links: string[];
}

export interface Dinner {
  name: string;
  slug: string;
  date: string;
  venue: string;
  groupPhoto: string;
  description: string;
  topics: Topic[];
  attendees: string[];
  beehiivUrl: string;
  discordUrl: string;
  lumaUrl: string;
}

export interface Tag {
  id: string;
  label: string;
  category: 'interest' | 'role';
}
```

- [ ] **Step 2: Create tag taxonomy**

Create `content/tags/tags.json`:

```json
{
  "tags": [
    { "id": "ai-agents", "label": "AI Agents", "category": "interest" },
    { "id": "llms", "label": "LLMs", "category": "interest" },
    { "id": "rag", "label": "RAG", "category": "interest" },
    { "id": "fintech", "label": "FinTech", "category": "interest" },
    { "id": "healthcare", "label": "Healthcare", "category": "interest" },
    { "id": "education", "label": "Education", "category": "interest" },
    { "id": "creative-ai", "label": "Creative AI", "category": "interest" },
    { "id": "marketing", "label": "Marketing", "category": "interest" },
    { "id": "robotics", "label": "Robotics", "category": "interest" },
    { "id": "consulting", "label": "Consulting", "category": "interest" },
    { "id": "startups", "label": "Startups", "category": "interest" },
    { "id": "data-science", "label": "Data Science", "category": "interest" },
    { "id": "vibe-coding", "label": "Vibe Coding", "category": "interest" },
    { "id": "product", "label": "Product", "category": "interest" },
    { "id": "engineer", "label": "Engineer", "category": "role" },
    { "id": "founder", "label": "Founder", "category": "role" },
    { "id": "data-scientist", "label": "Data Scientist", "category": "role" },
    { "id": "product-manager", "label": "Product Manager", "category": "role" },
    { "id": "consultant", "label": "Consultant", "category": "role" },
    { "id": "designer", "label": "Designer", "category": "role" },
    { "id": "investor", "label": "Investor", "category": "role" }
  ]
}
```

- [ ] **Step 3: Create data loader modules**

Create `src/data/tags.ts`:

```ts
import tagsData from '../../content/tags/tags.json';
import type { Tag } from '../types';

export const tags: Tag[] = tagsData.tags as Tag[];

export function getTagsByCategory(category: 'interest' | 'role'): Tag[] {
  return tags.filter((t) => t.category === category);
}

export function getTagLabel(id: string): string {
  return tags.find((t) => t.id === id)?.label ?? id;
}
```

Create `src/data/members.ts`:

```ts
import type { Member } from '../types';

const memberModules = import.meta.glob<{ default: Member }>(
  '../../content/members/*.json',
  { eager: true }
);

export const members: Member[] = Object.values(memberModules).map((m) => m.default);

export function getMemberBySlug(slug: string): Member | undefined {
  return members.find((m) => m.slug === slug);
}
```

Create `src/data/dinners.ts`:

```ts
import type { Dinner } from '../types';

const dinnerModules = import.meta.glob<{ default: Dinner }>(
  '../../content/dinners/*.json',
  { eager: true }
);

export const dinners: Dinner[] = Object.values(dinnerModules)
  .map((d) => d.default)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getDinnerBySlug(slug: string): Dinner | undefined {
  return dinners.find((d) => d.slug === slug);
}
```

- [ ] **Step 4: Commit**

```bash
git add src/types.ts content/tags/tags.json src/data/
git commit -m "feat: add TypeScript types, tag taxonomy, and data loaders"
```

---

## Task 3: Content Migration — Seed Member + Dinner JSON Files

**Files:**
- Create: `content/members/*.json` (~55 files), `content/dinners/*.json` (12 files)
- Reference: `.current-website-beehiv/dinner-recaps-beehiiv.md`, email recap data from brainstorming session

This is a large data entry task. Use a script to generate the initial JSON files from the extracted recap data.

- [ ] **Step 1: Create a migration script**

Create `scripts/seed-content.ts`:

This script should be run with `npx tsx scripts/seed-content.ts`. It reads the extracted recap data and generates the JSON content files. The script is a one-time migration tool.

```ts
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const CONTENT_DIR = join(__dirname, '..', 'content');
const MEMBERS_DIR = join(CONTENT_DIR, 'members');
const DINNERS_DIR = join(CONTENT_DIR, 'dinners');

mkdirSync(MEMBERS_DIR, { recursive: true });
mkdirSync(DINNERS_DIR, { recursive: true });

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Member data extracted from all 12 dinner recaps.
// Each member appears once with all dinners they attended.
// This is the canonical member list derived from Gmail forwards + Beehiiv scrapes.
interface RawMember {
  name: string;
  title: string;
  company: string;
  bio: string;
  linkedin: string;
  twitter: string;
  website: string;
  tags: string[];
  roleType: string;
  dinners: string[];
}

// IMPORTANT: The implementing agent must populate this array with ALL ~55 members
// extracted from:
//   1. Gmail forwarded recaps (Oct 2024 - Mar 2025) — read from conversation context
//   2. .current-website-beehiv/dinner-recaps-beehiiv.md (Apr 2025 - Q1 2026)
// Each member needs: name, title, company, bio, linkedin, tags, roleType, dinners[]
const rawMembers: RawMember[] = [
  // Example entry — agent must add all members:
  {
    name: 'Eddie Forson',
    title: 'Software Engineer & AI Consultant',
    company: 'Kiseki Labs',
    bio: 'Software engineer by trade with experience in finance/FX, mobility startups, energy and reinsurance. Founded Kiseki Labs AI Consultancy. Writes about LLMs and AI Agents on Substack.',
    linkedin: 'https://www.linkedin.com/in/eddie-forson/',
    twitter: 'https://x.com/Ed_Forson',
    website: 'https://www.kisekilabs.com/',
    tags: ['ai-agents', 'llms', 'consulting', 'startups'],
    roleType: 'engineer',
    dinners: [
      '2024-10-october', '2024-11-november', '2024-12-december',
      '2025-01-january', '2025-02-february', '2025-03-march',
      '2025-04-april', '2025-05-may', '2025-06-june',
      '2025-07-july', '2025-12-december', '2026-q1'
    ],
  },
  // ... ALL other members here
];

interface RawDinner {
  name: string;
  slug: string;
  date: string;
  venue: string;
  description: string;
  topics: { text: string; attribution: string; links: string[] }[];
  attendees: string[]; // member slugs
  beehiivUrl: string;
  discordUrl: string;
  lumaUrl: string;
}

// IMPORTANT: The implementing agent must populate this array with ALL 12 dinners
const rawDinners: RawDinner[] = [
  // Example entry — agent must add all dinners:
  {
    name: 'Q1 2026 Dinner',
    slug: '2026-q1',
    date: '2026-03-04',
    venue: 'Pizza Express Live Holborn',
    description: 'The first AI Mavericks dinner of 2026.',
    topics: [
      {
        text: 'Should junior developers bother learning traditional coding?',
        attribution: 'Group discussion',
        links: [],
      },
    ],
    attendees: ['bode-ogunlana', 'david-farrell', 'farhath-razzaque', 'liberatus', 'neil-cameron', 'rene-muhire', 'eddie-forson'],
    beehiivUrl: 'https://ai-mavericks-ldn.beehiiv.com/p/ai-mavericks-q1-2026-dinner-recap',
    discordUrl: 'https://discord.gg/xTxksjUvnE',
    lumaUrl: '',
  },
  // ... ALL other dinners here
];

// Write member files
for (const raw of rawMembers) {
  const slug = slugify(raw.name);
  const member = {
    name: raw.name,
    slug,
    title: raw.title,
    company: raw.company,
    bio: raw.bio,
    photo: `/images/members/${slug}.jpg`,
    linkedin: raw.linkedin,
    twitter: raw.twitter || '',
    website: raw.website || '',
    tags: raw.tags,
    roleType: raw.roleType,
    dinners: raw.dinners,
  };
  writeFileSync(
    join(MEMBERS_DIR, `${slug}.json`),
    JSON.stringify(member, null, 2) + '\n'
  );
}

// Write dinner files
for (const raw of rawDinners) {
  const dinner = {
    name: raw.name,
    slug: raw.slug,
    date: raw.date,
    venue: raw.venue,
    groupPhoto: `/images/dinners/${raw.slug}.jpg`,
    description: raw.description,
    topics: raw.topics,
    attendees: raw.attendees,
    beehiivUrl: raw.beehiivUrl,
    discordUrl: raw.discordUrl,
    lumaUrl: raw.lumaUrl,
  };
  writeFileSync(
    join(DINNERS_DIR, `${raw.slug}.json`),
    JSON.stringify(dinner, null, 2) + '\n'
  );
}

console.log(`Created ${rawMembers.length} member files and ${rawDinners.length} dinner files.`);
```

- [ ] **Step 2: Install tsx for running the script**

```bash
npm install -D tsx
```

- [ ] **Step 3: Populate the rawMembers and rawDinners arrays with all data**

The implementing agent must read:
- The Gmail recap data from the brainstorming conversation context (Oct 2024 — Mar 2025)
- `.current-website-beehiv/dinner-recaps-beehiiv.md` (Apr 2025 — Q1 2026)

And populate both arrays with ALL members and ALL dinners.

- [ ] **Step 4: Run the migration script**

```bash
npx tsx scripts/seed-content.ts
```

Expected: `Created 55 member files and 12 dinner files.` (approximate counts)

- [ ] **Step 5: Verify generated files**

```bash
ls content/members/ | wc -l
ls content/dinners/ | wc -l
cat content/members/eddie-forson.json
cat content/dinners/2026-q1.json
```

- [ ] **Step 6: Create placeholder member images**

Create `scripts/generate-placeholders.ts` that generates simple SVG placeholder images with initials and gradient backgrounds for each member:

```ts
import { writeFileSync, mkdirSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const MEMBERS_DIR = join(__dirname, '..', 'content', 'members');
const IMAGES_DIR = join(__dirname, '..', 'public', 'images', 'members');

mkdirSync(IMAGES_DIR, { recursive: true });

const gradients = [
  ['#7c3aed', '#4f46e5'], ['#2563eb', '#059669'], ['#059669', '#0d9488'],
  ['#dc2626', '#d97706'], ['#d97706', '#ea580c'], ['#0891b2', '#7c3aed'],
  ['#ec4899', '#8b5cf6'], ['#6366f1', '#2563eb'], ['#14b8a6', '#3b82f6'],
  ['#f59e0b', '#ef4444'], ['#8b5cf6', '#06b6d4'], ['#10b981', '#6366f1'],
];

const files = readdirSync(MEMBERS_DIR).filter((f) => f.endsWith('.json'));

files.forEach((file, i) => {
  const member = JSON.parse(readFileSync(join(MEMBERS_DIR, file), 'utf-8'));
  const initials = member.name
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const [c1, c2] = gradients[i % gradients.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="533" viewBox="0 0 400 533">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${c1}"/>
    <stop offset="100%" stop-color="${c2}"/>
  </linearGradient></defs>
  <rect width="400" height="533" fill="url(#g)"/>
  <text x="200" y="280" font-family="Helvetica Neue, Arial, sans-serif" font-size="96" font-weight="300" fill="rgba(255,255,255,0.6)" text-anchor="middle" dominant-baseline="middle">${initials}</text>
</svg>`;

  writeFileSync(join(IMAGES_DIR, `${member.slug}.svg`), svg);
});

console.log(`Created ${files.length} placeholder SVGs.`);
```

- [ ] **Step 7: Run placeholder generator**

```bash
mkdir -p public/images/dinners
npx tsx scripts/generate-placeholders.ts
```

- [ ] **Step 8: Commit**

```bash
git add content/ scripts/ public/images/
git commit -m "feat: seed all member and dinner content from recap data"
```

---

## Task 4: Sticky Nav Component

**Files:**
- Create: `src/components/Nav/Nav.tsx`, `src/components/Nav/Nav.module.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Nav component**

Create `src/components/Nav/Nav.tsx`:

```tsx
import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

export function Nav() {
  const [active, setActive] = useState<'members' | 'dinners'>('members');

  useEffect(() => {
    const handleScroll = () => {
      const dinnersEl = document.getElementById('dinners');
      if (dinnersEl) {
        const rect = dinnersEl.getBoundingClientRect();
        setActive(rect.top <= 100 ? 'dinners' : 'members');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <span className={styles.logo}>AI Mavericks</span>
        <div className={styles.links}>
          <button
            className={`${styles.link} ${active === 'members' ? styles.active : ''}`}
            onClick={() => scrollTo('members')}
          >
            Members
          </button>
          <button
            className={`${styles.link} ${active === 'dinners' ? styles.active : ''}`}
            onClick={() => scrollTo('dinners')}
          >
            Dinners
          </button>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create Nav styles**

Create `src/components/Nav/Nav.module.css`:

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  height: var(--nav-height);
}

.inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-family: var(--font-sans);
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--text-primary);
}

.links {
  display: flex;
  gap: 16px;
}

.link {
  all: unset;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  padding-bottom: 2px;
}

.link.active {
  color: var(--text-primary);
  border-bottom: 1px solid var(--text-primary);
}
```

- [ ] **Step 3: Wire Nav into App**

Replace `src/App.tsx`:

```tsx
import styles from './App.module.css';
import { Nav } from './components/Nav/Nav';

function App() {
  return (
    <>
      <Nav />
      <div className={styles.app}>
        <main>
          <section id="members" className={styles.section}>
            <p>Members section placeholder</p>
          </section>
          <section id="dinners" className={styles.section}>
            <p>Dinners section placeholder</p>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
```

Update `src/App.module.css`:

```css
.app {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  padding: var(--section-padding) 0;
}
```

- [ ] **Step 4: Verify nav renders and scrolling works**

```bash
npm run dev
```

Expected: Sticky nav at top with "AI Mavericks" logo and Members/Dinners links. Clicking links scrolls to sections.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav/ src/App.tsx src/App.module.css
git commit -m "feat: add sticky nav with scroll-aware active state"
```

---

## Task 5: MemberCard Component with Flip Animation

**Files:**
- Create: `src/components/MemberCard/MemberCard.tsx`, `src/components/MemberCard/MemberCard.module.css`

- [ ] **Step 1: Create MemberCard component**

Create `src/components/MemberCard/MemberCard.tsx`:

```tsx
import { useState } from 'react';
import type { Member } from '../../types';
import { getTagLabel } from '../../data/tags';
import { getDinnerBySlug } from '../../data/dinners';
import styles from './MemberCard.module.css';

interface Props {
  member: Member;
}

export function MemberCard({ member }: Props) {
  const [flipped, setFlipped] = useState(false);

  const initials = member.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const photoSrc = member.photo.endsWith('.svg')
    ? member.photo
    : member.photo;

  return (
    <div
      className={`${styles.card} ${flipped ? styles.flipped : ''}`}
      onClick={() => setFlipped((f) => !f)}
      id={`member-${member.slug}`}
    >
      <div className={styles.inner}>
        {/* Front */}
        <div className={styles.front}>
          <img
            src={photoSrc}
            alt={member.name}
            className={styles.photo}
            loading="lazy"
          />
          <div className={styles.overlay}>
            <span className={styles.name}>{member.name}</span>
            <span className={styles.role}>{member.title}</span>
          </div>
          <div className={styles.hoverOverlay}>
            <span className={styles.name}>{member.name}</span>
            <p className={styles.hoverBio}>{member.bio}</p>
            <div className={styles.hoverTags}>
              {member.tags.map((t) => (
                <span key={t}>{getTagLabel(t)}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Back */}
        <div className={styles.back}>
          <div className={styles.backContent}>
            <span className={styles.name}>{member.name}</span>
            <span className={styles.role}>{member.title}</span>
            {member.company && (
              <span className={styles.company}>{member.company}</span>
            )}
            <p className={styles.bio}>{member.bio}</p>
            <div className={styles.tags}>
              {member.tags.map((t, i) => (
                <span key={t}>
                  {getTagLabel(t)}
                  {i < member.tags.length - 1 && ' | '}
                </span>
              ))}
            </div>
            {member.linkedin && (
              <a
                href={member.linkedin}
                className={styles.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                LinkedIn
              </a>
            )}
            <div className={styles.dinnersList}>
              {member.dinners.map((slug) => {
                const dinner = getDinnerBySlug(slug);
                return dinner ? (
                  <a
                    key={slug}
                    href={`#dinner-${slug}`}
                    className={styles.dinnerLink}
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById(`dinner-${slug}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {dinner.name}
                  </a>
                ) : null;
              })}
            </div>
            <span className={styles.flipBack}>tap to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create MemberCard styles with flip animation**

Create `src/components/MemberCard/MemberCard.module.css`:

```css
.card {
  aspect-ratio: 3 / 4;
  perspective: 1000px;
  cursor: pointer;
  border-radius: 2px;
  overflow: hidden;
}

.inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
}

.card.flipped .inner {
  transform: rotateY(180deg);
}

.front,
.back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 2px;
  overflow: hidden;
}

/* Front */
.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: var(--photo-filter);
  display: block;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(transparent 0%, var(--card-overlay) 100%);
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.hoverOverlay {
  position: absolute;
  inset: 0;
  background: rgba(30, 25, 20, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .hoverOverlay {
  opacity: 1;
}

.card:hover .overlay {
  opacity: 0;
}

.hoverBio {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin-top: 6px;
}

.hoverTags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
  font-family: var(--font-sans);
  font-size: 7px;
  font-weight: 300;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

/* Back */
.back {
  transform: rotateY(180deg);
  background: var(--text-primary);
}

.backContent {
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

.name {
  font-family: var(--font-serif);
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
  color: #fff;
}

.role {
  font-family: var(--font-sans);
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2px;
}

.company {
  font-family: var(--font-sans);
  font-size: 8px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
}

.bio {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin-top: 12px;
}

.tags {
  font-family: var(--font-sans);
  font-size: 7px;
  font-weight: 300;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 12px;
}

.linkedin {
  font-family: var(--font-sans);
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: underline;
  text-underline-offset: 2px;
  margin-top: 12px;
}

.dinnersList {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 12px;
}

.dinnerLink {
  font-family: var(--font-sans);
  font-size: 7px;
  font-weight: 300;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.flipBack {
  font-family: var(--font-sans);
  font-size: 7px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  margin-top: auto;
  padding-top: 12px;
  text-align: center;
}

/* Disable hover overlay on touch devices */
@media (hover: none) {
  .hoverOverlay {
    display: none;
  }
}

/* Single column on mobile */
@media (max-width: 639px) {
  .card {
    aspect-ratio: 3 / 4;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/MemberCard/
git commit -m "feat: add MemberCard component with flip animation and hover overlay"
```

---

## Task 6: FilterBar + useFilterState Hook

**Files:**
- Create: `src/hooks/useFilterState.ts`, `src/components/FilterBar/FilterBar.tsx`, `src/components/FilterBar/FilterBar.module.css`

- [ ] **Step 1: Create filter state hook with URL sync**

Create `src/hooks/useFilterState.ts`:

```ts
import { useState, useCallback, useMemo } from 'react';
import type { Member } from '../types';
import { dinners } from '../data/dinners';

export interface FilterState {
  roles: string[];
  interests: string[];
  dinnerSlugs: string[];
}

function parseFiltersFromUrl(): FilterState {
  const params = new URLSearchParams(window.location.search);
  return {
    roles: params.get('roles')?.split(',').filter(Boolean) ?? [],
    interests: params.get('interests')?.split(',').filter(Boolean) ?? [],
    dinnerSlugs: params.get('dinners')?.split(',').filter(Boolean) ?? [],
  };
}

function syncFiltersToUrl(filters: FilterState) {
  const params = new URLSearchParams();
  if (filters.roles.length) params.set('roles', filters.roles.join(','));
  if (filters.interests.length) params.set('interests', filters.interests.join(','));
  if (filters.dinnerSlugs.length) params.set('dinners', filters.dinnerSlugs.join(','));
  const qs = params.toString();
  const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  window.history.replaceState(null, '', url);
}

export function useFilterState() {
  const [filters, setFiltersRaw] = useState<FilterState>(parseFiltersFromUrl);

  const setFilters = useCallback((next: FilterState) => {
    setFiltersRaw(next);
    syncFiltersToUrl(next);
  }, []);

  const toggleFilter = useCallback(
    (dimension: keyof FilterState, value: string) => {
      setFilters({
        ...filters,
        [dimension]: filters[dimension].includes(value)
          ? filters[dimension].filter((v) => v !== value)
          : [...filters[dimension], value],
      });
    },
    [filters, setFilters],
  );

  const clearFilters = useCallback(() => {
    setFilters({ roles: [], interests: [], dinnerSlugs: [] });
  }, [setFilters]);

  const hasActiveFilters =
    filters.roles.length > 0 ||
    filters.interests.length > 0 ||
    filters.dinnerSlugs.length > 0;

  const filterMembers = useCallback(
    (members: Member[]): Member[] => {
      return members.filter((m) => {
        if (filters.roles.length && !filters.roles.includes(m.roleType)) return false;
        if (filters.interests.length && !filters.interests.some((t) => m.tags.includes(t))) return false;
        if (filters.dinnerSlugs.length && !filters.dinnerSlugs.some((d) => m.dinners.includes(d))) return false;
        return true;
      });
    },
    [filters],
  );

  const dinnerOptions = useMemo(
    () => dinners.map((d) => ({ slug: d.slug, label: d.name })),
    [],
  );

  return { filters, toggleFilter, clearFilters, hasActiveFilters, filterMembers, dinnerOptions };
}
```

- [ ] **Step 2: Create FilterBar component**

Create `src/components/FilterBar/FilterBar.tsx`:

```tsx
import type { FilterState } from '../../hooks/useFilterState';
import { getTagsByCategory } from '../../data/tags';
import styles from './FilterBar.module.css';

interface Props {
  filters: FilterState;
  toggleFilter: (dimension: keyof FilterState, value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  dinnerOptions: { slug: string; label: string }[];
}

export function FilterBar({ filters, toggleFilter, clearFilters, hasActiveFilters, dinnerOptions }: Props) {
  const roles = getTagsByCategory('role');
  const interests = getTagsByCategory('interest');

  return (
    <div className={styles.bar}>
      <div className={styles.group}>
        {roles.map((tag) => (
          <button
            key={tag.id}
            className={`${styles.pill} ${filters.roles.includes(tag.id) ? styles.active : ''}`}
            onClick={() => toggleFilter('roles', tag.id)}
          >
            {tag.label}
          </button>
        ))}
      </div>
      <div className={styles.group}>
        {interests.map((tag) => (
          <button
            key={tag.id}
            className={`${styles.pill} ${filters.interests.includes(tag.id) ? styles.active : ''}`}
            onClick={() => toggleFilter('interests', tag.id)}
          >
            {tag.label}
          </button>
        ))}
      </div>
      <div className={styles.group}>
        {dinnerOptions.map((d) => (
          <button
            key={d.slug}
            className={`${styles.pill} ${filters.dinnerSlugs.includes(d.slug) ? styles.active : ''}`}
            onClick={() => toggleFilter('dinnerSlugs', d.slug)}
          >
            {d.label}
          </button>
        ))}
      </div>
      {hasActiveFilters && (
        <button className={styles.clear} onClick={clearFilters}>
          Clear all
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create FilterBar styles**

Create `src/components/FilterBar/FilterBar.module.css`:

```css
.bar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 20px;
}

.group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.group + .group {
  margin-left: 4px;
  padding-left: 8px;
  border-left: 1px solid var(--border);
}

.pill {
  all: unset;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 7px;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid var(--filter-border);
  background: var(--filter-bg);
  color: var(--text-secondary);
  transition: all 0.15s ease;
}

.pill:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

.pill.active {
  background: var(--filter-active-bg);
  color: var(--filter-active-text);
  border-color: var(--filter-active-bg);
}

.clear {
  all: unset;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 7px;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: underline;
  text-underline-offset: 2px;
  margin-left: 8px;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useFilterState.ts src/components/FilterBar/
git commit -m "feat: add FilterBar with combinable pill tags and URL sync"
```

---

## Task 7: MemberGrid Component

**Files:**
- Create: `src/components/MemberGrid/MemberGrid.tsx`, `src/components/MemberGrid/MemberGrid.module.css`

- [ ] **Step 1: Create MemberGrid component**

Create `src/components/MemberGrid/MemberGrid.tsx`:

```tsx
import type { Member } from '../../types';
import { MemberCard } from '../MemberCard/MemberCard';
import styles from './MemberGrid.module.css';

interface Props {
  members: Member[];
}

export function MemberGrid({ members }: Props) {
  if (members.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No members match your filters.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {members.map((member) => (
        <MemberCard key={member.slug} member={member} />
      ))}
    </div>
  );
}
```

Create `src/components/MemberGrid/MemberGrid.module.css`:

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--card-gap);
}

.empty {
  text-align: center;
  padding: 60px 20px;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 300;
  color: var(--text-secondary);
}

@media (max-width: 639px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MemberGrid/
git commit -m "feat: add MemberGrid 2-column responsive layout"
```

---

## Task 8: DinnerBlock + AttendeeCard + DinnerSection Components

**Files:**
- Create: `src/components/AttendeeCard/AttendeeCard.tsx`, `src/components/AttendeeCard/AttendeeCard.module.css`, `src/components/DinnerBlock/DinnerBlock.tsx`, `src/components/DinnerBlock/DinnerBlock.module.css`, `src/components/DinnerSection/DinnerSection.tsx`, `src/components/DinnerSection/DinnerSection.module.css`

- [ ] **Step 1: Create AttendeeCard component**

Create `src/components/AttendeeCard/AttendeeCard.tsx`:

```tsx
import type { Member } from '../../types';
import styles from './AttendeeCard.module.css';

interface Props {
  member: Member;
}

export function AttendeeCard({ member }: Props) {
  const initials = member.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <button
      className={styles.card}
      onClick={() => {
        document.getElementById(`member-${member.slug}`)?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <img
        src={member.photo}
        alt={member.name}
        className={styles.photo}
        loading="lazy"
      />
      <div className={styles.info}>
        <span className={styles.name}>{member.name}</span>
        <span className={styles.role}>{member.title}</span>
      </div>
    </button>
  );
}
```

Create `src/components/AttendeeCard/AttendeeCard.module.css`:

```css
.card {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  border-radius: 4px;
  transition: background 0.15s ease;
}

.card:hover {
  background: rgba(0, 0, 0, 0.03);
}

.photo {
  width: 32px;
  height: 32px;
  border-radius: 2px;
  object-fit: cover;
  filter: var(--photo-filter);
  flex-shrink: 0;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.name {
  font-family: var(--font-serif);
  font-size: 11px;
  font-weight: 400;
  font-style: italic;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.role {
  font-family: var(--font-sans);
  font-size: 7px;
  font-weight: 400;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

- [ ] **Step 2: Create DinnerBlock component**

Create `src/components/DinnerBlock/DinnerBlock.tsx`:

```tsx
import type { Dinner } from '../../types';
import { getMemberBySlug } from '../../data/members';
import { AttendeeCard } from '../AttendeeCard/AttendeeCard';
import styles from './DinnerBlock.module.css';

interface Props {
  dinner: Dinner;
}

export function DinnerBlock({ dinner }: Props) {
  const attendeeMembers = dinner.attendees
    .map(getMemberBySlug)
    .filter(Boolean);

  const formattedDate = new Date(dinner.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className={styles.block} id={`dinner-${dinner.slug}`}>
      <div className={styles.hero}>
        {dinner.groupPhoto && (
          <img
            src={dinner.groupPhoto}
            alt={dinner.name}
            className={styles.heroImage}
            loading="lazy"
          />
        )}
        <div className={styles.heroOverlay}>
          <span className={styles.date}>{formattedDate}</span>
          <h2 className={styles.title}>{dinner.name}</h2>
          {dinner.venue && <span className={styles.venue}>{dinner.venue}</span>}
        </div>
      </div>

      {dinner.topics.length > 0 && (
        <div className={styles.topics}>
          <ul>
            {dinner.topics.map((topic, i) => (
              <li key={i} className={styles.topic}>
                <span>{topic.text}</span>
                {topic.attribution && (
                  <span className={styles.attribution}> — {topic.attribution}</span>
                )}
                {topic.links.map((link, j) => (
                  <a
                    key={j}
                    href={link}
                    className={styles.topicLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    link
                  </a>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.attendees}>
        <span className={styles.attendeesLabel}>
          {attendeeMembers.length} attendees
        </span>
        <div className={styles.attendeesGrid}>
          {attendeeMembers.map((member) => (
            <AttendeeCard key={member!.slug} member={member!} />
          ))}
        </div>
      </div>

      <div className={styles.links}>
        {dinner.beehiivUrl && (
          <a href={dinner.beehiivUrl} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
            Full recap
          </a>
        )}
        {dinner.discordUrl && (
          <a href={dinner.discordUrl} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
            Discord
          </a>
        )}
      </div>
    </article>
  );
}
```

Create `src/components/DinnerBlock/DinnerBlock.module.css`:

```css
.block {
  margin-bottom: 60px;
}

.hero {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 2px;
  overflow: hidden;
  background: var(--text-primary);
}

.heroImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.heroOverlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(30, 25, 20, 0.7));
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date {
  font-family: var(--font-sans);
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.title {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 400;
  font-style: italic;
  color: #fff;
}

.venue {
  font-family: var(--font-sans);
  font-size: 8px;
  font-weight: 300;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.5);
}

.topics {
  margin-top: 20px;
}

.topics ul {
  list-style: none;
  padding: 0;
}

.topic {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 300;
  line-height: 1.6;
  color: var(--text-primary);
  padding: 6px 0;
  border-bottom: 1px solid var(--border);
}

.attribution {
  font-size: 11px;
  color: var(--text-secondary);
  font-style: italic;
}

.topicLink {
  font-size: 10px;
  color: var(--text-secondary);
  text-decoration: underline;
  text-underline-offset: 2px;
  margin-left: 6px;
}

.attendees {
  margin-top: 24px;
}

.attendeesLabel {
  font-family: var(--font-sans);
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-secondary);
  display: block;
  margin-bottom: 12px;
}

.attendeesGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

.links {
  margin-top: 16px;
  display: flex;
  gap: 12px;
}

.externalLink {
  font-family: var(--font-sans);
  font-size: 7px;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

@media (max-width: 639px) {
  .attendeesGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 3: Create DinnerSection component**

Create `src/components/DinnerSection/DinnerSection.tsx`:

```tsx
import { dinners } from '../../data/dinners';
import { DinnerBlock } from '../DinnerBlock/DinnerBlock';
import styles from './DinnerSection.module.css';

export function DinnerSection() {
  return (
    <div className={styles.section}>
      {dinners.map((dinner) => (
        <DinnerBlock key={dinner.slug} dinner={dinner} />
      ))}
    </div>
  );
}
```

Create `src/components/DinnerSection/DinnerSection.module.css`:

```css
.section {
  padding-top: 20px;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/AttendeeCard/ src/components/DinnerBlock/ src/components/DinnerSection/
git commit -m "feat: add DinnerBlock, AttendeeCard, and DinnerSection components"
```

---

## Task 9: Footer Component

**Files:**
- Create: `src/components/Footer/Footer.tsx`, `src/components/Footer/Footer.module.css`

- [ ] **Step 1: Create Footer component**

Create `src/components/Footer/Footer.tsx`:

```tsx
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="https://discord.gg/xTxksjUvnE" target="_blank" rel="noopener noreferrer">
          Discord
        </a>
        <a href="https://ai-mavericks-ldn.beehiiv.com" target="_blank" rel="noopener noreferrer">
          Newsletter
        </a>
        <a href="https://www.linkedin.com/in/eddie-forson/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://x.com/Ed_Forson" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
      <p className={styles.credit}>AI Mavericks London</p>
    </footer>
  );
}
```

Create `src/components/Footer/Footer.module.css`:

```css
.footer {
  border-top: 1px solid var(--border);
  padding: 24px 0;
  margin-top: 40px;
  text-align: center;
}

.links {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
}

.links a {
  font-family: var(--font-sans);
  font-size: 7px;
  font-weight: 400;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.credit {
  font-family: var(--font-sans);
  font-size: 7px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer/
git commit -m "feat: add Footer with social links"
```

---

## Task 10: Wire Everything Together in App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Assemble the full page**

Replace `src/App.tsx`:

```tsx
import styles from './App.module.css';
import { Nav } from './components/Nav/Nav';
import { FilterBar } from './components/FilterBar/FilterBar';
import { MemberGrid } from './components/MemberGrid/MemberGrid';
import { DinnerSection } from './components/DinnerSection/DinnerSection';
import { Footer } from './components/Footer/Footer';
import { useFilterState } from './hooks/useFilterState';
import { members } from './data/members';

function App() {
  const { filters, toggleFilter, clearFilters, hasActiveFilters, filterMembers, dinnerOptions } =
    useFilterState();

  const filteredMembers = filterMembers(members);

  return (
    <>
      <Nav />
      <div className={styles.app}>
        <main>
          <section id="members" className={styles.section}>
            <FilterBar
              filters={filters}
              toggleFilter={toggleFilter}
              clearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              dinnerOptions={dinnerOptions}
            />
            <MemberGrid members={filteredMembers} />
          </section>
          <section id="dinners" className={styles.section}>
            <DinnerSection />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
```

- [ ] **Step 2: Verify the full app runs**

```bash
npm run dev
```

Expected: Full page with sticky nav, filter bar, member card grid with flip animation, stacked dinner sections with attendee grids, and footer. All cross-links work.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire all components together into full directory page"
```

---

## Task 11: Keystatic CMS Setup

**Files:**
- Create: `keystatic.config.ts`
- Modify: `package.json`

- [ ] **Step 1: Install Keystatic**

```bash
npm install @keystatic/core @keystatic/react
```

- [ ] **Step 2: Create Keystatic config**

Create `keystatic.config.ts` at the project root:

```ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  collections: {
    members: collection({
      label: 'Members',
      slugField: 'name',
      path: 'content/members/*',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Name', validation: { isRequired: true } }),
        title: fields.text({ label: 'Title / Role' }),
        company: fields.text({ label: 'Company' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        photo: fields.text({ label: 'Photo path' }),
        linkedin: fields.url({ label: 'LinkedIn URL' }),
        twitter: fields.url({ label: 'Twitter URL' }),
        website: fields.url({ label: 'Website URL' }),
        tags: fields.multiselect({
          label: 'Interest Tags',
          options: [
            { label: 'AI Agents', value: 'ai-agents' },
            { label: 'LLMs', value: 'llms' },
            { label: 'RAG', value: 'rag' },
            { label: 'FinTech', value: 'fintech' },
            { label: 'Healthcare', value: 'healthcare' },
            { label: 'Education', value: 'education' },
            { label: 'Creative AI', value: 'creative-ai' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'Robotics', value: 'robotics' },
            { label: 'Consulting', value: 'consulting' },
            { label: 'Startups', value: 'startups' },
            { label: 'Data Science', value: 'data-science' },
            { label: 'Vibe Coding', value: 'vibe-coding' },
            { label: 'Product', value: 'product' },
          ],
        }),
        roleType: fields.select({
          label: 'Role Type',
          options: [
            { label: 'Engineer', value: 'engineer' },
            { label: 'Founder', value: 'founder' },
            { label: 'Data Scientist', value: 'data-scientist' },
            { label: 'Product Manager', value: 'product-manager' },
            { label: 'Consultant', value: 'consultant' },
            { label: 'Designer', value: 'designer' },
            { label: 'Investor', value: 'investor' },
          ],
          defaultValue: 'engineer',
        }),
        dinners: fields.multiselect({
          label: 'Dinners Attended',
          options: [
            { label: 'Oct 2024', value: '2024-10-october' },
            { label: 'Nov 2024', value: '2024-11-november' },
            { label: 'Dec 2024', value: '2024-12-december' },
            { label: 'Jan 2025', value: '2025-01-january' },
            { label: 'Feb 2025', value: '2025-02-february' },
            { label: 'Mar 2025', value: '2025-03-march' },
            { label: 'Apr 2025', value: '2025-04-april' },
            { label: 'May 2025', value: '2025-05-may' },
            { label: 'Jun 2025', value: '2025-06-june' },
            { label: 'Jul 2025', value: '2025-07-july' },
            { label: 'Dec 2025', value: '2025-12-december' },
            { label: 'Q1 2026', value: '2026-q1' },
          ],
        }),
      },
    }),
    dinners: collection({
      label: 'Dinners',
      slugField: 'name',
      path: 'content/dinners/*',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Dinner Name', validation: { isRequired: true } }),
        date: fields.date({ label: 'Date' }),
        venue: fields.text({ label: 'Venue' }),
        description: fields.text({ label: 'Description', multiline: true }),
        groupPhoto: fields.text({ label: 'Group Photo path' }),
        beehiivUrl: fields.url({ label: 'Beehiiv URL' }),
        discordUrl: fields.url({ label: 'Discord URL' }),
        lumaUrl: fields.url({ label: 'Luma URL' }),
        attendees: fields.multiselect({
          label: 'Attendees (member slugs)',
          options: [], // Populated dynamically or manually
        }),
      },
    }),
  },
});
```

- [ ] **Step 3: Add Keystatic dev script to package.json**

Add to `package.json` scripts:

```json
"keystatic": "keystatic dev"
```

- [ ] **Step 4: Verify Keystatic admin runs**

```bash
npx keystatic dev
```

Expected: Admin UI accessible at `http://localhost:3000/keystatic` showing Members and Dinners collections.

- [ ] **Step 5: Commit**

```bash
git add keystatic.config.ts package.json package-lock.json
git commit -m "feat: add Keystatic CMS config for members and dinners"
```

---

## Task 12: Build + Deploy Configuration

**Files:**
- Modify: `vite.config.ts`, `package.json`

- [ ] **Step 1: Verify production build**

```bash
npm run build
```

Expected: Build completes with no errors. Output in `dist/`.

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Expected: App loads at `http://localhost:4173` with all features working.

- [ ] **Step 3: Add .gitignore entries**

Append to `.gitignore`:

```
dist/
node_modules/
.superpowers/
.playwright-mcp/
*.png
```

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete AI Mavericks directory MVP"
```

---

## Task Summary

| # | Task | Description | Depends On |
|---|------|-------------|------------|
| 1 | Project Scaffolding | Vite + React + theme tokens | — |
| 2 | Types + Data Loaders | TypeScript interfaces, tag taxonomy, data modules | 1 |
| 3 | Content Migration | Seed ~55 member + 12 dinner JSON files from recaps | 2 |
| 4 | Sticky Nav | Nav component with scroll-aware active state | 1 |
| 5 | MemberCard | Card with flip animation + hover overlay | 2 |
| 6 | FilterBar + Hook | Combinable filters with URL sync | 2 |
| 7 | MemberGrid | 2-column responsive grid of MemberCards | 5 |
| 8 | Dinner Components | DinnerBlock + AttendeeCard + DinnerSection | 2 |
| 9 | Footer | Social links footer | 1 |
| 10 | App Assembly | Wire all components into App.tsx | 3, 4, 6, 7, 8, 9 |
| 11 | Keystatic CMS | CMS config for Eddie to manage content | 3 |
| 12 | Build + Deploy | Production build verification | 10 |
