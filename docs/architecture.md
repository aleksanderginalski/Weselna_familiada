# Weselna Familiada - Architecture Documentation

**Version:** 1.0  
**Date:** 2025-01-XX  
**Author:** Solution Architect  
**Status:** Initial architecture

---

## 1. Architecture Overview (High-Level)

```
┌─────────────────────────────────────────────────────────────┐
│                     LAPTOP (Windows)                        │
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────────────┐ │
│  │   OKNO 1: Operator  │    │   OKNO 2: Tablica (rzutnik) │ │
│  │   ─────────────────  │    │   ─────────────────────────  │ │
│  │  • Lista odpowiedzi │    │  • Ukryte/odkryte odpowiedzi│ │
│  │  • Przyciski akcji  │◄──►│  • Punkty drużyn            │ │
│  │  • Wybór drużyny    │    │  • Błędy (X X X)            │ │
│  │  • Następna runda   │    │  • Suma rundy               │ │
│  └─────────────────────┘    └─────────────────────────────┘ │
│            │                            ▲                   │
│            │    BroadcastChannel API    │                   │
│            └────────────────────────────┘                   │
│                                                             │
│  ┌─────────────────────┐                                    │
│  │   pytania.json      │ ◄── edytowalne w VSC               │
│  └─────────────────────┘                                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │    RZUTNIK      │
                    │  (mirror okna 2)│
                    └─────────────────┘
```

**Key Architecture Decisions:**
- **Two windows, one app:** Operator panel and game board run as separate browser windows
- **BroadcastChannel sync:** No server needed, windows communicate directly via browser API
- **Offline-first:** Entire app works without internet connection
- **JSON config:** Questions loaded from editable JSON file

---

## 2. Data Model

### Game Configuration (`pytania.json`)

```typescript
interface GameDataFile {
  config: GameConfig;  // no questions — loaded separately from pytania-bank.json
}

interface GameConfig {
  mode: 'fixed' | 'score';
  numberOfRounds?: number;
  winningScore?: number;
  multipliers: number[];  // [1, 2, 3, 3]
  teams: {
    left: { name: string };
    right: { name: string };
  };
}
```

### Question Bank (`pytania-bank.json`)

```typescript
interface QuestionBankFile {
  questions: QuestionBankEntry[];
}

// Extends RoundData with optional category tag
interface QuestionBankEntry {
  question: string;
  answers: AnswerData[];
  category?: string;   // e.g. "general", "wedding", "movies"
}

interface AnswerData {
  text: string;
  points: number;
}
```

### Startup Loading Flow

```
LobbyScreen mount
  → Promise.all([fetch('/pytania.json'), fetch('/pytania-bank.json')])
  → stores configData + bankData in local state (no store action yet)

LobbyScreen "Zarządzaj pytaniami" button click
  → goToQuestionEditor()  — status → 'editingQuestions'
  → QuestionEditorScreen: loads bank from localStorage (falls back to pytania-bank.json)
  → updateQuestionBank(questions)  — saves to localStorage + updates store

QuestionEditorScreen "← Powrót do Lobby" button click
  → backToLobbyFromEditor()  — status → 'lobby'

LobbyScreen "DALEJ" button click
  → loadGame(configData)   — sets config, teams
  → loadBank(bankData)     — sets questionBank[] (localStorage takes precedence), status → 'selectingQuestions'

QuestionSelectionScreen "Wybór pytań do rundy finałowej →" button click
  → selectQuestions(orderedQuestions)
      — sets rounds[], computes availableForFinal (bank minus selected), status → 'selectingFinalQuestions'

FinalRoundSelectionScreen "ROZPOCZNIJ GRĘ" button click
  → selectFinalQuestions(5 questions)
      — sets finalRoundQuestions[], status → 'playing', resets round state

FinalRoundSelectionScreen "← Wróć do pytań głównych" button click
  → backToMainSelection()  — status → 'selectingQuestions'

QuestionSelectionScreen "← Wróć" button click
  → backToLobby()  — status → 'lobby', questionBank preserved
```

### Runtime State

```typescript
interface GameState {
  config: GameConfig;
  /** Full question bank loaded from pytania-bank.json */
  questionBank: QuestionBankEntry[];
  /** Selected and ordered subset for this game session */
  rounds: RoundData[];
  status: 'lobby' | 'editingQuestions' | 'selectingQuestions' | 'selectingFinalQuestions' | 'playing' | 'finished' | 'finalRound';
  currentRoundIndex: number;
  teams: {
    left: TeamState;
    right: TeamState;
  };
  currentRound: RoundState;
  /** Bank questions not selected for the main round — candidates for final round selection */
  availableForFinal: QuestionBankEntry[];
  /** Exactly 5 questions selected by operator for the final round */
  finalRoundQuestions: QuestionBankEntry[];
  // Set to true when operator clicks "OGŁOŚ ZWYCIĘSTWO" — triggers WinnerScreen on both windows
  showingWinner: boolean;
  // Present only when a final round has been started
  finalRound?: FinalRoundState;
}

interface FinalRoundState {
  questions: FinalRoundQuestionData[];   // 5 questions from pytania-final.json
  playerA: FinalRoundAnswer[];           // 5 answer slots
  playerB: FinalRoundAnswer[];           // 5 answer slots
  playerAHidden: boolean;                // hides Player A text while Player B answers
  phase: 'answeringA' | 'revealingA' | 'answeringB' | 'revealingB' | 'finished';
  timerRunning: boolean;
  timerSecondsLeft: number;
  playerAInitialTimer: number;           // 15s
  playerBInitialTimer: number;           // 20s
}

interface TeamState {
  name: string;
  totalScore: number;
}

interface RoundState {
  phase: 'showdown' | 'guessing' | 'steal' | 'summary';
  controllingTeam: 'left' | 'right' | null;
  revealedAnswers: number[];
  mistakes: number;          // 0–3, tracks controlling team's mistakes only
  stealAttempted: boolean;
  stealFailed: boolean;      // true when opposing team guesses wrong during steal phase
  roundScore: number;
  // Tracks which team has an active wrong attempt during showdown phase (US-038).
  // Only one team can hold this at a time; cleared when a controlling team is selected.
  showdownWrongTeam: 'left' | 'right' | null;
}
```

---

## 3. Tech Stack

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| Frontend | React | 18.3 | Popular, well-documented |
| Language | TypeScript | 5.4 | Type safety |
| Bundler | Vite | 5.3 | Fast HMR |
| Styling | Tailwind CSS | 3.4 | Rapid prototyping |
| State | Zustand | 4.5 | Simple, middleware support |
| Audio | Howler.js | 2.2 | Cross-browser audio |
| Testing | Vitest | 1.6 | Vite-native |

---

## 4. Folder Structure

```
src/
├── components/
│   ├── board/           # Game board (projector view)
│   │   ├── DotMatrixBoard.tsx      # 10×30 LED grid; font-display (Familiada-2); inline mistake X marks
│   │   ├── FinalRoundDotMatrix.tsx # Same grid for final round projector view
│   │   ├── FinalRoundGameBoard.tsx # Final round board with DigitDisplay widgets
│   │   ├── AnswerRow.tsx
│   │   ├── AnswerBoard.tsx
│   │   ├── TeamScore.tsx
│   │   ├── RoundScore.tsx
│   │   ├── MistakeIndicator.tsx    # Kept for operator panel; removed from GameBoard (US-028)
│   │   └── GameBoard.tsx
│   ├── operator/        # Operator panel (laptop view)
│   │   ├── AnswerControl.tsx
│   │   ├── TeamPanel.tsx
│   │   ├── RoundControls.tsx
│   │   ├── FinalRoundOperator.tsx
│   │   ├── FinalRoundTimerPanel.tsx
│   │   ├── FinalRoundQuestionRow.tsx
│   │   └── OperatorPanel.tsx
│   ├── shared/          # Reusable components
│   │   └── DigitDisplay.tsx        # 3-digit LED display; gold/black double border; font-heading labels
│   └── screens/
│       ├── LobbyScreen.tsx
│       ├── QuestionSelectionScreen.tsx
│       ├── GameScreen.tsx
│       └── WinnerScreen.tsx
├── hooks/
│   ├── useGameState.ts
│   ├── useBroadcast.ts
│   └── useSound.ts
├── store/
│   └── gameStore.ts
├── types/
│   └── game.ts
├── utils/
│   ├── broadcast.ts
│   └── scoring.ts
└── assets/
    └── sounds/
```

---

## 5. Window Communication Flow

```
Operator Panel                    Game Board
     │                                │
     │  1. User clicks "ODKRYJ"       │
     ▼                                │
  Zustand Store                       │
     │                                │
     │  2. State updates              │
     ▼                                │
  Broadcast Middleware                │
     │                                │
     │  3. postMessage()              │
     ▼                                │
  BroadcastChannel ──────────────────►│
  'familiada-game'                    │
                                      ▼
                              4. onmessage()
                                      │
                                      ▼
                              Local State Update
                                      │
                                      ▼
                              5. Re-render
```

---

## 6. Architecture Decision Records

### ADR-001: BroadcastChannel over WebSocket

**Decision:** Use BroadcastChannel API for window sync

**Rationale:**
- No server needed
- Works offline
- Zero latency
- Same-device communication is sufficient

---

### ADR-002: Zustand over Redux

**Decision:** Use Zustand for state management

**Rationale:**
- Less boilerplate
- Built-in middleware support
- Smaller bundle size
- Sufficient for app complexity

---

### ADR-003: JSON File for Questions

**Decision:** Store questions in static JSON file

**Rationale:**
- Editable in VS Code
- No database needed
- Version controllable in git
- Simple deployment

---

### ADR-004: Question Bank + localStorage for User Edits (US-029–031)

**Decision:** Separate question bank (`pytania-bank.json`) from game config; user edits stored in `localStorage`

**Rationale:**
- `pytania-bank.json` ships with the app as the default bank (100+ questions, optional `category` field)
- Operator edits (add/edit/delete) stored in `localStorage` — persists between sessions, survives app updates
- At runtime: merge base bank with localStorage overrides
- No backend or file-system writes needed; works in both browser and Electron renderer

**Impact:**
- `gameStore.ts` loads question bank on init (base JSON + localStorage merge)
- New pre-game screen: `QuestionSelectionScreen` (operator only)
- New admin screen: `QuestionEditorScreen` (operator only, accessible from Lobby)

---

### ADR-005: Electron for Desktop Distribution (US-032–034)

**Decision:** Package as Electron app; produce Windows `.exe` installer via `electron-builder`

**Rationale:**
- Target users have no Node.js or developer tools installed
- App must work fully offline (no internet at wedding venue)
- Electron wraps the existing Vite/React app with minimal changes

**Risk & Mitigation:**
- **Risk:** BroadcastChannel may not propagate between separate Electron `BrowserWindow` processes
- **Result (US-032):** BroadcastChannel works natively in Electron v20+ — all renderer processes in the same session share it. No IPC relay needed.

**Impact:**
- New `electron/main.ts` — main process; creates Operator BrowserWindow on launch; uses ESM (matches `"type": "module"` in package.json)
- New `tsconfig.electron.json` — separate TS config for main process (`"module": "ESNext"`, `outDir: dist-electron`)
- Board window opened via `window.open('/?view=board', '_blank')` from renderer (unchanged from browser mode)
- `npm run electron:dev` and `npm run electron:build` scripts added

---

### ADR-006: Board Layout Settings via localStorage

**Decision:** Store game board layout proportions (team panel width ratio) in `localStorage` as a global setting, synced to the board window via BroadcastChannel.

**Rationale:**
- Different projectors and venues require different layout proportions
- Operator needs live adjustment without restarting the app
- `localStorage` is the established persistence mechanism in this project (see ADR-004)
- BroadcastChannel is the established sync mechanism — no new infrastructure needed

**Impact:**
- New store field (or separate `settingsStore`): `boardLayout: { teamPanelRatio: number }` — percentage width of each team panel (range: current default ~15% up to ~30%)
- New BroadcastChannel message type: `SET_BOARD_LAYOUT`
- `GameBoard.tsx` applies `teamPanelRatio` as dynamic CSS width; team panel font scales proportionally
- New operator component: `BoardLayoutControl.tsx` — always visible slider in `OperatorPanel`
- Setting loaded from `localStorage` on app init; saved on every slider change

---

*This document is updated during /discover sessions when architectural changes are made.*
