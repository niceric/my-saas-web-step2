'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { loginSchema, signupSchema } from '@/lib/validations/auth'

export type ActionResponse = {
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function login(
  prevState: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse | undefined> {
  // 1. Validate input
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const parsed = loginSchema.safeParse(rawData)

  if (!parsed.success) {
    return {
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()

  // 2. Sign in with Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (error) {
    console.error('[Login Error]:', error.message)
    return {
      error: error.message === 'Invalid login credentials'
        ? 'Invalid email or password'
        : 'An error occurred during login. Please try again.',
    }
  }

  // 3. Refresh the cache and redirect
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(
  prevState: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse | undefined> {
  // 1. Validate input
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
    full_name: formData.get('full_name'),
    age: Number(formData.get('age')),
  }

  const parsed = signupSchema.safeParse(rawData)

  if (!parsed.success) {
    return {
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()

  // 2. Send to Supabase
  // We pass validated data inside the 'options.data' object.
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.full_name,
        age: parsed.data.age, // Now properly typed as number
      },
    },
  })

  if (error) {
    console.error('[Signup Error]:', error.message)
    return {
      error: error.message.includes('already registered')
        ? 'This email is already registered'
        : 'An error occurred during signup. Please try again.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}