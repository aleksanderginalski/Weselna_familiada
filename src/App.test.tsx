import { render, screen, waitFor } from '@testing-library/react';
import { useGameStore } from '@/store/gameStore';
import { App } from './App';

const MOCK_CONFIG_DATA = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 1,
    multipliers: [1],
    teams: { left: { name: 'Lewa' }, right: { name: 'Prawa' } },
  },
};

const MOCK_BANK_DATA = {
  questions: [{ question: 'Pytanie testowe?', answers: [{ text: 'Odpowiedź', points: 10 }] }],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
  useGameStore.setState({ rounds: [], questionBank: [], status: 'lobby' });
  global.fetch = vi.fn().mockImplementation((url: string) => {
    const data = url === '/pytania-bank.json' ? MOCK_BANK_DATA : MOCK_CONFIG_DATA;
    return Promise.resolve({ json: () => Promise.resolve(data) } as Response);
  });
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
    expect(screen.getByText('DALEJ')).toBeInTheDocument();
  });

  // TC-145
  it('should render question selection screen when status is selectingQuestions', () => {
    useGameStore.setState({
      ...useGameStore.getState(),
      questionBank: MOCK_BANK_DATA.questions,
      status: 'selectingQuestions',
    });

    render(<App />);

    expect(screen.getByRole('heading', { name: 'WYBÓR PYTAŃ' })).toBeInTheDocument();
    expect(screen.queryByText('DALEJ')).not.toBeInTheDocument();
  });

  it('should render operator panel when status is playing', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG_DATA);
    useGameStore.getState().selectQuestions(MOCK_BANK_DATA.questions);

    render(<App />);

    expect(
      screen.getByRole('heading', { name: /WESELNA FAMILIADA — Panel Operatora/i }),
    ).toBeInTheDocument();
  });

  it('should not render lobby screen when status is playing', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG_DATA);
    useGameStore.getState().selectQuestions(MOCK_BANK_DATA.questions);

    render(<App />);

    expect(screen.queryByText('DALEJ')).not.toBeInTheDocument();
  });

  it('should show end game choice buttons when last round finished and winner not declared', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG_DATA);
    useGameStore.getState().loadBank(MOCK_BANK_DATA); // populates questionBank
    useGameStore.setState({
      ...useGameStore.getState(),
      status: 'finished',
      showingWinner: false,
      currentRound: {
        ...useGameStore.getState().currentRound,
        phase: 'summary',
      },
      teams: {
        left: { name: 'Lewa', totalScore: 100 },
        right: { name: 'Prawa', totalScore: 50 },
      },
    });

    render(<App />);

    expect(screen.getByText('OGŁOŚ ZWYCIĘSTWO')).toBeInTheDocument();
    expect(screen.getByText('RUNDA FINAŁOWA')).toBeInTheDocument();
  });

  it('should render winner screen when status is finished and winner is declared', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG_DATA);
    useGameStore.getState().loadBank(MOCK_BANK_DATA); // populates questionBank
    useGameStore.setState({
      ...useGameStore.getState(),
      status: 'finished',
      showingWinner: true,
      teams: {
        left: { name: 'Lewa', totalScore: 100 },
        right: { name: 'Prawa', totalScore: 50 },
      },
    });

    render(<App />);

    expect(screen.getByText('WYGRYWA')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'NOWA GRA' })).toBeInTheDocument();
  });
});
