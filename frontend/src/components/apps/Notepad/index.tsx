'use client';

import { useState } from 'react';
import type { AppProps } from '@/types';

export default function Notepad({ state, onStateChange }: AppProps) {
  const [content, setContent] = useState(state?.content || '');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onStateChange?.({ content: newContent });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] mb-1 p-1 text-sm border-b-[1px] border-[#808080]">
        <span className="mr-4 cursor-pointer hover:underline">File</span>
        <span className="mr-4 cursor-pointer hover:underline">Edit</span>
        <span className="mr-4 cursor-pointer hover:underline">Format</span>
        <span className="cursor-pointer hover:underline">Help</span>
      </div>

      {/* Text Area */}
      <textarea
        className="flex-1 resize-none p-1 bg-white text-black
                   border-[2px] border-[#808080_#dfdfdf_#dfdfdf_#808080]
                   focus:outline-none font-['Fixedsys']"
        value={content}
        onChange={handleChange}
        spellCheck={false}
      />
    </div>
  );
} 