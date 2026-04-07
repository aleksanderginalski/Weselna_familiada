import { Howl } from 'howler';

import { useGameStore } from '@/store/gameStore';

// Howl instances created once at module level — not recreated on each render
const correctSound = new Howl({ src: ['/sounds/dobra-odpowiedz-familiada.mp3'] });
const wrongSound = new Howl({ src: ['/sounds/bledna-familiada.mp3'] });
const nextRoundSound = new Howl({ src: ['/sounds/przed-i-po-rundzie-familiada.mp3'] });
const introSound = new Howl({ src: ['/sounds/intro-familiada.mp3'] });
// Placeholder — will be replaced by wygrana-familiada.mp3 in US-026
const winSound = new Howl({ src: ['/sounds/przed-finalem-familiada.mp3'] });

interface UseSoundReturn {
  playCorrect: () => void;
  playWrong: () => void;
  playNextRound: () => void;
  playIntro: () => void;
  playWin: () => void;
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

  return { playCorrect, playWrong, playNextRound, playIntro, playWin, isMuted, toggleMute };
}
