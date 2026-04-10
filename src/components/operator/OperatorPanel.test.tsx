import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useGameStore } from '@/store/gameStore';
import { OperatorPanel } from './OperatorPanel';

const MOCK_CONFIG = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 1,
    multipliers: [1],
    teams: { left: { name: 'Lewa' }, right: { name: 'Prawa' } },
  },
};

const MOCK_BANK = {
  questions: [
    {
      question: 'Co powinno zostać posprzątane przed świętami?',
      answers: [{ text: 'Kuchnia', points: 25 }],
    },
  ],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
  useGameStore.setState({ rounds: [], questionBank: [], currentRoundIndex: 0 });
  vi.spyOn(window, 'open').mockImplementation(() => null);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('OperatorPanel', () => {
  it('should render header with title and open-board button', () => {
    render(<OperatorPanel />);

    expect(screen.getByRole('heading', { name: /WESELNA FAMILIADA — Panel Operatora/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Otwórz Tablicę' })).toBeInTheDocument();
  });

  it('should show current question when game data is loaded', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.getState().loadBank(MOCK_BANK);
    useGameStore.getState().startGame();
    render(<OperatorPanel />);

    expect(screen.getByText('Co powinno zostać posprzątane przed świętami?')).toBeInTheDocument();
    expect(screen.getByText('Pytanie')).toBeInTheDocument();
  });

  it('should not show question section when no rounds loaded', () => {
    render(<OperatorPanel />);

    expect(screen.queryByText('Pytanie')).not.toBeInTheDocument();
  });

  it('should open board window when Otwórz Tablicę is clicked', async () => {
    render(<OperatorPanel />);

    await userEvent.click(screen.getByRole('button', { name: 'Otwórz Tablicę' }));

    expect(window.open).toHaveBeenCalledWith('/?view=board', '_blank');
  });

  it('should render mute button with "Wycisz" label when not muted', () => {
    // TC-102
    render(<OperatorPanel />);

    expect(screen.getByRole('button', { name: 'Wycisz' })).toBeInTheDocument();
  });

  it('should display "Włącz dźwięk" after mute button is clicked', async () => {
    // TC-103
    render(<OperatorPanel />);

    await userEvent.click(screen.getByRole('button', { name: 'Wycisz' }));

    expect(screen.getByRole('button', { name: 'Włącz dźwięk' })).toBeInTheDocument();
  });
});
