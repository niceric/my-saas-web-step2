import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '../login/actions'

export default async function Dashboard() {
  const supabase = await createClient()

  // 1. Get the user from the session
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Double-check: If something went wrong with middleware, kick them out
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-indigo-600">My SaaS</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {user.email}
              </span>
              <form action={signOut}>
                <button 
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg border-4 border-dashed border-gray-200 p-10 text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Welcome to your private dashboard!
              </h2>
              <p className="mt-2 text-gray-600">
                Your User ID is: <code className="bg-gray-100 px-2 py-1 rounded">{user.id}</code>
              </p>
              <p className="mt-4 text-sm text-gray-500">
                (This is Phase 1 complete. In Phase 2, your saved data will appear here.)
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}