import { useGameStore } from '@/store/gameStore';
import { useSound } from '@/hooks/useSound';
import { FinalRoundAnswer } from '@/types/game';
import { FinalRoundQuestionRow } from './FinalRoundQuestionRow';
import { FinalRoundTimerPanel } from './FinalRoundTimerPanel';
import { VolumeSlider } from './VolumeSlider';

const FINAL_ROUND_QUESTIONS = 5;

function allRevealed(answers: FinalRoundAnswer[]): boolean {
  return answers.length === FINAL_ROUND_QUESTIONS && answers.every((a) => a.isRevealed);
}

function calculateFinalSum(playerA: FinalRoundAnswer[], playerB: FinalRoundAnswer[]): number {
  const sumA = playerA.reduce((s, a) => s + a.points, 0);
  const sumB = playerB.reduce((s, a) => s + a.points, 0);
  return sumA + sumB;
}

/**
 * Operator view during the final round.
 * Assembles the timer panel, question rows, and phase control buttons.
 */
export function FinalRoundOperator() {
  const finalRound = useGameStore((state) => state.finalRound);
  const advanceToRevealPhase = useGameStore((state) => state.advanceToRevealPhase);
  const hidePlayerAAnswers = useGameStore((state) => state.hidePlayerAAnswers);
  const finishFinalRound = useGameStore((state) => state.finishFinalRound);
  const { isMuted, toggleMute, volume, setVolume } = useSound();

  if (!finalRound) return null;

  const { questions, playerA, playerB, phase } = finalRound;

  const allARevealed = allRevealed(playerA);
  const allBRevealed = allRevealed(playerB);
  const finalSum = calculateFinalSum(playerA, playerB);

  return (
    <div className="min-h-screen bg-familiada-bg-dark p-4 space-y-4">
      <div className="sticky top-0 bg-familiada-bg-dark z-10 pb-2 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-display text-xl text-familiada-gold uppercase tracking-widest">
            Runda Finałowa — Panel Operatora
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="operator-btn bg-familiada-bg-panel text-familiada-text-secondary border border-familiada-border hover:border-familiada-gold hover:text-familiada-gold"
            >
              {isMuted ? 'Włącz dźwięk' : 'Wycisz'}
            </button>
            <VolumeSlider volume={volume} onChange={setVolume} />
          </div>
        </div>
        <FinalRoundTimerPanel />
      </div>

      <div className="space-y-3">
        {Array.from({ length: FINAL_ROUND_QUESTIONS }, (_, i) => (
          <FinalRoundQuestionRow
            key={i}
            questionIndex={i}
            question={questions[i]?.question ?? ''}
            correctAnswers={questions[i]?.answers ?? []}
            playerAAnswer={
              playerA[i] ?? {
                text: '',
                points: 0,
                isRevealed: false,
                pointsVisible: false,
                type: 'pending',
              }
            }
            playerBAnswer={
              playerB[i] ?? {
                text: '',
                points: 0,
                isRevealed: false,
                pointsVisible: false,
                type: 'pending',
              }
            }
            playerAAnswerForQuestion={playerA[i]}
            phase={phase}
          />
        ))}
      </div>

      <div className="border-t border-gray-700 pt-4 space-y-3">
        <div className="text-center text-familiada-text-secondary">
          Suma finałowa: <span className="text-familiada-gold font-bold text-xl">{finalSum} pkt</span>
        </div>

        {phase === 'answeringA' && (
          <button onClick={advanceToRevealPhase} className="operator-btn-primary w-full py-3">
            GOTOWY DO SPRAWDZANIA
          </button>
        )}

        {phase === 'revealingA' && allARevealed && (
          <button onClick={hidePlayerAAnswers} className="operator-btn-primary w-full py-3">
            UKRYJ ODPOWIEDZI GRACZA A → Gracz B
          </button>
        )}

        {phase === 'answeringB' && (
          <button onClick={advanceToRevealPhase} className="operator-btn-primary w-full py-3">
            GOTOWY DO SPRAWDZANIA (Gracz B)
          </button>
        )}

        {phase === 'revealingB' && (
          <button
            onClick={finishFinalRound}
            disabled={!allBRevealed}
            className="operator-btn-primary w-full py-3 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ZAKOŃCZ RUNDĘ FINAŁOWĄ
          </button>
        )}
      </div>
    </div>
  );
}
