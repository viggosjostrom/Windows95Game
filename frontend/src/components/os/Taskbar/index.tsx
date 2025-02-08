'use client';

import { useState } from 'react';

interface TaskbarProps {
  openWindows: Array<{
    id: string;
    title: string;
    isActive: boolean;
    isMinimized: boolean;
    appType: string;
  }>;
  onWindowSelect: (id: string) => void;
}

const getIconPath = (appType: string): string => {
  switch (appType) {
    case 'recyclebin':
      return '/icons/recycle_bin_full-4.png';
    case 'explorer':
      return '/icons/mycomputer.png';
    case 'notepad':
      return '/icons/notepad.png';
    default:
      return '/icons/default.png';
  }
};

export default function Taskbar({ openWindows, onWindowSelect }: TaskbarProps) {
  const [isStartOpen, setIsStartOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[28px] bg-[#c0c0c0] 
                    border-t-[1px] border-[#ffffff] 
                    flex items-center px-1 gap-1 z-50">
      {/* Start Button */}
      <button 
        className="h-[22px] px-2 flex items-center gap-1
                   bg-[#c0c0c0] text-black
                   border-[1px] border-[#ffffff_#808080_#808080_#ffffff]
                   active:border-[#808080_#ffffff_#ffffff_#808080]"
        onClick={() => setIsStartOpen(!isStartOpen)}
      >
        <img src="/icons/windows-logo.png" alt="Start" className="w-4 h-4" />
        <span className="text-sm font-bold text-black">Start</span>
      </button>

      {/* Window Buttons */}
      <div className="flex-1 flex items-center gap-1">
        {openWindows.map(window => (
          <button
            key={window.id}
            className={`
              h-[22px] px-2 min-w-[125px] max-w-[200px] 
              flex items-center gap-1
              text-sm truncate text-black !important
              border-[1px]
              ${window.isActive 
                ? 'border-[#000000_#dfdfdf_#dfdfdf_#000000] bg-[#bfbfbf] shadow-[inset_1px_1px_#000]' 
                : 'border-[#dfdfdf_#000000_#000000_#dfdfdf] bg-[#c0c0c0]'}
              ${window.isMinimized
                ? 'opacity-70'
                : 'opacity-100'}
            `}
            onClick={() => onWindowSelect(window.id)}
          >
            <img src={getIconPath(window.appType)} alt="" className="w-4 h-4" />
            <span className={`${window.isActive ? 'font-bold' : ''} text-black`}>{window.title}</span>
          </button>
        ))}
      </div>

      {/* Clock */}
      <div className="px-2 h-[22px] flex items-center
                border-[1px] border-[#808080_#ffffff_#ffffff_#808080]">
        <span className="text-sm text-black">4:20 PM</span>
      </div>
    </div>
  );
}
