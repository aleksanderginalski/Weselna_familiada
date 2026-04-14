import { useEffect, useState } from 'react';

import { useGameStore } from '@/store/gameStore';
import { GameDataFile, QuestionBankFile } from '@/types/game';

type GameMode = 'fixed' | 'score';

interface LobbyFormState {
  leftName: string;
  rightName: string;
  mode: GameMode;
  winningScore: number;
}

const DEFAULT_FORM: LobbyFormState = {
  leftName: 'Drużyna Pana Młodego',
  rightName: 'Drużyna Panny Młodej',
  mode: 'fixed',
  winningScore: 300,
};

export function LobbyScreen() {
  const loadGame = useGameStore((state) => state.loadGame);
  const loadBank = useGameStore((state) => state.loadBank);
  const goToQuestionEditor = useGameStore((state) => state.goToQuestionEditor);

  const [gameData, setGameData] = useState<GameDataFile | null>(null);
  const [bankData, setBankData] = useState<QuestionBankFile | null>(null);
  const [form, setForm] = useState<LobbyFormState>(DEFAULT_FORM);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('./pytania.json').then((res) => res.json() as Promise<GameDataFile>),
      fetch('./pytania-bank.json').then((res) => res.json() as Promise<QuestionBankFile>),
    ])
      .then(([configData, fetchedBankData]) => {
        setGameData(configData);
        setBankData(fetchedBankData);
        setForm({
          leftName: configData.config.teams.left.name,
          rightName: configData.config.teams.right.name,
          mode: configData.config.mode,
          winningScore: configData.config.winningScore ?? DEFAULT_FORM.winningScore,
        });
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  function handleStartGame() {
    if (!gameData || !bankData) return;

    const data: GameDataFile = {
      config: {
        ...gameData.config,
        mode: form.mode,
        teams: {
          left: { name: form.leftName },
          right: { name: form.rightName },
        },
        numberOfRounds: undefined,
        winningScore: form.mode === 'score' ? form.winningScore : undefined,
      },
    };

    loadGame(data);
    // loadBank sets status to 'selectingQuestions', routing App to QuestionSelectionScreen
    loadBank(bankData);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-familiada-bg-dark">
        <p className="text-familiada-text-secondary text-xl">Ładowanie...</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-familiada-bg-dark">
        <p className="text-familiada-red text-xl">Błąd ładowania pytań. Sprawdź plik pytania.json.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-familiada-bg-dark flex items-center justify-center p-8">
      <div className="bg-familiada-bg-panel border-2 border-familiada-border rounded-xl p-8 w-full max-w-lg">
        <h1 className="font-heading text-3xl text-familiada-gold text-center mb-8 text-glow-gold">
          WESELNA FAMILIADA
        </h1>

        <section className="mb-6">
          <h2 className="text-familiada-text-secondary text-sm font-bold uppercase mb-3">
            Nazwy drużyn
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-familiada-text-secondary text-sm mb-1">
                Drużyna lewa
              </label>
              <input
                type="text"
                value={form.leftName}
                onChange={(e) => setForm({ ...form, leftName: e.target.value })}
                className="w-full bg-familiada-bg-dark border-2 border-familiada-border rounded-lg px-4 py-2 text-familiada-text-primary focus:border-familiada-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-familiada-text-secondary text-sm mb-1">
                Drużyna prawa
              </label>
              <input
                type="text"
                value={form.rightName}
                onChange={(e) => setForm({ ...form, rightName: e.target.value })}
                className="w-full bg-familiada-bg-dark border-2 border-familiada-border rounded-lg px-4 py-2 text-familiada-text-primary focus:border-familiada-gold focus:outline-none"
              />
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-familiada-text-secondary text-sm font-bold uppercase mb-3">
            Tryb gry
          </h2>
          <div className="space-y-2 mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="gameMode"
                value="fixed"
                checked={form.mode === 'fixed'}
                onChange={() => setForm({ ...form, mode: 'fixed' })}
                className="accent-familiada-gold w-4 h-4"
              />
              <span className="text-familiada-text-primary">Stała liczba rund</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="gameMode"
                value="score"
                checked={form.mode === 'score'}
                onChange={() => setForm({ ...form, mode: 'score' })}
                className="accent-familiada-gold w-4 h-4"
              />
              <span className="text-familiada-text-primary">Do progu punktów</span>
            </label>
          </div>

          {form.mode === 'score' && (
            <div>
              <label className="block text-familiada-text-secondary text-sm mb-1">
                Próg punktów do wygranej
              </label>
              <input
                type="number"
                min={1}
                value={form.winningScore}
                onChange={(e) =>
                  setForm({ ...form, winningScore: Math.max(1, parseInt(e.target.value) || 1) })
                }
                className="w-full bg-familiada-bg-dark border-2 border-familiada-border rounded-lg px-4 py-2 text-familiada-text-primary focus:border-familiada-gold focus:outline-none"
              />
            </div>
          )}
        </section>

        <button
          onClick={handleStartGame}
          disabled={!form.leftName.trim() || !form.rightName.trim()}
          className="operator-btn-primary w-full text-xl"
        >
          DALEJ
        </button>

        <button
          onClick={goToQuestionEditor}
          className="operator-btn w-full mt-3"
        >
          Zarządzaj pytaniami
        </button>
      </div>
    </div>
  );
}
