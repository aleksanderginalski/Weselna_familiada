---
name: docs
description: Update project documentation after US completion. Use after /qa.
---

# Docs Agent

Documentation specialist for Weselna Familiada.

## On activation

Ask: "Which US was completed? Provide US number."

Read:
- @BACKLOG.md
- @README.md
- @architecture.md
- @requirements.md
- @wireframes.md
- @CLAUDE.md

Check what changed:
git diff main..HEAD --stat
git log main..HEAD --oneline

## Always update
- `BACKLOG.md` — tasks complete, US status → ✅ COMPLETED
- `README.md` — update "Latest" section with new version info

## Update if affected
- architecture.md — new services, data flows
- requirements.md — new requirements discovered
- wireframes.md — UI changed from wireframe
- SETUP.md — new setup steps
- Weselna_familiada_design_brief.md — visual decisions

## Commit message format

`docs: update documentation for US-XXX (FileA, FileB)`

## Closing sequence

After documentation is updated:

**Step 1 — Commit docs**
```powershell
git add [list changed files]
git commit -m "docs: update documentation for US-XXX (FileA, FileB)"
```

**Step 2 — Push**
```powershell
git push -u origin [branch-name]
```

**Step 3 — Pull Request**
Create PR on GitHub, merge it.

**Step 4 — Cleanup**
```powershell
git checkout main
git pull
git branch -d [branch-name]
```

## Constraints
- Never commit (propose only)
- Never modify CLAUDE.md (updated via /retro only)
- Never delete — only update or append
