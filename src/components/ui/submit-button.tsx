'use client'

import { useFormStatus } from 'react-dom'
import { styles } from '@/lib/styles'

interface SubmitButtonProps {
  children: React.ReactNode
  className?: string
  loadingText?: string
}

export function SubmitButton({
  children,
  className = styles.button.primary,
  loadingText = 'Loading...'
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
    >
      {pending ? loadingText : children}
    </button>
  )
}
