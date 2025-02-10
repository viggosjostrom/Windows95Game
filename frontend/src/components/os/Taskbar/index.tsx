'use client';

import { useState } from 'react';
import { OpenWindow } from '@/hooks/useWindowManager';
import { getIconPath } from '@/utils/iconHelpers';

interface TaskbarProps {
  openWindows: OpenWindow[];
  onWindowSelect: (id: string) => void;
}

export default function Taskbar({ openWindows, onWindowSelect }: TaskbarProps) {
  const [isStartOpen, setIsStartOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[30px] bg-[#c0c0c0] border-t-2 border-white flex items-center p-1">
      <button 
        className="px-2 py-0.5 mr-2 bg-[#c0c0c0] border-2 border-[#ffffff_#808080_#808080_#ffffff] hover:active:border-[#808080_#ffffff_#ffffff_#808080]"
        onClick={() => setIsStartOpen(!isStartOpen)}
      >
        Start
      </button>

      <div className="flex gap-0.5">
        {openWindows.map((window) => (
          <button
            key={window.id}
            className={`
              flex items-center gap-1 px-2 py-0.5 min-w-[100px]
              border-2 
              ${window.isActive 
                ? 'border-[#808080_#ffffff_#ffffff_#808080] bg-[#dfdfdf]' 
                : 'border-[#ffffff_#808080_#808080_#ffffff] bg-[#c0c0c0]'
              }
            `}
            onClick={() => onWindowSelect(window.id)}
          >
            <img 
              src={getIconPath(window.appType)} 
              alt={window.title}
              className="w-4 h-4"
            />
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
