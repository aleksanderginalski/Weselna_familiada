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
};

const MOCK_BANK_DATA = {
  questions: [{ question: 'Bank Q?', answers: [{ text: 'Bank A', points: 15 }] }],
};

function mockFetch(configData = MOCK_GAME_DATA, bankData = MOCK_BANK_DATA) {
  global.fetch = vi.fn().mockImplementation((url: string) => {
    const data = url === './pytania-bank.json' ? bankData : configData;
    return Promise.resolve({ json: () => Promise.resolve(data) } as Response);
  });
}

beforeEach(() => {
  useGameStore.getState().resetGame();
  useGameStore.setState({ status: 'lobby', questionBank: [], rounds: [] });
  mockFetch();
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
    expect(screen.queryByText('Liczba rund')).not.toBeInTheDocument();
    expect(screen.getByText('DALEJ')).toBeInTheDocument();
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

  it('should disable DALEJ button when a team name is empty', async () => {
    render(<LobbyScreen />);
    await waitFor(() => screen.getByRole('heading', { name: 'WESELNA FAMILIADA' }));

    const leftInput = screen.getByDisplayValue('Drużyna A');
    await userEvent.clear(leftInput);

    expect(screen.getByText('DALEJ')).toBeDisabled();
  });

  it('should call loadGame and loadBank with edited config when DALEJ is clicked', async () => {
    render(<LobbyScreen />);
    await waitFor(() => screen.getByRole('heading', { name: 'WESELNA FAMILIADA' }));

    const leftInput = screen.getByDisplayValue('Drużyna A');
    await userEvent.clear(leftInput);
    await userEvent.type(leftInput, 'Nowa Lewa');

    await userEvent.click(screen.getByText('DALEJ'));

    const state = useGameStore.getState();
    expect(state.status).toBe('selectingQuestions');
    expect(state.teams.left.name).toBe('Nowa Lewa');
    expect(state.teams.right.name).toBe('Drużyna B');
  });

  it('should populate questionBank in store after DALEJ is clicked', async () => {
    render(<LobbyScreen />);
    await waitFor(() => screen.getByRole('heading', { name: 'WESELNA FAMILIADA' }));

    await userEvent.click(screen.getByText('DALEJ'));

    const state = useGameStore.getState();
    expect(state.questionBank).toHaveLength(1);
    expect(state.questionBank[0].question).toBe('Bank Q?');
    expect(state.rounds).toHaveLength(0);
  });

  it('should pass winningScore config when score mode selected before clicking DALEJ', async () => {
    render(<LobbyScreen />);
    await waitFor(() => screen.getByRole('heading', { name: 'WESELNA FAMILIADA' }));

    await userEvent.click(screen.getByRole('radio', { name: 'Do progu punktów' }));

    // fireEvent.change used because userEvent.clear on number input triggers
    // onChange with '' → Math.max fallback to 1, causing type('200') to append as '1200'
    const scoreInput = screen.getByRole('spinbutton');
    fireEvent.change(scoreInput, { target: { value: '200' } });

    await userEvent.click(screen.getByText('DALEJ'));

    const state = useGameStore.getState();
    expect(state.config.mode).toBe('score');
    expect(state.config.winningScore).toBe(200);
    expect(state.config.numberOfRounds).toBeUndefined();
  });
});
