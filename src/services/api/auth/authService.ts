import apiClient from '../common/apiClient'

export interface LoginCredentials {
  login: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface PermissionResponse {
  message: string
}

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    '/api/auth/login',
    credentials
  )
  return response.data
}

export const validateToken = async (): Promise<{ message: string }> => {
  const response = await apiClient.get<{ message: string }>('/api/auth/welcome')
  return response.data
}

export const checkPermission = async (
  role: 'student' | 'teacher' | 'company' | 'admin'
): Promise<PermissionResponse> => {
  const response = await apiClient.get<PermissionResponse>(
    `/api/auth/permission/${role}`
  )
  return response.data
}
