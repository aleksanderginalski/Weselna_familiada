import { useGameStore } from '@/store/gameStore';
import { TeamSide } from '@/types/game';
import { DigitDisplay, SCORE_MILESTONE_1, SCORE_MILESTONE_2 } from '@/components/shared/DigitDisplay';

interface Props {
  side: TeamSide;
  /** Width of this panel as % of board width (15–30). Controls font scaling. */
  panelWidthPercent: number;
}

function computeGlowLevel(score: number): 0 | 1 | 2 {
  if (score >= SCORE_MILESTONE_2) return 2;
  if (score >= SCORE_MILESTONE_1) return 1;
  return 0;
}

/**
 * Computes font sizes and panel width from the slider ratio (15–30).
 * Panel width = exactly the DigitDisplay width (3 cells at 5:7 + borders/gaps overhead).
 * This eliminates any empty space inside the panel, keeping PALT/PTLB visually constant.
 */
function computeSizing(ratio: number): { nameFontSize: string; digitFontSize: string; panelWidth: string } {
  // Digit font grows linearly: 2.0rem at ratio=15 → 4.0rem at ratio=30
  const digitFontSizeRem = 2.0 + (ratio - 15) * (2.0 / 15);
  // Panel width ≈ 3 digit cells (5:7 aspect) + ~1rem for borders, gaps, padding
  const panelWidth = `${(digitFontSizeRem * 3 * (5 / 7) + 1).toFixed(3)}rem`;
  // Name font proportional to digit size
  const nameFontSize = `${Math.max(0.6, digitFontSizeRem * 0.38).toFixed(3)}rem`;
  const digitFontSize = `${digitFontSizeRem.toFixed(3)}rem`;
  return { nameFontSize, digitFontSize, panelWidth };
}

export function TeamScore({ side, panelWidthPercent }: Props) {
  const team = useGameStore((state) => state.teams[side]);
  const glowLevel = computeGlowLevel(team.totalScore);
  // Scores ≥ 1000 wrap around on the 3-digit display; show last 3 digits (% 1000)
  const displayScore = team.totalScore >= SCORE_MILESTONE_1 ? team.totalScore % 1000 : team.totalScore;
  const { nameFontSize, digitFontSize, panelWidth } = computeSizing(panelWidthPercent);

  return (
    // Width = exactly DigitDisplay width so there is no empty inner space.
    // This keeps PALT and PTLB (gap-3 in GameBoard) visually constant as the slider moves.
    <div
      className="flex flex-col items-center gap-2 shrink-0"
      style={{ width: panelWidth }}
    >
      <span
        className="w-full text-center font-heading text-familiada-text-primary uppercase leading-tight"
        style={{ fontSize: nameFontSize, overflowWrap: 'anywhere' }}
      >
        {team.name}
      </span>
      <DigitDisplay value={displayScore} digitFontSize={digitFontSize} glowLevel={glowLevel} padWithZeros={glowLevel > 0} />
    </div>
  );
}
