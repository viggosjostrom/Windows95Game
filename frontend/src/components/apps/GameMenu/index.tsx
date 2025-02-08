'use client';

import { useGameStore } from '@/store';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { AppProps } from '@/types';

export default function GameMenu({}: AppProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { 
    isGameStarted,
    isPaused,
    startGame,
    pauseGame,
    resumeGame,
    resetGame 
  } = useGameStore();

  useEffect(() => {
    const audio = new Audio('/sounds/menu-theme.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    
    // Store audio reference
    audioRef.current = audio;

    // Handle play with error catching
    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log('Audio playback failed:', error);
      }
    };

    playAudio();

    // Cleanup function
    return () => {
      if (audioRef.current) {
        const audio = audioRef.current;
        // Ensure we remove event listeners and stop playback
        audio.pause();
        audio.src = '';
        audio.load();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="h-full w-full relative flex flex-col items-center overflow-hidden">
      {/* Glitch Container */}
      <div className="absolute inset-0 z-0">
        {/* Base Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/game-menu-bg.jpg"
            alt="Game Menu Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        
        {/* Glitch Layers */}
        <div className="absolute inset-0 animate-glitch-1 opacity-70">
          <Image
            src="/images/game-menu-bg.jpg"
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            className="mix-blend-screen"
          />
        </div>
        <div className="absolute inset-0 animate-glitch-2 opacity-70">
          <Image
            src="/images/game-menu-bg.jpg"
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            className="mix-blend-multiply"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {/* Menu Buttons Container - using absolute positioning */}
        <div className="absolute bottom-20 right-[280px] flex flex-col gap-2">
          {!isGameStarted ? (
            <button
              className="w-48 h-10 bg-[#c0c0c0] border-2 
                       border-[#ffffff_#808080_#808080_#ffffff]
                       text-lg hover:bg-[#d4d4d4] animate-glitch-text
                       active:border-[#808080_#ffffff_#ffffff_#808080]
                       hover:animate-glitch-text"
              onClick={() => startGame('Player', 'medium')}
            >
              New Game
            </button>
          ) : (
            <>
              <button
                className="w-48 h-10 bg-[#c0c0c0] border-2 
                         border-[#ffffff_#808080_#808080_#ffffff]
                         text-lg hover:bg-[#d4d4d4] animate-glitch-text
                         active:border-[#808080_#ffffff_#ffffff_#808080]
                         hover:animate-glitch-text"
                onClick={() => isPaused ? resumeGame() : pauseGame()}
              >
                {isPaused ? 'Resume Game' : 'Pause Game'}
              </button>
              <button
                className="w-48 h-10 bg-[#c0c0c0] border-2 
                         border-[#ffffff_#808080_#808080_#ffffff]
                         text-lg hover:bg-[#d4d4d4] animate-glitch-text
                         active:border-[#808080_#ffffff_#ffffff_#808080]
                         hover:animate-glitch-text"
                onClick={resetGame}
              >
                End Game
              </button>
            </>
          )}
          
          <button
            className="w-48 h-10 bg-[#c0c0c0] border-2 
                     border-[#ffffff_#808080_#808080_#ffffff]
                     text-lg hover:bg-[#d4d4d4] animate-glitch-text
                     active:border-[#808080_#ffffff_#ffffff_#808080]
                     hover:animate-glitch-text"
            onClick={() => {/* TODO: Implement save game */}}
          >
            Save Game
          </button>
          
          <button
            className="w-48 h-10 bg-[#c0c0c0] border-2 
                     border-[#ffffff_#808080_#808080_#ffffff]
                     text-lg hover:bg-[#d4d4d4] animate-glitch-text
                     active:border-[#808080_#ffffff_#ffffff_#808080]
                     hover:animate-glitch-text"
            onClick={() => {/* TODO: Implement load game */}}
          >
            Load Game
          </button>
        </div>
      </div>
    </div>
  );
} 