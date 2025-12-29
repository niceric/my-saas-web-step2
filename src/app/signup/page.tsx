'use client'

import { signup } from '../login/actions'
import Link from 'next/link'
import { Navigation } from '@/src/components/navigation'
import { SubmitButton } from '@/src/components/ui/submit-button'
import { ErrorMessage } from '@/src/components/ui/error-message'
import { FieldError } from '@/src/components/ui/field-error'
import { styles } from '@/lib/styles'
import { useActionState } from 'react'
import type { ActionResponse } from '../login/actions'

export default function SignupPage() {
  const [state, formAction] = useActionState<ActionResponse | undefined, FormData>(signup, undefined)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navigation />

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

          <ErrorMessage message={state?.error} />

          <form action={formAction} className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="full_name" className="sr-only">Full Name</label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  autoComplete="name"
                  required
                  className={`${styles.input.base} ${styles.input.roundedTop}`}
                  placeholder="Full Name"
                />
                <FieldError errors={state?.fieldErrors?.full_name} />
              </div>

              <div>
                <label htmlFor="age" className="sr-only">Age</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  min="13"
                  max="120"
                  className={styles.input.base}
                  placeholder="Age"
                />
                <FieldError errors={state?.fieldErrors?.age} />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={styles.input.base}
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
                  autoComplete="new-password"
                  required
                  className={`${styles.input.base} ${styles.input.roundedBottom}`}
                  placeholder="Password (min 8 characters)"
                />
                <FieldError errors={state?.fieldErrors?.password} />
              </div>
            </div>

            <SubmitButton className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
              Sign up
            </SubmitButton>
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
