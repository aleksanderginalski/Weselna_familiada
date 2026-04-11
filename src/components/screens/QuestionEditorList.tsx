import { QuestionBankEntry } from '@/types/game';

export interface QuestionListItem {
  entry: QuestionBankEntry;
  /** Index in the full questionBank array */
  globalIndex: number;
}

interface Props {
  items: QuestionListItem[];
  activeTab: 'main' | 'final';
  emptyMessage: string;
  onEdit: (globalIndex: number) => void;
  onDelete: (globalIndex: number) => void;
  onAddNew: () => void;
}

export function QuestionEditorList({ items, emptyMessage, onEdit, onDelete, onAddNew }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-familiada-text-secondary text-sm">
          {items.length === 0 ? 'Brak pytań' : `${items.length} pytań w banku`}
        </p>
        <button onClick={onAddNew} className="operator-btn-primary px-4 py-2 text-sm">
          + Dodaj pytanie
        </button>
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-familiada-text-secondary">
          <p className="text-lg">Brak pytań.</p>
          <p className="text-sm mt-1">{emptyMessage}</p>
        </div>
      )}

      <ul className="space-y-2">
        {items.map(({ entry: q, globalIndex }, displayIndex) => (
          <li
            key={globalIndex}
            className="bg-familiada-bg-dark border border-familiada-border rounded-lg px-4 py-3 flex items-center gap-3"
          >
            <span className="text-familiada-text-secondary text-sm w-6 shrink-0">
              {displayIndex + 1}.
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-familiada-text-primary truncate">{q.question}</p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-familiada-text-secondary text-xs">
                  {q.answers.length} {q.answers.length === 1 ? 'odpowiedź' : 'odpowiedzi'}
                </span>
                {q.category && (
                  <span className="bg-familiada-border text-familiada-text-secondary text-xs px-2 py-0.5 rounded-full">
                    {q.category}
                  </span>
                )}
                {/* Pool badges — both shown simultaneously */}
                {q.isMainQuestion !== false && (
                  <span className="bg-familiada-border text-familiada-gold text-xs px-2 py-0.5 rounded-full font-bold border border-familiada-gold">
                    G
                  </span>
                )}
                {q.isFinalQuestion === true && (
                  <span className="bg-familiada-gold text-familiada-bg-dark text-xs px-2 py-0.5 rounded-full font-bold">
                    F
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => onEdit(globalIndex)}
                className="operator-btn text-sm px-3 py-1"
              >
                Edytuj
              </button>
              <button
                onClick={() => onDelete(globalIndex)}
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
