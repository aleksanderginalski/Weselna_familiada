import { render, screen } from '@testing-library/react';
import { useGameStore } from '@/store/gameStore';
import { RoundScore } from './RoundScore';

const MOCK_CONFIG = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 2,
    multipliers: [3, 2],
    teams: { left: { name: 'A' }, right: { name: 'B' } },
  },
};

const MOCK_BANK = {
  questions: [
    { question: 'Test?', answers: [{ text: 'Odpowiedź', points: 30 }] },
    { question: 'Test 2?', answers: [{ text: 'Odpowiedź 2', points: 50 }] },
  ],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
  useGameStore.setState({ rounds: [], questionBank: [] });
});

describe('RoundScore', () => {
  it('should display 0 points and correct multiplier on game start', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.getState().selectQuestions(MOCK_BANK.questions);
    render(<RoundScore />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('x3 mnożnik')).toBeInTheDocument();
  });

  it('should update points to win when answer is revealed', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.getState().selectQuestions(MOCK_BANK.questions);
    useGameStore.getState().revealAnswer(0);
    render(<RoundScore />);

    // 30 points × multiplier 3 = 90
    expect(screen.getByText('90')).toBeInTheDocument();
  });

  it('should use correct multiplier for second round', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.getState().selectQuestions(MOCK_BANK.questions);
    useGameStore.getState().nextRound();
    useGameStore.getState().revealAnswer(0);
    render(<RoundScore />);

    // 50 points × multiplier 2 = 100
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('x2 mnożnik')).toBeInTheDocument();
  });
});
