import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store';
import { OpenWindow } from '@/hooks/useWindowManager';

interface GlitchyBehaviorProps {
  openWindows: Array<OpenWindow>;
}

export function useGlitchyBehavior({ openWindows }: GlitchyBehaviorProps) {
  const {
    virusPosition,
    virusState,
    updateVirusPosition,
    updateVirusState
  } = useGameStore();

  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const MOVE_DELAY = 2000; // 2 seconds between moves
  const VIRUS_SIZE = 48;
  const TITLE_BAR_HEIGHT = 20;

  const isPositionInWindow = (position: { x: number; y: number }, window: OpenWindow) => {
    return (
      position.x >= window.position.x &&
      position.x <= window.position.x + window.size.width - VIRUS_SIZE &&
      position.y >= window.position.y &&
      position.y <= window.position.y + window.size.height - VIRUS_SIZE
    );
  };

  const getRandomPositionInWindow = (window: OpenWindow) => {
    return {
      x: window.position.x + Math.random() * (window.size.width - VIRUS_SIZE),
      y: window.position.y + TITLE_BAR_HEIGHT + Math.random() * (window.size.height - VIRUS_SIZE - TITLE_BAR_HEIGHT)
    };
  };

  const getRandomDesktopPosition = () => {
    const position = {
      x: Math.random() * (window.innerWidth - VIRUS_SIZE),
      y: Math.random() * (window.innerHeight - VIRUS_SIZE)
    };

    const intersectingWindow = openWindows.find(w => isPositionInWindow(position, w));
    if (intersectingWindow) {
      updateVirusPosition(intersectingWindow.id, getRandomPositionInWindow(intersectingWindow));
      return undefined;
    }

    return position;
  };

  const moveWithinCurrentWindow = () => {
    if (virusPosition.currentWindow) {
      const currentWindow = openWindows.find(w => w.id === virusPosition.currentWindow);
      if (currentWindow) {
        updateVirusState('moving');
        updateVirusPosition(currentWindow.id, getRandomPositionInWindow(currentWindow));
      }
    } else {
      updateVirusState('moving');
      const newPosition = getRandomDesktopPosition();
      if (newPosition) {
        updateVirusPosition(null, newPosition);
      }
    }
  };

  const selectNextLocation = () => {
    // If virus is in a window, 20% chance to move to desktop
    if (virusPosition.currentWindow) {
      if (Math.random() < 0.2) {
        return null; // Move to desktop (20% chance)
      }
      return virusPosition.currentWindow; // Stay in current window (80% chance)
    }

    // If virus is on desktop, 90% chance to move to a window
    if (Math.random() < 0.9) {
      const availableWindows = openWindows.filter(w => !w.isMinimized);
      if (availableWindows.length > 0) {
        return availableWindows[Math.floor(Math.random() * availableWindows.length)].id;
      }
    }

    return null; // Stay on desktop (10% chance)
  };

  useEffect(() => {
    if (virusState === 'caught') return;

    const move = () => {
      const nextLocation = selectNextLocation();
      
      if (nextLocation === virusPosition.currentWindow) {
        // Move within current window/desktop
        moveWithinCurrentWindow();
      } else {
        // Change location
        updateVirusState('moving');
        if (nextLocation) {
          const targetWindow = openWindows.find(w => w.id === nextLocation);
          if (targetWindow) {
            updateVirusPosition(nextLocation, getRandomPositionInWindow(targetWindow));
          }
        } else {
          updateVirusPosition(null, getRandomDesktopPosition());
        }
      }

      moveTimeoutRef.current = setTimeout(move, MOVE_DELAY);
    };

    moveTimeoutRef.current = setTimeout(move, MOVE_DELAY);

    return () => {
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, [openWindows, virusState, virusPosition, updateVirusPosition, updateVirusState]);
} 