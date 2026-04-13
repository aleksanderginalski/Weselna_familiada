# Current Task — US-031

## Context
Implement an in-app question editor accessible from the Lobby screen.
Non-technical operators need to add, edit, and delete questions directly
in the UI without touching JSON files. Edits persist in `localStorage`
and are reflected immediately in QuestionSelectionScreen.

Architecture decision (ADR-004): localStorage stores the full edited bank;
on load, if localStorage has data it takes precedence over pytania-bank.json.

## Read Before Starting

- `src/components/screens/LobbyScreen.tsx`
- `src/App.tsx`
- `src/store/gameStore.ts`
- `src/types/game.ts`
- `docs/architecture.md` (ADR-004, lines ~290-305)

## Tasks

### 1. Add `'editingQuestions'` to `GameStatus` in `src/types/game.ts`

### 2. Create `src/utils/questionBankStorage.ts`
- `STORAGE_KEY = 'familiada-question-bank'`
- `saveQuestionBank(questions: QuestionBankEntry[]): void` — JSON.stringify to localStorage
- `loadQuestionBank(): QuestionBankEntry[] | null` — parse or return null on error/empty
- Both functions handle localStorage exceptions silently (try/catch)

### 3. Add `updateQuestionBank` action to `src/store/gameStore.ts`
- Signature: `updateQuestionBank: (questions: QuestionBankEntry[]) => void`
- Sets `questionBank` in store + calls `saveQuestionBank` from the new util
- No status change (editing happens pre-game, outside the game flow)

### 4. Modify `loadBank` in `src/store/gameStore.ts`
- After receiving `data` param, call `loadQuestionBank()` from util
- If localStorage returns data (non-null), use it instead of `data.questions`
- This makes localStorage edits survive page reloads

### 5. Add store action `goToQuestionEditor` and `backToLobbyFromEditor`
- `goToQuestionEditor`: sets `status: 'editingQuestions'`
- `backToLobbyFromEditor`: sets `status: 'lobby'`

### 6. Create `src/components/screens/QuestionEditorForm.tsx`
Props: `initialQuestion?: QuestionBankEntry`, `onSave: (q: QuestionBankEntry) => void`, `onCancel: () => void`

- Local state: question text + array of up to 8 answers `{ text, points }`
- "Add answer" button (up to 8 max)
- "Remove" button per answer row (if more than 2)
- Validation on submit:
  - question text non-empty
  - at least 2 answers
  - each answer text non-empty
  - each points value is a positive integer
- Shows inline error messages under failing fields
- "Zapisz" and "Anuluj" buttons

### 7. Create `src/components/screens/QuestionEditorList.tsx`
Props: `questions: QuestionBankEntry[]`, `onEdit: (index: number) => void`, `onDelete: (index: number) => void`, `onAddNew: () => void`

- Renders scrollable list of questions
- Each row: question text + answer count badge + "Edytuj" + "Usuń" buttons
- "Dodaj pytanie" button at the top

### 8. Create `src/components/screens/QuestionEditorScreen.tsx`
- Reads `questionBank` from store
- Local state: `editingIndex: number | null` (null = list view, -1 = add new, >=0 = edit existing)
- When `editingIndex === null`: renders `QuestionEditorList`
- When `editingIndex >= 0`: renders `QuestionEditorForm` with `initialQuestion={questionBank[editingIndex]}`
- When `editingIndex === -1`: renders `QuestionEditorForm` without initialQuestion
- `onSave` handler: builds updated array, calls `updateQuestionBank`, returns to list view
- `onDelete` handler: removes question at index, calls `updateQuestionBank`
- Header: title "Edytor pytań" + "Powrót do Lobby" button calling `backToLobbyFromEditor`

### 9. Update `src/components/screens/LobbyScreen.tsx`
- Add "Zarządzaj pytaniami" button (secondary style, below the DALEJ button)
- On click: calls `goToQuestionEditor()` from store

### 10. Update `src/App.tsx`
- Add route: `if (status === 'editingQuestions') return <QuestionEditorScreen />;`
- Place it just before the `if (status === 'lobby')` check (editor is operator-only, skip for board)

## Constraints

- No new npm packages — use only existing stack
- `QuestionEditorScreen.tsx` must stay under 300 lines — split into List + Form components
- No `any` type, no `@ts-ignore`
- All labels and button text in Polish (non-technical UX)
- The board window (`?view=board`) must never show the editor — guard in App.tsx using `isBoard`

## After Implementation

1. Run linter: `npm run lint`
2. Run tests: `npm test`
3. Manual verification steps (in Polish):
   - Otwórz aplikację — na ekranie Lobby widoczny przycisk "Zarządzaj pytaniami"
   - Kliknij "Zarządzaj pytaniami" — pojawia się ekran z listą pytań z pytania-bank.json
   - Kliknij "Dodaj pytanie" — pojawia się formularz
   - Spróbuj zapisać pusty formularz — pojawia się błąd walidacji
   - Spróbuj zapisać z 1 odpowiedzią — pojawia się błąd walidacji
   - Wpisz pytanie + 2 odpowiedzi z punktami — kliknij "Zapisz" — pytanie pojawia się na liście
   - Kliknij "Edytuj" na istniejącym pytaniu — formularz wypełniony istniejącymi danymi
   - Zmień treść i zapisz — lista zaktualizowana
   - Kliknij "Usuń" na pytaniu — pytanie znika z listy
   - Kliknij "Powrót do Lobby" — wracasz do Lobby
   - Kliknij "DALEJ" — nowe pytanie widoczne w ekranie wyboru pytań
   - Odśwież stronę (F5) — wróć do Lobby → "Zarządzaj pytaniami" — edytowane pytania nadal widoczne (localStorage)
