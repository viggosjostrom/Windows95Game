import type { AppProps } from '@/types';
import Notepad from './Notepad';
import GameMenu from './GameMenu';

const appRegistry: Record<string, {
  component: React.ComponentType<AppProps>;
  defaultSize?: { width: number; height: number };
}> = {
  'notepad': {
    component: Notepad,
    defaultSize: {
      width: 400,
      height: 300
    }
  },
  'catch95': {
    component: GameMenu,
    defaultSize: {
      width: 1400,
      height: 800
    }
  },
  // Add more apps here later
};

export default appRegistry;
