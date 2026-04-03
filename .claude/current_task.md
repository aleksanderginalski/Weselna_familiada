# Current Task — US-003

## Context
Configure Tailwind CSS with custom Familiada theme colors. Most config files already exist
(tailwind.config.js, postcss.config.js, src/index.css) but colors diverge from the Design Brief
and the app entry files (main.tsx, App.tsx) are missing — required to verify Tailwind classes
actually render in the browser.

## Read
- docs/Weselna_familiada_design_brief.md  (source of truth for colors)
- tailwind.config.js                       (needs color alignment)
- src/index.css                            (Tailwind directives + custom classes)
- postcss.config.js                        (already correct)
- index.html                               (already references /src/main.tsx)

## Tasks
1. Align colors in tailwind.config.js with Design Brief hex values
2. Create src/main.tsx — React 18 entry point that imports index.css and renders <App />
3. Create src/App.tsx — minimal component that uses familiada-* Tailwind classes
   (background, gold title, one .answer-row demo, one .score-display demo)
   to visually confirm the theme works

## Constraints
- Colors must match Design Brief exactly: bg-dark #0a1628, bg-panel #1a2744, gold #fbbf24,
  red #ef4444, border #334155
- Keep all existing custom classes in index.css (answer-row, score-display, mistake-x,
  operator-btn variants) — do NOT remove them
- App.tsx is for verification only — keep it minimal (no game logic)
- No `any` types, no console.log, no commented-out code

## After implementation
- Run linter: npm run lint
- Run tests: npm test
- Manual verification steps (in Polish):
  1. Uruchom `npm run dev`
  2. Otwórz http://localhost:3000
  3. Sprawdź: tło strony jest ciemnoniebieskie (#0a1628)
  4. Sprawdź: tytuł "Weselna Familiada" wyświetla się w kolorze złotym
  5. Sprawdź: rząd odpowiedzi (.answer-row) renderuje się z ciemnym tłem i obramowaniem
  6. Sprawdź: wyświetlacz punktów (.score-display) renderuje się ze złotym obramowaniem
  7. Otwórz DevTools — brak błędów w konsoli
