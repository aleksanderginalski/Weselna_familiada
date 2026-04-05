import { create } from 'zustand';

import {
  GameDataFile,
  GameState,
  RoundState,
  TeamSide,
} from '@/types/game';

const MAX_MISTAKES = 3;

const INITIAL_ROUND_STATE: RoundState = {
  phase: 'showdown',
  controllingTeam: null,
  revealedAnswers: [],
  mistakes: 0,
  stealAttempted: false,
  stealFailed: false,
  roundScore: 0,
};

const INITIAL_STATE: GameState = {
  config: {
    mode: 'fixed',
    multipliers: [],
    teams: {
      left: { name: '' },
      right: { name: '' },
    },
  },
  rounds: [],
  status: 'lobby',
  currentRoundIndex: 0,
  teams: {
    left: { name: '', totalScore: 0 },
    right: { name: '', totalScore: 0 },
  },
  currentRound: INITIAL_ROUND_STATE,
};

interface StoreActions {
  loadGame: (data: GameDataFile) => void;
  startGame: () => void;
  selectTeam: (side: TeamSide) => void;
  revealAnswer: (index: number) => void;
  markMistake: () => void;
  endRound: (winner: TeamSide) => void;
  nextRound: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState & StoreActions>((set) => ({
  ...INITIAL_STATE,

  loadGame: (data: GameDataFile) =>
    set({
      config: data.config,
      rounds: data.rounds,
      status: 'lobby',
      currentRoundIndex: 0,
      teams: {
        left: { name: data.config.teams.left.name, totalScore: 0 },
        right: { name: data.config.teams.right.name, totalScore: 0 },
      },
      currentRound: INITIAL_ROUND_STATE,
    }),

  startGame: () =>
    set({
      status: 'playing',
      currentRoundIndex: 0,
      currentRound: INITIAL_ROUND_STATE,
    }),

  selectTeam: (side: TeamSide) =>
    set((state) => ({
      currentRound: {
        ...state.currentRound,
        controllingTeam: side,
        phase: 'guessing',
      },
    })),

  revealAnswer: (index: number) =>
    set((state) => {
      const answer = state.rounds[state.currentRoundIndex]?.answers[index];
      const points = answer?.points ?? 0;
      // Answers revealed during summary phase are for show only — don't count towards score
      const shouldAddPoints = state.currentRound.phase !== 'summary';
      return {
        currentRound: {
          ...state.currentRound,
          revealedAnswers: [...state.currentRound.revealedAnswers, index],
          roundScore: shouldAddPoints
            ? state.currentRound.roundScore + points
            : state.currentRound.roundScore,
        },
      };
    }),

  markMistake: () =>
    set((state) => {
      // During steal phase, the opposing team's wrong answer is tracked separately
      if (state.currentRound.phase === 'steal') {
        return {
          currentRound: {
            ...state.currentRound,
            stealFailed: true,
          },
        };
      }
      const newMistakes = state.currentRound.mistakes + 1;
      const shouldSteal =
        newMistakes >= MAX_MISTAKES && !state.currentRound.stealAttempted;
      return {
        currentRound: {
          ...state.currentRound,
          mistakes: newMistakes,
          phase: shouldSteal ? 'steal' : state.currentRound.phase,
        },
      };
    }),

  endRound: (winner: TeamSide) =>
    set((state) => {
      const multiplier = state.config.multipliers[state.currentRoundIndex] ?? 1;
      const pointsEarned = state.currentRound.roundScore * multiplier;
      const newScore = state.teams[winner].totalScore + pointsEarned;

      // Score mode: game ends immediately when a team reaches the winning score
      const isScoreModeWin =
        state.config.mode === 'score' &&
        state.config.winningScore !== undefined &&
        newScore >= state.config.winningScore;

      return {
        status: isScoreModeWin ? 'finished' : state.status,
        teams: {
          ...state.teams,
          [winner]: {
            ...state.teams[winner],
            totalScore: newScore,
          },
        },
        currentRound: {
          ...state.currentRound,
          phase: 'summary',
          stealAttempted: state.currentRound.phase === 'steal' ? true : state.currentRound.stealAttempted,
        },
      };
    }),

  nextRound: () =>
    set((state) => {
      const nextIndex = state.currentRoundIndex + 1;
      const isLastRound =
        state.config.mode === 'fixed'
          ? nextIndex >= (state.config.numberOfRounds ?? state.rounds.length)
          : nextIndex >= state.rounds.length;
      return {
        currentRoundIndex: nextIndex,
        status: isLastRound ? 'finished' : state.status,
        currentRound: INITIAL_ROUND_STATE,
      };
    }),

  resetGame: () =>
    set((state) => ({
      status: 'lobby',
      currentRoundIndex: 0,
      teams: {
        left: { name: state.teams.left.name, totalScore: 0 },
        right: { name: state.teams.right.name, totalScore: 0 },
      },
      currentRound: INITIAL_ROUND_STATE,
    })),
}));
