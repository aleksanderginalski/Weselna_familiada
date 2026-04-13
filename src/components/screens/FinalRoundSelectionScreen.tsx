import { useState } from 'react';

import { useGameStore } from '@/store/gameStore';
import { QuestionBankEntry } from '@/types/game';
import { shuffled } from '@/utils/shuffle';

const FINAL_ROUND_QUESTION_COUNT = 5;

export function FinalRoundSelectionScreen() {
  const availableForFinal = useGameStore((state) => state.availableForFinal);
  const selectFinalQuestions = useGameStore((state) => state.selectFinalQuestions);
  const backToMainSelection = useGameStore((state) => state.backToMainSelection);

  const [selected, setSelected] = useState<boolean[]>(() => {
    // Auto-select all when exactly the required count is available
    if (availableForFinal.length === FINAL_ROUND_QUESTION_COUNT) {
      return Array(availableForFinal.length).fill(true);
    }
    return Array(availableForFinal.length).fill(false);
  });

  const selectedIndices = selected
    .map((s, i) => (s ? i : -1))
    .filter((i) => i !== -1);

  const isAtLimit = selectedIndices.length >= FINAL_ROUND_QUESTION_COUNT;

  function toggleQuestion(index: number) {
    if (!selected[index] && isAtLimit) return;
    setSelected((prev) => prev.map((s, i) => (i === index ? !s : s)));
  }

  function handleDraw() {
    const indices = availableForFinal.map((_, i) => i);
    const drawn = shuffled(indices).slice(0, FINAL_ROUND_QUESTION_COUNT);
    const newSelected = Array(availableForFinal.length).fill(false);
    drawn.forEach((i) => (newSelected[i] = true));
    setSelected(newSelected);
  }

  function handleConfirm() {
    const questions: QuestionBankEntry[] = selectedIndices.map((i) => availableForFinal[i]);
    selectFinalQuestions(questions);
  }

  const canConfirm = selectedIndices.length === FINAL_ROUND_QUESTION_COUNT;

  return (
    <div className="min-h-screen bg-familiada-bg-dark flex flex-col items-center p-8">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button onClick={backToMainSelection} className="operator-btn-secondary px-4 py-2 text-sm">
              ← Wróć do pytań głównych
            </button>
            <h1 className="font-heading text-3xl text-familiada-gold text-glow-gold">
              PYTANIA FINAŁOWE
            </h1>
          </div>
          {availableForFinal.length > FINAL_ROUND_QUESTION_COUNT && (
            <button onClick={handleDraw} className="operator-btn-secondary px-6 py-2 text-sm">
              LOSUJ
            </button>
          )}
        </div>

        <p className="text-familiada-text-secondary text-sm mb-1">
          Wybrano: {selectedIndices.length} / {FINAL_ROUND_QUESTION_COUNT}
        </p>

        {isAtLimit && (
          <p className="text-familiada-gold text-xs mb-4 font-bold">
            Wybrano {FINAL_ROUND_QUESTION_COUNT} pytań finałowych. Kliknij "ROZPOCZNIJ GRĘ" aby zacząć.
          </p>
        )}

        {availableForFinal.length < FINAL_ROUND_QUESTION_COUNT && (
          <div className="mb-4 bg-familiada-bg-panel border border-familiada-red rounded-lg px-4 py-3">
            <p className="text-familiada-red text-sm font-bold">
              Za mało pytań do wyboru ({availableForFinal.length}). Wróć i odznacz część pytań głównych.
            </p>
          </div>
        )}

        <ul className="space-y-2 mb-8">
          {availableForFinal.map((entry, index) => {
            const isSelected = selected[index];
            const isDisabled = !isSelected && isAtLimit;
            return (
              <li
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                  isSelected
                    ? 'border-familiada-gold bg-familiada-bg-panel'
                    : isDisabled
                      ? 'border-familiada-border bg-familiada-bg-panel opacity-30 cursor-not-allowed'
                      : 'border-familiada-border bg-familiada-bg-panel opacity-60'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange={() => toggleQuestion(index)}
                  className="accent-familiada-gold w-5 h-5 cursor-pointer flex-shrink-0 disabled:cursor-not-allowed"
                />
                <span className="text-familiada-text-primary flex-1 truncate">{entry.question}</span>
                {entry.category && (
                  <span className="text-xs px-2 py-0.5 rounded bg-familiada-bg-dark text-familiada-text-secondary border border-familiada-border flex-shrink-0">
                    {entry.category}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <button
          onClick={handleConfirm}
          disabled={!canConfirm}
          className="operator-btn-primary w-full text-xl"
        >
          ROZPOCZNIJ GRĘ
        </button>
      </div>
    </div>
  );
}
