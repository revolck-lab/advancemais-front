// hooks/use-auth.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  email: string
  name?: string
  id?: string
}

interface AuthState {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
}

interface LoginCredentials {
  email: string
  senha: string
}

interface RegisterData {
  nome: string
  email: string
  telefone: string
  senha: string
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoggedIn: false,
    isLoading: true,
  })
  const router = useRouter()

  const checkAuthStatus = useCallback(() => {
    try {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      const userEmail = localStorage.getItem('userEmail')
      const authToken = localStorage.getItem('authToken')

      if (isLoggedIn && userEmail && authToken) {
        setAuthState({
          user: { email: userEmail },
          isLoggedIn: true,
          isLoading: false,
        })
      } else {
        setAuthState({
          user: null,
          isLoggedIn: false,
          isLoading: false,
        })
      }
    } catch (authError) {
      console.error('Erro ao verificar status de autenticação:', authError)
      setAuthState({
        user: null,
        isLoggedIn: false,
        isLoading: false,
      })
    }
  }, [])

  // Verificar se há sessão ativa - FIXED: incluir checkAuthStatus nas dependências
  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  const login = useCallback(
    async (
      credentials: LoginCredentials
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        // Simular verificação de credenciais (substituir por API real)
        const validCredentials =
          credentials.email === '12345617801' &&
          credentials.senha === 'Revolck321@'

        if (validCredentials) {
          const user = { email: credentials.email }
          const token = `fake-jwt-token-${Date.now()}`

          // Salvar no localStorage
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('userEmail', credentials.email)
          localStorage.setItem('authToken', token)

          // Atualizar estado
          setAuthState({
            user,
            isLoggedIn: true,
            isLoading: false,
          })

          return { success: true }
        } else {
          return {
            success: false,
            error: 'Email ou senha incorretos',
          }
        }
      } catch (error) {
        console.error('Erro no login:', error)
        return {
          success: false,
          error: 'Erro interno. Tente novamente.',
        }
      }
    },
    []
  )

  const register = useCallback(
    async (
      data: RegisterData
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        // Simular criação de conta (substituir por API real)
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Simular sucesso na criação
        const user = {
          email: data.email,
          name: data.nome,
        }
        const token = `fake-jwt-token-${Date.now()}`

        // Salvar no localStorage
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', data.email)
        localStorage.setItem('authToken', token)

        // Atualizar estado
        setAuthState({
          user,
          isLoggedIn: true,
          isLoading: false,
        })

        return { success: true }
      } catch (registerError) {
        console.error('Erro no registro:', registerError)
        return {
          success: false,
          error: 'Erro ao criar conta. Tente novamente.',
        }
      }
    },
    []
  )

  const logout = useCallback(() => {
    // Limpar localStorage
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('authToken')

    // Atualizar estado
    setAuthState({
      user: null,
      isLoggedIn: false,
      isLoading: false,
    })

    // Redirecionar para home
    router.push('/')
  }, [router])

  const redirectToDashboard = useCallback(() => {
    // Garantir que há token válido
    const token = localStorage.getItem('authToken')
    if (token) {
      router.push('/dashboard/estudante')
    } else {
      console.error('Token não encontrado')
    }
  }, [router])

  return {
    ...authState,
    login,
    register,
    logout,
    redirectToDashboard,
    checkAuthStatus,
  }
}

// Hook auxiliar para proteger rotas
export function useAuthGuard(redirectTo: string = '/') {
  const { isLoggedIn, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push(redirectTo)
    }
  }, [isLoggedIn, isLoading, router, redirectTo])

  return { isLoggedIn, isLoading }
}

// Simulação da estrutura de resposta da API
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Funções auxiliares para integração com API real (quando disponível)
export const authAPI = {
  // Login
  login: async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      )

      const data = await response.json()

      if (response.ok) {
        return { success: true, data }
      } else {
        return { success: false, error: data.message || 'Erro no login' }
      }
    } catch (loginError) {
      console.error('Erro de conexão no login:', loginError)
      return { success: false, error: 'Erro de conexão' }
    }
  },

  // Registro
  register: async (
    userData: RegisterData
  ): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      )

      const data = await response.json()

      if (response.ok) {
        return { success: true, data }
      } else {
        return { success: false, error: data.message || 'Erro no registro' }
      }
    } catch (registerError) {
      console.error('Erro de conexão no registro:', registerError)
      return { success: false, error: 'Erro de conexão' }
    }
  },

  // Verificar token
  verifyToken: async (token: string): Promise<ApiResponse<{ user: User }>> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()

      if (response.ok) {
        return { success: true, data }
      } else {
        return { success: false, error: data.message || 'Token inválido' }
      }
    } catch (verifyError) {
      console.error('Erro de conexão na verificação:', verifyError)
      return { success: false, error: 'Erro de conexão' }
    }
  },
}

// Tipos export para uso em outros componentes
export type { User, AuthState, LoginCredentials, RegisterData }