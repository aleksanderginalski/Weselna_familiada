# Weselna Familiada — Claude Code Instructions

## Project Identity (Invariants)
- **App name:** Weselna Familiada
- **Package name:** weselna-familiada
- **Main entry file:** src/main.tsx
- **Repository:** Weselna_familiada

## Tech Stack
- **Frontend:** React 18 + TypeScript
- **Bundler:** Vite 5
- **Styling:** Tailwind CSS with custom Familiada theme
- **State:** Zustand (global game state)
- **Window sync:** BroadcastChannel API
- **Audio:** Howler.js
- **Testing:** Vitest

## Architecture

Two-window application:
1. **Operator Panel** (main window) — controls the game
2. **Game Board** (popup window) — display for projector

Communication via BroadcastChannel — no server needed, fully offline.

Reference: See `architecture.md` for full diagrams and data model.

## Code Standards
- Code comments: English only
- Style: explain WHAT and WHY, no metaphors in comments
- Max file length: 300 lines (split if larger)
- Functional components with hooks (no class components)
- Named exports preferred over default exports (except pages)

## Naming Conventions
- Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities
- Components: `PascalCase`
- Variables/functions: `camelCase`
- Types/Interfaces: `PascalCase`
- Constants: `SCREAMING_SNAKE_CASE`
- CSS classes: Tailwind utilities, custom classes in `kebab-case`
- Tests mirror source structure exactly

## Folder Structure

```
src/
├── components/
│   ├── board/           # Game board components (projector view)
│   │   ├── AnswerRow.tsx
│   │   ├── MistakeIndicator.tsx
│   │   ├── ScoreDisplay.tsx
│   │   └── GameBoard.tsx
│   ├── operator/        # Operator panel components
│   │   ├── AnswerControl.tsx
│   │   ├── TeamPanel.tsx
│   │   ├── RoundControls.tsx
│   │   └── OperatorPanel.tsx
│   ├── shared/          # Shared components
│   │   └── ...
│   └── screens/         # Full-screen views
│       ├── LobbyScreen.tsx
│       ├── GameScreen.tsx
│       └── WinnerScreen.tsx
├── hooks/
│   ├── useGameState.ts
│   ├── useBroadcast.ts
│   └── useSound.ts
├── store/
│   ├── gameStore.ts     # Zustand store
│   └── actions.ts       # Game actions
├── types/
│   ├── game.ts          # Game types
│   └── index.ts
├── utils/
│   ├── broadcast.ts     # BroadcastChannel helpers
│   └── scoring.ts       # Score calculations
├── assets/
│   └── sounds/          # Sound effects
├── App.tsx
├── main.tsx
└── index.css
```

## Key Patterns

### BroadcastChannel Communication
```typescript
// Sending from operator
const channel = new BroadcastChannel('familiada-game');
channel.postMessage({ type: 'REVEAL_ANSWER', payload: answerIndex });

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
revealAnswer: (index) => set((state) => ({
  currentRound: {
    ...state.currentRound,
    revealedAnswers: [...state.currentRound.revealedAnswers, index]
  }
}))
```

### Component Props
```typescript
// Always define explicit prop types
interface AnswerRowProps {
  answer: AnswerData;
  index: number;
  isRevealed: boolean;
}

export function AnswerRow({ answer, index, isRevealed }: AnswerRowProps) {
  // ...
}
```

## Git Workflow
- Before creating a branch, run `git branch --show-current`. If already on the correct branch, skip branch creation.
- Branch format: `{issue-number}-{short-description}`
- Conventional Commits required:
  - `feat:` new feature
  - `fix:` bug fix
  - `test:` adding tests
  - `refactor:` code change without feature/fix
  - `docs:` documentation only
  - `chore:` build, config, dependencies
- Always include `Closes #issue_number` in commit message
- Never push directly to main — always PR

## Completing an Implementation Session

When implementation is done:
1. Run linter/analyzer — fix all issues: `npm run lint`
2. Run tests — all must pass: `npm test`
3. List Manual Verification steps (write them in Polish)
4. Wait — do NOT suggest /qa until the user confirms manual verification passed
5. Only after confirmation: run `git status` to capture all modified files. Then provide a proposed commit:
   ```powershell
   git status
   git add [list specific changed files]
   git commit -m "feat: [short description] (Closes #issue_number)"
   ```
   Note: never use `&&` — run each command separately (PowerShell 5.x, Windows 10).
6. After the commit is confirmed: "Implementation committed. Run /qa."

## Scope Changes During Implementation

If during implementation a scope change or clarification is discovered
(e.g. a task is more complex than described, or a new edge case requires
an additional change not listed in the Task instruction), update `BACKLOG.md`
immediately — add or modify tasks, update ACs if needed. Do not wait for /docs.

**Numbering rule when adding new items to BACKLOG.md:**
Before assigning any new US or TASK number, search for the current highest number:
- New US: search `### US-[0-9]+` in BACKLOG.md → pick highest → increment by 1
- New TASK: search `TASK-{US_NUMBER}` in BACKLOG.md → pick highest sequence → increment by 1
Never guess or reuse numbers — duplicate numbers cause planning errors.

## Scope Boundaries

/dev writes implementation code only. It does NOT write tests.
Tests are the exclusive responsibility of /qa agent.
/dev runs linter and existing tests before signalling completion — never creates new test files.

## Tailwind Custom Classes

Use the custom Familiada theme defined in `tailwind.config.js`:

```tsx
// Colors
className="bg-familiada-bg-dark"      // Main background
className="bg-familiada-bg-panel"     // Panel background
className="text-familiada-gold"       // Gold accent text
className="text-familiada-red"        // Error/X color
className="border-familiada-border"   // Border color

// Custom components
className="answer-row"                // Answer row styling
className="answer-row revealed"       // Revealed answer
className="score-display"             // Score box
className="mistake-x"                 // Mistake indicator
className="operator-btn-primary"      // Primary button
className="operator-btn-danger"       // Danger button

// Utilities
className="text-glow-gold"            // Gold text glow
className="box-glow-gold"             // Gold box shadow
```

## Never Do
- Never use `--dangerously-skip-permissions` for git operations
- Never commit secrets, API keys, or credentials
- Never push with failing tests
- Never push directly to main — always PR
- Never use `&&` in PowerShell commands
- Never use class components (functional only)
- Never mutate Zustand state directly (use set())
- Never store derived state (calculate from base state)

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
/discover → discussion → BACKLOG.md + architecture.md updated → commit
```

### Agent Directory

| Agent | Purpose | Language |
|---|---|---|
| /pm | Session router, git status check | Polish |
| /discover | Strategic sessions, new Epics | Polish |
| /planning | US verification + Task instruction | Polish |
| /dev | Implementation | English |
| /qa | Tests | English |
| /debug | Problem solving | Polish |
| /docs | Documentation update | English |
| /retro | Retrospective | Polish |

Full architecture: see MULTI_AGENT_ARCHITECTURE.md

---

## Project-Specific Patterns

*This section is populated during development as patterns emerge.*

### Sound Effects
```typescript
// Use the useSound hook for consistent audio
const { playCorrect, playWrong, playWin } = useSound();
```

### Window Detection
```typescript
// Check if running as board or operator
const isBoard = new URLSearchParams(window.location.search).get('view') === 'board';
```

---

*This document is the primary instruction file for /dev agent.*
