import { describe, expect, it } from 'vitest';

import { QuestionBankEntry } from '@/types/game';
import { computeAvailableTags, extractAllTags } from './tagUtils';

function q(tags: string[]): QuestionBankEntry {
  return { question: 'Q?', answers: [{ text: 'A', points: 10 }], tags };
}

describe('extractAllTags', () => {
  // TC-173
  it('should return empty array for empty bank', () => {
    expect(extractAllTags([])).toEqual([]);
  });

  // TC-174
  it('should return sorted unique tags and skip questions with no tags', () => {
    const bank = [q(['b', 'a']), q(['c', 'a']), q([])];
    expect(extractAllTags(bank)).toEqual(['a', 'b', 'c']);
  });
});

describe('computeAvailableTags', () => {
  // TC-175
  it('should return all tags when selectedTags is empty', () => {
    const bank = [q(['sport', 'muzyka']), q(['film'])];
    expect(computeAvailableTags(bank, [])).toEqual(['film', 'muzyka', 'sport']);
  });

  // TC-176
  it('should return tags co-existing with selected tag, excluding selected', () => {
    const bank = [q(['a', 'b']), q(['a', 'c']), q(['b'])];
    // only questions with 'a': first two; their other tags: ['b', 'c']
    expect(computeAvailableTags(bank, ['a'])).toEqual(['b', 'c']);
  });

  // TC-177
  it('should return empty array when no questions match all selected tags', () => {
    const bank = [q(['a', 'b']), q(['a', 'c'])];
    expect(computeAvailableTags(bank, ['b', 'c'])).toEqual([]);
  });
});
