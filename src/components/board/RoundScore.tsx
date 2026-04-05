import { useGameStore } from '@/store/gameStore';

export function RoundScore() {
  const currentRoundIndex = useGameStore((state) => state.currentRoundIndex);
  const multipliers = useGameStore((state) => state.config.multipliers);
  const roundScore = useGameStore((state) => state.currentRound.roundScore);

  const multiplier = multipliers[currentRoundIndex] ?? 1;
  const pointsToWin = roundScore * multiplier;

  return (
    <div className="flex flex-col items-center gap-1 bg-familiada-bg-panel border border-familiada-border rounded-lg px-8 py-3">
      <span className="font-body text-sm text-familiada-text-secondary uppercase tracking-widest">
        Do wygrania
      </span>
      <span className="font-display text-6xl text-familiada-gold">
        {pointsToWin}
      </span>
      <span className="font-body text-xs text-familiada-text-secondary">
        x{multiplier} mnożnik
      </span>
    </div>
  );
}
