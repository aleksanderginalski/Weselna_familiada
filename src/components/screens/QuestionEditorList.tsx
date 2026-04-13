import { QuestionBankEntry } from '@/types/game';

interface Props {
  questions: QuestionBankEntry[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onAddNew: () => void;
}

export function QuestionEditorList({ questions, onEdit, onDelete, onAddNew }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-familiada-text-secondary text-sm">
          {questions.length === 0 ? 'Brak pytań w banku' : `${questions.length} pytań w banku`}
        </p>
        <button onClick={onAddNew} className="operator-btn-primary px-4 py-2 text-sm">
          + Dodaj pytanie
        </button>
      </div>

      {questions.length === 0 && (
        <div className="text-center py-12 text-familiada-text-secondary">
          <p className="text-lg">Brak pytań.</p>
          <p className="text-sm mt-1">Kliknij "Dodaj pytanie" aby dodać pierwsze pytanie.</p>
        </div>
      )}

      <ul className="space-y-2">
        {questions.map((q, index) => (
          <li
            key={index}
            className="bg-familiada-bg-dark border border-familiada-border rounded-lg px-4 py-3 flex items-center gap-3"
          >
            <span className="text-familiada-text-secondary text-sm w-6 shrink-0">{index + 1}.</span>
            <div className="flex-1 min-w-0">
              <p className="text-familiada-text-primary truncate">{q.question}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-familiada-text-secondary text-xs">
                  {q.answers.length} {q.answers.length === 1 ? 'odpowiedź' : 'odpowiedzi'}
                </span>
                {q.category && (
                  <span className="bg-familiada-border text-familiada-text-secondary text-xs px-2 py-0.5 rounded-full">
                    {q.category}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => onEdit(index)}
                className="operator-btn text-sm px-3 py-1"
              >
                Edytuj
              </button>
              <button
                onClick={() => onDelete(index)}
                className="text-familiada-red border border-familiada-red rounded px-3 py-1 text-sm hover:bg-familiada-red hover:text-white transition-colors"
              >
                Usuń
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
