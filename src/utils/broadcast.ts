import { GameAction, GameState } from '@/types/game';

export const CHANNEL_NAME = 'familiada-game';

/** Creates a new BroadcastChannel instance for game synchronization. */
export function createGameChannel(): BroadcastChannel {
  return new BroadcastChannel(CHANNEL_NAME);
}

/** Broadcasts the full game state to all other windows. */
export function sendSyncState(channel: BroadcastChannel, state: GameState): void {
  const message: GameAction = { type: 'SYNC_STATE', payload: state };
  channel.postMessage(message);
}

/** Requests current state from the operator window (used by board on open). */
export function requestStateSync(channel: BroadcastChannel): void {
  const message: GameAction = { type: 'REQUEST_SYNC' };
  channel.postMessage(message);
}
