import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  isLoading?: boolean
  isFullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  isFullWidth = false,
  disabled,
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  const classes = [styles.button, styles[variant], isFullWidth ? styles.fullWidth : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      type={type}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? 'Aguarde...' : children}
    </button>
  )
}
