import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useGameStore } from '@/store/gameStore';
import { FinalRoundSelectionScreen } from './FinalRoundSelectionScreen';

const makeQuestions = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    question: `Pytanie ${i + 1}?`,
    answers: [{ text: `A${i + 1}`, points: 10 }],
  }));

function setup(availableCount: number) {
  useGameStore.setState({
    ...useGameStore.getState(),
    availableForFinal: makeQuestions(availableCount),
    status: 'selectingFinalQuestions',
  });
  render(<FinalRoundSelectionScreen />);
}

beforeEach(() => {
  useGameStore.getState().resetGame();
});

describe('FinalRoundSelectionScreen', () => {
  // TC-156
  it('should auto-select all questions and hide LOSUJ when exactly 5 available', () => {
    setup(5);

    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    expect(checkboxes.every((cb) => cb.checked)).toBe(true);
    expect(screen.queryByRole('button', { name: 'LOSUJ' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ROZPOCZNIJ GRĘ' })).toBeEnabled();
  });

  // TC-157
  it('should show LOSUJ when >5 available and randomly select exactly 5 on click', async () => {
    setup(8);

    expect(screen.getByRole('button', { name: 'LOSUJ' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'LOSUJ' }));

    const checked = (screen.getAllByRole('checkbox') as HTMLInputElement[]).filter(
      (cb) => cb.checked,
    );
    expect(checked).toHaveLength(5);
  });

  // TC-158
  it('should enable ROZPOCZNIJ GRĘ only when 5 selected and call selectFinalQuestions on click', async () => {
    setup(6);

    const confirmBtn = screen.getByRole('button', { name: 'ROZPOCZNIJ GRĘ' });
    expect(confirmBtn).toBeDisabled();

    // Select 5 questions
    const checkboxes = screen.getAllByRole('checkbox');
    for (let i = 0; i < 5; i++) {
      await userEvent.click(checkboxes[i]);
    }

    expect(confirmBtn).toBeEnabled();

    await userEvent.click(confirmBtn);

    const state = useGameStore.getState();
    expect(state.finalRoundQuestions).toHaveLength(5);
    expect(state.status).toBe('playing');
  });

  // TC-159
  it('should call backToMainSelection when ← Wróć do pytań głównych is clicked', async () => {
    setup(5);

    await userEvent.click(screen.getByRole('button', { name: /← Wróć do pytań głównych/ }));

    expect(useGameStore.getState().status).toBe('selectingQuestions');
  });
});
