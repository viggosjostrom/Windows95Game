import { motion } from 'framer-motion';
import Image from 'next/image';

interface GlitchyProps {
  isMoving: boolean;
  position: { x: number; y: number; } | null;
  virusPosition: { currentWindow: string | null; coordinates: { x: number; y: number; } | null; };
}

export default function Glitchy({ isMoving, position, virusPosition }: GlitchyProps) {
  return (
    <motion.div
      className={`
        absolute z-[999] w-12 h-12 cursor-pointer
        ${virusPosition.currentWindow ? 'pointer-events-none' : ''}
      `}
      animate={{
        x: position?.x ?? 0,
        y: position?.y ?? 0,
        scale: isMoving ? [1, 1.1, 1] : 1,
      }}
      transition={{
        duration: 0.5,
        scale: {
          repeat: isMoving ? Infinity : 0,
          duration: 0.3
        }
      }}
    >
      <div className="w-full h-full bg-red-600 rounded-full opacity-80 animate-pulse shadow-lg" />
    </motion.div>
  );
} 