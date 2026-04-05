import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeamState } from '@/types/game';
import { TeamPanel } from './TeamPanel';

const TEAM: TeamState = { name: 'Team A', totalScore: 100 };

describe('TeamPanel', () => {
  it('should display team name, score, mistake slots, and status when guessing with 2 mistakes', () => {
    const { container } = render(
      <TeamPanel
        team={TEAM}
        side="left"
        teamStatus="guessing"
        mistakes={2}
        maxMistakes={3}
        onSelect={() => {}}
      />,
    );

    expect(screen.getByText('Team A')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Kolejny błąd = przejęcie')).toBeInTheDocument();
    expect(container.querySelectorAll('.mistake-x.active')).toHaveLength(2);
    expect(container.querySelectorAll('.mistake-x.empty')).toHaveLength(1);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('should show correct status text for each teamStatus variant', () => {
    const { rerender } = render(
      <TeamPanel team={TEAM} side="left" teamStatus="waiting" mistakes={0} maxMistakes={3} onSelect={() => {}} />,
    );
    expect(screen.getByText('Czeka')).toBeInTheDocument();

    rerender(
      <TeamPanel team={TEAM} side="left" teamStatus="stealing" mistakes={0} maxMistakes={1} onSelect={() => {}} />,
    );
    expect(screen.getByText('Przejęcie — jedna szansa')).toBeInTheDocument();

    rerender(
      <TeamPanel team={TEAM} side="left" teamStatus="stealing" mistakes={1} maxMistakes={1} onSelect={() => {}} />,
    );
    expect(screen.getByText('Błąd! Runda skończona')).toBeInTheDocument();

    rerender(
      <TeamPanel team={TEAM} side="left" teamStatus="grayed" mistakes={3} maxMistakes={3} onSelect={() => {}} />,
    );
    expect(screen.getByText('Przejęcie przez przeciwnika')).toBeInTheDocument();
  });

  it('should call onSelect when radio is clicked', async () => {
    const handleSelect = vi.fn();
    render(
      <TeamPanel team={TEAM} side="left" teamStatus="waiting" mistakes={0} maxMistakes={3} onSelect={handleSelect} />,
    );

    await userEvent.click(screen.getByRole('radio'));
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it('should disable radio when isSelectDisabled is true', () => {
    render(
      <TeamPanel
        team={TEAM}
        side="left"
        teamStatus="waiting"
        mistakes={0}
        maxMistakes={3}
        onSelect={() => {}}
        isSelectDisabled={true}
      />,
    );

    expect(screen.getByRole('radio')).toBeDisabled();
  });
});
