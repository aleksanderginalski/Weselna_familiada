import { useState } from 'react';

import { useGameStore } from '@/store/gameStore';
import { QuestionBankEntry } from '@/types/game';
import { shuffled } from '@/utils/shuffle';

const SCORE_MODE_DRAW_COUNT = 10;

function buildInitialSelected(bankLength: number): boolean[] {
  return Array(bankLength).fill(false);
}

export function QuestionSelectionScreen() {
  const questionBank = useGameStore((state) => state.questionBank);
  const config = useGameStore((state) => state.config);
  const selectQuestions = useGameStore((state) => state.selectQuestions);
  const backToLobby = useGameStore((state) => state.backToLobby);

  const [selected, setSelected] = useState<boolean[]>(() => buildInitialSelected(questionBank.length));
  // order holds indices into questionBank in the operator's chosen play order
  const [order, setOrder] = useState<number[]>([]);

  function toggleQuestion(bankIndex: number) {
    const isSelected = selected[bankIndex];
    const newSelected = [...selected];
    newSelected[bankIndex] = !isSelected;

    const newOrder = isSelected
      ? order.filter((i) => i !== bankIndex)
      : [...order, bankIndex];

    setSelected(newSelected);
    setOrder(newOrder);
  }

  function moveQuestion(bankIndex: number, direction: 'up' | 'down') {
    const pos = order.indexOf(bankIndex);
    if (pos === -1) return;
    const newOrder = [...order];
    const swapPos = direction === 'up' ? pos - 1 : pos + 1;
    if (swapPos < 0 || swapPos >= newOrder.length) return;
    [newOrder[pos], newOrder[swapPos]] = [newOrder[swapPos], newOrder[pos]];
    setOrder(newOrder);
  }

  function handleDraw() {
    const drawCount =
      config.mode === 'fixed' ? (config.numberOfRounds ?? 4) : SCORE_MODE_DRAW_COUNT;
    const indices = questionBank.map((_, i) => i);
    const drawn = shuffled(indices).slice(0, drawCount);

    const newSelected = buildInitialSelected(questionBank.length);
    drawn.forEach((i) => (newSelected[i] = true));
    setSelected(newSelected);
    setOrder(drawn);
  }

  function handleConfirm() {
    const questions: QuestionBankEntry[] = order.map((i) => questionBank[i]);
    selectQuestions(questions);
  }

  return (
    <div className="min-h-screen bg-familiada-bg-dark flex flex-col items-center p-8">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button onClick={backToLobby} className="operator-btn-secondary px-4 py-2 text-sm">
              ← Wróć
            </button>
            <h1 className="font-heading text-3xl text-familiada-gold text-glow-gold">WYBÓR PYTAŃ</h1>
          </div>
          <button onClick={handleDraw} className="operator-btn-secondary px-6 py-2 text-sm">
            LOSUJ
          </button>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <p className="text-familiada-text-secondary text-sm">
            Wybrano: {order.length} / {questionBank.length} pytań
          </p>
          {config.mode === 'fixed' && order.length > 0 && (
            <p className="text-familiada-gold text-sm font-bold">
              Liczba rund: {order.length}
            </p>
          )}
          {config.mode === 'score' && config.winningScore !== undefined && (
            <p className="text-familiada-gold text-sm font-bold">
              Gra do {config.winningScore} pkt
            </p>
          )}
        </div>

        <ul className="space-y-2 mb-8">
          {questionBank.map((entry, bankIndex) => (
            <QuestionRow
              key={bankIndex}
              entry={entry}
              bankIndex={bankIndex}
              isSelected={selected[bankIndex]}
              orderPosition={order.indexOf(bankIndex)}
              isFirst={order.indexOf(bankIndex) === 0}
              isLast={order.indexOf(bankIndex) === order.length - 1}
              onToggle={toggleQuestion}
              onMove={moveQuestion}
            />
          ))}
        </ul>

        <button
          onClick={handleConfirm}
          disabled={order.length === 0}
          className="operator-btn-primary w-full text-xl"
        >
          ROZPOCZNIJ GRĘ
        </button>
      </div>
    </div>
  );
}

interface QuestionRowProps {
  entry: QuestionBankEntry;
  bankIndex: number;
  isSelected: boolean;
  orderPosition: number;
  isFirst: boolean;
  isLast: boolean;
  onToggle: (index: number) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
}

function QuestionRow({
  entry,
  bankIndex,
  isSelected,
  orderPosition,
  isFirst,
  isLast,
  onToggle,
  onMove,
}: QuestionRowProps) {
  return (
    <li
      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
        isSelected
          ? 'border-familiada-gold bg-familiada-bg-panel'
          : 'border-familiada-border bg-familiada-bg-panel opacity-60'
      }`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(bankIndex)}
        className="accent-familiada-gold w-5 h-5 cursor-pointer flex-shrink-0"
      />

      {isSelected && (
        <span className="text-familiada-text-secondary text-sm w-5 text-center flex-shrink-0">
          {orderPosition + 1}.
        </span>
      )}

      <span className="text-familiada-text-primary flex-1 truncate">{entry.question}</span>

      <div className="flex items-center gap-1 flex-shrink-0">
        {entry.category && (
          <span className="text-xs px-2 py-0.5 rounded bg-familiada-bg-dark text-familiada-text-secondary border border-familiada-border">
            {entry.category}
          </span>
        )}
        {entry.isFinalQuestion && (
          <span className="text-xs px-2 py-0.5 rounded bg-familiada-gold text-familiada-bg-dark font-bold">
            F
          </span>
        )}
      </div>

      {isSelected && (
        <div className="flex flex-col gap-0.5 flex-shrink-0">
          <button
            onClick={() => onMove(bankIndex, 'up')}
            disabled={isFirst}
            className="text-familiada-text-secondary hover:text-familiada-gold disabled:opacity-20 leading-none px-1"
            aria-label="Przesuń w górę"
          >
            ▲
          </button>
          <button
            onClick={() => onMove(bankIndex, 'down')}
            disabled={isLast}
            className="text-familiada-text-secondary hover:text-familiada-gold disabled:opacity-20 leading-none px-1"
            aria-label="Przesuń w dół"
          >
            ▼
          </button>
        </div>
      )}
    </li>
  );
}
