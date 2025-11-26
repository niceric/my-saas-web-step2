import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '../login/actions'
import Link from 'next/link'

export default async function Dashboard() {
  const supabase = await createClient()

  // 1. Auth Check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 2. Fetch Profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // 3. Fetch ALL accessible posts (Private + Public)
  const { data: allPosts } = await supabase
    .from('posts')
    .select(`
      id, 
      content, 
      created_at, 
      is_public,
      user_id,
      profiles ( full_name )
    `)
    .order('created_at', { ascending: false })

  // 4. Separate them in JavaScript
  // Private = It belongs to me AND is_public is false
  const myPrivateNotes = allPosts?.filter(p => p.user_id === user.id && !p.is_public) || []
  
  // Public = is_public is true (Everyone's posts)
  const publicPosts = allPosts?.filter(p => p.is_public) || []

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* HEADER */}
      <nav className="flex items-center justify-between p-6 lg:px-8 h-18 bg-white shadow-sm" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 font-bold text-2xl text-indigo-600">
            SuperSaaS
          </Link>
        </div>
        <div className="flex items-center gap-4">
           {/* Mobile hide for cleanliness */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">{profile?.full_name}</p>
          </div>
          <form action={signOut}>
            <button className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Sign out
            </button>
          </form>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-8">
          
          {/* WELCOME / ACTION BAR */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <Link 
              href="/post" 
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              + Create Post
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* COLUMN 1: MY PRIVATE NOTES */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">🔒 My Private Notes</h3>
              {myPrivateNotes.length === 0 && <p className="text-gray-400 italic">No private notes yet.</p>}
              
              {myPrivateNotes.map((post) => (
                <div key={post.id} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 shadow-sm">
                  <p className="text-gray-800">{post.content}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>

            {/* COLUMN 2: PUBLIC BOARD */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-700 border-b pb-2">🌍 Community Board</h3>
              {publicPosts.length === 0 && <p className="text-gray-400 italic">The board is empty.</p>}
              
              {publicPosts.map((post) => (
                <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                  <p className="text-gray-800 text-lg">"{post.content}"</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-bold text-indigo-600">
                       {/* @ts-ignore */}
                      {post.profiles?.full_name || 'Anonymous'}
                    </span>
                    <span className="text-gray-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}