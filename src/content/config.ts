import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.date(),
        author: z.string().default("Badri"),
    }),
});

export const collections = {
    blog: blogCollection,
};
