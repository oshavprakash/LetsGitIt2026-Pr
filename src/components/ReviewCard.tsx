import React from 'react';

interface ReviewCardProps {
  name: string;
  bio?: string;
  review: string;
  socialLink?: string;
  image?: { src: string; width: number; height: number; format: string } | string;
  index?: number;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  bio,
  review,
  socialLink,
  image,
  index = 0
}) => {
  // Random rotation for "messy" look, seeded by index
  const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';

  return (
    <div className={`
      relative bg-white border-4 border-black p-6
      shadow-[8px_8px_0px_0px_black] hover:shadow-[12px_12px_0px_0px_var(--accent)]
      transition-all duration-300 transform hover:-translate-y-2 hover:rotate-0
      ${rotation} flex flex-col gap-4 h-full
    `}>
      <div className="flex items-center gap-4 border-b-4 border-black pb-4">
        {image && (
          <div className="w-16 h-16 border-2 border-black overflow-hidden bg-gray-200 shrink-0">
             <img
               src={typeof image === 'string' ? image : image.src}
               alt={name}
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
             />
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold uppercase leading-none">{name}</h3>
          {bio && <p className="text-sm font-bold opacity-70 mt-1">{bio}</p>}
        </div>
      </div>

      <p className="font-mono text-lg flex-grow">"{review}"</p>

      {socialLink && (
        <a
          href={socialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold uppercase tracking-widest bg-black text-white px-2 py-1 inline-block self-start hover:bg-[var(--accent)] hover:text-black transition-colors"
        >
          View Profile {'->'}
        </a>
      )}
    </div>
  );
};
