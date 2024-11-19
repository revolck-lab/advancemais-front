import * as React from 'react'
import { cn } from '@/lib/utils'
import Styles from './input.module.css'

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean } // Para controlar o estado de erro
>(({ className, type, hasError, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full text-sm text-gray-800 placeholder:text-gray-500 bg-transparent focus:outline-none transition-all',
        Styles['input-rounded'],
        hasError && Styles['error'],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
