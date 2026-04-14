import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useGameStore } from '@/store/gameStore';
import { EndGameChoice } from './EndGameChoice';

const MOCK_FINAL_DATA = {
  questions: [{ question: 'Q?', answers: [{ text: 'A', points: 10 }] }],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
  useGameStore.setState({
    teams: {
      left: { name: 'Lewa', totalScore: 120 },
      right: { name: 'Prawa', totalScore: 80 },
    },
  });
  global.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve(MOCK_FINAL_DATA),
  } as Response);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('EndGameChoice', () => {
  it('should render team scores and both action buttons', () => {
    render(<EndGameChoice />);

    expect(screen.getByText(/Lewa/)).toBeInTheDocument();
    expect(screen.getByText(/120 pkt/)).toBeInTheDocument();
    expect(screen.getByText(/Prawa/)).toBeInTheDocument();
    expect(screen.getByText(/80 pkt/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'OGŁOŚ ZWYCIĘSTWO' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'RUNDA FINAŁOWA' })).toBeInTheDocument();
  });

  it('should call declareWinner when OGŁOŚ ZWYCIĘSTWO is clicked', async () => {
    render(<EndGameChoice />);

    await userEvent.click(screen.getByRole('button', { name: 'OGŁOŚ ZWYCIĘSTWO' }));

    expect(useGameStore.getState().showingWinner).toBe(true);
  });

  it('should fetch ./pytania-final.json and start final round when RUNDA FINAŁOWA is clicked', async () => {
    render(<EndGameChoice />);

    await userEvent.click(screen.getByRole('button', { name: 'RUNDA FINAŁOWA' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('./pytania-final.json');
    });
    expect(useGameStore.getState().status).toBe('finalRound');
  });
});
