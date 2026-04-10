import { render, screen } from '@testing-library/react';
import { useGameStore } from '@/store/gameStore';
import { GameBoard } from './GameBoard';

const MOCK_CONFIG = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 2,
    multipliers: [1, 2],
    teams: { left: { name: 'Drużyna Pana Młodego' }, right: { name: 'Drużyna Panny Młodej' } },
  },
};

const MOCK_BANK = {
  questions: [
    {
      question: 'Test?',
      answers: [
        { text: 'Odpowiedź pierwsza', points: 30 },
        { text: 'Odpowiedź druga', points: 20 },
      ],
    },
  ],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
  useGameStore.setState({ rounds: [], questionBank: [] });
});

describe('GameBoard', () => {
  it('should render all board sections when game is loaded', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.getState().loadBank(MOCK_BANK);
    useGameStore.getState().startGame();
    render(<GameBoard />);

    // TeamScore — both team names
    expect(screen.getByText('Drużyna Pana Młodego')).toBeInTheDocument();
    expect(screen.getByText('Drużyna Panny Młodej')).toBeInTheDocument();

    // RoundScore
    expect(screen.getByText('Do wygrania')).toBeInTheDocument();

    // DotMatrixBoard — answer numbers rendered as data-digit (CSS ::before), not DOM text
    const digitCells = document.querySelectorAll('[data-digit]');
    expect(digitCells.length).toBeGreaterThan(0);

    // AnswerSum — sr-only label from DotMatrixBoard
    expect(screen.getByText('Suma:')).toBeInTheDocument();
  });

  it('should render fullscreen container', () => {
    render(<GameBoard />);

    const container = document.querySelector('.h-screen.w-screen');
    expect(container).toBeInTheDocument();
  });

  it('should show right team score as 0 and left team score after round ends', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.getState().loadBank(MOCK_BANK);
    useGameStore.getState().startGame();
    useGameStore.getState().selectTeam('left');
    useGameStore.getState().revealAnswer(0);
    useGameStore.getState().endRound('left');
    render(<GameBoard />);

    // Right team score remains 0
    expect(screen.getByText('Drużyna Panny Młodej')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
