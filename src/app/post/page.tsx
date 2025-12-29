'use client'

import Link from 'next/link'
import { createPost } from './actions'
import { SubmitButton } from '@/src/components/ui/submit-button'
import { ErrorMessage } from '@/src/components/ui/error-message'
import { FieldError } from '@/src/components/ui/field-error'
import { useActionState } from 'react'
import type { PostActionResponse } from './actions'

export default function PostPage() {
  const [state, formAction] = useActionState<PostActionResponse | undefined, FormData>(createPost, undefined)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Create a Post</h1>
        <p className="text-sm text-gray-600 mb-6">Share something with the community or keep it private</p>

        <ErrorMessage message={state?.error} />

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="content" className="sr-only">Post content</label>
            <textarea
              id="content"
              name="content"
              required
              maxLength={1000}
              className="w-full border border-gray-300 p-3 rounded-md h-32 focus:ring-2 focus:ring-indigo-600 focus:border-transparent resize-none"
              placeholder="Write something... (max 1000 characters)"
            />
            <FieldError errors={state?.fieldErrors?.content} />
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
            <input
              type="checkbox"
              id="is_public"
              name="is_public"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="is_public" className="text-sm text-gray-700 cursor-pointer select-none">
              📢 Post to Public Community Board
            </label>
          </div>

          <SubmitButton className="w-full bg-indigo-600 text-white py-2.5 rounded-md hover:bg-indigo-500 font-semibold">
            Save Post
          </SubmitButton>
        </form>

        <div className="mt-4 text-center">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
