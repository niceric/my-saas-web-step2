'use client'

import { login } from './actions'
import Link from 'next/link'
import { Navigation } from '@/src/components/navigation'
import { SubmitButton } from '@/src/components/ui/submit-button'
import { ErrorMessage } from '@/src/components/ui/error-message'
import { FieldError } from '@/src/components/ui/field-error'
import { styles } from '@/lib/styles'
import { useActionState } from 'react'
import type { ActionResponse } from './actions'

export default function LoginPage() {
  const [state, formAction] = useActionState<ActionResponse | undefined, FormData>(login, undefined)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navigation />

      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your account
            </p>
          </div>

          <ErrorMessage message={state?.error} />

          <form action={formAction} className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`${styles.input.base} ${styles.input.roundedTop}`}
                  placeholder="Email address"
                />
                <FieldError errors={state?.fieldErrors?.email} />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`${styles.input.base} ${styles.input.roundedBottom}`}
                  placeholder="Password"
                />
                <FieldError errors={state?.fieldErrors?.password} />
              </div>
            </div>

            <SubmitButton className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
              Log in
            </SubmitButton>
          </form>

          <div className="text-center text-sm">
            <Link href="/signup" className="text-indigo-600 hover:text-indigo-500">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
