import { BoardColors } from '@/types/game';

const BOARD_CENTER_COLOR = '#060818';

/**
 * Parses a hex color string into [r, g, b] components (0–255).
 * Returns null if the hex string is invalid.
 */
function parseHex(hex: string): [number, number, number] | null {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return [r, g, b];
}

/** Converts [r, g, b] (0–255) to HSL. Returns [h (0–360), s (0–1), l (0–1)]. */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) return [0, 0, l];

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;

  return [h * 360, s, l];
}

function hueToRgb(p: number, q: number, t: number): number {
  let tn = t;
  if (tn < 0) tn += 1;
  if (tn > 1) tn -= 1;
  if (tn < 1 / 6) return p + (q - p) * 6 * tn;
  if (tn < 1 / 2) return q;
  if (tn < 2 / 3) return p + (q - p) * (2 / 3 - tn) * 6;
  return p;
}

/** Converts HSL (h 0–360, s 0–1, l 0–1) to a hex color string. */
function hslToHex(h: number, s: number, l: number): string {
  const hn = h / 360;
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, hn + 1 / 3);
    g = hueToRgb(p, q, hn);
    b = hueToRgb(p, q, hn - 1 / 3);
  }
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Derives the dark gradient transition stop for a given team color.
 * Reduces HSL lightness to 55% of the original value.
 * Returns '#000000' if hex is invalid.
 */
export function deriveGradientDark(hex: string): string {
  const rgb = parseHex(hex);
  if (!rgb) return '#000000';
  const [h, s, l] = rgbToHsl(...rgb);
  return hslToHex(h, s, l * 0.55);
}

/**
 * Computes the full 6-stop board background gradient from the given team colors.
 * Structure: light → dark → center → center → dark → light
 */
export function computeBoardGradient(colors: BoardColors): string {
  const leftDark = deriveGradientDark(colors.left);
  const rightDark = deriveGradientDark(colors.right);
  return [
    'linear-gradient(to right',
    `${colors.left} 0%`,
    `${leftDark} 20%`,
    `${BOARD_CENTER_COLOR} 35%`,
    `${BOARD_CENTER_COLOR} 65%`,
    `${rightDark} 80%`,
    `${colors.right} 100%)`,
  ].join(', ');
}
