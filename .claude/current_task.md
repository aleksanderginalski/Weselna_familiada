# Current Task — US-007

## Context
Set up GitHub Actions CI workflow that runs linting and tests automatically
on every push and pull request. Add a status badge to README.md.
Dependencies already in place: ESLint (US-004), Vitest (US-005).

## Read
- package.json (scripts: lint, test, build — node version)
- .eslintrc.cjs (lint config)
- vite.config.ts (vitest config)
- README.md (where to add badge)

## Tasks
1. Create `.github/workflows/ci.yml` with:
   - trigger: push (all branches) + pull_request (all branches)
   - single job `ci` running on `ubuntu-latest`
   - steps: checkout → setup Node.js 20 → npm ci → lint → test
2. Add CI status badge to README.md directly below the `# Weselna Familiada` heading

## Constraints
- Use `npm ci` (not `npm install`) for deterministic installs
- Node version: 20 (matches Node.js 18+ requirement from README, use 20 LTS)
- Use `actions/checkout@v4` and `actions/setup-node@v4`
- Badge format: GitHub Actions badge for workflow named `CI`
- Badge links to the Actions tab of the repo
- Repo: https://github.com/AleksanderGinalworking/Weselna_familiada
- Do NOT add a build job — that is US-008 scope
- No test coverage upload — keep it simple

## After implementation
- Run linter: npm run lint
- Run tests: npm test -- --run
- List manual verification steps (in Polish)
