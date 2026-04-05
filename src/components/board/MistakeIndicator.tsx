import { useGameStore } from '@/store/gameStore';
import { TeamSide } from '@/types/game';

const MAX_MISTAKES = 3;

interface Props {
  side: TeamSide;
}

export function MistakeIndicator({ side }: Props) {
  const controllingTeam = useGameStore((state) => state.currentRound.controllingTeam);
  const mistakes = useGameStore((state) => state.currentRound.mistakes);
  const phase = useGameStore((state) => state.currentRound.phase);
  const stealFailed = useGameStore((state) => state.currentRound.stealFailed);

  // No indicators during showdown — no team selected yet
  if (controllingTeam === null) return null;

  const isControlling = controllingTeam === side;

  // Controlling side: 3 small mistake slots
  if (isControlling) {
    return (
      <div className="flex flex-col gap-1">
        {Array.from({ length: MAX_MISTAKES }, (_, i) => (
          <div key={i} className={`mistake-x ${i < mistakes ? 'active' : 'empty'}`}>
            X
          </div>
        ))}
      </div>
    );
  }

  // Opposing side: 1 tall steal slot, only visible during steal phase
  if (phase !== 'steal') return null;

  // Tall slot height = 3 small slots (h-12 each) + 2 gaps (gap-1 = 0.25rem each) = 9.5rem
  return (
    <div
      className={[
        'w-12 h-[9.5rem]',
        'flex items-center justify-center',
        'border-4 font-display text-6xl',
        stealFailed
          ? 'border-familiada-red bg-familiada-red text-white'
          : 'border-familiada-border bg-familiada-bg-panel text-transparent',
      ].join(' ')}
    >
      X
    </div>
  );
}
