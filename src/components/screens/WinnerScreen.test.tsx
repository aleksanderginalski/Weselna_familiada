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
});
