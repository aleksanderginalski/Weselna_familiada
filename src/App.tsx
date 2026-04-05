import { useEffect } from 'react';
import { GameBoard } from '@/components/board/GameBoard';
import { OperatorPanel } from '@/components/operator/OperatorPanel';
import { useBroadcast } from '@/hooks/useBroadcast';
import { useGameStore } from '@/store/gameStore';
import { GameDataFile } from '@/types/game';

const isBoard = new URLSearchParams(window.location.search).get('view') === 'board';

export function App() {
  useBroadcast();
  const loadGame = useGameStore((state) => state.loadGame);
  const startGame = useGameStore((state) => state.startGame);

  useEffect(() => {
    fetch('/pytania.json')
      .then((res) => res.json())
      .then((data: GameDataFile) => {
        loadGame(data);
        startGame();
      });
  }, [loadGame, startGame]);

  if (isBoard) {
    return <GameBoard />;
  }

  return <OperatorPanel />;
}
