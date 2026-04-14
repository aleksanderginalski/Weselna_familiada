import { useGameStore } from '@/store/gameStore';

const MIN_RATIO = 15;
const MAX_RATIO = 60;

/** Slider that controls the proportional width of team score panels on the game board. */
export function BoardLayoutControl() {
  const teamPanelRatio = useGameStore((state) => state.boardLayout.teamPanelRatio);
  const setBoardLayout = useGameStore((state) => state.setBoardLayout);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBoardLayout(Number(e.target.value));
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-familiada-text-secondary text-xs select-none whitespace-nowrap">
        Panele drużyn
      </span>
      <input
        type="range"
        min={MIN_RATIO}
        max={MAX_RATIO}
        step={1}
        value={teamPanelRatio}
        onChange={handleChange}
        className="w-24 accent-familiada-gold cursor-pointer"
        aria-label="Wielkość paneli drużyn"
      />
      <span className="text-familiada-text-secondary text-xs w-8 text-right select-none">
        {teamPanelRatio}%
      </span>
    </div>
  );
}
