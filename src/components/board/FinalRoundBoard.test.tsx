import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useGameStore } from '@/store/gameStore';
import { FinalRoundAnswer } from '@/types/game';
import { FinalRoundBoard } from './FinalRoundBoard';

const PENDING: FinalRoundAnswer = {
  text: '',
  points: 0,
  isRevealed: false,
  pointsVisible: false,
  type: 'pending',
};

function makeFinalRoundState(overrides: Partial<ReturnType<typeof useGameStore.getState>['finalRound'] & object> = {}) {
  return {
    questions: Array.from({ length: 5 }, (_, i) => ({
      question: `Q${i + 1}`,
      answers: [{ text: 'Answer', points: 10 }],
    })),
    playerA: Array(5).fill(PENDING),
    playerB: Array(5).fill(PENDING),
    playerAHidden: false,
    phase: 'answeringA' as const,
    timerRunning: false,
    timerSecondsLeft: 0,
    playerAInitialTimer: 15,
    playerBInitialTimer: 20,
    ...overrides,
  };
}

beforeEach(() => {
  useGameStore.getState().resetGame();
});

describe('FinalRoundBoard', () => {
  it('should render 5 rows with ? in all point cells and SUMA: 0 when no answers revealed', () => {
    // TC-120
    useGameStore.setState({
      ...useGameStore.getState(),
      status: 'finalRound',
      finalRound: makeFinalRoundState(),
    });
    render(<FinalRoundBoard />);

    expect(screen.getByText('Runda Finałowa')).toBeInTheDocument();
    expect(screen.getByText('SUMA:')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    // 5 rows × 2 players = 10 "?" cells
    const questionMarks = screen.getAllByText('?');
    expect(questionMarks).toHaveLength(10);
  });

  it('should show revealed answer text and points when answer is revealed and pointsVisible', () => {
    // TC-121
    const revealed: FinalRoundAnswer = {
      text: 'Marchewka',
      points: 28,
      isRevealed: true,
      pointsVisible: true,
      type: 'correct',
    };
    const playerA = [revealed, PENDING, PENDING, PENDING, PENDING];
    useGameStore.setState({
      ...useGameStore.getState(),
      status: 'finalRound',
      finalRound: makeFinalRoundState({ playerA }),
    });
    render(<FinalRoundBoard />);

    expect(screen.getByText('Marchewka')).toBeInTheDocument();
    // Points appear both in the row cell and in SUMA footer
    expect(screen.getAllByText('28')).toHaveLength(2);
  });

  it('should hide player A answer texts when playerAHidden is true but keep points', () => {
    // TC-122
    const revealed: FinalRoundAnswer = {
      text: 'Uszy',
      points: 35,
      isRevealed: true,
      pointsVisible: true,
      type: 'correct',
    };
    useGameStore.setState({
      ...useGameStore.getState(),
      status: 'finalRound',
      finalRound: makeFinalRoundState({
        playerA: [revealed, PENDING, PENDING, PENDING, PENDING],
        playerAHidden: true,
        phase: 'answeringB',
      }),
    });
    render(<FinalRoundBoard />);

    expect(screen.queryByText('Uszy')).not.toBeInTheDocument();
    // Points appear in both the row cell and SUMA footer
    expect(screen.getAllByText('35')).toHaveLength(2);
  });

  it('should display the timer when timerSecondsLeft is greater than 0', () => {
    // TC-123
    useGameStore.setState({
      ...useGameStore.getState(),
      status: 'finalRound',
      finalRound: makeFinalRoundState({ timerSecondsLeft: 15, timerRunning: false }),
    });
    render(<FinalRoundBoard />);

    expect(screen.getByText('00:15')).toBeInTheDocument();
  });

  it('should render nothing when finalRound is undefined', () => {
    // TC-124
    useGameStore.setState({ ...useGameStore.getState(), finalRound: undefined });
    const { container } = render(<FinalRoundBoard />);

    expect(container.firstChild).toBeNull();
  });
});
