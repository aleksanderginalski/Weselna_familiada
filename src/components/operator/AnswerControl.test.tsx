import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useGameStore } from '@/store/gameStore';
import { AnswerControl } from './AnswerControl';

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
        { text: 'Wakacje nad morzem', points: 30 },
        { text: 'Góry i Tatry', points: 20 },
        { text: 'Grill z rodziną', points: 10 },
      ],
    },
  ],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
});

describe('AnswerControl', () => {
  it('should render nothing when no round is loaded', () => {
    const { container } = render(<AnswerControl />);
    expect(container.firstChild).toBeNull();
  });

  it('should display all answers with number, text, points and ODKRYJ buttons', () => {
    useGameStore.getState().loadGame(MOCK_DATA);
    useGameStore.getState().startGame();
    render(<AnswerControl />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Wakacje nad morzem')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Góry i Tatry')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();

    expect(screen.getAllByRole('button', { name: 'ODKRYJ' })).toHaveLength(3);
  });

  it('should replace ODKRYJ button with revealed indicator after clicking', async () => {
    useGameStore.getState().loadGame(MOCK_DATA);
    useGameStore.getState().startGame();
    render(<AnswerControl />);

    const buttons = screen.getAllByRole('button', { name: 'ODKRYJ' });
    await userEvent.click(buttons[0]);

    expect(screen.getAllByRole('button', { name: 'ODKRYJ' })).toHaveLength(2);
    expect(screen.getByText('✓ odkryta')).toBeInTheDocument();
  });

  it('should call revealAnswer with correct index on button click', async () => {
    useGameStore.getState().loadGame(MOCK_DATA);
    useGameStore.getState().startGame();
    render(<AnswerControl />);

    const buttons = screen.getAllByRole('button', { name: 'ODKRYJ' });
    await userEvent.click(buttons[1]);

    expect(useGameStore.getState().currentRound.revealedAnswers).toContain(1);
  });

  it('should mark already-revealed answers from store on initial render', () => {
    useGameStore.getState().loadGame(MOCK_DATA);
    useGameStore.getState().startGame();
    useGameStore.getState().revealAnswer(2);
    render(<AnswerControl />);

    expect(screen.getAllByRole('button', { name: 'ODKRYJ' })).toHaveLength(2);
    expect(screen.getByText('✓ odkryta')).toBeInTheDocument();
    expect(screen.getByText('Grill z rodziną')).toBeInTheDocument();
  });
});
