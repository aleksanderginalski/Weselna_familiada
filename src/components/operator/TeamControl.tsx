import { useGameStore } from '@/store/gameStore';
import { useSound } from '@/hooks/useSound';
import { TeamSide } from '@/types/game';
import { TeamPanel, TeamStatus } from './TeamPanel';

const MAX_MISTAKES = 3;
const STEAL_SLOTS = 1;

function getOpposingTeam(side: TeamSide): TeamSide {
  return side === 'left' ? 'right' : 'left';
}

function getTeamStatus(side: TeamSide, controllingTeam: TeamSide | null, isStealPhase: boolean): TeamStatus {
  if (isStealPhase) {
    // Original guessing team grays out; opposing team gets steal chance
    return side === controllingTeam ? 'grayed' : 'stealing';
  }
  if (controllingTeam === side) return 'guessing';
  return 'waiting';
}

export function TeamControl() {
  const teams = useGameStore((state) => state.teams);
  const controllingTeam = useGameStore((state) => state.currentRound.controllingTeam);
  const mistakes = useGameStore((state) => state.currentRound.mistakes);
  const phase = useGameStore((state) => state.currentRound.phase);
  const stealFailed = useGameStore((state) => state.currentRound.stealFailed);
  const selectTeam = useGameStore((state) => state.selectTeam);
  const markMistake = useGameStore((state) => state.markMistake);
  const { playWrong } = useSound();

  const isStealPhase = phase === 'steal';
  // Radios locked during steal — selectTeam would reset phase to 'guessing'
  const isSelectDisabled = isStealPhase;

  const isMistakeDisabled =
    phase === 'showdown' || phase === 'summary' || (isStealPhase && stealFailed);

  // Status message below the BŁĄD button
  let mistakeAreaStatus: string;
  if (phase === 'showdown') {
    mistakeAreaStatus = 'Wybierz drużynę, która odpowiada';
  } else if (phase === 'summary') {
    mistakeAreaStatus = 'Runda zakończona';
  } else if (isStealPhase) {
    mistakeAreaStatus = stealFailed && controllingTeam
      ? `Punkty dla: ${teams[controllingTeam].name}! Zakończ rundę.`
      : 'Naciśnij BŁĄD jeśli drużyna przejmująca się pomyli';
  } else if (mistakes === 0) {
    mistakeAreaStatus = 'Naciśnij BŁĄD aby zaznaczyć pomyłkę';
  } else if (mistakes === 1) {
    mistakeAreaStatus = 'Kolejny błąd = 2 X';
  } else {
    mistakeAreaStatus = 'Kolejny błąd = przejęcie przez przeciwnika';
  }

  // Mistake display per team
  const getTeamMistakes = (side: TeamSide): number => {
    if (side === controllingTeam) return mistakes;
    // Steal slot: filled only when steal failed
    return isStealPhase && stealFailed ? STEAL_SLOTS : 0;
  };

  // Slot count per team: guessing = 3, opposing = 1 steal slot (after team selected)
  const getTeamMaxMistakes = (side: TeamSide): number => {
    if (!controllingTeam) return MAX_MISTAKES; // showdown: show 3 for both
    if (side === controllingTeam) return MAX_MISTAKES;
    return STEAL_SLOTS;
  };

  const stealingTeam = isStealPhase && controllingTeam ? getOpposingTeam(controllingTeam) : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Team panels */}
      <div className="grid grid-cols-2 gap-4">
        {(['left', 'right'] as TeamSide[]).map((side) => (
          <TeamPanel
            key={side}
            team={teams[side]}
            side={side}
            teamStatus={getTeamStatus(side, controllingTeam, isStealPhase)}
            mistakes={getTeamMistakes(side)}
            maxMistakes={getTeamMaxMistakes(side)}
            onSelect={() => selectTeam(side)}
            isSelectDisabled={isSelectDisabled}
          />
        ))}
      </div>

      {/* Mistake button section */}
      <div className="flex items-center gap-4 bg-familiada-bg-panel border-2 border-familiada-border rounded-lg px-4 py-3">
        <button
          onClick={() => { playWrong(); markMistake(); }}
          disabled={isMistakeDisabled}
          className={[
            'operator-btn shrink-0 font-bold text-lg',
            isMistakeDisabled
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-familiada-red text-white hover:bg-red-700',
          ].join(' ')}
        >
          BŁĄD
        </button>
        <span
          className={[
            'text-sm',
            stealFailed ? 'text-familiada-gold font-bold' : 'text-familiada-text-secondary',
          ].join(' ')}
        >
          {mistakeAreaStatus}
        </span>
      </div>

      {/* Steal phase reminder (visible only when steal is active and not yet resolved) */}
      {isStealPhase && !stealFailed && stealingTeam && (
        <div className="text-center text-familiada-gold text-sm font-bold bg-familiada-bg-panel border border-familiada-gold rounded-lg py-2 px-4">
          Drużyna {teams[stealingTeam].name} przejmuje — jedna odpowiedź
        </div>
      )}
    </div>
  );
}
