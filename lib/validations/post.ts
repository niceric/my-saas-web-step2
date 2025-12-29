import { z } from 'zod'

export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, 'Post content is required')
    .max(1000, 'Post content must be less than 1000 characters'),
  is_public: z.boolean().default(false),
})

export type CreatePostInput = z.infer<typeof createPostSchema>
