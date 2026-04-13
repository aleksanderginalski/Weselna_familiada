import { beforeEach, describe, expect, it } from 'vitest';

import { loadQuestionBank, saveQuestionBank } from './questionBankStorage';

const STORAGE_KEY = 'familiada-question-bank';
const MOCK_QUESTIONS = [
  { question: 'Q1?', answers: [{ text: 'A', points: 10 }] },
  { question: 'Q2?', answers: [{ text: 'B', points: 20 }] },
];

beforeEach(() => {
  localStorage.clear();
});

describe('questionBankStorage', () => {
  // TC-146
  it('should persist and retrieve question bank from localStorage', () => {
    saveQuestionBank(MOCK_QUESTIONS);

    const result = loadQuestionBank();

    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();
    expect(result).toEqual(MOCK_QUESTIONS);
  });

  // TC-147
  it('should return null when nothing is stored', () => {
    expect(loadQuestionBank()).toBeNull();
  });

  // TC-148
  it('should return null for invalid JSON or non-array value', () => {
    localStorage.setItem(STORAGE_KEY, 'not-json{{{');
    expect(loadQuestionBank()).toBeNull();

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ not: 'an array' }));
    expect(loadQuestionBank()).toBeNull();
  });
});
