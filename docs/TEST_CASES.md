# TEST_CASES.md — Weselna Familiada

## Coverage Summary

| File | Tests | Status |
|------|-------|--------|
| src/types/game.test.ts | 17 | ✅ |
| src/store/gameStore.test.ts | 54 | ✅ |
| src/hooks/useBroadcast.test.ts | 4 | ✅ |
| src/hooks/useSound.test.ts | 6 | ✅ |
| src/utils/broadcast.test.ts | 4 | ✅ |
| src/components/board/AnswerRow.test.tsx | 3 | ✅ |
| src/components/board/AnswerBoard.test.tsx | 3 | ✅ |
| src/components/board/TeamScore.test.tsx | 3 | ✅ |
| src/components/board/RoundScore.test.tsx | 3 | ✅ |
| src/components/board/AnswerSum.test.tsx | 2 | ✅ |
| src/components/board/MistakeIndicator.test.tsx | 6 | ✅ |
| src/components/board/DotMatrixBoard.test.tsx | 7 | ✅ |
| src/components/board/GameBoard.test.tsx | 3 | ✅ |
| src/components/board/FinalRoundBoard.test.tsx | 5 | ✅ |
| src/components/operator/AnswerControl.test.tsx | 5 | ✅ |
| src/components/operator/TeamPanel.test.tsx | 4 | ✅ |
| src/components/operator/TeamControl.test.tsx | 10 | ✅ |
| src/components/operator/RoundControls.test.tsx | 6 | ✅ |
| src/components/operator/OperatorPanel.test.tsx | 6 | ✅ |
| src/components/operator/VolumeSlider.test.tsx | 2 | ✅ |
| src/components/operator/FinalRoundOperator.test.tsx | 1 | ✅ |
| src/components/screens/LobbyScreen.test.tsx | 7 | ✅ |
| src/components/screens/WinnerScreen.test.tsx | 6 | ✅ |
| src/App.test.tsx | 5 | ✅ |
| src/test/lintingConfig.test.ts | 11 | ✅ |
| src/test/tailwindTheme.test.ts | 5 | ✅ |
| src/test/projectStructure.test.ts | 21 | ✅ |
| **TOTAL** | **241** | ✅ |

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

---

## src/store/gameStore.test.ts — setVolume (US-023)

| # | Test | Type |
|---|------|------|
| TC-125 | should default volume to 80 | happy path |
| TC-126 | should update volume when setVolume is called | happy path |

---

## src/hooks/useSound.test.ts — volume (US-023)

| # | Test | Type |
|---|------|------|
| TC-127 | should return volume 80 and setVolume function by default | happy path |
| TC-128 | should call Howler.volume with volume/100 on mount | happy path |
| TC-129 | should call Howler.volume with updated value when setVolume is called | happy path |

---

## src/components/operator/VolumeSlider.test.tsx (US-023)

**Component:** `VolumeSlider`

| # | Test | Type |
|---|------|------|
| TC-130 | should render slider with current value and percentage label | happy path |
| TC-131 | should call onChange with numeric value when slider changes | interaction |

---

## src/components/operator/FinalRoundOperator.test.tsx (US-023)

**Component:** `FinalRoundOperator`

| # | Test | Type |
|---|------|------|
| TC-132 | should render mute button and volume slider in header | happy path |

---

## src/store/gameStore.test.ts — loadBank (US-029)

| # | Test | Type |
|---|------|------|
| TC-133 | should store questions in questionBank and auto-select all as rounds | happy path |
| TC-134 | should default to empty arrays when questions is undefined | boundary |
| TC-135 | should replace questionBank and rounds when called a second time | boundary |
| TC-136 | should not affect config, status, or team scores | isolation |

---

## src/types/game.test.ts — question bank types (US-029)

| # | Test | Type |
|---|------|------|
| TC-137 | GameDataFile — should contain config only (questions loaded separately from bank) | happy path |
| TC-138 | QuestionBankFile — should contain a questions array | happy path |
| TC-139 | QuestionBankEntry — should extend RoundData with an optional category | happy path |
| TC-140 | QuestionBankEntry — should allow category to be omitted | boundary |

---

## src/components/screens/LobbyScreen.test.tsx — loadBank integration (US-029)

| # | Test | Type |
|---|------|------|
| TC-141 | should populate questionBank in store after fetching pytania-bank.json | integration |

---

## src/store/gameStore.test.ts — adjustScore (US-036)

| # | Test | Type |
|---|------|------|
| TC-165 | should increase team score by delta and leave the other team unchanged | happy path |
| TC-166 | should decrease team score by delta when result is above 0 | happy path |
| TC-167 | should floor score at 0 when delta would make it negative | boundary |

---

## src/components/operator/TeamControl.test.tsx — score adjustment buttons (US-036)

| # | Test | Type |
|---|------|------|
| TC-168 | should render −5 and +5 buttons for each team | happy path |
| TC-169 | should increase team score when +5 is clicked and decrease when −5 is clicked, floored at 0 | interaction + boundary |

---

## src/store/gameStore.test.ts — markShowdownAttempt (US-038)

| # | Test | Type |
|---|------|------|
| TC-170 | should set showdownWrongTeam to the specified side | happy path |
| TC-171 | should replace showdownWrongTeam when called with the other side | transfer |
| TC-172 | selectTeam should reset showdownWrongTeam to null | reset |

---

## src/components/operator/TeamControl.test.tsx — showdown wrong attempt (US-038)

| # | Test | Type |
|---|------|------|
| TC-173 | should show Błędna Próba buttons only in showdown phase | happy path |
| TC-174 | should disable clicked team button and re-enable other team button after markShowdownAttempt | interaction |
| TC-175 | should disable radio buttons in summary phase to prevent team switch after round ends | bugfix |

---

## src/components/board/DotMatrixBoard.test.tsx — showdown X (US-038)

| # | Test | Type |
|---|------|------|
| TC-176 | should render big mistake Figure Space chars during showdown when markShowdownAttempt is called | happy path |

