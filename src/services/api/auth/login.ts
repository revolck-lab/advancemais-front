import apiClient from '../common/apiClient'

export const login = async (credentials: {
  cpfCnpj: string
  password: string
}) => {
  try {
    const response = await apiClient.post('/auth/login', credentials)
    // Retorna os dados da resposta
    return response.data
  } catch (error) {
    console.error('Erro ao realizar login:', error)
    throw error
  }
}
