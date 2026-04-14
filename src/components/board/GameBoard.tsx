import { useGameStore } from '@/store/gameStore';
import { DotMatrixBoard } from './DotMatrixBoard';
import { RoundScore } from './RoundScore';
import { TeamScore } from './TeamScore';

const BOARD_BACKGROUND =
  'linear-gradient(to right, #cc1100 0%, #770022 20%, #060818 35%, #060818 65%, #001166 80%, #0044cc 100%)';

/**
 * Full-screen projector view assembling the complete game board.
 * Team panel widths are controlled by boardLayout.teamPanelRatio (15–30% each).
 * DotMatrixBoard fills the remaining flex-1 space in the center.
 */
export function GameBoard() {
  const teamPanelRatio = useGameStore((state) => state.boardLayout.teamPanelRatio);

  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col p-4 gap-3"
      style={{ background: BOARD_BACKGROUND }}
    >
      {/* Round score — top center */}
      <div className="flex justify-center shrink-0">
        <RoundScore />
      </div>

      {/* Board area — flex row, gap-3 is constant PALT/PTLB.
          TeamScore is shrink-0 with no explicit width: container = content size.
          The slider controls font size → content grows → SA grows naturally.
          LELA(p-4=16px) | SA(content) | gap-3(12px) | ST(flex-1) | gap-3(12px) | SB(content) | PBPE(p-4=16px) */}
      <div className="flex-1 min-h-0 flex flex-row gap-3 pb-16 items-center">
        <TeamScore side="left" panelWidthPercent={teamPanelRatio} />

        {/* w-full wrapper ensures dot-matrix-container fills the flex-1 cell correctly */}
        <div className="flex-1 min-w-0 self-stretch flex items-center">
          <div className="w-full">
            <DotMatrixBoard />
          </div>
        </div>

        <TeamScore side="right" panelWidthPercent={teamPanelRatio} />
      </div>
    </div>
  );
}
