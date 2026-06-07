---
name: mavericks-tickets
description: Keep the Mavericks website's beads (local issue tracker) and GitHub issues in sync, then recommend what to work on next. Use when the user asks to sync tickets/issues/beads, reconcile beads with GitHub, check the ticket backlog, decide what to work on next, pick the next ticket, or plan the next few items. Triggers on "sync the beads/issues", "are the tickets in sync", "what should we work on", "what's next", "next ticket".
---

# Mavericks Tickets

Two jobs, run in order:

1. **Sync** — reconcile open beads with GitHub issues so each active bead has exactly one GitHub issue.
2. **Recommend** — figure out the next few tickets to work on, by inference, and confirm with the user.

The user may ask for just one (e.g. "are the tickets in sync?" or "what's next?"). Do only what's asked; default to running both when the intent is "get me set up to work."

## Setup conventions (non-obvious — read before acting)

- **Bead prefix:** `mavericks-` (e.g. `mavericks-bah`). GitHub repo is auto-detected via `gh` (currently `foogunlana/ai-mavericks`).
- **Mirror rule:** every **active** bead (status open / in_progress / blocked) gets exactly one GitHub issue. **Closed beads are intentionally NOT mirrored** — GitHub only tracks the live roadmap. Do not back-fill issues for closed beads.
- **Back-reference:** each GitHub issue body ends with a `## Bead` section: `` Tracked as `mavericks-xxx` ``. This is the only link between the two systems — match on it, not on titles.
- **Source of ordering truth:** the Release-checklist epic (`bd show mavericks-0vi`) lists the MVP steps in order. Its `notes` field records any work order the user has agreed to. Always read it before recommending.

## Job 1: Sync

### Step 1 — detect drift (read-only)

```bash
python3 .claude/skills/mavericks-tickets/scripts/sync_check.py
```

The script makes no changes. It prints a human report and a `---DRIFT-JSON---` block with these categories:

| Category | Meaning | Fix |
|---|---|---|
| `beads_missing_issue` | active bead with no GitHub issue | create an issue |
| `issues_tbd` | issue body still says `mavericks-TBD` | replace with the real bead id |
| `issues_no_ref` | open issue with no `## Bead` section | add the back-reference |
| `issues_closed_ref` | issue points at a closed bead | the bead's work is done — close the issue (or re-point if mis-linked) |
| `issues_unknown_ref` | issue points at a non-existent bead | investigate; likely a typo'd id |
| `beads_multi_issue` | one bead mirrored by 2+ issues | dedupe (close the extras) |

If `in_sync: true`, report that and move to Job 2. Otherwise present the drift to the user.

### Step 2 — apply fixes (mutating — confirm first)

GitHub writes are outward-facing. **Summarize the proposed fixes and get the user's go-ahead before applying** (unless they already said "just fix it"). Then apply per `references/sync-conventions.md`, which has the issue-body template and the exact, gotcha-free commands for creating issues and editing bodies.

### Step 3 — verify

Re-run `sync_check.py` and confirm `IN SYNC ✅` before reporting done.

## Job 2: Recommend next work

Goal: propose the next 1–3 tickets and let the user confirm or redirect. Gather, then reason, then ask.

1. **Gather context (parallel):**
   - `bd ready` — beads with no active blockers.
   - `bd show mavericks-0vi` — the release checklist + its `notes` (agreed work order).
   - `git log --oneline -8` — what's been touched recently (warm context counts).
2. **Rank** candidates by, in priority order:
   - **Agreed order** in the epic notes, if present — this overrides everything else.
   - **Release-checklist sequence** in `mavericks-0vi` (it's the P1 MVP spine).
   - **Priority** (P0 highest) and **dependencies** (don't recommend something gated by unfinished work).
   - **Readiness** — fully-specced beads beat ones with open design questions; epics usually need a brainstorm before code.
   - **Warm context** — items in files touched by recent commits are cheap to continue.
3. **Present** a short ranked recommendation with one-line rationale each, then use `AskUserQuestion` to let the user pick or redirect. Do not start implementation from this skill — once a ticket is chosen, hand off (claim it with `bd update <id> --claim` and proceed with the normal build flow, brainstorming first for unspecced/epic work).

## Notes

- `bd update <id> --claim` flips a bead from `open` to `in_progress`. That's expected and still counts as "active" — the sync script accounts for it.
- The user works through beads in agreed checkpoints; after finishing one, auto-pick the next per the ranking above rather than re-asking from scratch.
