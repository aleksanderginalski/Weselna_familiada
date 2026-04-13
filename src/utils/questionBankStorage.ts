import { QuestionBankEntry } from '@/types/game';

const STORAGE_KEY = 'familiada-question-bank';

/** Persists the full question bank to localStorage. Silently no-ops on error. */
export function saveQuestionBank(questions: QuestionBankEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch {
    // localStorage may be unavailable (private mode, quota exceeded)
  }
}

/** Loads the question bank from localStorage. Returns null if absent or unparseable. */
export function loadQuestionBank(): QuestionBankEntry[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed as QuestionBankEntry[];
  } catch {
    return null;
  }
}
