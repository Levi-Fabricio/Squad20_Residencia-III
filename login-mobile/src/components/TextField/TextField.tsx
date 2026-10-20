import type { InputHTMLAttributes } from 'react'
import styles from './TextField.module.scss'

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function TextField({
  id,
  label,
  error,
  className,
  ...props
}: TextFieldProps) {
  const fieldId = id ?? props.name
  const errorId = error && fieldId ? `${fieldId}-error` : undefined

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={fieldId}>
        {label}
      </label>
      <input
        id={fieldId}
        className={[styles.control, className].filter(Boolean).join(' ')}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        {...props}
      />
      {error ? (
        <p className={styles.error} id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
