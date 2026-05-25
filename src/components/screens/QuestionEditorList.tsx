import { QuestionBankEntry } from '@/types/game';
import { TagFilterPanel } from '@/components/shared/TagFilterPanel';

interface Props {
  questions: QuestionBankEntry[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagDeselect: (tag: string) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onAddNew: () => void;
}

export function QuestionEditorList({
  questions,
  selectedTags,
  onTagSelect,
  onTagDeselect,
  onEdit,
  onDelete,
  onAddNew,
}: Props) {
  const filteredWithIndex = questions
    .map((q, originalIndex) => ({ q, originalIndex }))
    .filter(({ q }) => {
      if (selectedTags.length === 0) return true;
      if (q.tags.length === 0) return false;
      return selectedTags.every((tag) => q.tags.includes(tag));
    });

  const countLabel =
    selectedTags.length > 0
      ? `${filteredWithIndex.length} z ${questions.length} pytań`
      : questions.length === 0
        ? 'Brak pytań w banku'
        : `${questions.length} pytań w banku`;

  return (
    <div className="space-y-4">
      <TagFilterPanel
        bank={questions}
        selectedTags={selectedTags}
        onSelect={onTagSelect}
        onDeselect={onTagDeselect}
      />

      <div className="flex items-center justify-between">
        <p className="text-familiada-text-secondary text-sm">{countLabel}</p>
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

      {questions.length > 0 && filteredWithIndex.length === 0 && (
        <div className="text-center py-12 text-familiada-text-secondary">
          <p className="text-lg">Brak pytań dla wybranych filtrów.</p>
        </div>
      )}

      <ul className="space-y-2">
        {filteredWithIndex.map(({ q, originalIndex }) => (
          <li
            key={originalIndex}
            className="bg-familiada-bg-dark border border-familiada-border rounded-lg px-4 py-3 flex items-center gap-3"
          >
            <span className="text-familiada-text-secondary text-sm w-6 shrink-0">
              {originalIndex + 1}.
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-familiada-text-primary truncate">{q.question}</p>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-familiada-text-secondary text-xs">
                  {q.answers.length} {q.answers.length === 1 ? 'odpowiedź' : 'odpowiedzi'}
                </span>
                {q.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-familiada-border text-familiada-text-secondary text-xs px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => onEdit(originalIndex)}
                className="operator-btn text-sm px-3 py-1"
              >
                Edytuj
              </button>
              <button
                onClick={() => onDelete(originalIndex)}
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
