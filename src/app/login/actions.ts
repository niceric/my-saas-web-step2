'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // 1. Get data from the form
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 2. Sign in with Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // In a real app, you'd return the error to the UI
    console.error(error)
    return redirect('/login?error=Could not authenticate user')
  }

  // 3. Refresh the cache and redirect
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // 1. Get standard Auth data
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  // 2. Get the new Profile data
  const fullName = formData.get('full_name') as string
  const age = formData.get('age') as string

  // 3. Send to Supabase
  // We pass 'fullName' and 'age' inside the 'options.data' object.
  // The SQL Trigger we wrote in Step 1 will look for these EXACT keys.
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        age: age,
      },
    },
  })

  if (error) {
    console.error(error)
    return redirect('/login?error=Could not create user')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}