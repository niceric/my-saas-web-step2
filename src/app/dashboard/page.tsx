import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '../login/actions'
import Link from 'next/link'

export default async function Dashboard() {
  const supabase = await createClient()

  // 1. Check User Logged In
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // 2. Fetch User's Profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // 3. Fetch Balance (THE FIX IS HERE)
  // We use @ts-ignore because we haven't generated the TS definitions for our SQL function yet.
  // @ts-ignore
  const { data: balance } = await supabase.rpc('get_user_balance', { 
    target_user_id: user.id 
  })

  // 4. Fetch Public Posts
  const { data: posts } = await supabase
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

  // ... (Rest of your data filtering logic) ...
  const myPrivateNotes = posts?.filter((p: any) => p.user_id === user.id && !p.is_public) || []
  const publicPosts = posts?.filter((p: any) => p.is_public) || []

  return (
    <div className="min-h-screen bg-gray-50">
      
      <nav className="flex items-center justify-between p-6 lg:px-8 h-24 bg-white shadow-sm" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 font-bold text-2xl text-indigo-600">
            SuperSaaS
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            {/* @ts-ignore */}
            <p className="text-sm font-semibold text-gray-900">{profile?.full_name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
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
          
          {/* WELCOME CARD WITH CREDITS */}
          <div className="rounded-lg bg-white p-6 shadow sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900">
            {/* @ts-ignore */}
              Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}!
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="border p-4 rounded bg-gray-50">
                <p className="text-xs font-medium text-gray-500 uppercase">Your Age</p>
                {/* @ts-ignore */}
                <p className="text-2xl font-bold text-indigo-600">{profile?.age || '-'}</p>
              </div>

              {/* --- NEW CREDITS SECTION --- */}
              <div className="border p-4 rounded bg-gray-50">
                <p className="text-xs font-medium text-gray-500 uppercase">Credits</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold text-indigo-600">{balance ?? 0}</span>
                  <span className="text-xs text-gray-500">available</span>
                </div>
              </div>
              {/* --------------------------- */}

              <div className="border p-4 rounded bg-gray-50">
                <p className="text-xs font-medium text-gray-500 uppercase">Account Status</p>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mt-1">
                  Active Member
                </span>
              </div>
            </div>
          </div>

          {/* ... (Your existing Message Board Code) ... */}
           {/* 2. Public Message Board */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Community Board</h3>
              <Link 
                href="/post" 
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                + Post Message
              </Link>
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* COLUMN 1: MY PRIVATE NOTES */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">🔒 My Private Notes</h3>
              {myPrivateNotes.length === 0 && <p className="text-gray-400 italic">No private notes yet.</p>}
              
              {myPrivateNotes.map((post: any) => (
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
              
              {publicPosts.map((post: any) => (
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
        </div>
      </main>
    </div>
  )
}