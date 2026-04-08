import { useEffect, useRef } from 'react';

import { useGameStore } from '@/store/gameStore';
import { useSound } from '@/hooks/useSound';
import { FinalRoundAnswer } from '@/types/game';
import { DigitDisplay } from '@/components/shared/DigitDisplay';
import { FinalRoundDotMatrix } from './FinalRoundDotMatrix';

const BOARD_BACKGROUND =
  'linear-gradient(to right, #cc1100 0%, #770022 20%, #060818 35%, #060818 65%, #001166 80%, #0044cc 100%)';

const POINTS_TARGET = 200;

function sumVisible(answers: FinalRoundAnswer[]): number {
  return answers.reduce((acc, a) => (a.pointsVisible ? acc + a.points : acc), 0);
}

/** Plays sounds when answers transition to revealed / pointsVisible. */
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
 * Full-screen final round board for the projector view.
 *
 * Top:   sum of visible points (DigitDisplay, same position as RoundScore in GameBoard)
 * Left:  timer (timerSecondsLeft) — white label, no team name
 * Center: FinalRoundDotMatrix (10×30 dot-matrix grid)
 * Right: points needed to reach 200 — white label, no team name
 */
export function FinalRoundGameBoard() {
  const finalRound = useGameStore((state) => state.finalRound);

  useBoardSoundEffects(finalRound?.playerA ?? [], finalRound?.playerB ?? []);

  if (!finalRound) return null;

  const { playerA, playerB, timerSecondsLeft } = finalRound;
  const currentSum = sumVisible(playerA) + sumVisible(playerB);
  const toTarget = Math.max(0, POINTS_TARGET - currentSum);

  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col p-4 gap-3"
      style={{ background: BOARD_BACKGROUND }}
    >
      {/* Round sum — top center, mirrors GameBoard's RoundScore position */}
      <div className="flex justify-center shrink-0">
        <DigitDisplay value={currentSum} label="Suma" digitFontSize="4rem" />
      </div>

      {/* Board area — pb-16 matches GameBoard */}
      <div className="flex-1 min-h-0 flex flex-row gap-3 pb-16">
        {/* Left: timer */}
        <div className="flex flex-col items-center gap-3 shrink-0 justify-center">
          <DigitDisplay value={timerSecondsLeft} label="Czas" digitFontSize="2.5rem" labelColor="text-white" />
        </div>

        {/* Center: dot-matrix board */}
        <div className="flex-1 min-w-0 min-h-0">
          <FinalRoundDotMatrix />
        </div>

        {/* Right: points to target */}
        <div className="flex flex-col items-center gap-3 shrink-0 justify-center">
          <DigitDisplay value={toTarget} label="Do 200" digitFontSize="2.5rem" labelColor="text-white" />
        </div>
      </div>
    </div>
  );
}
