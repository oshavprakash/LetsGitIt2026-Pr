import React, { useEffect, useState } from 'react';

interface ShapeProps {
  type: 'star' | 'circle' | 'zigzag' | 'triangle' | 'square';
  color: string;
  size?: number;
  rotation?: number;
  style?: React.CSSProperties;
}

const Star: React.FC<ShapeProps> = ({ color, size = 50, rotation = 0, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: `rotate(${rotation}deg)`, ...style }}
    className="absolute pointer-events-none mix-blend-multiply opacity-80"
  >
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const Circle: React.FC<ShapeProps> = ({ color, size = 50, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: color,
      border: '4px solid black',
      ...style
    }}
    className="absolute pointer-events-none mix-blend-multiply opacity-80"
  />
);

const Square: React.FC<ShapeProps> = ({ color, size = 50, rotation = 0, style }) => (
  <div
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      border: '4px solid black',
      transform: `rotate(${rotation}deg)`,
      ...style
    }}
    className="absolute pointer-events-none mix-blend-multiply opacity-80"
  />
);

export const DecorativeShapes: React.FC = () => {
  // We'll generate random positions for shapes on mount
  const [shapes, setShapes] = useState<{ type: string; x: number; y: number; size: number; rotation: number; color: string }[]>([]);

  useEffect(() => {
    const colors = ['var(--color-hotpink)', 'var(--color-lime)', 'var(--color-yellow)', 'var(--color-purple)'];
    const types = ['star', 'circle', 'square'];

    const generatedShapes = Array.from({ length: 15 }).map(() => ({
      type: types[Math.floor(Math.random() * types.length)],
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 100 + 50,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setShapes(generatedShapes);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
      {shapes.map((shape, i) => {
        const style = { left: `${shape.x}%`, top: `${shape.y}%` };
        if (shape.type === 'star') return <Star key={i} {...shape} style={style} />;
        if (shape.type === 'circle') return <Circle key={i} {...shape} style={style} />;
        if (shape.type === 'square') return <Square key={i} {...shape} style={style} />;
        return null;
      })}
    </div>
  );
};
