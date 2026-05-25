import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { QuestionBankEntry } from '@/types/game';
import { TagFilterPanel } from './TagFilterPanel';

function bank(...tagSets: string[][]): QuestionBankEntry[] {
  return tagSets.map((tags) => ({ question: 'Q?', answers: [{ text: 'A', points: 10 }], tags }));
}

describe('TagFilterPanel', () => {
  // TC-178
  it('should return null when bank has no tags and nothing is selected', () => {
    const { container } = render(
      <TagFilterPanel bank={bank([])} selectedTags={[]} onSelect={vi.fn()} onDeselect={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  // TC-179
  it('should render selected chips and available tag buttons', () => {
    render(
      <TagFilterPanel
        bank={bank(['sport', 'muzyka'], ['sport'])}
        selectedTags={['sport']}
        onSelect={vi.fn()}
        onDeselect={vi.fn()}
      />,
    );
    expect(screen.getByText('sport')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'muzyka' })).toBeInTheDocument();
  });

  // TC-180
  it('should call onDeselect when chip remove button is clicked', async () => {
    const onDeselect = vi.fn();
    render(
      <TagFilterPanel
        bank={bank(['sport'])}
        selectedTags={['sport']}
        onSelect={vi.fn()}
        onDeselect={onDeselect}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Usuń filtr sport' }));
    expect(onDeselect).toHaveBeenCalledWith('sport');
  });

  // TC-181
  it('should call onSelect when available tag button is clicked', async () => {
    const onSelect = vi.fn();
    render(
      <TagFilterPanel
        bank={bank(['sport', 'muzyka'])}
        selectedTags={[]}
        onSelect={onSelect}
        onDeselect={vi.fn()}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'sport' }));
    expect(onSelect).toHaveBeenCalledWith('sport');
  });
});
