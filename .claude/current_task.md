# Current Task — US-010

## Context
Implement BroadcastChannel synchronization so the game board window instantly
reflects all state changes made in the operator panel. Both windows run the same
Vite app; they communicate via BroadcastChannel API (no server needed).
US-009 (Zustand store) is complete — `gameStore.ts` and all `GameAction` types exist.

## Read
- src/types/game.ts (GameAction union — needs REQUEST_SYNC added)
- src/store/gameStore.ts (store shape: GameState & StoreActions)
- CLAUDE.md (Key Patterns → BroadcastChannel, Window Detection)

## Tasks
1. Add `{ type: 'REQUEST_SYNC' }` to the `GameAction` union in `src/types/game.ts`
2. Create `src/utils/broadcast.ts` with:
   - `CHANNEL_NAME = 'familiada-game'` constant
   - `createGameChannel(): BroadcastChannel`
   - `sendSyncState(channel, state: GameState): void`
   - `requestStateSync(channel): void`
3. Create `src/hooks/useBroadcast.ts` with a `useBroadcast()` hook:
   - Detects window role via `new URLSearchParams(window.location.search).get('view') === 'board'`
   - **Board side:** sets `channel.onmessage` to apply `SYNC_STATE` via `useGameStore.setState(payload)`,
     then sends `REQUEST_SYNC` for initial state on mount
   - **Operator side:** subscribes to store via `useGameStore.subscribe()` and broadcasts state
     after every change; also listens for `REQUEST_SYNC` and responds with current state
   - Proper cleanup: unsubscribe + `channel.close()` on unmount
   - Extract only `GameState` fields (config, rounds, status, currentRoundIndex, teams, currentRound)
     when broadcasting — do not send store actions

## Constraints
- Do NOT modify gameStore.ts (keep store pure; broadcasting is the hook's responsibility)
- No new dependencies — BroadcastChannel is a native browser API
- Types must be explicit — no `any`
- Each file max 60 lines
- Follow naming conventions from CLAUDE.md

## After implementation
- Run linter: npm run lint
- Run tests: npm test
- List manual verification steps (in Polish)
