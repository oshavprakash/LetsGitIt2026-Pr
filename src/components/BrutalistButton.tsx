import React from 'react';
import { motion } from 'framer-motion';

interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'neutral' | 'reverse';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  wobble?: boolean;
}

export const BrutalistButton: React.FC<BrutalistButtonProps> = ({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  wobble = false,
  ...props
}) => {
  // Size configurations
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base md:px-8 md:py-4 md:text-lg',
    lg: 'px-8 py-4 text-lg md:px-12 md:py-5 md:text-xl'
  };

  // Variant configurations following neobrutalism.dev patterns
  const variantStyles = {
    primary: 'bg-[var(--accent)] text-black border-black',
    secondary: 'bg-[var(--secondary)] text-black border-black',
    neutral: 'bg-white text-black border-black',
    outline: 'bg-transparent text-[var(--text-main)] border-[var(--text-main)]',
    reverse: 'bg-black text-white border-black'
  };

  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-bold uppercase tracking-wide
    border-4 
    transition-all duration-150
    cursor-pointer
    select-none
    shadow-[4px_4px_0px_0px_black]
    hover:shadow-[6px_6px_0px_0px_black]
    hover:-translate-x-[2px] hover:-translate-y-[2px]
    active:shadow-none
    active:translate-x-[4px] active:translate-y-[4px]
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)]
  `;

  const wobbleAnimation = wobble ? 'animate-wiggle' : '';

  const buttonContent = (
    <motion.span
      className="flex items-center gap-2"
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${wobbleAnimation} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${wobbleAnimation} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as any)}
    >
      {buttonContent}
    </motion.button>
  );
};
