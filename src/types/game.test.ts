import { describe, it, expect } from 'vitest'
import type {
  AnswerData,
  AnswerDisplayProps,
  GameAction,
  GameConfig,
  GameDataFile,
  GameState,
  GameStatus,
  MistakeIndicatorProps,
  RoundData,
  RoundPhase,
  RoundState,
  TeamPanelProps,
  TeamSide,
  TeamState,
} from './index'

// ---------------------------------------------------------------------------
// Fixtures — valid objects for each type
// ---------------------------------------------------------------------------

const fixedConfig: GameConfig = {
  mode: 'fixed',
  numberOfRounds: 4,
  multipliers: [1, 2, 3, 3],
  teams: {
    left: { name: 'Team A' },
    right: { name: 'Team B' },
  },
}

const scoreConfig: GameConfig = {
  mode: 'score',
  winningScore: 200,
  multipliers: [1, 2],
  teams: {
    left: { name: 'Team A' },
    right: { name: 'Team B' },
  },
}

const mockRound: RoundData = {
  question: 'What do you find in a kitchen?',
  answers: [
    { text: 'Stove', points: 40 },
    { text: 'Fridge', points: 30 },
  ],
}

const mockGameData: GameDataFile = {
  config: fixedConfig,
  rounds: [mockRound],
}

const initialRoundState: RoundState = {
  phase: 'showdown',
  controllingTeam: null,
  revealedAnswers: [],
  mistakes: 0,
  stealAttempted: false,
  roundScore: 0,
}

const mockTeamState: TeamState = { name: 'Team A', totalScore: 0 }

const mockGameState: GameState = {
  config: fixedConfig,
  rounds: [mockRound],
  status: 'lobby',
  currentRoundIndex: 0,
  teams: {
    left: mockTeamState,
    right: { name: 'Team B', totalScore: 0 },
  },
  currentRound: initialRoundState,
}

// ---------------------------------------------------------------------------
// GameConfig
// ---------------------------------------------------------------------------

describe('GameConfig', () => {
  it('should have all required fields for fixed mode', () => {
    expect(fixedConfig.mode).toBe('fixed')
    expect(fixedConfig.numberOfRounds).toBe(4)
    expect(fixedConfig.multipliers).toEqual([1, 2, 3, 3])
    expect(fixedConfig.teams.left.name).toBe('Team A')
    expect(fixedConfig.teams.right.name).toBe('Team B')
  })

  it('should have all required fields for score mode', () => {
    expect(scoreConfig.mode).toBe('score')
    expect(scoreConfig.winningScore).toBe(200)
    expect(scoreConfig.numberOfRounds).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// AnswerData / RoundData / GameDataFile
// ---------------------------------------------------------------------------

describe('AnswerData', () => {
  it('should have text and points', () => {
    const answer: AnswerData = { text: 'Stove', points: 40 }
    expect(answer.text).toBe('Stove')
    expect(answer.points).toBe(40)
  })
})

describe('RoundData', () => {
  it('should have question and answers array', () => {
    expect(mockRound.question).toBe('What do you find in a kitchen?')
    expect(mockRound.answers).toHaveLength(2)
  })
})

describe('GameDataFile', () => {
  it('should combine config and rounds', () => {
    expect(mockGameData.config).toBe(fixedConfig)
    expect(mockGameData.rounds).toHaveLength(1)
  })
})

// ---------------------------------------------------------------------------
// RoundState
// ---------------------------------------------------------------------------

describe('RoundState', () => {
  it('should have correct initial shape', () => {
    expect(initialRoundState.phase).toBe('showdown')
    expect(initialRoundState.controllingTeam).toBeNull()
    expect(initialRoundState.revealedAnswers).toEqual([])
    expect(initialRoundState.mistakes).toBe(0)
    expect(initialRoundState.stealAttempted).toBe(false)
    expect(initialRoundState.roundScore).toBe(0)
  })

  it('should accept all valid RoundPhase values', () => {
    const phases: RoundPhase[] = ['showdown', 'guessing', 'steal', 'summary']
    phases.forEach((phase) => {
      const state: RoundState = { ...initialRoundState, phase }
      expect(state.phase).toBe(phase)
    })
  })

  it('should accept both TeamSide values for controllingTeam', () => {
    const sides: TeamSide[] = ['left', 'right']
    sides.forEach((side) => {
      const state: RoundState = { ...initialRoundState, controllingTeam: side }
      expect(state.controllingTeam).toBe(side)
    })
  })
})

// ---------------------------------------------------------------------------
// GameState
// ---------------------------------------------------------------------------

describe('GameState', () => {
  it('should have all required fields', () => {
    expect(mockGameState.status).toBe('lobby')
    expect(mockGameState.currentRoundIndex).toBe(0)
    expect(mockGameState.teams.left).toEqual(mockTeamState)
    expect(mockGameState.currentRound).toEqual(initialRoundState)
  })

  it('should accept all valid GameStatus values', () => {
    const statuses: GameStatus[] = ['lobby', 'playing', 'finished']
    statuses.forEach((status) => {
      const state: GameState = { ...mockGameState, status }
      expect(state.status).toBe(status)
    })
  })
})

// ---------------------------------------------------------------------------
// GameAction — discriminated union exhaustiveness
// ---------------------------------------------------------------------------

describe('GameAction', () => {
  it('should handle every action type in a switch', () => {
    const actions: GameAction[] = [
      { type: 'LOAD_GAME', payload: mockGameData },
      { type: 'START_GAME' },
      { type: 'SELECT_CONTROLLING_TEAM', payload: 'left' },
      { type: 'REVEAL_ANSWER', payload: 0 },
      { type: 'MARK_MISTAKE' },
      { type: 'END_ROUND', payload: { winner: 'right' } },
      { type: 'NEXT_ROUND' },
      { type: 'RESET_GAME' },
      { type: 'SYNC_STATE', payload: mockGameState },
    ]

    const handled: string[] = []

    actions.forEach((action) => {
      switch (action.type) {
        case 'LOAD_GAME': handled.push(action.type); break
        case 'START_GAME': handled.push(action.type); break
        case 'SELECT_CONTROLLING_TEAM': handled.push(action.type); break
        case 'REVEAL_ANSWER': handled.push(action.type); break
        case 'MARK_MISTAKE': handled.push(action.type); break
        case 'END_ROUND': handled.push(action.type); break
        case 'NEXT_ROUND': handled.push(action.type); break
        case 'RESET_GAME': handled.push(action.type); break
        case 'SYNC_STATE': handled.push(action.type); break
      }
    })

    expect(handled).toHaveLength(actions.length)
  })
})

// ---------------------------------------------------------------------------
// Component prop types — shape verification
// ---------------------------------------------------------------------------

describe('AnswerDisplayProps', () => {
  it('should have all required fields', () => {
    const props: AnswerDisplayProps = {
      answer: { text: 'Stove', points: 40 },
      index: 0,
      isRevealed: false,
      totalAnswers: 5,
    }
    expect(props.isRevealed).toBe(false)
    expect(props.totalAnswers).toBe(5)
  })
})

describe('TeamPanelProps', () => {
  it('should have all required fields', () => {
    const props: TeamPanelProps = {
      team: { name: 'Team A', totalScore: 100 },
      side: 'left',
      isControlling: true,
      mistakes: 1,
      maxMistakes: 3,
    }
    expect(props.isControlling).toBe(true)
    expect(props.maxMistakes).toBe(3)
  })
})

describe('MistakeIndicatorProps', () => {
  it('should have all required fields', () => {
    const props: MistakeIndicatorProps = {
      mistakes: 2,
      maxMistakes: 3,
      side: 'right',
    }
    expect(props.mistakes).toBe(2)
    expect(props.side).toBe('right')
  })
})
