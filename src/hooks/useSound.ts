import { Howl } from 'howler';

import { useGameStore } from '@/store/gameStore';

// Howl instances created once at module level — not recreated on each render
const correctSound = new Howl({ src: ['/sounds/dobra-odpowiedz-familiada.mp3'] });
const wrongSound = new Howl({ src: ['/sounds/bledna-familiada.mp3'] });
const nextRoundSound = new Howl({ src: ['/sounds/przed-i-po-rundzie-familiada.mp3'] });
const introSound = new Howl({ src: ['/sounds/intro-familiada.mp3'] });
// Placeholder — wygrana-familiada.mp3 not yet available
const winSound = new Howl({ src: ['/sounds/przed-finalem-familiada.mp3'] });
const finalRoundSound = new Howl({ src: ['/sounds/przed-finalem-familiada.mp3'] });
const bellSound = new Howl({ src: ['/sounds/dzwonki-familiada.mp3'] });
const timerEndSound = new Howl({ src: ['/sounds/czas-final-familiada.mp3'] });

interface UseSoundReturn {
  playCorrect: () => void;
  playWrong: () => void;
  playNextRound: () => void;
  playIntro: () => void;
  playWin: () => void;
  playFinalRound: () => void;
  playBell: () => void;
  playTimerEnd: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

/** Provides sound playback functions gated by the global mute state. */
export function useSound(): UseSoundReturn {
  const isMuted = useGameStore((state) => state.isMuted);
  const toggleMute = useGameStore((state) => state.toggleMute);

  function playCorrect() {
    if (!isMuted) correctSound.play();
  }

  function playWrong() {
    if (!isMuted) wrongSound.play();
  }

  function playNextRound() {
    if (!isMuted) nextRoundSound.play();
  }

  function playIntro() {
    if (!isMuted) introSound.play();
  }

  function playWin() {
    if (!isMuted) winSound.play();
  }

  function playFinalRound() {
    if (!isMuted) finalRoundSound.play();
  }

  function playBell() {
    if (!isMuted) bellSound.play();
  }

  function playTimerEnd() {
    if (!isMuted) timerEndSound.play();
  }

  return {
    playCorrect,
    playWrong,
    playNextRound,
    playIntro,
    playWin,
    playFinalRound,
    playBell,
    playTimerEnd,
    isMuted,
    toggleMute,
  };
}
