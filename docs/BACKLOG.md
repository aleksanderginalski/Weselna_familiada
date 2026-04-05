# Weselna Familiada - Product Backlog

**Project:** Weselna Familiada  
**Version:** 2.0  
**Last Updated:** 2026-04-03 (US-005 Done)  
**Product Owner:** Aleksander Ginalski  
**Repository:** https://github.com/AleksanderGinalworking/Weselna_familiada

---

## 📊 Backlog Overview

| Milestone | Name                   | Status     |
| --------- | ---------------------- | ---------- |
| M1        | Core Game Mechanics    | 📋 Planned |
| M2        | Polish & Sound         | 📋 Planned |
| M3        | Final Round (Optional) | 📋 Planned |

---

## 🎯 Epic Structure

```
EPIC-001: Weselna Familiada M1 - Core Game Mechanics
├── FEATURE-001: Project Setup & Configuration
├── FEATURE-002: CI/CD Pipeline
├── FEATURE-003: Game State Management
├── FEATURE-004: Game Board Display
├── FEATURE-005: Operator Panel
└── FEATURE-006: Game Flow & Scoring

EPIC-002: Weselna Familiada M2 - Polish & Sound
├── FEATURE-007: Sound Effects
└── FEATURE-008: Animations

EPIC-003: Weselna Familiada M3 - Final Round (Optional)
└── FEATURE-009: Quick Round Mode
```

---

# 📦 EPIC-001: Core Game Mechanics

**Goal:** Working Familiada game with two synchronized windows

**Business Value:** Enable running Familiada game at the wedding with full game mechanics

**Status:** 📋 Planned

---

## 🔧 FEATURE-001: Project Setup & Configuration

**Priority:** P0 (Critical)  
**Sprint:** Sprint 1  
**Total Points:** 8  
**Status:** 📋 Planned

### US-001: Initialize repository and project structure

**As a** developer  
**I want to** have an initialized Git repository with proper structure  
**So that** I can start development with version control

**Status:** ✅ Done  
**Story Points:** 2  
**Priority:** P0

**Acceptance Criteria:**

- [x] Git repository initialized
- [x] .gitignore configured for Node.js/React project
- [x] Folder structure created (src/, docs/, public/)
- [x] README.md with project description and setup instructions

**Tasks:**

- [x] **TASK-001.1:** Initialize git repository - 5min
- [x] **TASK-001.2:** Create .gitignore for Node.js/React - 5min
- [x] **TASK-001.3:** Create folder structure (src/components, src/hooks, src/store, src/types, src/utils) - 10min
- [x] **TASK-001.4:** Create initial README.md - 15min
- [x] **TASK-001.5:** Initial commit and push to GitHub - 10min

**Definition of Done:**

- Repository accessible on GitHub
- Folder structure matches docs/architecture.md
- README contains setup instructions

---

### US-002: Configure development environment

**As a** developer  
**I want to** have Vite + React + TypeScript configured  
**So that** I can develop with hot reload and type safety

**Status:** ✅ Done  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**

- [x] Project runs with `npm run dev`
- [x] TypeScript compilation works without errors
- [x] Vite hot reload works
- [x] Basic App.tsx renders "Weselna Familiada" title

**Tasks:**

- [x] **TASK-002.1:** Initialize Vite project with React + TypeScript template - 10min
- [x] **TASK-002.2:** Configure tsconfig.json with strict mode - 15min
- [x] **TASK-002.3:** Create src/main.tsx entry point - 10min
- [x] **TASK-002.4:** Create src/App.tsx with basic structure - 10min
- [x] **TASK-002.5:** Create index.html - 10min
- [x] **TASK-002.6:** Verify hot reload works - 5min
- [x] **TASK-002.7:** Manual verification: app runs and shows title - 5min

---

### US-003: Configure Tailwind CSS with Familiada theme

**As a** developer  
**I want to** have Tailwind CSS with custom Familiada colors  
**So that** I can style components consistently

**Status:** ✅ Done  
**Story Points:** 2  
**Priority:** P0

**Acceptance Criteria:**

- [x] Tailwind CSS installed and configured
- [x] Custom colors defined (familiada-bg-dark, familiada-gold, familiada-red, etc.)
- [x] Custom component classes defined (answer-row, score-display, etc.)
- [x] PostCSS configured

**Tasks:**

- [x] **TASK-003.1:** Install Tailwind CSS and dependencies - 5min
- [x] **TASK-003.2:** Create tailwind.config.js with custom theme - 20min
- [x] **TASK-003.3:** Create postcss.config.js - 5min
- [x] **TASK-003.4:** Create src/index.css with Tailwind directives and custom classes - 20min
- [x] **TASK-003.5:** Verify Tailwind classes work in App.tsx - 10min
- [x] **TASK-003.6:** Manual verification: custom colors render correctly - 5min

---

### US-004: Configure linting and formatting

**As a** developer  
**I want to** have ESLint and Prettier configured  
**So that** code quality is enforced automatically

**Status:** ✅ Done  
**Story Points:** 2  
**Priority:** P0

**Acceptance Criteria:**

- [x] ESLint configured with React and TypeScript rules
- [x] Prettier configured for consistent formatting
- [x] npm scripts: `lint`, `lint:fix`, `format`
- [x] VS Code settings for format on save

**Tasks:**

- [x] **TASK-004.1:** Install ESLint and plugins - 5min
- [x] **TASK-004.2:** Create .eslintrc.cjs with rules - 15min
- [x] **TASK-004.3:** Install Prettier - 5min
- [x] **TASK-004.4:** Create .prettierrc - 5min
- [x] **TASK-004.5:** Add npm scripts to package.json - 5min
- [x] **TASK-004.6:** Create .vscode/settings.json - 10min
- [x] **TASK-004.7:** Create .vscode/extensions.json - 5min
- [x] **TASK-004.8:** Run lint and fix any issues - 10min
- [x] **TASK-004.9:** Manual verification: lint and format commands work - 5min

---

### US-005: Configure testing framework

**As a** developer  
**I want to** have Vitest configured with React Testing Library  
**So that** I can write and run tests

**Status:** ✅ Done  
**Story Points:** 2  
**Priority:** P0

**Acceptance Criteria:**

- [x] Vitest installed and configured
- [x] React Testing Library installed
- [x] npm scripts: `test`, `test:watch`, `test:coverage`
- [x] Sample test passes

**Tasks:**

- [x] **TASK-005.1:** Install Vitest and dependencies - 5min
- [x] **TASK-005.2:** Install React Testing Library - 5min
- [x] **TASK-005.3:** Create vitest.config.ts - 10min
- [x] **TASK-005.4:** Create src/test/setup.ts for test configuration - 10min
- [x] **TASK-005.5:** Add npm scripts to package.json - 5min
- [x] **TASK-005.6:** Write sample test for App.tsx (/qa) - 15min
- [x] **TASK-005.7:** Manual verification: tests run and pass - 5min

---

### US-006: Create TypeScript types for game state

**As a** developer  
**I want to** have well-defined TypeScript types  
**So that** the game state is type-safe throughout the application

**Status:** ✅ Done  
**Story Points:** 2  
**Priority:** P0

**Acceptance Criteria:**

- [x] GameConfig type matches pytania.json structure
- [x] GameState type covers all runtime state needs
- [x] RoundState type handles all round phases
- [x] All types exported from src/types/index.ts

**Tasks:**

- [x] **TASK-006.1:** Create src/types/game.ts with all type definitions - 30min
- [x] **TASK-006.2:** Create src/types/index.ts exporting all types - 5min
- [x] **TASK-006.3:** Verify types compile without errors - 5min
- [x] **TASK-006.4:** Write type tests (/qa) - 15min
- [x] **TASK-006.5:** Manual verification: types work with sample data - 10min

---

## 🔧 FEATURE-002: CI/CD Pipeline

**Priority:** P0 (Critical)  
**Sprint:** Sprint 1  
**Total Points:** 5  
**Status:** 📋 Planned

### US-007: Set up GitHub Actions for linting and tests

**As a** developer  
**I want to** have automated checks on every push and PR  
**So that** code quality is enforced before merge

**Status:** ✅ COMPLETED  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**

- [x] GitHub Actions workflow runs on push and PR
- [x] Workflow runs linting
- [x] Workflow runs tests
- [x] Workflow fails if lint or tests fail
- [x] Status badge in README

**Tasks:**

- [x] **TASK-007.1:** Create .github/workflows/ci.yml - 20min
- [x] **TASK-007.2:** Configure lint job - 15min
- [x] **TASK-007.3:** Configure test job - 15min
- [x] **TASK-007.4:** Add status badge to README.md - 5min
- [x] **TASK-007.5:** Push and verify workflow runs - 10min
- [x] **TASK-007.6:** Manual verification: workflow passes/fails correctly - 10min

---

### US-008: Set up build verification

**As a** developer  
**I want to** verify that production build works  
**So that** I catch build errors early

**Status:** 📋 Planned  
**Story Points:** 2  
**Priority:** P1

**Acceptance Criteria:**

- [ ] Build job added to CI workflow
- [ ] Build artifacts uploaded (optional)
- [ ] Build fails if TypeScript errors exist

**Tasks:**

- [ ] **TASK-008.1:** Add build job to ci.yml - 15min
- [ ] **TASK-008.2:** Configure artifact upload (optional) - 10min
- [ ] **TASK-008.3:** Test build failure scenario - 10min
- [ ] **TASK-008.4:** Manual verification: build job works correctly - 10min

---

## 🔧 FEATURE-003: Game State Management

**Priority:** P0 (Critical)  
**Sprint:** Sprint 2  
**Total Points:** 8  
**Status:** 📋 Planned

### US-009: Implement Zustand store for game state

**As a** developer  
**I want to** have centralized game state management  
**So that** both windows can share the same game state

**Status:** 📋 Planned  
**Story Points:** 5  
**Priority:** P0

**Acceptance Criteria:**

- [ ] Zustand store holds complete GameState
- [ ] Store has actions: loadGame, startGame, selectTeam, revealAnswer, markMistake, nextRound, resetGame
- [ ] Actions update state immutably
- [ ] Store can be initialized from pytania.json data

**Tasks:**

- [ ] **TASK-009.1:** Install Zustand - 5min
- [ ] **TASK-009.2:** Create src/store/gameStore.ts with initial state - 30min
- [ ] **TASK-009.3:** Implement loadGame action to parse JSON config - 20min
- [ ] **TASK-009.4:** Implement round control actions (selectTeam, revealAnswer, markMistake) - 30min
- [ ] **TASK-009.5:** Implement game flow actions (nextRound, resetGame) - 20min
- [ ] **TASK-009.6:** Add automatic steal logic when mistakes reach 3 - 15min
- [ ] **TASK-009.7:** Write unit tests for all store actions (/qa) - 45min
- [ ] **TASK-009.8:** Manual verification: actions work correctly - 15min

---

### US-010: Implement BroadcastChannel synchronization

**As a** operator  
**I want to** have the game board update instantly when I perform actions  
**So that** guests see changes in real-time

**Status:** 📋 Planned  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**

- [ ] BroadcastChannel created with name 'familiada-game'
- [ ] All store actions broadcast state changes
- [ ] Board window receives and applies state updates
- [ ] Initial state sync when board window opens

**Tasks:**

- [ ] **TASK-010.1:** Create src/utils/broadcast.ts with channel helpers - 20min
- [ ] **TASK-010.2:** Create src/hooks/useBroadcast.ts hook - 20min
- [ ] **TASK-010.3:** Integrate broadcast with Zustand store middleware - 25min
- [ ] **TASK-010.4:** Handle initial state sync when board window opens - 15min
- [ ] **TASK-010.5:** Write unit tests for broadcast utilities (/qa) - 30min
- [ ] **TASK-010.6:** Manual verification: two windows stay in sync - 15min

---

## 🔧 FEATURE-004: Game Board Display

**Priority:** P0 (Critical)  
**Sprint:** Sprint 2  
**Total Points:** 13  
**Status:** 📋 Planned

### US-011: Create answer board component

**As a** wedding guest  
**I want to** see answers displayed on a board  
**So that** I can follow the game progress

**Status:** 📋 Planned  
**Story Points:** 5  
**Priority:** P0

**Acceptance Criteria:**

- [ ] Board displays 3-7 answer rows depending on round
- [ ] Hidden answers show masked text (████████)
- [ ] Revealed answers show text and points
- [ ] Answer rows have retro TV-show styling
- [ ] Numbers (1-7) are visible on the left side

**Tasks:**

- [ ] **TASK-011.1:** Create src/components/board/AnswerRow.tsx - 30min
- [ ] **TASK-011.2:** Create src/components/board/AnswerBoard.tsx combining rows - 20min
- [ ] **TASK-011.3:** Style answers with Familiada retro theme - 30min
- [ ] **TASK-011.4:** Add revealed/hidden state styling - 15min
- [ ] **TASK-011.5:** Write component tests for AnswerRow (/qa) - 30min
- [ ] **TASK-011.6:** Write component tests for AnswerBoard (/qa) - 20min
- [ ] **TASK-011.7:** Manual verification: answers display correctly - 10min

---

### US-012: Create score display components

**As a** wedding guest  
**I want to** see team scores and round points  
**So that** I know who is winning

**Status:** 📋 Planned  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**

- [ ] Team names displayed on left and right sides
- [ ] Total scores visible for each team
- [ ] Round points (sum × multiplier) displayed at top center
- [ ] Sum of revealed answers shown below answer board

**Tasks:**

- [ ] **TASK-012.1:** Create src/components/board/TeamScore.tsx - 20min
- [ ] **TASK-012.2:** Create src/components/board/RoundScore.tsx - 20min
- [ ] **TASK-012.3:** Create src/components/board/AnswerSum.tsx - 15min
- [ ] **TASK-012.4:** Write component tests (/qa) - 25min
- [ ] **TASK-012.5:** Manual verification: scores display correctly - 10min

---

### US-013: Create mistake indicator component

**As a** wedding guest  
**I want to** see X marks when a team makes mistakes  
**So that** I understand the game state

**Status:** 📋 Planned  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**

- [ ] Left side shows mistakes for left team (3 slots)
- [ ] Right side shows mistakes for right team (3 slots + 1 for steal)
- [ ] Active mistakes show red X
- [ ] Empty slots show outline only
- [ ] Only controlling team's mistakes are shown

**Tasks:**

- [ ] **TASK-013.1:** Create src/components/board/MistakeIndicator.tsx - 25min
- [ ] **TASK-013.2:** Style X indicators with Familiada red theme - 15min
- [ ] **TASK-013.3:** Position indicators on left/right of answer board - 15min
- [ ] **TASK-013.4:** Write component tests (/qa) - 20min
- [ ] **TASK-013.5:** Manual verification: mistakes display correctly - 10min

---

### US-014: Assemble complete game board view

**As a** operator  
**I want to** open a complete game board in a new window  
**So that** I can display it on the projector

**Status:** 📋 Planned  
**Story Points:** 2  
**Priority:** P0

**Acceptance Criteria:**

- [ ] GameBoard component assembles all board elements
- [ ] Board fills entire window (fullscreen-friendly)
- [ ] Layout matches wireframe (teams on sides, answers center, X on sides)
- [ ] Board listens to BroadcastChannel for state updates

**Tasks:**

- [ ] **TASK-014.1:** Create src/components/board/GameBoard.tsx - 25min
- [ ] **TASK-014.2:** Connect board to BroadcastChannel receiver - 15min
- [ ] **TASK-014.3:** Test layout at 1920x1080 resolution - 10min
- [ ] **TASK-014.4:** Write integration tests (/qa) - 20min
- [ ] **TASK-014.5:** Manual verification: board displays correctly on projector - 15min

---

## 🔧 FEATURE-005: Operator Panel

**Priority:** P0 (Critical)  
**Sprint:** Sprint 3  
**Total Points:** 10  
**Status:** 📋 Planned

### US-015: Create answer control panel

**As a** operator  
**I want to** see all answers and reveal them individually  
**So that** I can control what guests see

**Status:** 📋 Planned  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**

- [ ] All answers visible with text and points
- [ ] Each answer has "ODKRYJ" (Reveal) button
- [ ] Revealed answers are visually marked
- [ ] Buttons disabled for already revealed answers

**Tasks:**

- [ ] **TASK-015.1:** Create src/components/operator/AnswerControl.tsx - 30min
- [ ] **TASK-015.2:** Connect reveal buttons to store actions - 15min
- [ ] **TASK-015.3:** Add visual feedback for revealed state - 10min
- [ ] **TASK-015.4:** Write component tests (/qa) - 25min
- [ ] **TASK-015.5:** Manual verification: reveal buttons work - 10min

---

### US-016: Create team control panel

**As a** operator  
**I want to** select which team is answering and mark mistakes  
**So that** I can manage the game flow

**Status:** 📋 Planned  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**

- [ ] Both teams shown with names and total scores
- [ ] Radio button or toggle to select controlling team
- [ ] "BŁĄD" (Mistake) button for current team
- [ ] Mistake count displayed for each team
- [ ] Status text shows what happens on next mistake

**Tasks:**

- [ ] **TASK-016.1:** Create src/components/operator/TeamPanel.tsx - 30min
- [ ] **TASK-016.2:** Implement team selection logic - 15min
- [ ] **TASK-016.3:** Implement mistake button with automatic steal logic - 20min
- [ ] **TASK-016.4:** Add status text for game state - 10min
- [ ] **TASK-016.5:** Write component tests (/qa) - 25min
- [ ] **TASK-016.6:** Manual verification: team controls work - 10min

---

### US-017: Create round control panel

**As a** operator  
**I want to** see current round info and advance to next round  
**So that** I can manage game progression

**Status:** 📋 Planned  
**Story Points:** 2  
**Priority:** P0

**Acceptance Criteria:**

- [ ] Current round number and total rounds displayed
- [ ] Current multiplier shown
- [ ] "NASTĘPNA RUNDA" button visible
- [ ] Button triggers score assignment and round transition

**Tasks:**

- [ ] **TASK-017.1:** Create src/components/operator/RoundControls.tsx - 20min
- [ ] **TASK-017.2:** Implement next round logic with score assignment - 20min
- [ ] **TASK-017.3:** Write component tests (/qa) - 20min
- [ ] **TASK-017.4:** Manual verification: round controls work - 10min

---

### US-018: Assemble complete operator panel

**As a** operator  
**I want to** have all controls in one organized panel  
**So that** I can efficiently manage the game

**Status:** 📋 Planned  
**Story Points:** 2  
**Priority:** P0

**Acceptance Criteria:**

- [ ] Panel shows current question at top
- [ ] Answer controls, team panels, and round controls organized
- [ ] "Otwórz Tablicę" button opens board in new window
- [ ] Panel layout is intuitive and not cluttered

**Tasks:**

- [ ] **TASK-018.1:** Create src/components/operator/OperatorPanel.tsx - 25min
- [ ] **TASK-018.2:** Add "Open Board" button with window.open() - 10min
- [ ] **TASK-018.3:** Style panel for laptop screen - 15min
- [ ] **TASK-018.4:** Write integration tests (/qa) - 20min
- [ ] **TASK-018.5:** Manual verification: full operator workflow - 15min

---

## 🔧 FEATURE-006: Game Flow & Scoring

**Priority:** P0 (Critical)  
**Sprint:** Sprint 3  
**Total Points:** 8  
**Status:** 📋 Planned

### US-019: Implement game configuration screen

**As a** operator  
**I want to** configure the game before starting  
**So that** I can set team names and game mode

**Status:** 📋 Planned  
**Story Points:** 3  
**Priority:** P1

**Acceptance Criteria:**

- [ ] Lobby screen shows before game starts
- [ ] Team names can be edited
- [ ] Game mode selection (fixed rounds vs score threshold)
- [ ] Number of rounds or winning score configurable
- [ ] "Start Game" button begins the game

**Tasks:**

- [ ] **TASK-019.1:** Create src/components/screens/LobbyScreen.tsx - 30min
- [ ] **TASK-019.2:** Add form for team name editing - 15min
- [ ] **TASK-019.3:** Add game mode configuration - 15min
- [ ] **TASK-019.4:** Connect to store's loadGame and startGame actions - 10min
- [ ] **TASK-019.5:** Write component tests (/qa) - 25min
- [ ] **TASK-019.6:** Manual verification: configuration works - 10min

---

### US-020: Implement winner screen

**As a** wedding guest  
**I want to** see a celebration when a team wins  
**So that** the game has a satisfying conclusion

**Status:** 📋 Planned  
**Story Points:** 2  
**Priority:** P1

**Acceptance Criteria:**

- [ ] Winner screen displays when game ends
- [ ] Winning team name prominently shown
- [ ] Final scores for both teams visible
- [ ] "Nowa Gra" button returns to lobby

**Tasks:**

- [ ] **TASK-020.1:** Create src/components/screens/WinnerScreen.tsx - 20min
- [ ] **TASK-020.2:** Add celebration styling - 15min
- [ ] **TASK-020.3:** Connect reset button to store - 10min
- [ ] **TASK-020.4:** Write component tests (/qa) - 20min
- [ ] **TASK-020.5:** Manual verification: winner screen displays correctly - 10min

---

### US-021: Implement win condition detection

**As a** game system  
**I want to** automatically detect when a team wins  
**So that** the game ends at the right time

**Status:** 📋 Planned  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**

- [ ] Fixed mode: game ends after all rounds, highest score wins
- [ ] Score mode: game ends when team reaches winning score
- [ ] Tie handling for fixed mode (co-winners)
- [ ] Game status changes to 'finished' when win detected

**Tasks:**

- [ ] **TASK-021.1:** Add win detection logic to store - 25min
- [ ] **TASK-021.2:** Implement fixed mode end condition - 15min
- [ ] **TASK-021.3:** Implement score threshold end condition - 15min
- [ ] **TASK-021.4:** Handle edge cases (ties) - 15min
- [ ] **TASK-021.5:** Write unit tests for win detection (/qa) - 30min
- [ ] **TASK-021.6:** Manual verification: game ends correctly - 10min

---

# 📦 EPIC-002: Polish & Sound

**Goal:** Add sound effects and visual polish for authentic TV-show feel

**Business Value:** Enhance entertainment value and create memorable experience

**Status:** 📋 Planned

---

## 🔧 FEATURE-007: Sound Effects

**Priority:** P2 (Medium)  
**Sprint:** Sprint 4  
**Total Points:** 5  
**Status:** 📋 Planned

### US-022: Add sound effects for game events

**As a** wedding guest  
**I want to** hear sounds when answers are revealed and mistakes happen  
**So that** the game feels like a TV show

**Status:** 📋 Planned  
**Story Points:** 3  
**Priority:** P2

**Acceptance Criteria:**

- [ ] Sound plays when answer is revealed
- [ ] Sound plays when mistake happens
- [ ] Sound plays when team wins
- [ ] Sounds can be muted in operator panel

**Tasks:**

- [ ] **TASK-022.1:** Install Howler.js - 5min
- [ ] **TASK-022.2:** Find/create sound effect files - 30min
- [ ] **TASK-022.3:** Create src/hooks/useSound.ts - 25min
- [ ] **TASK-022.4:** Integrate sounds with game actions - 15min
- [ ] **TASK-022.5:** Add mute toggle to operator panel - 10min
- [ ] **TASK-022.6:** Write tests for useSound hook (/qa) - 20min
- [ ] **TASK-022.7:** Manual verification: sounds play correctly - 10min

---

### US-023: Add volume control

**As a** operator  
**I want to** control sound volume  
**So that** I can adjust for the venue acoustics

**Status:** 📋 Planned  
**Story Points:** 2  
**Priority:** P3

**Acceptance Criteria:**

- [ ] Volume slider in operator panel
- [ ] Volume persists during session

**Tasks:**

- [ ] **TASK-023.1:** Add volume state to store - 10min
- [ ] **TASK-023.2:** Create volume slider component - 15min
- [ ] **TASK-023.3:** Connect volume to Howler.js - 10min
- [ ] **TASK-023.4:** Write component tests (/qa) - 15min
- [ ] **TASK-023.5:** Manual verification: volume control works - 5min

---

## 🔧 FEATURE-008: Animations

**Priority:** P3 (Low)  
**Sprint:** Sprint 4  
**Total Points:** 3  
**Status:** 📋 Planned

### US-024: Add reveal animation for answers

**As a** wedding guest  
**I want to** see answers animate when revealed  
**So that** reveals feel more dramatic

**Status:** 📋 Planned  
**Story Points:** 2  
**Priority:** P3

**Acceptance Criteria:**

- [ ] Answer rows animate when revealed (flip or slide)
- [ ] Animation is smooth (CSS transitions)
- [ ] Animation completes in ~500ms

**Tasks:**

- [ ] **TASK-024.1:** Design reveal animation (CSS) - 20min
- [ ] **TASK-024.2:** Implement animation on AnswerRow - 20min
- [ ] **TASK-024.3:** Write tests for animation states (/qa) - 15min
- [ ] **TASK-024.4:** Manual verification: animation looks good - 10min

---

### US-025: Add mistake X animation

**As a** wedding guest  
**I want to** see X marks appear with impact  
**So that** mistakes feel dramatic

**Status:** 📋 Planned  
**Story Points:** 1  
**Priority:** P3

**Acceptance Criteria:**

- [ ] X appears with shake or pulse animation
- [ ] Animation draws attention to the mistake

**Tasks:**

- [ ] **TASK-025.1:** Add shake/pulse animation to MistakeIndicator - 15min
- [ ] **TASK-025.2:** Write animation tests (/qa) - 10min
- [ ] **TASK-025.3:** Manual verification: animation works - 5min

---

# 📦 EPIC-003: Final Round (Optional)

**Goal:** Quick-fire final round for bonus points

**Business Value:** Extended gameplay for groups that want more

**Status:** 📋 Planned

---

## 🔧 FEATURE-009: Quick Round Mode

**Priority:** P3 (Low)  
**Sprint:** Post-MVP  
**Total Points:** 8  
**Status:** 📋 Planned

### US-026: Implement final round mode

**As a** operator  
**I want to** run a quick final round after main game  
**So that** winning team can earn bonus points

**Status:** 📋 Planned  
**Story Points:** 8  
**Priority:** P3

**Acceptance Criteria:**

- [ ] Final round option appears after game ends
- [ ] Two players from winning team participate
- [ ] First player answers 5 questions, then second player
- [ ] Timer for each answer (optional)
- [ ] Points accumulated based on matches

**Tasks:**

- [ ] **TASK-026.1:** Design final round flow - 30min
- [ ] **TASK-026.2:** Create FinalRoundScreen component - 45min
- [ ] **TASK-026.3:** Add final round types and state - 20min
- [ ] **TASK-026.4:** Implement scoring and timer - 30min
- [ ] **TASK-026.5:** Write comprehensive tests (/qa) - 45min
- [ ] **TASK-026.6:** Manual verification: final round works - 15min

---

## Status Legend

| Symbol | Meaning     |
| ------ | ----------- |
| 📋     | Planned     |
| 🔄     | In Progress |
| ✅     | Completed   |
| ⏸️     | On Hold     |
| ❌     | Cancelled   |

---

## Story Point Scale (Fibonacci)

| Points | Complexity   | Typical Duration |
| ------ | ------------ | ---------------- |
| 1      | Trivial      | < 1 hour         |
| 2      | Simple       | 1-2 hours        |
| 3      | Moderate     | 2-4 hours        |
| 5      | Complex      | 4-8 hours        |
| 8      | Very Complex | 1-2 days         |

---

## Priority Definitions

| Priority | Definition                        | SLA         |
| -------- | --------------------------------- | ----------- |
| P0       | Critical - blocks everything      | Immediate   |
| P1       | High - core functionality         | This sprint |
| P2       | Medium - important but not urgent | Next sprint |
| P3       | Low - nice to have                | Backlog     |

---

## Definition of Done (Global)

A User Story is DONE when:

- [ ] All Acceptance Criteria are met
- [ ] Code passes linting (`npm run lint`)
- [ ] All tests pass (`npm test`)
- [ ] New tests written for new functionality
- [ ] Test coverage meets standards (see CLAUDE.md)
- [ ] Manual verification completed
- [ ] Documentation updated
- [ ] Code reviewed (self-review)
- [ ] PR merged to main

---

_This backlog is a living document — update after every /discover and /docs session._
