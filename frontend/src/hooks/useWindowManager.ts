import { useState } from 'react';
import appRegistry from '@/components/apps/registry';

export interface OpenWindow {
  id: string;
  appType: string;
  title: string;
  isActive: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export function useWindowManager() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const openWindow = (appType: string, title: string) => {
    const defaultSize = appRegistry[appType]?.defaultSize || { width: 400, height: 300 };
    
    // Calculate a cascading position for new windows
    const offset = openWindows.length * 30;
    const position = { 
      x: 50 + offset, 
      y: 50 + offset 
    };
    
    const newWindow: OpenWindow = {
      id: `${appType}-${Date.now()}`,
      appType,
      title,
      isActive: true,
      isMinimized: false,
      position: position,
      size: defaultSize
    };
    
    setOpenWindows(prev => [...prev.map(w => ({ ...w, isActive: false })), newWindow]);
    setActiveWindow(newWindow.id);
    return newWindow.id;
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  const updateWindowPosition = (windowId: string, position: { x: number; y: number }) => {
    setOpenWindows(prev => 
      prev.map(w => w.id === windowId 
        ? { ...w, position }
        : w
      )
    );
  };

  return {
    openWindows,
    activeWindow,
    openWindow,
    setOpenWindows,
    setActiveWindow,
    closeWindow,
    updateWindowPosition
  };
}