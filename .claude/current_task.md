# Current Task — US-037

## Context
Add score milestone visual effects and 2000-point game end condition.
The `DigitDisplay` component is capped at 999 — scores ≥1000 already wrap around visually.
A gold glow on the display border communicates the wrap to players. When a team's score
reaches or exceeds 2000 after `endRound`, the game ends immediately (status → 'finished').

## Read
- src/components/shared/DigitDisplay.tsx — add `glowLevel` prop for milestone glow
- src/components/board/TeamScore.tsx — pass `glowLevel` based on totalScore
- src/store/gameStore.ts — add `isScoreMilestoneEnd` condition in `endRound`

## Tasks

1. **src/components/shared/DigitDisplay.tsx**:
   - Add optional prop `glowLevel?: 0 | 1 | 2` (default `0`)
   - Add constant `SCORE_MILESTONE_1 = 1000` and `SCORE_MILESTONE_2 = 2000`
   - Apply a gold box-shadow/ring to the outer border `<div>` when `glowLevel >= 1`:
     - `glowLevel === 1` (score ≥ 1000): `shadow-[0_0_12px_4px_#d4af37]`
     - `glowLevel === 2` (score ≥ 2000): `shadow-[0_0_24px_8px_#d4af37]`
   - Glow must NOT change layout or dimensions (use `shadow-*` only, no border change)

2. **src/components/board/TeamScore.tsx**:
   - Read `team.totalScore` (already available)
   - Compute `glowLevel`: `totalScore >= 2000 ? 2 : totalScore >= 1000 ? 1 : 0`
   - Pass `glowLevel` to `<DigitDisplay>`

3. **src/store/gameStore.ts** — inside `endRound`:
   - After computing `newScore`, also compute `otherTeamScore = state.teams[otherSide].totalScore`
   - Add `isScoreMilestoneEnd`: `newScore >= 2000 || otherTeamScore >= 2000`
   - Add `isScoreMilestoneEnd` to the `status: 'finished'` condition alongside existing flags

## Constraints
- `glowLevel` is computed in `TeamScore`, not inside `DigitDisplay` — keep display logic dumb
- Do not add the glow to `RoundScore`, `FinalRoundGameBoard`, or any other `DigitDisplay` usage
- No layout changes — `shadow-*` utilities only
- Do not use `any` type
- Keep each modified function under 50 lines

## After implementation
- Run linter: `npm run lint`
- Run tests: `npm test`

## Manual verification steps (Polish)
1. Uruchom aplikację (`npm run dev`), otwórz tablicę w nowym oknie
2. Przejdź przez Lobby → wybór pytań → rozpocznij grę
3. Użyj przycisku `+5` lub zmień wynik ręcznie do wartości ≥ 1000 dla jednej drużyny
4. Sprawdź, że na tablicy wynik tej drużyny otacza złota poświata (słabsza)
5. Zwiększ wynik do ≥ 2000 — sprawdź, że poświata jest silniejsza/szersza
6. Zakończ rundę — sprawdź, że gra kończy się automatycznie (ekran zwycięstwa lub przyciski
   "Ogłoś zwycięstwo" / "Runda finałowa", bez "Następna runda")
7. Sprawdź, że pozostałe wyświetlacze (pula punktów, finał) NIE mają poświaty
