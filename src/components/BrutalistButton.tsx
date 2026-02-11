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
  // Size configurations - MORE CHUNKY
  const sizeStyles = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-4 text-base md:px-10 md:py-5 md:text-lg',
    lg: 'px-10 py-5 text-lg md:px-14 md:py-6 md:text-xl'
  };

  // Variant configurations - BOLDER shadows
  const variantStyles = {
    primary: 'bg-[var(--accent)] text-black border-black shadow-[6px_6px_0px_0px_black] hover:shadow-[12px_12px_0px_0px_black]',
    secondary: 'bg-[var(--secondary)] text-black border-black shadow-[6px_6px_0px_0px_black] hover:shadow-[12px_12px_0px_0px_black]',
    neutral: 'bg-white text-black border-black shadow-[6px_6px_0px_0px_black] hover:shadow-[12px_12px_0px_0px_black]',
    outline: 'bg-transparent text-[var(--text-main)] border-[var(--text-main)] shadow-[6px_6px_0px_0px_var(--text-main)] hover:shadow-[12px_12px_0px_0px_var(--text-main)]',
    reverse: 'bg-black text-white border-black shadow-[6px_6px_0px_0px_var(--accent)] hover:shadow-[12px_12px_0px_0px_var(--accent)]'
  };

  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-black uppercase tracking-wider
    border-4 
    transition-all duration-150 ease-out
    cursor-pointer
    select-none
    hover:-translate-x-1 hover:-translate-y-1
    active:translate-x-1 active:translate-y-1
    active:shadow-[2px_2px_0px_0px_black]
    focus:outline-none focus:ring-4 focus:ring-[var(--accent)] focus:ring-offset-2
    relative overflow-hidden
  `;

  const wobbleAnimation = wobble ? 'animate-wiggle' : '';

  // Enhanced motion variants for neobrutalism
  const buttonVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.02,
      rotate: -1,
      transition: { type: "spring" as const, stiffness: 400, damping: 10 }
    },
    tap: {
      scale: 0.95,
      rotate: 0,
      transition: { type: "spring" as const, stiffness: 600, damping: 15 }
    }
  };

  const buttonContent = (
    <motion.span
      className="flex items-center gap-2 relative z-10"
      initial={{ x: 0 }}
      whileHover={{ x: 2 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${wobbleAnimation} ${className}`}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${wobbleAnimation} ${className}`}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      {...(props as any)}
    >
      {buttonContent}
    </motion.button>
  );
};
