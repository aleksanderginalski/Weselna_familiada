import { render, screen } from '@testing-library/react';
import { useGameStore } from '@/store/gameStore';
import { AnswerSum } from './AnswerSum';

const MOCK_CONFIG = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 1,
    multipliers: [1],
    teams: { left: { name: 'A' }, right: { name: 'B' } },
  },
};

const MOCK_BANK = {
  questions: [
    {
      question: 'Test?',
      answers: [
        { text: 'Odpowiedź 1', points: 30 },
        { text: 'Odpowiedź 2', points: 20 },
      ],
    },
  ],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
  useGameStore.setState({ rounds: [], questionBank: [] });
});

describe('AnswerSum', () => {
  it('should display Suma label and 0 on game start', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.getState().loadBank(MOCK_BANK);
    useGameStore.getState().startGame();
    render(<AnswerSum />);

    expect(screen.getByText(/Suma:/i)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should update sum when answers are revealed', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.getState().loadBank(MOCK_BANK);
    useGameStore.getState().startGame();
    useGameStore.getState().revealAnswer(0);
    useGameStore.getState().revealAnswer(1);
    render(<AnswerSum />);

    expect(screen.getByText('50')).toBeInTheDocument();
  });
});
