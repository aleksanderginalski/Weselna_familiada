import { useGameStore } from '@/store/gameStore';
import { TeamSide } from '@/types/game';
import { DigitDisplay } from '@/components/shared/DigitDisplay';

interface Props {
  side: TeamSide;
}

export function TeamScore({ side }: Props) {
  const team = useGameStore((state) => state.teams[side]);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-heading text-lg text-familiada-text-primary uppercase text-center leading-tight max-w-[180px]">
        {team.name}
      </span>
      <DigitDisplay value={team.totalScore} digitFontSize="2.5rem" />
    </div>
  );
}
