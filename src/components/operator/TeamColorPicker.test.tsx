import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-colorful', () => ({
  HexColorPicker: ({ color, onChange }: { color: string; onChange: (c: string) => void }) => (
    <input
      data-testid="hex-picker"
      value={color}
      onChange={(e) => onChange(e.target.value)}
      readOnly={false}
    />
  ),
}));

import { TeamColorPicker } from './TeamColorPicker';

describe('TeamColorPicker', () => {
  it('should render swatch with correct background color and label (TC-289)', () => {
    render(<TeamColorPicker color="#cc1100" label="Lewa drużyna" onChange={vi.fn()} />);

    expect(screen.getByText('Lewa drużyna')).toBeInTheDocument();
    const swatch = screen.getByRole('button');
    expect(swatch.style.backgroundColor).toBeTruthy();
  });

  it('should open color picker popover on swatch click and close on second click (TC-290)', () => {
    render(<TeamColorPicker color="#cc1100" label="Kolor tła" onChange={vi.fn()} />);

    const swatch = screen.getByRole('button');

    fireEvent.click(swatch);
    expect(screen.getByTestId('hex-picker')).toBeInTheDocument();

    fireEvent.click(swatch);
    expect(screen.queryByTestId('hex-picker')).not.toBeInTheDocument();
  });

  it('should call onChange when color picker value changes (TC-291)', () => {
    const onChange = vi.fn();
    render(<TeamColorPicker color="#cc1100" label="Kolor tła" onChange={onChange} />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.change(screen.getByTestId('hex-picker'), { target: { value: '#ff0000' } });

    expect(onChange).toHaveBeenCalledWith('#ff0000');
  });
});
