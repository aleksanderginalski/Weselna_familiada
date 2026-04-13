import { describe, expect, it } from 'vitest';

import { shuffled } from './shuffle';

describe('shuffled', () => {
  // TC-149
  it('should return array with same elements without mutating original', () => {
    const original = [1, 2, 3, 4, 5];
    const frozen = [...original];

    const result = shuffled(original);

    expect(result).toHaveLength(original.length);
    expect(result.sort()).toEqual(frozen.sort());
    expect(original).toEqual(frozen); // original unchanged
  });

  // TC-150
  it('should handle empty array', () => {
    expect(shuffled([])).toEqual([]);
  });
});
