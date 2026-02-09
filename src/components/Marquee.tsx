import React, { useEffect, useState } from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = 'left',
  speed = 20
}) => {
  const [content, setContent] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Duplicate content to ensure smooth loop
    setContent([children, children, children]);
  }, [children]);

  return (
    <div className="w-full overflow-hidden whitespace-nowrap bg-black text-[var(--accent)] py-4 border-y-4 border-black font-bold text-2xl uppercase relative">
      <div
        className="inline-flex animate-marquee"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal'
        }}
      >
        {content.map((child, index) => (
          <div key={index} className="px-8 inline-block">
            {child}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
};
