import { render, screen } from '@testing-library/react';
import { useGameStore } from '@/store/gameStore';
import { TeamScore } from './TeamScore';

const MOCK_CONFIG = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 1,
    multipliers: [2],
    teams: { left: { name: 'Drużyna Pana Młodego' }, right: { name: 'Drużyna Panny Młodej' } },
  },
};

const MOCK_BANK = {
  questions: [{ question: 'Test?', answers: [{ text: 'Odpowiedź', points: 30 }] }],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
  useGameStore.setState({ rounds: [], questionBank: [] });
});

describe('TeamScore', () => {
  it('should display team name and zero score on game start', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.getState().selectQuestions(MOCK_BANK.questions);
    render(<TeamScore side="left" />);

    expect(screen.getByText('Drużyna Pana Młodego')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should display right team name and score', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.getState().selectQuestions(MOCK_BANK.questions);
    render(<TeamScore side="right" />);

    expect(screen.getByText('Drużyna Panny Młodej')).toBeInTheDocument();
  });

  it('should update score after endRound', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.getState().selectQuestions(MOCK_BANK.questions);
    useGameStore.getState().revealAnswer(0);
    useGameStore.getState().endRound('left');
    render(<TeamScore side="left" />);

    // 30 points × multiplier 2 = 60
    expect(screen.getByText('60')).toBeInTheDocument();
  });
});
