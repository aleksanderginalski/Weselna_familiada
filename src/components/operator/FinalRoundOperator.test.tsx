import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useGameStore } from '@/store/gameStore';
import { FinalRoundAnswer, FinalRoundState } from '@/types/game';
import { FinalRoundOperator } from './FinalRoundOperator';

vi.mock('howler', () => ({
  Howl: vi.fn().mockImplementation(() => ({ play: vi.fn() })),
  Howler: { volume: vi.fn() },
}));

function makePendingAnswers(count: number): FinalRoundAnswer[] {
  return Array.from({ length: count }, () => ({
    text: '',
    points: 0,
    isRevealed: false,
    pointsVisible: false,
    type: 'pending' as const,
  }));
}

const mockFinalRound: FinalRoundState = {
  questions: Array.from({ length: 5 }, (_, i) => ({
    question: `Question ${i + 1}`,
    answers: [{ text: 'Answer', points: 10 }],
  })),
  playerA: makePendingAnswers(5),
  playerB: makePendingAnswers(5),
  playerAHidden: false,
  phase: 'answeringA',
  timerRunning: false,
  timerSecondsLeft: 15,
  playerAInitialTimer: 15,
  playerBInitialTimer: 20,
};

describe('FinalRoundOperator', () => {
  beforeEach(() => {
    useGameStore.setState({ finalRound: mockFinalRound, isMuted: false, volume: 80 });
  });

  it('should render mute button and volume slider in header', () => {
    // TC-132
    render(<FinalRoundOperator />);

    expect(screen.getByRole('button', { name: /wycisz/i })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Głośność' })).toBeInTheDocument();
  });
});
