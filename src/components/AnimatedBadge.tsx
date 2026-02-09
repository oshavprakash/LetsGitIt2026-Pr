import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBadgeProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'accent' | 'secondary' | 'black' | 'white';
    rotate?: number;
    wobble?: boolean;
    float?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
    children,
    className = '',
    variant = 'default',
    rotate = 0,
    wobble = true,
    float = false,
    size = 'md'
}) => {
    const variantStyles = {
        default: 'bg-white text-black border-black',
        accent: 'bg-[var(--accent)] text-black border-black',
        secondary: 'bg-[var(--secondary)] text-black border-black',
        black: 'bg-black text-white border-white',
        white: 'bg-white text-black border-black'
    };

    const sizeStyles = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    return (
        <motion.div
            className={`
        inline-block
        ${sizeStyles[size]}
        font-black uppercase tracking-wider
        border-3 border-black
        shadow-[3px_3px_0px_0px_black]
        ${variantStyles[variant]}
        ${wobble ? 'animate-wiggle' : ''}
        ${className}
      `}
            initial={{ rotate, scale: 0 }}
            animate={{
                rotate,
                scale: 1,
                y: float ? [0, -5, 0] : 0
            }}
            transition={{
                scale: { type: 'spring', stiffness: 200, damping: 15 },
                y: float ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                } : undefined
            }}
            whileHover={{
                scale: 1.1,
                rotate: rotate + 5,
                transition: { duration: 0.2 }
            }}
        >
            {children}
        </motion.div>
    );
};

// Floating Badge with absolute positioning
interface FloatingBadgeProps extends AnimatedBadgeProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const FloatingBadge: React.FC<FloatingBadgeProps> = ({
    position = 'top-right',
    ...props
}) => {
    const positionStyles = {
        'top-left': '-top-3 -left-3',
        'top-right': '-top-3 -right-3',
        'bottom-left': '-bottom-3 -left-3',
        'bottom-right': '-bottom-3 -right-3'
    };

    return (
        <div className={`absolute ${positionStyles[position]} z-20`}>
            <AnimatedBadge {...props} />
        </div>
    );
};
