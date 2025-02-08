'use client';

import { useState, ReactNode, useRef } from 'react';
import Draggable from 'react-draggable';

interface WindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  isActive?: boolean;
  isMinimized?: boolean;
  onFocus?: () => void;
  hasVirus?: boolean;
}

export default function Window({ 
  title, 
  children, 
  onClose,
  onMinimize,
  defaultPosition = { x: 20, y: 20 },
  defaultSize = { width: 200, height: 150 },
  isActive = false,
  isMinimized = false,
  onFocus,
  hasVirus
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef(null);

  if (isMinimized) return null;

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-title-bar"
      defaultPosition={defaultPosition}
      onStart={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
      scale={1}
    >
      <div 
        ref={nodeRef}
        className={`
          absolute bg-[#c0c0c0] 
          border-[2px] border-[#dfdfdf_#808080_#808080_#dfdfdf]
          shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff]
          ${isActive ? 'z-10' : 'z-0'}
          ${isDragging ? 'cursor-grabbing' : ''}
          ${hasVirus ? 'animate-pulse' : ''}
        `}
        style={{
          width: defaultSize.width,
          height: defaultSize.height
        }}
        onClick={onFocus}
      >
        {/* Title Bar */}
        <div className={`
          window-title-bar
          flex justify-between items-center px-1 h-[20px]
          bg-[#000080] text-white
          ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        `}>
          <span className="text-sm font-bold">{title}</span>
          <div className="flex gap-1">
            <button 
              className="px-1 min-w-[14px] h-[14px] 
                         bg-[#c0c0c0] text-black text-sm font-bold
                         border border-[#ffffff_#808080_#808080_#ffffff]
                         active:border-[#808080_#ffffff_#ffffff_#808080]
                         flex items-center justify-center"
              onClick={onMinimize}
            >
              _
            </button>
            <button 
              className="px-1 min-w-[14px] h-[14px] 
                         bg-[#c0c0c0] text-black text-sm font-bold
                         border border-[#ffffff_#808080_#808080_#ffffff]
                         active:border-[#808080_#ffffff_#ffffff_#808080]
                         flex items-center justify-center"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-2 h-[calc(100%-28px)]">
          {children}
        </div>
      </div>
    </Draggable>
  );
}
