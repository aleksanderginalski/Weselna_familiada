import { TeamSide, TeamState } from '@/types/game';

export type TeamStatus = 'guessing' | 'waiting' | 'stealing' | 'grayed';

interface Props {
  team: TeamState;
  side: TeamSide;
  teamStatus: TeamStatus;
  mistakes: number;
  maxMistakes: number;
  onSelect: () => void;
  isSelectDisabled?: boolean;
}

function getStatusText(teamStatus: TeamStatus, mistakes: number): string {
  if (teamStatus === 'grayed') return 'Przejęcie przez przeciwnika';
  if (teamStatus === 'stealing') return mistakes > 0 ? 'Błąd! Runda skończona' : 'Przejęcie — jedna szansa';
  if (teamStatus === 'waiting') return 'Czeka';
  // guessing
  if (mistakes === 0) return 'Zgaduje';
  if (mistakes === 1) return '1 błąd';
  return 'Kolejny błąd = przejęcie';
}

export function TeamPanel({ team, teamStatus, mistakes, maxMistakes, onSelect, isSelectDisabled = false }: Props) {
  const isHighlighted = teamStatus === 'guessing' || teamStatus === 'stealing';
  const isGrayed = teamStatus === 'grayed';
  const statusText = getStatusText(teamStatus, mistakes);

  return (
    <div
      className={[
        'flex flex-col gap-3 p-4 rounded-lg border-2 transition-all duration-200',
        isHighlighted && 'border-familiada-gold bg-familiada-bg-panel box-glow-gold',
        isGrayed && 'border-familiada-border bg-familiada-bg-panel opacity-60',
        !isHighlighted && !isGrayed && 'border-familiada-border bg-familiada-bg-panel',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Team selection radio + name */}
      <label
        className={['flex items-center gap-3', isSelectDisabled ? 'cursor-not-allowed' : 'cursor-pointer'].join(' ')}
      >
        <input
          type="radio"
          name="controlling-team"
          checked={teamStatus === 'guessing'}
          onChange={onSelect}
          disabled={isSelectDisabled}
          className="w-4 h-4 accent-familiada-gold disabled:opacity-50"
        />
        <span className="font-display text-lg text-familiada-text-primary uppercase tracking-wide">
          {team.name}
        </span>
      </label>

      {/* Total score */}
      <div className="flex items-center gap-2">
        <span className="text-familiada-text-secondary text-sm">Wynik:</span>
        <span className="font-display text-2xl text-familiada-gold">{team.totalScore}</span>
      </div>

      {/* Mistake slots */}
      <div className="flex items-center gap-2">
        <span className="text-familiada-text-secondary text-sm">Błędy:</span>
        <div className="flex gap-1">
          {Array.from({ length: maxMistakes }, (_, i) => (
            <div
              key={i}
              className={['mistake-x w-8 h-8 text-xl', i < mistakes ? 'active' : 'empty'].join(' ')}
            >
              X
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div
        className={[
          'text-sm font-bold',
          isHighlighted ? 'text-familiada-gold' : 'text-familiada-text-secondary',
        ].join(' ')}
      >
        {statusText}
      </div>
    </div>
  );
}
