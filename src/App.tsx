import { GameBoard } from '@/components/board/GameBoard';
import { useBroadcast } from '@/hooks/useBroadcast';

const isBoard = new URLSearchParams(window.location.search).get('view') === 'board';

export function App() {
  useBroadcast();

  if (isBoard) {
    return <GameBoard />;
  }

  // Operator panel placeholder — will be replaced in US-015+
  return (
    <div className="min-h-screen bg-familiada-bg-dark flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="font-display text-5xl text-familiada-gold text-glow-gold">
        Weselna Familiada
      </h1>
      <p className="font-body text-familiada-text-secondary">Panel Operatora — wkrótce</p>
    </div>
  );
}
