'use client'

import * as React from 'react'
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastProvider,
  ToastViewport,
} from '@/components/ui/toast/toast'
import { CheckCircle, Info, AlertTriangle } from 'lucide-react'

interface ToastShowbarProps {
  type: 'info' | 'success' | 'danger' | 'warning'
  title: string
  description: string
  action?: React.ReactNode
  onClose?: () => void
}

export const ToastShowbar: React.FC<ToastShowbarProps> = ({
  type,
  title,
  description,
  action,
  onClose,
}) => {
  const getStyles = () => {
    switch (type) {
      case 'info':
        return {
          icon: <Info className="text-blue-500 w-6 h-6" />,
          border: 'border-blue-500',
          background: 'bg-blue-50',
        }
      case 'success':
        return {
          icon: <CheckCircle className="text-green-500 w-6 h-6" />,
          border: 'border-green-500',
          background: 'bg-green-50',
        }
      case 'danger':
        return {
          icon: <AlertTriangle className="text-red-500 w-6 h-6" />,
          border: 'border-red-500',
          background: 'bg-red-50',
        }
      case 'warning':
        return {
          icon: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
          border: 'border-yellow-500',
          background: 'bg-yellow-50',
        }
      default:
        return {
          icon: null,
          border: '',
          background: '',
        }
    }
  }

  const { icon, border, background } = getStyles()

  return (
    <ToastProvider>
      <Toast
        className={`flex items-center gap-4 p-4 rounded-lg shadow-md ${border} ${background}`}
      >
        <div>{icon}</div>
        <div className="flex-1">
          <ToastTitle className="text-base font-semibold">{title}</ToastTitle>
          <ToastDescription className="text-sm text-gray-700">
            {description}
          </ToastDescription>
        </div>
        {action && <div>{action}</div>}
        <ToastClose
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 transition"
        />
      </Toast>
      {/* Ajustando o viewport para o canto superior direito */}
      <ToastViewport className="fixed top-4 right-4 z-[100] space-y-4" />
    </ToastProvider>
  )
}
