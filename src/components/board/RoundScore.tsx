import { useGameStore } from '@/store/gameStore';
import { DigitDisplay } from '@/components/shared/DigitDisplay';

export function RoundScore() {
  const currentRoundIndex = useGameStore((state) => state.currentRoundIndex);
  const multipliers = useGameStore((state) => state.config.multipliers);
  const roundScore = useGameStore((state) => state.currentRound.roundScore);

  const multiplier = multipliers[currentRoundIndex] ?? 1;
  const pointsToWin = roundScore * multiplier;

  return (
    <DigitDisplay
      value={pointsToWin}
      label="Do wygrania"
      sublabel={`x${multiplier} mnożnik`}
      digitFontSize="4rem"
    />
  );
}
