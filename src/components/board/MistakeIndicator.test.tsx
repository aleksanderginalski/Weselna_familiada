import { render, screen } from '@testing-library/react';
import { useGameStore } from '@/store/gameStore';
import { MistakeIndicator } from './MistakeIndicator';

const MOCK_DATA = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 1,
    multipliers: [1],
    teams: { left: { name: 'Team A' }, right: { name: 'Team B' } },
  },
  rounds: [{ question: 'Test?', answers: [{ text: 'Answer', points: 30 }] }],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
});

describe('MistakeIndicator', () => {
  it('should render nothing during showdown phase', () => {
    useGameStore.getState().loadGame(MOCK_DATA);
    useGameStore.getState().startGame();
    const { container } = render(<MistakeIndicator side="left" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render 3 empty slots when controlling team has no mistakes', () => {
    useGameStore.getState().loadGame(MOCK_DATA);
    useGameStore.getState().startGame();
    useGameStore.getState().selectTeam('left');
    const { container } = render(<MistakeIndicator side="left" />);

    expect(container.querySelectorAll('.mistake-x')).toHaveLength(3);
    expect(container.querySelectorAll('.mistake-x.empty')).toHaveLength(3);
    expect(container.querySelectorAll('.mistake-x.active')).toHaveLength(0);
  });

  it('should show filled X marks matching mistake count', () => {
    useGameStore.getState().loadGame(MOCK_DATA);
    useGameStore.getState().startGame();
    useGameStore.getState().selectTeam('left');
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake();
    const { container } = render(<MistakeIndicator side="left" />);

    expect(container.querySelectorAll('.mistake-x.active')).toHaveLength(2);
    expect(container.querySelectorAll('.mistake-x.empty')).toHaveLength(1);
  });

  it('should render nothing on opposing side outside steal phase', () => {
    useGameStore.getState().loadGame(MOCK_DATA);
    useGameStore.getState().startGame();
    useGameStore.getState().selectTeam('left');
    const { container } = render(<MistakeIndicator side="right" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render outline steal slot on opposing side during steal phase', () => {
    useGameStore.getState().loadGame(MOCK_DATA);
    useGameStore.getState().startGame();
    useGameStore.getState().selectTeam('left');
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake();
    render(<MistakeIndicator side="right" />);

    const stealSlot = screen.getByText('X');
    expect(stealSlot).toHaveClass('text-transparent');
  });

  it('should show filled steal slot when steal failed', () => {
    useGameStore.getState().loadGame(MOCK_DATA);
    useGameStore.getState().startGame();
    useGameStore.getState().selectTeam('left');
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake();
    useGameStore.getState().markMistake(); // steal failure
    render(<MistakeIndicator side="right" />);

    const stealSlot = screen.getByText('X');
    expect(stealSlot).toHaveClass('bg-familiada-red');
  });
});
