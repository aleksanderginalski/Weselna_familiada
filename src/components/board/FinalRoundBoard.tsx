import { useEffect, useRef } from 'react';

import { useGameStore } from '@/store/gameStore';
import { useSound } from '@/hooks/useSound';
import { FinalRoundAnswer } from '@/types/game';

const FINAL_ROUND_QUESTIONS = 5;
const POINTS_COL_WIDTH = 80;
const TIMER_COL_WIDTH = 120;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function calculateSum(answers: FinalRoundAnswer[]): number {
  return answers.reduce((sum, a) => (a.pointsVisible ? sum + a.points : sum), 0);
}

const EMPTY_ANSWER: FinalRoundAnswer = {
  text: '',
  points: 0,
  isRevealed: false,
  pointsVisible: false,
  type: 'pending',
};

interface AnswerRowProps {
  ansA: FinalRoundAnswer;
  ansB: FinalRoundAnswer;
  playerAHidden: boolean;
}

function renderAnswerText(answer: FinalRoundAnswer, hidden: boolean): string {
  if (hidden) return '';
  if (!answer.isRevealed) return '';
  if (answer.type === 'skipped') return '---';
  return answer.text;
}

function renderPoints(answer: FinalRoundAnswer): string {
  if (!answer.isRevealed) return '?';
  if (!answer.pointsVisible) return '…';
  return String(answer.points);
}

function AnswerBoardRow({ ansA, ansB, playerAHidden }: AnswerRowProps) {
  return (
    <tr className="border-b border-white/10">
      <td className="py-4 pl-6 pr-2 text-left text-2xl font-display text-familiada-gold truncate">
        {renderAnswerText(ansA, playerAHidden)}
      </td>
      <td
        className="py-4 px-2 text-center text-2xl font-bold text-familiada-gold"
        style={{ width: POINTS_COL_WIDTH }}
      >
        {renderPoints(ansA)}
      </td>
      <td
        className="py-4 px-2 text-center text-2xl font-bold text-familiada-gold"
        style={{ width: POINTS_COL_WIDTH }}
      >
        {renderPoints(ansB)}
      </td>
      <td className="py-4 pr-6 pl-2 text-right text-2xl font-display text-familiada-gold truncate">
        {renderAnswerText(ansB, false)}
      </td>
    </tr>
  );
}

/** Plays sounds when answers transition to revealed/pointsVisible on the board. */
function useBoardSoundEffects(playerA: FinalRoundAnswer[], playerB: FinalRoundAnswer[]) {
  const { playBell, playCorrect, playWrong } = useSound();
  const prevA = useRef<FinalRoundAnswer[]>([]);
  const prevB = useRef<FinalRoundAnswer[]>([]);

  useEffect(() => {
    playerA.forEach((answer, i) => {
      const prev = prevA.current[i];
      if (!prev) return;
      if (answer.isRevealed && !prev.isRevealed && answer.type !== 'skipped') playBell();
      if (answer.pointsVisible && !prev.pointsVisible) {
        if (answer.type === 'correct') playCorrect();
        else playWrong();
      }
    });
    prevA.current = playerA;
  });

  useEffect(() => {
    playerB.forEach((answer, i) => {
      const prev = prevB.current[i];
      if (!prev) return;
      if (answer.isRevealed && !prev.isRevealed && answer.type !== 'skipped') playBell();
      if (answer.pointsVisible && !prev.pointsVisible) {
        if (answer.type === 'correct') playCorrect();
        else playWrong();
      }
    });
    prevB.current = playerB;
  });
}

/**
 * Fullscreen board shown during the final round (projector view).
 * Fixed-width columns: Player A text | Pts A | Pts B | Player B text.
 * All text is gold. No row numbers.
 */
export function FinalRoundBoard() {
  const finalRound = useGameStore((state) => state.finalRound);

  useBoardSoundEffects(finalRound?.playerA ?? [], finalRound?.playerB ?? []);

  if (!finalRound) return null;

  const { playerA, playerB, playerAHidden, timerSecondsLeft, timerRunning } = finalRound;

  const totalSum = calculateSum(playerA) + calculateSum(playerB);
  const showTimer = timerRunning || timerSecondsLeft > 0;

  return (
    <div className="h-screen w-screen bg-familiada-bg-dark flex flex-col overflow-hidden">
      {/* Header row with timer and title */}
      <div className="flex items-center px-6 py-4 border-b border-white/10">
        <div style={{ width: TIMER_COL_WIDTH }}>
          {showTimer && (
            <span className="font-display text-4xl text-familiada-gold">
              {formatTime(timerSecondsLeft)}
            </span>
          )}
        </div>
        <h2 className="flex-1 text-center font-display text-2xl text-familiada-gold uppercase tracking-widest">
          Runda Finałowa
        </h2>
        <div style={{ width: TIMER_COL_WIDTH }} />
      </div>

      {/* Column headers — fixed widths matching the table */}
      <div className="flex items-center px-6 py-2 text-sm uppercase tracking-widest text-familiada-text-secondary">
        <span className="flex-1 text-left pl-2">Gracz A</span>
        <span style={{ width: POINTS_COL_WIDTH }} className="text-center">Pkt A</span>
        <span style={{ width: POINTS_COL_WIDTH }} className="text-center">Pkt B</span>
        <span className="flex-1 text-right pr-2">Gracz B</span>
      </div>

      {/* Answer table — flex-1 to fill available space */}
      <div className="flex-1 overflow-hidden">
        <table className="w-full border-collapse h-full table-fixed">
          <colgroup>
            <col />
            <col style={{ width: POINTS_COL_WIDTH }} />
            <col style={{ width: POINTS_COL_WIDTH }} />
            <col />
          </colgroup>
          <tbody>
            {Array.from({ length: FINAL_ROUND_QUESTIONS }, (_, i) => (
              <AnswerBoardRow
                key={i}
                ansA={playerA[i] ?? EMPTY_ANSWER}
                ansB={playerB[i] ?? EMPTY_ANSWER}
                playerAHidden={playerAHidden}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer — total sum */}
      <div className="px-6 py-5 border-t border-white/10 text-center">
        <span className="font-display text-3xl text-familiada-text-secondary">SUMA: </span>
        <span className="font-display text-5xl text-familiada-gold font-bold">{totalSum}</span>
      </div>
    </div>
  );
}
