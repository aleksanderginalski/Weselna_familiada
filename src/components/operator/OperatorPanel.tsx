import { useGameStore } from '@/store/gameStore';
import { useSound } from '@/hooks/useSound';
import { AnswerControl } from './AnswerControl';
import { RoundControls } from './RoundControls';
import { TeamControl } from './TeamControl';
import { VolumeSlider } from './VolumeSlider';

export function OperatorPanel() {
  const rounds = useGameStore((state) => state.rounds);
  const currentRoundIndex = useGameStore((state) => state.currentRoundIndex);
  const { isMuted, toggleMute, playIntro, volume, setVolume } = useSound();

  function handleOpenBoard() {
    // Build board URL relative to the current page so it works with both
    // the Vite dev server (http://) and Electron file:// protocol in production.
    const base = window.location.href.split('?')[0];
    window.open(`${base}?view=board`, '_blank');
    playIntro();
  }

  const currentQuestion = rounds[currentRoundIndex]?.question;

  return (
    <div className="min-h-screen bg-familiada-bg-dark flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-familiada-bg-panel border-b-2 border-familiada-border">
        <h1 className="font-heading text-xl text-familiada-gold text-glow-gold tracking-wide">
          WESELNA FAMILIADA — Panel Operatora
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="operator-btn bg-familiada-bg-dark text-familiada-text-secondary border border-familiada-border hover:border-familiada-gold hover:text-familiada-gold"
          >
            {isMuted ? 'Włącz dźwięk' : 'Wycisz'}
          </button>
          <VolumeSlider volume={volume} onChange={setVolume} />
          <button
            onClick={handleOpenBoard}
            className="operator-btn bg-familiada-gold text-familiada-bg-dark hover:bg-yellow-400 font-bold"
          >
            Otwórz Tablicę
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col gap-4 px-6 py-4 max-w-4xl w-full mx-auto">
        {/* Current question */}
        {currentQuestion && (
          <div className="bg-familiada-bg-panel border-2 border-familiada-border rounded-lg px-4 py-3">
            <span className="text-familiada-text-secondary text-xs uppercase tracking-wide font-bold">
              Pytanie
            </span>
            <p className="text-familiada-text-primary font-body text-lg mt-1">
              {currentQuestion}
            </p>
          </div>
        )}

        <RoundControls />
        <AnswerControl />
        <TeamControl />
      </main>
    </div>
  );
}
