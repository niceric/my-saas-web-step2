import Link from 'next/link'
import type { User } from '@supabase/supabase-js'

interface NavigationProps {
  showAuthButtons?: boolean
  user?: User | null
  children?: React.ReactNode
}

export function Navigation({ showAuthButtons = false, user, children }: NavigationProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8 h-18" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 font-bold text-2xl text-indigo-600">
            SuperSaaS
          </Link>
        </div>

        {showAuthButtons && (
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
        )}

        {children}
      </nav>
    </header>
  )
}
