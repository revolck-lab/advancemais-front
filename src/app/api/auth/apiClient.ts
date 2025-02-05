// src/app/api/auth/apiClient.ts

import { api } from '@/lib/api'
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from './apiTypes'

/**
 * POST /api/auth/login
 * Recebe { login, password } e retorna { token }
 */
export async function loginUser(params: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/api/auth/login', params)
  return response.data
}

/**
 * POST /api/auth/register
 * Recebe dados de cadastro e retorna o usuário recém-criado
 */
export async function registerUser(
  params: RegisterRequest
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>(
    '/api/auth/register',
    params
  )
  return response.data
}
