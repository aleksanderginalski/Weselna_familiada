import { beforeEach, describe, expect, it } from 'vitest';

import { useGameStore } from './gameStore';
import { GameDataFile, QuestionBankFile } from '@/types/game';

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
};

const mockBankData: QuestionBankFile = {
  questions: [
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
    questionBank: [],
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
      stealFailed: false,
      roundScore: 0,
    },
  });
});

describe('gameStore', () => {
  describe('loadGame', () => {
    it('should load config and team names from JSON data', () => {
      useGameStore.getState().loadGame(mockGameData);
      const state = useGameStore.getState();

      expect(state.config).toEqual(mockGameData.config);
      expect(state.teams.left.name).toBe('Team A');
      expect(state.teams.right.name).toBe('Team B');
      expect(state.teams.left.totalScore).toBe(0);
      expect(state.teams.right.totalScore).toBe(0);
      expect(state.status).toBe('lobby');
      expect(state.currentRoundIndex).toBe(0);
    });
  });

  describe('loadBank', () => {
    it('should store questions in questionBank and set status to selectingQuestions', () => {
      useGameStore.getState().loadBank(mockBankData);
      const state = useGameStore.getState();

      expect(state.questionBank).toEqual(mockBankData.questions);
      expect(state.rounds).toEqual([]);
      expect(state.status).toBe('selectingQuestions');
    });

    it('should default to empty arrays when questions is undefined', () => {
      useGameStore.getState().loadBank({ questions: undefined as unknown as [] });
      const state = useGameStore.getState();

      expect(state.questionBank).toEqual([]);
      expect(state.rounds).toEqual([]);
    });

    it('should replace questionBank when called a second time', () => {
      const secondBank: QuestionBankFile = {
        questions: [{ question: 'New Q?', answers: [{ text: 'New A', points: 99 }] }],
      };
      useGameStore.getState().loadBank(mockBankData);
      useGameStore.getState().loadBank(secondBank);
      const state = useGameStore.getState();

      expect(state.questionBank).toEqual(secondBank.questions);
      expect(state.rounds).toEqual([]);
      expect(state.questionBank).toHaveLength(1);
    });

    it('should update config and set status to selectingQuestions after loadGame + loadBank', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().loadBank(mockBankData);
      const state = useGameStore.getState();

      expect(state.config).toEqual(mockGameData.config);
      expect(state.status).toBe('selectingQuestions');
      expect(state.teams.left.totalScore).toBe(0);
      expect(state.teams.right.totalScore).toBe(0);
    });
  });

  // TC-142
  describe('selectQuestions', () => {
    it('should set rounds, transition to playing, and reset round state', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().loadBank(mockBankData);
      useGameStore.getState().selectQuestions(mockBankData.questions);
      const state = useGameStore.getState();

      expect(state.rounds).toEqual(mockBankData.questions);
      expect(state.status).toBe('selectingFinalQuestions');
      expect(state.currentRoundIndex).toBe(0);
      expect(state.currentRound.phase).toBe('showdown');
    });
  });

  // TC-143
  describe('backToLobby', () => {
    it('should set status to lobby while preserving questionBank', () => {
      useGameStore.getState().loadBank(mockBankData);
      useGameStore.getState().backToLobby();
      const state = useGameStore.getState();

      expect(state.status).toBe('lobby');
      expect(state.questionBank).toEqual(mockBankData.questions);
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
      useGameStore.getState().selectQuestions(mockBankData.questions);
      useGameStore.getState().revealAnswer(0);
      useGameStore.getState().revealAnswer(1);
      const state = useGameStore.getState();

      expect(state.currentRound.revealedAnswers).toEqual([0, 1]);
      expect(state.currentRound.roundScore).toBe(50);
    });

    it('should treat missing answer as 0 points', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().selectQuestions(mockBankData.questions);
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

    it('should set stealFailed to true when called during steal phase', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startGame();
      useGameStore.setState({
        ...useGameStore.getState(),
        currentRound: {
          ...useGameStore.getState().currentRound,
          phase: 'steal',
          mistakes: 3,
        },
      });
      useGameStore.getState().markMistake();
      const state = useGameStore.getState();

      expect(state.currentRound.stealFailed).toBe(true);
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

  describe('revealAnswer — summary phase', () => {
    it('should not update roundScore when phase is summary', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startGame();
      useGameStore.setState({
        ...useGameStore.getState(),
        currentRound: {
          ...useGameStore.getState().currentRound,
          phase: 'summary',
          roundScore: 30,
        },
      });
      useGameStore.getState().revealAnswer(1); // Answer 2 = 20 pts — must not be added

      expect(useGameStore.getState().currentRound.roundScore).toBe(30);
      expect(useGameStore.getState().currentRound.revealedAnswers).toEqual([1]);
    });
  });

  describe('endRound', () => {
    it('should add roundScore × multiplier to winner totalScore and set phase to summary', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().selectQuestions(mockBankData.questions);
      useGameStore.getState().revealAnswer(0);
      useGameStore.getState().endRound('left');
      const state = useGameStore.getState();

      expect(state.teams.left.totalScore).toBe(30);
      expect(state.teams.right.totalScore).toBe(0);
      expect(state.currentRound.phase).toBe('summary');
    });

    it('should apply multiplier from current round index', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().selectQuestions(mockBankData.questions);
      useGameStore.setState({ ...useGameStore.getState(), currentRoundIndex: 1 });
      useGameStore.getState().revealAnswer(0);
      useGameStore.getState().endRound('right');

      expect(useGameStore.getState().teams.right.totalScore).toBe(100);
    });

    it('should set status to finished when score mode winning threshold is reached', () => {
      useGameStore.setState({
        ...useGameStore.getState(),
        status: 'playing',
        config: {
          mode: 'score',
          winningScore: 30,
          multipliers: [1],
          teams: { left: { name: 'A' }, right: { name: 'B' } },
        },
        rounds: [{ question: 'Q', answers: [{ text: 'A1', points: 30 }] }],
        teams: { left: { name: 'A', totalScore: 0 }, right: { name: 'B', totalScore: 0 } },
      });
      useGameStore.getState().revealAnswer(0);
      useGameStore.getState().endRound('left');

      expect(useGameStore.getState().status).toBe('finished');
      expect(useGameStore.getState().teams.left.totalScore).toBe(30);
    });

    it('should not set status to finished when score mode threshold is not yet reached', () => {
      useGameStore.setState({
        ...useGameStore.getState(),
        status: 'playing',
        config: {
          mode: 'score',
          winningScore: 100,
          multipliers: [1, 1],
          teams: { left: { name: 'A' }, right: { name: 'B' } },
        },
        // Two rounds so questions are not exhausted after round 0
        rounds: [
          { question: 'Q1', answers: [{ text: 'A1', points: 30 }] },
          { question: 'Q2', answers: [{ text: 'A2', points: 30 }] },
        ],
        teams: { left: { name: 'A', totalScore: 0 }, right: { name: 'B', totalScore: 0 } },
      });
      useGameStore.getState().revealAnswer(0);
      useGameStore.getState().endRound('left');

      expect(useGameStore.getState().status).toBe('playing');
    });

    // TC-144
    it('should set status to finished when score mode questions are exhausted without reaching threshold', () => {
      useGameStore.setState({
        ...useGameStore.getState(),
        status: 'playing',
        config: {
          mode: 'score',
          winningScore: 200,
          multipliers: [1],
          teams: { left: { name: 'A' }, right: { name: 'B' } },
        },
        rounds: [{ question: 'Q1', answers: [{ text: 'A1', points: 30 }] }],
        teams: { left: { name: 'A', totalScore: 0 }, right: { name: 'B', totalScore: 0 } },
      });
      useGameStore.getState().revealAnswer(0);
      useGameStore.getState().endRound('left');

      expect(useGameStore.getState().status).toBe('finished');
      expect(useGameStore.getState().teams.left.totalScore).toBe(30);
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

  describe('toggleMute', () => {
    beforeEach(() => {
      useGameStore.setState({ isMuted: false });
    });

    it('should default isMuted to false', () => {
      // TC-099
      expect(useGameStore.getState().isMuted).toBe(false);
    });

    it('should set isMuted to true on first toggle', () => {
      // TC-100
      useGameStore.getState().toggleMute();

      expect(useGameStore.getState().isMuted).toBe(true);
    });

    it('should set isMuted back to false on second toggle', () => {
      // TC-101
      useGameStore.getState().toggleMute();
      useGameStore.getState().toggleMute();

      expect(useGameStore.getState().isMuted).toBe(false);
    });
  });

  describe('setVolume', () => {
    it('should default volume to 80', () => {
      // TC-125
      expect(useGameStore.getState().volume).toBe(80);
    });

    it('should update volume when setVolume is called', () => {
      // TC-126
      useGameStore.getState().setVolume(50);

      expect(useGameStore.getState().volume).toBe(50);
    });
  });

  describe('resetGame', () => {
    it('should reset scores and return to lobby while preserving team names and bank', () => {
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().loadBank(mockBankData);
      useGameStore.getState().selectQuestions(mockBankData.questions);
      useGameStore.getState().endRound('left');
      useGameStore.getState().resetGame();
      const state = useGameStore.getState();

      expect(state.status).toBe('lobby');
      expect(state.currentRoundIndex).toBe(0);
      expect(state.teams.left.totalScore).toBe(0);
      expect(state.teams.right.totalScore).toBe(0);
      expect(state.teams.left.name).toBe('Team A');
      expect(state.rounds).toEqual([]);
      expect(state.questionBank).toEqual(mockBankData.questions);
      expect(state.currentRound.phase).toBe('showdown');
    });
  });

  describe('endRound — fixed mode end detection', () => {
    it('should set status to finished when last fixed round ends', () => {
      // TC-104
      useGameStore.setState({
        ...useGameStore.getState(),
        status: 'playing',
        config: {
          mode: 'fixed',
          numberOfRounds: 1,
          multipliers: [1],
          teams: { left: { name: 'A' }, right: { name: 'B' } },
        },
        rounds: [{ question: 'Q', answers: [{ text: 'A', points: 10 }] }],
        teams: { left: { name: 'A', totalScore: 0 }, right: { name: 'B', totalScore: 0 } },
        currentRoundIndex: 0,
      });
      useGameStore.getState().selectTeam('left');
      useGameStore.getState().endRound('left');

      expect(useGameStore.getState().status).toBe('finished');
    });

    it('should not set status to finished when there are more rounds remaining', () => {
      // TC-105
      useGameStore.getState().loadGame(mockGameData); // 2 rounds
      useGameStore.getState().startGame();
      useGameStore.getState().selectTeam('left');
      useGameStore.getState().endRound('left');

      expect(useGameStore.getState().status).toBe('playing');
    });
  });

  describe('declareWinner', () => {
    it('should set showingWinner to true', () => {
      // TC-106
      useGameStore.getState().declareWinner();

      expect(useGameStore.getState().showingWinner).toBe(true);
    });
  });

  describe('startFinalRound', () => {
    it('should set status to finalRound and initialize playerA/B with 5 pending answers', () => {
      // TC-107
      const data = {
        questions: [
          { question: 'Q1', answers: [{ text: 'A', points: 10 }] },
          { question: 'Q2', answers: [{ text: 'B', points: 20 }] },
          { question: 'Q3', answers: [{ text: 'C', points: 30 }] },
          { question: 'Q4', answers: [{ text: 'D', points: 40 }] },
          { question: 'Q5', answers: [{ text: 'E', points: 50 }] },
        ],
      };
      useGameStore.getState().startFinalRound(data);
      const state = useGameStore.getState();

      expect(state.status).toBe('finalRound');
      expect(state.finalRound).toBeDefined();
      expect(state.finalRound!.phase).toBe('answeringA');
      expect(state.finalRound!.playerA).toHaveLength(5);
      expect(state.finalRound!.playerB).toHaveLength(5);
      expect(state.finalRound!.playerA[0].type).toBe('pending');
      expect(state.finalRound!.timerSecondsLeft).toBe(15);
    });
  });

  describe('timer actions', () => {
    beforeEach(() => {
      useGameStore.getState().startFinalRound({
        questions: Array.from({ length: 5 }, (_, i) => ({
          question: `Q${i}`,
          answers: [{ text: 'A', points: 10 }],
        })),
      });
    });

    it('should start and stop the timer', () => {
      // TC-108
      useGameStore.getState().startTimer();
      expect(useGameStore.getState().finalRound!.timerRunning).toBe(true);

      useGameStore.getState().stopTimer();
      expect(useGameStore.getState().finalRound!.timerRunning).toBe(false);
    });

    it('should adjust timer by delta, respecting minimum of 5', () => {
      // TC-109
      useGameStore.getState().adjustTimer(5);
      expect(useGameStore.getState().finalRound!.timerSecondsLeft).toBe(20);

      useGameStore.getState().adjustTimer(-100); // Would go below 5
      expect(useGameStore.getState().finalRound!.timerSecondsLeft).toBe(5);
    });

    it('should decrement timer on tick and stop when reaching 0', () => {
      // TC-110
      useGameStore.getState().startTimer();
      useGameStore.setState({
        finalRound: { ...useGameStore.getState().finalRound!, timerSecondsLeft: 2 },
      });
      useGameStore.getState().tickTimer();
      expect(useGameStore.getState().finalRound!.timerSecondsLeft).toBe(1);

      useGameStore.getState().tickTimer();
      expect(useGameStore.getState().finalRound!.timerSecondsLeft).toBe(0);
      expect(useGameStore.getState().finalRound!.timerRunning).toBe(false);
    });
  });

  describe('advanceToRevealPhase', () => {
    it('should move from answeringA to revealingA and stop timer', () => {
      // TC-111
      useGameStore.getState().startFinalRound({
        questions: Array.from({ length: 5 }, (_, i) => ({
          question: `Q${i}`,
          answers: [{ text: 'A', points: 10 }],
        })),
      });
      useGameStore.getState().startTimer();
      useGameStore.getState().advanceToRevealPhase();
      const fr = useGameStore.getState().finalRound!;

      expect(fr.phase).toBe('revealingA');
      expect(fr.timerRunning).toBe(false);
    });
  });

  describe('revealFinalAnswer and showFinalAnswerPoints', () => {
    beforeEach(() => {
      useGameStore.getState().startFinalRound({
        questions: Array.from({ length: 5 }, (_, i) => ({
          question: `Q${i}`,
          answers: [{ text: 'A', points: 10 }],
        })),
      });
    });

    it('should reveal an answer for player A at the given index', () => {
      // TC-112
      const answer = { text: 'Uszy', points: 35, isRevealed: true, pointsVisible: false, type: 'correct' as const };
      useGameStore.getState().revealFinalAnswer(0, 'A', answer);
      const fr = useGameStore.getState().finalRound!;

      expect(fr.playerA[0].text).toBe('Uszy');
      expect(fr.playerA[0].isRevealed).toBe(true);
      expect(fr.playerA[0].pointsVisible).toBe(false);
    });

    it('should make points visible for the given index after showFinalAnswerPoints', () => {
      // TC-113
      const answer = { text: 'Uszy', points: 35, isRevealed: true, pointsVisible: false, type: 'correct' as const };
      useGameStore.getState().revealFinalAnswer(0, 'A', answer);
      useGameStore.getState().showFinalAnswerPoints(0, 'A');

      expect(useGameStore.getState().finalRound!.playerA[0].pointsVisible).toBe(true);
    });
  });

  describe('hidePlayerAAnswers', () => {
    it('should hide player A answers, advance to answeringB and reset timer to playerB initial', () => {
      // TC-114
      useGameStore.getState().startFinalRound({
        questions: Array.from({ length: 5 }, (_, i) => ({
          question: `Q${i}`,
          answers: [{ text: 'A', points: 10 }],
        })),
      });
      useGameStore.getState().advanceToRevealPhase(); // move to revealingA
      useGameStore.getState().hidePlayerAAnswers();
      const fr = useGameStore.getState().finalRound!;

      expect(fr.playerAHidden).toBe(true);
      expect(fr.phase).toBe('answeringB');
      expect(fr.timerSecondsLeft).toBe(20);
      expect(fr.timerRunning).toBe(false);
    });
  });

  describe('finishFinalRound', () => {
    it('should set status to finished, showingWinner to true, and phase to finished', () => {
      // TC-115
      useGameStore.getState().startFinalRound({
        questions: Array.from({ length: 5 }, (_, i) => ({
          question: `Q${i}`,
          answers: [{ text: 'A', points: 10 }],
        })),
      });
      useGameStore.getState().finishFinalRound();
      const state = useGameStore.getState();

      expect(state.status).toBe('finished');
      expect(state.showingWinner).toBe(true);
      expect(state.finalRound!.phase).toBe('finished');
    });
  });

  describe('resetGame — final round cleanup', () => {
    it('should clear finalRound and showingWinner when resetting', () => {
      // TC-116
      useGameStore.getState().loadGame(mockGameData);
      useGameStore.getState().startFinalRound({
        questions: Array.from({ length: 5 }, (_, i) => ({
          question: `Q${i}`,
          answers: [{ text: 'A', points: 10 }],
        })),
      });
      useGameStore.getState().declareWinner();
      useGameStore.getState().resetGame();
      const state = useGameStore.getState();

      expect(state.finalRound).toBeUndefined();
      expect(state.showingWinner).toBe(false);
      expect(state.status).toBe('lobby');
    });
  });
});
