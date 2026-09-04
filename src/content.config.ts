import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    outcomeHeadline: z.string(),
    company: z.string(),
    role: z.string(),
    year: z.string(),
    tags: z.array(z.string()),
    heroImage: z.string(),
    order: z.number(),
    summary: z.string(),
    sections: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
      }),
    ),
  }),
});

export const collections = { work };
