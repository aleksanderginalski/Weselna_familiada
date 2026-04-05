import { GameBoard } from '@/components/board/GameBoard';
import { OperatorPanel } from '@/components/operator/OperatorPanel';
import { LobbyScreen } from '@/components/screens/LobbyScreen';
import { useBroadcast } from '@/hooks/useBroadcast';
import { useGameStore } from '@/store/gameStore';

const isBoard = new URLSearchParams(window.location.search).get('view') === 'board';

export function App() {
  useBroadcast();
  const status = useGameStore((state) => state.status);

  if (isBoard) {
    return <GameBoard />;
  }

  if (status === 'lobby') {
    return <LobbyScreen />;
  }

  return <OperatorPanel />;
}
