# Weselna Familiada — Claude Code Instructions

## Project Identity (Invariants)

- **App name:** Weselna Familiada
- **Package name:** weselna-familiada
- **Main entry file:** src/main.tsx
- **Repository:** https://github.com/AleksanderGinalworking/Weselna_familiada
- **GitHub Username:** AleksanderGinalworking

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Bundler:** Vite 5
- **Styling:** Tailwind CSS with custom Familiada theme
- **State:** Zustand (global game state)
- **Window sync:** BroadcastChannel API
- **Audio:** Howler.js
- **Testing:** Vitest + React Testing Library
- **CI/CD:** GitHub Actions

## Architecture

Two-window application:

1. **Operator Panel** (main window) — controls the game
2. **Game Board** (popup window) — display for projector

Communication via BroadcastChannel — no server needed, fully offline.

Reference: See `docs/architecture.md` for full diagrams and data model.

---

## Clean Code Standards

### SOLID Principles

- **S**ingle Responsibility: One component/function = one job
- **O**pen/Closed: Extend via props/composition, don't modify existing components
- **L**iskov Substitution: Components should be replaceable with their subtypes
- **I**nterface Segregation: Small, focused interfaces (TypeScript types)
- **D**ependency Inversion: Depend on abstractions (hooks, stores), not implementations

### Code Quality Rules

- **DRY:** Extract repeated code into utils/hooks after 2nd occurrence
- **KISS:** Prefer simple solutions; complexity must be justified
- **Maximum file length:** 300 lines (split if larger)
- **Maximum function length:** 50 lines (extract helper functions)
- **Maximum component props:** 7 (consider composition if more)
- **Cyclomatic complexity:** Max 10 per function

### Naming Conventions

- Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities
- Components: `PascalCase` — noun describing what it renders
- Functions: `camelCase` — verb describing what it does
- Hooks: `use` prefix — `useGameState`, `useBroadcast`
- Types/Interfaces: `PascalCase` — noun, no `I` prefix
- Constants: `SCREAMING_SNAKE_CASE`
- Booleans: `is`, `has`, `should` prefix — `isRevealed`, `hasError`
- Event handlers: `handle` prefix — `handleClick`, `handleReveal`

### Code Comments

- Language: English only
- Explain WHAT and WHY, not HOW (code shows how)
- No redundant comments (`// increment counter` before `counter++`)
- Use JSDoc for public functions and complex types
- TODO format: `// TODO(username): description - issue link if exists`

### File Organization

```typescript
// 1. Imports (external, then internal, alphabetized)
import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';

// 2. Types/Interfaces
interface Props { ... }

// 3. Constants
const MAX_ANSWERS = 7;

// 4. Helper functions (if small, otherwise separate file)
function calculateScore() { ... }

// 5. Component
export function AnswerRow({ ... }: Props) { ... }
```

---

## Testing Standards

### Coverage Requirements

- **Store actions:** 90%+ coverage
- **Utility functions:** 90%+ coverage
- **Components:** 70%+ coverage (focus on behavior, not implementation)
- **Hooks:** 80%+ coverage

### What MUST Be Tested

- All Zustand store actions
- All utility functions
- User interactions (clicks, inputs)
- Conditional rendering
- Error states

### What Should NOT Be Tested

- Implementation details (internal state, private functions)
- Third-party library behavior
- Static content (unless critical)
- Styling (use visual regression if needed)

### Test Naming Convention

```typescript
describe("ComponentName", () => {
  it("should [expected behavior] when [condition]", () => {
    // Arrange - Act - Assert
  });
});

// Examples:
it("should reveal answer when reveal button is clicked");
it("should trigger steal when third mistake is made");
it("should display masked text when answer is hidden");
```

### Test File Location

- Tests mirror source structure: `src/components/board/AnswerRow.tsx` → `src/components/board/AnswerRow.test.tsx`
- Test utilities in `src/test/` folder

---

## SDLC Standards

### Definition of Done (DoD)

A User Story is DONE when:

- [ ] All Acceptance Criteria are met
- [ ] Code passes linting (`npm run lint`)
- [ ] All existing tests pass (`npm test`)
- [ ] New tests written for new functionality (by /qa)
- [ ] Test coverage meets standards
- [ ] Manual verification completed
- [ ] Code reviewed (self-review for solo dev)
- [ ] Documentation updated (by /docs)
- [ ] No console errors or warnings
- [ ] Works in target browsers (Chrome, Edge, Firefox)

### Code Review Checklist (Self-Review)

Before proposing commit:

- [ ] No commented-out code
- [ ] No console.log statements (except intentional logging)
- [ ] No hardcoded values that should be constants
- [ ] No magic numbers without explanation
- [ ] Error handling in place
- [ ] Types are explicit (no `any`)
- [ ] Functions have single responsibility
- [ ] Component props are documented
- [ ] No duplicate code

### PR Requirements

- Title: `feat: US-XXX short description` or `fix: US-XXX short description`
- Description includes:
  - What changed
  - Why it changed
  - How to test
  - Screenshots (for UI changes)
- All CI checks pass
- Self-review completed

---

## Git Workflow

### Branch Naming

```
{issue-number}-{short-description}

Examples:
- 1-project-setup
- 5-answer-board-component
- 12-ci-cd-pipeline
```

### Commit Convention (Conventional Commits)

```
type(scope): short description

Types:
- feat: new feature
- fix: bug fix
- test: adding/updating tests
- refactor: code change without feature/fix
- docs: documentation only
- chore: build, config, dependencies
- ci: CI/CD changes
- style: formatting (no code change)
- perf: performance improvement

Examples:
- feat(board): add answer reveal animation
- fix(store): correct score calculation on steal
- test(store): add tests for markMistake action
- chore: update dependencies
```

### Standard Workflow

```powershell
# 1. Create branch (check current branch first)
git branch --show-current
git checkout -b 5-answer-board

# 2. Make changes and commit
git add src/components/board/AnswerBoard.tsx
git commit -m "feat(board): add answer board component (Closes #5)"

# 3. Push and create PR
git push -u origin 5-answer-board

# 4. After merge, cleanup
git checkout main
git pull
git branch -d 5-answer-board
```

**Note:** Never use `&&` in PowerShell — run each command separately.

---

## Folder Structure

```
src/
├── components/
│   ├── board/           # Game board components (projector view)
│   ├── operator/        # Operator panel components
│   ├── shared/          # Shared/reusable components
│   └── screens/         # Full-screen views
├── hooks/               # Custom React hooks
├── store/               # Zustand store
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── test/                # Test utilities and setup
├── assets/
│   └── sounds/          # Sound effect files
├── App.tsx
├── main.tsx
└── index.css
```

---

## Key Patterns

### BroadcastChannel Communication

```typescript
// Sending from operator
const channel = new BroadcastChannel("familiada-game");
channel.postMessage({ type: "REVEAL_ANSWER", payload: answerIndex });

// Receiving on board
channel.onmessage = (event) => {
  const action = event.data;
  // Handle action
};
```

### Zustand Store

```typescript
// Always use selectors for performance
const score = useGameStore((state) => state.teams.left.totalScore);

// Actions modify state immutably
revealAnswer: (index) =>
  set((state) => ({
    currentRound: {
      ...state.currentRound,
      revealedAnswers: [...state.currentRound.revealedAnswers, index],
    },
  }));
```

---

## Completing an Implementation Session

When implementation is done:

1. Run linter — fix all issues: `npm run lint`
2. Run tests — all must pass: `npm test`
3. Self-review using checklist above
4. List Manual Verification steps (write them in Polish)
5. Wait — do NOT suggest /qa until the user confirms manual verification passed
6. Only after confirmation: run `git status` to capture all modified files. Then provide a proposed commit:
   ```powershell
   git status
   git add [list specific changed files]
   git commit -m "feat(scope): [short description] (Closes #issue_number)"
   ```
7. After the commit is confirmed: "Implementation committed. Run /qa."

---

## Scope Boundaries

| Agent | Creates                      | Does NOT Create |
| ----- | ---------------------------- | --------------- |
| /dev  | Implementation code          | Tests           |
| /qa   | Tests, TEST_CASES.md updates | Production code |
| /docs | Documentation updates        | Code or tests   |

---

## Never Do

- Never use `--dangerously-skip-permissions` for git operations
- Never commit secrets, API keys, or credentials
- Never push with failing tests or linting errors
- Never push directly to main — always PR
- Never use `&&` in PowerShell commands
- Never use class components (functional only)
- Never mutate Zustand state directly (use set())
- Never store derived state (calculate from base state)
- Never use `any` type (use `unknown` if type is truly unknown)
- Never ignore TypeScript errors with `@ts-ignore`

---

## Multi-Agent System

8 specialized Claude Code agents. All follow Model 2.5: autonomous in code, git always requires user approval.

### Daily Mode (every US)

```
/pm → /planning → /dev → manual verify → /qa → /docs → [/retro optional]
                              ↓
                           /debug (on demand)
```

### Strategic Mode (new ideas / Epics)

```
/discover → discussion → BACKLOG.md + docs/architecture.md updated → commit
```

### Agent Directory

| Agent     | Purpose                            | Language |
| --------- | ---------------------------------- | -------- |
| /pm       | Session router, git status check   | Polish   |
| /discover | Strategic sessions, new Epics      | Polish   |
| /planning | US verification + Task instruction | Polish   |
| /dev      | Implementation                     | English  |
| /qa       | Tests                              | English  |
| /debug    | Problem solving                    | Polish   |
| /docs     | Documentation update               | English  |
| /retro    | Retrospective                      | Polish   |

Full architecture: see MULTI_AGENT_ARCHITECTURE.md

---

## Project-Specific Patterns

_This section is populated during development as patterns emerge._

### Sound Effects

```typescript
// Use the useSound hook for consistent audio
const { playCorrect, playWrong, playWin } = useSound();
```

### Window Detection

```typescript
// Check if running as board or operator
const isBoard =
  new URLSearchParams(window.location.search).get("view") === "board";
```

---

_This document is the primary instruction file for /dev agent._
