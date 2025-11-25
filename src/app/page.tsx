import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function LandingPage() {
  const supabase = await createClient()
  
  // Check if user is already logged in
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-white">
      {/* --- HEADER --- */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 font-bold text-2xl text-indigo-600">
              SuperSaaS
            </a>
          </div>
          <div className="flex flex-1 justify-end gap-x-6">
            {user ? (
              <Link href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
                Go to Dashboard <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                  Log in
                </Link>
                <Link href="/signup" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Build your SaaS <br /> Faster than ever.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              This is the Super SaaS website. Here we have some functions like creating accounts, saving data to Supabase, and posting messages.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {user ? (
                <Link
                  href="/dashboard"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Enter Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </Link>
                  <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                    Log in <span aria-hidden="true">→</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* --- FEATURES SECTION (Optional) --- */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to build your app
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}