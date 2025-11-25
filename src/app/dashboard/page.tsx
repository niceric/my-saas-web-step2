import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '../login/actions'
import Link from 'next/link'

export default async function Dashboard() {
  const supabase = await createClient()

  // 1. Get User
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 2. Fetch Profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // 3. Fetch Posts (New!)
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <h1 className="text-xl font-bold text-indigo-600">My SaaS</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{profile?.full_name}</span>
              <form action={signOut}><button className="text-sm text-red-600">Sign out</button></form>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          
          {/* Action Button */}
          <div className="flex justify-end">
            <Link href="/post" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">
              + New Message
            </Link>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-4">
            {posts?.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-800">{post.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>
            ))}
            
            {posts?.length === 0 && (
              <p className="text-center text-gray-500">No messages yet. Write one!</p>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}