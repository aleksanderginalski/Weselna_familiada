import { AnswerBoard } from './AnswerBoard';
import { AnswerSum } from './AnswerSum';
import { MistakeIndicator } from './MistakeIndicator';
import { RoundScore } from './RoundScore';
import { TeamScore } from './TeamScore';

/**
 * Assembles the complete game board view for projector display.
 * Layout mirrors the wireframe: RoundScore top center, TeamScores on sides,
 * AnswerBoard in center flanked by MistakeIndicators, AnswerSum bottom center.
 */
export function GameBoard() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-familiada-bg-dark flex flex-col items-center gap-4 p-6">
      <div>
        <RoundScore />
      </div>

      <div className="flex-1 w-full flex flex-row items-center justify-between gap-4 min-h-0">
        <div className="flex flex-col items-center gap-4">
          <TeamScore side="left" />
          <MistakeIndicator side="left" />
        </div>

        <div className="flex-1 min-w-0">
          <AnswerBoard />
        </div>

        <div className="flex flex-col items-center gap-4">
          <TeamScore side="right" />
          <MistakeIndicator side="right" />
        </div>
      </div>

      <div>
        <AnswerSum />
      </div>
    </div>
  );
}
