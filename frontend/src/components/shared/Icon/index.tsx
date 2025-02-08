'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { DesktopIcon } from '@/types';

interface IconProps {
  icon: DesktopIcon;
  onDoubleClick: (appType: string) => void;
  isSelected?: boolean;
}

export default function Icon({ icon, onDoubleClick, isSelected = false }: IconProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        flex flex-col items-center w-[64px] p-1 cursor-pointer
        ${isSelected ? 'bg-[#000080] text-white' : 'text-black'}
        ${isHovered ? 'bg-[#000080]/50 text-white' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={() => onDoubleClick(icon.appType)}
    >
      <Image
        src={icon.icon}
        alt={icon.title}
        width={32}
        height={32}
        className="mb-1"
      />
      <span className="text-center text-sm break-words w-full">
        {icon.title}
      </span>
    </div>
  );
}
