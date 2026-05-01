import { describe, expect, it } from 'vitest';

import { computeBoardGradient, deriveGradientDark } from './colorUtils';

describe('deriveGradientDark', () => {
  it('should return a valid darker hex for a bright color (TC-282)', () => {
    const result = deriveGradientDark('#cc1100');

    expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    // Dark stop must be darker than the source — compare lightness via R+G+B sum
    const srcSum = 0xcc + 0x11 + 0x00;
    const parts = result.slice(1).match(/.{2}/g)!;
    const dstSum = parts.reduce((acc, h) => acc + parseInt(h, 16), 0);
    expect(dstSum).toBeLessThan(srcSum);
  });

  it('should return "#000000" for an invalid hex string (TC-283)', () => {
    expect(deriveGradientDark('not-a-color')).toBe('#000000');
    expect(deriveGradientDark('')).toBe('#000000');
    expect(deriveGradientDark('#abc')).toBe('#000000');
  });
});

describe('computeBoardGradient', () => {
  it('should return a linear-gradient string containing both team colors and center color (TC-284)', () => {
    const colors = { left: '#cc1100', right: '#0044cc' };
    const result = computeBoardGradient(colors);

    expect(result).toMatch(/^linear-gradient/);
    expect(result).toContain('#cc1100');
    expect(result).toContain('#0044cc');
    expect(result).toContain('#060818');
    // Both team colors appear at boundary stops (0% and 100%)
    expect(result).toContain('#cc1100 0%');
    expect(result).toContain('#0044cc 100%');
  });
});
