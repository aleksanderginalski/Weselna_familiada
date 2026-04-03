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

### Game Configuration (from JSON)

```typescript
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

interface RoundData {
  question: string;
  answers: AnswerData[];
}

interface AnswerData {
  text: string;
  points: number;
}
```

### Runtime State

```typescript
interface GameState {
  config: GameConfig;
  rounds: RoundData[];
  status: 'lobby' | 'playing' | 'finished';
  currentRoundIndex: number;
  teams: {
    left: TeamState;
    right: TeamState;
  };
  currentRound: RoundState;
}

interface TeamState {
  name: string;
  totalScore: number;
}

interface RoundState {
  phase: 'showdown' | 'guessing' | 'steal' | 'summary';
  controllingTeam: 'left' | 'right' | null;
  revealedAnswers: number[];
  mistakes: number;
  stealAttempted: boolean;
  roundScore: number;
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
│   │   ├── AnswerRow.tsx
│   │   ├── AnswerBoard.tsx
│   │   ├── TeamScore.tsx
│   │   ├── RoundScore.tsx
│   │   ├── MistakeIndicator.tsx
│   │   └── GameBoard.tsx
│   ├── operator/        # Operator panel (laptop view)
│   │   ├── AnswerControl.tsx
│   │   ├── TeamPanel.tsx
│   │   ├── RoundControls.tsx
│   │   └── OperatorPanel.tsx
│   └── screens/
│       ├── LobbyScreen.tsx
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

*This document is updated during /discover sessions when architectural changes are made.*
