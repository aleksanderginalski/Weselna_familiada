import { FinalRoundGameBoard } from '@/components/board/FinalRoundGameBoard';
import { GameBoard } from '@/components/board/GameBoard';
import { FinalRoundOperator } from '@/components/operator/FinalRoundOperator';
import { OperatorPanel } from '@/components/operator/OperatorPanel';
import { LobbyScreen } from '@/components/screens/LobbyScreen';
import { WinnerScreen } from '@/components/screens/WinnerScreen';
import { useBroadcast } from '@/hooks/useBroadcast';
import { useGameStore } from '@/store/gameStore';

const isBoard = new URLSearchParams(window.location.search).get('view') === 'board';

export function App() {
  useBroadcast();
  const status = useGameStore((state) => state.status);
  const showingWinner = useGameStore((state) => state.showingWinner);

  if (isBoard) {
    if (status === 'finalRound') return <FinalRoundGameBoard />;
    if (showingWinner) return <WinnerScreen />;
    return <GameBoard />;
  }

  if (status === 'lobby') return <LobbyScreen />;
  if (status === 'finalRound') return <FinalRoundOperator />;
  if (showingWinner) return <WinnerScreen />;

  return <OperatorPanel />;
}
