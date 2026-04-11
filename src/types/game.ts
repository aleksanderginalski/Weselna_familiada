// ============================================
// Game Configuration Types (from JSON file)
// ============================================

export interface GameConfig {
  /** Game mode: 'fixed' = set number of rounds, 'score' = first to reach winning score */
  mode: 'fixed' | 'score';
  /** Number of rounds to play (for mode: 'fixed') */
  numberOfRounds?: number;
  /** Points needed to win (for mode: 'score') */
  winningScore?: number;
  /** Point multipliers for each round [round1, round2, round3, round4] */
  multipliers: number[];
  /** Team configuration */
  teams: {
    left: TeamConfig;
    right: TeamConfig;
  };
}

export interface TeamConfig {
  name: string;
}

export interface RoundData {
  question: string;
  answers: AnswerData[];
}

export interface AnswerData {
  text: string;
  points: number;
}

/** A question entry in the bank — same as RoundData with optional category and usage flags */
export interface QuestionBankEntry extends RoundData {
  category?: string;
  /** Whether this question appears in the main game pool (default: true when undefined) */
  isMainQuestion?: boolean;
  /** Whether this question appears in the final round pool */
  isFinalQuestion?: boolean;
}

/** The pytania-bank.json file format */
export interface QuestionBankFile {
  questions: QuestionBankEntry[];
}

/** The pytania.json file format — game configuration only, no questions */
export interface GameDataFile {
  config: GameConfig;
}

// ============================================
// Game State Types (runtime state)
// ============================================

export type GameStatus = 'lobby' | 'editingQuestions' | 'selectingQuestions' | 'playing' | 'finished' | 'finalRound';
export type RoundPhase = 'showdown' | 'guessing' | 'steal' | 'summary';
export type TeamSide = 'left' | 'right';

export interface TeamState {
  name: string;
  totalScore: number;
}

export interface RoundState {
  /** Current phase of the round */
  phase: RoundPhase;
  /** Which team is currently answering (null = showdown phase) */
  controllingTeam: TeamSide | null;
  /** Indices of answers that have been revealed */
  revealedAnswers: number[];
  /** Number of mistakes by the controlling team (0-3) */
  mistakes: number;
  /** Whether steal attempt has been made */
  stealAttempted: boolean;
  /** Whether the steal attempt failed (stealing team gave wrong answer) */
  stealFailed: boolean;
  /** Sum of revealed answer points (before multiplier) */
  roundScore: number;
}

export interface GameState {
  // Configuration (loaded from JSON, immutable during game)
  config: GameConfig;
  /** Full question bank loaded from pytania-bank.json */
  questionBank: QuestionBankEntry[];
  rounds: RoundData[];

  // Game progress
  status: GameStatus;
  currentRoundIndex: number;

  // Team scores
  teams: {
    left: TeamState;
    right: TeamState;
  };

  // Current round state
  currentRound: RoundState;

  // Set to true when operator explicitly clicks "OGŁOŚ ZWYCIĘSTWO"
  showingWinner: boolean;

  // Present only when a final round has been started
  finalRound?: FinalRoundState;
}

// ============================================
// Final Round Types
// ============================================

export interface FinalRoundAnswerData {
  text: string;
  points: number;
}

export interface FinalRoundQuestionData {
  question: string;
  answers: FinalRoundAnswerData[];
}

export interface FinalRoundDataFile {
  questions: FinalRoundQuestionData[];
}

export type FinalAnswerType = 'correct' | 'wrong' | 'skipped' | 'pending';

export type FinalRoundPhase = 'answeringA' | 'revealingA' | 'answeringB' | 'revealingB' | 'finished';

/** A single answer slot for one player on one question in the final round */
export interface FinalRoundAnswer {
  /** Text shown on the board (answer text, wrong text, "---", or empty) */
  text: string;
  /** Points earned (0 for wrong/skipped, actual value for correct) */
  points: number;
  /** Whether the text has been revealed on the board */
  isRevealed: boolean;
  /** Whether the points have been revealed on the board (delayed ~1s after isRevealed) */
  pointsVisible: boolean;
  type: FinalAnswerType;
}

export interface FinalRoundState {
  questions: FinalRoundQuestionData[];
  /** Player A's answers — 5 entries, one per question */
  playerA: FinalRoundAnswer[];
  /** Player B's answers — 5 entries, one per question */
  playerB: FinalRoundAnswer[];
  /** When true, player A's answer texts are hidden on the board (points remain visible) */
  playerAHidden: boolean;
  phase: FinalRoundPhase;
  timerRunning: boolean;
  timerSecondsLeft: number;
  /** Default timer for player A (seconds) */
  playerAInitialTimer: number;
  /** Default timer for player B (seconds) */
  playerBInitialTimer: number;
}

// ============================================
// Actions / Events (for BroadcastChannel)
// ============================================

export type GameAction =
  | { type: 'LOAD_GAME'; payload: GameDataFile }
  | { type: 'START_GAME' }
  | { type: 'SELECT_CONTROLLING_TEAM'; payload: TeamSide }
  | { type: 'REVEAL_ANSWER'; payload: number }
  | { type: 'MARK_MISTAKE' }
  | { type: 'END_ROUND'; payload: { winner: TeamSide } }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET_GAME' }
  | { type: 'SYNC_STATE'; payload: GameState }
  | { type: 'REQUEST_SYNC' };

// ============================================
// Component Props Types
// ============================================

export interface AnswerDisplayProps {
  answer: AnswerData;
  index: number;
  isRevealed: boolean;
  totalAnswers: number;
}

export interface TeamPanelProps {
  team: TeamState;
  side: TeamSide;
  isControlling: boolean;
  mistakes: number;
  maxMistakes: number;
}

export interface MistakeIndicatorProps {
  mistakes: number;
  maxMistakes: number;
  side: TeamSide;
}
