# Sync conventions & fix recipes

Exact commands and templates for applying sync fixes. Read this before mutating GitHub.

## Issue body template

Every mirrored issue body follows this shape. Lead sections describe the work; the
final `## Bead` section is the machine-readable back-reference the sync script matches on.

```markdown
## Background
<why this exists — pull from the bead description>

## Scope
<what needs to happen — bullets>

## Acceptance criteria
- [ ] <checkbox items, copied from the bead's acceptance criteria if present>

## Bead

Tracked as `mavericks-xxx`
```

Keep the issue title identical to the bead title. Pull body content from `bd show <id>`
(description, acceptance criteria, design notes) rather than inventing it.

## Fix: create a missing issue

Write the body to a temp file (avoids shell-quoting issues with backticks/markdown), then:

```bash
gh issue create \
  --title "<exact bead title>" \
  --body-file /tmp/issue-body.md
```

## Fix: repair a bead reference (stale `mavericks-TBD`, wrong id, or missing `## Bead`)

**Gotcha:** bead ids contain backticks in the body (`` `mavericks-xxx` ``). Bash
parameter-expansion substitution (`${body//.../...}`) mangles backticks and silently
fails. Use a file + `perl` instead — it is reliable:

```bash
# 1. Dump the current body to a file
gh issue view <N> --json body -q .body > /tmp/i<N>.md

# 2. Replace the placeholder/wrong ref with the correct bead id
perl -0pi -e 's/mavericks-TBD` \(will update once bead is created\)/mavericks-srz`/' /tmp/i<N>.md
#   ...or for a bare placeholder:
perl -0pi -e 's/mavericks-TBD/mavericks-fdj/g' /tmp/i<N>.md
#   ...or to append a missing back-reference, edit the file to add the `## Bead` block.

# 3. Push the edited body back
gh issue edit <N> --body-file /tmp/i<N>.md

# 4. Verify
gh issue view <N> --json body -q .body | tail -3
```

## Fix: issue points at a closed bead

The bead's work is done. Confirm with the user, then close the issue with a reason:

```bash
gh issue close <N> --reason completed --comment "Bead mavericks-xxx closed."
```

If instead the link is wrong (the issue is still live work), re-point the `## Bead`
ref to the correct bead using the perl recipe above.

## Fix: a bead mirrored by multiple issues

Keep the canonical issue (usually the lowest number / most complete body) and close the
duplicates with `gh issue close <N> --reason duplicate`.

## Always verify

After any batch of fixes, re-run the detector and confirm a clean result:

```bash
python3 .claude/skills/mavericks-tickets/scripts/sync_check.py
```
