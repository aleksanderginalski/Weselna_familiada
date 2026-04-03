# Task Instruction Template — [US-XXX]

## Context

[What this US implements and why. Include issue number.]

## Read

[List files that /dev must read before starting implementation.]

## Tasks

1. [First task — specific and actionable]
2. [Second task]
3. [Continue as needed]

## Constraints

- Follow CLAUDE.md standards (no `any`, max 300 lines per file, max 50 lines per function)
- No class components — functional only
- No direct Zustand state mutation — use set()
- Run `npm run lint` after implementation
- Run `npm test` after implementation

## After implementation

- `npm run lint` — must pass with zero warnings
- `npm test` — must pass, report test count delta
- Manual verification steps (in Polish):
  1. [Krok 1]
  2. [Krok 2]

## Gitignore Check

For every new file or directory created:

- Temporary files (current_task.md, *.log) → add to .gitignore
- API keys / credentials → always gitignored
- Build output (dist/) → already gitignored
