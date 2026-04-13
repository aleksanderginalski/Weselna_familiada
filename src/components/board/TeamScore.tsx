import { useGameStore } from '@/store/gameStore';
import { TeamSide } from '@/types/game';
import { DigitDisplay, SCORE_MILESTONE_1, SCORE_MILESTONE_2 } from '@/components/shared/DigitDisplay';

interface Props {
  side: TeamSide;
}

function computeGlowLevel(score: number): 0 | 1 | 2 {
  if (score >= SCORE_MILESTONE_2) return 2;
  if (score >= SCORE_MILESTONE_1) return 1;
  return 0;
}

export function TeamScore({ side }: Props) {
  const team = useGameStore((state) => state.teams[side]);
  const glowLevel = computeGlowLevel(team.totalScore);
  // Scores ≥ 1000 wrap around on the 3-digit display; show last 3 digits (% 1000)
  const displayScore = team.totalScore >= SCORE_MILESTONE_1 ? team.totalScore % 1000 : team.totalScore;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-heading text-lg text-familiada-text-primary uppercase text-center leading-tight max-w-[180px]">
        {team.name}
      </span>
      <DigitDisplay value={displayScore} digitFontSize="2.5rem" glowLevel={glowLevel} padWithZeros={glowLevel > 0} />
    </div>
  );
}
