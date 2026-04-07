import { useGameStore } from '@/store/gameStore';
import { useSound } from '@/hooks/useSound';

export function AnswerControl() {
  const rounds = useGameStore((state) => state.rounds);
  const currentRoundIndex = useGameStore((state) => state.currentRoundIndex);
  const revealedAnswers = useGameStore((state) => state.currentRound.revealedAnswers);
  const revealAnswer = useGameStore((state) => state.revealAnswer);
  const { playCorrect } = useSound();

  const currentRound = rounds[currentRoundIndex];

  if (!currentRound) return null;

  return (
    <div className="bg-familiada-bg-panel border-2 border-familiada-border rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-familiada-bg-dark border-b border-familiada-border">
        <h2 className="font-bold text-familiada-text-secondary uppercase tracking-wide text-sm">
          Odpowiedzi
        </h2>
      </div>

      <ul>
        {currentRound.answers.map((answer, index) => {
          const isRevealed = revealedAnswers.includes(index);
          return (
            <li
              key={index}
              className={[
                'flex items-center justify-between gap-4 px-4 py-3',
                'border-b border-familiada-border last:border-b-0',
                isRevealed ? 'bg-green-900/30' : '',
              ].join(' ')}
            >
              <span className="text-familiada-text-secondary font-display text-lg w-6 shrink-0">
                {index + 1}
              </span>

              <span className="flex-1 text-familiada-text-primary font-body">
                {answer.text}
              </span>

              <span className="text-familiada-gold font-display text-lg w-10 text-right shrink-0">
                {answer.points}
              </span>

              {isRevealed ? (
                <span className="text-familiada-green font-bold text-sm w-20 text-center shrink-0">
                  ✓ odkryta
                </span>
              ) : (
                <button
                  onClick={() => { playCorrect(); revealAnswer(index); }}
                  className="operator-btn-primary text-sm px-4 py-2 w-20 shrink-0"
                >
                  ODKRYJ
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
