# Current Task — US-017

## Context
Create the Round Controls component for the Operator Panel. The operator needs to see the current round number, total rounds, multiplier, and a button to end the round and advance to the next one. The store already has `endRound(winner)` and `nextRound()` actions. The winning team is determined from `currentRound.controllingTeam` (or the opposing team when steal succeeded).

## Read
- `src/store/gameStore.ts` — `endRound`, `nextRound`, `currentRoundIndex`, `config.multipliers`, `config.numberOfRounds`, `currentRound` (phase, controllingTeam, stealFailed, roundScore), `teams`
- `src/types/game.ts` — `TeamSide`, `RoundState`, `GameConfig`
- `docs/wireframes.md` — S-003 Operator Panel (round info bar + ZAKOŃCZ RUNDĘ button)
- `src/components/operator/TeamControl.tsx` — pattern for operator components
- `src/index.css` — existing component classes (`operator-btn`, etc.)
- `tailwind.config.js` — available custom colors
- `src/App.tsx` — where to integrate the new component

## Tasks

1. Create `src/components/operator/RoundControls.tsx` — single component that:
   - Reads from store: `currentRoundIndex`, `config` (multipliers, numberOfRounds), `currentRound` (phase, controllingTeam, stealFailed, roundScore), `teams`
   - Displays: "Runda X z Y" and "Mnożnik: xN"
   - Computes the winner:
     - In normal flow: `controllingTeam`
     - When steal failed: `controllingTeam` (original guessing team keeps points)
     - When steal succeeded: the opposing team (not `controllingTeam`)
   - Renders a "ZAKOŃCZ RUNDĘ" button that calls `endRound(winner)` — visible only when `phase !== 'summary'` and `controllingTeam !== null`
   - Renders a "NASTĘPNA RUNDA" button that calls `nextRound()` — visible only when `phase === 'summary'`
   - When `phase === 'summary'`, show how many points were awarded: "Drużyna X otrzymuje Y pkt"
   - Both buttons disabled when conditions not met (use `disabled` attribute + grayed styling)

2. Integrate `RoundControls` into `src/App.tsx` — add it below `TeamControl` in the operator panel section.

## Constraints
- No `any` types
- Max file length: 300 lines, max function length: 50 lines
- Max component props: 7
- Functional components only
- Do not create tests — that is `/qa` scope
- Use `operator-btn` class from `src/index.css` for buttons
- All store reads via selectors in `RoundControls` (no prop drilling from App)

## After implementation
- Run linter: `npm run lint`
- Run tests: `npm test`
- Manual verification steps (in Polish):
  1. Uruchom `npm run dev` i otwórz Panel Operatora
  2. Sprawdź czy widać "Runda 1 z X" i "Mnożnik: x1" (bez załadowanej gry: wyświetl sensowny stan domyślny)
  3. Załaduj grę (`pytania.json`), wybierz drużynę — sprawdź czy przycisk "ZAKOŃCZ RUNDĘ" się pojawia
  4. Kliknij "ZAKOŃCZ RUNDĘ" — sprawdź czy punkty trafiają do właściwej drużyny i pojawia się komunikat "Drużyna X otrzymuje Y pkt"
  5. Sprawdź czy po "ZAKOŃCZ RUNDĘ" pojawia się przycisk "NASTĘPNA RUNDA"
  6. Kliknij "NASTĘPNA RUNDA" — sprawdź czy numer rundy wzrasta, mnożnik zmienia się zgodnie z konfiguracją
  7. Przetestuj fazy steal: gdy drużyna B przejmuje i odpowiada poprawnie (stealFailed = false) — punkty powinny trafić do drużyny B; gdy się myli (stealFailed = true) — punkty do drużyny A
