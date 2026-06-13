#!/usr/bin/env python3
"""Read-only drift detector for Mavericks beads <-> GitHub issues.

Compares open beads against GitHub issues and reports what is out of sync.
Makes NO mutations: prints a human-readable report plus a machine-readable
JSON block the calling agent uses to decide which fixes to apply (after
confirming with the user).

Convention enforced (see SKILL.md):
  - Each GitHub issue mirrors exactly one ACTIVE roadmap bead.
  - "Active" = any non-closed status (open, in_progress, blocked).
  - The issue body ends with:  ## Bead\n\nTracked as `mavericks-xxx`
  - Only ACTIVE beads are mirrored. CLOSED beads are intentionally NOT mirrored.
  - Only TOP-LEVEL beads are mirrored. Subtask beads (dotted child ids like
    "mavericks-j4v.1") are intentionally NOT mirrored — they live under an epic
    that already has its own issue, so they never count toward missing-issue drift.
"""
import json
import re
import subprocess
import sys

BEAD_RE = re.compile(r"mavericks-[a-z0-9]{3,}")
TBD_RE = re.compile(r"mavericks-TBD")


def run(cmd):
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        sys.stderr.write(f"command failed: {' '.join(cmd)}\n{res.stderr}\n")
        sys.exit(1)
    return res.stdout


def bead_ref_in_body(body):
    """Return (ref, is_tbd). ref is the last mavericks-xxx token, or None."""
    if TBD_RE.search(body):
        return None, True
    refs = BEAD_RE.findall(body)
    return (refs[-1] if refs else None), False


def main():
    # Active beads (any non-closed status) are the mirror set. Claiming a bead
    # flips it open -> in_progress, so we must include in_progress/blocked too.
    active_beads = []
    for status in ("open", "in_progress", "blocked"):
        active_beads += json.loads(run(["bd", "list", f"--status={status}", "--json"]))
    closed_beads = json.loads(run(["bd", "list", "--status=closed", "--json"]))
    issues = json.loads(
        run(["gh", "issue", "list", "--state", "open", "--limit", "200",
             "--json", "number,title,body,state"])
    )

    active_by_id = {b["id"]: b for b in active_beads}
    closed_ids = {b["id"] for b in closed_beads}

    # Map active beads -> set of issue numbers that reference them.
    bead_to_issues = {bid: [] for bid in active_by_id}
    issues_tbd = []        # issues with mavericks-TBD placeholder
    issues_no_ref = []     # open issues with no bead reference at all
    issues_closed_ref = [] # open issues pointing at a closed bead
    issues_unknown_ref = []# open issues pointing at a non-existent bead

    for iss in issues:
        ref, is_tbd = bead_ref_in_body(iss.get("body") or "")
        entry = {"number": iss["number"], "title": iss["title"], "ref": ref}
        if is_tbd:
            issues_tbd.append(entry)
        elif ref is None:
            issues_no_ref.append(entry)
        elif ref in active_by_id:
            bead_to_issues[ref].append(iss["number"])
        elif ref in closed_ids:
            issues_closed_ref.append(entry)
        else:
            issues_unknown_ref.append(entry)

    # Subtask beads (dotted child ids like "mavericks-j4v.1") are NOT mirrored to
    # GitHub — only their parent epic carries an issue. Exclude them from
    # missing-issue drift so the detector stays quiet about queued subtasks. They
    # remain in active_by_id so an issue that *does* reference one still resolves.
    beads_missing_issue = [
        {"id": bid, "title": b["title"], "type": b.get("issue_type"),
         "priority": b.get("priority")}
        for bid, b in active_by_id.items()
        if not bead_to_issues[bid] and "." not in bid
    ]
    beads_multi_issue = [
        {"id": bid, "issues": nums}
        for bid, nums in bead_to_issues.items() if len(nums) > 1
    ]

    report = {
        "active_beads": len(active_beads),
        "open_issues": len(issues),
        "in_sync": len(active_beads) > 0
        and not beads_missing_issue and not issues_tbd
        and not issues_no_ref and not issues_closed_ref
        and not issues_unknown_ref and not beads_multi_issue,
        "beads_missing_issue": beads_missing_issue,
        "issues_tbd": issues_tbd,
        "issues_no_ref": issues_no_ref,
        "issues_closed_ref": issues_closed_ref,
        "issues_unknown_ref": issues_unknown_ref,
        "beads_multi_issue": beads_multi_issue,
    }

    # Human-readable summary.
    print(f"Active beads: {report['active_beads']}  |  Open GitHub issues: {report['open_issues']}")
    print("Status:", "IN SYNC ✅" if report["in_sync"] else "DRIFT DETECTED ⚠️")
    print()

    def section(title, rows, fmt):
        if rows:
            print(f"{title} ({len(rows)}):")
            for r in rows:
                print("  - " + fmt(r))
            print()

    section("Beads with NO GitHub issue (create issue)", beads_missing_issue,
            lambda r: f"{r['id']} [{r['type']}/P{r['priority']}] {r['title']}")
    section("Issues with stale mavericks-TBD (fix ref)", issues_tbd,
            lambda r: f"#{r['number']} {r['title']}")
    section("Issues with NO bead ref (add ref)", issues_no_ref,
            lambda r: f"#{r['number']} {r['title']}")
    section("Issues pointing at a CLOSED bead (close or re-point issue)", issues_closed_ref,
            lambda r: f"#{r['number']} -> {r['ref']}  {r['title']}")
    section("Issues pointing at an UNKNOWN bead (investigate)", issues_unknown_ref,
            lambda r: f"#{r['number']} -> {r['ref']}  {r['title']}")
    section("Beads mirrored by MULTIPLE issues (dedupe)", beads_multi_issue,
            lambda r: f"{r['id']} -> issues {r['issues']}")

    print("---DRIFT-JSON---")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
