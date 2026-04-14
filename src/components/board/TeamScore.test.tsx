import { render, screen } from '@testing-library/react';
import { useGameStore } from '@/store/gameStore';
import { TeamScore } from './TeamScore';

const MOCK_CONFIG = {
  config: {
    mode: 'fixed' as const,
    numberOfRounds: 1,
    multipliers: [2],
    teams: { left: { name: 'Drużyna Pana Młodego' }, right: { name: 'Drużyna Panny Młodej' } },
  },
};

const MOCK_BANK = {
  questions: [{ question: 'Test?', answers: [{ text: 'Odpowiedź', points: 30 }] }],
};

beforeEach(() => {
  useGameStore.getState().resetGame();
  useGameStore.setState({ rounds: [], questionBank: [] });
});

describe('TeamScore', () => {
  it('should display team name and zero score on game start', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.getState().selectQuestions(MOCK_BANK.questions);
    render(<TeamScore side="left" panelWidthPercent={15} />);

    expect(screen.getByText('Drużyna Pana Młodego')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should display right team name and score', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.getState().selectQuestions(MOCK_BANK.questions);
    render(<TeamScore side="right" panelWidthPercent={15} />);

    expect(screen.getByText('Drużyna Panny Młodej')).toBeInTheDocument();
  });

  it('should update score after endRound', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.getState().selectQuestions(MOCK_BANK.questions);
    useGameStore.getState().revealAnswer(0);
    useGameStore.getState().endRound('left');
    render(<TeamScore side="left" panelWidthPercent={15} />);

    // 30 points × multiplier 2 = 60
    expect(screen.getByText('60')).toBeInTheDocument();
  });

  it('should display score mod 1000 and apply glow when totalScore >= 1000 (TC-182)', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.setState({
      ...useGameStore.getState(),
      teams: { left: { name: 'Drużyna Pana Młodego', totalScore: 1086 }, right: { name: 'B', totalScore: 0 } },
    });
    const { container } = render(<TeamScore side="left" panelWidthPercent={15} />);

    // sr-only exposes the wrapped display value (86), not raw 1086
    expect(screen.getByText('86')).toBeInTheDocument();
    // glow-pulse-gold must be present on the border wrapper
    expect(container.querySelector('.glow-pulse-gold')).toBeInTheDocument();
  });

  it('should display score mod 1000 with milestone glow when totalScore >= 2000 (TC-183)', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    useGameStore.setState({
      ...useGameStore.getState(),
      teams: { left: { name: 'Drużyna Pana Młodego', totalScore: 2015 }, right: { name: 'B', totalScore: 0 } },
    });
    const { container } = render(<TeamScore side="left" panelWidthPercent={15} />);

    // sr-only exposes 15 (2015 % 1000)
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(container.querySelector('.glow-pulse-milestone')).toBeInTheDocument();
  });

  it('should apply larger panel width when panelWidthPercent increases (TC-171)', () => {
    useGameStore.getState().loadGame(MOCK_CONFIG);
    const { container: small } = render(<TeamScore side="left" panelWidthPercent={15} />);
    const { container: large } = render(<TeamScore side="left" panelWidthPercent={30} />);

    const parseWidth = (c: HTMLElement) =>
      parseFloat((c.firstElementChild as HTMLElement).style.width);

    expect(parseWidth(large)).toBeGreaterThan(parseWidth(small));
  });
});
