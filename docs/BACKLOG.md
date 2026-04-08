# Weselna Familiada - Product Backlog

**Project:** Weselna Familiada  
**Version:** 2.0  
**Last Updated:** 2026-04-08 (US-027, US-028 Done)  
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

**Status:** ✅ COMPLETED  
**Story Points:** 2  
**Priority:** P1

**Acceptance Criteria:**

- [x] Build job added to CI workflow
- [x] Build artifacts uploaded (optional)
- [x] Build fails if TypeScript errors exist

**Tasks:**

- [x] **TASK-008.1:** Add build job to ci.yml - 15min
- [x] **TASK-008.2:** Configure artifact upload (optional) - 10min
- [x] **TASK-008.3:** Test build failure scenario - 10min
- [x] **TASK-008.4:** Manual verification: build job works correctly - 10min

---

## 🔧 FEATURE-003: Game State Management

**Priority:** P0 (Critical)  
**Sprint:** Sprint 2  
**Total Points:** 8  
**Status:** 🔄 In Progress

### US-009: Implement Zustand store for game state

**As a** developer  
**I want to** have centralized game state management  
**So that** both windows can share the same game state

**Status:** ✅ COMPLETED  
**Story Points:** 5  
**Priority:** P0

**Acceptance Criteria:**

- [x] Zustand store holds complete GameState
- [x] Store has actions: loadGame, startGame, selectTeam, revealAnswer, markMistake, nextRound, resetGame
- [x] Actions update state immutably
- [x] Store can be initialized from pytania.json data

**Tasks:**

- [x] **TASK-009.1:** Install Zustand - 5min
- [x] **TASK-009.2:** Create src/store/gameStore.ts with initial state - 30min
- [x] **TASK-009.3:** Implement loadGame action to parse JSON config - 20min
- [x] **TASK-009.4:** Implement round control actions (selectTeam, revealAnswer, markMistake) - 30min
- [x] **TASK-009.5:** Implement game flow actions (nextRound, resetGame) - 20min
- [x] **TASK-009.6:** Add automatic steal logic when mistakes reach 3 - 15min
- [x] **TASK-009.7:** Write unit tests for all store actions (/qa) - 45min
- [x] **TASK-009.8:** Manual verification: actions work correctly - 15min

---

### US-010: Implement BroadcastChannel synchronization

**As a** operator  
**I want to** have the game board update instantly when I perform actions  
**So that** guests see changes in real-time

**Status:** ✅ COMPLETED  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**

- [x] BroadcastChannel created with name 'familiada-game'
- [x] All store actions broadcast state changes
- [x] Board window receives and applies state updates
- [x] Initial state sync when board window opens

**Tasks:**

- [x] **TASK-010.1:** Create src/utils/broadcast.ts with channel helpers - 20min
- [x] **TASK-010.2:** Create src/hooks/useBroadcast.ts hook - 20min
- [x] **TASK-010.3:** Integrate broadcast with Zustand store middleware - 25min
- [x] **TASK-010.4:** Handle initial state sync when board window opens - 15min
- [x] **TASK-010.5:** Write unit tests for broadcast utilities (/qa) - 30min
- [x] **TASK-010.6:** Manual verification: two windows stay in sync - 15min

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

**Status:** ✅ COMPLETED  
**Story Points:** 5  
**Priority:** P0

**Acceptance Criteria:**

- [x] Board displays 3-7 answer rows depending on round
- [x] Hidden answers show masked text (████████)
- [x] Revealed answers show text and points
- [x] Answer rows have retro TV-show styling
- [x] Numbers (1-7) are visible on the left side

**Tasks:**

- [x] **TASK-011.1:** Create src/components/board/AnswerRow.tsx - 30min
- [x] **TASK-011.2:** Create src/components/board/AnswerBoard.tsx combining rows - 20min
- [x] **TASK-011.3:** Style answers with Familiada retro theme - 30min
- [x] **TASK-011.4:** Add revealed/hidden state styling - 15min
- [x] **TASK-011.5:** Write component tests for AnswerRow (/qa) - 30min
- [x] **TASK-011.6:** Write component tests for AnswerBoard (/qa) - 20min
- [x] **TASK-011.7:** Manual verification: answers display correctly - 10min

---

### US-012: Create score display components

**As a** wedding guest  
**I want to** see team scores and round points  
**So that** I know who is winning

**Status:** ✅ COMPLETED  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**

- [x] Team names displayed on left and right sides
- [x] Total scores visible for each team
- [x] Round points (sum × multiplier) displayed at top center
- [x] Sum of revealed answers shown below answer board

**Tasks:**

- [x] **TASK-012.1:** Create src/components/board/TeamScore.tsx - 20min
- [x] **TASK-012.2:** Create src/components/board/RoundScore.tsx - 20min
- [x] **TASK-012.3:** Create src/components/board/AnswerSum.tsx - 15min
- [x] **TASK-012.4:** Write component tests (/qa) - 25min
- [x] **TASK-012.5:** Manual verification: scores display correctly - 10min

---

### US-013: Create mistake indicator component

**As a** wedding guest  
**I want to** see X marks when a team makes mistakes  
**So that** I understand the game state

**Status:** ✅ COMPLETED  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**

- [x] Both sides are symmetrical: the controlling team's side shows 3 small mistake slots, the opposite side shows 1 tall steal slot
- [x] Controlling team side: active mistakes show red X, empty slots show outline only
- [x] Steal slot (opposite side): same width as small slots, height equals 3 small slots combined; shows filled red X when steal failed
- [x] Steal slot is only visible during steal phase (`phase === 'steal'`)
- [x] When no team is controlling (showdown phase), both sides show no indicators
- [x] `RoundState` extended with `stealFailed: boolean` field
- [x] `markMistake()` called during steal phase sets `stealFailed: true` instead of incrementing `mistakes`

**Tasks:**

- [x] **TASK-013.1:** Add `stealFailed: boolean` to `RoundState` in src/types/game.ts and update store - 20min
- [x] **TASK-013.2:** Create src/components/board/MistakeIndicator.tsx - 25min
- [x] **TASK-013.3:** Style X indicators with Familiada red theme (3 small slots + 1 tall steal slot) - 15min
- [x] **TASK-013.4:** Write component tests (/qa) - 20min
- [x] **TASK-013.5:** Manual verification: mistakes display correctly - 10min

---

### US-014: Assemble complete game board view

**As a** operator  
**I want to** open a complete game board in a new window  
**So that** I can display it on the projector

**Status:** ✅ Done  
**Story Points:** 2  
**Priority:** P0

**Acceptance Criteria:**

- [x] GameBoard component assembles all board elements
- [x] Board fills entire window (fullscreen-friendly)
- [x] Layout matches wireframe (teams on sides, answers center, X on sides)
- [x] Board listens to BroadcastChannel for state updates

**Tasks:**

- [x] **TASK-014.1:** Create src/components/board/GameBoard.tsx - 25min
- [x] **TASK-014.2:** Connect board to BroadcastChannel receiver - 15min
- [x] **TASK-014.3:** Test layout at 1920x1080 resolution - 10min
- [x] **TASK-014.4:** Write integration tests (/qa) - 20min
- [x] **TASK-014.5:** Manual verification: board displays correctly on projector - 15min

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

**Status:** ✅ COMPLETED  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**

- [x] All answers visible with text and points
- [x] Each answer has "ODKRYJ" (Reveal) button
- [x] Revealed answers are visually marked
- [x] Buttons disabled for already revealed answers

**Tasks:**

- [x] **TASK-015.1:** Create src/components/operator/AnswerControl.tsx - 30min
- [x] **TASK-015.2:** Connect reveal buttons to store actions - 15min
- [x] **TASK-015.3:** Add visual feedback for revealed state - 10min
- [x] **TASK-015.4:** Write component tests (/qa) - 25min
- [x] **TASK-015.5:** Manual verification: reveal buttons work - 10min

---

### US-016: Create team control panel

**As a** operator  
**I want to** select which team is answering and mark mistakes  
**So that** I can manage the game flow

**Status:** ✅ COMPLETED  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**

- [x] Both teams shown with names and total scores
- [x] Radio button or toggle to select controlling team
- [x] "BŁĄD" (Mistake) button for current team
- [x] Mistake count displayed for each team
- [x] Status text shows what happens on next mistake

**Tasks:**

- [x] **TASK-016.1:** Create src/components/operator/TeamPanel.tsx - 30min
- [x] **TASK-016.2:** Implement team selection logic - 15min
- [x] **TASK-016.3:** Implement mistake button with automatic steal logic - 20min
- [x] **TASK-016.4:** Add status text for game state - 10min
- [x] **TASK-016.5:** Write component tests (/qa) - 25min
- [x] **TASK-016.6:** Manual verification: team controls work - 10min

---

### US-017: Create round control panel

**As a** operator  
**I want to** see current round info and advance to next round  
**So that** I can manage game progression

**Status:** ✅ Done  
**Story Points:** 2  
**Priority:** P0

**Acceptance Criteria:**

- [x] Current round number and total rounds displayed
- [x] Current multiplier shown
- [x] "NASTĘPNA RUNDA" button visible
- [x] Button triggers score assignment and round transition

**Tasks:**

- [x] **TASK-017.1:** Create src/components/operator/RoundControls.tsx - 20min
- [x] **TASK-017.2:** Implement next round logic with score assignment - 20min
- [x] **TASK-017.3:** Write component tests (/qa) - 20min
- [x] **TASK-017.4:** Manual verification: round controls work - 10min

---

### US-018: Assemble complete operator panel

**As a** operator  
**I want to** have all controls in one organized panel  
**So that** I can efficiently manage the game

**Status:** ✅ COMPLETED  
**Story Points:** 2  
**Priority:** P0

**Acceptance Criteria:**

- [x] Panel shows current question at top
- [x] Answer controls, team panels, and round controls organized
- [x] "Otwórz Tablicę" button opens board in new window
- [x] Panel layout is intuitive and not cluttered

**Tasks:**

- [x] **TASK-018.1:** Create src/components/operator/OperatorPanel.tsx - 25min
- [x] **TASK-018.2:** Add "Open Board" button with window.open() - 10min
- [x] **TASK-018.3:** Style panel for laptop screen - 15min
- [x] **TASK-018.4:** Write integration tests (/qa) - 20min
- [x] **TASK-018.5:** Manual verification: full operator workflow - 15min

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

**Status:** ✅ COMPLETED  
**Story Points:** 3  
**Priority:** P1

**Acceptance Criteria:**

- [x] Lobby screen shows before game starts
- [x] Team names can be edited
- [x] Game mode selection (fixed rounds vs score threshold)
- [x] Number of rounds or winning score configurable
- [x] "Start Game" button begins the game

**Tasks:**

- [x] **TASK-019.1:** Create src/components/screens/LobbyScreen.tsx - 30min
- [x] **TASK-019.2:** Add form for team name editing - 15min
- [x] **TASK-019.3:** Add game mode configuration - 15min
- [x] **TASK-019.4:** Connect to store's loadGame and startGame actions - 10min
- [x] **TASK-019.5:** Write component tests (/qa) - 25min
- [x] **TASK-019.6:** Manual verification: configuration works - 10min

---

### US-020: Implement winner screen

**As a** wedding guest  
**I want to** see a celebration when a team wins  
**So that** the game has a satisfying conclusion

**Status:** ✅ COMPLETED  
**Story Points:** 2  
**Priority:** P1

**Acceptance Criteria:**

- [x] Winner screen displays when game ends
- [x] Winning team name prominently shown
- [x] Final scores for both teams visible
- [x] "Nowa Gra" button returns to lobby

**Tasks:**

- [x] **TASK-020.1:** Create src/components/screens/WinnerScreen.tsx - 20min
- [x] **TASK-020.2:** Add celebration styling - 15min
- [x] **TASK-020.3:** Connect reset button to store - 10min
- [x] **TASK-020.4:** Write component tests (/qa) - 20min
- [x] **TASK-020.5:** Manual verification: winner screen displays correctly - 10min

---

### US-021: Implement win condition detection

**As a** game system  
**I want to** automatically detect when a team wins  
**So that** the game ends at the right time

**Status:** ✅ COMPLETED  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**

- [x] Fixed mode: game ends after all rounds, highest score wins
- [x] Score mode: game ends when team reaches winning score
- [x] Tie handling for fixed mode (co-winners)
- [x] Game status changes to 'finished' when win detected

**Tasks:**

- [x] **TASK-021.1:** Add win detection logic to store - 25min
- [x] **TASK-021.2:** Implement fixed mode end condition - 15min
- [x] **TASK-021.3:** Implement score threshold end condition - 15min
- [x] **TASK-021.4:** Handle edge cases (ties) - 15min
- [x] **TASK-021.5:** Write unit tests for win detection (/qa) - 30min
- [x] **TASK-021.6:** Manual verification: game ends correctly - 10min

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

**Status:** ✅ Completed  
**Story Points:** 3  
**Priority:** P2

**Acceptance Criteria:**

- [x] Sound plays when answer is revealed (`dobra-odpowiedz-familiada.mp3`)
- [x] Sound plays when mistake happens (`bledna-familiada.mp3`)
- [x] Sound plays when "Następna Runda" is clicked (`przed-i-po-rundzie-familiada.mp3`)
- [x] Sound plays when game starts / "Rozpocznij grę" is clicked (`intro-familiada.mp3`)
- [x] Sound plays when team wins — **placeholder**: uses `przed-finalem-familiada.mp3`; proper win sound (`wygrana-familiada.mp3`) will be wired in US-026
- [x] Sounds can be muted in operator panel

**Notes:**
- `public/sounds/przed-finalem-familiada.mp3` is in the folder but intentionally NOT wired for final round — reserved for US-026
- Win sound placeholder: `przed-finalem-familiada.mp3` — will be replaced by `wygrana-familiada.mp3` in US-026
- Sound on last round fixed: "NASTĘPNA RUNDA" does not play `przed-i-po-rundzie` when it would trigger game end (WinnerScreen plays its own sound instead)

**Tasks:**

- [x] **TASK-022.1:** Install Howler.js — already installed (`howler@2.2.4`)
- [x] **TASK-022.2:** Provide sound effect files — files placed in `public/sounds/`
- [x] **TASK-022.3:** Create src/hooks/useSound.ts
- [x] **TASK-022.4:** Integrate sounds with game actions
- [x] **TASK-022.5:** Add mute toggle to operator panel
- [x] **TASK-022.6:** Write tests for useSound hook (/qa)
- [x] **TASK-022.7:** Manual verification: sounds play correctly

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

### US-027: Apply custom Familiada font to game board

**As a** wedding guest  
**I want to** see the board rendered in the authentic Familiada dot-matrix font  
**So that** the display looks like the original TV show

**Status:** ✅ COMPLETED  
**Story Points:** 3  
**Priority:** P2

**Acceptance Criteria:**

- [x] `Familiada-2.otf` (dot-matrix board glyphs) served from `public/fonts/`
- [x] `Familiada` (headings, labels) served from `public/fonts/` (woff2 + ttf)
- [x] `font-display` Tailwind token → Familiada-2 (board cells only)
- [x] `font-heading` Tailwind token → Familiada (operator panel, scores, winner screen)
- [x] `font-body` Tailwind token → Arial (UI text)
- [x] `DotMatrixBoard` uses 10×30 LED grid; cell aspect-ratio 5:7 matching Familiada-2 em-square (640×896)
- [x] Container query (`cqi`) sizes font so glyphs fill each cell exactly; `line-height: 1`
- [x] Hidden answers render U+2026 (Horizontal Ellipsis) as dot-matrix circles from Familiada-2
- [x] `DigitDisplay` styled with gold outer border → black inner border, `font-heading` labels
- [x] `FinalRoundDotMatrix` uses same 10×30 grid for projector view during final round

**Notes:**
- Familiada-2 em-square: 640×896 (5:7 ratio) — cell must use `aspect-ratio: 5/7`
- Grid math: 30 cols × 5 + 29 gaps × 1 = 179 units → `FONT_SIZE = 'calc(700cqi / 179)'`
- Intro sound (`playIntro`) moved from LobbyScreen "Nowa Gra" to OperatorPanel "Otwórz Tablicę"

**Tasks:**

- [x] **TASK-027.1:** Add font files to `public/fonts/`
- [x] **TASK-027.2:** Declare `@font-face` in `src/index.css`
- [x] **TASK-027.3:** Add `font-display`, `font-heading`, `font-body` tokens to `tailwind.config.js`
- [x] **TASK-027.4:** Rewrite `DotMatrixBoard` with cqi sizing, 5:7 cells, Horizontal Ellipsis dots
- [x] **TASK-027.5:** Create `DigitDisplay` shared component with gold/black double border
- [x] **TASK-027.6:** Create `FinalRoundDotMatrix` and `FinalRoundGameBoard` for final round projector view
- [x] **TASK-027.7:** Update `TeamScore`, `LobbyScreen`, `OperatorPanel`, `WinnerScreen` to use `font-heading`
- [x] **TASK-027.8:** Write 3 tests (TC-125 through TC-127)
- [x] **TASK-027.9:** Manual verification: board renders correctly with font

---

### US-028: Show mistake X marks on dot-matrix board

**As a** wedding guest  
**I want to** see mistake X marks rendered directly on the dot-matrix board  
**So that** the board looks like the original TV show without a separate indicator widget

**Status:** ✅ COMPLETED  
**Story Points:** 2  
**Priority:** P2

**Acceptance Criteria:**

- [x] Small mistake X (3×3 Unicode spacing characters) shown in cols 1–3 (left team) or cols 28–30 (right team)
- [x] Up to 3 small mistakes displayed at rows 2–4, 5–7, 8–10 respectively
- [x] Big mistake X (failed steal, 5-row Unicode pattern) shown on the steal team's side
- [x] No separate `MistakeIndicator` component in `GameBoard`
- [x] X glyphs use Unicode spacing characters (U+2000–U+200A) rendered via Familiada-2 font

**Notes:**
- Small mistake pattern: 7 cells forming an X in a 3×3 block; anchored at rows 1, 4, 7 (0-indexed)
- Big mistake pattern: 9 cells spanning rows 3–7 (0-indexed), 3 columns wide
- Left team anchor col: 0; right team anchor col: 27 (0-indexed)
- `buildGrid()` extended with `controllingTeam`, `mistakes`, `stealFailed` params

**Tasks:**

- [x] **TASK-028.1:** Define `SMALL_MISTAKE_PATTERN` and `BIG_MISTAKE_PATTERN` constants
- [x] **TASK-028.2:** Extend `buildGrid()` to render mistakes onto the grid
- [x] **TASK-028.3:** Remove `MistakeIndicator` from `GameBoard`
- [x] **TASK-028.4:** Write 6 tests (TC-128 through TC-133)
- [x] **TASK-028.5:** Manual verification: X marks render correctly for both teams

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

**Status:** ✅ COMPLETED  
**Story Points:** 8  
**Priority:** P3

**Acceptance Criteria:**

- [x] Final round option appears after game ends (in RoundControls, after last round summary)
- [x] Two players from winning team participate
- [x] First player answers 5 questions, then second player
- [x] Timer for each player (15s for Player A, 20s for Player B; adjustable with +5s/-5s)
- [x] Points accumulated based on correct matches; final score = (team score + final sum) × 15; +25 000 bonus if final sum ≥ 200

**Notes:**
- End-game choice ("OGŁOŚ ZWYCIĘSTWO" / "RUNDA FINAŁOWA") appears inside RoundControls after the last round ends — no separate screen
- Questions loaded from `public/pytania-final.json` (5 questions, each with up to 5 answers)
- `wygrana-familiada.mp3` not yet available — win sound still uses `przed-finalem-familiada.mp3` as placeholder
- Board window shows no "Nowa Gra" button; winner text and score are 2× larger on board

**Tasks:**

- [x] **TASK-026.1:** Design final round flow
- [x] **TASK-026.2:** Create `FinalRoundBoard.tsx`, `FinalRoundOperator.tsx`, `FinalRoundTimerPanel.tsx`, `FinalRoundQuestionRow.tsx`
- [x] **TASK-026.3:** Add final round types (`FinalRoundState`, `FinalRoundAnswer`, `FinalRoundPhase`, etc.) to `game.ts`; extend `GameStatus` with `'finalRound'`
- [x] **TASK-026.4:** Implement scoring, timer, and all store actions (`startFinalRound`, `tickTimer`, `revealFinalAnswer`, `finishFinalRound`, etc.)
- [x] **TASK-026.5:** Wire `playFinalRound`, `playBell`, `playTimerEnd` in `useSound.ts`
- [x] **TASK-026.6:** Write 21 tests (TC-104 through TC-124)
- [x] **TASK-026.7:** Manual verification: final round works end-to-end

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
