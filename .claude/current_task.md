# Current Task — US-030

## Context

Add a question selection screen between Lobby and the first round. After configuring the game in LobbyScreen, the operator is taken to a new `QuestionSelectionScreen` instead of directly starting the game. Here they can manually check/uncheck questions from the full bank, use a "Draw randomly" button, and reorder the selection with up/down arrows. Confirming the selection locks the chosen questions as `rounds` in the store and starts the game.

Currently `loadBank` auto-selects all questions as rounds (placeholder for this US). After this US, the user explicitly selects which questions to play.

A new `GameStatus` value `'selectingQuestions'` is introduced to route to the new screen.

## Read

- `src/types/game.ts` — `GameStatus`, `GameState`, `QuestionBankEntry`
- `src/store/gameStore.ts` — `loadBank`, `startGame`, `StoreActions`, `INITIAL_STATE`
- `src/components/screens/LobbyScreen.tsx` — current flow: calls `loadGame` + `startGame` directly
- `src/App.tsx` — routing by `status`
- `public/pytania-bank.json` — reference structure of bank entries

## Tasks

1. **TASK-030.1 — GameStatus:** In `src/types/game.ts`, add `'selectingQuestions'` to the `GameStatus` union type.

2. **TASK-030.2 — Store actions:** In `src/store/gameStore.ts`:
   - Add `selectQuestions: (questions: QuestionBankEntry[]) => void` to `StoreActions`
   - Implement `selectQuestions`: sets `rounds` to the provided questions array and sets `status` to `'playing'`
   - Update `loadBank`: remove the auto-select of `rounds` (set `rounds: []` instead of `data.questions`), and set `status: 'selectingQuestions'` after loading the bank
   - Update `resetGame`: set `status: 'selectingQuestions'` (so after a reset the operator goes back to question selection, not lobby — the bank is already loaded)
   - Keep `startGame` unchanged (it is still called by LobbyScreen to transition from lobby)

3. **TASK-030.3 — LobbyScreen:** In `src/components/screens/LobbyScreen.tsx`:
   - Change `handleStartGame`: call `loadGame(data)` only — do NOT call `startGame()`. The `loadBank` call (in `useEffect`) will now set `status: 'selectingQuestions'` automatically.
   - Button label stays "DALEJ" (change from "ROZPOCZNIJ GRĘ")

4. **TASK-030.4 — QuestionSelectionScreen:** Create `src/components/screens/QuestionSelectionScreen.tsx`:

   The screen reads `questionBank` and `config` from the store. Local state:
   - `selected: boolean[]` — one flag per bank entry, initially all `false`
   - `order: number[]` — indices into `questionBank` of currently checked items, in display order

   **Layout:**
   - Header: "WYBÓR PYTAŃ" title + subtitle showing e.g. "Wybrano: 3 / 8 pytań"
   - "LOSUJ" button: shuffles `questionBank`, picks the correct count (fixed mode: `config.numberOfRounds ?? 4`; score mode: `10`), sets `selected` and `order`
   - Question list: renders questions in `questionBank` order. Each row shows:
     - Checkbox (checked = selected)
     - Question text (truncated if long)
     - Category badge if `entry.category` exists
     - Up/Down arrow buttons — only for selected questions, moves them within the `order` array
   - Footer: "ROZPOCZNIJ GRĘ" button — disabled when `order.length === 0`; on click: calls `selectQuestions(order.map(i => questionBank[i]))` from the store

   **Helper functions** (keep each ≤ 50 lines):
   - `toggleQuestion(index: number)`: adds/removes `index` from `order`, updates `selected`
   - `moveQuestion(index: number, direction: 'up' | 'down')`: reorders within `order`
   - `handleDraw()`: picks random subset based on game mode

5. **TASK-030.5 — App routing:** In `src/App.tsx`:
   - Import `QuestionSelectionScreen`
   - Add: `if (status === 'selectingQuestions') return <QuestionSelectionScreen />;` — operator only (before the `<OperatorPanel />` fallback)
   - Board window (`isBoard`) ignores `selectingQuestions` — stays on `<GameBoard />` (shows empty board while operator selects)

## Constraints

- `QuestionSelectionScreen` is operator-only — not shown on the board window
- No drag & drop — use up/down arrow buttons only (simpler, more reliable)
- No `any` types
- Max file length: 300 lines; max function length: 50 lines
- Use existing Tailwind/Familiada theme classes (`operator-btn-primary`, `bg-familiada-bg-dark`, `text-familiada-gold`, etc.)
- `selectQuestions` replaces the temporary auto-select in `loadBank` — `rounds` must not be populated until the operator confirms

## After implementation

- Run linter: `npm run lint`
- Run tests: `npm test`
- Manual verification steps (in Polish):
  1. Uruchom aplikację (`npm run dev`) — lobby ładuje się normalnie
  2. Wypełnij nazwy drużyn, kliknij "DALEJ" — pojawia się ekran wyboru pytań
  3. Sprawdź listę — widać wszystkie pytania z banku (8 sztuk), żadne nie jest zaznaczone
  4. Kliknij "LOSUJ" — wybrana zostaje odpowiednia liczba pytań (domyślnie 4 w trybie fixed)
  5. Ręcznie odznacz 1 pytanie i zaznacz inne — licznik "Wybrano: X / 8" aktualizuje się
  6. Użyj strzałek góra/dół na zaznaczonych pytaniach — kolejność zmienia się
  7. Przycisk "ROZPOCZNIJ GRĘ" jest aktywny gdy wybrano co najmniej 1 pytanie
  8. Kliknij "ROZPOCZNIJ GRĘ" — gra startuje z wybranymi pytaniami w wybranej kolejności
  9. Przejdź przez rundy — pytania pojawiają się w wybranej kolejności
  10. Po zakończeniu gry kliknij "NOWA GRA" — wraca do ekranu wyboru pytań (nie do lobby)
