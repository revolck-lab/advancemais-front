import apiClient from '../common/apiClient'

export const register = async (userData: {
  name: string
  email: string
  password: string
}) => {
  try {
    const response = await apiClient.post('/auth/register', userData)
    return response.data
  } catch (error) {
    console.error('Erro ao realizar registro:', error)
    throw error
  }
}
