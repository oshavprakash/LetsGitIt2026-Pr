import React from 'react';
import { motion } from 'framer-motion';
import { getContrastColor } from '../lib/colors';

interface ReviewCardProps {
  name: string;
  bio?: string;
  review: string;
  socialLink?: string;
  image?: { src: string; width: number; height: number; format: string } | string;
  index?: number;
  color?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  bio,
  review,
  socialLink,
  image,
  index = 0,
  color
}) => {
  // If no color is provided, default to white
  const cardBg = color || '#ffffff';
  const textColor = getContrastColor(cardBg);
  const isDark = textColor === 'white';

  // Stagger animation delay based on index
  const delay = index * 0.1;

  // Random rotation for "messy" brutalist look
  const rotations = [-2, 1, -1, 2, -1.5, 1.5, -2.5, 2.5];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 0 }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: rotation,
        transition: {
          duration: 0.5,
          delay,
          type: "spring",
          stiffness: 100
        }
      }}
      whileHover={{
        rotate: 0,
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <div
        className={`
          relative h-full
          border-4 border-black
          shadow-[6px_6px_0px_0px_black]
          hover:shadow-[10px_10px_0px_0px_black]
          transition-shadow duration-200
          flex flex-col
        `}
        style={{ backgroundColor: cardBg }}
      >
        {/* Card Header - NAME IS HERO */}
        <div
          className="p-4 md:p-6 border-b-4 border-black"
          style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
          }}
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            {image && (
              <motion.div
                className="w-14 h-14 md:w-16 md:h-16 shrink-0 border-3 border-black overflow-hidden bg-white"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <img
                  src={typeof image === 'string' ? image : image.src}
                  alt={name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            )}

            {/* Name & Bio */}
            <div className="min-w-0 flex-1">
              <h3
                className="text-xl md:text-2xl font-black uppercase leading-none tracking-tight truncate"
                style={{ color: isDark ? '#fff' : '#000' }}
              >
                {name}
              </h3>
              {bio && (
                <p
                  className="text-xs md:text-sm font-bold mt-1 opacity-70 truncate"
                  style={{ color: isDark ? '#fff' : '#000' }}
                >
                  {bio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Card Content - Review */}
        <div className="p-4 md:p-6 flex-grow flex flex-col">
          <p
            className="font-mono text-sm md:text-base leading-relaxed flex-grow"
            style={{ color: isDark ? '#fff' : '#000' }}
          >
            "{review}"
          </p>

          {/* Social Link */}
          {socialLink && (
            <motion.a
              href={socialLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                mt-4 self-start
                px-4 py-2
                text-xs font-black uppercase tracking-widest
                border-3 border-current
                transition-all duration-150
                hover:translate-x-[-2px] hover:translate-y-[-2px]
                hover:shadow-[4px_4px_0px_0px_currentColor]
                active:translate-x-[2px] active:translate-y-[2px]
                active:shadow-none
              `}
              style={{ color: isDark ? '#fff' : '#000' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Profile →
            </motion.a>
          )}
        </div>

        {/* Decorative Corner */}
        <div
          className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--accent)] border-2 border-black transform rotate-12"
          style={{ boxShadow: '2px 2px 0px 0px black' }}
        />
      </div>
    </motion.div>
  );
};
