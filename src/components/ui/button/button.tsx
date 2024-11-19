import React from 'react'
import styles from './button.module.css'

type ButtonVariant = 'plain' | 'gray' | 'tinted' | 'filled'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'plain',
  size = 'medium',
  className = '',
  ...props
}) => {
  const classNames = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  )
}
