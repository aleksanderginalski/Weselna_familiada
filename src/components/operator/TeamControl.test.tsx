import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useGameStore } from '@/store/gameStore';
import { TeamControl } from './TeamControl';

const MOCK_DATA = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 1,
    multipliers: [1],
    teams: { left: { name: 'Drużyna A' }, right: { name: 'Drużyna B' } },
  },
  rounds: [{ question: 'Test?', answers: [{ text: 'Odpowiedź', points: 30 }] }],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
  useGameStore.getState().loadGame(MOCK_DATA);
  useGameStore.getState().startGame();
});

describe('TeamControl', () => {
  it('should display both team names and disable BŁĄD button in showdown phase', () => {
    render(<TeamControl />);

    expect(screen.getByText('Drużyna A')).toBeInTheDocument();
    expect(screen.getByText('Drużyna B')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'BŁĄD' })).toBeDisabled();
    expect(screen.getByText('Wybierz drużynę, która odpowiada')).toBeInTheDocument();
  });

  it('should highlight guessing team and show 1 steal slot for opposing team after selectTeam', () => {
    useGameStore.getState().selectTeam('left');
    const { container } = render(<TeamControl />);

    // Guessing team radio is checked
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();

    // Guessing team: 3 slots, opposing team: 1 slot
    expect(container.querySelectorAll('.mistake-x')).toHaveLength(4); // 3 + 1
    expect(screen.getByRole('button', { name: 'BŁĄD' })).not.toBeDisabled();
  });

  it('should show steal phase UI after 3 mistakes', () => {
    useGameStore.getState().selectTeam('left');
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake();
    render(<TeamControl />);

    // Steal banner visible
    expect(screen.getByText(/Drużyna B przejmuje/)).toBeInTheDocument();
    // Guessing team grayed: radios disabled
    screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeDisabled());
    // BŁĄD still enabled for steal attempt
    expect(screen.getByRole('button', { name: 'BŁĄD' })).not.toBeDisabled();
  });

  it('should show steal failed message and disable BŁĄD after markMistake in steal phase', () => {
    useGameStore.getState().selectTeam('left');
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake(); // triggers steal
    useGameStore.getState().markMistake(); // steal failed
    render(<TeamControl />);

    expect(screen.getByText(/Punkty dla: Drużyna A/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'BŁĄD' })).toBeDisabled();
  });

  it('should call markMistake when BŁĄD is clicked in guessing phase', async () => {
    useGameStore.getState().selectTeam('right');
    render(<TeamControl />);

    await userEvent.click(screen.getByRole('button', { name: 'BŁĄD' }));

    expect(useGameStore.getState().currentRound.mistakes).toBe(1);
  });
});
