# URL Routing + DinnerDetail Data Fix — Design

**Date:** 2026-06-13
**Bead:** mavericks-d9p (routing feature) · also fixes the "Dinner not found" bug
**Status:** Approved

## Problem

1. **No URLs.** The app switches views with `useState<View>` in `App.tsx`; nothing
   changes the address bar, so Home / People / Dinners / a specific dinner are not
   shareable, bookmarkable, or reachable on refresh.
2. **"Dinner not found" on every detail page.** `DinnerDetail` resolves the dinner
   via `getDinnerBySlug` (and attendees via `getMemberBySlug`) imported from
   `src/data/dinners.ts` / `src/data/members.ts`. Those modules are **DEV-only**
   (`export const dinners = import.meta.env.DEV ? [...] : []`), so in production the
   arrays are empty and the lookup always returns `undefined`. The Dinners *list*
   works because it receives live `useDinners()` data as a prop; the detail page
   ignores that and re-looks-up from the empty static source.

## Approach

Adopt **react-router-dom** with `BrowserRouter basename={import.meta.env.BASE_URL}`.
`basename` transparently absorbs the per-host base path (`/` on Cloudflare,
`/ai-mavericks/` on GitHub Pages). All views get real URLs. The DinnerDetail data
bug is fixed by resolving from the live data already available in `AppViews`.

## Routes

| Path | View | Notes |
|------|------|-------|
| `/` | Home | Landing hero (signed-out) / MemberHome (signed-in) |
| `/people` | People | Gated (`MemberList`) |
| `/dinners` | Dinners list | Gated (`DinnersPage`) |
| `/dinners/:slug` | Dinner detail | Gated; `:slug` is the dinner's `slug` field |
| `/styleguide` | StyleGuide | Registered only when `import.meta.env.DEV` |
| `*` | — | Redirect to `/` |

## Architecture

- **`main.tsx`** — wrap `<App/>` in `<BrowserRouter basename={import.meta.env.BASE_URL}>`.
- **`App.tsx`** — remove `view`/`selectedDinnerSlug` state. Derive the current view
  from `useLocation()` for the scroll-reveal nav logic (`navHidden` = on `/` + hero
  visible + signed-out). Keep `signedIn` tracking and `navLocked = authEnabled && !signedIn`.
  Renders the shell (`Nav`, `Footer`, scroll sentinel) + the routes.
- **`AppViews.tsx`** — becomes a `<Routes>` component. Each route renders the same
  components as today, with the same `<Show when="signed-in/out">` auth gating: a
  signed-out visitor on `/people` or `/dinners` (including a deep link) still gets
  `GatePrompt`. When auth is disabled (no Clerk), routes render the ungated
  StaticContent path unchanged.
- **`DinnerDetail.tsx`** — read `:slug` from `useParams()`. Accept `dinners` and
  `members` props and resolve the dinner + attendee members from those (live in auth
  mode, static in the no-auth StaticContent mode). **Remove** the
  `getDinnerBySlug` / `getMemberBySlug` static imports. "Back" navigates to `/dinners`.
- **`Nav.tsx` / `LandingHero.tsx`** — nav buttons and dinner-card clicks call
  `navigate()`; active state derived from `useLocation()`. People/Dinners remain
  disabled when signed-out (`locked` / `navLocked`).

## Data flow

`useDinners()` / `useMembers()` (in `AuthContent`) → passed into the routes →
into `DinnerDetail` as props. Detail resolves `dinners.find(d => d.slug === slug)`
and `attendees.map(slug => members.find(...))`. No component imports the DEV-only
static data modules for rendering anymore.

## Auth gating + deep links

Gating stays in the route elements via `<Show>`. Deep-linking to a gated route
while signed-out shows `GatePrompt` (not a crash). Signed-in resolves live data and
renders. Back/forward works via the browser history that react-router drives.

## SPA fallback

- **Cloudflare (primary):** `public/_redirects` (`/* /index.html 200`) already serves
  any path as the SPA with the URL intact — deep links and refresh work.
- **GitHub Pages:** `public/404.html` currently meta-refreshes unknown paths to `/`,
  losing the path — deep links bounce to home. **Deferred** (follow-up bead): fixable
  later with the standard spa-github-pages encode/decode trick, or moot if GH Pages is
  retired. Not addressed in this change.

## Testing

**Constraint:** the dinner detail page is gated. The current e2e dev server loads the
real `.env` (`authEnabled = true`), so a signed-out test session hits `GatePrompt` on
`/dinners` and can never reach a detail page — it cannot exercise the fix. The fix's
data resolution is identical whether the `dinners`/`members` props come from the live
hooks or the static StaticContent path, so we test it via the **no-auth static path**,
which is ungated and deterministic (no Neon dependency).

Plan:
- Add a committed **`.env.test`** that sets `VITE_CLERK_PUBLISHABLE_KEY=` and
  `VITE_NEON_API_URL=` to empty → `authEnabled = false` → StaticContent path (ungated,
  static dinners/members via the DEV glob).
- Add a **second Playwright `webServer`** running `vite --mode test --port 5174` and a
  **routing test project** (`baseURL: http://localhost:5174/ai-mavericks/`) targeting it.
  Keep the existing landing tests on the current auth-enabled server (port 5173).
- Routing spec assertions (no-auth server):
  - `/dinners` renders the list; clicking a dinner card → URL becomes `/dinners/<slug>`
    and the detail renders; assert **no "Dinner not found"** text (this is the bug fix).
  - Browser back returns to `/dinners`.
  - Direct load (deep link) of `/dinners/<slug>` renders that detail.
  - Unknown path (e.g. `/nope`) redirects to `/`.
- Gating coverage stays on the auth-enabled server: a signed-out deep load of `/people`
  shows `GatePrompt` (route resolves, gate renders — no crash).

## Out of scope

- GitHub Pages deep-link 404 handling (deferred follow-up).
- Any visual redesign of the pages.
- Member detail routing (`/people/:slug`) — separate bead (mavericks-dlm).

## Dependencies

- Add `react-router-dom` (~one dependency).
