import { AnswerDisplayProps } from '@/types/game';

const HIDDEN_MASK = '████████████████████';

export function AnswerRow({ answer, index, isRevealed }: AnswerDisplayProps) {
  return (
    <div className={`answer-row${isRevealed ? ' revealed' : ''}`}>
      <div className="flex items-center gap-4 flex-1">
        <span className="font-display text-2xl text-familiada-gold min-w-[2rem] text-center">
          {index + 1}
        </span>
        <span className="font-display text-2xl tracking-wide uppercase flex-1">
          {isRevealed ? answer.text : HIDDEN_MASK}
        </span>
      </div>
      {isRevealed && (
        <span className="font-display text-2xl text-familiada-gold min-w-[3rem] text-right">
          {answer.points}
        </span>
      )}
    </div>
  );
}
