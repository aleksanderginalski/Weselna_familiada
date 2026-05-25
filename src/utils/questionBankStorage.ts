import { QuestionBankEntry } from '@/types/game';

const STORAGE_KEY = 'familiada-question-bank';

function migrateEntry(raw: Record<string, unknown>): QuestionBankEntry {
  const tags: string[] = Array.isArray(raw.tags)
    ? (raw.tags as string[])
    : typeof raw.category === 'string' && raw.category
      ? [raw.category]
      : [];
  return {
    question: String(raw.question ?? ''),
    answers: (Array.isArray(raw.answers) ? raw.answers : []) as QuestionBankEntry['answers'],
    tags,
  };
}

/** Persists the full question bank to localStorage. Silently no-ops on error. */
export function saveQuestionBank(questions: QuestionBankEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch {
    // localStorage may be unavailable (private mode, quota exceeded)
  }
}

/** Loads the question bank from localStorage, applying format migration. Returns null if absent. */
export function loadQuestionBank(): QuestionBankEntry[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return (parsed as Record<string, unknown>[]).map(migrateEntry);
  } catch {
    return null;
  }
}
