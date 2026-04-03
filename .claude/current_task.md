# Current Task — US-005

## Context
Configure the testing framework for Weselna Familiada. Most infrastructure is already
in place from prior US work (Vitest, RTL, jsdom, vite.config.ts test block,
src/test/setup.ts, src/App.test.tsx). The only gap vs. Acceptance Criteria is a
missing `test:watch` npm script. Task is to add it and verify everything works.

## Read
- package.json (scripts section — see what's there)
- vite.config.ts (test block — already configured)
- src/test/setup.ts (already has jest-dom import)
- src/App.test.tsx (sample test — already written)

## Tasks
1. Add `test:watch` script to package.json:
   `"test:watch": "vitest --watch"`
   Place it between `test` and `test:ui` scripts.

2. Run `npm run lint` — verify no errors.

3. Run `npm test -- --run` (single-pass, non-interactive) — verify all existing
   tests pass (TC-000 through TC-015 + App.test.tsx).

## Constraints
- Do NOT modify vite.config.ts — test configuration is complete
- Do NOT modify src/test/setup.ts — it is correct
- Do NOT modify src/App.test.tsx — it is the sample test, written by /qa
- Only change: package.json scripts section
- No `any` types, no @ts-ignore

## After implementation
- Run linter: npm run lint
- Run tests: npm test -- --run
- List manual verification steps (in Polish)
