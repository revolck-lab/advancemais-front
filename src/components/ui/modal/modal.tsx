// src/components/ui/modal/modal.tsx
'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export interface ModalProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Root> {
  /** Controla se o modal está aberto ou fechado */
  open: boolean
  /** Callback disparado ao alterar o estado do modal */
  onOpenChange: (open: boolean) => void
  /** Título opcional do modal */
  title?: React.ReactNode
  /** Conteúdo do modal */
  children: React.ReactNode
}

/**
 * Componente Modal genérico com efeito vidro sutil.
 *
 * - O overlay cobre toda a tela com um fundo mais escuro (efeito vidro) e aplica blur.
 * - A modal não fecha ao clicar fora dela.
 * - Um botão de fechar (X) é exibido no canto superior direito para fechar a modal.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  children,
  ...props
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} {...props}>
      <Dialog.Portal>
        {/* Overlay cobrindo toda a tela com efeito vidro mais escuro */}
        <Dialog.Overlay className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut" />
        {/* Conteúdo centralizado com botão de fechar */}
        <Dialog.Content
          onPointerDownOutside={(event) => event.preventDefault()}
          className={cn(
            'fixed top-1/2 left-1/2 z-[99999] max-h-[85vh] w-full max-w-md -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-md bg-white p-6 shadow-lg',
            'data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut'
          )}
        >
          {/* Botão de fechar (X) */}
          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full p-1 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </Dialog.Close>
          {title && (
            <Dialog.Title className="mb-4 text-lg font-bold">
              {title}
            </Dialog.Title>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
