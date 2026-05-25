import { QuestionBankEntry } from '@/types/game';

/** Returns sorted unique tags from all questions in the bank. */
export function extractAllTags(bank: QuestionBankEntry[]): string[] {
  const tagSet = new Set<string>();
  bank.forEach((q) => q.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

/**
 * Returns sorted tags that appear on questions matching ALL selectedTags,
 * excluding the already-selected ones (faceted navigation).
 * With empty selectedTags returns all tags in the bank.
 */
export function computeAvailableTags(bank: QuestionBankEntry[], selectedTags: string[]): string[] {
  if (selectedTags.length === 0) return extractAllTags(bank);

  const matching = bank.filter((q) => selectedTags.every((tag) => q.tags.includes(tag)));

  const tagSet = new Set<string>();
  matching.forEach((q) =>
    q.tags.forEach((tag) => {
      if (!selectedTags.includes(tag)) tagSet.add(tag);
    }),
  );

  return Array.from(tagSet).sort();
}
