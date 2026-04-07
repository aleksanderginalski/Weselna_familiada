import { useState } from 'react';

import { useGameStore } from '@/store/gameStore';
import { useSound } from '@/hooks/useSound';
import { FinalRoundAnswer, FinalRoundAnswerData, FinalRoundPhase } from '@/types/game';

interface Props {
  questionIndex: number;
  question: string;
  correctAnswers: FinalRoundAnswerData[];
  playerAAnswer: FinalRoundAnswer;
  playerBAnswer: FinalRoundAnswer;
  phase: FinalRoundPhase;
}

interface AnswerSlotProps {
  player: 'A' | 'B';
  questionIndex: number;
  answer: FinalRoundAnswer;
  correctAnswers: FinalRoundAnswerData[];
  isActive: boolean;
}

function AnswerSlot({ player, questionIndex, answer, correctAnswers, isActive }: AnswerSlotProps) {
  const revealFinalAnswer = useGameStore((state) => state.revealFinalAnswer);
  const showFinalAnswerPoints = useGameStore((state) => state.showFinalAnswerPoints);
  const { playBell, playCorrect, playWrong } = useSound();

  const [wrongText, setWrongText] = useState('');
  const [selectedCorrect, setSelectedCorrect] = useState<FinalRoundAnswerData | null>(null);

  if (answer.isRevealed) {
    const color =
      answer.type === 'correct'
        ? 'text-green-400'
        : answer.type === 'wrong'
          ? 'text-familiada-red'
          : 'text-gray-400';
    return (
      <div className={`text-sm ${color}`}>
        {answer.text || '---'} ({answer.points} pkt) ✓
      </div>
    );
  }

  if (!isActive) {
    return <div className="text-xs text-gray-500 italic">Oczekuje...</div>;
  }

  function handleReveal() {
    let finalAnswer: FinalRoundAnswer;

    if (selectedCorrect) {
      finalAnswer = {
        text: selectedCorrect.text,
        points: selectedCorrect.points,
        isRevealed: true,
        pointsVisible: false,
        type: 'correct',
      };
    } else if (wrongText.trim()) {
      finalAnswer = {
        text: wrongText.trim(),
        points: 0,
        isRevealed: true,
        pointsVisible: false,
        type: 'wrong',
      };
    } else {
      finalAnswer = {
        text: '',
        points: 0,
        isRevealed: true,
        pointsVisible: false,
        type: 'skipped',
      };
    }

    revealFinalAnswer(questionIndex, player, finalAnswer);

    if (finalAnswer.type === 'skipped') {
      // Skipped: no bell, show "---" + wrong sound immediately
      showFinalAnswerPoints(questionIndex, player);
      playWrong();
    } else {
      // Correct or wrong: bell when text appears, then points + sound after ~1s
      playBell();
      setTimeout(() => {
        showFinalAnswerPoints(questionIndex, player);
        if (finalAnswer.type === 'correct') playCorrect();
        else playWrong();
      }, 1000);
    }

    setWrongText('');
    setSelectedCorrect(null);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1">
        {correctAnswers.map((ca) => (
          <button
            key={ca.text}
            onClick={() => {
              setSelectedCorrect(ca);
              setWrongText('');
            }}
            className={`text-xs px-2 py-1 rounded border ${
              selectedCorrect?.text === ca.text
                ? 'bg-green-700 border-green-500 text-white'
                : 'border-gray-600 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {ca.text} ({ca.points})
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={wrongText}
          onChange={(e) => {
            setWrongText(e.target.value);
            setSelectedCorrect(null);
          }}
          placeholder="Błędna odpowiedź..."
          className="flex-1 bg-gray-700 text-white text-sm px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-familiada-gold"
        />
        <button onClick={handleReveal} className="operator-btn text-sm px-3 py-1">
          ODKRYJ
        </button>
      </div>
    </div>
  );
}

/**
 * A single question row in the final round operator panel.
 * Shows the question and answer slots for both players.
 */
export function FinalRoundQuestionRow({
  questionIndex,
  question,
  correctAnswers,
  playerAAnswer,
  playerBAnswer,
  phase,
}: Props) {
  const isRevealingA = phase === 'revealingA';
  const isRevealingB = phase === 'revealingB';

  return (
    <div className="border border-gray-700 rounded-lg p-3 space-y-2">
      <p className="text-familiada-gold font-bold text-sm">
        P{questionIndex + 1}: {question}
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Gracz A</p>
          <AnswerSlot
            player="A"
            questionIndex={questionIndex}
            answer={playerAAnswer}
            correctAnswers={correctAnswers}
            isActive={isRevealingA}
          />
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Gracz B</p>
          <AnswerSlot
            player="B"
            questionIndex={questionIndex}
            answer={playerBAnswer}
            correctAnswers={correctAnswers}
            isActive={isRevealingB}
          />
        </div>
      </div>
    </div>
  );
}
