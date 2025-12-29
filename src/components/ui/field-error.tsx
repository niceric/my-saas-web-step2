interface FieldErrorProps {
  errors?: string[]
}

export function FieldError({ errors }: FieldErrorProps) {
  if (!errors || errors.length === 0) return null

  return (
    <div className="mt-1">
      {errors.map((error, index) => (
        <p key={index} className="text-sm text-red-600">
          {error}
        </p>
      ))}
    </div>
  )
}
