import { defineCollection, z } from 'astro:content';

const reviewsCollection = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    bio: z.string().optional(),
    review: z.string(),
    socialLink: z.string().url().optional(),
    image: image().optional(),
  }),
});

export const collections = {
  reviews: reviewsCollection,
};
