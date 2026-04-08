import { useEffect, useRef } from 'react';

import { useGameStore } from '@/store/gameStore';
import { useSound } from '@/hooks/useSound';
import { FinalRoundAnswer, FinalRoundState, TeamSide } from '@/types/game';

type WinnerResult = TeamSide | 'tie';

const FINAL_SCORE_MULTIPLIER = 15;
const FINAL_BONUS_THRESHOLD = 200;
const FINAL_BONUS_POINTS = 25000;

const isBoard = new URLSearchParams(window.location.search).get('view') === 'board';

function determineWinner(leftScore: number, rightScore: number): WinnerResult {
  if (leftScore > rightScore) return 'left';
  if (rightScore > leftScore) return 'right';
  return 'tie';
}

function sumAnswerPoints(answers: FinalRoundAnswer[]): number {
  return answers.reduce((sum, a) => sum + a.points, 0);
}

/** Calculates final score when the game ended via a final round. */
function calculateFinalRoundScore(baseScore: number, finalRound: FinalRoundState): number {
  const finalSum = sumAnswerPoints(finalRound.playerA) + sumAnswerPoints(finalRound.playerB);
  const combined = (baseScore + finalSum) * FINAL_SCORE_MULTIPLIER;
  const bonus = finalSum >= FINAL_BONUS_THRESHOLD ? FINAL_BONUS_POINTS : 0;
  return combined + bonus;
}

/**
 * Full-screen celebration screen shown when the game ends.
 * Displays the winning team (or tie), final scores, and a reset button.
 * When a final round was played, calculates the final score accordingly.
 * On the board window: no "Nowa Gra" button, 2× larger score and winner text.
 */
export function WinnerScreen() {
  const teams = useGameStore((state) => state.teams);
  const finalRound = useGameStore((state) => state.finalRound);
  const resetGame = useGameStore((state) => state.resetGame);
  const { playWin } = useSound();
  // Capture playWin at mount time so the effect runs exactly once with the correct mute state
  const playWinOnMount = useRef(playWin);

  useEffect(() => {
    playWinOnMount.current();
  }, []);

  const hasFinalRound = finalRound !== undefined;
  const leftScore = hasFinalRound
    ? calculateFinalRoundScore(teams.left.totalScore, finalRound)
    : teams.left.totalScore;
  const rightScore = hasFinalRound
    ? calculateFinalRoundScore(teams.right.totalScore, finalRound)
    : teams.right.totalScore;

  const winner = determineWinner(leftScore, rightScore);
  const winnerName =
    winner === 'left' ? teams.left.name : winner === 'right' ? teams.right.name : null;
  const winnerScore = winner === 'left' ? leftScore : rightScore;

  if (hasFinalRound) {
    return (
      <FinalWinnerScreen
        winnerName={winnerName}
        score={winnerScore}
        onReset={resetGame}
        showControls={!isBoard}
        large={isBoard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-familiada-bg-dark flex flex-col items-center justify-center p-8 gap-8">
      <div className="text-5xl text-center select-none" aria-hidden="true">
        🎉 🎊 🎉
      </div>

      {winner === 'tie' ? (
        <TieDisplay
          leftName={teams.left.name}
          score={leftScore}
          rightName={teams.right.name}
          large={isBoard}
        />
      ) : (
        <WinnerDisplay
          winnerName={winnerName ?? ''}
          winnerScore={winnerScore}
          loserName={winner === 'left' ? teams.right.name : teams.left.name}
          loserScore={winner === 'left' ? rightScore : leftScore}
          large={isBoard}
        />
      )}

      {!isBoard && (
        <button onClick={resetGame} className="operator-btn-primary text-xl mt-4">
          NOWA GRA
        </button>
      )}
    </div>
  );
}

interface WinnerDisplayProps {
  winnerName: string;
  winnerScore: number;
  loserName: string;
  loserScore: number;
  large?: boolean;
}

function WinnerDisplay({ winnerName, winnerScore, loserName, loserScore, large }: WinnerDisplayProps) {
  return (
    <div className="text-center">
      <h1
        className={`font-heading text-familiada-text-secondary mb-4 uppercase tracking-widest ${large ? 'text-5xl' : 'text-3xl'}`}
      >
        WYGRYWA
      </h1>
      <div className="border-4 border-familiada-gold rounded-xl px-12 py-8 box-glow-gold mb-8">
        <p
          className={`font-heading text-familiada-gold text-glow-gold ${large ? 'text-7xl' : 'text-4xl'}`}
        >
          {winnerName}
        </p>
        <p className={`font-heading text-white mt-3 ${large ? 'text-9xl' : 'text-6xl'}`}>
          {winnerScore} PKT
        </p>
      </div>
      <p className={`font-heading text-familiada-text-secondary ${large ? 'text-3xl' : 'text-xl'}`}>
        {loserName}: {loserScore} pkt
      </p>
    </div>
  );
}

interface FinalWinnerScreenProps {
  winnerName: string | null;
  score: number;
  onReset: () => void;
  showControls: boolean;
  large?: boolean;
}

/** Simplified winner screen shown after a final round — team name, score, optional reset button. */
function FinalWinnerScreen({ winnerName, score, onReset, showControls, large }: FinalWinnerScreenProps) {
  return (
    <div className="min-h-screen bg-familiada-bg-dark flex flex-col items-center justify-center p-8 gap-8">
      <div className="border-4 border-familiada-gold rounded-xl px-16 py-12 box-glow-gold text-center">
        {winnerName && (
          <p
            className={`font-heading text-familiada-gold text-glow-gold mb-4 ${large ? 'text-6xl' : 'text-4xl'}`}
          >
            {winnerName}
          </p>
        )}
        <p
          className={`font-heading text-familiada-gold text-glow-gold ${large ? 'text-9xl' : 'text-8xl'}`}
        >
          {score}
        </p>
        <p
          className={`font-heading text-familiada-text-secondary mt-2 uppercase tracking-widest ${large ? 'text-4xl' : 'text-3xl'}`}
        >
          PKT
        </p>
      </div>
      {showControls && (
        <button onClick={onReset} className="operator-btn-primary text-xl mt-4">
          NOWA GRA
        </button>
      )}
    </div>
  );
}

interface TieDisplayProps {
  leftName: string;
  score: number;
  rightName: string;
  large?: boolean;
}

function TieDisplay({ leftName, score, rightName, large }: TieDisplayProps) {
  return (
    <div className="text-center">
      <h1
        className={`font-heading text-familiada-text-secondary mb-4 uppercase tracking-widest ${large ? 'text-5xl' : 'text-3xl'}`}
      >
        REMIS!
      </h1>
      <div className="border-4 border-familiada-gold rounded-xl px-12 py-8 box-glow-gold">
        <p className={`font-heading text-familiada-gold ${large ? 'text-4xl' : 'text-2xl'}`}>
          {leftName}
        </p>
        <p className={`font-heading text-familiada-gold mt-4 ${large ? 'text-4xl' : 'text-2xl'}`}>
          {rightName}
        </p>
        <p className={`font-heading text-white mt-4 ${large ? 'text-8xl' : 'text-5xl'}`}>
          {score} PKT
        </p>
      </div>
    </div>
  );
}
