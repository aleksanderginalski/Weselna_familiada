import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useGameStore } from '@/store/gameStore';
import { QuestionEditorScreen } from './QuestionEditorScreen';

const MOCK_BANK = {
  questions: [{ question: 'Pytanie z pliku?', answers: [{ text: 'A', points: 10 }] }],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
  useGameStore.setState({ questionBank: [], status: 'editingQuestions' });
  localStorage.clear();
  global.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve(MOCK_BANK),
  } as Response);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('QuestionEditorScreen', () => {
  it('should render list view with back button and add-question button', () => {
    useGameStore.setState({ questionBank: [{ question: 'Q?', answers: [{ text: 'A', points: 5 }] }] });
    render(<QuestionEditorScreen />);

    expect(screen.getByRole('heading', { name: 'Edytor pytań' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Powrót do Lobby/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dodaj pytanie/ })).toBeInTheDocument();
  });

  it('should fetch ./pytania-bank.json when questionBank is empty and localStorage is empty', async () => {
    render(<QuestionEditorScreen />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('./pytania-bank.json');
    });
    expect(useGameStore.getState().questionBank[0].question).toBe('Pytanie z pliku?');
  });

  it('should not fetch when questionBank is already populated', async () => {
    useGameStore.setState({ questionBank: [{ question: 'Istniejące?', answers: [{ text: 'A', points: 5 }] }] });
    render(<QuestionEditorScreen />);

    await waitFor(() => {}, { timeout: 100 });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should switch to form view when Dodaj pytanie is clicked', async () => {
    useGameStore.setState({ questionBank: [{ question: 'Q?', answers: [{ text: 'A', points: 5 }] }] });
    render(<QuestionEditorScreen />);

    await userEvent.click(screen.getByRole('button', { name: /Dodaj pytanie/ }));

    expect(screen.getByRole('heading', { name: 'Nowe pytanie' })).toBeInTheDocument();
  });
});
