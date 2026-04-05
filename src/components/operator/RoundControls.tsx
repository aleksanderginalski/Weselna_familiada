import { useGameStore } from '@/store/gameStore';
import { TeamSide } from '@/types/game';

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
  const teams = useGameStore((state) => state.teams);
  const endRound = useGameStore((state) => state.endRound);
  const nextRound = useGameStore((state) => state.nextRound);

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
  const canNextRound = phase === 'summary';

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
            onClick={nextRound}
            className="operator-btn bg-familiada-green text-familiada-bg-dark hover:bg-green-400 w-full"
          >
            NASTĘPNA RUNDA
          </button>
        )}
      </div>
    </div>
  );
}
