# Weselna Familiada - Product Backlog

**Project:** Weselna Familiada  
**Version:** 1.0  
**Last Updated:** 2025-01-XX  
**Product Owner:** Aleksander Ginalski  

---

## 📊 Backlog Overview

| Milestone | Name | Status |
|-----------|------|--------|
| M1 | Core Game Mechanics | 📋 Planned |
| M2 | Polish & Sound | 📋 Planned |
| M3 | Final Round (Optional) | 📋 Planned |

---

## 🎯 Epic Structure

```
EPIC-001: Weselna Familiada M1 - Core Game Mechanics
├── FEATURE-001: Project Setup
├── FEATURE-002: Game State Management
├── FEATURE-003: Game Board Display
├── FEATURE-004: Operator Panel
└── FEATURE-005: Game Flow & Scoring

EPIC-002: Weselna Familiada M2 - Polish & Sound
├── FEATURE-006: Sound Effects
├── FEATURE-007: Animations
└── FEATURE-008: Visual Polish

EPIC-003: Weselna Familiada M3 - Final Round (Optional)
└── FEATURE-009: Quick Round Mode
```

---

# 📦 EPIC-001: Core Game Mechanics

**Goal:** Working Familiada game with two synchronized windows

**Business Value:** Enable running Familiada game at the wedding with full game mechanics

**Status:** 📋 Planned

---

## 🔧 FEATURE-001: Project Setup

**Priority:** P0 (Critical)  
**Sprint:** Sprint 1  
**Total Points:** 5  
**Status:** 📋 Planned

### US-001: Initialize project with Vite + React + TypeScript

**As a** developer  
**I want to** have a working project scaffold  
**So that** I can start implementing game features

**Status:** 📋 Planned  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**
- [ ] Project runs with `npm run dev`
- [ ] TypeScript compilation works without errors
- [ ] Tailwind CSS is configured with Familiada theme colors
- [ ] ESLint and Prettier are configured
- [ ] Basic App.tsx renders "Weselna Familiada" title

**Tasks:**
- [ ] **TASK-001.1:** Verify package.json dependencies are correct - 15min
- [ ] **TASK-001.2:** Create src/main.tsx and src/App.tsx with basic structure - 30min
- [ ] **TASK-001.3:** Verify Tailwind config loads custom familiada colors - 15min
- [ ] **TASK-001.4:** Create src/index.css with Tailwind directives and custom styles - 20min

**Definition of Done:**
- Code passes linting
- All tests pass
- Manual verification completed
- Code reviewed and merged to main branch
- Documentation updated

---

### US-002: Create TypeScript types for game state

**As a** developer  
**I want to** have well-defined TypeScript types  
**So that** the game state is type-safe throughout the application

**Status:** 📋 Planned  
**Story Points:** 2  
**Priority:** P0

**Acceptance Criteria:**
- [ ] GameConfig type matches pytania.json structure
- [ ] GameState type covers all runtime state needs
- [ ] RoundState type handles all round phases
- [ ] GameAction type defines all possible actions
- [ ] Types are exported from src/types/index.ts

**Tasks:**
- [ ] **TASK-002.1:** Create src/types/game.ts with all type definitions - 30min
- [ ] **TASK-002.2:** Create src/types/index.ts exporting all types - 5min
- [ ] **TASK-002.3:** Verify types compile without errors - 10min

---

## 🔧 FEATURE-002: Game State Management

**Priority:** P0 (Critical)  
**Sprint:** Sprint 1  
**Total Points:** 8  
**Status:** 📋 Planned

### US-003: Implement Zustand store for game state

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
- [ ] **TASK-003.1:** Create src/store/gameStore.ts with initial state - 45min
- [ ] **TASK-003.2:** Implement loadGame action to parse JSON config - 30min
- [ ] **TASK-003.3:** Implement round control actions (selectTeam, revealAnswer, markMistake) - 45min
- [ ] **TASK-003.4:** Implement game flow actions (nextRound, resetGame) - 30min
- [ ] **TASK-003.5:** Add automatic steal logic when mistakes reach 3 - 20min

---

### US-004: Implement BroadcastChannel synchronization

**As a** operator  
**I want to** have the game board update instantly when I perform actions  
**So that** guests see changes in real-time

**Status:** 📋 Planned  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**
- [ ] BroadcastChannel is created with name 'familiada-game'
- [ ] All store actions broadcast state changes
- [ ] Board window receives and applies state updates
- [ ] Connection works offline (no server needed)

**Tasks:**
- [ ] **TASK-004.1:** Create src/utils/broadcast.ts with channel helpers - 30min
- [ ] **TASK-004.2:** Create src/hooks/useBroadcast.ts hook - 30min
- [ ] **TASK-004.3:** Integrate broadcast with Zustand store middleware - 30min
- [ ] **TASK-004.4:** Handle initial state sync when board window opens - 20min

---

## 🔧 FEATURE-003: Game Board Display

**Priority:** P0 (Critical)  
**Sprint:** Sprint 2  
**Total Points:** 13  
**Status:** 📋 Planned

### US-005: Create answer board component

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
- [ ] **TASK-005.1:** Create src/components/board/AnswerRow.tsx - 45min
- [ ] **TASK-005.2:** Create src/components/board/AnswerBoard.tsx combining rows - 30min
- [ ] **TASK-005.3:** Style answers with Familiada retro theme - 45min
- [ ] **TASK-005.4:** Add revealed/hidden state styling - 20min

---

### US-006: Create score display components

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
- [ ] **TASK-006.1:** Create src/components/board/TeamScore.tsx - 30min
- [ ] **TASK-006.2:** Create src/components/board/RoundScore.tsx for top center display - 30min
- [ ] **TASK-006.3:** Create src/components/board/AnswerSum.tsx for bottom sum - 20min

---

### US-007: Create mistake indicator component

**As a** wedding guest  
**I want to** see X marks when a team makes mistakes  
**So that** I understand the game state

**Status:** 📋 Planned  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**
- [ ] Left side shows mistakes for left team (3 slots)
- [ ] Right side shows mistakes for right team (3 slots for guessing, 1 for steal)
- [ ] Active mistakes show red X
- [ ] Empty slots show outline only
- [ ] Only controlling team's mistakes are shown

**Tasks:**
- [ ] **TASK-007.1:** Create src/components/board/MistakeIndicator.tsx - 30min
- [ ] **TASK-007.2:** Style X indicators with Familiada red theme - 20min
- [ ] **TASK-007.3:** Position indicators on left/right of answer board - 20min

---

### US-008: Assemble complete game board view

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
- [ ] **TASK-008.1:** Create src/components/board/GameBoard.tsx - 30min
- [ ] **TASK-008.2:** Connect board to BroadcastChannel receiver - 20min
- [ ] **TASK-008.3:** Test layout at 1920x1080 resolution - 15min

---

## 🔧 FEATURE-004: Operator Panel

**Priority:** P0 (Critical)  
**Sprint:** Sprint 2  
**Total Points:** 10  
**Status:** 📋 Planned

### US-009: Create answer control panel

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
- [ ] **TASK-009.1:** Create src/components/operator/AnswerControl.tsx - 45min
- [ ] **TASK-009.2:** Connect reveal buttons to store actions - 20min
- [ ] **TASK-009.3:** Add visual feedback for revealed state - 15min

---

### US-010: Create team control panel

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
- [ ] **TASK-010.1:** Create src/components/operator/TeamPanel.tsx - 45min
- [ ] **TASK-010.2:** Implement team selection logic - 20min
- [ ] **TASK-010.3:** Implement mistake button with automatic steal logic - 30min
- [ ] **TASK-010.4:** Add status text for game state - 15min

---

### US-011: Create round control panel

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
- [ ] **TASK-011.1:** Create src/components/operator/RoundControls.tsx - 30min
- [ ] **TASK-011.2:** Implement next round logic with score assignment - 30min

---

### US-012: Assemble complete operator panel

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
- [ ] **TASK-012.1:** Create src/components/operator/OperatorPanel.tsx - 30min
- [ ] **TASK-012.2:** Add "Open Board" button with window.open() - 15min
- [ ] **TASK-012.3:** Style panel for laptop screen - 20min

---

## 🔧 FEATURE-005: Game Flow & Scoring

**Priority:** P0 (Critical)  
**Sprint:** Sprint 3  
**Total Points:** 8  
**Status:** 📋 Planned

### US-013: Implement game configuration screen

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
- [ ] **TASK-013.1:** Create src/components/screens/LobbyScreen.tsx - 45min
- [ ] **TASK-013.2:** Add form for team name editing - 20min
- [ ] **TASK-013.3:** Add game mode configuration - 20min
- [ ] **TASK-013.4:** Connect to store's loadGame and startGame actions - 15min

---

### US-014: Implement winner screen

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
- [ ] **TASK-014.1:** Create src/components/screens/WinnerScreen.tsx - 30min
- [ ] **TASK-014.2:** Add confetti or celebration styling - 20min
- [ ] **TASK-014.3:** Connect reset button to store - 10min

---

### US-015: Implement win condition detection

**As a** game system  
**I want to** automatically detect when a team wins  
**So that** the game ends at the right time

**Status:** 📋 Planned  
**Story Points:** 3  
**Priority:** P0

**Acceptance Criteria:**
- [ ] Fixed mode: game ends after all rounds, highest score wins
- [ ] Score mode: game ends when team reaches winning score
- [ ] Tie handling for fixed mode (sudden death or co-winners)
- [ ] Game status changes to 'finished' when win detected

**Tasks:**
- [ ] **TASK-015.1:** Add win detection logic to store - 30min
- [ ] **TASK-015.2:** Implement fixed mode end condition - 20min
- [ ] **TASK-015.3:** Implement score threshold end condition - 20min
- [ ] **TASK-015.4:** Handle edge cases (ties) - 20min

---

# 📦 EPIC-002: Polish & Sound

**Goal:** Add sound effects and visual polish for authentic TV-show feel

**Business Value:** Enhance entertainment value and create memorable experience

**Status:** 📋 Planned

---

## 🔧 FEATURE-006: Sound Effects

**Priority:** P2 (Medium)  
**Sprint:** Sprint 4  
**Total Points:** 5  
**Status:** 📋 Planned

### US-016: Add sound effects for game events

**As a** wedding guest  
**I want to** hear sounds when answers are revealed and mistakes happen  
**So that** the game feels like a TV show

**Status:** 📋 Planned  
**Story Points:** 3  
**Priority:** P2

**Acceptance Criteria:**
- [ ] Sound plays when answer is revealed (ding/chime)
- [ ] Sound plays when mistake happens (buzzer)
- [ ] Sound plays when team wins (fanfare)
- [ ] Sounds can be muted in operator panel

**Tasks:**
- [ ] **TASK-016.1:** Find/create sound effect files - 30min
- [ ] **TASK-016.2:** Create src/hooks/useSound.ts with Howler.js - 30min
- [ ] **TASK-016.3:** Integrate sounds with game actions - 20min
- [ ] **TASK-016.4:** Add mute toggle to operator panel - 15min

---

### US-017: Add sound effect volume control

**As a** operator  
**I want to** control sound volume  
**So that** I can adjust for the venue acoustics

**Status:** 📋 Planned  
**Story Points:** 2  
**Priority:** P3

**Acceptance Criteria:**
- [ ] Volume slider in operator panel
- [ ] Volume persists during session
- [ ] Separate sounds play through system audio

**Tasks:**
- [ ] **TASK-017.1:** Add volume state to store or local storage - 15min
- [ ] **TASK-017.2:** Create volume slider component - 20min
- [ ] **TASK-017.3:** Connect volume to Howler.js - 15min

---

## 🔧 FEATURE-007: Animations

**Priority:** P3 (Low)  
**Sprint:** Sprint 4  
**Total Points:** 3  
**Status:** 📋 Planned

### US-018: Add reveal animation for answers

**As a** wedding guest  
**I want to** see answers flip or animate when revealed  
**So that** reveals feel more dramatic

**Status:** 📋 Planned  
**Story Points:** 2  
**Priority:** P3

**Acceptance Criteria:**
- [ ] Answer rows animate when revealed (flip or slide)
- [ ] Animation is smooth (CSS transitions or Framer Motion)
- [ ] Animation completes in ~500ms

**Tasks:**
- [ ] **TASK-018.1:** Design reveal animation (CSS or library) - 30min
- [ ] **TASK-018.2:** Implement animation on AnswerRow - 30min

---

### US-019: Add mistake X animation

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
- [ ] **TASK-019.1:** Add shake/pulse animation to MistakeIndicator - 20min

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

### US-020: Implement final round mode

**As a** operator  
**I want to** run a quick final round after main game  
**So that** winning team can earn bonus points

**Status:** 📋 Planned  
**Story Points:** 8  
**Priority:** P3

**Acceptance Criteria:**
- [ ] Final round option appears after reaching 300 points
- [ ] Two players from winning team participate
- [ ] First player answers 5 questions, then second player
- [ ] Timer for each answer (optional)
- [ ] Points accumulated based on matches

**Tasks:**
- [ ] **TASK-020.1:** Design final round flow - 30min
- [ ] **TASK-020.2:** Create FinalRound component - 60min
- [ ] **TASK-020.3:** Add final round questions to pytania.json format - 30min
- [ ] **TASK-020.4:** Implement scoring and timer - 45min

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| 📋 | Planned |
| 🔄 | In Progress |
| ✅ | Completed |
| ⏸️ | On Hold |
| ❌ | Cancelled |

---

## Story Point Scale (Fibonacci)

| Points | Complexity | Typical Duration |
|--------|------------|------------------|
| 1 | Trivial | < 1 hour |
| 2 | Simple | 1-2 hours |
| 3 | Moderate | 2-4 hours |
| 5 | Complex | 4-8 hours |
| 8 | Very Complex | 1-2 days |
| 13 | Epic-level | 2-3 days |

---

## Priority Definitions

| Priority | Definition | SLA |
|----------|------------|-----|
| P0 | Critical - blocks everything | Immediate |
| P1 | High - core functionality | This sprint |
| P2 | Medium - important but not urgent | Next sprint |
| P3 | Low - nice to have | Backlog |

---

*This backlog is a living document — update after every /discover and /docs session.*
