import { useGameStore } from '@/store/gameStore';
import { FinalRoundAnswer } from '@/types/game';
import React from 'react';

const ROWS = 10;
const COLS = 30;

// Same LED pixel ratio as DotMatrixBoard: cell = 5×7 px, gap = 1 px.
// Total horizontal units: 30 × 5 + 29 × 1 = 179.
const FONT_SIZE = 'calc(700cqi / 179)';
const GRID_GAP = 'calc(100cqi / 179)';

// Answer rows: 1–5 (0-indexed rows 1–5)
// Player A text:   cols  1–10 (1-indexed cols  2–11, 10 chars)
// Player A points: cols 12–13 (1-indexed cols 13–14: tens=12, units=13)
// Player B points: cols 16–17 (1-indexed cols 17–18: tens=16, units=17)
// Player B text:   cols 19–28 (1-indexed cols 20–29, 10 chars)
// Player A text: right-aligned, last char always at col 10 (0-indexed) = 1-indexed col 11
const COL_A_TEXT_END = 10;
const COL_A_TEXT_LEN = 10;
const COL_A_TENS = 12;
const COL_A_UNITS = 13;
// Skipped answer: "---" at cols 8–10 (0-indexed), 1-indexed cols 9–11
const COL_A_SKIP_START = 8;
const COL_B_TENS = 16;
const COL_B_UNITS = 17;
const COL_B_TEXT_START = 19;
const COL_B_TEXT_LEN = 10;
// Skipped answer B: mirror position — last 3 cols of B's text area (cols 26–28)
const COL_B_SKIP_START = 26;

// SUMA row: 0-indexed row 7 (1-indexed row 8)
// "SUMA" label: cols 10–13 (1-indexed 11–14)
// Sum digits: hundreds=16, tens=17, units=18 (1-indexed 17–19)
const SUMA_ROW = 7;
const COL_SUMA_LABEL = 10;
const COL_SUM_HUNDREDS = 16;
const COL_SUM_TENS = 17;
const COL_SUM_UNITS = 18;

// Placeholder shown in point cells before points are revealed
const PLACEHOLDER = '@';

type CellType = 'empty' | 'text' | 'digit';

interface GridCell {
  type: CellType;
  content: string;
}

const EMPTY_CELL: GridCell = { type: 'empty', content: '' };

function sumVisible(answers: FinalRoundAnswer[]): number {
  return answers.reduce((acc, a) => (a.pointsVisible ? acc + a.points : acc), 0);
}

function buildFinalGrid(
  playerA: FinalRoundAnswer[],
  playerB: FinalRoundAnswer[],
  playerAHidden: boolean,
): GridCell[] {
  const cells: GridCell[] = Array(ROWS * COLS).fill(EMPTY_CELL);

  const set = (row: number, col: number, cell: GridCell) => {
    cells[row * COLS + col] = cell;
  };
  const text = (content: string): GridCell => ({ type: 'text', content });
  const digit = (content: string): GridCell => ({ type: 'digit', content });

  for (let i = 0; i < 5; i++) {
    const row = i + 1;
    const ansA = playerA[i];
    const ansB = playerB[i];

    // Player A — text (hidden during player B's answering turn)
    if (ansA?.isRevealed && !playerAHidden) {
      if (ansA.type === 'skipped') {
        // Show "---" at cols 7–9 (1-indexed 8–10)
        ['-', '-', '-'].forEach((char, j) => set(row, COL_A_SKIP_START + j, text(char)));
      } else {
        const charsA = ansA.text.toUpperCase().slice(0, COL_A_TEXT_LEN);
        const startA = COL_A_TEXT_END - charsA.length + 1;
        charsA.split('').forEach((char, j) => set(row, startA + j, text(char)));
      }
    }

    // Player A — points or placeholder
    if (ansA?.pointsVisible) {
      // Wrong and skipped both show "0" in the points columns
      const pts = ansA.type === 'correct' ? Math.min(ansA.points, 99) : 0;
      const tens = Math.floor(pts / 10);
      const units = pts % 10;
      if (tens > 0) set(row, COL_A_TENS, digit(String(tens)));
      set(row, COL_A_UNITS, digit(String(units)));
    } else {
      set(row, COL_A_TENS, text(PLACEHOLDER));
      set(row, COL_A_UNITS, text(PLACEHOLDER));
    }

    // Player B — text
    if (ansB?.isRevealed) {
      if (ansB.type === 'skipped') {
        ['-', '-', '-'].forEach((char, j) => set(row, COL_B_SKIP_START + j, text(char)));
      } else {
        ansB.text
          .toUpperCase()
          .slice(0, COL_B_TEXT_LEN)
          .split('')
          .forEach((char, j) => set(row, COL_B_TEXT_START + j, text(char)));
      }
    }

    // Player B — points or placeholder
    if (ansB?.pointsVisible) {
      const pts = ansB.type === 'correct' ? Math.min(ansB.points, 99) : 0;
      const tens = Math.floor(pts / 10);
      const units = pts % 10;
      if (tens > 0) set(row, COL_B_TENS, digit(String(tens)));
      set(row, COL_B_UNITS, digit(String(units)));
    } else {
      set(row, COL_B_TENS, text(PLACEHOLDER));
      set(row, COL_B_UNITS, text(PLACEHOLDER));
    }
  }

  // SUMA label: S U M A at cols 10–13 (1-indexed 11–14)
  ['S', 'U', 'M', 'A'].forEach((char, j) => {
    set(SUMA_ROW, COL_SUMA_LABEL + j, text(char));
  });

  // Sum digits at cols 16–18 (1-indexed 17–19)
  const totalSum = sumVisible(playerA) + sumVisible(playerB);
  if (totalSum > 0) {
    const clamped = Math.min(totalSum, 999);
    const hundreds = Math.floor(clamped / 100);
    const tens = Math.floor((clamped % 100) / 10);
    const units = clamped % 10;
    if (hundreds > 0) set(SUMA_ROW, COL_SUM_HUNDREDS, digit(String(hundreds)));
    if (tens > 0 || hundreds > 0) set(SUMA_ROW, COL_SUM_TENS, digit(String(tens)));
    set(SUMA_ROW, COL_SUM_UNITS, digit(String(units)));
  }

  return cells;
}

/**
 * 30×10 dot-matrix board for the final round (projector view).
 *
 * Layout per answer row (1-indexed columns):
 *   cols  2–11 : player A answer text (hidden when playerAHidden); skipped → "---" at 8–10
 *   cols 13–14 : player A points (@ placeholder; 0 for wrong/skipped)
 *   cols 17–18 : player B points (@ placeholder; 0 for wrong/skipped)
 *   cols 20–29 : player B answer text; skipped → "---" at 27–29
 *
 * Row 8 (0-indexed 7): SUMA label (cols 11–14) + sum digits (cols 17–19).
 */
export function FinalRoundDotMatrix() {
  const finalRound = useGameStore((state) => state.finalRound);

  if (!finalRound) return null;

  const { playerA, playerB, playerAHidden } = finalRound;
  const cells = buildFinalGrid(playerA, playerB, playerAHidden);

  const cellBase: React.CSSProperties = {
    aspectRatio: '5/7',
    fontSize: FONT_SIZE,
    lineHeight: 1,
  };

  return (
    <div className="dot-matrix-container">
      <div className="rounded-2xl border-2 border-white/50 overflow-hidden">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, auto)`,
            gap: GRID_GAP,
            padding: GRID_GAP,
            backgroundColor: '#000000',
            width: '100%',
          }}
        >
          {cells.map((cell, i) => {
            if (cell.type === 'digit') {
              return (
                <div
                  key={i}
                  className="bg-[#0e1428] flex items-center justify-center overflow-hidden"
                  style={cellBase}
                >
                  <span
                    className="digit-cell font-display text-familiada-gold w-full"
                    data-digit={cell.content}
                    style={{ fontSize: FONT_SIZE, lineHeight: 1 }}
                  />
                </div>
              );
            }
            return (
              <div
                key={i}
                className="bg-[#0e1428] flex items-center justify-center overflow-hidden font-display text-familiada-gold"
                style={cellBase}
              >
                {cell.content || null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
