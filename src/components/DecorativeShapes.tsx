import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Shape Types
type ShapeType = 'star' | 'circle' | 'square' | 'triangle' | 'cross' | 'polygon' | 'zigzag' | 'diamond' | 'heart' | 'lightning';

interface Shape {
  id: number;
  type: ShapeType;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  delay: number;
  duration: number;
}

// Helper to generate random shapes
const generateShapes = (count: number): Shape[] => {
  const colors = [
    '#ff69b4', // hot pink
    '#a3e635', // lime
    '#facc15', // yellow
    '#8b5cf6', // purple
    '#3b82f6', // blue
    '#ef4444', // red
    '#f97316', // orange
    '#22d3d1', // cyan
    '#e879f9', // magenta
    '#ffffff', // white
  ];

  const types: ShapeType[] = [
    'star', 'circle', 'square', 'triangle', 'cross',
    'polygon', 'zigzag', 'diamond', 'heart', 'lightning'
  ];

  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    type: types[Math.floor(Math.random() * types.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 100 + 30, // 30px to 130px
    rotation: Math.random() * 360,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 2,
    duration: Math.random() * 15 + 10, // 10-25s float duration
  }));
};

const ShapeSVG = ({ type, color }: { type: ShapeType; color: string }) => {
  const shadowStyle = { filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,1))' };

  switch (type) {
    case 'star':
      return (
        <svg viewBox="0 0 24 24" fill={color} className="w-full h-full" style={shadowStyle}>
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="black" strokeWidth="1.5" />
        </svg>
      );
    case 'circle':
      return (
        <div
          className="w-full h-full rounded-full border-3 border-black"
          style={{ backgroundColor: color, boxShadow: '3px 3px 0px 0px black' }}
        />
      );
    case 'square':
      return (
        <div
          className="w-full h-full border-3 border-black"
          style={{ backgroundColor: color, boxShadow: '3px 3px 0px 0px black' }}
        />
      );
    case 'triangle':
      return (
        <svg viewBox="0 0 24 24" fill={color} className="w-full h-full" style={shadowStyle}>
          <path d="M12 2L22 22H2L12 2Z" stroke="black" strokeWidth="1.5" />
        </svg>
      );
    case 'cross':
      return (
        <div className="relative w-full h-full" style={shadowStyle}>
          <div className="absolute left-1/2 top-0 w-[30%] h-full -translate-x-1/2 border-2 border-black" style={{ backgroundColor: color }} />
          <div className="absolute top-1/2 left-0 w-full h-[30%] -translate-y-1/2 border-2 border-black" style={{ backgroundColor: color }} />
        </div>
      );
    case 'polygon':
      return (
        <svg viewBox="0 0 100 100" fill={color} className="w-full h-full" style={shadowStyle}>
          <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" stroke="black" strokeWidth="3" />
        </svg>
      );
    case 'zigzag':
      return (
        <svg viewBox="0 0 100 50" fill="none" className="w-full h-full" style={shadowStyle}>
          <path d="M0,25 L20,5 L40,25 L60,5 L80,25 L100,5" stroke={color} strokeWidth="8" strokeLinecap="round" />
          <path d="M0,25 L20,5 L40,25 L60,5 L80,25 L100,5" stroke="black" strokeWidth="10" strokeLinecap="round" style={{ transform: 'translate(2px, 2px)' }} />
        </svg>
      );
    case 'diamond':
      return (
        <svg viewBox="0 0 24 24" fill={color} className="w-full h-full" style={shadowStyle}>
          <path d="M12 2L22 12L12 22L2 12L12 2Z" stroke="black" strokeWidth="1.5" />
        </svg>
      );
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" fill={color} className="w-full h-full" style={shadowStyle}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="black" strokeWidth="1.5" />
        </svg>
      );
    case 'lightning':
      return (
        <svg viewBox="0 0 24 24" fill={color} className="w-full h-full" style={shadowStyle}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="black" strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
};

export const DecorativeShapes: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    // Generate shapes only on client to avoid hydration mismatch
    setShapes(generateShapes(20));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: 1,
            y: [0, -30, 0],
            x: [0, 10, 0],
            rotate: [shape.rotation, shape.rotation + 20, shape.rotation],
          }}
          transition={{
            opacity: {
              duration: shape.duration * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: 0.6,
              delay: shape.delay,
              type: 'spring'
            },
            y: {
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror"
            },
            x: {
              duration: shape.duration * 1.3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror"
            },
            rotate: {
              duration: shape.duration * 2,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          style={{
            position: 'absolute',
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
          className="mix-blend-multiply dark:mix-blend-screen"
        >
          <ShapeSVG type={shape.type} color={shape.color} />
        </motion.div>
      ))}
    </div>
  );
};
