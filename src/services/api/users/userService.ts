import { apiGet, apiPut } from '../common/apiHandler'

// Buscar perfil do usuário
export const getUserProfile = async () => {
  return await apiGet('/users/me')
}

// Atualizar dados do usuário
export const updateUserProfile = async (data: object) => {
  return await apiPut('/users/me', data)
}
