# Weselna Familiada - Test Cases Documentation

**Version:** 1.2  
**Date:** 2026-04-03  
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
1. Create one instance of every `GameAction` variant (9 total)
2. Process all via a switch statement
3. Verify all 9 are handled

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

### FEATURE-002: Game State Management

#### TC-001: Load game from JSON

**Related US:** US-007  
**Type:** Unit  
**Priority:** Critical

**Test Steps:**
1. Call loadGame with valid JSON data
2. Verify config is set correctly
3. Verify rounds are loaded

**Status:** 📋 Planned

---

#### TC-002: Reveal answer updates state

**Related US:** US-007  
**Type:** Unit  
**Priority:** Critical

**Test Steps:**
1. Load game with test data
2. Call revealAnswer(0)
3. Verify revealedAnswers contains 0
4. Verify roundScore is updated

**Status:** 📋 Planned

---

#### TC-003: Three mistakes trigger steal

**Related US:** US-007  
**Type:** Unit  
**Priority:** Critical

**Test Steps:**
1. Load game, select team
2. Call markMistake() three times
3. Verify phase changes to 'steal'
4. Verify controlling team switches

**Status:** 📋 Planned

---

### FEATURE-003: Game Board Display

#### TC-004: AnswerRow shows hidden state

**Related US:** US-005  
**Type:** Component  
**Priority:** High

**Test Steps:**
1. Render AnswerRow with isRevealed=false
2. Verify masked text is shown
3. Verify points are hidden

**Status:** 📋 Planned

---

#### TC-005: AnswerRow shows revealed state

**Related US:** US-005  
**Type:** Component  
**Priority:** High

**Test Steps:**
1. Render AnswerRow with isRevealed=true
2. Verify answer text is shown
3. Verify points are visible

**Status:** 📋 Planned

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
