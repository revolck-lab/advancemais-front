import apiClient from '../common/apiClient'

export const getAboutContent = async () => {
  try {
    const response = await apiClient.get('/website/about')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar conteúdo da página sobre:', error)
    throw error
  }
}
