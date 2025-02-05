// src/app/api/auth/apiTypes.ts

/** Dados enviados no body para login (ex.: POST /api/auth/login) */
export interface LoginRequest {
  login: string // CPF ou CNPJ
  password: string
}

/** Resposta padrão do login (ex.: { token: string }) */
export interface LoginResponse {
  token: string
}

/** Dados enviados no body para registro (ex.: POST /api/auth/register) */
export interface RegisterRequest {
  name: string
  email: string
  password: string
  birth_date?: string
  cpf?: string
  phone_user?: string
  gender_id?: number
  education_id?: number
  role_id?: number
  address?: string
  city?: string
  state?: string
  cep?: string
}

/** Resposta padrão do registro (ex.: { id, name, email... }) */
export interface RegisterResponse {
  id: number
  name: string
  email: string
  // etc. Ajuste conforme seu backend.
}
