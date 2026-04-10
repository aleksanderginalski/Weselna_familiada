import { useEffect } from 'react';

import { useGameStore } from '@/store/gameStore';
import { GameAction, GameState } from '@/types/game';
import { createGameChannel, requestStateSync, sendSyncState } from '@/utils/broadcast';

/** Extracts serializable GameState from the full store (excludes action functions). */
function extractGameState(store: ReturnType<typeof useGameStore.getState>): GameState {
  return {
    config: store.config,
    questionBank: store.questionBank,
    rounds: store.rounds,
    status: store.status,
    currentRoundIndex: store.currentRoundIndex,
    teams: store.teams,
    currentRound: store.currentRound,
    showingWinner: store.showingWinner,
    finalRound: store.finalRound,
  };
}

/**
 * Synchronizes game state between operator and board windows via BroadcastChannel.
 * - Operator window: broadcasts state on every store change; responds to sync requests.
 * - Board window: applies incoming state; requests initial sync on mount.
 */
export function useBroadcast(): void {
  useEffect(() => {
    const isBoard = new URLSearchParams(window.location.search).get('view') === 'board';
    const channel = createGameChannel();

    if (isBoard) {
      channel.onmessage = (event: MessageEvent<GameAction>) => {
        if (event.data.type === 'SYNC_STATE') {
          useGameStore.setState(event.data.payload);
        }
      };
      // Request current state from operator immediately on open
      requestStateSync(channel);

      return () => {
        channel.close();
      };
    }

    // Operator: broadcast state after every store change
    const unsubscribe = useGameStore.subscribe((state) => {
      sendSyncState(channel, extractGameState(state));
    });

    // Operator: respond to board's initial sync request
    channel.onmessage = (event: MessageEvent<GameAction>) => {
      if (event.data.type === 'REQUEST_SYNC') {
        sendSyncState(channel, extractGameState(useGameStore.getState()));
      }
    };

    return () => {
      unsubscribe();
      channel.close();
    };
  }, []);
}
