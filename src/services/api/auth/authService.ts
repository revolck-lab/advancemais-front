// src/services/api/auth/authService.ts

import apiClient from '../common/apiClient'

// Interface para login
export interface LoginCredentials {
  cpfCnpj: string
  password: string
}

// Interface para a resposta de login
export interface LoginResponse {
  token: string
}

// Interface para a resposta de role do usuário
export interface UserRoleResponse {
  role: 'student' | 'teacher' | 'company' | 'admin'
}

// Função para autenticar o usuário (login)
export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    '/api/auth/login',
    credentials
  )
  return response.data
}

// Função para obter a role do usuário autenticado
export const getUserRole = async (): Promise<UserRoleResponse> => {
  const response = await apiClient.get<UserRoleResponse>('/api/auth/welcome')
  return response.data
}

// Função para registrar um novo usuário
export const registerUser = async (data: {
  name: string
  email: string
  cpfCnpj: string
  password: string
}): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>(
    '/api/auth/register',
    data
  )
  return response.data
}

// Funções de validação por role
export const validateStudent = async (): Promise<{ valid: boolean }> => {
  const response = await apiClient.get<{ valid: boolean }>(
    '/api/auth/permission/student'
  )
  return response.data
}

export const validateTeacher = async (): Promise<{ valid: boolean }> => {
  const response = await apiClient.get<{ valid: boolean }>(
    '/api/auth/permission/teacher'
  )
  return response.data
}

export const validateCompany = async (): Promise<{ valid: boolean }> => {
  const response = await apiClient.get<{ valid: boolean }>(
    '/api/auth/permission/company'
  )
  return response.data
}

export const validateAdmin = async (): Promise<{ valid: boolean }> => {
  const response = await apiClient.get<{ valid: boolean }>(
    '/api/auth/permission/admin'
  )
  return response.data
}
