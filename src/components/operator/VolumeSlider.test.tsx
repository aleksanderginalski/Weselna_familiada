import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { VolumeSlider } from './VolumeSlider';

describe('VolumeSlider', () => {
  it('should render slider with current value and percentage label', () => {
    // TC-130
    render(<VolumeSlider volume={75} onChange={vi.fn()} />);

    expect(screen.getByRole('slider', { name: 'Głośność' })).toHaveValue('75');
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('should call onChange with numeric value when slider changes', () => {
    // TC-131
    const handleChange = vi.fn();
    render(<VolumeSlider volume={50} onChange={handleChange} />);

    fireEvent.change(screen.getByRole('slider', { name: 'Głośność' }), {
      target: { value: '30' },
    });

    expect(handleChange).toHaveBeenCalledWith(30);
  });
});
