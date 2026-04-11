import { useState } from 'react';

import { QuestionBankEntry } from '@/types/game';

interface AnswerDraft {
  text: string;
  points: string;
}

interface Props {
  initialQuestion?: QuestionBankEntry;
  /** Default flags when creating a new question (ignored when initialQuestion is provided) */
  defaultIsMain?: boolean;
  defaultIsFinal?: boolean;
  onSave: (question: QuestionBankEntry) => void;
  onCancel: () => void;
}

const MAX_ANSWERS = 8;
const MIN_ANSWERS = 2;

function buildInitialAnswers(question?: QuestionBankEntry): AnswerDraft[] {
  if (question) {
    return question.answers.map((a) => ({ text: a.text, points: String(a.points) }));
  }
  return [
    { text: '', points: '' },
    { text: '', points: '' },
  ];
}

interface ValidationErrors {
  questionText?: string;
  usageFlags?: string;
  answers: (string | undefined)[];
  points: (string | undefined)[];
}

function validate(
  questionText: string,
  answers: AnswerDraft[],
  isMain: boolean,
  isFinal: boolean,
): ValidationErrors | null {
  const errors: ValidationErrors = { answers: [], points: [] };
  let hasError = false;

  if (!questionText.trim()) {
    errors.questionText = 'Treść pytania jest wymagana';
    hasError = true;
  }

  if (!isMain && !isFinal) {
    errors.usageFlags = 'Pytanie musi należeć do co najmniej jednej puli';
    hasError = true;
  }

  const filledAnswers = answers.filter((a) => a.text.trim());
  if (filledAnswers.length < MIN_ANSWERS) {
    errors.answers[0] = `Wymagane co najmniej ${MIN_ANSWERS} odpowiedzi`;
    hasError = true;
  }

  answers.forEach((answer, i) => {
    if (!answer.text.trim()) {
      errors.answers[i] = 'Treść odpowiedzi jest wymagana';
      hasError = true;
    }
    const pts = parseInt(answer.points, 10);
    if (!answer.points.trim() || isNaN(pts) || pts <= 0 || String(pts) !== answer.points.trim()) {
      errors.points[i] = 'Punkty muszą być liczbą całkowitą większą od 0';
      hasError = true;
    }
  });

  return hasError ? errors : null;
}

export function QuestionEditorForm({
  initialQuestion,
  defaultIsMain = true,
  defaultIsFinal = false,
  onSave,
  onCancel,
}: Props) {
  const [questionText, setQuestionText] = useState(initialQuestion?.question ?? '');
  const [answers, setAnswers] = useState<AnswerDraft[]>(buildInitialAnswers(initialQuestion));
  const [isMain, setIsMain] = useState(initialQuestion?.isMainQuestion ?? defaultIsMain);
  const [isFinal, setIsFinal] = useState(initialQuestion?.isFinalQuestion ?? defaultIsFinal);
  const [errors, setErrors] = useState<ValidationErrors | null>(null);

  function handleAnswerChange(index: number, field: keyof AnswerDraft, value: string) {
    setAnswers((prev) => prev.map((a, i) => (i === index ? { ...a, [field]: value } : a)));
  }

  function handleAddAnswer() {
    if (answers.length < MAX_ANSWERS) {
      setAnswers((prev) => [...prev, { text: '', points: '' }]);
    }
  }

  function handleRemoveAnswer(index: number) {
    setAnswers((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSave() {
    const validationErrors = validate(questionText, answers, isMain, isFinal);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    onSave({
      question: questionText.trim(),
      answers: answers.map((a) => ({ text: a.text.trim(), points: parseInt(a.points, 10) })),
      category: initialQuestion?.category,
      isMainQuestion: isMain || undefined,
      isFinalQuestion: isFinal || undefined,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-familiada-text-secondary text-sm font-bold uppercase mb-1">
          Treść pytania
        </label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Wpisz treść pytania..."
          className="w-full bg-familiada-bg-dark border-2 border-familiada-border rounded-lg px-4 py-2 text-familiada-text-primary focus:border-familiada-gold focus:outline-none"
        />
        {errors?.questionText && (
          <p className="text-familiada-red text-sm mt-1">{errors.questionText}</p>
        )}
      </div>

      <div>
        <label className="block text-familiada-text-secondary text-sm font-bold uppercase mb-2">
          Pula pytań
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isMain}
              onChange={(e) => setIsMain(e.target.checked)}
              className="accent-familiada-gold w-4 h-4"
            />
            <span className="text-familiada-text-primary text-sm">Pytania główne</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFinal}
              onChange={(e) => setIsFinal(e.target.checked)}
              className="accent-familiada-gold w-4 h-4"
            />
            <span className="text-familiada-text-primary text-sm">Pytania finałowe</span>
          </label>
        </div>
        {errors?.usageFlags && (
          <p className="text-familiada-red text-sm mt-1">{errors.usageFlags}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-familiada-text-secondary text-sm font-bold uppercase">
            Odpowiedzi ({answers.length}/{MAX_ANSWERS})
          </label>
          {answers.length < MAX_ANSWERS && (
            <button onClick={handleAddAnswer} className="operator-btn text-sm px-3 py-1">
              + Dodaj odpowiedź
            </button>
          )}
        </div>
        {errors?.answers[0] && !errors.answers.slice(1).some(Boolean) && (
          <p className="text-familiada-red text-sm mb-2">{errors.answers[0]}</p>
        )}
        <div className="space-y-2">
          {answers.map((answer, i) => (
            <div key={i} className="flex gap-2 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) => handleAnswerChange(i, 'text', e.target.value)}
                  placeholder={`Odpowiedź ${i + 1}`}
                  className="w-full bg-familiada-bg-dark border-2 border-familiada-border rounded-lg px-3 py-2 text-familiada-text-primary focus:border-familiada-gold focus:outline-none"
                />
                {errors?.answers[i] && (
                  <p className="text-familiada-red text-xs mt-0.5">{errors.answers[i]}</p>
                )}
              </div>
              <div className="w-24">
                <input
                  type="number"
                  min={1}
                  value={answer.points}
                  onChange={(e) => handleAnswerChange(i, 'points', e.target.value)}
                  placeholder="Pkt"
                  className="w-full bg-familiada-bg-dark border-2 border-familiada-border rounded-lg px-3 py-2 text-familiada-text-primary focus:border-familiada-gold focus:outline-none"
                />
                {errors?.points[i] && (
                  <p className="text-familiada-red text-xs mt-0.5">{errors.points[i]}</p>
                )}
              </div>
              {answers.length > MIN_ANSWERS && (
                <button
                  onClick={() => handleRemoveAnswer(i)}
                  className="mt-1 text-familiada-red hover:opacity-70 px-2 py-1 text-lg leading-none"
                  aria-label="Usuń odpowiedź"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={handleSave} className="operator-btn-primary flex-1">
          Zapisz
        </button>
        <button onClick={onCancel} className="operator-btn flex-1">
          Anuluj
        </button>
      </div>
    </div>
  );
}
