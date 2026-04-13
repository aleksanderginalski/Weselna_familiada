const MAX_DISPLAYABLE = 999;

// Score thresholds that trigger the gold glow milestone effect
const SCORE_MILESTONE_1 = 1000;
const SCORE_MILESTONE_2 = 2000;

const GLOW_ANIMATION_CLASSES: Record<1 | 2, string> = {
  1: 'glow-pulse-gold',
  2: 'glow-pulse-milestone',
};

interface DigitDisplayProps {
  value: number;
  /** Text label shown above the display */
  label?: string;
  /** Text label shown below the display */
  sublabel?: string;
  /** Font size for each digit cell, e.g. '3rem' or '5rem' */
  digitFontSize?: string;
  /** Tailwind text color class for labels, e.g. 'text-white'. Defaults to text-familiada-text-secondary */
  labelColor?: string;
  /** Gold glow intensity: 0 = none, 1 = score ≥ 1000, 2 = score ≥ 2000 */
  glowLevel?: 0 | 1 | 2;
  /** When true, empty leading positions show '0' instead of blank space (used when score wraps past 1000) */
  padWithZeros?: boolean;
}

export { SCORE_MILESTONE_1, SCORE_MILESTONE_2 };

/**
 * Three-slot LED-style digit display (hundreds, tens, units).
 *
 * Each digit is rendered via CSS ::before pseudo-element (data-digit attribute),
 * keeping DOM text content empty. A sr-only span exposes the numeric value for
 * accessibility and testing (RTL getByText queries).
 */
export function DigitDisplay({ value, label, sublabel, digitFontSize = '3rem', labelColor = 'text-familiada-text-secondary', glowLevel = 0, padWithZeros = false }: DigitDisplayProps) {
  const clamped = Math.max(0, Math.min(Math.floor(value), MAX_DISPLAYABLE));
  const pad = padWithZeros ? '0' : ' ';
  // When padWithZeros: always show 3 digits with leading zeros (e.g. 005, 015, 000)
  // Otherwise: leading positions are blank, value 0 shows all cells empty
  const chars = (!padWithZeros && clamped === 0) ? [' ', ' ', ' '] : String(clamped).padStart(3, pad).split('');
  const glowClass = glowLevel > 0 ? GLOW_ANIMATION_CLASSES[glowLevel as 1 | 2] : '';

  return (
    <div className="flex flex-col items-center gap-1">
      {label && (
        <span className={`font-heading text-xl ${labelColor} uppercase tracking-widest`}>
          {label}
        </span>
      )}
      {/* Gold outer border → black inner border → black gap between cells */}
      <div className={`border-2 border-familiada-gold bg-black p-[2px] ${glowClass}`}>
        <div className="flex border-2 border-black bg-black" style={{ gap: '2px', padding: '2px' }}>
          {chars.map((digit, i) => (
            <span
              key={i}
              className="digit-cell font-display text-familiada-gold bg-[#0e1428]"
              data-digit={digit}
              style={{
                // 5:7 ratio matches Familiada-2 em-square (640×896). line-height:1 = no clipping.
                height: digitFontSize,
                aspectRatio: '5/7',
                fontSize: digitFontSize,
                lineHeight: 1,
              }}
            />
          ))}
        </div>
      </div>
      {sublabel && (
        <span className={`font-heading text-xs ${labelColor}`}>
          {sublabel}
        </span>
      )}
      {/* Accessible value — used by RTL getByText and screen readers */}
      <span className="sr-only">{value}</span>
    </div>
  );
}
