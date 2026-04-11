import { useGameStore } from '@/store/gameStore';
import { useSound } from '@/hooks/useSound';
import { TeamSide } from '@/types/game';
import { shuffled } from '@/utils/shuffle';

const FINAL_ROUND_QUESTION_COUNT = 5;

function getOpposingTeam(side: TeamSide): TeamSide {
  return side === 'left' ? 'right' : 'left';
}

/** Determines the round winner based on steal outcome */
function resolveWinner(
  controllingTeam: TeamSide | null,
  isStealPhase: boolean,
  stealFailed: boolean,
): TeamSide | null {
  if (!controllingTeam) return null;
  // Steal succeeded (steal phase and stealing team answered correctly) → opposing team wins
  if (isStealPhase && !stealFailed) return getOpposingTeam(controllingTeam);
  return controllingTeam;
}

export function RoundControls() {
  const currentRoundIndex = useGameStore((state) => state.currentRoundIndex);
  const config = useGameStore((state) => state.config);
  const rounds = useGameStore((state) => state.rounds);
  const currentRound = useGameStore((state) => state.currentRound);
  const status = useGameStore((state) => state.status);
  const teams = useGameStore((state) => state.teams);
  const questionBank = useGameStore((state) => state.questionBank);
  const endRound = useGameStore((state) => state.endRound);
  const nextRound = useGameStore((state) => state.nextRound);
  const declareWinner = useGameStore((state) => state.declareWinner);
  const startFinalRound = useGameStore((state) => state.startFinalRound);
  const { playNextRound, playFinalRound } = useSound();

  const { phase, controllingTeam, stealFailed, roundScore } = currentRound;

  const totalRounds =
    config.mode === 'fixed'
      ? (config.numberOfRounds ?? rounds.length)
      : rounds.length;

  const multiplier = config.multipliers[currentRoundIndex] ?? 1;
  const roundNumber = currentRoundIndex + 1;

  const isStealPhase = phase === 'steal';
  const winner = resolveWinner(controllingTeam, isStealPhase, stealFailed);
  const winnerName = winner ? teams[winner].name : '';
  const pointsAwarded = roundScore * multiplier;

  const canEndRound = phase !== 'summary' && winner !== null;
  // Game has finished — endRound() sets status:'finished' on the last round for both modes
  const isGameFinished = status === 'finished' && phase === 'summary';
  const canNextRound = phase === 'summary' && status === 'playing';

  const hasFinalQuestions = questionBank.length >= FINAL_ROUND_QUESTION_COUNT;

  function handleFinalRound() {
    const picked = shuffled(questionBank).slice(0, FINAL_ROUND_QUESTION_COUNT);
    playFinalRound();
    startFinalRound({ questions: picked });
  }

  return (
    <div className="bg-familiada-bg-panel border-2 border-familiada-border rounded-lg p-4 flex flex-col gap-3">
      {/* Round info bar */}
      <div className="flex items-center gap-6">
        <span className="text-familiada-text-primary font-bold text-lg">
          Runda {roundNumber} z {totalRounds || '—'}
        </span>
        <span className="text-familiada-gold font-bold text-lg">
          Mnożnik: x{multiplier}
        </span>
      </div>

      {/* Summary message */}
      {phase === 'summary' && (
        <div className="text-familiada-gold text-sm font-bold text-center bg-familiada-bg-dark rounded px-3 py-2">
          Drużyna {winnerName} otrzymuje {pointsAwarded} pkt
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        {canEndRound && (
          <button
            onClick={() => endRound(winner)}
            className="operator-btn bg-familiada-gold text-familiada-bg-dark hover:bg-yellow-400 w-full"
          >
            ZAKOŃCZ RUNDĘ — wygrywa {winnerName}
          </button>
        )}
        {canNextRound && (
          <button
            onClick={() => { playNextRound(); nextRound(); }}
            className="operator-btn bg-familiada-green text-familiada-bg-dark hover:bg-green-400 w-full"
          >
            NASTĘPNA RUNDA
          </button>
        )}
      </div>

      {/* End-game choice — shown when last round has been completed */}
      {isGameFinished && (
        <div className="flex flex-col gap-2 pt-2 border-t border-familiada-border">
          <button
            onClick={declareWinner}
            className="operator-btn-primary w-full"
          >
            OGŁOŚ ZWYCIĘSTWO
          </button>
          <button
            onClick={handleFinalRound}
            disabled={!hasFinalQuestions}
            className="operator-btn w-full disabled:opacity-40 disabled:cursor-not-allowed"
            title={!hasFinalQuestions ? `Wymagane ${FINAL_ROUND_QUESTION_COUNT} pytań w banku (masz ${questionBank.length})` : undefined}
          >
            RUNDA FINAŁOWA
          </button>
          {!hasFinalQuestions && (
            <p className="text-familiada-red text-xs text-center">
              Za mało pytań w banku: {questionBank.length}/{FINAL_ROUND_QUESTION_COUNT} — dodaj pytania w Edytorze
            </p>
          )}
        </div>
      )}
    </div>
  );
}
