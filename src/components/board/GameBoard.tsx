import { DotMatrixBoard } from './DotMatrixBoard';
import { RoundScore } from './RoundScore';
import { TeamScore } from './TeamScore';

const BOARD_BACKGROUND =
  'linear-gradient(to right, #cc1100 0%, #770022 20%, #060818 35%, #060818 65%, #001166 80%, #0044cc 100%)';

/**
 * Full-screen projector view assembling the complete game board.
 * DotMatrixBoard fills the space between RoundScore and a bottom margin
 * that matches the approximate height of the team score digit display.
 */
export function GameBoard() {
  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col p-4 gap-3"
      style={{ background: BOARD_BACKGROUND }}
    >
      {/* Round score — top center */}
      <div className="flex justify-center shrink-0">
        <RoundScore />
      </div>

      {/* Board area — pb-16 leaves bottom margin ≈ team score digit height */}
      <div className="flex-1 min-h-0 flex flex-row gap-3 pb-16">
        <div className="flex flex-col items-center gap-3 shrink-0 justify-center">
          <TeamScore side="left" />
        </div>

        <div className="flex-1 min-w-0 min-h-0">
          <DotMatrixBoard />
        </div>

        <div className="flex flex-col items-center gap-3 shrink-0 justify-center">
          <TeamScore side="right" />
        </div>
      </div>
    </div>
  );
}
