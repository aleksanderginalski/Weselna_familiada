import { useGameStore } from '@/store/gameStore';
import { TeamSide } from '@/types/game';

interface Props {
  side: TeamSide;
}

export function TeamScore({ side }: Props) {
  const team = useGameStore((state) => state.teams[side]);

  return (
    <div className="flex flex-col items-center gap-2 bg-familiada-bg-panel border border-familiada-border rounded-lg p-4 min-w-[180px]">
      <span className="font-display text-xl text-familiada-text-primary uppercase text-center leading-tight">
        {team.name}
      </span>
      <span className="font-display text-5xl text-familiada-gold">
        {team.totalScore}
      </span>
    </div>
  );
}
