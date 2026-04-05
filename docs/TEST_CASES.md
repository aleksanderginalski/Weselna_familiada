# TEST_CASES.md — Weselna Familiada

## Coverage Summary

| File | Tests | Status |
|------|-------|--------|
| src/types/game.test.ts | 14 | ✅ |
| src/store/gameStore.test.ts | 15 | ✅ |
| src/hooks/useBroadcast.test.ts | 4 | ✅ |
| src/utils/broadcast.test.ts | 4 | ✅ |
| src/components/board/AnswerRow.test.tsx | 3 | ✅ |
| src/components/board/AnswerBoard.test.tsx | 3 | ✅ |
| src/components/board/TeamScore.test.tsx | 3 | ✅ |
| src/components/board/RoundScore.test.tsx | 3 | ✅ |
| src/components/board/AnswerSum.test.tsx | 2 | ✅ |
| src/components/board/MistakeIndicator.test.tsx | 6 | ✅ |
| src/components/board/GameBoard.test.tsx | 3 | ✅ |
| src/components/operator/AnswerControl.test.tsx | 5 | ✅ |
| src/components/operator/TeamPanel.test.tsx | 4 | ✅ |
| src/components/operator/TeamControl.test.tsx | 5 | ✅ |
| src/components/operator/RoundControls.test.tsx | 5 | ✅ |
| src/components/operator/OperatorPanel.test.tsx | 4 | ✅ |
| src/components/screens/LobbyScreen.test.tsx | 6 | ✅ |
| src/App.test.tsx | 3 | ✅ |
| src/test/lintingConfig.test.ts | 11 | ✅ |
| src/test/tailwindTheme.test.ts | 2 | ✅ |
| src/test/projectStructure.test.ts | 18 | ✅ |
| **TOTAL** | **123** | ✅ |

---

## src/components/operator/OperatorPanel.test.tsx

**Component:** `OperatorPanel`

| # | Test | Type |
|---|------|------|
| 1 | should render header with title and open-board button | happy path |
| 2 | should show current question when game data is loaded | happy path |
| 3 | should not show question section when no rounds loaded | boundary |
| 4 | should open board window when Otwórz Tablicę is clicked | interaction |

---

## src/components/screens/LobbyScreen.test.tsx

**Component:** `LobbyScreen`

| # | Test | Type |
|---|------|------|
| 1 | should show loading state then render form with pre-filled values from JSON | happy path |
| 2 | should show error message when fetch fails | error state |
| 3 | should show winningScore field when score mode is selected | conditional render |
| 4 | should disable Start Game button when a team name is empty | boundary |
| 5 | should call loadGame and startGame with edited config when Start Game is clicked | interaction |
| 6 | should pass winningScore config when score mode selected before starting | interaction |

---

## src/App.test.tsx

**Component:** `App`

| # | Test | Type |
|---|------|------|
| 1 | should render lobby screen when status is lobby | happy path |
| 2 | should render operator panel when status is playing | happy path |
| 3 | should not render lobby screen when status is playing | boundary |
