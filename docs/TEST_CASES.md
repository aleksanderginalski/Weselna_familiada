# TEST_CASES.md — Weselna Familiada

## Coverage Summary

| File | Tests | Status |
|------|-------|--------|
| src/types/game.test.ts | 14 | ✅ |
| src/store/gameStore.test.ts | 34 | ✅ |
| src/hooks/useBroadcast.test.ts | 4 | ✅ |
| src/hooks/useSound.test.ts | 3 | ✅ |
| src/utils/broadcast.test.ts | 4 | ✅ |
| src/components/board/AnswerRow.test.tsx | 3 | ✅ |
| src/components/board/AnswerBoard.test.tsx | 3 | ✅ |
| src/components/board/TeamScore.test.tsx | 3 | ✅ |
| src/components/board/RoundScore.test.tsx | 3 | ✅ |
| src/components/board/AnswerSum.test.tsx | 2 | ✅ |
| src/components/board/MistakeIndicator.test.tsx | 6 | ✅ |
| src/components/board/GameBoard.test.tsx | 3 | ✅ |
| src/components/board/FinalRoundBoard.test.tsx | 5 | ✅ |
| src/components/operator/AnswerControl.test.tsx | 5 | ✅ |
| src/components/operator/TeamPanel.test.tsx | 4 | ✅ |
| src/components/operator/TeamControl.test.tsx | 5 | ✅ |
| src/components/operator/RoundControls.test.tsx | 6 | ✅ |
| src/components/operator/OperatorPanel.test.tsx | 6 | ✅ |
| src/components/screens/LobbyScreen.test.tsx | 6 | ✅ |
| src/components/screens/WinnerScreen.test.tsx | 6 | ✅ |
| src/App.test.tsx | 5 | ✅ |
| src/test/lintingConfig.test.ts | 11 | ✅ |
| src/test/tailwindTheme.test.ts | 2 | ✅ |
| src/test/projectStructure.test.ts | 18 | ✅ |
| **TOTAL** | **161** | ✅ |

---

## src/hooks/useSound.test.ts

**Hook:** `useSound`

| # | Test | Type |
|---|------|------|
| TC-096 | should return all play functions, isMuted false by default, and toggleMute | happy path |
| TC-097 | should call play() when a play function is invoked and not muted | happy path |
| TC-098 | should not call play() when muted | boundary |

---

## src/components/operator/OperatorPanel.test.tsx

**Component:** `OperatorPanel`

| # | Test | Type |
|---|------|------|
| 1 | should render header with title and open-board button | happy path |
| 2 | should show current question when game data is loaded | happy path |
| 3 | should not show question section when no rounds loaded | boundary |
| 4 | should open board window when Otwórz Tablicę is clicked | interaction |
| TC-102 | should render mute button with "Wycisz" label when not muted | happy path |
| TC-103 | should display "Włącz dźwięk" after mute button is clicked | interaction |

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

## src/store/gameStore.test.ts — final round actions (US-026)

| # | Test | Type |
|---|------|------|
| TC-104 | should set status to finished when last fixed round ends | happy path |
| TC-105 | should not set status to finished when there are more rounds remaining | boundary |
| TC-106 | should set showingWinner to true on declareWinner | happy path |
| TC-107 | should set status to finalRound and initialize playerA/B with 5 pending answers | happy path |
| TC-108 | should start and stop the timer | happy path |
| TC-109 | should adjust timer by delta, respecting minimum of 5 | boundary |
| TC-110 | should decrement timer on tick and stop when reaching 0 | boundary |
| TC-111 | should move from answeringA to revealingA and stop timer on advanceToRevealPhase | happy path |
| TC-112 | should reveal an answer for player A at the given index | happy path |
| TC-113 | should make points visible for the given index after showFinalAnswerPoints | happy path |
| TC-114 | should hide player A answers, advance to answeringB and reset timer | happy path |
| TC-115 | should set status to finished, showingWinner to true, and phase to finished on finishFinalRound | happy path |
| TC-116 | should clear finalRound and showingWinner when resetting | happy path |

---

## src/components/operator/RoundControls.test.tsx — end-game choice (US-026)

| # | Test | Type |
|---|------|------|
| TC-117 | should show end-game choice buttons and hide NASTĘPNA RUNDA when last fixed round ends | happy path |

---

## src/components/board/FinalRoundBoard.test.tsx (US-026)

**Component:** `FinalRoundBoard`

| # | Test | Type |
|---|------|------|
| TC-120 | should render 5 rows with ? in all point cells and SUMA: 0 when no answers revealed | happy path |
| TC-121 | should show revealed answer text and points when answer is revealed and pointsVisible | happy path |
| TC-122 | should hide player A answer texts when playerAHidden is true but keep points | boundary |
| TC-123 | should display the timer when timerSecondsLeft is greater than 0 | happy path |
| TC-124 | should render nothing when finalRound is undefined | boundary |

---

## src/App.test.tsx

**Component:** `App`

| # | Test | Type |
|---|------|------|
| 1 | should render lobby screen when status is lobby | happy path |
| 2 | should render operator panel when status is playing | happy path |
| 3 | should not render lobby screen when status is playing | boundary |
| 4 | should show end game choice buttons when last round finished and winner not declared | happy path |
| 5 | should render winner screen when status is finished and winner is declared | happy path |

---

## src/store/gameStore.test.ts — toggleMute (US-022)

| # | Test | Type |
|---|------|------|
| TC-099 | should default isMuted to false | happy path |
| TC-100 | should set isMuted to true on first toggle | happy path |
| TC-101 | should set isMuted back to false on second toggle | boundary |

---

## src/components/screens/WinnerScreen.test.tsx

**Component:** `WinnerScreen`

| # | Test | Type |
|---|------|------|
| TC-088 | should display winner name, winner score, loser score, and NOWA GRA button when left team wins | happy path |
| TC-089 | should display right team as winner when right score is higher | happy path |
| TC-090 | should display REMIS when both teams have equal scores | boundary |
| TC-091 | should transition status to lobby when NOWA GRA is clicked | interaction |
| TC-118 | should show calculated final score and team name when finalRound is present | happy path |
| TC-119 | should add 25000 bonus when final sum is 200 or more | boundary |
