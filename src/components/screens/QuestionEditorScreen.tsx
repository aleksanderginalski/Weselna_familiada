import { useEffect, useState } from 'react';

import { useGameStore } from '@/store/gameStore';
import { QuestionBankEntry, QuestionBankFile } from '@/types/game';
import { loadQuestionBank } from '@/utils/questionBankStorage';

import { QuestionEditorForm } from './QuestionEditorForm';
import { QuestionEditorList } from './QuestionEditorList';

// null = list view, -1 = add new, >= 0 = edit existing at that globalIndex
type EditingIndex = number | null;

export function QuestionEditorScreen() {
  const questionBank = useGameStore((state) => state.questionBank);
  const updateQuestionBank = useGameStore((state) => state.updateQuestionBank);
  const backToLobbyFromEditor = useGameStore((state) => state.backToLobbyFromEditor);

  const [editingIndex, setEditingIndex] = useState<EditingIndex>(null);

  // Load the bank if it wasn't populated yet (editor opened before clicking DALEJ)
  useEffect(() => {
    if (questionBank.length > 0) return;
    const stored = loadQuestionBank();
    if (stored) {
      updateQuestionBank(stored);
      return;
    }
    fetch('/pytania-bank.json')
      .then((res) => res.json() as Promise<QuestionBankFile>)
      .then((data) => updateQuestionBank(data.questions ?? []))
      .catch(() => {});
  }, [questionBank.length, updateQuestionBank]);

  function handleSave(question: QuestionBankEntry) {
    if (editingIndex === -1) {
      updateQuestionBank([...questionBank, question]);
    } else if (editingIndex !== null && editingIndex >= 0) {
      const updated = questionBank.map((q, i) => (i === editingIndex ? question : q));
      updateQuestionBank(updated);
    }
    setEditingIndex(null);
  }

  function handleDelete(globalIndex: number) {
    updateQuestionBank(questionBank.filter((_, i) => i !== globalIndex));
  }

  const isEditing = editingIndex !== null;
  const formTitle = editingIndex === -1 ? 'Nowe pytanie' : 'Edytuj pytanie';

  return (
    <div className="min-h-screen bg-familiada-bg-dark flex flex-col">
      <header className="bg-familiada-bg-panel border-b-2 border-familiada-border px-6 py-4 flex items-center justify-between">
        <h1 className="font-heading text-2xl text-familiada-gold text-glow-gold">
          {isEditing ? formTitle : 'Edytor pytań'}
        </h1>
        <button onClick={backToLobbyFromEditor} className="operator-btn px-4 py-2">
          ← Powrót do Lobby
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          {isEditing ? (
            <QuestionEditorForm
              initialQuestion={editingIndex >= 0 ? questionBank[editingIndex] : undefined}
              onSave={handleSave}
              onCancel={() => setEditingIndex(null)}
            />
          ) : (
            <QuestionEditorList
              questions={questionBank}
              onEdit={(globalIndex) => setEditingIndex(globalIndex)}
              onDelete={handleDelete}
              onAddNew={() => setEditingIndex(-1)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
