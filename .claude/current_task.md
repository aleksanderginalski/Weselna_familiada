# Current Task — US-027

## Context

Apply the custom `familiada.ttf` font to the game board so it looks like the real TV show.
The font file already exists at `src/assets/fonts/familiada.ttf` (untracked).
The `font-display` Tailwind utility class is already used on all board elements
(`AnswerRow`, `TeamScore`, `RoundScore`, `AnswerSum`, `FinalRoundBoard`),
so registering the font and updating the Tailwind config is all that's needed.
Operator panel typography must remain unchanged.

## Read

- `src/index.css` — add `@font-face` declaration here
- `tailwind.config.js` — update `font-display` family to prepend `Familiada`
- `src/components/board/AnswerRow.tsx` — uses `font-display`, verify no override needed
- `src/components/board/TeamScore.tsx` — uses `font-display`, verify no override needed
- `src/components/board/RoundScore.tsx` — uses `font-display`, verify no override needed
- `src/components/board/AnswerSum.tsx` — uses `font-display`, verify no override needed
- `src/components/board/FinalRoundBoard.tsx` — uses `font-display`, verify no override needed

## Tasks

### 1. Register `@font-face` in `src/index.css`

Add before `@tailwind base;` (or inside `@layer base`):

```css
@font-face {
  font-family: 'Familiada';
  src: url('/fonts/familiada.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

### 2. Copy font to `public/fonts/`

The font must be served as a static asset. Copy `src/assets/fonts/familiada.ttf`
to `public/fonts/familiada.ttf` so it is accessible at `/fonts/familiada.ttf`.

> Note: Vite does not serve files from `src/assets/` at a public URL by default —
> only files in `public/` are served as-is. So the font must live in `public/fonts/`.

### 3. Update `font-display` in `tailwind.config.js`

Change the `display` font family from:

```js
'display': ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
```

to:

```js
'display': ['Familiada', 'Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
```

### 4. Verify board components use `font-display`

Read each board component listed above and confirm they use `font-display` (or `font-body`
for operator-only elements). No code changes expected — this is a read-and-confirm step.

## Constraints

- No `any` types
- Do not create tests — that is `/qa` scope
- Operator panel components must NOT use `font-display` on any new elements
- Font file goes in `public/fonts/` (not `src/assets/fonts/`) so Vite serves it correctly
- No layout changes — font swap only

## After implementation

- Run linter: `npm run lint`
- Run tests: `npm test`
- Manual verification steps (in Polish):
  1. Uruchom `npm run dev`, otwórz tablicę (`?view=board`) — sprawdź czy tekst odpowiedzi wyświetla się krojem Familiada (nie Impact)
  2. Sprawdź wyniki drużyn, punkty rundy i sumę odpowiedzi — wszystkie powinny używać Familiada
  3. Otwórz Panel Operatora (bez `?view=board`) — sprawdź czy typografia NIE zmieniła się (nadal Arial/Impact)
  4. Sprawdź konsolę przeglądarki — brak błędów 404 dla pliku czcionki
  5. Sprawdź w DevTools > Network że `familiada.ttf` ładuje się poprawnie (status 200)
