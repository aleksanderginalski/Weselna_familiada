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

export interface GameDataFile {
  config: GameConfig;
  rounds: RoundData[];
}

// ============================================
// Game State Types (runtime state)
// ============================================

export type GameStatus = 'lobby' | 'playing' | 'finished';
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
