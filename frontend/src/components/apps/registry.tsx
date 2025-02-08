import type { AppProps } from '@/types';
import Notepad from './Notepad';

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
  // Add more apps here later
};

export default appRegistry;
