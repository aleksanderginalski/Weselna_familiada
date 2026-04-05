# Current Task — US-011

## Context
Implementing the answer board display components for the projector view. Two components: `AnswerRow` (single answer row) and `AnswerBoard` (container combining all rows). These are the first visible game components — guests will see this on the projector. Types are already defined in `src/types/game.ts` and Tailwind theme is fully configured.

## Read
- `src/types/game.ts` — `AnswerData`, `AnswerDisplayProps`, `RoundData`
- `src/store/gameStore.ts` — understand `revealedAnswers`, `currentRoundIndex`, `rounds`
- `tailwind.config.js` — available custom colors and animations
- `src/index.css` — existing component classes (`answer-row`, etc.)
- `docs/wireframes.md` — S-002 Game Board layout (answer board section)

## Tasks
1. Create `src/components/board/AnswerRow.tsx` — single answer row component using `AnswerDisplayProps`. Hidden state: dark background + masked text `████████████████`. Revealed state: show answer text on left + points on right. Number (1-based index) always visible on the left edge. Use `familiada-*` Tailwind colors and `font-display`.
2. Create `src/components/board/AnswerBoard.tsx` — container that reads `currentRoundIndex` and `rounds` from `useGameStore`, reads `revealedAnswers` from `currentRound`, renders a list of `AnswerRow` components. Handles 3–7 answers depending on the round data.
3. Style both components with the retro Familiada theme: dark background (`familiada-bg-panel`), gold text for revealed answers (`familiada-gold`), `familiada-answer-hidden` background for hidden rows.

## Constraints
- Use `AnswerDisplayProps` from `src/types/game.ts` for `AnswerRow` props — do not redefine the type
- `AnswerBoard` reads from `useGameStore` directly (no props drilling)
- No `any` types
- Max file length: 300 lines, max function length: 50 lines
- Functional components only
- Do not create tests — that is `/qa` scope

## After implementation
- Run linter: `npm run lint`
- Run tests: `npm test`
- Manual verification steps (in Polish):
  1. Uruchom `npm run dev` i otwórz aplikację
  2. Sprawdź czy komponent `AnswerBoard` renderuje się bez błędów w konsoli
  3. Zweryfikuj czy ukryte odpowiedzi pokazują bloki `████████`
  4. Zweryfikuj czy numery 1–N są widoczne po lewej stronie każdego wiersza
  5. Ręcznie wywołaj `revealAnswer(0)` ze store i sprawdź czy odpowiedź odkrywa się z tekstem i punktami
