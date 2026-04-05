import { beforeEach, describe, expect, it } from 'vitest';

import { useGameStore } from './gameStore';
import { GameDataFile } from '@/types/game';

const mockGameData: GameDataFile = {
  config: {
    mode: 'fixed',
    numberOfRounds: 2,
    multipliers: [1, 2],
    teams: {
      left: { name: 'Team A' },
      right: { name: 'Team B' },
    },
  },
  rounds: [
    {
      question: 'Question 1?',
      answers: [
        { text: 'Answer 1', points: 30 },
        { text: 'Answer 2', points: 20 },
      ],
    },
    {
      question: 'Question 2?',
      answers: [{ text: 'Answer A', points: 50 }],
    },
  ],
};

beforeEach(() => {
  useGameStore.setState({
    config: {
      mode: 'fixed',
      multipliers: [],
      teams: { left: { name: '' }, right: { name: '' } },
    },
    rounds: [],
    status: 'lobby',
    currentRoundIndex: 0,
    teams: {
      left: { name: '', totalScore: 0 },
      right: { name: '', totalScore: 0 },
    },
    currentRound: {
      phase: 'showdown',
      controllingTeam: null,
      revealedAnswers: [],
      mistakes: 0,
      stealAttempted: false,
      roundScore: 0,
    },
  });
});

describe('gameStore', () => {
  describe('loadGame', () => {
    it('should load config, rounds, and team names from JSON data', () => {
      useGameStore.getState().loadGame(mockGameData);
      const state = useGameStore.getState();

      expect(state.config).toEqual(mockGameData.config);
      expect(state.rounds).toEqual(mockGameData.rounds);
      expect(state.teams.left.name).toBe('Team A');
      expect(state.teams.right.name).toBe('Team B');
      expect(state.teams.left.totalScore).toBe(0);
      expect(state.teams.right.totalScore).toBe(0);
      expect(state.status).toBe('lobby');
      expect(state.currentRoundIndex).toBe(0);
    });
  });

  describe('startGame', () => {
    it('should set status to playing and reset round state', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startGame();
      const state = useGameStore.getState();

      expect(state.status).toBe('playing');
      expect(state.currentRoundIndex).toBe(0);
      expect(state.currentRound.phase).toBe('showdown');
    });
  });

  describe('selectTeam', () => {
    it('should set controlling team and transition phase to guessing', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startGame();
      useGameStore.getState().selectTeam('left');
      const state = useGameStore.getState();

      expect(state.currentRound.controllingTeam).toBe('left');
      expect(state.currentRound.phase).toBe('guessing');
    });
  });

  describe('revealAnswer', () => {
    it('should add index to revealedAnswers and accumulate roundScore', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startGame();
      useGameStore.getState().revealAnswer(0);
      useGameStore.getState().revealAnswer(1);
      const state = useGameStore.getState();

      expect(state.currentRound.revealedAnswers).toEqual([0, 1]);
      expect(state.currentRound.roundScore).toBe(50);
    });

    it('should treat missing answer as 0 points', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startGame();
      useGameStore.getState().revealAnswer(99);

      expect(useGameStore.getState().currentRound.roundScore).toBe(0);
      expect(useGameStore.getState().currentRound.revealedAnswers).toEqual([99]);
    });
  });

  describe('markMistake', () => {
    it('should increment mistakes counter', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startGame();
      useGameStore.getState().markMistake();
      useGameStore.getState().markMistake();

      expect(useGameStore.getState().currentRound.mistakes).toBe(2);
      expect(useGameStore.getState().currentRound.phase).toBe('showdown');
    });

    it('should transition to steal phase on third mistake', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startGame();
      useGameStore.getState().markMistake();
      useGameStore.getState().markMistake();
      useGameStore.getState().markMistake();
      const state = useGameStore.getState();

      expect(state.currentRound.mistakes).toBe(3);
      expect(state.currentRound.phase).toBe('steal');
    });

    it('should not trigger steal again if stealAttempted is true', () => {
      useGameStore.setState({
        ...useGameStore.getState(),
        currentRound: {
          ...useGameStore.getState().currentRound,
          mistakes: 2,
          stealAttempted: true,
          phase: 'guessing',
        },
      });
      useGameStore.getState().markMistake();

      expect(useGameStore.getState().currentRound.phase).toBe('guessing');
    });
  });

  describe('endRound', () => {
    it('should add roundScore × multiplier to winner totalScore and set phase to summary', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startGame();
      useGameStore.getState().revealAnswer(0);
      useGameStore.getState().endRound('left');
      const state = useGameStore.getState();

      expect(state.teams.left.totalScore).toBe(30);
      expect(state.teams.right.totalScore).toBe(0);
      expect(state.currentRound.phase).toBe('summary');
    });

    it('should apply multiplier from current round index', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startGame();
      useGameStore.setState({ ...useGameStore.getState(), currentRoundIndex: 1 });
      useGameStore.getState().revealAnswer(0);
      useGameStore.getState().endRound('right');

      expect(useGameStore.getState().teams.right.totalScore).toBe(100);
    });

    it('should set stealAttempted to true when ending a steal phase', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startGame();
      useGameStore.setState({
        ...useGameStore.getState(),
        currentRound: {
          ...useGameStore.getState().currentRound,
          phase: 'steal',
        },
      });
      useGameStore.getState().endRound('right');

      expect(useGameStore.getState().currentRound.stealAttempted).toBe(true);
    });
  });

  describe('nextRound', () => {
    it('should increment currentRoundIndex and reset currentRound', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startGame();
      useGameStore.getState().nextRound();
      const state = useGameStore.getState();

      expect(state.currentRoundIndex).toBe(1);
      expect(state.currentRound.phase).toBe('showdown');
      expect(state.currentRound.roundScore).toBe(0);
      expect(state.currentRound.revealedAnswers).toEqual([]);
    });

    it('should set status to finished after last round in fixed mode', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startGame();
      useGameStore.getState().nextRound();
      useGameStore.getState().nextRound();

      expect(useGameStore.getState().status).toBe('finished');
    });
  });

  describe('resetGame', () => {
    it('should reset scores and status to lobby while preserving team names and rounds', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startGame();
      useGameStore.getState().endRound('left');
      useGameStore.getState().resetGame();
      const state = useGameStore.getState();

      expect(state.status).toBe('lobby');
      expect(state.currentRoundIndex).toBe(0);
      expect(state.teams.left.totalScore).toBe(0);
      expect(state.teams.right.totalScore).toBe(0);
      expect(state.teams.left.name).toBe('Team A');
      expect(state.rounds).toEqual(mockGameData.rounds);
      expect(state.currentRound.phase).toBe('showdown');
    });
  });
});
