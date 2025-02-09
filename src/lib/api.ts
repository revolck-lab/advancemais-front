// src/lib/api.ts
import axios from 'axios'

/**
 * Lê a baseURL do .env. Caso não exista, use 'http://localhost:3000' como fallback.
 */
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'

export const api = axios.create({
  baseURL,
  timeout: 10000,
})

// Interceptor para inserir "Bearer <token>" no header de cada request
api.interceptors.request.use((config) => {
  // Garante que não estamos no lado do servidor do Next
  if (typeof window !== 'undefined') {
    const token =
      localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})
