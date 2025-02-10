export const getIconPath = (appType: string): string => {
  switch (appType) {
    case 'notepad':
      return '/icons/notepad.png';
    case 'catch95':
      return '/icons/catch95_desktop_logo.png';
    case 'recyclebin':
      return '/icons/recycle_bin_full-4.png';
    case 'explorer':
      return '/icons/mycomputer.png';
    default:
      return '/icons/default.png';
  }
}; 