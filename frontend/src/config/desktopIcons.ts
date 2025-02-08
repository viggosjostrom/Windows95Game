import type { DesktopIcon } from '@/types';

const ICON_VERTICAL_SPACING = 80;  // Pixels between icons

export const defaultIcons: DesktopIcon[] = [
    {
        id: 'recycle-bin',
        title: 'Recycle Bin',
        icon: '/icons/recycle_bin_full-4.png',
        appType: 'recyclebin',
        position: { x: 20, y: 20 + (ICON_VERTICAL_SPACING * 2) }
    },
    {
        id: 'notepad',
        title: 'Notepad',
        icon: '/icons/notepad.png',
        appType: 'notepad',
        position: { x: 20, y: 20 }
  },
  {
    id: 'my-computer',
    title: 'My Computer',
    icon: '/icons/mycomputer.png',
    appType: 'explorer',
    position: { x: 20, y: 20 + ICON_VERTICAL_SPACING }
  }
]; 