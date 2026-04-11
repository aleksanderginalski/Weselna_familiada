import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useGameStore } from '@/store/gameStore';
import { RoundControls } from './RoundControls';

const MOCK_DATA = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 4,
    multipliers: [1, 2, 3, 3],
    teams: { left: { name: 'Drużyna A' }, right: { name: 'Drużyna B' } },
  },
  rounds: [
    { question: 'Test?', answers: [{ text: 'Odpowiedź', points: 30 }] },
    { question: 'Test 2?', answers: [{ text: 'Inna', points: 20 }] },
  ],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
  useGameStore.getState().loadGame(MOCK_DATA);
  useGameStore.getState().selectQuestions(MOCK_DATA.rounds);
});

describe('RoundControls', () => {
  it('should display round number, total rounds, and multiplier', () => {
    render(<RoundControls />);

    expect(screen.getByText('Runda 1 z 4')).toBeInTheDocument();
    expect(screen.getByText('Mnożnik: x1')).toBeInTheDocument();
    // No action buttons in showdown phase without controlling team
    expect(screen.queryByRole('button', { name: /ZAKOŃCZ RUNDĘ/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'NASTĘPNA RUNDA' })).not.toBeInTheDocument();
  });

  it('should show ZAKOŃCZ RUNDĘ button with winner name when controlling team is selected', () => {
    useGameStore.getState().selectTeam('left');
    render(<RoundControls />);

    const btn = screen.getByRole('button', { name: /ZAKOŃCZ RUNDĘ — wygrywa Drużyna A/ });
    expect(btn).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'NASTĘPNA RUNDA' })).not.toBeInTheDocument();
  });

  it('should call endRound with controlling team and show summary on click', async () => {
    useGameStore.getState().selectTeam('right');
    render(<RoundControls />);

    await userEvent.click(screen.getByRole('button', { name: /ZAKOŃCZ RUNDĘ/ }));

    const state = useGameStore.getState();
    expect(state.currentRound.phase).toBe('summary');
    expect(screen.getByText(/Drużyna B otrzymuje/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'NASTĘPNA RUNDA' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /ZAKOŃCZ RUNDĘ/ })).not.toBeInTheDocument();
  });

  it('should advance to round 2 with correct multiplier when NASTĘPNA RUNDA is clicked', async () => {
    useGameStore.getState().selectTeam('left');
    useGameStore.getState().endRound('left');
    render(<RoundControls />);

    await userEvent.click(screen.getByRole('button', { name: 'NASTĘPNA RUNDA' }));

    expect(screen.getByText('Runda 2 z 4')).toBeInTheDocument();
    expect(screen.getByText('Mnożnik: x2')).toBeInTheDocument();
  });

  it('should show end-game choice buttons and hide NASTĘPNA RUNDA when last fixed round ends', async () => {
    // TC-117
    // 1-round game
    useGameStore.setState({
      ...useGameStore.getState(),
      config: {
        mode: 'fixed',
        numberOfRounds: 1,
        multipliers: [1],
        teams: { left: { name: 'Drużyna A' }, right: { name: 'Drużyna B' } },
      },
      rounds: [{ question: 'Q', answers: [{ text: 'A', points: 10 }] }],
      currentRoundIndex: 0,
      status: 'playing',
    });
    useGameStore.getState().selectTeam('left');
    render(<RoundControls />);

    await userEvent.click(screen.getByRole('button', { name: /ZAKOŃCZ RUNDĘ/ }));

    expect(screen.getByRole('button', { name: 'OGŁOŚ ZWYCIĘSTWO' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'RUNDA FINAŁOWA' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'NASTĘPNA RUNDA' })).not.toBeInTheDocument();
  });

  it('should assign points to opposing team when steal succeeds', async () => {
    useGameStore.getState().selectTeam('left');
    useGameStore.getState().revealAnswer(0); // roundScore = 30
    // Trigger steal phase (3 mistakes)
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake();
    // Steal phase active, stealFailed stays false (steal succeeded)
    render(<RoundControls />);

    // Winner should be opposing team (right = Drużyna B)
    const btn = screen.getByRole('button', { name: /ZAKOŃCZ RUNDĘ — wygrywa Drużyna B/ });
    await userEvent.click(btn);

    const state = useGameStore.getState();
    expect(state.teams.right.totalScore).toBeGreaterThan(0);
    expect(state.teams.left.totalScore).toBe(0);
  });
});
