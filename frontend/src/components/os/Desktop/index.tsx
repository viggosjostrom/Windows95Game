'use client';

import { useState } from 'react';
import Icon from '@/components/shared/Icon';
import Window from '@/components/os/Window';
import type { DesktopIcon, AppState } from '@/types';
import appRegistry from '@/components/apps/registry';
import { defaultIcons } from '@/config/desktopIcons';
import Taskbar from '@/components/os/Taskbar';
import { useGameStore } from '@/store';
import { useGlitchyBehavior } from '@/hooks/useGlitchyBehavior';
import Glitchy from '@/components/game/Glitchy';
import { useWindowManager } from '@/hooks/useWindowManager';

export default function Desktop() {
  const { 
    isGameStarted,
    virusPosition,
    virusState,
    updateVirusPosition,
    updateVirusState 
  } = useGameStore();

  const {
    openWindows,
    activeWindow,
    openWindow,
    setOpenWindows,
    setActiveWindow
  } = useWindowManager();

  const [icons] = useState<DesktopIcon[]>(defaultIcons);
  const [selectedIcon] = useState<string | null>(null);
  const [appStates, setAppStates] = useState<Record<string, AppState>>({});

  const handleIconDoubleClick = (appType: string) => {
    const icon = icons.find(i => i.appType === appType);
    if (!icon) return;
    openWindow(appType, icon.title);
  };

  const handleWindowClose = (windowId: string) => {
    if (virusPosition.currentWindow === windowId) {
      const availableWindows = openWindows
        .filter(w => w.id !== windowId && !w.isMinimized)
        .map(w => w.id);
      
      if (availableWindows.length > 0) {
        const randomWindow = availableWindows[Math.floor(Math.random() * availableWindows.length)];
        updateVirusPosition(randomWindow);
        updateVirusState('moving');
      } else {
        updateVirusPosition(null);
        updateVirusState('idle');
      }
    }

    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  };

  const handleWindowSelect = (windowId: string) => {
    const window = openWindows.find(w => w.id === windowId);
    if (!window) return;

    if (window.isMinimized) {
      // Restore minimized window
      setOpenWindows(prev => 
        prev.map(w => ({
          ...w,
          isMinimized: w.id === windowId ? false : w.isMinimized,
          isActive: w.id === windowId
        }))
      );
    } else {
      // Set window as active
      setOpenWindows(prev => 
        prev.map(w => ({
          ...w,
          isActive: w.id === windowId
        }))
      );
    }
    setActiveWindow(windowId);
  };

  const handleAppStateChange = (windowId: string, newState: AppState) => {
    setAppStates(prev => ({
      ...prev,
      [windowId]: newState
    }));
  };

  const handleWindowPositionChange = (windowId: string, newPosition: { x: number; y: number }) => {
    setOpenWindows(prev => 
      prev.map(w => w.id === windowId 
        ? { ...w, position: newPosition }
        : w
      )
    );
    
    // Update virus position if it's in this window
    if (virusPosition.currentWindow === windowId) {
      const window = openWindows.find(w => w.id === windowId);
      if (window) {
        updateVirusPosition(windowId, {
          x: newPosition.x + Math.random() * (window.size.width - 50),
          y: newPosition.y + Math.random() * (window.size.height - 50)
        });
      }
    }
  };

  useGlitchyBehavior({ openWindows });

  return (
    <div className="relative w-screen h-screen bg-[#008080] overflow-hidden">
      {!isGameStarted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#c0c0c0] p-4 border-2 border-[#ffffff] shadow-md">
            <h2 className="text-black mb-4">Welcome to Catch95.exe</h2>
            <button 
              className="px-4 py-2 bg-[#c0c0c0] border-2 border-[#ffffff] text-black"
              onClick={() => useGameStore.getState().startGame('Player', 'medium')}
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      <div className="p-4 flex flex-col gap-4">
        {icons.map((icon) => (
          <Icon
            key={icon.id}
            icon={icon}
            isSelected={selectedIcon === icon.id}
            onDoubleClick={handleIconDoubleClick}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {openWindows.map((window, index) => {
          const AppComponent = appRegistry[window.appType]?.component;

          return (
            <div key={window.id} className="pointer-events-auto">
              <Window
                id={window.id}
                title={window.title}
                onClose={() => handleWindowClose(window.id)}
                onMinimize={() => handleWindowSelect(window.id)}
                isActive={window.isActive}
                isMinimized={window.isMinimized}
                onFocus={() => setActiveWindow(window.id)}
                defaultPosition={window.position}
                defaultSize={window.size}
                hasVirus={virusPosition.currentWindow === window.id}
                onPositionChange={(pos) => handleWindowPositionChange(window.id, pos)}
              >
                {AppComponent && (
                  <AppComponent 
                    state={appStates[window.id]}
                    onStateChange={(newState: AppState) => handleAppStateChange(window.id, newState)}
                    windowId={window.id}
                  />
                )}
              </Window>
            </div>
          );
        })}
      </div>

      <Taskbar 
        openWindows={openWindows}
        onWindowSelect={handleWindowSelect}
      />

      <Glitchy 
        isMoving={virusState === 'moving'}
        position={virusPosition.coordinates}
        virusPosition={virusPosition}
      />
    </div>
  );
}
