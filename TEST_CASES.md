# Weselna Familiada - Test Cases Documentation

**Version:** 1.7  
**Date:** 2026-04-13  
**Author:** QA Agent  
**Test Framework:** Vitest

---

## 1. Test Strategy Overview

### 1.1 Test Levels

| Level | Scope | Responsibility |
|-------|-------|----------------|
| Unit Tests | Store actions, utils | /qa agent |
| Component Tests | React components | /qa agent |
| Integration Tests | Window sync, full flows | /qa agent |

### 1.2 Coverage Goals

| Category | Target Coverage |
|----------|-----------------|
| Store actions | 90%+ |
| Utility functions | 90%+ |
| Components | 70%+ |

### 1.3 Test Naming Convention

```
test('[UNIT]_[SCENARIO]_[EXPECTED_RESULT]')

Examples:
- test('revealAnswer_validIndex_updatesState')
- test('markMistake_thirdMistake_triggersSteal')
- test('AnswerRow_revealed_showsTextAndPoints')
```

---

## 2. Test Environment Setup

### 2.1 Running Tests

```powershell
# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### 2.2 Test Utilities

```typescript
// Common test setup for store
import { useGameStore } from '../store/gameStore';

beforeEach(() => {
  useGameStore.getState().resetGame();
});
```

---

## 3. Test Cases by Feature

### FEATURE-001: Project Setup & Configuration

#### TC-000: Project folder structure exists

**Related US:** US-001  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/test/projectStructure.test.ts`

**Test Steps:**
1. Verify all required directories exist under `src/`
2. Verify all required root-level files exist

**Status:** ✅ Done

---

#### TC-001: TypeScript types — GameConfig fixed mode

**Related US:** US-002  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/types/game.test.ts`

**Test Steps:**
1. Create a `GameConfig` object with `mode: 'fixed'`
2. Verify `numberOfRounds`, `multipliers`, and team names are accessible

**Status:** ✅ Done

---

#### TC-002: TypeScript types — GameConfig score mode

**Related US:** US-002  
**Type:** Unit  
**Priority:** High  
**File:** `src/types/game.test.ts`

**Test Steps:**
1. Create a `GameConfig` object with `mode: 'score'`
2. Verify `winningScore` is set and `numberOfRounds` is undefined

**Status:** ✅ Done

---

#### TC-003: TypeScript types — RoundState initial shape

**Related US:** US-002  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/types/game.test.ts`

**Test Steps:**
1. Create a `RoundState` with initial values
2. Verify all fields: phase, controllingTeam, revealedAnswers, mistakes, stealAttempted, roundScore

**Status:** ✅ Done

---

#### TC-004: TypeScript types — RoundPhase all values

**Related US:** US-002  
**Type:** Unit  
**Priority:** High  
**File:** `src/types/game.test.ts`

**Test Steps:**
1. Iterate over all `RoundPhase` values: `showdown`, `guessing`, `steal`, `summary`
2. Assign each to a `RoundState` and verify

**Status:** ✅ Done

---

#### TC-005: TypeScript types — GameStatus all values

**Related US:** US-002  
**Type:** Unit  
**Priority:** High  
**File:** `src/types/game.test.ts`

**Test Steps:**
1. Iterate over `lobby`, `playing`, `finished`
2. Assign each to a `GameState` and verify

**Status:** ✅ Done

---

#### TC-006: TypeScript types — GameAction discriminated union exhaustiveness

**Related US:** US-002  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/types/game.test.ts`

**Test Steps:**
1. Create one instance of every `GameAction` variant (10 total, including REQUEST_SYNC added in US-010)
2. Process all via a switch statement
3. Verify all 10 are handled

**Status:** ✅ Done

---

#### TC-007: TypeScript types — Component prop types shape

**Related US:** US-002  
**Type:** Unit  
**Priority:** Medium  
**File:** `src/types/game.test.ts`

**Test Steps:**
1. Create valid objects for `AnswerDisplayProps`, `TeamPanelProps`, `MistakeIndicatorProps`
2. Verify all required fields are accessible

**Status:** ✅ Done

---

#### TC-008: App — renders title and theme demo elements

**Related US:** US-003  
**Type:** Component  
**Priority:** Critical  
**File:** `src/App.test.tsx`

**Test Steps:**
1. Render `<App />`
2. Verify heading "Weselna Familiada" is present
3. Verify hidden and revealed answer row text is present
4. Verify score display label "PUNKTY" and value "120" are present

**Status:** ✅ Done

---

#### TC-009: App — second answer row has revealed class

**Related US:** US-003  
**Type:** Component  
**Priority:** High  
**File:** `src/App.test.tsx`

**Test Steps:**
1. Render `<App />`
2. Query all `.answer-row` elements
3. Verify first row does NOT have `revealed` class
4. Verify second row HAS `revealed` class

**Status:** ✅ Done

---

#### TC-010: Tailwind theme — Design Brief color tokens are correct

**Related US:** US-003  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/test/tailwindTheme.test.ts`

**Test Steps:**
1. Import `tailwind.config.js`
2. Verify all 7 primary color tokens match Design Brief hex values exactly

**Status:** ✅ Done

---

#### TC-011: Tailwind theme — component-level color tokens exist

**Related US:** US-003  
**Type:** Unit  
**Priority:** High  
**File:** `src/test/tailwindTheme.test.ts`

**Test Steps:**
1. Import `tailwind.config.js`
2. Verify `answer-hidden`, `answer-revealed`, `gold-dark` tokens are defined

**Status:** ✅ Done

---

#### TC-012: Linting — .prettierrc config file exists

**Related US:** US-004  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/test/lintingConfig.test.ts`

**Test Steps:**
1. Check that `.prettierrc` file exists in project root

**Status:** ✅ Done

---

#### TC-013: Linting — Prettier rules match project code style

**Related US:** US-004  
**Type:** Unit  
**Priority:** High  
**File:** `src/test/lintingConfig.test.ts`

**Test Steps:**
1. Parse `.prettierrc` as JSON
2. Verify `singleQuote: true`, `semi: true`, `tabWidth: 2`, `trailingComma: 'all'`, `printWidth: 100`

**Status:** ✅ Done

---

#### TC-014: Linting — ESLint extends prettier to prevent rule conflicts

**Related US:** US-004  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/test/lintingConfig.test.ts`

**Test Steps:**
1. Read `.eslintrc.cjs` content
2. Verify `'prettier'` is present in extends

**Status:** ✅ Done

---

#### TC-015: Linting — package.json defines lint, lint:fix, and format scripts

**Related US:** US-004  
**Type:** Unit  
**Priority:** High  
**File:** `src/test/lintingConfig.test.ts`

**Test Steps:**
1. Parse `package.json`
2. Verify `scripts.lint`, `scripts['lint:fix']`, and `scripts.format` are defined

**Status:** ✅ Done

---

#### TC-016: Testing framework — package.json defines test, test:watch, and test:coverage scripts

**Related US:** US-005  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/test/lintingConfig.test.ts`

**Test Steps:**
1. Parse `package.json`
2. Verify `scripts.test`, `scripts['test:watch']`, and `scripts['test:coverage']` are defined

**Status:** ✅ Done

---

#### TC-017: CI — GitHub Actions workflow file exists

**Related US:** US-007  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/test/lintingConfig.test.ts`

**Test Steps:**
1. Check that `.github/workflows/ci.yml` exists in project root

**Status:** ✅ Done

---

#### TC-018: CI — workflow triggers and steps are configured correctly

**Related US:** US-007  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/test/lintingConfig.test.ts`

**Test Steps:**
1. Read `.github/workflows/ci.yml`
2. Verify workflow name is `CI`
3. Verify triggers: `push` and `pull_request`
4. Verify steps run `npm run lint` and `npm test`

**Status:** ✅ Done

---

#### TC-019: CI — README has CI status badge

**Related US:** US-007  
**Type:** Unit  
**Priority:** High  
**File:** `src/test/lintingConfig.test.ts`

**Test Steps:**
1. Read `README.md`
2. Verify badge SVG URL for `ci.yml` is present
3. Verify badge links to the Actions workflow

**Status:** ✅ Done

---

#### TC-020: CI — build job depends on ci job and runs npm run build

**Related US:** US-008  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/test/lintingConfig.test.ts`

**Test Steps:**
1. Read `.github/workflows/ci.yml`
2. Verify `build:` job is defined
3. Verify `needs: ci` dependency is set
4. Verify `npm run build` is called

**Status:** ✅ Done

---

#### TC-021: CI — build artifact uploaded with 1-day retention

**Related US:** US-008  
**Type:** Unit  
**Priority:** High  
**File:** `src/test/lintingConfig.test.ts`

**Test Steps:**
1. Read `.github/workflows/ci.yml`
2. Verify `upload-artifact` action is present
3. Verify artifact name is `build-dist`
4. Verify `retention-days: 1` is set

**Status:** ✅ Done

---

#### TC-022: TypeScript — test files excluded from production compilation

**Related US:** US-008  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/test/lintingConfig.test.ts`

**Test Steps:**
1. Read `tsconfig.json`
2. Verify `exclude` field is present
3. Verify `src/**/*.test.ts`, `src/**/*.test.tsx`, `src/test/**/*` are excluded

**Status:** ✅ Done

---

### FEATURE-002: Game State Management

#### TC-023: loadGame — sets config, rounds, and team names from JSON data

**Related US:** US-009  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `loadGame` with valid `GameDataFile`
2. Verify `config`, `rounds`, `teams.left.name`, `teams.right.name`, `totalScore`, `status`, `currentRoundIndex`

**Status:** ✅ Done

---

#### TC-024: startGame — sets status to playing and resets round

**Related US:** US-009  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `loadGame` then `startGame`
2. Verify `status: 'playing'`, `currentRoundIndex: 0`, `phase: 'showdown'`

**Status:** ✅ Done

---

#### TC-025: selectTeam — sets controllingTeam and transitions to guessing phase

**Related US:** US-009  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `loadGame`, `startGame`, `selectTeam('left')`
2. Verify `controllingTeam: 'left'`, `phase: 'guessing'`

**Status:** ✅ Done

---

#### TC-026: revealAnswer — accumulates revealedAnswers and roundScore

**Related US:** US-009  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `revealAnswer(0)` and `revealAnswer(1)`
2. Verify `revealedAnswers: [0, 1]`, `roundScore: 50`

**Status:** ✅ Done

---

#### TC-027: revealAnswer — treats missing answer index as 0 points

**Related US:** US-009  
**Type:** Unit  
**Priority:** High  
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `revealAnswer(99)` (out of bounds)
2. Verify `roundScore: 0`, index still added to `revealedAnswers`

**Status:** ✅ Done

---

#### TC-028: markMistake — increments mistakes without phase change before threshold

**Related US:** US-009  
**Type:** Unit  
**Priority:** High  
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `markMistake` twice
2. Verify `mistakes: 2`, `phase` unchanged

**Status:** ✅ Done

---

#### TC-029: markMistake — third mistake triggers steal phase

**Related US:** US-009  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `markMistake` three times
2. Verify `mistakes: 3`, `phase: 'steal'`

**Status:** ✅ Done

---

#### TC-030: markMistake — does not re-trigger steal if stealAttempted is true

**Related US:** US-009  
**Type:** Unit  
**Priority:** High  
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Set `mistakes: 2`, `stealAttempted: true`, `phase: 'guessing'`
2. Call `markMistake`
3. Verify `phase` remains `'guessing'`

**Status:** ✅ Done

---

#### TC-031: endRound — adds roundScore × multiplier to winner and sets phase to summary

**Related US:** US-009  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Reveal answer (30 pts), call `endRound('left')` with multiplier 1
2. Verify `teams.left.totalScore: 30`, `phase: 'summary'`

**Status:** ✅ Done

---

#### TC-032: endRound — applies correct multiplier from currentRoundIndex

**Related US:** US-009  
**Type:** Unit  
**Priority:** High  
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Set `currentRoundIndex: 1` (multiplier 2), reveal answer (50 pts)
2. Call `endRound('right')`
3. Verify `teams.right.totalScore: 100`

**Status:** ✅ Done

---

#### TC-033: endRound — sets stealAttempted to true when phase is steal

**Related US:** US-009  
**Type:** Unit  
**Priority:** High  
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Set `phase: 'steal'`, call `endRound('right')`
2. Verify `stealAttempted: true`

**Status:** ✅ Done

---

#### TC-034: nextRound — increments index and resets currentRound

**Related US:** US-009  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `nextRound`
2. Verify `currentRoundIndex: 1`, `phase: 'showdown'`, `roundScore: 0`, `revealedAnswers: []`

**Status:** ✅ Done

---

#### TC-035: nextRound — sets status to finished after last round in fixed mode

**Related US:** US-009  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `nextRound` until past `numberOfRounds`
2. Verify `status: 'finished'`

**Status:** ✅ Done

---

#### TC-036: resetGame — resets scores and status while preserving team names and rounds

**Related US:** US-009  
**Type:** Unit  
**Priority:** Critical  
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Play a round, call `resetGame`
2. Verify `status: 'lobby'`, `totalScore: 0`, team names intact, rounds intact, `phase: 'showdown'`

**Status:** ✅ Done

---

### FEATURE-003: BroadcastChannel Synchronization

#### TC-037: broadcast — CHANNEL_NAME equals 'familiada-game'

**Related US:** US-010
**Type:** Unit
**Priority:** Critical
**File:** `src/utils/broadcast.test.ts`

**Test Steps:**
1. Import `CHANNEL_NAME` from `broadcast.ts`
2. Verify value is `'familiada-game'`

**Status:** ✅ Done

---

#### TC-038: broadcast — createGameChannel creates channel with correct name

**Related US:** US-010
**Type:** Unit
**Priority:** Critical
**File:** `src/utils/broadcast.test.ts`

**Test Steps:**
1. Call `createGameChannel()`
2. Verify returned channel `name` equals `CHANNEL_NAME`

**Status:** ✅ Done

---

#### TC-039: broadcast — sendSyncState posts SYNC_STATE with payload

**Related US:** US-010
**Type:** Unit
**Priority:** Critical
**File:** `src/utils/broadcast.test.ts`

**Test Steps:**
1. Call `sendSyncState(channel, state)`
2. Verify `postMessage` called with `{ type: 'SYNC_STATE', payload: state }`

**Status:** ✅ Done

---

#### TC-040: broadcast — requestStateSync posts REQUEST_SYNC

**Related US:** US-010
**Type:** Unit
**Priority:** Critical
**File:** `src/utils/broadcast.test.ts`

**Test Steps:**
1. Call `requestStateSync(channel)`
2. Verify `postMessage` called with `{ type: 'REQUEST_SYNC' }`

**Status:** ✅ Done

---

#### TC-041: useBroadcast — board sends REQUEST_SYNC on mount

**Related US:** US-010
**Type:** Unit
**Priority:** Critical
**File:** `src/hooks/useBroadcast.test.ts`

**Test Steps:**
1. Render hook with `?view=board` in location search
2. Verify channel `postMessage` called with `{ type: 'REQUEST_SYNC' }`

**Status:** ✅ Done

---

#### TC-042: useBroadcast — board applies SYNC_STATE to store

**Related US:** US-010
**Type:** Unit
**Priority:** Critical
**File:** `src/hooks/useBroadcast.test.ts`

**Test Steps:**
1. Render hook with `?view=board`
2. Simulate incoming `SYNC_STATE` message with `status: 'playing'`
3. Verify `useGameStore.getState().status` equals `'playing'`

**Status:** ✅ Done

---

#### TC-043: useBroadcast — operator broadcasts SYNC_STATE on store change

**Related US:** US-010
**Type:** Unit
**Priority:** Critical
**File:** `src/hooks/useBroadcast.test.ts`

**Test Steps:**
1. Render hook with default location (no `?view=board`)
2. Call `startGame()` on store
3. Verify `postMessage` called with `{ type: 'SYNC_STATE', payload: { status: 'playing', ... } }`

**Status:** ✅ Done

---

#### TC-044: useBroadcast — operator responds to REQUEST_SYNC with current state

**Related US:** US-010
**Type:** Unit
**Priority:** Critical
**File:** `src/hooks/useBroadcast.test.ts`

**Test Steps:**
1. Render hook with default location
2. Simulate incoming `REQUEST_SYNC` message
3. Verify `postMessage` called with `{ type: 'SYNC_STATE', ... }`

**Status:** ✅ Done

---

### FEATURE-004: Game Board Display

#### TC-045: AnswerRow — shows number, mask, and hides points when not revealed

**Related US:** US-011
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/AnswerRow.test.tsx`

**Test Steps:**
1. Render `AnswerRow` with `isRevealed=false`, `index=0`
2. Verify number "1" is shown
3. Verify `████████████████████` mask is shown
4. Verify answer text and points are absent

**Status:** ✅ Done

---

#### TC-046: AnswerRow — shows number, answer text, and points when revealed

**Related US:** US-011
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/AnswerRow.test.tsx`

**Test Steps:**
1. Render `AnswerRow` with `isRevealed=true`, `index=2`
2. Verify number "3" is shown
3. Verify answer text is visible
4. Verify points are visible
5. Verify mask is absent

**Status:** ✅ Done

---

#### TC-047: AnswerRow — applies revealed CSS class only when revealed

**Related US:** US-011
**Type:** Component
**Priority:** High
**File:** `src/components/board/AnswerRow.test.tsx`

**Test Steps:**
1. Render with `isRevealed=false` — verify no `revealed` class
2. Rerender with `isRevealed=true` — verify `revealed` class present

**Status:** ✅ Done

---

#### TC-048: AnswerBoard — renders nothing when no round is loaded

**Related US:** US-011
**Type:** Component
**Priority:** High
**File:** `src/components/board/AnswerBoard.test.tsx`

**Test Steps:**
1. Render `AnswerBoard` with empty store (no `loadGame` called)
2. Verify component renders null

**Status:** ✅ Done

---

#### TC-049: AnswerBoard — renders all answer rows after game starts

**Related US:** US-011
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/AnswerBoard.test.tsx`

**Test Steps:**
1. Call `loadGame` + `startGame` with 3-answer round
2. Render `AnswerBoard`
3. Verify 3 masked rows and numbers 1–3 are shown

**Status:** ✅ Done

---

#### TC-050: AnswerBoard — shows revealed answer text and hides mask after revealAnswer

**Related US:** US-011
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/AnswerBoard.test.tsx`

**Test Steps:**
1. Call `loadGame`, `startGame`, `revealAnswer(1)`
2. Render `AnswerBoard`
3. Verify answer text and points for index 1 are visible
4. Verify remaining 2 rows still show mask

**Status:** ✅ Done

---

#### TC-051: TeamScore — displays team name and zero score on game start

**Related US:** US-012
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/TeamScore.test.tsx`

**Test Steps:**
1. Call `loadGame` + `startGame`
2. Render `<TeamScore side="left" />`
3. Verify team name and score "0" are visible

**Status:** ✅ Done

---

#### TC-052: TeamScore — displays right team name

**Related US:** US-012
**Type:** Component
**Priority:** High
**File:** `src/components/board/TeamScore.test.tsx`

**Test Steps:**
1. Call `loadGame` + `startGame`
2. Render `<TeamScore side="right" />`
3. Verify right team name is visible

**Status:** ✅ Done

---

#### TC-053: TeamScore — updates score after endRound with multiplier

**Related US:** US-012
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/TeamScore.test.tsx`

**Test Steps:**
1. Call `loadGame`, `startGame`, `revealAnswer(0)`, `endRound('left')`
2. Render `<TeamScore side="left" />`
3. Verify score equals roundScore × multiplier

**Status:** ✅ Done

---

#### TC-054: RoundScore — displays 0 and correct multiplier on game start

**Related US:** US-012
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/RoundScore.test.tsx`

**Test Steps:**
1. Call `loadGame` + `startGame` with multiplier 3
2. Render `<RoundScore />`
3. Verify "0" and "x3 mnożnik" are visible

**Status:** ✅ Done

---

#### TC-055: RoundScore — updates points to win when answer is revealed

**Related US:** US-012
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/RoundScore.test.tsx`

**Test Steps:**
1. Call `loadGame`, `startGame`, `revealAnswer(0)` (30 pts, multiplier 3)
2. Render `<RoundScore />`
3. Verify "90" is displayed

**Status:** ✅ Done

---

#### TC-056: RoundScore — uses correct multiplier for second round

**Related US:** US-012
**Type:** Component
**Priority:** High
**File:** `src/components/board/RoundScore.test.tsx`

**Test Steps:**
1. Call `loadGame`, `startGame`, `nextRound`, `revealAnswer(0)` (50 pts, multiplier 2)
2. Render `<RoundScore />`
3. Verify "100" and "x2 mnożnik" are displayed

**Status:** ✅ Done

---

#### TC-057: AnswerSum — displays Suma label and 0 on game start

**Related US:** US-012
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/AnswerSum.test.tsx`

**Test Steps:**
1. Call `loadGame` + `startGame`
2. Render `<AnswerSum />`
3. Verify "Suma:" label and "0" are visible

**Status:** ✅ Done

---

#### TC-058: AnswerSum — updates sum when answers are revealed

**Related US:** US-012
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/AnswerSum.test.tsx`

**Test Steps:**
1. Call `loadGame`, `startGame`, `revealAnswer(0)`, `revealAnswer(1)` (30 + 20 = 50 pts)
2. Render `<AnswerSum />`
3. Verify "50" is displayed

**Status:** ✅ Done

---

### FEATURE-004: Game Board Display (continued)

#### TC-059: MistakeIndicator — renders nothing during showdown phase

**Related US:** US-013
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/MistakeIndicator.test.tsx`

**Test Steps:**
1. Call `loadGame` + `startGame` (no team selected)
2. Render `<MistakeIndicator side="left" />`
3. Verify container is empty

**Status:** ✅ Done

---

#### TC-060: MistakeIndicator — renders 3 empty slots when controlling team has no mistakes

**Related US:** US-013
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/MistakeIndicator.test.tsx`

**Test Steps:**
1. Call `loadGame`, `startGame`, `selectTeam('left')`
2. Render `<MistakeIndicator side="left" />`
3. Verify 3 `.mistake-x` slots, all `empty`, none `active`

**Status:** ✅ Done

---

#### TC-061: MistakeIndicator — shows filled X marks matching mistake count

**Related US:** US-013
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/MistakeIndicator.test.tsx`

**Test Steps:**
1. Call `loadGame`, `startGame`, `selectTeam('left')`, `markMistake()` × 2
2. Render `<MistakeIndicator side="left" />`
3. Verify 2 `.mistake-x.active` and 1 `.mistake-x.empty`

**Status:** ✅ Done

---

#### TC-062: MistakeIndicator — renders nothing on opposing side outside steal phase

**Related US:** US-013
**Type:** Component
**Priority:** High
**File:** `src/components/board/MistakeIndicator.test.tsx`

**Test Steps:**
1. Call `loadGame`, `startGame`, `selectTeam('left')` (guessing phase, no steal yet)
2. Render `<MistakeIndicator side="right" />`
3. Verify container is empty

**Status:** ✅ Done

---

#### TC-063: MistakeIndicator — renders outline steal slot on opposing side during steal phase

**Related US:** US-013
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/MistakeIndicator.test.tsx`

**Test Steps:**
1. Call `loadGame`, `startGame`, `selectTeam('left')`, `markMistake()` × 3 (triggers steal)
2. Render `<MistakeIndicator side="right" />`
3. Verify X element is present with `text-transparent` class (outline only)

**Status:** ✅ Done

---

#### TC-064: MistakeIndicator — shows filled steal slot when steal failed

**Related US:** US-013
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/MistakeIndicator.test.tsx`

**Test Steps:**
1. Call `loadGame`, `startGame`, `selectTeam('left')`, `markMistake()` × 4
2. Render `<MistakeIndicator side="right" />`
3. Verify X element has `bg-familiada-red` class

**Status:** ✅ Done

---

#### TC-065: markMistake — sets stealFailed to true when called during steal phase

**Related US:** US-013
**Type:** Unit
**Priority:** Critical
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Set `phase: 'steal'`, `mistakes: 3`
2. Call `markMistake()`
3. Verify `stealFailed: true`, `mistakes` unchanged at 3, `phase` unchanged at `'steal'`

**Status:** ✅ Done

---

#### TC-066: GameBoard — renders all board sections when game is loaded

**Related US:** US-014
**Type:** Component
**Priority:** Critical
**File:** `src/components/board/GameBoard.test.tsx`

**Test Steps:**
1. Call `loadGame` + `startGame`
2. Render `<GameBoard />`
3. Verify both team names are present (TeamScore)
4. Verify "Do wygrania" label is present (RoundScore)
5. Verify answer row numbers 1 and 2 are present (AnswerBoard)
6. Verify "Suma:" label is present (AnswerSum)

**Status:** ✅ Done

---

#### TC-067: GameBoard — renders fullscreen container

**Related US:** US-014
**Type:** Component
**Priority:** High
**File:** `src/components/board/GameBoard.test.tsx`

**Test Steps:**
1. Render `<GameBoard />`
2. Query `.h-screen.w-screen` element
3. Verify element is in the document

**Status:** ✅ Done

---

#### TC-068: GameBoard — opposing team score stays at 0 after round won by other team

**Related US:** US-014
**Type:** Component
**Priority:** High
**File:** `src/components/board/GameBoard.test.tsx`

**Test Steps:**
1. Call `loadGame`, `startGame`, `selectTeam('left')`, `revealAnswer(0)`, `endRound('left')`
2. Render `<GameBoard />`
3. Verify right team name and score "0" are visible

**Status:** ✅ Done

---

### FEATURE-005: Operator Panel

#### TC-069: AnswerControl — renders nothing when no round is loaded

**Related US:** US-015
**Type:** Component
**Priority:** High
**File:** `src/components/operator/AnswerControl.test.tsx`

**Test Steps:**
1. Render `<AnswerControl />` with empty store (no `loadGame` called)
2. Verify component renders null

**Status:** ✅ Done

---

#### TC-070: AnswerControl — displays all answers with number, text, points and ODKRYJ buttons

**Related US:** US-015
**Type:** Component
**Priority:** Critical
**File:** `src/components/operator/AnswerControl.test.tsx`

**Test Steps:**
1. Call `loadGame` + `startGame` with 3-answer round
2. Render `<AnswerControl />`
3. Verify numbers 1–3, all answer texts, all point values are visible
4. Verify 3 "ODKRYJ" buttons are present

**Status:** ✅ Done

---

#### TC-071: AnswerControl — replaces ODKRYJ button with revealed indicator after clicking

**Related US:** US-015
**Type:** Component
**Priority:** Critical
**File:** `src/components/operator/AnswerControl.test.tsx`

**Test Steps:**
1. Call `loadGame` + `startGame`, render `<AnswerControl />`
2. Click first "ODKRYJ" button
3. Verify only 2 "ODKRYJ" buttons remain
4. Verify "✓ odkryta" indicator is shown

**Status:** ✅ Done

---

#### TC-072: AnswerControl — calls revealAnswer with correct index on button click

**Related US:** US-015
**Type:** Component
**Priority:** Critical
**File:** `src/components/operator/AnswerControl.test.tsx`

**Test Steps:**
1. Call `loadGame` + `startGame`, render `<AnswerControl />`
2. Click second "ODKRYJ" button (index 1)
3. Verify `revealedAnswers` in store contains `1`

**Status:** ✅ Done

---

#### TC-073: AnswerControl — marks already-revealed answers from store on initial render

**Related US:** US-015
**Type:** Component
**Priority:** High
**File:** `src/components/operator/AnswerControl.test.tsx`

**Test Steps:**
1. Call `loadGame`, `startGame`, `revealAnswer(2)`
2. Render `<AnswerControl />`
3. Verify 2 "ODKRYJ" buttons (not 3) are shown
4. Verify "✓ odkryta" indicator is shown for the pre-revealed answer

**Status:** ✅ Done

---

#### TC-074: TeamPanel — displays team name, score, active/empty mistake slots, and status when guessing with 2 mistakes

**Related US:** US-016
**Type:** Component
**Priority:** Critical
**File:** `src/components/operator/TeamPanel.test.tsx`

**Test Steps:**
1. Render `<TeamPanel>` with `teamStatus='guessing'`, `mistakes=2`, `maxMistakes=3`, `totalScore=100`
2. Verify team name, score "100", status "Kolejny błąd = przejęcie" are visible
3. Verify 2 `.mistake-x.active` and 1 `.mistake-x.empty` elements
4. Verify radio is checked

**Status:** ✅ Done

---

#### TC-075: TeamPanel — shows correct status text for each teamStatus variant

**Related US:** US-016
**Type:** Component
**Priority:** High
**File:** `src/components/operator/TeamPanel.test.tsx`

**Test Steps:**
1. Render with `teamStatus='waiting'` → verify "Czeka"
2. Rerender with `teamStatus='stealing'`, `mistakes=0` → verify "Przejęcie — jedna szansa"
3. Rerender with `teamStatus='stealing'`, `mistakes=1` → verify "Błąd! Runda skończona"
4. Rerender with `teamStatus='grayed'` → verify "Przejęcie przez przeciwnika"

**Status:** ✅ Done

---

#### TC-076: TeamPanel — calls onSelect when radio is clicked

**Related US:** US-016
**Type:** Component
**Priority:** Critical
**File:** `src/components/operator/TeamPanel.test.tsx`

**Test Steps:**
1. Render with `teamStatus='waiting'` and mock `onSelect`
2. Click the radio input
3. Verify `onSelect` was called once

**Status:** ✅ Done

---

#### TC-077: TeamPanel — disables radio when isSelectDisabled is true

**Related US:** US-016
**Type:** Component
**Priority:** High
**File:** `src/components/operator/TeamPanel.test.tsx`

**Test Steps:**
1. Render with `isSelectDisabled=true`
2. Verify radio input has `disabled` attribute

**Status:** ✅ Done

---

#### TC-078: TeamControl — displays both team names and disables BŁĄD button in showdown phase

**Related US:** US-016
**Type:** Component
**Priority:** Critical
**File:** `src/components/operator/TeamControl.test.tsx`

**Test Steps:**
1. Call `loadGame` + `startGame` (no team selected)
2. Render `<TeamControl />`
3. Verify both team names visible
4. Verify BŁĄD button is disabled
5. Verify "Wybierz drużynę, która odpowiada" text is shown

**Status:** ✅ Done

---

#### TC-079: TeamControl — highlights guessing team and shows 1 steal slot for opposing team after selectTeam

**Related US:** US-016
**Type:** Component
**Priority:** Critical
**File:** `src/components/operator/TeamControl.test.tsx`

**Test Steps:**
1. Call `selectTeam('left')`
2. Render `<TeamControl />`
3. Verify left radio is checked, right radio is not
4. Verify total 4 mistake slots (3 for left + 1 for right)
5. Verify BŁĄD button is enabled

**Status:** ✅ Done

---

#### TC-080: TeamControl — shows steal phase UI after 3 mistakes

**Related US:** US-016
**Type:** Component
**Priority:** Critical
**File:** `src/components/operator/TeamControl.test.tsx`

**Test Steps:**
1. Call `selectTeam('left')`, `markMistake()` × 3
2. Render `<TeamControl />`
3. Verify steal banner with team B name is visible
4. Verify all radios are disabled
5. Verify BŁĄD button is still enabled for steal attempt

**Status:** ✅ Done

---

#### TC-081: TeamControl — shows steal failed message and disables BŁĄD after failed steal

**Related US:** US-016
**Type:** Component
**Priority:** Critical
**File:** `src/components/operator/TeamControl.test.tsx`

**Test Steps:**
1. Call `selectTeam('left')`, `markMistake()` × 4
2. Render `<TeamControl />`
3. Verify "Punkty dla: Drużyna A" message is shown
4. Verify BŁĄD button is disabled

**Status:** ✅ Done

---

#### TC-082: TeamControl — calls markMistake when BŁĄD is clicked in guessing phase

**Related US:** US-016
**Type:** Component
**Priority:** Critical
**File:** `src/components/operator/TeamControl.test.tsx`

**Test Steps:**
1. Call `selectTeam('right')`, render `<TeamControl />`
2. Click BŁĄD button
3. Verify `currentRound.mistakes` equals 1

**Status:** ✅ Done

---

#### TC-083: RoundControls — displays round number, total rounds, and multiplier

**Related US:** US-017
**Type:** Component
**Priority:** Critical
**File:** `src/components/operator/RoundControls.test.tsx`

**Test Steps:**
1. Load game with 4 rounds and multipliers [1, 2, 3, 3], start game
2. Render `<RoundControls />`
3. Verify "Runda 1 z 4" and "Mnożnik: x1" are visible
4. Verify no action buttons present in showdown phase without controlling team

**Status:** ✅ Done

---

#### TC-084: RoundControls — shows ZAKOŃCZ RUNDĘ button when controlling team is selected

**Related US:** US-017
**Type:** Component
**Priority:** Critical
**File:** `src/components/operator/RoundControls.test.tsx`

**Test Steps:**
1. Call `selectTeam('left')`, render `<RoundControls />`
2. Verify "ZAKOŃCZ RUNDĘ — wygrywa Drużyna A" button is visible
3. Verify "NASTĘPNA RUNDA" button is not present

**Status:** ✅ Done

---

#### TC-085: RoundControls — calls endRound with controlling team and shows summary

**Related US:** US-017
**Type:** Component
**Priority:** Critical
**File:** `src/components/operator/RoundControls.test.tsx`

**Test Steps:**
1. Call `selectTeam('right')`, render `<RoundControls />`
2. Click "ZAKOŃCZ RUNDĘ" button
3. Verify `currentRound.phase` is 'summary'
4. Verify summary message "Drużyna B otrzymuje ... pkt" is visible
5. Verify "NASTĘPNA RUNDA" button appears; "ZAKOŃCZ RUNDĘ" disappears

**Status:** ✅ Done

---

#### TC-086: RoundControls — advances to next round with updated multiplier

**Related US:** US-017
**Type:** Component
**Priority:** High
**File:** `src/components/operator/RoundControls.test.tsx`

**Test Steps:**
1. Call `selectTeam('left')`, `endRound('left')`, render `<RoundControls />`
2. Click "NASTĘPNA RUNDA"
3. Verify "Runda 2 z 4" and "Mnożnik: x2" are visible

**Status:** ✅ Done

---

#### TC-087: RoundControls — assigns points to opposing team when steal succeeds

**Related US:** US-017
**Type:** Component
**Priority:** Critical
**File:** `src/components/operator/RoundControls.test.tsx`

**Test Steps:**
1. Call `selectTeam('left')`, `revealAnswer(0)` (30 pts), `markMistake()` × 3 to trigger steal
2. Render `<RoundControls />`
3. Verify button shows "wygrywa Drużyna B" (opposing team)
4. Click button, verify `teams.right.totalScore > 0` and `teams.left.totalScore === 0`

**Status:** ✅ Done

---

### FEATURE-006: Game Flow & Scoring

#### TC-088: revealAnswer — does not update roundScore when phase is summary

**Related US:** US-020 / bugfix
**Type:** Unit
**Priority:** Critical
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Load game, start, set `phase: 'summary'`, `roundScore: 30`
2. Call `revealAnswer(1)` (20 pts answer)
3. Verify `roundScore` stays 30, `revealedAnswers` contains the index

**Status:** ✅ Done

---

#### TC-089: endRound — sets status to finished when score mode winning threshold is reached

**Related US:** US-021
**Type:** Unit
**Priority:** Critical
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Set mode: 'score', winningScore: 30, multiplier: 1, answer worth 30 pts
2. Call `revealAnswer(0)`, `endRound('left')`
3. Verify `status: 'finished'`, `teams.left.totalScore: 30`

**Status:** ✅ Done

---

#### TC-090: endRound — does not set status to finished when score mode threshold is not yet reached

**Related US:** US-021
**Type:** Unit
**Priority:** Critical
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Set mode: 'score', winningScore: 100, answer worth 30 pts
2. Call `revealAnswer(0)`, `endRound('left')`
3. Verify `status: 'playing'`

**Status:** ✅ Done

---

#### TC-091: WinnerScreen — displays winner name, scores, and NOWA GRA button when left team wins

**Related US:** US-020
**Type:** Component
**Priority:** Critical
**File:** `src/components/screens/WinnerScreen.test.tsx`

**Test Steps:**
1. Set teams: left 300 pts, right 150 pts; status: 'finished'
2. Render `<WinnerScreen />`
3. Verify "WYGRYWA", "Drużyna A", "300 PKT", "Drużyna B: 150 pkt", "NOWA GRA" button

**Status:** ✅ Done

---

#### TC-092: WinnerScreen — displays right team as winner when right score is higher

**Related US:** US-020
**Type:** Component
**Priority:** High
**File:** `src/components/screens/WinnerScreen.test.tsx`

**Test Steps:**
1. Set teams: left 100 pts, right 250 pts; status: 'finished'
2. Render `<WinnerScreen />`
3. Verify "Drużyna B", "250 PKT", "Drużyna A: 100 pkt"

**Status:** ✅ Done

---

#### TC-093: WinnerScreen — displays REMIS when both teams have equal scores

**Related US:** US-020
**Type:** Component
**Priority:** High
**File:** `src/components/screens/WinnerScreen.test.tsx`

**Test Steps:**
1. Set teams: left 200 pts, right 200 pts; status: 'finished'
2. Render `<WinnerScreen />`
3. Verify "REMIS!" visible, "200 PKT" visible, "WYGRYWA" not visible

**Status:** ✅ Done

---

#### TC-094: WinnerScreen — transitions status to lobby when NOWA GRA is clicked

**Related US:** US-020
**Type:** Component
**Priority:** Critical
**File:** `src/components/screens/WinnerScreen.test.tsx`

**Test Steps:**
1. Set finished state, render `<WinnerScreen />`
2. Click "NOWA GRA"
3. Verify `useGameStore.getState().status === 'lobby'`

**Status:** ✅ Done

---

#### TC-095: App — renders winner screen when status is finished

**Related US:** US-020
**Type:** Component
**Priority:** Critical
**File:** `src/App.test.tsx`

**Test Steps:**
1. Load game, set `status: 'finished'` with scores
2. Render `<App />`
3. Verify "WYGRYWA" heading and "NOWA GRA" button are in the document

**Status:** ✅ Done

---

#### TC-096 through TC-124

*Reserved for US-021 through US-026 (FinalRound, LobbyScreen, etc.)*

---

#### TC-125: Tailwind font families — US-027 font tokens defined correctly

**Related US:** US-027
**Type:** Config
**Priority:** High
**File:** `src/test/tailwindTheme.test.ts`

**Test Steps:**
1. Import `tailwind.config.js`
2. Assert `fontFamily['display'][0] === 'Familiada-2'`
3. Assert `fontFamily['heading'][0] === 'Familiada'`
4. Assert `fontFamily['body'][0] === 'Arial'`

**Status:** ✅ Done

---

#### TC-126: Project structure — US-027 font assets exist in public/fonts

**Related US:** US-027
**Type:** Project Structure
**Priority:** High
**File:** `src/test/projectStructure.test.ts`

**Test Steps:**
1. Check `public/fonts/Familiada-2.otf` exists
2. Check `public/fonts/familiada.ttf` exists
3. Check `public/fonts/familiada.woff2` exists

**Status:** ✅ Done

---

#### TC-127: DigitDisplay — renders labels, sr-only value, clamps to 999, and gold outer border

**Related US:** US-027
**Type:** Component
**Priority:** High
**File:** `src/components/shared/DigitDisplay.test.tsx`

**Test Steps:**
1. Render `<DigitDisplay value={42} label="Do wygrania" sublabel="x2 mnożnik" />`
   - Assert sr-only "42", label "Do wygrania", sublabel "x2 mnożnik" visible
2. Render `<DigitDisplay value={1500} />`
   - Assert sr-only shows "1500" (raw value)
   - Assert `data-digit` attributes = `['9','9','9']` (clamped to 999)
3. Render `<DigitDisplay value={0} />`
   - Assert sr-only "0" is in the document
4. Render `<DigitDisplay value={7} />`
   - Assert `.border-familiada-gold` exists (outer border)
   - Assert `.border-black` exists (inner border)
   - Assert gold border's `parentElement` does NOT have class `border-familiada-gold`

**Status:** ✅ Done

---

#### TC-128: DotMatrixBoard — no mistake characters when no team selected

**Related US:** US-028
**Type:** Component
**Priority:** High
**File:** `src/components/board/DotMatrixBoard.test.tsx`

**Test Steps:**
1. Load + start game, render `<DotMatrixBoard />`
2. Assert container text does NOT contain U+2000 (En Quad)
3. Assert container text does NOT contain U+2007 (Figure Space)

**Status:** ✅ Done

---

#### TC-129: DotMatrixBoard — small mistake En Quad after 1 left-team mistake

**Related US:** US-028
**Type:** Component
**Priority:** High
**File:** `src/components/board/DotMatrixBoard.test.tsx`

**Test Steps:**
1. `selectTeam('left')`, `markMistake()`
2. Render `<DotMatrixBoard />`
3. Assert container text CONTAINS U+2000 (En Quad — small mistake pattern)
4. Assert container text does NOT contain U+2007 (big mistake not shown yet)

**Status:** ✅ Done

---

#### TC-130: DotMatrixBoard — 3 small-mistake groups after 3 mistakes (≥6 En Quads)

**Related US:** US-028
**Type:** Component
**Priority:** High
**File:** `src/components/board/DotMatrixBoard.test.tsx`

**Test Steps:**
1. `selectTeam('left')`, `markMistake()` ×3
2. Render `<DotMatrixBoard />`
3. Count occurrences of U+2000 in `container.textContent`
4. Assert count ≥ 6 (each of 3 patterns has 2× En Quad)

**Status:** ✅ Done

---

#### TC-131: DotMatrixBoard — big mistake Figure Space after failed steal

**Related US:** US-028
**Type:** Component
**Priority:** High
**File:** `src/components/board/DotMatrixBoard.test.tsx`

**Test Steps:**
1. `selectTeam('left')`, `markMistake()` ×3 (triggers steal), then `markMistake()` (steal fails)
2. Render `<DotMatrixBoard />`
3. Assert container text CONTAINS U+2007 (Figure Space — big mistake pattern)

**Status:** ✅ Done

---

#### TC-132: DotMatrixBoard — small mistake chars in right cols when right team controls

**Related US:** US-028
**Type:** Component
**Priority:** High
**File:** `src/components/board/DotMatrixBoard.test.tsx`

**Test Steps:**
1. `selectTeam('right')`, `markMistake()`
2. Render `<DotMatrixBoard />`
3. Assert container text CONTAINS U+2000 (En Quad in right-side mistake cols)

**Status:** ✅ Done

---

#### TC-133: DotMatrixBoard — EM Space (U+2003) present in small mistake pattern

**Related US:** US-028
**Type:** Component
**Priority:** Medium
**File:** `src/components/board/DotMatrixBoard.test.tsx`

**Test Steps:**
1. `selectTeam('left')`, `markMistake()`
2. Render `<DotMatrixBoard />`
3. Assert container text CONTAINS U+2003 (EM Space — center cell of pattern)

**Status:** ✅ Done

---

### FEATURE-030: Question Selection Screen (US-030)

#### TC-134: QuestionSelectionScreen — renders question list with zero counter and disabled confirm

**Related US:** US-030
**Type:** Component
**Priority:** Critical
**File:** `src/components/screens/QuestionSelectionScreen.test.tsx`

**Test Steps:**
1. Set `questionBank` with 3 questions, `status: 'selectingQuestions'`
2. Render `<QuestionSelectionScreen />`
3. Assert heading "WYBÓR PYTAŃ", counter "Wybrano: 0 / 3 pytań", all question texts, ROZPOCZNIJ GRĘ disabled

**Status:** ✅ Done

---

#### TC-135: QuestionSelectionScreen — selecting a question shows order number, updates counter, enables confirm

**Related US:** US-030
**Type:** Component
**Priority:** Critical
**File:** `src/components/screens/QuestionSelectionScreen.test.tsx`

**Test Steps:**
1. Click first checkbox
2. Assert counter "Wybrano: 1 / 3 pytań", badge "1." visible, ROZPOCZNIJ GRĘ enabled

**Status:** ✅ Done

---

#### TC-136: QuestionSelectionScreen — deselecting removes order number and disables confirm

**Related US:** US-030
**Type:** Component
**Priority:** High
**File:** `src/components/screens/QuestionSelectionScreen.test.tsx`

**Test Steps:**
1. Check then uncheck first checkbox
2. Assert counter "Wybrano: 0 / 3 pytań", no "1." badge, ROZPOCZNIJ GRĘ disabled

**Status:** ✅ Done

---

#### TC-137: QuestionSelectionScreen — up/down buttons reorder selected questions

**Related US:** US-030
**Type:** Component
**Priority:** High
**File:** `src/components/screens/QuestionSelectionScreen.test.tsx`

**Test Steps:**
1. Select Q1 (1st) and Q2 (2nd)
2. Click "Przesuń w górę" on Q2
3. Assert Q2 shows badge "1.", Q1 shows badge "2."

**Status:** ✅ Done

---

#### TC-138: QuestionSelectionScreen — ROZPOCZNIJ GRĘ calls selectQuestions with questions in selection order

**Related US:** US-030
**Type:** Component
**Priority:** Critical
**File:** `src/components/screens/QuestionSelectionScreen.test.tsx`

**Test Steps:**
1. Select Q3 first, then Q1
2. Click ROZPOCZNIJ GRĘ
3. Assert `status === 'playing'`, `rounds[0].question === 'Pytanie 3?'`, `rounds[1].question === 'Pytanie 1?'`

**Status:** ✅ Done

---

#### TC-139: QuestionSelectionScreen — ← Wróć calls backToLobby

**Related US:** US-030
**Type:** Component
**Priority:** High
**File:** `src/components/screens/QuestionSelectionScreen.test.tsx`

**Test Steps:**
1. Click "← Wróć" button
2. Assert `status === 'lobby'`

**Status:** ✅ Done

---

#### TC-140: QuestionSelectionScreen — LOSUJ selects questions for fixed mode (numberOfRounds count)

**Related US:** US-030
**Type:** Component
**Priority:** High
**File:** `src/components/screens/QuestionSelectionScreen.test.tsx`

**Test Steps:**
1. Config fixed mode with `numberOfRounds: 2`, bank has 3 questions
2. Click LOSUJ
3. Assert exactly 2 checkboxes are checked, ROZPOCZNIJ GRĘ enabled

**Status:** ✅ Done

---

#### TC-141: QuestionSelectionScreen — shows "Liczba rund" for fixed mode and "Gra do pkt" for score mode

**Related US:** US-030
**Type:** Component
**Priority:** Medium
**File:** `src/components/screens/QuestionSelectionScreen.test.tsx`

**Test Steps:**
1. Fixed mode: select 1 question → assert "Liczba rund: 1" visible, "Gra do" absent
2. Score mode (winningScore: 150): assert "Gra do 150 pkt" visible, "Liczba rund" absent

**Status:** ✅ Done

---

#### TC-142: selectQuestions — sets rounds, transitions to playing, resets round state

**Related US:** US-030
**Type:** Unit (store)
**Priority:** Critical
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. `loadGame` + `loadBank` + `selectQuestions(questions)`
2. Assert `rounds === questions`, `status === 'playing'`, `currentRoundIndex === 0`, `currentRound.phase === 'showdown'`

**Status:** ✅ Done

---

#### TC-143: backToLobby — sets status to lobby while preserving questionBank

**Related US:** US-030
**Type:** Unit (store)
**Priority:** High
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. `loadBank(mockBankData)` → `backToLobby()`
2. Assert `status === 'lobby'`, `questionBank === mockBankData.questions`

**Status:** ✅ Done

---

#### TC-144: endRound — sets status to finished when score mode questions exhausted without reaching threshold

**Related US:** US-030
**Type:** Unit (store)
**Priority:** High
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Score mode with `winningScore: 200`, 1 round, reveal answer (30 pts), `endRound('left')`
2. Assert `status === 'finished'`, `teams.left.totalScore === 30`

**Status:** ✅ Done

---

#### TC-145: App — renders QuestionSelectionScreen when status is selectingQuestions

**Related US:** US-030
**Type:** Component (routing)
**Priority:** High
**File:** `src/App.test.tsx`

**Test Steps:**
1. Set `status: 'selectingQuestions'`, `questionBank` with 1 question
2. Render `<App />`
3. Assert heading "WYBÓR PYTAŃ" visible, "DALEJ" absent

**Status:** ✅ Done

---

### FEATURE-013: In-App Question Editor (US-031)

#### TC-146: questionBankStorage — saveQuestionBank persists; loadQuestionBank retrieves

**Related US:** US-031
**Type:** Unit
**Priority:** Critical
**File:** `src/utils/questionBankStorage.test.ts`

**Test Steps:**
1. Call `saveQuestionBank` with mock questions
2. Call `loadQuestionBank`
3. Assert returned array equals saved questions and localStorage key is set

**Status:** ✅ Done

---

#### TC-147: questionBankStorage — loadQuestionBank returns null when nothing stored

**Related US:** US-031
**Type:** Unit
**Priority:** High
**File:** `src/utils/questionBankStorage.test.ts`

**Test Steps:**
1. Clear localStorage
2. Call `loadQuestionBank`
3. Assert result is null

**Status:** ✅ Done

---

#### TC-148: questionBankStorage — loadQuestionBank returns null for invalid JSON or non-array

**Related US:** US-031
**Type:** Unit
**Priority:** High
**File:** `src/utils/questionBankStorage.test.ts`

**Test Steps:**
1. Store invalid JSON string under the key
2. Assert `loadQuestionBank` returns null
3. Store a JSON object (non-array)
4. Assert `loadQuestionBank` returns null

**Status:** ✅ Done

---

#### TC-149: shuffle — shuffled preserves all elements without mutating original

**Related US:** US-031
**Type:** Unit
**Priority:** High
**File:** `src/utils/shuffle.test.ts`

**Test Steps:**
1. Call `shuffled([1,2,3,4,5])`
2. Assert result has same length and same elements (sorted)
3. Assert original array is unchanged

**Status:** ✅ Done

---

#### TC-150: shuffle — shuffled handles empty array

**Related US:** US-031
**Type:** Unit
**Priority:** Medium
**File:** `src/utils/shuffle.test.ts`

**Test Steps:**
1. Call `shuffled([])`
2. Assert result is `[]`

**Status:** ✅ Done

---

#### TC-151: QuestionEditorList — renders question list, count, empty state, and add button

**Related US:** US-031
**Type:** Component
**Priority:** High
**File:** `src/components/screens/QuestionEditorList.test.tsx`

**Test Steps:**
1. Render with empty questions array
2. Assert "Brak pytań w banku", empty state message, and add button visible
3. Render with 2 questions
4. Assert "2 pytań w banku" and both question texts visible

**Status:** ✅ Done

---

#### TC-152: QuestionEditorList — onEdit/onDelete/onAddNew callbacks fired with correct index

**Related US:** US-031
**Type:** Component
**Priority:** High
**File:** `src/components/screens/QuestionEditorList.test.tsx`

**Test Steps:**
1. Render with 2 questions
2. Click second Edytuj → assert `onEdit(1)` called
3. Click first Usuń → assert `onDelete(0)` called
4. Click + Dodaj pytanie → assert `onAddNew` called

**Status:** ✅ Done

---

#### TC-153: QuestionEditorForm — renders empty form for new question and pre-fills when editing

**Related US:** US-031
**Type:** Component
**Priority:** High
**File:** `src/components/screens/QuestionEditorForm.test.tsx`

**Test Steps:**
1. Render without `initialQuestion` — assert question input empty, 2 empty answer rows
2. Render with `initialQuestion` — assert question text, answer text, and points pre-filled

**Status:** ✅ Done

---

#### TC-154: QuestionEditorForm — valid form calls onSave with trimmed data

**Related US:** US-031
**Type:** Component
**Priority:** Critical
**File:** `src/components/screens/QuestionEditorForm.test.tsx`

**Test Steps:**
1. Fill question text, 2 answers with points
2. Click Zapisz
3. Assert `onSave` called with correct `{ question, answers }` structure and parsed integer points

**Status:** ✅ Done

---

#### TC-155: QuestionEditorForm — shows validation errors for empty/invalid input

**Related US:** US-031
**Type:** Component
**Priority:** High
**File:** `src/components/screens/QuestionEditorForm.test.tsx`

**Test Steps:**
1. Click Zapisz without filling anything
2. Assert "Treść pytania jest wymagana", "Treść odpowiedzi jest wymagana", "Punkty muszą być liczbą całkowitą większą od 0" visible

**Status:** ✅ Done

---

#### TC-156: FinalRoundSelectionScreen — auto-selects all and hides LOSUJ when exactly 5 available

**Related US:** US-031
**Type:** Component
**Priority:** High
**File:** `src/components/screens/FinalRoundSelectionScreen.test.tsx`

**Test Steps:**
1. Set `availableForFinal` to exactly 5 questions
2. Assert all checkboxes checked, LOSUJ button absent, ROZPOCZNIJ GRĘ enabled

**Status:** ✅ Done

---

#### TC-157: FinalRoundSelectionScreen — LOSUJ visible for >5 available; selects exactly 5

**Related US:** US-031
**Type:** Component
**Priority:** High
**File:** `src/components/screens/FinalRoundSelectionScreen.test.tsx`

**Test Steps:**
1. Set `availableForFinal` to 8 questions
2. Assert LOSUJ button visible
3. Click LOSUJ — assert exactly 5 checkboxes checked

**Status:** ✅ Done

---

#### TC-158: FinalRoundSelectionScreen — ROZPOCZNIJ GRĘ calls selectFinalQuestions when 5 selected

**Related US:** US-031
**Type:** Component
**Priority:** Critical
**File:** `src/components/screens/FinalRoundSelectionScreen.test.tsx`

**Test Steps:**
1. Set `availableForFinal` to 6 questions
2. Assert confirm button disabled initially
3. Select 5 questions — assert button enabled
4. Click ROZPOCZNIJ GRĘ — assert `finalRoundQuestions.length === 5`, `status === 'playing'`

**Status:** ✅ Done

---

#### TC-159: FinalRoundSelectionScreen — ← Wróć calls backToMainSelection

**Related US:** US-031
**Type:** Component
**Priority:** Medium
**File:** `src/components/screens/FinalRoundSelectionScreen.test.tsx`

**Test Steps:**
1. Render screen
2. Click ← Wróć do pytań głównych
3. Assert `status === 'selectingQuestions'`

**Status:** ✅ Done

---

#### TC-160: updateQuestionBank — updates store and persists to localStorage

**Related US:** US-031
**Type:** Unit (store)
**Priority:** Critical
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `updateQuestionBank` with mock questions
2. Assert `questionBank` in store equals mock
3. Assert `localStorage.getItem('familiada-question-bank')` is not null

**Status:** ✅ Done

---

#### TC-161: goToQuestionEditor — sets status to editingQuestions

**Related US:** US-031
**Type:** Unit (store)
**Priority:** High
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `goToQuestionEditor`
2. Assert `status === 'editingQuestions'`

**Status:** ✅ Done

---

#### TC-162: backToLobbyFromEditor — sets status to lobby

**Related US:** US-031
**Type:** Unit (store)
**Priority:** High
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `goToQuestionEditor` then `backToLobbyFromEditor`
2. Assert `status === 'lobby'`

**Status:** ✅ Done

---

#### TC-163: selectFinalQuestions — sets finalRoundQuestions, transitions to playing, resets round

**Related US:** US-031
**Type:** Unit (store)
**Priority:** Critical
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `selectFinalQuestions` with 5 mock questions
2. Assert `finalRoundQuestions` equals passed questions
3. Assert `status === 'playing'`, `currentRoundIndex === 0`, `currentRound.phase === 'showdown'`

**Status:** ✅ Done

---

#### TC-164: backToMainSelection — sets status to selectingQuestions

**Related US:** US-031
**Type:** Unit (store)
**Priority:** High
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `backToMainSelection`
2. Assert `status === 'selectingQuestions'`

**Status:** ✅ Done

---

#### TC-165: setBoardLayout — defaults to teamPanelRatio 15

**Related US:** US-039
**Type:** Unit (store)
**Priority:** High
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Read `boardLayout.teamPanelRatio` from fresh store
2. Assert value equals 15

**Status:** ✅ Done

---

#### TC-166: setBoardLayout — updates ratio and persists to localStorage

**Related US:** US-039
**Type:** Unit (store)
**Priority:** High
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `setBoardLayout(25)`
2. Assert `boardLayout.teamPanelRatio === 25`
3. Assert `localStorage.getItem('familiada-board-layout')` contains `{ teamPanelRatio: 25 }`

**Status:** ✅ Done

---

#### TC-167: setBoardLayout — clamps ratio below minimum to 15

**Related US:** US-039
**Type:** Unit (store)
**Priority:** Medium
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `setBoardLayout(5)`
2. Assert `boardLayout.teamPanelRatio === 15`

**Status:** ✅ Done

---

#### TC-168: setBoardLayout — clamps ratio above maximum to 60

**Related US:** US-039
**Type:** Unit (store)
**Priority:** Medium
**File:** `src/store/gameStore.test.ts`

**Test Steps:**
1. Call `setBoardLayout(99)`
2. Assert `boardLayout.teamPanelRatio === 60`

**Status:** ✅ Done

---

#### TC-169: BoardLayoutControl — renders slider with current ratio and percentage label

**Related US:** US-039
**Type:** Component
**Priority:** High
**File:** `src/components/operator/BoardLayoutControl.test.tsx`

**Test Steps:**
1. Set store `boardLayout.teamPanelRatio = 20`
2. Render `<BoardLayoutControl />`
3. Assert slider value equals `"20"`
4. Assert label text `"20%"` is visible

**Status:** ✅ Done

---

#### TC-170: BoardLayoutControl — calls store update when slider changes

**Related US:** US-039
**Type:** Component
**Priority:** High
**File:** `src/components/operator/BoardLayoutControl.test.tsx`

**Test Steps:**
1. Render `<BoardLayoutControl />`
2. Press ArrowRight on the slider
3. Assert `boardLayout.teamPanelRatio > 15`

**Status:** ✅ Done

---

#### TC-171: TeamScore — applies larger panel width when panelWidthPercent increases

**Related US:** US-039
**Type:** Component
**Priority:** High
**File:** `src/components/board/TeamScore.test.tsx`

**Test Steps:**
1. Render `<TeamScore panelWidthPercent={15} />` and `<TeamScore panelWidthPercent={30} />`
2. Parse `style.width` of root element in each
3. Assert larger ratio produces wider panel

**Status:** ✅ Done

---

#### TC-172: useBroadcast — boardLayout included in SYNC_STATE payload

**Related US:** US-039
**Type:** Integration (hook)
**Priority:** High
**File:** `src/hooks/useBroadcast.test.ts`

**Test Steps:**
1. Mount `useBroadcast` hook (operator window)
2. Call `setBoardLayout(40)`
3. Assert `postMessage` called with `{ type: 'SYNC_STATE', payload: { boardLayout: { teamPanelRatio: 40 } } }`

**Status:** ✅ Done

---

## 4. Test Data

### 4.1 Mock Game Data

```typescript
const mockGameData = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 2,
    multipliers: [1, 2],
    teams: {
      left: { name: 'Team A' },
      right: { name: 'Team B' }
    }
  },
  rounds: [
    {
      question: 'Test question?',
      answers: [
        { text: 'Answer 1', points: 30 },
        { text: 'Answer 2', points: 20 }
      ]
    }
  ]
};
```

---

## 5. Coverage Report

*Updated after each /qa session*

| Module | Statements | Branches | Functions | Lines |
|--------|------------|----------|-----------|-------|
| store/ | -% | -% | -% | -% |
| utils/ | -% | -% | -% | -% |
| components/ | -% | -% | -% | -% |
| **Total** | -% | -% | -% | -% |

---

*This document is owned by /qa agent and updated after each test session.*
