import { Howl, Howler } from 'howler';
import { useEffect } from 'react';

import { useGameStore } from '@/store/gameStore';

// Resolve sound paths relative to the current document so they work under
// both http:// (dev) and file:// (Electron production) protocols.
function soundUrl(filename: string): string {
  return new URL(`./sounds/${filename}`, document.baseURI).href;
}

// Howl instances created once at module level — not recreated on each render
const correctSound = new Howl({ src: [soundUrl('dobra-odpowiedz-familiada.mp3')] });
const wrongSound = new Howl({ src: [soundUrl('bledna-familiada.mp3')] });
const nextRoundSound = new Howl({ src: [soundUrl('przed-i-po-rundzie-familiada.mp3')] });
const introSound = new Howl({ src: [soundUrl('intro-familiada.mp3')] });
// Placeholder — wygrana-familiada.mp3 not yet available
const winSound = new Howl({ src: [soundUrl('przed-finalem-familiada.mp3')] });
const finalRoundSound = new Howl({ src: [soundUrl('przed-finalem-familiada.mp3')] });
const bellSound = new Howl({ src: [soundUrl('dzwonki-familiada.mp3')] });
const timerEndSound = new Howl({ src: [soundUrl('czas-final-familiada.mp3')] });

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
  volume: number;
  setVolume: (volume: number) => void;
}

/** Provides sound playback functions gated by the global mute state. */
export function useSound(): UseSoundReturn {
  const isMuted = useGameStore((state) => state.isMuted);
  const toggleMute = useGameStore((state) => state.toggleMute);
  const volume = useGameStore((state) => state.volume);
  const setVolume = useGameStore((state) => state.setVolume);

  useEffect(() => {
    Howler.volume(volume / 100);
  }, [volume]);

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
    volume,
    setVolume,
  };
}
