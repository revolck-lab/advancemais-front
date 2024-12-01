// src/services/api/common/apiClient.ts
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { getAuthToken } from './tokenService'

// Criação do cliente Axios com configurações globais
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Configuração do axios-retry
axiosRetry(apiClient, {
  // Número de tentativas
  retries: 3,
  // Atraso incremental (1s, 2s, 3s)
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => {
    // Repetir apenas para erros 5xx ou falhas de rede
    return error.response?.status >= 500 || !error.response
  },
})

// Interceptor de requisição
apiClient.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = {}
    }

    // Centraliza a lógica de obtenção do token
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    console.error('[API Request Error]', error)
    return Promise.reject(error)
  }
)

// Interceptor de resposta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento centralizado de erros
    const { response } = error
    if (response) {
      console.error(
        `[API Response Error] Status: ${response.status}, Data: ${response.data}`
      )
    } else {
      console.error('[Network Error]', error.message)
    }

    return Promise.reject(error)
  }
)

export default apiClient
