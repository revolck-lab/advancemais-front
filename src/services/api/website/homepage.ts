import apiClient from '../common/apiClient'

export const getHomepageContent = async () => {
  try {
    const response = await apiClient.get('/website/homepage')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar conteúdo da homepage:', error)
    throw error
  }
}
