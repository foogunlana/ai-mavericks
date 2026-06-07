---
name: styleguide-first-feature
description: >-
  Workflow for implementing any new feature, component, or visual/UI change on
  the AI Mavericks website. Prototype every design in the StyleGuide first,
  compare options, and only apply to the live site once approved — with the
  build-out delegated to a subagent. Use when the user asks to build, add,
  redesign, or change a component, page, or UI element (e.g. "let's work on
  <bead-id>", "redesign the hero", "build a member card", "add a filter",
  "brainstorm <feature>"). Do NOT use for pure bug fixes, copy-only edits, or
  backend/data work with no visual surface.
---

# Styleguide-First Feature Workflow

Four phases, in order. Do not skip ahead — the value is in exploring cheaply in
the StyleGuide before committing to the live site.

## 1. Honor the project's stack and conventions

Before anything, anchor on what already exists. Do NOT introduce new libraries,
frameworks, or styling systems.

- **Stack**: TypeScript + React + **TailwindCSS** (v4). ALWAYS style with
  Tailwind utility classes — NOT CSS Modules (`*.module.css`) and NOT inline
  style objects. The project is migrating off CSS Modules; new/changed components
  use Tailwind. (Older components still have `.module.css` — convert to Tailwind
  when you touch them.)
- **Design tokens** live in `src/tailwind.css` under `@theme` and are exposed as
  Tailwind theme values: colors (`bg-background`, `text-text`, `text-secondary`,
  `text-muted`, `border-border-light`, `bg-surface`), `font-sans`, `rounded-sm`,
  and the `--content-max` page width (`max-w-[var(--content-max)]`). The custom
  `--space-*` scale (in `src/tailwind.css`) only runs `--space-1` through
  `--space-15` and is NOT the standard Tailwind scale — the values are
  hand-picked: `space-5`=20px, `space-6`=24px, `space-7`=32px, `space-8`=40px,
  `space-9`=48px, `space-10`=56px, `space-11`=64px, `space-12`=80px,
  `space-13`=96px, `space-14`=120px, `space-15`=160px. So `gap-12` is **80px**
  (not 48px), and **any spacing number above 15 — e.g. `p-16`, `py-20` — is
  UNDEFINED and silently produces ZERO spacing**. Always check the scale before
  using a number; the max is 15 (160px). For the perfect-fourth
  font sizes use arbitrary length values referencing the var, e.g.
  `text-[length:var(--font-size-sm)]`. Global keyframes/animations go in
  `src/theme.css`; reference them with `animate-[name_60s_linear_infinite]`.
- **Page width**: top-level page content lives in `.app`
  (`max-w-[var(--content-max)] mx-auto px-5`). Full-bleed sections (e.g. the
  landing hero) must wrap their inner content in the same
  `max-w-[var(--content-max)] mx-auto px-5` so their left/right edges align with
  the rest of the page.
- **Match surrounding code**: naming, file layout (`ComponentName/ComponentName.tsx`
  + `.module.css`), comment density, and existing patterns.
- **Task tracking**: use `bd` (beads), never TodoWrite or markdown TODOs. Claim
  the relevant bead (`bd update <id> --claim`) before building. Run `bd prime`
  if unsure of workflow.

## 2. Brainstorm before building

Invoke the **`beadpowers:brainstorming`** skill (or `superpowers:brainstorming`)
and refine the idea collaboratively before writing any component code.

- Read the bead (`bd show <id>`) and current code first.
- Ask **one question at a time**; prefer multiple-choice.
- Lead with a recommended option and the reasoning.
- Settle scope: what's fixed vs. open for exploration.

## 3. Prototype in the StyleGuide first — NOT the live site

All exploration happens in `src/components/StyleGuide/StyleGuide.tsx`. Leave the
live components untouched during this phase.

- Add (or extend) a section: a new `SectionId`, a `SECTION_LABELS` entry, and a
  section block. Render variants as **2–6 options side by side** (or stacked for
  full-width components), each in a bordered panel with an `<OptionHeader>` label
  (`A — …`, `B — …`).
- Use **real content** (real dinner names, member names, companies, photos from
  `public/images/...`), never lorem ipsum.
- Show **one component/section at a time** so the user can focus and pick a letter.
- The user compares (often by screenshotting) and picks. Iterate on the chosen
  direction in the StyleGuide. **Keep rejected options until they confirm**, then
  clean up only if asked — by default the approved options stay in the StyleGuide
  as living reference.

The dev server (`npm run dev`) hot-reloads; the StyleGuide is reachable from the
in-app Nav. Typecheck with `npx tsc --noEmit -p tsconfig.app.json`.

**Do NOT use Playwright or any browser automation.** The user keeps their own dev
server running and reviews changes in their own browser, sharing screenshots when
something needs a look. Verify your work with `npx tsc --noEmit` and by reading
the code/design tokens — then rely on the user's screenshots for visual
confirmation. Don't launch a browser, navigate, or screenshot yourself.

## 4. On approval, implement on the live site via a subagent

Once the user approves a specific option for the live site, delegate the
build-out to a **subagent** so the main conversation's context stays clean and
isolated. Use the **Sonnet** model for the implementation subagent.

Give the subagent a self-contained spec:

- Exact file(s) to create/replace (e.g. `src/components/Foo/Foo.tsx` + `.module.css`).
- The full target content or a precise description, including which design tokens
  to use and how to wire real data (imports from `src/data/...`).
- Explicit "do not touch any other files" boundary.
- A verification command to run until clean:
  `cd /Users/folusoogunlana/code/oss/mavericks && npx tsc --noEmit -p tsconfig.app.json`
- Ask it to report files written, final typecheck result, and any deviations.

Keep brainstorming and design decisions in the main thread; only the mechanical
build-out is delegated. After the subagent returns, verify the result with a
typecheck and a code read, then ask the user to confirm it renders in their
browser — do NOT drive a browser yourself (see the Playwright note above).

## Session close

Follow the project's mandatory close protocol (see `CLAUDE.md`): run quality
gates, update beads, then `git pull --rebase && bd dolt push && git push`. Work
is not complete until pushed.
