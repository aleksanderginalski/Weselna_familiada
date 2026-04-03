# Current Task — US-004

## Context
ESLint is already configured (.eslintrc.cjs with React + TypeScript rules).
VS Code settings (format on save) already exist.
Missing: Prettier installation, .prettierrc config, `format` npm script,
and eslint-config-prettier to prevent ESLint/Prettier rule conflicts.
Branch: 34-us-004-configure-linting-and-formatting

## Read
- package.json
- .eslintrc.cjs
- .vscode/settings.json

## Tasks
1. Install Prettier and eslint-config-prettier:
   npm install --save-dev prettier eslint-config-prettier
2. Create .prettierrc in project root with rules consistent with
   existing codebase style (single quotes, 2 spaces, trailing commas,
   100 char print width, semicolons)
3. Update .eslintrc.cjs — add 'prettier' as last item in `extends`
   array to disable ESLint rules that conflict with Prettier
4. Add `format` script to package.json:
   "format": "prettier --write src/**/*.{ts,tsx}"
5. Run npm run lint and fix any issues in existing source files
6. Run npm run format to apply Prettier to all src files

## Constraints
- Do NOT modify existing ESLint rules — only add prettier to extends
- Do NOT change VS Code settings (already correct)
- Do NOT install eslint-plugin-prettier (causes performance issues,
  eslint-config-prettier alone is the recommended approach)
- Follow CLAUDE.md: no `any`, no console.log, functional components only

## After implementation
- Run linter: npm run lint
- Run tests: npm test
- Manual verification steps (in Polish):
  1. Uruchom `npm run lint` — brak błędów
  2. Uruchom `npm run format` — pliki w src/ sformatowane
  3. Otwórz dowolny plik .tsx w VS Code, zrób celowy błąd formatowania
     (np. podwójne cudzysłowy), zapisz — powinien się naprawić automatycznie
  4. Uruchom `npm run lint:fix` — brak błędów
