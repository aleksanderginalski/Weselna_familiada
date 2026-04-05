import { useGameStore } from '@/store/gameStore';
import { TeamSide } from '@/types/game';

type WinnerResult = TeamSide | 'tie';

function determineWinner(leftScore: number, rightScore: number): WinnerResult {
  if (leftScore > rightScore) return 'left';
  if (rightScore > leftScore) return 'right';
  return 'tie';
}

/**
 * Full-screen celebration screen shown when the game ends.
 * Displays the winning team (or tie), final scores, and a reset button.
 */
export function WinnerScreen() {
  const teams = useGameStore((state) => state.teams);
  const resetGame = useGameStore((state) => state.resetGame);

  const winner = determineWinner(teams.left.totalScore, teams.right.totalScore);

  return (
    <div className="min-h-screen bg-familiada-bg-dark flex flex-col items-center justify-center p-8 gap-8">
      <div className="text-5xl text-center select-none" aria-hidden="true">
        🎉 🎊 🎉
      </div>

      {winner === 'tie' ? (
        <TieDisplay leftName={teams.left.name} score={teams.left.totalScore} rightName={teams.right.name} />
      ) : (
        <WinnerDisplay
          winnerName={winner === 'left' ? teams.left.name : teams.right.name}
          winnerScore={winner === 'left' ? teams.left.totalScore : teams.right.totalScore}
          loserName={winner === 'left' ? teams.right.name : teams.left.name}
          loserScore={winner === 'left' ? teams.right.totalScore : teams.left.totalScore}
        />
      )}

      <button onClick={resetGame} className="operator-btn-primary text-xl mt-4">
        NOWA GRA
      </button>
    </div>
  );
}

interface WinnerDisplayProps {
  winnerName: string;
  winnerScore: number;
  loserName: string;
  loserScore: number;
}

function WinnerDisplay({ winnerName, winnerScore, loserName, loserScore }: WinnerDisplayProps) {
  return (
    <div className="text-center">
      <h1 className="font-display text-3xl text-familiada-text-secondary mb-4 uppercase tracking-widest">
        WYGRYWA
      </h1>
      <div className="border-4 border-familiada-gold rounded-xl px-12 py-8 box-glow-gold mb-8">
        <p className="font-display text-4xl text-familiada-gold text-glow-gold">{winnerName}</p>
        <p className="font-display text-6xl text-white mt-3">{winnerScore} PKT</p>
      </div>
      <p className="text-familiada-text-secondary text-xl">
        {loserName}: {loserScore} pkt
      </p>
    </div>
  );
}

interface TieDisplayProps {
  leftName: string;
  score: number;
  rightName: string;
}

function TieDisplay({ leftName, score, rightName }: TieDisplayProps) {
  return (
    <div className="text-center">
      <h1 className="font-display text-3xl text-familiada-text-secondary mb-4 uppercase tracking-widest">
        REMIS!
      </h1>
      <div className="border-4 border-familiada-gold rounded-xl px-12 py-8 box-glow-gold">
        <p className="font-display text-2xl text-familiada-gold">{leftName}</p>
        <p className="font-display text-2xl text-familiada-gold mt-4">{rightName}</p>
        <p className="font-display text-5xl text-white mt-4">{score} PKT</p>
      </div>
    </div>
  );
}
