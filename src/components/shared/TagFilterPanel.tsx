import { QuestionBankEntry } from '@/types/game';
import { computeAvailableTags, extractAllTags } from '@/utils/tagUtils';

interface Props {
  bank: QuestionBankEntry[];
  selectedTags: string[];
  onSelect: (tag: string) => void;
  onDeselect: (tag: string) => void;
}

export function TagFilterPanel({ bank, selectedTags, onSelect, onDeselect }: Props) {
  const allTags = extractAllTags(bank);
  if (allTags.length === 0 && selectedTags.length === 0) return null;

  const availableTags = computeAvailableTags(bank, selectedTags);

  return (
    <div className="mb-4 p-3 bg-familiada-bg-panel border border-familiada-border rounded-lg">
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-familiada-gold text-familiada-bg-dark text-xs font-bold px-2 py-1 rounded-full"
            >
              {tag}
              <button
                onClick={() => onDeselect(tag)}
                className="hover:opacity-70 leading-none"
                aria-label={`Usuń filtr ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      {availableTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelect(tag)}
              className="bg-familiada-bg-dark border border-familiada-border text-familiada-text-secondary text-xs px-2 py-1 rounded-full hover:border-familiada-gold hover:text-familiada-gold transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
