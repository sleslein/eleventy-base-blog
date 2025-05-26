import { defineCollection, z } from 'astro:content';

// Define a schema for post collections
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    author: z.string().optional(),
  }),
});

// Export collections to register them in Astro
export const collections = {
  'posts': postsCollection,
};