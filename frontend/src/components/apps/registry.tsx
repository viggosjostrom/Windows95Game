import type { AppProps } from '@/types';
import Notepad from './Notepad';
import GameMenu from './GameMenu';

const appRegistry: Record<string, {
  component: React.ComponentType<AppProps>;
  defaultSize?: { width: number; height: number };
  icon?: string;
}> = {
  'notepad': {
    component: Notepad,
    defaultSize: {
      width: 400,
      height: 300
    },
    icon: '/icons/notepad.png'
  },
  'catch95': {
    component: GameMenu,
    defaultSize: {
      width: 1400,
      height: 800
    },
    icon: '/icons/catch95_desktop_logo.png'
  },
  // Add more apps here later
};

export default appRegistry;
