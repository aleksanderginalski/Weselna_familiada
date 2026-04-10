import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useGameStore } from '@/store/gameStore';
import { useSound } from './useSound';

// ---------------------------------------------------------------------------
// Mock howler — vi.hoisted ensures mockPlay is initialized before vi.mock runs
// ---------------------------------------------------------------------------

const mockPlay = vi.hoisted(() => vi.fn());
const mockHowlerVolume = vi.hoisted(() => vi.fn());

vi.mock('howler', () => ({
  Howl: vi.fn().mockImplementation(() => ({ play: mockPlay })),
  Howler: { volume: mockHowlerVolume },
}));

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useSound', () => {
  beforeEach(() => {
    mockPlay.mockClear();
    mockHowlerVolume.mockClear();
    useGameStore.setState({ isMuted: false, volume: 80 });
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

  it('should return volume 80 and setVolume function by default', () => {
    // TC-127
    const { result } = renderHook(() => useSound());

    expect(result.current.volume).toBe(80);
    expect(result.current.setVolume).toBeTypeOf('function');
  });

  it('should call Howler.volume with volume/100 on mount', () => {
    // TC-128
    renderHook(() => useSound());

    expect(mockHowlerVolume).toHaveBeenCalledWith(0.8);
  });

  it('should call Howler.volume with updated value when setVolume is called', () => {
    // TC-129
    const { result } = renderHook(() => useSound());

    act(() => { result.current.setVolume(50); });

    expect(mockHowlerVolume).toHaveBeenCalledWith(0.5);
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
