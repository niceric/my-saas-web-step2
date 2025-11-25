import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function PostPage() {
  
  // Define the Server Action inside the component (Next.js feature)
  async function createPost(formData: FormData) {
    'use server'
    const content = formData.get('content') as string
    const supabase = await createClient()
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Insert into DB
    await supabase.from('posts').insert({
      user_id: user.id,
      content: content,
    })

    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4 text-black">Write a new message</h1>
        
        <form action={createPost} className="space-y-4">
          <textarea
            name="content"
            required
            className="w-full border p-2 rounded h-32 text-black"
            placeholder="What's on your mind?"
          />
          <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500">
            Post Message
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <Link href="/dashboard" className="text-gray-500 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}