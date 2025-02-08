import type { DesktopIcon } from '@/types';

const ICON_VERTICAL_SPACING = 80;  // Pixels between icons

export const defaultIcons: DesktopIcon[] = [
    {
        id: 'catch95',
        title: 'Catch95.exe',
        icon: '/icons/catch95_desktop_logo.png',
        appType: 'catch95',
        position: { x: 20, y: 20 }
    },
    {
        id: 'recycle-bin',
        title: 'Recycle Bin',
        icon: '/icons/recycle_bin_full-4.png',
        appType: 'recyclebin',
        position: { x: 20, y: 20 + (ICON_VERTICAL_SPACING * 3) }
    },
    {
        id: 'notepad',
        title: 'Notepad',
        icon: '/icons/notepad.png',
        appType: 'notepad',
        position: { x: 20, y: 20 + ICON_VERTICAL_SPACING }
    },
    {
        id: 'my-computer',
        title: 'My Computer',
        icon: '/icons/mycomputer.png',
        appType: 'explorer',
        position: { x: 20, y: 20 + (ICON_VERTICAL_SPACING * 2) }
    }
]; 