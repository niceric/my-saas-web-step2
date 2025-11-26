import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function PostPage() {
  
  async function createPost(formData: FormData) {
    'use server'
    const content = formData.get('content') as string
    // Checkboxes send 'on' if checked, or null if unchecked
    const isPublic = formData.get('is_public') === 'on'
    
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('posts').insert({
      user_id: user.id,
      content: content,
      is_public: isPublic, // <--- Saving the choice
    })

    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* (Optional: Add the Header here too if you want consistency) */}
      
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Create a Post</h1>
        
        <form action={createPost} className="space-y-4">
          <textarea
            name="content"
            required
            className="w-full border p-2 rounded h-32"
            placeholder="Write something..."
          />
          
          {/* --- NEW CHECKBOX --- */}
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="is_public" 
              name="is_public" 
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="is_public" className="text-sm text-gray-700">
              Post to Public Community Board?
            </label>
          </div>
          {/* -------------------- */}

          <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500">
            Save Post
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <Link href="/dashboard" className="text-gray-500 hover:underline">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}