# Weselna Familiada - Test Cases Documentation

**Version:** 1.3  
**Date:** 2026-04-05  
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
