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
  retries: 3, // Número de tentativas
  retryDelay: (retryCount) => retryCount * 1000, // Atraso incremental
  retryCondition: (error) => {
    return error.response?.status >= 500 || !error.response // Repetir apenas para erros 5xx ou falhas de rede
  },
})

// Interceptor de requisição
apiClient.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = {}
    }

    // Evita adicionar o token na rota de login
    if (config.url !== '/api/auth/login') {
      const token = getAuthToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
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
