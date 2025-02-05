// src/hooks/use-toast.ts
'use client'

import * as React from 'react'

// Tipos importados do seu toast principal:
import type {
  ToastActionElement,
  ToastProps,
} from '@/components/ui/toast/toast'

/**
 * Limite máximo de toasts
 */
const TOAST_LIMIT = 1

/**
 * Tempo (ms) para remover definitivamente o toast após "dismiss"
 */
const TOAST_REMOVE_DELAY = 1000000

/**
 * Define as props internas do toast (com ID)
 */
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

/**
 * Objeto com as constantes de ação (como se fosse um enum)
 */
const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const

/**
 * Cria um tipo que representa cada valor do actionTypes
 */
type ActionType = typeof actionTypes

/**
 * Definição de cada Action possível no reducer
 */
type Action =
  | {
      type: ActionType['ADD_TOAST']
      toast: ToasterToast
    }
  | {
      type: ActionType['UPDATE_TOAST']
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType['DISMISS_TOAST']
      toastId?: ToasterToast['id']
    }
  | {
      type: ActionType['REMOVE_TOAST']
      toastId?: ToasterToast['id']
    }

/**
 * Estado do reducer
 */
interface State {
  toasts: ToasterToast[]
}

/**
 * Map para controlar os timeouts de cada toast
 */
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

/**
 * Adiciona o toastId a uma fila para remoção definitiva após o tempo definido
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * Reducer principal
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      // Adiciona na fila de remoção
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        // Se não tiver toastId, dismiss de todos
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }

    case actionTypes.REMOVE_TOAST:
      // Remove definitivamente
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

/**
 * Lista de funções "ouvintes" do estado
 */
const listeners: Array<(state: State) => void> = []

/**
 * Estado em memória
 */
let memoryState: State = { toasts: [] }

/**
 * Dispara uma ação no reducer e notifica todos os listeners
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

/**
 * Gera IDs autoincrementais
 */
let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

/**
 * Tipo base do toast (sem ID)
 */
type Toast = Omit<ToasterToast, 'id'>

/**
 * Função principal para exibir um toast
 */
function toast({ ...props }: Toast) {
  const id = genId()

  // Permite atualizar as props de um toast existente
  const update = (newProps: Partial<ToasterToast>) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...newProps, id },
    })

  // Fecha o toast
  const dismiss = () =>
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })

  // Adiciona o toast
  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      // Quando o toast fechar, disparar o dismiss
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id,
    dismiss,
    update,
  }
}

/**
 * Hook que expõe o estado atual e funções para disparar/dismiss
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) =>
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  }
}

export { useToast, toast }
