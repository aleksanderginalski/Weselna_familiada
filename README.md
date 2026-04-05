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
