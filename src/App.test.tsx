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
  it('should render operator panel when not in board view', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /WESELNA FAMILIADA — Panel Operatora/i })).toBeInTheDocument();
  });

  it('should fetch pytania.json and load game data on mount', async () => {
    render(<App />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/pytania.json');
    });

    await waitFor(() => {
      expect(useGameStore.getState().rounds).toHaveLength(1);
    });
  });

  it('should display question after game data is loaded', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Pytanie testowe?')).toBeInTheDocument();
    });
  });
});
