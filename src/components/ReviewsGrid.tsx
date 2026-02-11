import React, { useMemo } from "react";
import { ReviewCard } from "./ReviewCard";

interface ReviewData {
  name: string;
  bio?: string;
  review: string;
  socialLink?: string;
  image?:
    | { src: string; width: number; height: number; format: string }
    | string;
  color?: string;
  insta?: string;
}

interface ReviewsGridProps {
  reviews: ReviewData[];
}

export const ReviewsGrid: React.FC<ReviewsGridProps> = ({ reviews }) => {
  // Shuffle reviews on each client render (random on every page load)
  const shuffledReviews = useMemo(() => {
    const shuffled = [...reviews];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  if (reviews.length === 0) {
    return (
      <div className="text-center">
        <div
          className="
            inline-block
            font-mono text-lg md:text-xl 
            border-4 border-black 
            p-6 md:p-10 
            bg-white 
            max-w-lg 
            shadow-[8px_8px_0px_0px_black]
            hover:shadow-[12px_12px_0px_0px_var(--accent)]
            transition-all duration-300
          "
        >
          <p className="font-black text-2xl md:text-3xl mb-4">Be The First!</p>
          <p className="opacity-80">
            No Reviews yet. Fork the repo and submit your PR!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
      {shuffledReviews.map((review, index) => (
        <ReviewCard
          key={`${review.name}-${index}`}
          name={review.name}
          bio={review.bio}
          review={review.review}
          socialLink={review.socialLink}
          image={review.image}
          color={review.color}
          insta={review.insta}
          index={index}
        />
      ))}
    </div>
  );
};
