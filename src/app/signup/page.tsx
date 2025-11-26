import { signup } from '../login/actions'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      
      {/* --- HEADER (Exact copy from Landing Page) --- */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8 h-18" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 font-bold text-2xl text-indigo-600">
              SuperSaaS
            </Link>
          </div>
        </nav>
      </header>
      {/* --------------------------------------------- */}

      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Create an Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us to get started
            </p>
          </div>
          
          <form className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md shadow-sm">
              {/* Full Name */}
              <div>
                <label htmlFor="full_name" className="sr-only">Full Name</label>
                <input
                  id="full_name"
                  name="full_name" 
                  type="text"
                  required
                  className="relative block w-full rounded-t-md border-0 p-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Full Name"
                />
              </div>
              {/* Age */}
              <div>
                <label htmlFor="age" className="sr-only">Age</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  className="relative block w-full border-0 p-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Age"
                />
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="relative block w-full border-0 p-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              {/* Password */}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="relative block w-full rounded-b-md border-0 p-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <button
              formAction={signup}
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Sign up
            </button>
          </form>

          <div className="text-center text-sm">
            <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}