# URL Routing + DinnerDetail Data Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every view a real, shareable URL (`/`, `/people`, `/dinners`, `/dinners/:slug`) via react-router-dom, and fix the "Dinner not found" bug by resolving the dinner from live data instead of DEV-only static modules.

**Architecture:** Wrap the app in `<BrowserRouter basename={import.meta.env.BASE_URL}>`. `App.tsx` keeps the shell (Nav/Footer/scroll-reveal) and derives the current view from `useLocation()`. `AppViews.tsx` becomes a `<Routes>` definition; auth gating stays via Clerk `<Show>`. Leaf components keep their `onViewChange`/`onSelectDinner` callbacks — the shell wires them to `navigate()`. `DinnerDetail` reads `:slug` from `useParams()` and resolves the dinner + attendees from the live `dinners`/`members` props.

**Tech Stack:** React 19, Vite, react-router-dom, Clerk (`<Show>`), Playwright e2e.

**Reference:** `docs/superpowers/specs/2026-06-13-url-routing-design.md`

---

## File structure

| File | Responsibility | Change |
|------|----------------|--------|
| `src/main.tsx` | Mount + providers | Add `BrowserRouter` |
| `src/components/AppViews.tsx` | Route table + view helpers | Rewrite to `<Routes>`; add `viewToPath`/`pathToView` |
| `src/App.tsx` | Shell, scroll-reveal nav, auth wiring | Derive view from location; wire nav to `navigate()` |
| `src/StaticContent.tsx` | DEV/no-auth data provider | Drop `view`/`selectedDinnerSlug` props |
| `src/components/DinnerDetail/DinnerDetail.tsx` | Dinner detail page | Resolve from `dinners`/`members` props (bug fix) |
| `.env.test` | Force no-auth path for e2e | New |
| `playwright.config.ts` | e2e servers/projects | Add no-auth server + routing project |
| `e2e/routing.spec.ts` | Routing + detail e2e | New |

Leaf components (`Nav`, `LandingHero`, `MemberHome`, `DinnersPage`, `DinnerCard`) are **unchanged** — they keep their existing callback props.

---

### Task 1: Install react-router-dom and add BrowserRouter

**Files:**
- Modify: `package.json` (via npm)
- Modify: `src/main.tsx`

- [ ] **Step 1: Install the dependency**

Run:
```bash
npm install react-router-dom
```
Expected: `react-router-dom` added to `dependencies` in `package.json`.

- [ ] **Step 2: Wrap App in BrowserRouter**

Replace the entire contents of `src/main.tsx` with:
```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './tailwind.css';
import './theme.css';
import App from './App';
import { ClerkProvider } from './auth/ClerkProvider';

// react-router basename: strip the trailing slash from Vite's BASE_URL
// ('/ai-mavericks/' -> '/ai-mavericks'; '/' -> '' = no basename).
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
```

- [ ] **Step 3: Verify it compiles (app still state-based, router unused)**

Run:
```bash
npx tsc -b
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/main.tsx
git commit -m "build: add react-router-dom and wrap app in BrowserRouter (mavericks-d9p)"
```

---

### Task 2: Add view↔path helpers

**Files:**
- Modify: `src/components/AppViews.tsx` (add helpers near the `View` type, ~line 16)

- [ ] **Step 1: Add the helpers**

In `src/components/AppViews.tsx`, immediately after the existing line
`export type View = 'home' | 'people' | 'dinners' | 'dinner-detail' | 'styleguide';`
add:
```tsx
/** Map a logical view to its URL path (basename-relative). */
export function viewToPath(view: View): string {
  switch (view) {
    case 'home': return '/';
    case 'people': return '/people';
    case 'dinners': return '/dinners';
    case 'dinner-detail': return '/dinners';
    case 'styleguide': return '/styleguide';
  }
}

/** Derive the logical view from a basename-relative pathname. */
export function pathToView(pathname: string): View {
  if (pathname.startsWith('/people')) return 'people';
  if (pathname.startsWith('/dinners')) return 'dinners'; // covers /dinners/:slug
  if (pathname.startsWith('/styleguide')) return 'styleguide';
  return 'home';
}
```

- [ ] **Step 2: Verify it compiles**

Run:
```bash
npx tsc -b
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AppViews.tsx
git commit -m "feat: add view<->path route helpers (mavericks-d9p)"
```

---

### Task 3: Set up the no-auth e2e harness and write the failing routing test

**Files:**
- Create: `.env.test`
- Modify: `playwright.config.ts`
- Create: `e2e/routing.spec.ts`

- [ ] **Step 1: Add `.env.test` to force the no-auth static path**

Create `.env.test` with exactly:
```
# Test mode: blank the auth keys so authEnabled=false -> StaticContent path
# (ungated, static members/dinners). Lets e2e reach /dinners without sign-in.
VITE_CLERK_PUBLISHABLE_KEY=
VITE_NEON_API_URL=
```

- [ ] **Step 2: Add a second dev server + routing project to Playwright**

Replace the entire contents of `playwright.config.ts` with:
```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:5173/ai-mavericks/',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /routing\.spec\.ts/,
    },
    {
      name: 'routing',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:5174/ai-mavericks/',
      },
      testMatch: /routing\.spec\.ts/,
    },
  ],

  webServer: [
    {
      command: 'npm run dev',
      url: 'http://localhost:5173/ai-mavericks/',
      reuseExistingServer: !process.env.CI,
    },
    {
      // --mode test loads .env.test (blank auth keys) -> ungated static path.
      command: 'npm run dev -- --mode test --port 5174',
      url: 'http://localhost:5174/ai-mavericks/',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
```

- [ ] **Step 3: Write the routing e2e**

Create `e2e/routing.spec.ts` with:
```ts
import { test, expect } from '@playwright/test';

// Runs against the no-auth server (port 5174 / .env.test): authEnabled=false,
// so /dinners is ungated and served from static content.

test('dinners list renders at /dinners', async ({ page }) => {
  await page.goto('./dinners');
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('heading', { name: 'AI Mavericks Dinners' })).toBeVisible();
});

test('clicking a dinner navigates to /dinners/:slug and renders the detail', async ({ page }) => {
  await page.goto('./dinners');
  await page.waitForLoadState('networkidle');

  // DinnerCard is an <article role="button"> in the grid.
  await page.locator('article[role="button"]').first().click();

  await expect(page).toHaveURL(/\/dinners\/[^/]+$/);
  // The bug: detail used DEV-only static lookup and showed this text.
  await expect(page.getByText('Dinner not found')).toHaveCount(0);
  // A real detail page shows the "All Dinners" back control.
  await expect(page.getByRole('button', { name: /All Dinners/ })).toBeVisible();
});

test('deep link / refresh on a detail URL renders that dinner', async ({ page }) => {
  await page.goto('./dinners');
  await page.waitForLoadState('networkidle');
  await page.locator('article[role="button"]').first().click();
  await expect(page).toHaveURL(/\/dinners\/[^/]+$/);

  await page.reload();
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('Dinner not found')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /All Dinners/ })).toBeVisible();
});

test('browser back returns from detail to the list', async ({ page }) => {
  await page.goto('./dinners');
  await page.waitForLoadState('networkidle');
  await page.locator('article[role="button"]').first().click();
  await expect(page).toHaveURL(/\/dinners\/[^/]+$/);

  await page.goBack();
  await expect(page).toHaveURL(/\/dinners$/);
  await expect(page.getByRole('heading', { name: 'AI Mavericks Dinners' })).toBeVisible();
});

test('unknown route redirects to home', async ({ page }) => {
  await page.goto('./nope');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/\/ai-mavericks\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'AI Mavericks' })).toBeVisible();
});
```

- [ ] **Step 4: Run the routing tests — verify they FAIL**

Run:
```bash
npx playwright test --project=routing --reporter=line
```
Expected: FAIL. With no router yet, `goto('./dinners')` shows the home view, so "AI Mavericks Dinners" is not visible and the URL/detail assertions fail.

- [ ] **Step 5: Commit the harness + red test**

```bash
git add .env.test playwright.config.ts e2e/routing.spec.ts
git commit -m "test: failing e2e for dinner URL routing (mavericks-d9p)"
```

---

### Task 4: Implement routing (make the test pass) + fix DinnerDetail

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/AppViews.tsx`
- Modify: `src/StaticContent.tsx`
- Modify: `src/components/DinnerDetail/DinnerDetail.tsx`

- [ ] **Step 1: Fix DinnerDetail to resolve from props**

Replace the entire contents of `src/components/DinnerDetail/DinnerDetail.tsx` with:
```tsx
import type { Dinner, Member } from '../../types';
import { MemberCard } from '../MemberCard/MemberCard';
import styles from './DinnerDetail.module.css';

interface Props {
  dinnerSlug: string;
  dinners: Dinner[];
  members: Member[];
  onBack: () => void;
}

export function DinnerDetail({ dinnerSlug, dinners, members, onBack }: Props) {
  const dinner = dinners.find((d) => d.slug === dinnerSlug);

  if (!dinner) {
    return (
      <div className={styles.notFound}>
        <p>Dinner not found.</p>
        <button className={styles.backBtn} onClick={onBack}>
          ← Back to Dinners
        </button>
      </div>
    );
  }

  const attendeeMembers = dinner.attendees
    .map((slug) => members.find((m) => m.slug === slug))
    .filter(Boolean);

  const formattedDate = new Date(dinner.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className={styles.detail}>
      <div className={styles.hero}>
        {dinner.groupPhoto && (
          <img
            src={dinner.groupPhoto}
            alt={dinner.name}
            className={styles.heroImage}
          />
        )}
        <div className={styles.heroOverlay}>
          <button className={styles.backBtn} onClick={onBack}>
            ← All Dinners
          </button>
          <span className={styles.datevenue}>
            {formattedDate}{dinner.venue ? ` · ${dinner.venue}` : ''}
          </span>
          <h1 className={styles.title}>{dinner.name}</h1>
        </div>
      </div>

      <div className={styles.content}>
        {dinner.description && (
          <p className={styles.description}>{dinner.description}</p>
        )}

        {dinner.topics.length > 0 && (
          <div className={styles.topics}>
            <span className={styles.topicsLabel}>Topics Discussed</span>
            <div className={styles.topicsList}>
              {dinner.topics.map((topic, i) => (
                <div key={i} className={styles.topic}>
                  <span className={styles.topicText}>{topic.text}</span>
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
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.externalLinks}>
          {dinner.beehiivUrl && (
            <a href={dinner.beehiivUrl} target="_blank" rel="noopener noreferrer" className={styles.outlineBtn}>
              Full Recap
            </a>
          )}
          {dinner.discordUrl && (
            <a href={dinner.discordUrl} target="_blank" rel="noopener noreferrer" className={styles.ghostBtn}>
              Discord
            </a>
          )}
        </div>
      </div>

      <div className={styles.attendees}>
        <span className={styles.attendeesLabel}>
          {attendeeMembers.length} Attendees
        </span>
        <div className={styles.attendeesGrid}>
          {attendeeMembers.map((member) => (
            <MemberCard key={member!.slug} member={member!} />
          ))}
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Convert AppViews to a Routes component**

In `src/components/AppViews.tsx`: update the imports at the top — replace the
`import { Show } from '@clerk/react';` line and add router + DinnerDetail-prop needs.
The import block should read:
```tsx
import { Show } from '@clerk/react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import styles from '../App.module.css';
import { DinnersPage } from './DinnersPage/DinnersPage';
import { DinnerDetail } from './DinnerDetail/DinnerDetail';
import { StyleGuide } from './StyleGuide/StyleGuide';
import { LandingHero } from './LandingHero/LandingHero';
import { LandingIntro } from './LandingIntro/LandingIntro';
import { ObjectionSection } from './ObjectionSection/ObjectionSection';
import { MemberHome } from './MemberHome/MemberHome';
import { MemberList } from './MemberList/MemberList';
import { GatePrompt } from './Auth/GatePrompt';
import { useFilterState } from '../hooks/useFilterState';
import type { Member } from '../types';
import type { Dinner } from '../types';
```

Then replace the `ContentProps` / `ViewsProps` interfaces and the entire
`AppViews` function (everything from `export interface ContentProps {` to the end
of the file) with:
```tsx
export interface ContentProps {
  heroSentinelRef: React.RefObject<HTMLDivElement | null>;
}

export interface ViewsProps extends ContentProps {
  members: Member[];
  dinners: Dinner[];
  membersLoading: boolean;
  dinnersLoading: boolean;
  gated: boolean;
  firstName?: string;
}

// Wrap an element in Clerk gating when `gated`: signed-in sees it, signed-out
// gets the GatePrompt. When not gated (no auth configured), render as-is.
function gate(gated: boolean, element: React.ReactNode): React.ReactNode {
  if (!gated) return element;
  return (
    <>
      <Show when="signed-in">{element}</Show>
      <Show when="signed-out"><GatePrompt /></Show>
    </>
  );
}

export function AppViews({
  members, dinners,
  membersLoading, dinnersLoading,
  gated,
  firstName,
  heroSentinelRef,
}: ViewsProps) {
  const navigate = useNavigate();
  const { filters, toggleFilter, clearFilters, hasActiveFilters, filterMembers } = useFilterState();
  const filteredMembers = filterMembers(members);

  const goToView = (view: View) => navigate(viewToPath(view));
  const goToDinner = (slug: string) => navigate(`/dinners/${slug}`);

  const publicLanding = (
    <>
      <LandingHero
        latestDinner={dinners[0]}
        onViewChange={goToView}
        navLocked={gated}
      />
      <div ref={heroSentinelRef} style={{ height: 0 }} />
      <LandingIntro />
      <ObjectionSection />
    </>
  );

  const home = gated ? (
    <>
      <Show when="signed-in">
        <MemberHome
          dinners={dinnersLoading ? [] : dinners}
          memberCount={membersLoading ? undefined : members.length}
          firstName={firstName}
          onViewChange={goToView}
          onSelectDinner={goToDinner}
        />
      </Show>
      <Show when="signed-out">{publicLanding}</Show>
    </>
  ) : publicLanding;

  const people = (
    <section className={styles.section}>
      <MemberList members={filteredMembers} filters={filters} toggleFilter={toggleFilter} clearFilters={clearFilters} hasActiveFilters={hasActiveFilters} />
    </section>
  );

  const dinnersList = (
    <section className={styles.section}>
      <DinnersPage dinners={dinnersLoading ? [] : dinners} onSelectDinner={goToDinner} />
    </section>
  );

  return (
    <Routes>
      <Route path="/" element={home} />
      <Route path="/people" element={gate(gated, people)} />
      <Route path="/dinners" element={gate(gated, dinnersList)} />
      <Route
        path="/dinners/:slug"
        element={
          <DinnerDetailRoute
            dinners={dinnersLoading ? [] : dinners}
            members={members}
            gated={gated}
            onBack={() => navigate('/dinners')}
          />
        }
      />
      {import.meta.env.DEV && <Route path="/styleguide" element={<StyleGuide />} />}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function DinnerDetailRoute({
  dinners, members, gated, onBack,
}: {
  dinners: Dinner[];
  members: Member[];
  gated: boolean;
  onBack: () => void;
}) {
  const { slug } = useParams();
  const detail = (
    <section className={styles.section}>
      <DinnerDetail dinnerSlug={slug ?? ''} dinners={dinners} members={members} onBack={onBack} />
    </section>
  );
  return <>{gate(gated, detail)}</>;
}
```

Note: keep the existing `export type View` and the `viewToPath`/`pathToView`
helpers (added in Task 2) at the top of the file — do not remove them.

- [ ] **Step 3: Update StaticContent to the new ContentProps**

Replace the entire contents of `src/StaticContent.tsx` with:
```tsx
// DEV-ONLY module — imported only via a DEV-gated lazy() in App.tsx.
// Because App.tsx wraps this import in `import.meta.env.DEV ? lazy(...) : null`,
// Vite's production build dead-code-eliminates this entire module (and
// transitively the data/members + data/dinners static glob imports) from the
// production bundle.

import { members as staticMembers } from './data/members';
import { dinners as staticDinners } from './data/dinners';
import { AppViews } from './components/AppViews';
import type { ContentProps } from './components/AppViews';

export default function StaticContent({ heroSentinelRef }: ContentProps) {
  return (
    <AppViews
      heroSentinelRef={heroSentinelRef}
      members={staticMembers} dinners={staticDinners}
      membersLoading={false} dinnersLoading={false}
      gated={false}
    />
  );
}
```

- [ ] **Step 4: Rewire App.tsx to the router**

Replace the entire contents of `src/App.tsx` with:
```tsx
import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/react';
import styles from './App.module.css';
import { Nav } from './components/Nav/Nav';
import { Footer } from './components/Footer/Footer';
import { AppViews, viewToPath, pathToView } from './components/AppViews';
import { useClaimProfile } from './hooks/useClaimProfile';
import { useMembers } from './hooks/useMembers';
import { useDinners } from './hooks/useDinners';
import { authEnabled } from './lib/authConfig';
import type { ContentProps, View } from './components/AppViews';

// Re-exported so existing consumers (Nav, LandingHero) can keep importing from './App'.
export type { View } from './components/AppViews';

// DEV-only lazy fallback — Vite replaces import.meta.env.DEV with `false` in
// production builds, so this dynamic import is dead-code-eliminated and the
// static member/dinner JSON files are never bundled into the production JS.
const StaticContent = import.meta.env.DEV
  ? lazy(() => import('./StaticContent'))
  : null;

// ── Authenticated inner app (Clerk + Neon hooks) ─────────────────────────────
// Only rendered when authEnabled=true, so useAuth() calls are always inside
// a real ClerkProvider context.

function AuthContent({ heroSentinelRef }: ContentProps) {
  useClaimProfile();
  const { user } = useUser();
  const { members, loading: membersLoading } = useMembers();
  const { dinners, loading: dinnersLoading } = useDinners();
  return <AppViews
    heroSentinelRef={heroSentinelRef}
    members={members} dinners={dinners}
    membersLoading={membersLoading} dinnersLoading={dinnersLoading}
    firstName={user?.firstName ?? undefined}
    gated
  />;
}

// Reports Clerk signed-in state up to the shell so the global Nav can stay
// visible on the signed-in home view (which shows MemberHome, not the hero).
// Only rendered when authEnabled, so useAuth() is always inside ClerkProvider.
function SignedInReporter({ onChange }: { onChange: (v: boolean) => void }) {
  const { isSignedIn } = useAuth();
  useEffect(() => {
    onChange(Boolean(isSignedIn));
  }, [isSignedIn, onChange]);
  return null;
}

// ── App shell (routing, scroll tracking) ─────────────────────────────────────

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const view: View = pathToView(location.pathname);
  const [heroVisible, setHeroVisible] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const heroSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view !== 'home') {
      setHeroVisible(true);
      return;
    }
    const update = () => {
      const sentinel = heroSentinelRef.current;
      if (!sentinel) return;
      setHeroVisible(sentinel.getBoundingClientRect().top > 64);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [view]);

  const navHidden = view === 'home' && heroVisible && !signedIn;
  // Gated views (People/Dinners) are unreachable when auth is on but signed-out.
  const navLocked = authEnabled && !signedIn;
  const contentProps: ContentProps = { heroSentinelRef };

  return (
    <>
      {authEnabled && <SignedInReporter onChange={setSignedIn} />}
      <Nav
        currentView={view}
        onViewChange={(v: View) => navigate(viewToPath(v))}
        hidden={navHidden}
        locked={navLocked}
      />
      <div className={styles.app}>
        <main>
          {authEnabled
            ? <AuthContent {...contentProps} />
            : StaticContent
              ? <Suspense fallback={null}><StaticContent {...contentProps} /></Suspense>
              : null}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
```

- [ ] **Step 5: Verify it compiles**

Run:
```bash
npx tsc -b
```
Expected: no errors.

- [ ] **Step 6: Run the routing tests — verify they PASS**

Run:
```bash
npx playwright test --project=routing --reporter=line
```
Expected: 5 passed.

- [ ] **Step 7: Run the existing landing tests — verify no regression**

Run:
```bash
npx playwright test --project=chromium --reporter=line
```
Expected: 2 passed. If the landing screenshot differs, re-run with
`--project=chromium --update-snapshots` and inspect the diff (should be none for
the public landing, since its behavior is unchanged).

- [ ] **Step 8: Commit**

```bash
git add src/App.tsx src/components/AppViews.tsx src/StaticContent.tsx src/components/DinnerDetail/DinnerDetail.tsx
git commit -m "feat: URL routing for all views + fix DinnerDetail to use live data (mavericks-d9p)"
```

---

### Task 5: Verify both build modes, deploy, and close out

**Files:** none (verification + deploy)

- [ ] **Step 1: Lint the changed files (no new errors)**

Run:
```bash
npx eslint src/App.tsx src/components/AppViews.tsx src/StaticContent.tsx src/components/DinnerDetail/DinnerDetail.tsx src/main.tsx
```
Expected: no errors in these files. (The pre-existing `react-hooks/set-state-in-effect`
warning lives in `App.tsx`'s scroll effect, carried over unchanged — if eslint flags
only that line, it is not a regression.)

- [ ] **Step 2: Verify both build modes compile and base paths are correct**

Run:
```bash
CF_PAGES=1 npx vite build --outDir /tmp/cf-route >/dev/null && grep -oE 'src="[^"]*assets/index[^"]*"' /tmp/cf-route/index.html
npx vite build --outDir /tmp/gh-route >/dev/null && grep -oE 'src="[^"]*assets/index[^"]*"' /tmp/gh-route/index.html
```
Expected: CF build → `src="/assets/index-...js"`; GH build → `src="/ai-mavericks/assets/index-...js"`.

- [ ] **Step 3: Deploy to Cloudflare Pages (production host)**

Run:
```bash
CF_PAGES=1 npm run build
npx wrangler pages deploy dist --project-name=ai-mavericks --branch=main --commit-dirty=true
```
Expected: "Deployment complete" with a `*.ai-mavericks.pages.dev` URL. Production
alias: https://ai-mavericks.pages.dev

- [ ] **Step 4: Verify the live site routes correctly**

Run:
```bash
curl -sS -o /dev/null -w "/dinners deep link: HTTP %{http_code}\n" -L https://ai-mavericks.pages.dev/dinners
```
Expected: HTTP 200 (CF `_redirects` serves the SPA for the deep link).

Then load https://ai-mavericks.pages.dev/dinners in a browser (signed in if auth is
on) and confirm a dinner detail opens at `/dinners/:slug` with no "Dinner not found".

- [ ] **Step 5: Push to GitHub (triggers the GH Pages deploy too) and close the bead**

```bash
git pull --rebase
git push
gh run watch "$(gh run list -R foogunlana/ai-mavericks --workflow=deploy.yml --limit 1 --json databaseId -q '.[0].databaseId')" -R foogunlana/ai-mavericks --exit-status
bd close mavericks-d9p
```
Expected: GH Pages deploy succeeds; bead closed.

---

## Self-review notes

- **Spec coverage:** routes for all views (Task 4 §2), `:slug` detail + bug fix (Task 4 §1–2), back/forward + deep link/refresh + unknown→/ (Task 3 e2e), per-host base path (Task 1 basename; Task 5 §2 verifies both), gating preserved (`gate()` helper), scroll-reveal nav preserved (App.tsx effect unchanged, view from location). GH Pages 404 gap intentionally deferred (spec "Out of scope").
- **Leaf components unchanged:** `Nav`, `LandingHero`, `MemberHome`, `DinnersPage`, `DinnerCard` keep their callback props; shell maps callbacks to `navigate()`.
- **Type consistency:** `viewToPath`/`pathToView` defined in Task 2 and imported in Task 4 §4; `View` stays exported from AppViews and re-exported from App; `DinnerDetail` Props (`dinnerSlug`, `dinners`, `members`, `onBack`) match the `DinnerDetailRoute` call site.
