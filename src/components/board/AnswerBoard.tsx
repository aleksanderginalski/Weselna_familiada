import { useGameStore } from '@/store/gameStore';
import { AnswerRow } from './AnswerRow';

export function AnswerBoard() {
  const currentRoundIndex = useGameStore((state) => state.currentRoundIndex);
  const rounds = useGameStore((state) => state.rounds);
  const revealedAnswers = useGameStore((state) => state.currentRound.revealedAnswers);

  const currentRound = rounds[currentRoundIndex];

  if (!currentRound) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {currentRound.answers.map((answer, index) => (
        <AnswerRow
          key={index}
          answer={answer}
          index={index}
          isRevealed={revealedAnswers.includes(index)}
          totalAnswers={currentRound.answers.length}
        />
      ))}
    </div>
  );
}
