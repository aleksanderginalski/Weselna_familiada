import { useEffect, useState } from 'react';

import { useGameStore } from '@/store/gameStore';
import { QuestionBankEntry, QuestionBankFile } from '@/types/game';
import { loadQuestionBank } from '@/utils/questionBankStorage';

import { QuestionEditorForm } from './QuestionEditorForm';
import { QuestionEditorList, QuestionListItem } from './QuestionEditorList';

type ActiveTab = 'main' | 'final';

// null = list view, -1 = add new, >= 0 = edit existing at that globalIndex
type EditingIndex = number | null;

const FINAL_QUESTION_REQUIRED = 5;

export function QuestionEditorScreen() {
  const questionBank = useGameStore((state) => state.questionBank);
  const updateQuestionBank = useGameStore((state) => state.updateQuestionBank);
  const backToLobbyFromEditor = useGameStore((state) => state.backToLobbyFromEditor);

  const [activeTab, setActiveTab] = useState<ActiveTab>('main');
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

  // Both tabs show the full pool — flags are informational badges, not filters
  const allItems: QuestionListItem[] = questionBank.map((entry, globalIndex) => ({
    entry,
    globalIndex,
  }));

  // Counts used only in tab labels
  const mainTaggedCount = questionBank.filter((q) => q.isMainQuestion !== false).length;
  const finalTaggedCount = questionBank.filter((q) => q.isFinalQuestion === true).length;
  const hasFinalWarning = activeTab === 'final' && questionBank.length < FINAL_QUESTION_REQUIRED;

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
              defaultIsMain={activeTab === 'main'}
              defaultIsFinal={activeTab === 'final'}
              onSave={handleSave}
              onCancel={() => setEditingIndex(null)}
            />
          ) : (
            <>
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('main')}
                  className={`px-5 py-2 rounded-lg font-bold text-sm transition-colors ${
                    activeTab === 'main'
                      ? 'bg-familiada-gold text-familiada-bg-dark'
                      : 'bg-familiada-bg-panel text-familiada-text-secondary border border-familiada-border hover:border-familiada-gold'
                  }`}
                >
                  Pytania główne
                  <span className="ml-2 opacity-70">({mainTaggedCount} otagowanych)</span>
                </button>
                <button
                  onClick={() => setActiveTab('final')}
                  className={`px-5 py-2 rounded-lg font-bold text-sm transition-colors ${
                    activeTab === 'final'
                      ? 'bg-familiada-gold text-familiada-bg-dark'
                      : 'bg-familiada-bg-panel text-familiada-text-secondary border border-familiada-border hover:border-familiada-gold'
                  }`}
                >
                  Pytania finałowe
                  <span className={`ml-2 ${finalTaggedCount < FINAL_QUESTION_REQUIRED ? 'text-familiada-red font-bold' : 'opacity-70'}`}>
                    ({finalTaggedCount} otagowanych)
                  </span>
                </button>
              </div>

              {/* Warning: not enough questions total for a final round */}
              {hasFinalWarning && (
                <div className="mb-4 bg-familiada-bg-panel border border-familiada-red rounded-lg px-4 py-3">
                  <p className="text-familiada-red text-sm font-bold">
                    ⚠ Runda finałowa wymaga co najmniej {FINAL_QUESTION_REQUIRED} pytań w banku — masz {questionBank.length}.
                    Dodaj jeszcze {FINAL_QUESTION_REQUIRED - questionBank.length}.
                  </p>
                </div>
              )}

              <QuestionEditorList
                items={allItems}
                activeTab={activeTab}
                emptyMessage="Kliknij &quot;Dodaj pytanie&quot; aby dodać pierwsze pytanie."
                onEdit={(globalIndex) => setEditingIndex(globalIndex)}
                onDelete={handleDelete}
                onAddNew={() => setEditingIndex(-1)}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
