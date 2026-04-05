# Weselna Familiada

[![CI](https://github.com/AleksanderGinalworking/Weselna_familiada/actions/workflows/ci.yml/badge.svg)](https://github.com/AleksanderGinalworking/Weselna_familiada/actions/workflows/ci.yml)

Aplikacja do przeprowadzenia gry Familiada na weselu lub imprezie rodzinnej.

## 🎯 O projekcie

Dwa zsynchronizowane okna:

- **Tablica** (rzutnik) — widok dla gości z odpowiedziami, punktami, błędami
- **Panel Operatora** (laptop) — kontrola gry, odkrywanie odpowiedzi, zarządzanie rundami

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite (bundler)
- Tailwind CSS (styling)
- Zustand (state management)
- BroadcastChannel API (synchronizacja okien)
- Howler.js (dźwięki)

## 📦 Setup

### Prerequisites

- Node.js 18+
- npm 9+ lub yarn
- Git
- VS Code (zalecany)

### Installation

```powershell
# Klonowanie repozytorium
git clone https://github.com/aleksanderginalski/Weselna_familiada.git
cd Weselna_familiada

# Instalacja zależności
npm install

# Uruchomienie w trybie dev
npm run dev
```

Aplikacja otworzy się na `http://localhost:3000`

### VS Code Extensions

Otwórz projekt w VS Code — pojawi się sugestia instalacji rekomendowanych rozszerzeń.

## 🎮 Jak używać

1. Uruchom aplikację (`npm run dev`)
2. W Panelu Operatora kliknij "Otwórz Tablicę w Nowym Oknie"
3. Przeciągnij okno Tablicy na rzutnik (rozszerz pulpit)
4. Załaduj pytania z pliku `public/pytania.json`
5. Prowadź grę używając Panelu Operatora

## 📁 Struktura projektu

```
Weselna_familiada/
├── .claude/agents/       # Agenci Claude Code
├── .vscode/              # Konfiguracja VS Code
├── public/
│   └── pytania.json      # Pytania i odpowiedzi (edytuj tutaj!)
├── src/
│   ├── components/       # Komponenty React
│   ├── hooks/            # Custom hooks
│   ├── store/            # Zustand store
│   ├── types/            # TypeScript types
│   └── assets/           # Dźwięki, obrazy
├── CLAUDE.md             # Instrukcje dla /dev
├── BACKLOG.md            # Product backlog
├── architecture.md       # Dokumentacja architektury
└── requirements.md       # Wymagania funkcjonalne
```

## 📝 Edycja pytań

Edytuj plik `public/pytania.json` w VS Code:

```json
{
  "config": {
    "mode": "fixed",
    "numberOfRounds": 4,
    "multipliers": [1, 2, 3, 3],
    "teams": {
      "left": { "name": "Drużyna Pana Młodego" },
      "right": { "name": "Drużyna Panny Młodej" }
    }
  },
  "rounds": [
    {
      "question": "Twoje pytanie?",
      "answers": [
        { "text": "Odpowiedź 1", "points": 30 },
        { "text": "Odpowiedź 2", "points": 25 }
      ]
    }
  ]
}
```

## 🚀 Build produkcyjny

```powershell
npm run build
```

Wynik w folderze `dist/` — otwórz `dist/index.html` w przeglądarce.

## 📚 Dokumentacja

- [CLAUDE.md](./CLAUDE.md) — instrukcje dla Claude Code
- [BACKLOG.md](./BACKLOG.md) — product backlog
- [architecture.md](./architecture.md) — architektura systemu
- [requirements.md](./requirements.md) — wymagania

## 🤝 Development

Projekt używa systemu multi-agent z Claude Code:

| Agent     | Cel                                          |
| --------- | -------------------------------------------- |
| /pm       | Router sesji, sprawdzenie git status         |
| /planning | Weryfikacja US, generowanie Task instruction |
| /dev      | Implementacja                                |
| /qa       | Testy                                        |
| /debug    | Rozwiązywanie problemów                      |
| /docs     | Aktualizacja dokumentacji                    |

Szczegóły w [MULTI_AGENT_ARCHITECTURE.md](./MULTI_AGENT_ARCHITECTURE.md)

## 📄 License

MIT License — zobacz [LICENSE](./LICENSE)

---

## Latest

**v0.15.0** — Team control panel (US-016)

- `src/components/operator/TeamPanel.tsx` — single team card component: radio selection, team name, total score, mistake slots (3 for guessing team, 1 steal slot for opposing team), status text with phase-aware variants (`TeamStatus`: guessing / waiting / stealing / grayed)
- `src/components/operator/TeamControl.tsx` — orchestrates both `TeamPanel` instances + BŁĄD button; locks radio buttons during steal phase to prevent `selectTeam` resetting game phase; shows steal banner and "Punkty dla X" message after failed steal; BŁĄD button visually disabled in showdown/summary/post-steal phases
- `src/App.tsx` — integrated `TeamControl` into the operator panel below `AnswerControl`
- 9 tests added (TC-074 through TC-082)

**v0.14.0** — Answer control panel (US-015)

- `src/components/operator/AnswerControl.tsx` — operator panel component: lists all answers for the current round with number, text, and points; each answer has an "ODKRYJ" button that calls `revealAnswer(index)` from the store; revealed answers show "✓ odkryta" indicator with green background instead of the button
- `src/App.tsx` — integrated `AnswerControl` into the operator panel placeholder
- 5 tests added (TC-069 through TC-073)

**v0.13.0** — Complete game board view (US-014)

- `src/components/board/GameBoard.tsx` — assembles all board components in wireframe layout: `RoundScore` top center, `TeamScore` + `MistakeIndicator` on each side, `AnswerBoard` center, `AnswerSum` bottom center; fullscreen (`h-screen w-screen`) for projector display
- `src/App.tsx` — routes to `GameBoard` when `?view=board` URL param is present; operator panel placeholder otherwise
- 3 tests added (TC-066 through TC-068)

**v0.12.0** — Mistake indicator component (US-013)

- `src/components/board/MistakeIndicator.tsx` — symmetrical mistake indicator: controlling team's side shows 3 small X slots (filled red when mistake, outline when empty); opposing side shows 1 tall steal slot (same width, 3× height) only during steal phase, filled red when steal failed
- `src/types/game.ts` — `RoundState` extended with `stealFailed: boolean`; `markMistake()` in steal phase sets `stealFailed: true` instead of incrementing `mistakes`
- 7 tests added (TC-059 through TC-065)

**v0.11.0** — Score display components (US-012)

- `src/components/board/TeamScore.tsx` — team name and total score display; reads from Zustand store by `side` prop (`left` | `right`); retro Familiada styling
- `src/components/board/RoundScore.tsx` — points to win this round (`roundScore × multiplier`); reads `currentRoundIndex` and `multipliers` from store
- `src/components/board/AnswerSum.tsx` — sum of revealed answers (`roundScore`); updates live as answers are revealed
- 8 tests added (TC-051 through TC-058)

**v0.10.0** — Answer board components (US-011)

- `src/components/board/AnswerRow.tsx` — single answer row: number on left, masked text (`████████`) when hidden, answer text + points when revealed; uses `AnswerDisplayProps` from types
- `src/components/board/AnswerBoard.tsx` — container reading from Zustand store (`currentRoundIndex`, `rounds`, `revealedAnswers`); renders 3–7 `AnswerRow` components; returns null when no round loaded
- 6 tests added (TC-045 through TC-050)

**v0.9.0** — BroadcastChannel synchronization (US-010)

- `src/utils/broadcast.ts` — channel helpers: `createGameChannel`, `sendSyncState`, `requestStateSync`
- `src/hooks/useBroadcast.ts` — `useBroadcast()` hook: operator broadcasts state on every store change; board applies incoming state and requests initial sync on mount
- `src/types/game.ts` — added `REQUEST_SYNC` to `GameAction` union (10 variants total)
- `src/App.tsx` — `useBroadcast()` mounted to activate synchronization
- 8 tests added (TC-037 through TC-044)

**v0.8.0** — Zustand game state store (US-009)

- `src/store/gameStore.ts` — centralized game state store with 8 actions: `loadGame`, `startGame`, `selectTeam`, `revealAnswer`, `markMistake`, `endRound`, `nextRound`, `resetGame`
- Automatic steal phase triggered on 3rd mistake; multiplier applied per round on `endRound`
- 14 tests added (TC-023 through TC-036)

**v0.7.0** — Build verification CI job (US-008)

- `.github/workflows/ci.yml` — added `build` job with `needs: ci`; runs `npm run build` and uploads `dist/` as artifact (retention: 1 day)
- `tsconfig.json` — added `exclude` for test files to prevent `tsc` from compiling Vitest/Node.js test code during production build
- 3 tests added (TC-020 through TC-022)

**v0.6.0** — GitHub Actions CI (US-007)

- `.github/workflows/ci.yml` — CI workflow: runs lint + tests on every push and PR
- `README.md` — added CI status badge
- 3 tests added (TC-017 through TC-019)

**v0.5.0** — Testing framework (US-005)

- `package.json` — added `test:watch` script (`vitest --watch`) to complete testing setup
- `src/test/setup.ts` — jest-dom matchers configured for all tests
- `vite.config.ts` — Vitest configured (globals, jsdom environment, coverage via v8)
- 1 test added (TC-016)

**v0.4.0** — Linting and formatting (US-004)

- `.prettierrc` — Prettier config (singleQuote, semi, tabWidth: 2, trailingComma: all, printWidth: 100)
- `.eslintrc.cjs` — added `prettier` to extends to prevent ESLint/Prettier rule conflicts
- `package.json` — added `format` script (`prettier --write "src/**/*.{ts,tsx}"`)
- 4 tests added (TC-012 through TC-015)

**v0.3.0** — Tailwind CSS with Familiada theme (US-003)

- `tailwind.config.js` — custom color palette aligned with Design Brief (familiada-bg-dark, familiada-gold, familiada-red, etc.)
- `src/index.css` — Tailwind directives + component classes (answer-row, score-display, mistake-x, operator-btn)
- `src/main.tsx` — React 18 entry point
- `src/App.tsx` — theme verification component
- 4 tests added (TC-008 through TC-011)

**v0.2.0** — TypeScript types for game state (US-006)

- `src/types/game.ts` — complete type definitions: GameConfig, GameState, RoundState, GameAction, component props
- `src/types/index.ts` — barrel export for all types
- 14 type conformance tests added (TC-001 through TC-007)

**v0.1.0** — Initial project setup

- Project structure created
- Documentation prepared
- Backlog defined
