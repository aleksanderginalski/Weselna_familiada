import { render } from '@testing-library/react';
import { beforeEach, describe, it, expect } from 'vitest';
import { useGameStore } from '@/store/gameStore';
import { DotMatrixBoard } from './DotMatrixBoard';

// Unicode characters used in mistake X patterns (Familiada-2 font)
const EN_QUAD = '\u2000';
const EM_SPACE = '\u2003';
const FIGURE_SPACE = '\u2007';

const MOCK_DATA = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 1,
    multipliers: [1],
    teams: { left: { name: 'A' }, right: { name: 'B' } },
  },
  rounds: [
    {
      question: 'Test?',
      answers: [
        { text: 'Odpowiedź jeden', points: 10 },
        { text: 'Odpowiedź dwa', points: 8 },
      ],
    },
  ],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
  useGameStore.getState().loadGame(MOCK_DATA);
  useGameStore.getState().startGame();
});

describe('DotMatrixBoard — mistake X indicators (US-028)', () => {
  // TC-128
  it('should render no mistake characters when no team is selected', () => {
    const { container } = render(<DotMatrixBoard />);
    expect(container.textContent).not.toContain(EN_QUAD);
    expect(container.textContent).not.toContain(FIGURE_SPACE);
  });

  // TC-129
  it('should render small mistake En Quad chars in left cols after left team makes 1 mistake', () => {
    useGameStore.getState().selectTeam('left');
    useGameStore.getState().markMistake();
    const { container } = render(<DotMatrixBoard />);

    // Small mistake uses En Quad (U+2000) — must appear in board cells
    expect(container.textContent).toContain(EN_QUAD);
    // Big mistake character must NOT appear yet
    expect(container.textContent).not.toContain(FIGURE_SPACE);
  });

  // TC-130
  it('should render 3 groups of small mistake chars after 3 mistakes', () => {
    useGameStore.getState().selectTeam('left');
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake();
    const { container } = render(<DotMatrixBoard />);

    // Each small mistake group contains 2× En Quad + EM Space (among others)
    // 3 groups → at least 6 En Quad occurrences
    const enQuadCount = (container.textContent ?? '').split(EN_QUAD).length - 1;
    expect(enQuadCount).toBeGreaterThanOrEqual(6);
  });

  // TC-131
  it('should render big mistake Figure Space chars when right team fails steal', () => {
    // Left team controls, makes 3 mistakes → steal phase → right team fails steal
    useGameStore.getState().selectTeam('left');
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake(); // steal failure for right team
    const { container } = render(<DotMatrixBoard />);

    // Big mistake uses Figure Space (U+2007)
    expect(container.textContent).toContain(FIGURE_SPACE);
  });

  // TC-132
  it('should render small mistake chars in right cols when right team is controlling', () => {
    useGameStore.getState().selectTeam('right');
    useGameStore.getState().markMistake();
    const { container } = render(<DotMatrixBoard />);

    // Right team mistakes use same chars — En Quad must appear
    expect(container.textContent).toContain(EN_QUAD);
  });

  // TC-133
  it('should render EM Space as part of small mistake pattern', () => {
    useGameStore.getState().selectTeam('left');
    useGameStore.getState().markMistake();
    const { container } = render(<DotMatrixBoard />);

    // EM Space (U+2003) is the center cell of the small mistake pattern
    expect(container.textContent).toContain(EM_SPACE);
  });

  // TC-184
  it('should render hundreds digit in SUMA row when roundScore reaches 100', () => {
    // Set roundScore directly to simulate revealing answers totalling 100+
    useGameStore.setState({
      ...useGameStore.getState(),
      currentRound: { ...useGameStore.getState().currentRound, roundScore: 100 },
    });
    const { container } = render(<DotMatrixBoard />);

    // COL_POINTS_HUNDREDS (col 23, 0-indexed) must have data-digit='1'
    const digitCells = Array.from(container.querySelectorAll('[data-digit]'));
    const digitValues = digitCells.map((el) => el.getAttribute('data-digit'));
    expect(digitValues).toContain('1'); // hundreds digit
  });

  // TC-176
  it('should render big mistake Figure Space chars during showdown when markShowdownAttempt is called', () => {
    // Phase is already 'showdown' — no team selected yet
    useGameStore.getState().markShowdownAttempt('left');
    const { container } = render(<DotMatrixBoard />);

    // Big mistake uses Figure Space (U+2007)
    expect(container.textContent).toContain(FIGURE_SPACE);
    // Small mistake chars should not appear (no guessing mistakes yet)
    expect(container.textContent).not.toContain(EN_QUAD);
  });
});
