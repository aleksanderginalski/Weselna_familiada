import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useGameStore } from '@/store/gameStore';
import { LobbyScreen } from './LobbyScreen';

const MOCK_GAME_DATA = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 3,
    multipliers: [1, 2, 3],
    teams: { left: { name: 'Drużyna A' }, right: { name: 'Drużyna B' } },
  },
  rounds: [{ question: 'Pytanie?', answers: [{ text: 'Odpowiedź', points: 10 }] }],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
  global.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve(MOCK_GAME_DATA),
  } as Response);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('LobbyScreen', () => {
  it('should show loading state then render form with pre-filled values from JSON', async () => {
    render(<LobbyScreen />);

    expect(screen.getByText('Ładowanie...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'WESELNA FAMILIADA' })).toBeInTheDocument();
    });

    expect(screen.getByDisplayValue('Drużyna A')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Drużyna B')).toBeInTheDocument();
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
    expect(screen.getByText('ROZPOCZNIJ GRĘ')).toBeInTheDocument();
  });

  it('should show error message when fetch fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    render(<LobbyScreen />);

    await waitFor(() => {
      expect(screen.getByText(/Błąd ładowania pytań/i)).toBeInTheDocument();
    });
  });

  it('should show winningScore field when score mode is selected', async () => {
    render(<LobbyScreen />);
    await waitFor(() => screen.getByRole('heading', { name: 'WESELNA FAMILIADA' }));

    await userEvent.click(screen.getByRole('radio', { name: 'Do progu punktów' }));

    expect(screen.getByText('Próg punktów do wygranej')).toBeInTheDocument();
    expect(screen.queryByText('Liczba rund')).not.toBeInTheDocument();
  });

  it('should disable Start Game button when a team name is empty', async () => {
    render(<LobbyScreen />);
    await waitFor(() => screen.getByRole('heading', { name: 'WESELNA FAMILIADA' }));

    const leftInput = screen.getByDisplayValue('Drużyna A');
    await userEvent.clear(leftInput);

    expect(screen.getByText('ROZPOCZNIJ GRĘ')).toBeDisabled();
  });

  it('should call loadGame and startGame with edited config when Start Game is clicked', async () => {
    render(<LobbyScreen />);
    await waitFor(() => screen.getByRole('heading', { name: 'WESELNA FAMILIADA' }));

    const leftInput = screen.getByDisplayValue('Drużyna A');
    await userEvent.clear(leftInput);
    await userEvent.type(leftInput, 'Nowa Lewa');

    await userEvent.click(screen.getByText('ROZPOCZNIJ GRĘ'));

    const state = useGameStore.getState();
    expect(state.status).toBe('playing');
    expect(state.teams.left.name).toBe('Nowa Lewa');
    expect(state.teams.right.name).toBe('Drużyna B');
  });

  it('should populate questionBank in store after fetching pytania-bank.json', async () => {
    const bankQuestion = { question: 'Bank Q?', answers: [{ text: 'Bank A', points: 15 }] };
    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url === '/pytania-bank.json') {
        return Promise.resolve({ json: () => Promise.resolve({ questions: [bankQuestion] }) } as Response);
      }
      return Promise.resolve({ json: () => Promise.resolve(MOCK_GAME_DATA) } as Response);
    });

    render(<LobbyScreen />);
    await waitFor(() => screen.getByRole('heading', { name: 'WESELNA FAMILIADA' }));

    const state = useGameStore.getState();
    expect(state.questionBank).toHaveLength(1);
    expect(state.questionBank[0].question).toBe('Bank Q?');
    expect(state.rounds).toHaveLength(1);
  });

  it('should pass winningScore config when score mode selected before starting', async () => {
    render(<LobbyScreen />);
    await waitFor(() => screen.getByRole('heading', { name: 'WESELNA FAMILIADA' }));

    await userEvent.click(screen.getByRole('radio', { name: 'Do progu punktów' }));

    // After switching to score mode there is exactly one spinbutton (winningScore)
    // fireEvent.change used because userEvent.clear on number input triggers
    // onChange with '' → Math.max fallback to 1, causing type('200') to append as '1200'
    const scoreInput = screen.getByRole('spinbutton');
    fireEvent.change(scoreInput, { target: { value: '200' } });

    await userEvent.click(screen.getByText('ROZPOCZNIJ GRĘ'));

    const state = useGameStore.getState();
    expect(state.config.mode).toBe('score');
    expect(state.config.winningScore).toBe(200);
    expect(state.config.numberOfRounds).toBeUndefined();
  });
});
