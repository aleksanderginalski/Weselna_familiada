interface Props {
  volume: number;
  onChange: (value: number) => void;
}

/** Volume slider for the operator panel header. Range: 0–100. */
export function VolumeSlider({ volume, onChange }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(Number(e.target.value));
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-familiada-text-secondary text-xs select-none">🔈</span>
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={handleChange}
        className="w-24 accent-familiada-gold cursor-pointer"
        aria-label="Głośność"
      />
      <span className="text-familiada-text-secondary text-xs w-8 text-right select-none">
        {volume}%
      </span>
    </div>
  );
}
