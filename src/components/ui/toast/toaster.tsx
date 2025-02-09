import React from 'react'
import { useToast } from '@/hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  toastVariants, // importado de toast.tsx (já exportado)
} from '@/components/ui/toast/toast'
import { CheckCircle, Info, AlertTriangle, XCircle } from 'lucide-react'

/**
 * Interface que representa cada toast retornado pelo hook.
 * Aqui permitimos que `variant` seja null.
 */
export interface ToasterToast {
  id: string
  variant?:
    | 'default'
    | 'destructive'
    | 'info'
    | 'success'
    | 'danger'
    | 'warning'
    | null
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  onClose?: () => void
  [key: string]: unknown
}

/**
 * Retorna o ícone apropriado conforme a variação do toast.
 */
const getIcon = (
  variant: 'default' | 'destructive' | 'info' | 'success' | 'danger' | 'warning'
) => {
  switch (variant) {
    case 'info':
      return <Info className="w-6 h-6 text-blue-500" />
    case 'success':
      return <CheckCircle className="w-6 h-6 text-green-500" />
    case 'danger':
    case 'destructive':
      return <XCircle className="w-6 h-6 text-red-500" />
    case 'warning':
      return <AlertTriangle className="w-6 h-6 text-yellow-500" />
    default:
      return null
  }
}

/**
 * Componente Toaster: mapeia os toasts e renderiza cada um com o estilo apropriado.
 */
export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map((toast: ToasterToast) => {
        // Se `variant` for null ou undefined, usamos 'default'
        const { id, variant, title, description, action, onClose, ...rest } =
          toast
        const effectiveVariant:
          | 'default'
          | 'destructive'
          | 'info'
          | 'success'
          | 'danger'
          | 'warning' = variant ?? 'default'

        return (
          <Toast
            key={id}
            {...rest}
            className={toastVariants({ variant: effectiveVariant })}
          >
            <div className="shrink-0 pr-2">{getIcon(effectiveVariant)}</div>
            <div className="flex-1">
              {title && (
                <ToastTitle className="text-sm font-medium">{title}</ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-xs mt-1">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action && <div className="ml-4">{action}</div>}
            <ToastClose onClick={onClose} className="opacity-100 transition" />
          </Toast>
        )
      })}
      <ToastViewport className="fixed top-6 right-6 z-[100] space-y-4" />
    </ToastProvider>
  )
}
