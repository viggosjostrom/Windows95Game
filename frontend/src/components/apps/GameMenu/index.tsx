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
    // Create audio element when component mounts
    audioRef.current = new Audio('/sounds/menu-theme.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // 50% volume
    audioRef.current.play();

    // Cleanup when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="h-full w-full relative flex flex-col items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/game-menu-bg.jpg"
          alt="Game Menu Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {/* Menu Buttons Container - using absolute positioning */}
        <div className="absolute bottom-20 right-[300px] flex flex-col gap-2">
          {!isGameStarted ? (
            <button
              className="w-48 h-10 bg-[#c0c0c0] border-2 
                       border-[#ffffff_#808080_#808080_#ffffff]
                       text-lg hover:bg-[#d4d4d4]
                       active:border-[#808080_#ffffff_#ffffff_#808080]"
              onClick={() => startGame('Player', 'medium')}
            >
              New Game
            </button>
          ) : (
            <>
              <button
                className="w-48 h-10 bg-[#c0c0c0] border-2 
                         border-[#ffffff_#808080_#808080_#ffffff]
                         text-lg hover:bg-[#d4d4d4]
                         active:border-[#808080_#ffffff_#ffffff_#808080]"
                onClick={() => isPaused ? resumeGame() : pauseGame()}
              >
                {isPaused ? 'Resume Game' : 'Pause Game'}
              </button>
              <button
                className="w-48 h-10 bg-[#c0c0c0] border-2 
                         border-[#ffffff_#808080_#808080_#ffffff]
                         text-lg hover:bg-[#d4d4d4]
                         active:border-[#808080_#ffffff_#ffffff_#808080]"
                onClick={resetGame}
              >
                End Game
              </button>
            </>
          )}
          
          <button
            className="w-48 h-10 bg-[#c0c0c0] border-2 
                     border-[#ffffff_#808080_#808080_#ffffff]
                     text-lg hover:bg-[#d4d4d4]
                     active:border-[#808080_#ffffff_#ffffff_#808080]"
            onClick={() => {/* TODO: Implement save game */}}
          >
            Save Game
          </button>
          
          <button
            className="w-48 h-10 bg-[#c0c0c0] border-2 
                     border-[#ffffff_#808080_#808080_#ffffff]
                     text-lg hover:bg-[#d4d4d4]
                     active:border-[#808080_#ffffff_#ffffff_#808080]"
            onClick={() => {/* TODO: Implement load game */}}
          >
            Load Game
          </button>
        </div>
      </div>
    </div>
  );
} 