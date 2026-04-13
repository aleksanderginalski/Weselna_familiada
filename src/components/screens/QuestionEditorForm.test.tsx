import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { QuestionEditorForm } from './QuestionEditorForm';

const INITIAL_QUESTION = {
  question: 'Istniejące pytanie?',
  answers: [
    { text: 'Odpowiedź A', points: 30 },
    { text: 'Odpowiedź B', points: 20 },
  ],
};

describe('QuestionEditorForm', () => {
  // TC-153
  it('should render empty form for new question', () => {
    render(<QuestionEditorForm onSave={vi.fn()} onCancel={vi.fn()} />);

    expect(screen.getByPlaceholderText('Wpisz treść pytania...')).toHaveValue('');
    // Two empty answer rows by default
    expect(screen.getAllByPlaceholderText(/Odpowiedź \d/)).toHaveLength(2);
  });

  it('should pre-fill all fields when editing an existing question', () => {
    render(
      <QuestionEditorForm
        initialQuestion={INITIAL_QUESTION}
        onSave={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByPlaceholderText('Wpisz treść pytania...')).toHaveValue('Istniejące pytanie?');
    expect(screen.getByDisplayValue('Odpowiedź A')).toBeInTheDocument();
    expect(screen.getByDisplayValue('30')).toBeInTheDocument();
  });

  // TC-154
  it('should call onSave with trimmed data when form is valid', async () => {
    const onSave = vi.fn();
    render(<QuestionEditorForm onSave={onSave} onCancel={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText('Wpisz treść pytania...'), 'Nowe pytanie?');

    const answerInputs = screen.getAllByPlaceholderText(/Odpowiedź \d/);
    const pointInputs = screen.getAllByPlaceholderText('Pkt');

    await userEvent.type(answerInputs[0], 'Tak');
    await userEvent.type(pointInputs[0], '10');
    await userEvent.type(answerInputs[1], 'Nie');
    await userEvent.type(pointInputs[1], '5');

    await userEvent.click(screen.getByRole('button', { name: 'Zapisz' }));

    expect(onSave).toHaveBeenCalledWith({
      question: 'Nowe pytanie?',
      answers: [
        { text: 'Tak', points: 10 },
        { text: 'Nie', points: 5 },
      ],
      category: undefined,
    });
  });

  // TC-155
  it('should show validation errors for empty question, empty answer text, and invalid points', async () => {
    render(<QuestionEditorForm onSave={vi.fn()} onCancel={vi.fn()} />);

    await userEvent.click(screen.getByRole('button', { name: 'Zapisz' }));

    expect(screen.getByText('Treść pytania jest wymagana')).toBeInTheDocument();
    expect(screen.getAllByText('Treść odpowiedzi jest wymagana').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Punkty muszą być liczbą całkowitą większą od 0').length).toBeGreaterThan(0);
  });

  it('should call onCancel when cancel button is clicked', async () => {
    const onCancel = vi.fn();
    render(<QuestionEditorForm onSave={vi.fn()} onCancel={onCancel} />);

    await userEvent.click(screen.getByRole('button', { name: 'Anuluj' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should add answer row up to max and remove row above min', async () => {
    render(<QuestionEditorForm onSave={vi.fn()} onCancel={vi.fn()} />);

    // Initially 2 answers — remove button should not be visible (at min)
    expect(screen.queryByRole('button', { name: 'Usuń odpowiedź' })).not.toBeInTheDocument();

    // Add a third answer
    await userEvent.click(screen.getByRole('button', { name: '+ Dodaj odpowiedź' }));
    expect(screen.getAllByPlaceholderText(/Odpowiedź \d/)).toHaveLength(3);

    // Now remove button should appear
    const removeBtn = screen.getAllByRole('button', { name: 'Usuń odpowiedź' });
    await userEvent.click(removeBtn[0]);
    expect(screen.getAllByPlaceholderText(/Odpowiedź \d/)).toHaveLength(2);
  });
});
