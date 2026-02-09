import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = 'left',
  speed = 30,
  className = '',
  pauseOnHover = true
}) => {
  // Create enough duplicates for seamless loop
  const content = Array(4).fill(children);

  const animationStyle = {
    '--marquee-duration': `${speed}s`,
  } as React.CSSProperties;

  return (
    <div
      className={`
        group
        w-full overflow-hidden whitespace-nowrap
        bg-black text-[var(--accent)]
        py-4 md:py-6
        border-y-4 border-black
        font-black text-xl md:text-3xl uppercase
        relative
        ${className}
      `}
      style={animationStyle}
    >
      {/* Gradient Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div
        className={`
          inline-flex
          ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}
        `}
        style={{
          animation: `marquee var(--marquee-duration) linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal'
        }}
      >
        {content.map((child, index) => (
          <div key={index} className="inline-flex items-center shrink-0">
            {child}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
    </div>
  );
};

// Double Marquee Component - Uses string arrays instead of JSX props
interface DoubleMarqueeProps {
  topItems: string[];
  bottomItems: string[];
  topSeparator?: string;
  bottomSeparator?: string;
  speed?: number;
  className?: string;
}

export const DoubleMarquee: React.FC<DoubleMarqueeProps> = ({
  topItems,
  bottomItems,
  topSeparator = '✦',
  bottomSeparator = '★',
  speed = 25,
  className = ''
}) => {
  // Build the content with separators
  const topContent = topItems.flatMap((item, i) =>
    i < topItems.length - 1
      ? [<span key={`t${i}`} className="mx-6 md:mx-10">{item}</span>, <span key={`ts${i}`} className="mx-4">{topSeparator}</span>]
      : [<span key={`t${i}`} className="mx-6 md:mx-10">{item}</span>, <span key={`ts${i}`} className="mx-4">{topSeparator}</span>]
  );

  const bottomContent = bottomItems.flatMap((item, i) =>
    i < bottomItems.length - 1
      ? [<span key={`b${i}`} className="mx-6 md:mx-10">{item}</span>, <span key={`bs${i}`} className="mx-4">{bottomSeparator}</span>]
      : [<span key={`b${i}`} className="mx-6 md:mx-10">{item}</span>, <span key={`bs${i}`} className="mx-4">{bottomSeparator}</span>]
  );

  return (
    <div className={`relative ${className}`}>
      {/* Top Row - Left */}
      <div
        className="
          w-full overflow-hidden whitespace-nowrap
          bg-[var(--accent)] text-black
          py-3 md:py-4
          border-y-4 border-black
          font-black text-lg md:text-2xl uppercase
        "
      >
        <div
          className="inline-flex"
          style={{
            animation: `marquee-top ${speed}s linear infinite`
          }}
        >
          {Array(4).fill(topContent).map((content, index) => (
            <div key={index} className="inline-flex items-center shrink-0">
              {content}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row - Right */}
      <div
        className="
          w-full overflow-hidden whitespace-nowrap
          bg-[var(--secondary)] text-black
          py-3 md:py-4
          border-b-4 border-black
          font-black text-lg md:text-2xl uppercase
        "
      >
        <div
          className="inline-flex"
          style={{
            animation: `marquee-bottom ${speed * 0.8}s linear infinite reverse`
          }}
        >
          {Array(4).fill(bottomContent).map((content, index) => (
            <div key={index} className="inline-flex items-center shrink-0">
              {content}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-top {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes marquee-bottom {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
    </div>
  );
};
