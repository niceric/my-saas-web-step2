'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { createPostSchema } from '@/lib/validations/post'

export type PostActionResponse = {
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function createPost(
  prevState: PostActionResponse | undefined,
  formData: FormData
): Promise<PostActionResponse | undefined> {
  // 1. Validate input
  const rawData = {
    content: formData.get('content'),
    is_public: formData.get('is_public') === 'on',
  }

  const parsed = createPostSchema.safeParse(rawData)

  if (!parsed.success) {
    return {
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return {
      error: 'You must be logged in to create a post'
    }
  }

  // 2. Insert post
  const postData = {
    user_id: user.id,
    content: parsed.data.content,
    is_public: parsed.data.is_public,
  }

  // @ts-expect-error - Supabase types need to be generated with `supabase gen types typescript`
  const { error } = await supabase.from('posts').insert([postData])

  if (error) {
    console.error('[Create Post Error]:', error.message)
    return {
      error: 'An error occurred while creating your post. Please try again.',
    }
  }

  redirect('/dashboard')
}
