const MAX_DISPLAYABLE = 999;

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
}

/**
 * Three-slot LED-style digit display (hundreds, tens, units).
 *
 * Each digit is rendered via CSS ::before pseudo-element (data-digit attribute),
 * keeping DOM text content empty. A sr-only span exposes the numeric value for
 * accessibility and testing (RTL getByText queries).
 */
export function DigitDisplay({ value, label, sublabel, digitFontSize = '3rem', labelColor = 'text-familiada-text-secondary' }: DigitDisplayProps) {
  const clamped = Math.max(0, Math.min(Math.floor(value), MAX_DISPLAYABLE));
  // Leading positions show empty space; value 0 shows all cells empty
  const chars = clamped === 0 ? [' ', ' ', ' '] : String(clamped).padStart(3, ' ').split('');

  return (
    <div className="flex flex-col items-center gap-1">
      {label && (
        <span className={`font-heading text-xl ${labelColor} uppercase tracking-widest`}>
          {label}
        </span>
      )}
      {/* Gold outer border → black inner border → black gap between cells */}
      <div className="border-2 border-familiada-gold bg-black p-[2px]">
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
