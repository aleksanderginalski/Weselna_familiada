import { useGameStore } from '@/store/gameStore';
import { useSound } from '@/hooks/useSound';
import { FinalRoundDataFile } from '@/types/game';

/**
 * Shown to the operator when the main game ends.
 * Operator chooses between declaring a winner or launching the final round.
 */
export function EndGameChoice() {
  const teams = useGameStore((state) => state.teams);
  const declareWinner = useGameStore((state) => state.declareWinner);
  const startFinalRound = useGameStore((state) => state.startFinalRound);
  const { playFinalRound } = useSound();

  async function handleFinalRound() {
    const response = await fetch('./pytania-final.json');
    const data: FinalRoundDataFile = await response.json();
    playFinalRound();
    startFinalRound(data);
  }

  return (
    <div className="min-h-screen bg-familiada-bg-dark flex flex-col items-center justify-center p-8 gap-8">
      <h1 className="font-display text-4xl text-familiada-gold text-glow-gold uppercase tracking-widest">
        Gra zakończona
      </h1>

      <div className="text-center text-familiada-text-secondary text-2xl space-y-2">
        <p>
          {teams.left.name}: <span className="text-white font-bold">{teams.left.totalScore} pkt</span>
        </p>
        <p>
          {teams.right.name}: <span className="text-white font-bold">{teams.right.totalScore} pkt</span>
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button onClick={declareWinner} className="operator-btn-primary text-xl py-4">
          OGŁOŚ ZWYCIĘSTWO
        </button>
        <button onClick={handleFinalRound} className="operator-btn text-xl py-4">
          RUNDA FINAŁOWA
        </button>
      </div>
    </div>
  );
}
