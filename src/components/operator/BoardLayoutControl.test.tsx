import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { useGameStore } from '@/store/gameStore';
import { BoardLayoutControl } from './BoardLayoutControl';

beforeEach(() => {
  useGameStore.getState().resetGame();
});

describe('BoardLayoutControl', () => {
  it('should render slider with current ratio value and percentage label (TC-169)', () => {
    useGameStore.setState({ ...useGameStore.getState(), boardLayout: { teamPanelRatio: 20 } });
    render(<BoardLayoutControl />);

    const slider = screen.getByRole('slider', { name: 'Wielkość paneli drużyn' });
    expect(slider).toHaveValue('20');
    expect(screen.getByText('20%')).toBeInTheDocument();
  });

  it('should update store when slider changes (TC-170)', async () => {
    render(<BoardLayoutControl />);

    const slider = screen.getByRole('slider', { name: 'Wielkość paneli drużyn' });
    await userEvent.type(slider, '{arrowright}');

    expect(useGameStore.getState().boardLayout.teamPanelRatio).toBeGreaterThan(15);
  });
});
