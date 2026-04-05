import { useGameStore } from '@/store/gameStore';

export function AnswerSum() {
  const roundScore = useGameStore((state) => state.currentRound.roundScore);

  return (
    <div className="flex items-center gap-3 bg-familiada-bg-panel border border-familiada-border rounded-lg px-6 py-2">
      <span className="font-body text-lg text-familiada-text-secondary uppercase tracking-widest">
        Suma:
      </span>
      <span className="font-display text-4xl text-familiada-gold">
        {roundScore}
      </span>
    </div>
  );
}
