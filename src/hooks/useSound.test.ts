import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useGameStore } from '@/store/gameStore';
import { useSound } from './useSound';

// ---------------------------------------------------------------------------
// Mock howler — vi.hoisted ensures mockPlay is initialized before vi.mock runs
// ---------------------------------------------------------------------------

const mockPlay = vi.hoisted(() => vi.fn());

vi.mock('howler', () => ({
  Howl: vi.fn().mockImplementation(() => ({ play: mockPlay })),
}));

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useSound', () => {
  beforeEach(() => {
    mockPlay.mockClear();
    useGameStore.setState({ isMuted: false });
  });

  it('should return all play functions, isMuted false by default, and toggleMute', () => {
    // TC-096
    const { result } = renderHook(() => useSound());

    expect(result.current.playCorrect).toBeTypeOf('function');
    expect(result.current.playWrong).toBeTypeOf('function');
    expect(result.current.playNextRound).toBeTypeOf('function');
    expect(result.current.playIntro).toBeTypeOf('function');
    expect(result.current.playWin).toBeTypeOf('function');
    expect(result.current.isMuted).toBe(false);
    expect(result.current.toggleMute).toBeTypeOf('function');
  });

  it('should call play() when a play function is invoked and not muted', () => {
    // TC-097
    const { result } = renderHook(() => useSound());

    act(() => { result.current.playCorrect(); });
    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it('should not call play() when muted', () => {
    // TC-098
    useGameStore.setState({ isMuted: true });
    const { result } = renderHook(() => useSound());

    act(() => {
      result.current.playCorrect();
      result.current.playWrong();
      result.current.playNextRound();
      result.current.playIntro();
      result.current.playWin();
    });

    expect(mockPlay).not.toHaveBeenCalled();
  });
});
