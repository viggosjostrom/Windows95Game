import { create } from 'zustand';

interface GameState {
  // Game Progress
  isGameStarted: boolean;
  isPaused: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  score: number;
  timeElapsed: number;

  // Virus ("Glitchy") State
  virusPosition: {
    currentWindow: string | null;  // ID of window virus is in
    coordinates: { x: number; y: number } | null;
  };
  virusState: 'idle' | 'moving' | 'hiding' | 'caught';
  lastKnownLocation: string;  // For hints (e.g., "Last seen in Notepad")

  // Player State
  playerName: string | null;
  hasAntivirus: boolean;
  unlockedTools: string[];  // e.g., ['cmd', 'taskmanager']

  // Actions
  startGame: (playerName: string, difficulty: 'easy' | 'medium' | 'hard') => void;
  pauseGame: () => void;
  resumeGame: () => void;
  updateVirusPosition: (windowId: string | null, coordinates?: { x: number; y: number }) => void;
  updateVirusState: (state: 'idle' | 'moving' | 'hiding' | 'caught') => void;
  incrementScore: (points: number) => void;
  unlockTool: (tool: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  // Initial State
  isGameStarted: false,
  isPaused: false,
  difficulty: 'medium',
  score: 0,
  timeElapsed: 0,
  virusPosition: {
    currentWindow: null,
    coordinates: null,
  },
  virusState: 'idle',
  lastKnownLocation: '',
  playerName: null,
  hasAntivirus: false,
  unlockedTools: [],

  // Actions
  startGame: (playerName, difficulty) => set({
    isGameStarted: true,
    playerName,
    difficulty,
    score: 0,
    timeElapsed: 0,
  }),

  pauseGame: () => set({ isPaused: true }),
  
  resumeGame: () => set({ isPaused: false }),

  updateVirusPosition: (windowId, coordinates) => set((state) => ({
    virusPosition: {
      currentWindow: windowId,
      coordinates: coordinates || null,
    },
    lastKnownLocation: windowId || state.lastKnownLocation,
  })),

  updateVirusState: (state) => set({
    virusState: state,
  }),

  incrementScore: (points) => set((state) => ({
    score: state.score + points,
  })),

  unlockTool: (tool) => set((state) => ({
    unlockedTools: [...state.unlockedTools, tool],
  })),

  resetGame: () => set({
    isGameStarted: false,
    isPaused: false,
    score: 0,
    timeElapsed: 0,
    virusPosition: {
      currentWindow: null,
      coordinates: null,
    },
    virusState: 'idle',
    lastKnownLocation: '',
    hasAntivirus: false,
    unlockedTools: [],
  }),
}));
