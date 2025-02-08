'use client';

import { useState } from 'react';
import Icon from '@/components/shared/Icon';
import Window from '@/components/os/Window';
import type { DesktopIcon, AppState } from '@/types';
import appRegistry from '@/components/apps/registry';
import { defaultIcons } from '@/config/desktopIcons';
import Taskbar from '@/components/os/Taskbar';
import { useGameStore } from '@/store';

interface OpenWindow {
  id: string;
  appType: string;
  title: string;
  isActive: boolean;
  isMinimized: boolean;
}

export default function Desktop() {
  const { 
    isGameStarted,
    virusPosition,
    updateVirusPosition,
    updateVirusState 
  } = useGameStore();

  const [icons] = useState<DesktopIcon[]>(defaultIcons);
  const [selectedIcon] = useState<string | null>(null);
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [appStates, setAppStates] = useState<Record<string, AppState>>({});

  const handleIconDoubleClick = (appType: string) => {
    const icon = icons.find(i => i.appType === appType);
    if (!icon) return;

    const newWindow: OpenWindow = {
      id: `${appType}-${Date.now()}`,
      appType,
      title: icon.title,
      isActive: true,
      isMinimized: false
    };

    setOpenWindows(prev => {
      const updatedWindows = [...prev.map(w => ({ ...w, isActive: false })), newWindow];
      
      if (virusPosition.currentWindow === appType) {
        updateVirusPosition(newWindow.id);
      }
      
      return updatedWindows;
    });
    setActiveWindow(newWindow.id);
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

  const handleWindowFocus = (windowId: string) => {
    setOpenWindows(prev => 
      prev.map(w => ({
        ...w,
        isActive: w.id === windowId
      }))
    );
    setActiveWindow(windowId);
  };

  const handleWindowMinimize = (windowId: string) => {
    setOpenWindows(prev => 
      prev.map(w => ({
        ...w,
        isMinimized: w.id === windowId ? true : w.isMinimized
      }))
    );
  };

  const handleWindowRestore = (windowId: string) => {
    setOpenWindows(prev => 
      prev.map(w => ({
        ...w,
        isMinimized: w.id === windowId ? false : w.isMinimized,
        isActive: w.id === windowId
      }))
    );
    setActiveWindow(windowId);
  };

  const handleAppStateChange = (windowId: string, newState: AppState) => {
    setAppStates(prev => ({
      ...prev,
      [windowId]: newState
    }));
  };

  return (
    <div className="h-screen w-screen bg-[#008080] overflow-hidden relative">
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
          const defaultSize = appRegistry[window.appType]?.defaultSize;

          return (
            <div key={window.id} className="pointer-events-auto">
              <Window
                title={window.title}
                onClose={() => handleWindowClose(window.id)}
                onMinimize={() => handleWindowMinimize(window.id)}
                isActive={window.isActive}
                isMinimized={window.isMinimized}
                onFocus={() => handleWindowFocus(window.id)}
                defaultPosition={{ 
                  x: Math.max(50, (globalThis.window.innerWidth / 2) - ((defaultSize?.width || 400) / 2) + (index * 30)),
                  y: Math.max(50, (globalThis.window.innerHeight / 2) - ((defaultSize?.height || 300) / 2) + (index * 30))
                }}
                defaultSize={defaultSize}
                hasVirus={virusPosition.currentWindow === window.id}
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
        onWindowSelect={(id) => {
          const window = openWindows.find(w => w.id === id);
          if (window?.isMinimized) {
            handleWindowRestore(id);
          } else {
            handleWindowFocus(id);
          }
        }}
      />
    </div>
  );
}
