# Multi-Agent Architecture — Weselna Familiada

**Version:** 1.0  
**Status:** Ready for implementation  
**Last Updated:** 2025-01-XX

---

## Overview

8 specialized Claude Code agents for the Weselna Familiada project.
All follow **Model 2.5**: autonomous within task scope, git always requires user approval.

---

## Principles

| Principle | Decision |
|---|---|
| Autonomy | Autonomous in code, git requires explicit user approval |
| Language — `/pm`, `/discover`, `/planning`, `/debug`, `/retro` | Polish |
| Language — `/dev`, `/qa`, `/docs` | English |
| Git commands | Never use `&&`. All commands one per line. |

---

## Two Operating Modes

### Strategic Mode (occasional)
Used when exploring new ideas, new Epics, or direction changes.

```
/discover → discussion → BACKLOG.md + architecture.md updated → commit
```

### Daily Mode (every US)
Used for implementing specific User Stories from backlog.

```
/pm → /planning → /dev → manual verify → /qa → /docs → [/retro]
                              ↓
                           /debug (on demand)
```

---

## System Map

```
┌─────────────────────────────────────────────────────────┐
│  STRATEGIC MODE                                         │
│  /discover  — New Epics, features, architectural ideas  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  DAILY MODE                                             │
│  /pm        — Session router, context explainer        │
│  /planning  — US verification + Task instruction       │
│  /dev       — Implementation (CLAUDE.md)               │
│  /qa        — Tests                                    │
│  /debug     — Problem solving (on demand)              │
│  /docs      — Documentation update                     │
│  /retro     — Retrospective (optional)                 │
└─────────────────────────────────────────────────────────┘
```

---

## Agent Directory

| Agent | File | Language | Purpose |
|---|---|---|---|
| /pm | .claude/agents/pm.md | Polish | Session router, git status check |
| /discover | .claude/agents/discover.md | Polish | Strategic sessions, new Epics |
| /planning | .claude/agents/planning.md | Polish | US verification + Task instruction |
| /dev | CLAUDE.md | English | Implementation |
| /qa | .claude/agents/qa.md | English | Tests |
| /debug | .claude/agents/debug.md | Polish | Problem solving |
| /docs | .claude/agents/docs.md | English | Documentation update |
| /retro | .claude/agents/retro.md | Polish | Retrospective |

---

## Workflow Reference

### Strategic session
```
/discover
→ Discussion in Polish
→ Consensus reached — you say "gotowe"
→ BACKLOG.md + architecture.md updated
→ Proposed commit: docs: add [Epic/Feature/US name]
```

### Daily US session
```
/pm "starting US-XXX, branch: feature/xxx"
→ Checks git status
→ Routes to /planning

/planning
→ Verifies US readiness
→ User Acceptance Scenario
→ Generates Task instruction for /dev

/dev [Task instruction]
→ Implements
→ Linter + tests
→ Manual Verification steps (in Polish)

[You test manually]
→ Problem? → /debug
→ OK? → /dev proposes commit → you commit → /dev says "Run /qa"

/qa
→ Generates/optimizes tests
→ Updates TEST_CASES.md
→ Proposed commit

/docs
→ Updates all project documentation
→ Proposed commit
→ Closing sequence (push, PR, merge, cleanup)

/retro  ← optional
→ Session analysis
→ Agent improvement proposals
```

---

## Directory Structure

```
Weselna_familiada/
├── .claude/
│   └── agents/
│       ├── pm.md
│       ├── discover.md
│       ├── planning.md
│       ├── qa.md
│       ├── debug.md
│       ├── docs.md
│       └── retro.md
├── CLAUDE.md              ← /dev instructions
├── BACKLOG.md
├── architecture.md
├── requirements.md
└── [other docs]
```

---

*This document is updated during /retro sessions when agent responsibilities change.*
