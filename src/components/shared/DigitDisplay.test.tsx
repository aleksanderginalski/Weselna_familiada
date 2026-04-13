import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DigitDisplay } from './DigitDisplay';

// TC-127
describe('DigitDisplay', () => {
  it('should render sr-only value, label, and sublabel', () => {
    render(<DigitDisplay value={42} label="Do wygrania" sublabel="x2 mnożnik" />);

    expect(screen.getByText('42')).toBeInTheDocument(); // sr-only
    expect(screen.getByText('Do wygrania')).toBeInTheDocument();
    expect(screen.getByText('x2 mnożnik')).toBeInTheDocument();
  });

  it('should clamp display to 999 via data-digit attributes when value exceeds max', () => {
    const { container } = render(<DigitDisplay value={1500} />);
    // sr-only exposes raw value; visual cells use clamped value via data-digit
    expect(screen.getByText('1500')).toBeInTheDocument(); // sr-only
    const cells = container.querySelectorAll('[data-digit]');
    const digits = Array.from(cells).map((el) => el.getAttribute('data-digit'));
    expect(digits).toEqual(['9', '9', '9']);
  });

  it('should apply glow-pulse-gold class when glowLevel is 1 (TC-179)', () => {
    const { container } = render(<DigitDisplay value={42} glowLevel={1} />);
    const borderWrapper = container.querySelector('.border-familiada-gold');
    expect(borderWrapper).toHaveClass('glow-pulse-gold');
    expect(borderWrapper).not.toHaveClass('glow-pulse-milestone');
  });

  it('should apply glow-pulse-milestone class when glowLevel is 2 (TC-180)', () => {
    const { container } = render(<DigitDisplay value={42} glowLevel={2} />);
    const borderWrapper = container.querySelector('.border-familiada-gold');
    expect(borderWrapper).toHaveClass('glow-pulse-milestone');
    expect(borderWrapper).not.toHaveClass('glow-pulse-gold');
  });

  it('should pad with zeros when padWithZeros is true (TC-181)', () => {
    const { container } = render(<DigitDisplay value={5} padWithZeros />);
    const cells = container.querySelectorAll('[data-digit]');
    const digits = Array.from(cells).map((el) => el.getAttribute('data-digit'));
    expect(digits).toEqual(['0', '0', '5']);
  });

  it('should render 0 as sr-only when value is 0', () => {
    render(<DigitDisplay value={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should have gold outer border and black inner border (US-027)', () => {
    const { container } = render(<DigitDisplay value={7} />);

    const outerBorder = container.querySelector('.border-familiada-gold');
    const innerBorder = container.querySelector('.border-black');
    expect(outerBorder).toBeInTheDocument();
    expect(innerBorder).toBeInTheDocument();
    // Gold must be the outermost border — its parent should not be another border element
    expect(outerBorder!.parentElement).not.toHaveClass('border-familiada-gold');
  });
});
