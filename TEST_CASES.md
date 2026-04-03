# Weselna Familiada - Test Cases Documentation

**Version:** 1.1  
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

### FEATURE-002: Game State Management

#### TC-001: Load game from JSON

**Related US:** US-003  
**Type:** Unit  
**Priority:** Critical

**Test Steps:**
1. Call loadGame with valid JSON data
2. Verify config is set correctly
3. Verify rounds are loaded

**Status:** 📋 Planned

---

#### TC-002: Reveal answer updates state

**Related US:** US-003  
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

**Related US:** US-003  
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
