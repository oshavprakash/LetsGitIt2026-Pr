import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
    children: React.ReactNode;
    className?: string;
    as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
    glitchOnHover?: boolean;
    continuous?: boolean;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
    children,
    className = '',
    as: Component = 'span',
    glitchOnHover = true,
    continuous = false
}) => {
    return (
        <motion.span
            className={`
        relative inline-block
        ${glitchOnHover ? 'hover-glitch' : ''}
        ${continuous ? 'animate-glitch-continuous' : ''}
        ${className}
      `}
            whileHover={glitchOnHover ? { scale: 1.02 } : undefined}
            style={{
                textShadow: continuous
                    ? '2px 2px var(--accent), -2px -2px var(--secondary)'
                    : 'none'
            }}
        >
            {/* Main text */}
            <span className="relative z-10">{children}</span>

            {/* Glitch layers for continuous mode */}
            {continuous && (
                <>
                    <span
                        className="absolute top-0 left-0 w-full h-full text-[var(--accent)] opacity-80 animate-glitch-1"
                        aria-hidden="true"
                        style={{ clipPath: 'inset(20% 0 40% 0)' }}
                    >
                        {children}
                    </span>
                    <span
                        className="absolute top-0 left-0 w-full h-full text-[var(--secondary)] opacity-80 animate-glitch-2"
                        aria-hidden="true"
                        style={{ clipPath: 'inset(60% 0 10% 0)' }}
                    >
                        {children}
                    </span>
                </>
            )}

            <style>{`
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(3px, -3px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(3px, -3px); }
          40% { transform: translate(3px, 3px); }
          60% { transform: translate(-3px, -3px); }
          80% { transform: translate(-3px, 3px); }
        }
        
        .animate-glitch-1 {
          animation: glitch-1 0.3s ease-in-out infinite;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 0.3s ease-in-out infinite reverse;
        }
        
        .animate-glitch-continuous {
          animation: glitch-main 3s ease-in-out infinite;
        }
        
        @keyframes glitch-main {
          0%, 90%, 100% {
            text-shadow: none;
          }
          92% {
            text-shadow: 2px 2px var(--accent), -2px -2px var(--secondary);
          }
          94% {
            text-shadow: -2px 2px var(--accent), 2px -2px var(--secondary);
          }
          96% {
            text-shadow: 2px -2px var(--accent), -2px 2px var(--secondary);
          }
          98% {
            text-shadow: -2px -2px var(--accent), 2px 2px var(--secondary);
          }
        }
        
        .hover-glitch:hover {
          animation: glitch-hover 0.3s ease-in-out;
        }
        
        @keyframes glitch-hover {
          0%, 100% {
            text-shadow: none;
            transform: translate(0);
          }
          20% {
            text-shadow: 3px 0 var(--accent), -3px 0 var(--secondary);
            transform: translate(-2px, 0);
          }
          40% {
            text-shadow: -3px 0 var(--accent), 3px 0 var(--secondary);
            transform: translate(2px, 0);
          }
          60% {
            text-shadow: 3px 0 var(--secondary), -3px 0 var(--accent);
            transform: translate(-1px, 0);
          }
          80% {
            text-shadow: -3px 0 var(--secondary), 3px 0 var(--accent);
            transform: translate(1px, 0);
          }
        }
      `}</style>
        </motion.span>
    );
};
