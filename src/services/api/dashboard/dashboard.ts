import apiClient from '../common/apiClient'

export const getDashboardData = async () => {
  try {
    const response = await apiClient.get('/dashboard/data')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error)
    throw error
  }
}
