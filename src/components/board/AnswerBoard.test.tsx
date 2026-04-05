import { render, screen } from '@testing-library/react';
import { useGameStore } from '@/store/gameStore';
import { AnswerBoard } from './AnswerBoard';

const MOCK_DATA = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 1,
    multipliers: [1],
    teams: { left: { name: 'A' }, right: { name: 'B' } },
  },
  rounds: [
    {
      question: 'Test?',
      answers: [
        { text: 'Odpowiedź pierwsza', points: 30 },
        { text: 'Odpowiedź druga', points: 20 },
        { text: 'Odpowiedź trzecia', points: 10 },
      ],
    },
  ],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
});

describe('AnswerBoard', () => {
  it('should render nothing when no round is loaded', () => {
    const { container } = render(<AnswerBoard />);
    expect(container.firstChild).toBeNull();
  });

  it('should render all answer rows after game starts', () => {
    useGameStore.getState().loadGame(MOCK_DATA);
    useGameStore.getState().startGame();
    render(<AnswerBoard />);

    expect(screen.getAllByText('████████████████████')).toHaveLength(3);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should show revealed answer text and hide mask after revealAnswer', () => {
    useGameStore.getState().loadGame(MOCK_DATA);
    useGameStore.getState().startGame();
    useGameStore.getState().revealAnswer(1);
    render(<AnswerBoard />);

    expect(screen.getByText('Odpowiedź druga')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getAllByText('████████████████████')).toHaveLength(2);
  });
});
