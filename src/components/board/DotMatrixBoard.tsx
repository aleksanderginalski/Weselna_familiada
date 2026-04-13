import { useGameStore } from '@/store/gameStore';
import { AnswerData, RoundPhase, TeamSide } from '@/types/game';
import React from 'react';

const ROWS = 10;
const COLS = 30;

// Column positions (0-indexed):
//   4    : answer number (user col 5)
//   6-22 : answer text / dots (user cols 7-23, 17 chars)
//   18-21: "SUMA" label (user cols 19-22)
//   24-25: points / SUMA value (user cols 25-26)
const COL_NUMBER = 4;
const COL_TEXT_START = 6;
const COL_TEXT_LEN = 17;
const COL_SUMA_LABEL = 18;
const COL_POINTS_HUNDREDS = 23;
const COL_POINTS_TENS = 24;
const COL_POINTS_UNITS = 25;

// LED pixel grid: cell = 5×7 px, gap = 1 px.
// Total horizontal units: 30 cols × 5 + 29 gaps × 1 = 179.
// gap  = 100cqi / 179  ≈ 0.56cqi
// cell height = 7 units = 700cqi / 179 ≈ 3.91cqi
// Font fills cell height (Familiada cap height ≈ 1 em).
const FONT_SIZE = 'calc(700cqi / 179)';
const GRID_GAP = 'calc(100cqi / 179)';

// Horizontal Ellipsis character from Familiada-2 — designed as three dot-matrix circles
// filling the full 640×896 (5:7) cell.
const ELLIPSIS = '\u2026';

// ─── Mistake X patterns (Familiada-2 Unicode space characters) ───────────────
//
// Cols 1–3  (0-indexed 0–2)  = left  team's mistake area
// Cols 28–30 (0-indexed 27–29) = right team's mistake area

// Small mistake: 3×3 block, [rowOffset, colOffset, char]
const SMALL_MISTAKE_PATTERN: [number, number, string][] = [
  [0, 0, '\u2000'], // En Quad
  [0, 1, '\u2001'], // EM Quad
  [0, 2, '\u2002'], // En Space
  [1, 1, '\u2003'], // EM Space
  [2, 0, '\u2002'], // En Space
  [2, 1, '\u2006'], // Six-per-em Space
  [2, 2, '\u2000'], // En Quad
];
// Start rows (0-indexed) for mistakes 1, 2, 3:
const SMALL_MISTAKE_ROWS = [1, 4, 7];

// Big mistake (failed steal): X shape, rows 4–8 (1-indexed) = rows 3–7 (0-indexed)
// colOffset relative to mistake area's leftmost column
const BIG_MISTAKE_PATTERN: [number, number, string][] = [
  [3, 0, '\u2007'], // Figure Space
  [3, 2, '\u2008'], // Punctuation Space
  [4, 0, '\u2009'], // Thin Space
  [4, 2, '\u200A'], // Hair Space
  [5, 1, '\u2003'], // EM Space
  [6, 0, '\u2008'], // Thin Space
  [6, 2, '\u2007'], // Hair Space
  [7, 0, '\u200A'], // Figure Space
  [7, 2, '\u2009'], // Punctuation Space
];

// 0-indexed column anchor for each team's mistake area
const MISTAKE_COL: Record<TeamSide, number> = { left: 0, right: 27 };

type CellType = 'empty' | 'text' | 'digit' | 'dots';

interface GridCell {
  type: CellType;
  content: string;
}

const EMPTY_CELL: GridCell = { type: 'empty', content: '' };

function buildGrid(
  answers: AnswerData[],
  revealedAnswers: number[],
  roundScore: number,
  controllingTeam: TeamSide | null,
  mistakes: number,
  stealFailed: boolean,
  phase: RoundPhase,
  showdownWrongTeam: TeamSide | null,
): GridCell[] {
  const cells: GridCell[] = Array(ROWS * COLS).fill(EMPTY_CELL);

  const set = (row: number, col: number, cell: GridCell) => {
    cells[row * COLS + col] = cell;
  };
  const text = (content: string): GridCell => ({ type: 'text', content });
  const digit = (content: string): GridCell => ({ type: 'digit', content });
  const dots = (): GridCell => ({ type: 'dots', content: ELLIPSIS });

  answers.slice(0, 7).forEach((answer, i) => {
    const row = i + 1; // answers start at row index 1 (user row 2)

    // Use digit() so the number renders via CSS ::before (line-height:1),
    // identical to point digits — prevents top/bottom clipping.
    set(row, COL_NUMBER, digit(String(i + 1)));

    if (revealedAnswers.includes(i)) {
      answer.text
        .toUpperCase()
        .slice(0, COL_TEXT_LEN)
        .split('')
        .forEach((char, j) => set(row, COL_TEXT_START + j, text(char)));

      const pts = Math.min(answer.points, 99);
      if (pts > 0) {
        const tens = Math.floor(pts / 10);
        const units = pts % 10;
        if (tens > 0) set(row, COL_POINTS_TENS, digit(String(tens)));
        set(row, COL_POINTS_UNITS, digit(String(units)));
      }
    } else {
      // Three dots in the bottom pixel-row of each hidden cell (cols 7-23)
      for (let j = 0; j < COL_TEXT_LEN; j++) {
        set(row, COL_TEXT_START + j, dots());
      }
    }
  });

  const sumaRow = Math.min(answers.length + 2, ROWS - 1);

  ['S', 'U', 'M', 'A'].forEach((char, j) => {
    set(sumaRow, COL_SUMA_LABEL + j, text(char));
  });

  if (roundScore > 0) {
    const hundreds = Math.floor(roundScore / 100);
    const tens = Math.floor((roundScore % 100) / 10);
    const units = roundScore % 10;
    if (hundreds > 0) {
      set(sumaRow, COL_POINTS_HUNDREDS, digit(String(hundreds)));
      set(sumaRow, COL_POINTS_TENS, digit(String(tens)));
    } else if (tens > 0) {
      set(sumaRow, COL_POINTS_TENS, digit(String(tens)));
    }
    set(sumaRow, COL_POINTS_UNITS, digit(String(units)));
  }

  // ─── Small mistake X marks (controlling team's area) ─────────────────────
  if (controllingTeam !== null && mistakes > 0) {
    const anchorCol = MISTAKE_COL[controllingTeam];
    const count = Math.min(mistakes, 3);
    for (let m = 0; m < count; m++) {
      const startRow = SMALL_MISTAKE_ROWS[m];
      SMALL_MISTAKE_PATTERN.forEach(([dr, dc, char]) => {
        set(startRow + dr, anchorCol + dc, text(char));
      });
    }
  }

  // ─── Big mistake X (failed steal — shown on the steal team's side) ────────
  if (stealFailed && controllingTeam !== null) {
    const stealTeam: TeamSide = controllingTeam === 'left' ? 'right' : 'left';
    const anchorCol = MISTAKE_COL[stealTeam];
    BIG_MISTAKE_PATTERN.forEach(([dr, dc, char]) => {
      set(dr, anchorCol + dc, text(char));
    });
  }

  // ─── Big mistake X (showdown wrong attempt — shown on the team's side) ────
  if (phase === 'showdown' && showdownWrongTeam !== null) {
    const anchorCol = MISTAKE_COL[showdownWrongTeam];
    BIG_MISTAKE_PATTERN.forEach(([dr, dc, char]) => {
      set(dr, anchorCol + dc, text(char));
    });
  }

  return cells;
}

/**
 * 30-column × 10-row dot-matrix board for the projector view.
 *
 * Cell proportions: 5:7 — matches Familiada-2 em-square (640×896).
 * Font size scales via container query so glyphs fill each cell exactly (line-height:1).
 * Hidden answers render U+2026 (Horizontal Ellipsis) from Familiada-2.
 */
export function DotMatrixBoard() {
  const currentRoundIndex = useGameStore((state) => state.currentRoundIndex);
  const rounds = useGameStore((state) => state.rounds);
  const revealedAnswers = useGameStore((state) => state.currentRound.revealedAnswers);
  const roundScore = useGameStore((state) => state.currentRound.roundScore);
  const controllingTeam = useGameStore((state) => state.currentRound.controllingTeam);
  const mistakes = useGameStore((state) => state.currentRound.mistakes);
  const stealFailed = useGameStore((state) => state.currentRound.stealFailed);
  const phase = useGameStore((state) => state.currentRound.phase);
  const showdownWrongTeam = useGameStore((state) => state.currentRound.showdownWrongTeam);

  const answers: AnswerData[] = rounds[currentRoundIndex]?.answers ?? [];
  const cells = buildGrid(
    answers,
    revealedAnswers,
    roundScore,
    controllingTeam,
    mistakes,
    stealFailed,
    phase,
    showdownWrongTeam,
  );

  // Base style for every cell: 5:7 ratio (640×896 em-square), line-height:1 removes
  // extra space above/below so the glyph fills the cell exactly.
  const cellBase: React.CSSProperties = {
    aspectRatio: '5/7',
    fontSize: FONT_SIZE,
    lineHeight: 1,
  };

  return (
    // dot-matrix-container sets container-type: size — enables cqi font sizing
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
                    style={{ fontSize: FONT_SIZE }}
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
      <span className="sr-only">Suma:</span>
    </div>
  );
}
