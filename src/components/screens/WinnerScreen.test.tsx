import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useGameStore } from '@/store/gameStore';
import { WinnerScreen } from './WinnerScreen';

function setupFinishedState(leftScore: number, rightScore: number) {
  useGameStore.setState({
    status: 'finished',
    teams: {
      left: { name: 'Drużyna A', totalScore: leftScore },
      right: { name: 'Drużyna B', totalScore: rightScore },
    },
  });
}

beforeEach(() => {
  useGameStore.getState().resetGame();
});

describe('WinnerScreen', () => {
  it('should display winner name, winner score, loser score, and NOWA GRA button when left team wins', () => {
    setupFinishedState(300, 150);
    render(<WinnerScreen />);

    expect(screen.getByText('WYGRYWA')).toBeInTheDocument();
    expect(screen.getByText('Drużyna A')).toBeInTheDocument();
    expect(screen.getByText('300 PKT')).toBeInTheDocument();
    expect(screen.getByText('Drużyna B: 150 pkt')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'NOWA GRA' })).toBeInTheDocument();
  });

  it('should display right team as winner when right score is higher', () => {
    setupFinishedState(100, 250);
    render(<WinnerScreen />);

    expect(screen.getByText('Drużyna B')).toBeInTheDocument();
    expect(screen.getByText('250 PKT')).toBeInTheDocument();
    expect(screen.getByText('Drużyna A: 100 pkt')).toBeInTheDocument();
  });

  it('should display REMIS when both teams have equal scores', () => {
    setupFinishedState(200, 200);
    render(<WinnerScreen />);

    expect(screen.getByText('REMIS!')).toBeInTheDocument();
    expect(screen.getByText('200 PKT')).toBeInTheDocument();
    expect(screen.queryByText('WYGRYWA')).not.toBeInTheDocument();
  });

  it('should transition status to lobby when NOWA GRA is clicked', async () => {
    setupFinishedState(300, 150);
    render(<WinnerScreen />);

    await userEvent.click(screen.getByRole('button', { name: 'NOWA GRA' }));

    expect(useGameStore.getState().status).toBe('lobby');
  });

  it('should show calculated final score and team name when finalRound is present', () => {
    // TC-118: score = (100 + 50) × 15 = 2250, no bonus (sum < 200)
    setupFinishedState(100, 50);
    useGameStore.setState({
      ...useGameStore.getState(),
      finalRound: {
        questions: [],
        playerA: [
          { text: 'A', points: 30, isRevealed: true, pointsVisible: true, type: 'correct' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
        ],
        playerB: [
          { text: 'B', points: 20, isRevealed: true, pointsVisible: true, type: 'correct' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
        ],
        playerAHidden: false,
        phase: 'finished',
        timerRunning: false,
        timerSecondsLeft: 0,
        playerAInitialTimer: 15,
        playerBInitialTimer: 20,
      },
    });
    render(<WinnerScreen />);

    // left team wins: (100 + 30 + 20) × 15 = 2250
    expect(screen.getByText('2250')).toBeInTheDocument();
    expect(screen.getByText('Drużyna A')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'NOWA GRA' })).toBeInTheDocument();
    // No "WYGRYWA" or "PKT" label in FinalWinnerScreen
    expect(screen.queryByText('WYGRYWA')).not.toBeInTheDocument();
  });

  it('should add 25000 bonus when final sum is 200 or more', () => {
    // TC-119: sum of answers = 200, score = (0 + 200) × 15 + 25000 = 28000
    setupFinishedState(0, 0);
    useGameStore.setState({
      ...useGameStore.getState(),
      finalRound: {
        questions: [],
        playerA: [
          { text: 'A', points: 100, isRevealed: true, pointsVisible: true, type: 'correct' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
        ],
        playerB: [
          { text: 'B', points: 100, isRevealed: true, pointsVisible: true, type: 'correct' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
          { text: '', points: 0, isRevealed: false, pointsVisible: false, type: 'pending' },
        ],
        playerAHidden: false,
        phase: 'finished',
        timerRunning: false,
        timerSecondsLeft: 0,
        playerAInitialTimer: 15,
        playerBInitialTimer: 20,
      },
    });
    render(<WinnerScreen />);

    expect(screen.getByText('28000')).toBeInTheDocument();
  });
});
