# Weselna Familiada - Requirements Documentation

**Version:** 1.0  
**Date:** 2025-01-XX  
**Author:** Product Owner  
**Status:** Initial requirements

---

## 1. Introduction

### 1.1 Application Purpose
Wedding Familiada is a game application for running Family Feud style games at weddings and family events. Two teams compete by guessing survey answers, with points awarded based on popularity.

### 1.2 Target Users
- **Primary:** Wedding host (wodzirej) or designated operator
- **Secondary:** Wedding guests as players and audience

### 1.3 Usage Context
- Wedding reception or family party
- Laptop connected to projector
- Offline environment (no internet dependency)

---

## 2. Functional Requirements — M1: Core Game Mechanics

### FR-001: Two-Window Display

**Priority:** MUST HAVE

**Description:**
Application runs in two browser windows: Operator Panel (laptop screen) and Game Board (projector via extended display).

**Acceptance Criteria:**
- Operator can open Game Board in new window
- Both windows stay synchronized in real-time
- Works without internet connection

---

### FR-002: Question Loading

**Priority:** MUST HAVE

**Description:**
Game loads questions and configuration from a JSON file that can be edited before the event.

**Acceptance Criteria:**
- JSON file in /public folder
- Supports 3-7 answers per question
- Configurable team names
- Configurable game mode (fixed rounds or score threshold)

---

### FR-003: Answer Management

**Priority:** MUST HAVE

**Description:**
Operator can reveal individual answers and mark mistakes.

**Acceptance Criteria:**
- Each answer has individual reveal button
- Revealed answers show text and points
- Hidden answers show masked placeholder
- Mistake button adds X to current team

---

### FR-004: Team Management

**Priority:** MUST HAVE

**Description:**
Operator can select which team is currently answering and track scores.

**Acceptance Criteria:**
- Toggle between left and right team
- Track mistakes per team (max 3, then steal)
- Automatic steal trigger after 3 mistakes
- Total score tracking per team

---

### FR-005: Round Progression

**Priority:** MUST HAVE

**Description:**
Operator can advance through rounds with proper scoring.

**Acceptance Criteria:**
- Round multipliers (x1, x2, x3, x3)
- Points assigned to winning team at round end
- Next round button advances game
- Win condition detection (fixed or score mode)

---

### FR-006: Game Board Display

**Priority:** MUST HAVE

**Description:**
Game Board shows all game state for audience viewing.

**Acceptance Criteria:**
- Answer board with numbered rows (1-7)
- Team names and total scores on sides
- Mistake indicators (X) on left/right
- Round points at top center
- Retro TV-show styling

---

## 3. Functional Requirements — M2: Polish & Sound

### FR-007: Sound Effects

**Priority:** SHOULD HAVE

**Description:**
Audio feedback for game events.

**Acceptance Criteria:**
- Sound on answer reveal
- Sound on mistake
- Sound on win
- Mute toggle in operator panel

---

### FR-008: Animations

**Priority:** COULD HAVE

**Description:**
Visual animations for dramatic effect.

**Acceptance Criteria:**
- Answer reveal animation
- Mistake X animation
- Winner celebration effect

---

## 4. Non-Functional Requirements

### NFR-001: Performance

**Requirement:** Responsive UI with no perceptible lag

**Metrics:**
- State sync between windows: < 50ms
- UI response to clicks: < 100ms

---

### NFR-002: Offline Operation

**Requirement:** Full functionality without internet

**Implementation:**
- No external API calls
- All assets bundled locally
- BroadcastChannel for local sync

---

### NFR-003: Display Compatibility

**Requirement:** Game Board optimized for projector display

**Criteria:**
- 1920x1080 primary target resolution
- High contrast colors for visibility
- Large text readable from distance

---

### NFR-004: Browser Compatibility

**Platforms:**
- Chrome 90+ (primary)
- Edge 90+ (secondary)
- Firefox 90+ (secondary)

---

## 5. Data Requirements

### 5.1 Question File Format (pytania.json)

```json
{
  "config": {
    "mode": "fixed",
    "numberOfRounds": 4,
    "multipliers": [1, 2, 3, 3],
    "teams": {
      "left": { "name": "Drużyna Pana Młodego" },
      "right": { "name": "Drużyna Panny Młodej" }
    }
  },
  "rounds": [
    {
      "question": "Pytanie?",
      "answers": [
        { "text": "Odpowiedź", "points": 30 }
      ]
    }
  ]
}
```

### 5.2 Game State (Runtime)

- Current round index
- Revealed answers
- Team scores
- Mistakes count
- Game phase

---

## 6. Constraints

### 6.1 Technical Constraints
- Must work offline
- Must run in modern browser
- No server-side components
- Single laptop deployment

### 6.2 User Constraints
- Operator has basic computer skills
- No training time available
- Must be intuitive to use under event pressure

---

## 7. Out of Scope (for MVP)

- Multi-device sync (tablets, phones)
- Cloud storage for questions
- Built-in question editor
- Statistics/history tracking
- Multi-language support

---

*This document is updated when new requirements are discovered during /discover or /docs sessions.*
