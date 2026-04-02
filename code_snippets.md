# Weselna Familiada - Code Snippets & Patterns

**Version:** 1.0  
**Date:** 2025-01-XX  
**Purpose:** Reusable code patterns discovered during development

---

## How to Use This Document

This document collects proven patterns and snippets discovered during development.
When implementing similar functionality, check here first to maintain consistency.

**Adding new snippets:**
- Add during /docs phase when a reusable pattern emerges
- Include: context, code, and when to use it
- Reference the US where it was first implemented

---

## 1. BroadcastChannel Patterns

### 1.1 Channel Setup

**Context:** Setting up communication between windows

**First used:** US-004

```typescript
// Create channel (same name in both windows)
const channel = new BroadcastChannel('familiada-game');

// Send message
channel.postMessage({ type: 'SYNC_STATE', payload: state });

// Receive message
channel.onmessage = (event) => {
  const { type, payload } = event.data;
  // Handle message
};

// Cleanup
channel.close();
```

---

### 1.2 Zustand Broadcast Middleware

**Context:** Auto-sync state changes to other windows

```typescript
const broadcastMiddleware = (config) => (set, get, api) =>
  config(
    (args) => {
      set(args);
      channel.postMessage({ 
        type: 'SYNC_STATE', 
        payload: get() 
      });
    },
    get,
    api
  );
```

---

## 2. Zustand Patterns

### 2.1 Selector Usage

**Context:** Prevent unnecessary re-renders

```typescript
// BAD: subscribes to entire store
const state = useGameStore();

// GOOD: subscribes only to needed slice
const score = useGameStore((state) => state.teams.left.totalScore);
const isRevealed = useGameStore((state) => 
  state.currentRound.revealedAnswers.includes(index)
);
```

---

### 2.2 Immutable Updates

**Context:** Updating nested state

```typescript
revealAnswer: (index) => set((state) => ({
  currentRound: {
    ...state.currentRound,
    revealedAnswers: [...state.currentRound.revealedAnswers, index],
    roundScore: state.currentRound.roundScore + 
      state.rounds[state.currentRoundIndex].answers[index].points
  }
}))
```

---

## 3. React Patterns

### 3.1 Window Detection Hook

**Context:** Determine if running as board or operator

```typescript
function useWindowMode() {
  const [mode, setMode] = useState<'operator' | 'board'>('operator');
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'board') {
      setMode('board');
    }
  }, []);
  
  return mode;
}
```

---

### 3.2 Open Board Window

**Context:** Opening game board in new window

```typescript
function openBoardWindow() {
  const url = `${window.location.origin}?view=board`;
  window.open(url, 'familiada-board', 'width=1920,height=1080');
}
```

---

## 4. Tailwind Patterns

### 4.1 Conditional Classes

**Context:** Applying classes based on state

```typescript
<div className={`
  answer-row
  ${isRevealed ? 'revealed' : ''}
  ${isAnimating ? 'animate-reveal' : ''}
`}>
```

---

### 4.2 Responsive Text

**Context:** Projector-friendly text sizing

```typescript
<span className="text-4xl md:text-5xl lg:text-6xl font-bold">
  {score}
</span>
```

---

## 5. Common Gotchas & Solutions

### 5.1 BroadcastChannel Not Working

**Problem:** Messages not received in other window

**Wrong approach:**
```typescript
// DON'T create new channel on every render
function Component() {
  const channel = new BroadcastChannel('familiada-game');
  // ...
}
```

**Correct approach:**
```typescript
// DO create channel once, outside component or in useEffect
const channel = new BroadcastChannel('familiada-game');

function Component() {
  useEffect(() => {
    channel.onmessage = handleMessage;
    return () => { channel.onmessage = null; };
  }, []);
}
```

---

### 5.2 State Not Syncing

**Problem:** Board window shows stale state

**Solution:** Send full state on board window connect

```typescript
// In operator window
channel.onmessage = (event) => {
  if (event.data.type === 'BOARD_CONNECTED') {
    channel.postMessage({ 
      type: 'SYNC_STATE', 
      payload: useGameStore.getState() 
    });
  }
};
```

---

## Snippet Index

| Category | Pattern | Section |
|----------|---------|---------|
| BroadcastChannel | Channel Setup | 1.1 |
| BroadcastChannel | Zustand Middleware | 1.2 |
| Zustand | Selectors | 2.1 |
| Zustand | Immutable Updates | 2.2 |
| React | Window Detection | 3.1 |
| React | Open Board | 3.2 |
| Tailwind | Conditional Classes | 4.1 |

---

*This document grows during development. Add patterns during /docs sessions.*
