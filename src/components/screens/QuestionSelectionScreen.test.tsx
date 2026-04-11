import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useGameStore } from '@/store/gameStore';
import { QuestionSelectionScreen } from './QuestionSelectionScreen';

const MOCK_BANK = [
  { question: 'Pytanie 1?', answers: [{ text: 'A1', points: 10 }] },
  { question: 'Pytanie 2?', answers: [{ text: 'A2', points: 20 }] },
  { question: 'Pytanie 3?', answers: [{ text: 'A3', points: 30 }] },
];

const FIXED_CONFIG = {
  mode: 'fixed' as const,
  numberOfRounds: 2,
  multipliers: [1, 2],
  teams: { left: { name: 'A' }, right: { name: 'B' } },
};

const SCORE_CONFIG = {
  mode: 'score' as const,
  winningScore: 150,
  multipliers: [1, 1, 1],
  teams: { left: { name: 'A' }, right: { name: 'B' } },
};

function setupScreen(config = FIXED_CONFIG) {
  useGameStore.setState({
    ...useGameStore.getState(),
    questionBank: MOCK_BANK,
    config,
    status: 'selectingQuestions',
  });
  render(<QuestionSelectionScreen />);
}

beforeEach(() => {
  useGameStore.getState().resetGame();
});

describe('QuestionSelectionScreen', () => {
  // TC-134
  it('should render all questions with unchecked checkboxes and zero counter', () => {
    setupScreen();

    expect(screen.getByRole('heading', { name: 'WYBÓR PYTAŃ' })).toBeInTheDocument();
    expect(screen.getByText('Wybrano: 0 / 3 pytań')).toBeInTheDocument();
    expect(screen.getByText('Pytanie 1?')).toBeInTheDocument();
    expect(screen.getByText('Pytanie 2?')).toBeInTheDocument();
    expect(screen.getByText('Pytanie 3?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ROZPOCZNIJ GRĘ' })).toBeDisabled();
  });

  // TC-135
  it('should select question, show order number, update counter, and enable confirm button', async () => {
    setupScreen();

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);

    expect(screen.getByText('Wybrano: 1 / 3 pytań')).toBeInTheDocument();
    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ROZPOCZNIJ GRĘ' })).toBeEnabled();
  });

  // TC-136
  it('should deselect question and remove its order number when unchecked', async () => {
    setupScreen();

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);
    await userEvent.click(checkboxes[0]);

    expect(screen.getByText('Wybrano: 0 / 3 pytań')).toBeInTheDocument();
    expect(screen.queryByText('1.')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ROZPOCZNIJ GRĘ' })).toBeDisabled();
  });

  // TC-137
  it('should reorder selected questions using up/down buttons', async () => {
    setupScreen();

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);
    await userEvent.click(checkboxes[1]);

    // Q1 is 1st, Q2 is 2nd — move Q2 up
    const upButtons = screen.getAllByRole('button', { name: 'Przesuń w górę' });
    await userEvent.click(upButtons[upButtons.length - 1]); // last up button = Q2

    // After move: Q2 should be 1st, Q1 should be 2nd
    const orderBadges = screen.getAllByText(/^\d+\.$/);
    const items = screen.getAllByRole('listitem');
    const q2Item = items.find((li) => li.textContent?.includes('Pytanie 2?'));
    const q1Item = items.find((li) => li.textContent?.includes('Pytanie 1?'));

    expect(q2Item?.textContent).toContain('1.');
    expect(q1Item?.textContent).toContain('2.');
    expect(orderBadges).toHaveLength(2);
  });

  // TC-138
  it('should call selectQuestions with questions in order when ROZPOCZNIJ GRĘ is clicked', async () => {
    setupScreen();

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[2]); // Q3 first
    await userEvent.click(checkboxes[0]); // Q1 second

    await userEvent.click(screen.getByRole('button', { name: 'ROZPOCZNIJ GRĘ' }));

    const state = useGameStore.getState();
    expect(state.status).toBe('playing');
    expect(state.rounds).toHaveLength(2);
    expect(state.rounds[0].question).toBe('Pytanie 3?');
    expect(state.rounds[1].question).toBe('Pytanie 1?');
  });

  // TC-139
  it('should call backToLobby when ← Wróć is clicked', async () => {
    setupScreen();

    await userEvent.click(screen.getByRole('button', { name: /← Wróć/ }));

    expect(useGameStore.getState().status).toBe('lobby');
  });

  // TC-140
  it('should show LOSUJ button that selects a random set of questions', async () => {
    setupScreen();

    await userEvent.click(screen.getByRole('button', { name: 'LOSUJ' }));

    const state = useGameStore.getState();
    // Fixed mode numberOfRounds = 2, so 2 questions should be drawn
    const checkedBoxes = screen.getAllByRole('checkbox').filter((cb) => (cb as HTMLInputElement).checked);
    expect(checkedBoxes).toHaveLength(2);
    expect(screen.getByText('Wybrano: 2 / 3 pytań')).toBeInTheDocument();
    // store not updated yet (selection is local), but confirm should be enabled
    expect(screen.getByRole('button', { name: 'ROZPOCZNIJ GRĘ' })).toBeEnabled();
    // dummy assertion to keep state var used
    expect(state).toBeDefined();
  });

  // TC-141
  it('should show "Liczba rund" for fixed mode and "Gra do pkt" for score mode', async () => {
    setupScreen(FIXED_CONFIG);
    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);

    expect(screen.getByText(/Liczba rund: 1/)).toBeInTheDocument();
    expect(screen.queryByText(/Gra do/)).not.toBeInTheDocument();
  });

  it('should show "Gra do X pkt" for score mode', () => {
    setupScreen(SCORE_CONFIG);

    expect(screen.getByText(/Gra do 150 pkt/)).toBeInTheDocument();
    expect(screen.queryByText(/Liczba rund/)).not.toBeInTheDocument();
  });
});
