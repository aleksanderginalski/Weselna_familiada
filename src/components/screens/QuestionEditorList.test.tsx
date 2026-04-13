import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { QuestionEditorList } from './QuestionEditorList';

const MOCK_QUESTIONS = [
  { question: 'Pytanie 1?', answers: [{ text: 'A', points: 10 }] },
  { question: 'Pytanie 2?', answers: [{ text: 'B', points: 20 }, { text: 'C', points: 5 }] },
];

describe('QuestionEditorList', () => {
  // TC-151
  it('should render question list with count and empty state when no questions', () => {
    render(
      <QuestionEditorList questions={[]} onEdit={vi.fn()} onDelete={vi.fn()} onAddNew={vi.fn()} />,
    );

    expect(screen.getByText('Brak pytań w banku')).toBeInTheDocument();
    expect(screen.getByText('Brak pytań.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+ Dodaj pytanie' })).toBeInTheDocument();
  });

  it('should render all questions with correct answer count', () => {
    render(
      <QuestionEditorList
        questions={MOCK_QUESTIONS}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onAddNew={vi.fn()}
      />,
    );

    expect(screen.getByText('2 pytań w banku')).toBeInTheDocument();
    expect(screen.getByText('Pytanie 1?')).toBeInTheDocument();
    expect(screen.getByText('Pytanie 2?')).toBeInTheDocument();
  });

  // TC-152
  it('should call onEdit, onDelete, and onAddNew with correct indices', async () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onAddNew = vi.fn();

    render(
      <QuestionEditorList
        questions={MOCK_QUESTIONS}
        onEdit={onEdit}
        onDelete={onDelete}
        onAddNew={onAddNew}
      />,
    );

    const editButtons = screen.getAllByRole('button', { name: 'Edytuj' });
    const deleteButtons = screen.getAllByRole('button', { name: 'Usuń' });

    await userEvent.click(editButtons[1]);
    expect(onEdit).toHaveBeenCalledWith(1);

    await userEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith(0);

    await userEvent.click(screen.getByRole('button', { name: '+ Dodaj pytanie' }));
    expect(onAddNew).toHaveBeenCalledTimes(1);
  });
});
