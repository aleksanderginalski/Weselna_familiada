# Current Task — US-039

## Context
Add a board layout proportion slider to the operator panel that controls
the width of team score panels on the game board. The setting persists in
localStorage and syncs to the board window via the existing BroadcastChannel
SYNC_STATE mechanism (no new message types needed — boardLayout becomes part
of GameState and is broadcast automatically on every store change).

Range: 15–30% per team panel. Default: 15 (minimum — current layout).

## Read
- src/types/game.ts              — add boardLayout to GameState
- src/store/gameStore.ts         — add boardLayout to INITIAL_STATE + setBoardLayout action
- src/hooks/useBroadcast.ts      — add boardLayout to extractGameState()
- src/components/board/GameBoard.tsx     — apply dynamic teamPanelRatio width
- src/components/board/TeamScore.tsx     — font scaling with panel width
- src/components/operator/OperatorPanel.tsx   — place new BoardLayoutControl
- src/components/operator/VolumeSlider.tsx    — reference pattern for slider UI

## Tasks

1. **types/game.ts** — add `boardLayout: { teamPanelRatio: number }` field to
   `GameState` interface.

2. **store/gameStore.ts**
   - Add localStorage key constant: `BOARD_LAYOUT_STORAGE_KEY = 'familiada-board-layout'`
   - Add helper to load from localStorage (falls back to `{ teamPanelRatio: 15 }`)
   - Add `boardLayout` to `INITIAL_STATE` (loaded from localStorage on init)
   - Add `setBoardLayout(ratio: number): void` action — updates state and
     writes to localStorage

3. **hooks/useBroadcast.ts** — add `boardLayout: store.boardLayout` to
   `extractGameState()` so it is included in every SYNC_STATE broadcast.

4. **components/operator/BoardLayoutControl.tsx** — new component.
   - Slider input, range 15–30, step 1, label "Panele drużyn"
   - Reads current value from store; calls `setBoardLayout` on change
   - Style consistent with VolumeSlider (accent-familiada-gold, dark text,
     numeric readout next to the slider)

5. **components/operator/OperatorPanel.tsx** — import and render
   `<BoardLayoutControl />` in the header `<div>`, between VolumeSlider and
   the "Otwórz Tablicę" button.

6. **components/board/GameBoard.tsx** — read `boardLayout.teamPanelRatio`
   from store. Replace `shrink-0` on both team panel wrappers with an inline
   `style={{ width: \`\${teamPanelRatio}%\` }}` so they grow/shrink
   symmetrically; the center DotMatrixBoard wrapper stays `flex-1 min-w-0`.

7. **components/board/TeamScore.tsx** — make team name and score font scale
   with the panel. Pass a `panelWidthPercent` prop (number) and derive
   `fontSize` via a small inline calculation:
   `clamp(0.75rem, {ratio}vw, 1.5rem)` for the name span, and scale
   `digitFontSize` on DigitDisplay proportionally
   (e.g. `\`\${Math.max(1.2, ratio * 0.12)}rem\``).
   GameBoard passes the value from the store.

## Constraints
- Do NOT add a new GameAction type — existing SYNC_STATE propagation is sufficient
- Do NOT reset boardLayout on startGame, nextRound, or resetGame — it is a
  global setting independent of game flow
- No `any` types; use explicit TypeScript
- localStorage read/write only in the store (not in components)
- Max component length: 300 lines; max function length: 50 lines
- BoardLayoutControl must be visible at all times (lobby, playing, winner screen)
  because it lives in the persistent OperatorPanel header

## After implementation
- Run linter: `npm run lint`
- Run tests: `npm test`
- Manual verification steps (in Polish):
  1. Otwórz panel operatora — sprawdź, że suwak "Panele drużyn" jest widoczny
     w nagłówku na każdym ekranie (lobby, gra, zwycięzca).
  2. Otwórz tablicę ("Otwórz Tablicę") na drugim ekranie.
  3. Przesuń suwak w prawo — sprawdź, że oba panele drużyn na tablicy
     rozszerzają się symetrycznie w czasie rzeczywistym.
  4. Sprawdź, że tekst nazwy drużyny i cyfry wyników skalują się z panelem.
  5. Wróć do minimum — sprawdź, że tablica odpowiedzi zajmuje maksimum.
  6. Odśwież aplikację — suwak powinien być na ostatnio ustawionym miejscu.
  7. Uruchom rundę i przejdź do następnej — sprawdź, że ustawienie nie
     zresetowało się.
