import { render, screen, waitFor } from '@testing-library/react';
import { useGameStore } from '@/store/gameStore';
import { App } from './App';

const MOCK_GAME_DATA = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 1,
    multipliers: [1],
    teams: { left: { name: 'Lewa' }, right: { name: 'Prawa' } },
  },
  rounds: [{ question: 'Pytanie testowe?', answers: [{ text: 'Odpowiedź', points: 10 }] }],
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

describe('App', () => {
  it('should render lobby screen when status is lobby', async () => {
    render(<App />);

    // LobbyScreen fetches pytania.json and shows the form after loading
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /WESELNA FAMILIADA/i })).toBeInTheDocument();
    });
    expect(screen.getByText('ROZPOCZNIJ GRĘ')).toBeInTheDocument();
  });

  it('should render operator panel when status is playing', () => {
    useGameStore.getState().loadGame(MOCK_GAME_DATA);
    useGameStore.getState().startGame();

    render(<App />);

    expect(
      screen.getByRole('heading', { name: /WESELNA FAMILIADA — Panel Operatora/i }),
    ).toBeInTheDocument();
  });

  it('should not render lobby screen when status is playing', () => {
    useGameStore.getState().loadGame(MOCK_GAME_DATA);
    useGameStore.getState().startGame();

    render(<App />);

    expect(screen.queryByText('ROZPOCZNIJ GRĘ')).not.toBeInTheDocument();
  });
});
