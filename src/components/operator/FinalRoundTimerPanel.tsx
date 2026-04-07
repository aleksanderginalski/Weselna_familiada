import { useEffect, useRef } from 'react';

import { useGameStore } from '@/store/gameStore';
import { useSound } from '@/hooks/useSound';
import { FinalRoundPhase } from '@/types/game';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function resolveActivePlayer(phase: FinalRoundPhase): string {
  if (phase === 'answeringA' || phase === 'revealingA') return 'Gracz A';
  if (phase === 'answeringB' || phase === 'revealingB') return 'Gracz B';
  return '';
}

const TIMER_ADJUST_STEP = 5;

/**
 * Timer panel for the final round operator view.
 * Handles the countdown interval and timer control buttons.
 */
export function FinalRoundTimerPanel() {
  const finalRound = useGameStore((state) => state.finalRound);
  const startTimer = useGameStore((state) => state.startTimer);
  const stopTimer = useGameStore((state) => state.stopTimer);
  const adjustTimer = useGameStore((state) => state.adjustTimer);
  const tickTimer = useGameStore((state) => state.tickTimer);
  const { playTimerEnd } = useSound();

  const timerRunning = finalRound?.timerRunning ?? false;
  const timerSecondsLeft = finalRound?.timerSecondsLeft ?? 0;
  const phase = finalRound?.phase ?? 'answeringA';

  // Tracks whether the timer was running in the previous render, to detect the 0 crossing
  const wasRunningRef = useRef(false);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, tickTimer]);

  // Play timer-end sound exactly once when the timer transitions from running to 0
  useEffect(() => {
    if (timerSecondsLeft === 0 && wasRunningRef.current) {
      playTimerEnd();
    }
    wasRunningRef.current = timerRunning;
  }, [timerSecondsLeft, timerRunning, playTimerEnd]);

  const activePlayer = resolveActivePlayer(phase);
  const isAnsweringPhase = phase === 'answeringA' || phase === 'answeringB';

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-familiada-text-secondary text-sm uppercase tracking-wide">
          Timer — {activePlayer}
        </span>
        <span className="font-display text-3xl text-familiada-gold">
          {formatTime(timerSecondsLeft)}
        </span>
      </div>

      {isAnsweringPhase && (
        <div className="flex gap-2 flex-wrap">
          {timerRunning ? (
            <button onClick={stopTimer} className="operator-btn text-sm px-3 py-1">
              STOP
            </button>
          ) : (
            <button onClick={startTimer} className="operator-btn-primary text-sm px-3 py-1">
              START
            </button>
          )}
          <button
            onClick={() => adjustTimer(TIMER_ADJUST_STEP)}
            className="operator-btn text-sm px-3 py-1"
          >
            +{TIMER_ADJUST_STEP}s
          </button>
          <button
            onClick={() => adjustTimer(-TIMER_ADJUST_STEP)}
            className="operator-btn text-sm px-3 py-1"
          >
            -{TIMER_ADJUST_STEP}s
          </button>
        </div>
      )}
    </div>
  );
}
