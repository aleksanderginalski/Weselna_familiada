import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useGameStore } from '@/store/gameStore';
import type { GameState } from '@/types/game';
import { useBroadcast } from './useBroadcast';

// ---------------------------------------------------------------------------
// Mock BroadcastChannel — track instances to simulate incoming messages
// ---------------------------------------------------------------------------

type MockInstance = {
  name: string;
  onmessage: ((e: { data: unknown }) => void) | null;
  postMessage: ReturnType<typeof vi.fn>;
  close: ReturnType<typeof vi.fn>;
};

const mockInstances: MockInstance[] = [];

const MockBroadcastChannel = vi.fn().mockImplementation((name: string) => {
  const instance: MockInstance = {
    name,
    onmessage: null,
    postMessage: vi.fn(),
    close: vi.fn(),
  };
  mockInstances.push(instance);
  return instance;
});

vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Extracts plain GameState from store (no action functions). */
function getGameState(): GameState {
  const s = useGameStore.getState();
  return {
    config: s.config,
    rounds: s.rounds,
    status: s.status,
    currentRoundIndex: s.currentRoundIndex,
    teams: s.teams,
    currentRound: s.currentRound,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useBroadcast', () => {
  beforeEach(() => {
    mockInstances.length = 0;
    MockBroadcastChannel.mockClear();
    useGameStore.getState().resetGame();
  });

  describe('board window (?view=board)', () => {
    beforeEach(() => vi.stubGlobal('location', { search: '?view=board' }));
    afterEach(() => vi.stubGlobal('location', { search: '' }));

    it('should send REQUEST_SYNC on mount', () => {
      renderHook(() => useBroadcast());
      expect(mockInstances[0].postMessage).toHaveBeenCalledWith({ type: 'REQUEST_SYNC' });
    });

    it('should apply SYNC_STATE payload to the store', () => {
      renderHook(() => useBroadcast());
      const payload: GameState = { ...getGameState(), status: 'playing' };

      act(() => {
        mockInstances[0].onmessage?.({ data: { type: 'SYNC_STATE', payload } });
      });

      expect(useGameStore.getState().status).toBe('playing');
    });
  });

  describe('operator window (default)', () => {
    beforeEach(() => vi.stubGlobal('location', { search: '' }));

    it('should broadcast SYNC_STATE when store changes', () => {
      renderHook(() => useBroadcast());

      act(() => {
        useGameStore.getState().startGame();
      });

      const posted = mockInstances[0].postMessage.mock.calls.map(([msg]) => msg);
      expect(posted).toContainEqual(
        expect.objectContaining({
          type: 'SYNC_STATE',
          payload: expect.objectContaining({ status: 'playing' }),
        }),
      );
    });

    it('should respond with current state when REQUEST_SYNC received', () => {
      renderHook(() => useBroadcast());

      act(() => {
        mockInstances[0].onmessage?.({ data: { type: 'REQUEST_SYNC' } });
      });

      expect(mockInstances[0].postMessage).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'SYNC_STATE' }),
      );
    });
  });
});
