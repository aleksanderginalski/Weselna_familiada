import { create } from 'zustand';

import {
  FinalRoundAnswer,
  FinalRoundDataFile,
  GameDataFile,
  GameState,
  RoundState,
  TeamSide,
} from '@/types/game';

const MAX_MISTAKES = 3;
const FINAL_ROUND_QUESTIONS = 5;
const PLAYER_A_TIMER_SECS = 15;
const PLAYER_B_TIMER_SECS = 20;

function createPendingAnswers(): FinalRoundAnswer[] {
  return Array.from({ length: FINAL_ROUND_QUESTIONS }, () => ({
    text: '',
    points: 0,
    isRevealed: false,
    pointsVisible: false,
    type: 'pending' as const,
  }));
}

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
  showingWinner: false,
  finalRound: undefined,
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
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  declareWinner: () => void;
  startFinalRound: (data: FinalRoundDataFile) => void;
  startTimer: () => void;
  stopTimer: () => void;
  adjustTimer: (deltaSecs: number) => void;
  tickTimer: () => void;
  advanceToRevealPhase: () => void;
  revealFinalAnswer: (questionIndex: number, player: 'A' | 'B', answer: FinalRoundAnswer) => void;
  showFinalAnswerPoints: (questionIndex: number, player: 'A' | 'B') => void;
  hidePlayerAAnswers: () => void;
  showPlayerAAnswers: () => void;
  finishFinalRound: () => void;
}

interface SoundPreferences {
  isMuted: boolean;
  volume: number;
}

export const useGameStore = create<GameState & StoreActions & SoundPreferences>((set) => ({
  ...INITIAL_STATE,
  isMuted: false,
  volume: 80,

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

      // Score mode: game ends when a team reaches the winning score
      const isScoreModeWin =
        state.config.mode === 'score' &&
        state.config.winningScore !== undefined &&
        newScore >= state.config.winningScore;

      // Fixed mode: game ends when this is the last round
      const totalRounds = state.config.numberOfRounds ?? state.rounds.length;
      const isFixedModeEnd =
        state.config.mode === 'fixed' && state.currentRoundIndex + 1 >= totalRounds;

      return {
        status: isScoreModeWin || isFixedModeEnd ? 'finished' : state.status,
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
      showingWinner: false,
      finalRound: undefined,
    })),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setVolume: (volume: number) => set({ volume }),

  declareWinner: () => set({ showingWinner: true }),

  startFinalRound: (data: FinalRoundDataFile) =>
    set({
      status: 'finalRound',
      finalRound: {
        questions: data.questions,
        playerA: createPendingAnswers(),
        playerB: createPendingAnswers(),
        playerAHidden: false,
        phase: 'answeringA',
        timerRunning: false,
        timerSecondsLeft: PLAYER_A_TIMER_SECS,
        playerAInitialTimer: PLAYER_A_TIMER_SECS,
        playerBInitialTimer: PLAYER_B_TIMER_SECS,
      },
    }),

  startTimer: () =>
    set((state) => ({
      finalRound: state.finalRound ? { ...state.finalRound, timerRunning: true } : undefined,
    })),

  stopTimer: () =>
    set((state) => ({
      finalRound: state.finalRound ? { ...state.finalRound, timerRunning: false } : undefined,
    })),

  adjustTimer: (deltaSecs: number) =>
    set((state) => {
      if (!state.finalRound) return {};
      const MIN_TIMER = 5;
      const newSeconds = Math.max(MIN_TIMER, state.finalRound.timerSecondsLeft + deltaSecs);
      return { finalRound: { ...state.finalRound, timerSecondsLeft: newSeconds } };
    }),

  tickTimer: () =>
    set((state) => {
      if (!state.finalRound || !state.finalRound.timerRunning) return {};
      const newSeconds = state.finalRound.timerSecondsLeft - 1;
      return {
        finalRound: {
          ...state.finalRound,
          timerSecondsLeft: Math.max(0, newSeconds),
          timerRunning: newSeconds > 0,
        },
      };
    }),

  advanceToRevealPhase: () =>
    set((state) => {
      if (!state.finalRound) return {};
      const isRevealingB = state.finalRound.phase === 'answeringB';
      const nextPhase = isRevealingB ? 'revealingB' : 'revealingA';
      return {
        finalRound: {
          ...state.finalRound,
          phase: nextPhase,
          timerRunning: false,
          // Reveal player A's answers when moving to revealingB phase
          playerAHidden: isRevealingB ? false : state.finalRound.playerAHidden,
        },
      };
    }),

  revealFinalAnswer: (questionIndex: number, player: 'A' | 'B', answer: FinalRoundAnswer) =>
    set((state) => {
      if (!state.finalRound) return {};
      const key = player === 'A' ? 'playerA' : 'playerB';
      const updated = [...state.finalRound[key]];
      updated[questionIndex] = { ...answer, isRevealed: true, pointsVisible: false };
      return { finalRound: { ...state.finalRound, [key]: updated } };
    }),

  showFinalAnswerPoints: (questionIndex: number, player: 'A' | 'B') =>
    set((state) => {
      if (!state.finalRound) return {};
      const key = player === 'A' ? 'playerA' : 'playerB';
      const updated = [...state.finalRound[key]];
      updated[questionIndex] = { ...updated[questionIndex], pointsVisible: true };
      return { finalRound: { ...state.finalRound, [key]: updated } };
    }),

  hidePlayerAAnswers: () =>
    set((state) => {
      if (!state.finalRound) return {};
      return {
        finalRound: {
          ...state.finalRound,
          playerAHidden: true,
          phase: 'answeringB',
          timerRunning: false,
          timerSecondsLeft: state.finalRound.playerBInitialTimer,
        },
      };
    }),

  showPlayerAAnswers: () =>
    set((state) => {
      if (!state.finalRound) return {};
      return { finalRound: { ...state.finalRound, playerAHidden: false } };
    }),

  finishFinalRound: () =>
    set((state) => {
      if (!state.finalRound) return {};
      return {
        status: 'finished',
        showingWinner: true,
        finalRound: { ...state.finalRound, phase: 'finished', timerRunning: false },
      };
    }),
}));
