import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { GameState } from '@/types/game';
import { CHANNEL_NAME, createGameChannel, requestStateSync, sendSyncState } from './broadcast';

const mockPostMessage = vi.fn();

class MockBroadcastChannel {
  name: string;
  onmessage = null;
  postMessage = mockPostMessage;
  close = vi.fn();
  constructor(name: string) {
    this.name = name;
  }
}

vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);

describe('broadcast', () => {
  beforeEach(() => {
    mockPostMessage.mockClear();
  });

  it('should export CHANNEL_NAME as familiada-game', () => {
    expect(CHANNEL_NAME).toBe('familiada-game');
  });

  it('should createGameChannel with correct channel name', () => {
    const ch = createGameChannel();
    expect(ch.name).toBe(CHANNEL_NAME);
  });

  it('should sendSyncState post SYNC_STATE message with payload', () => {
    const ch = createGameChannel();
    const state = { status: 'playing' } as unknown as GameState;
    sendSyncState(ch, state);
    expect(mockPostMessage).toHaveBeenCalledWith({ type: 'SYNC_STATE', payload: state });
  });

  it('should requestStateSync post REQUEST_SYNC message', () => {
    const ch = createGameChannel();
    requestStateSync(ch);
    expect(mockPostMessage).toHaveBeenCalledWith({ type: 'REQUEST_SYNC' });
  });
});
