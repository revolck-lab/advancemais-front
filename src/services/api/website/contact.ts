import apiClient from '../common/apiClient'

export const sendContactForm = async (formData: {
  name: string
  email: string
  message: string
}) => {
  try {
    const response = await apiClient.post('/website/contact', formData)
    return response.data
  } catch (error) {
    console.error('Erro ao enviar formulário de contato:', error)
    throw error
  }
}
