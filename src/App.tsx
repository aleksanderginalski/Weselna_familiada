import { GameBoard } from '@/components/board/GameBoard';
import { AnswerControl } from '@/components/operator/AnswerControl';
import { useBroadcast } from '@/hooks/useBroadcast';

const isBoard = new URLSearchParams(window.location.search).get('view') === 'board';

export function App() {
  useBroadcast();

  if (isBoard) {
    return <GameBoard />;
  }

  // Operator panel placeholder — will be replaced in upcoming US
  return (
    <div className="min-h-screen bg-familiada-bg-dark flex flex-col items-center gap-8 p-8">
      <h1 className="font-display text-5xl text-familiada-gold text-glow-gold">
        Weselna Familiada
      </h1>
      <div className="w-full max-w-2xl">
        <AnswerControl />
      </div>
    </div>
  );
}
