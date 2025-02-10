'use client';

import { useState, ReactNode, useRef } from 'react';
import Draggable from 'react-draggable';

interface WindowProps {
  id: string;
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
  onPositionChange?: (position: { x: number; y: number }) => void;
}

// Create a wrapper component that uses forwardRef
const DraggableWindow = ({ children, ...props }: any) => {
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef} {...props}>
      <div ref={nodeRef}>{children}</div>
    </Draggable>
  );
};

export default function Window({ 
  id,
  title, 
  children, 
  onClose,
  onMinimize,
  defaultPosition = { x: 20, y: 20 },
  defaultSize = { width: 200, height: 150 },
  isActive = false,
  isMinimized = false,
  onFocus,
  hasVirus,
  onPositionChange
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(defaultPosition);

  if (isMinimized) return null;

  const handleDragStop = (e: any, data: any) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    setIsDragging(false);
    onPositionChange?.(newPosition);
  };

  return (
    <DraggableWindow
      handle=".window-title-bar"
      defaultPosition={defaultPosition}
      position={position}
      onStart={() => setIsDragging(true)}
      onStop={handleDragStop}
      scale={1}
    >
      <div 
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
          <span className="text-sm truncate">{title}</span>
          <div className="flex gap-1">
            {onMinimize && (
              <button
                className="w-[16px] h-[14px] bg-[#c0c0c0] border-[1px] border-[#ffffff_#808080_#808080_#ffffff] flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
              >
                _
              </button>
            )}
            <button
              className="w-[16px] h-[14px] bg-[#c0c0c0] border-[1px] border-[#ffffff_#808080_#808080_#ffffff] flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-1 h-[calc(100%-20px)]">
          {children}
        </div>
      </div>
    </DraggableWindow>
  );
}
