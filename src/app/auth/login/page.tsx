'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input/input'
import { Checkbox, Button } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  login,
  validateToken,
  checkPermission,
} from '@/services/api/auth/authService'

// Logo
import Logo from '/public/images/logo_branco.webp'

const LoginPage: React.FC = () => {
  const [value, setValue] = useState('')
  const [hasError, setHasError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const applyMask = (value: string): string => {
    const numericValue = value.replace(/\D/g, '')
    if (numericValue.length <= 11) {
      return numericValue.replace(
        /(\d{3})(\d{0,3})(\d{0,3})(\d{0,2})/,
        (_, g1, g2, g3, g4) =>
          `${g1}${g2 ? `.${g2}` : ''}${g3 ? `.${g3}` : ''}${g4 ? `-${g4}` : ''}`
      )
    } else {
      return numericValue.replace(
        /(\d{2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/,
        (_, g1, g2, g3, g4, g5) =>
          `${g1}${g2 ? `.${g2}` : ''}${g3 ? `.${g3}` : ''}${
            g4 ? `/${g4}` : ''
          }${g5 ? `-${g5}` : ''}`
      )
    }
  }

  const handleCpfCnpjChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue = e.target.value
    const numericValue = inputValue.replace(/\D/g, '').slice(0, 14)
    const formattedValue = applyMask(numericValue)

    setValue(formattedValue)

    if (numericValue.length !== 11 && numericValue.length !== 14) {
      setHasError(true)
    } else {
      setHasError(false)
    }
  }

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    if (!value || !password) {
      setHasError(!value)
      setPasswordError(!password)
      setError('Por favor, preencha todos os campos.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formattedLogin = value.replace(/\D/g, '')
      const loginResponse = await login({ login: formattedLogin, password })
      console.log('Resposta do login:', loginResponse)
      localStorage.setItem('authToken', loginResponse.token)

      const welcomeResponse = await validateToken()
      console.log('Validação do token:', welcomeResponse.message)

      const roles = ['admin', 'company', 'teacher', 'student']

      for (const role of roles) {
        try {
          const permissionResponse = await checkPermission(
            role as 'admin' | 'company' | 'teacher' | 'student'
          )
          console.log(`Permissão para ${role}:`, permissionResponse.message)

          // Redirecionar com base na role
          if (role === 'admin') {
            router.push('/dashboard/admin')
            return
          } else if (role === 'company') {
            router.push('/dashboard/company')
            return
          } else if (role === 'teacher') {
            router.push('/dashboard/teacher')
            return
          } else if (role === 'student') {
            router.push('/dashboard/student')
            return
          }
        } catch (err: unknown) {
          // Substituí `any` por `unknown`
          if (
            typeof err === 'object' &&
            err !== null &&
            'response' in err &&
            typeof (err as { response?: { status?: number } }).response ===
              'object' &&
            (err as { response?: { status?: number } }).response?.status === 403
          ) {
            console.warn(`Sem permissão para ${role}.`)
          } else {
            console.error(`Erro inesperado para ${role}:`, err)
          }
        }
      }

      setError('Nenhuma permissão válida encontrada.')
    } catch (error: unknown) {
      console.error('Erro no login:', error)
      setError('Falha no login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = (): void => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-900 to-gray-900">
      <div className="flex flex-1 flex-col items-center justify-center">
        <Image src={Logo} alt="Logo Advance+" className="mb-10 w-52" />
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
          <form onSubmit={handleLogin}>
            <div className="text-left relative mb-5">
              <label
                htmlFor="cpfCnpj"
                className="block font-normal text-sm text-neutral-900"
              >
                CPF ou CNPJ
                <span className="text-red-500 font-black ml-1">*</span>
              </label>
              <div className="mt-2 relative">
                <Input
                  value={value}
                  onChange={handleCpfCnpjChange}
                  placeholder="Digite seu CPF ou CNPJ"
                  type="text"
                  hasError={hasError}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                {hasError && (
                  <p className="text-red-600 text-sm mt-2">
                    Por favor, insira um CPF ou CNPJ válido.
                  </p>
                )}
              </div>
            </div>

            <div className="text-left relative mb-5">
              <label
                htmlFor="password"
                className="block font-normal text-sm text-neutral-900"
              >
                Senha
                <span className="text-red-500 font-black ml-1">*</span>
              </label>
              <div className="relative w-full mt-2">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  type={passwordVisible ? 'text' : 'password'}
                  hasError={passwordError}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-blue-500 text-sm font-semibold"
                >
                  {passwordVisible ? 'Ocultar' : 'Exibir'}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-600 text-sm mt-2">
                  A senha deve ter no mínimo 6 caracteres.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <Checkbox value="remember" size="md" color="primary" radius="sm">
                Me mantenha conectado
              </Checkbox>
              <a
                href="#"
                className="block font-normal text-sm text-neutral-600 hover:text-neutral-900 focus:underline focus:outline-none"
              >
                Esqueceu sua senha?
              </a>
            </div>

            {error && <p className="text-red-500 text-sm mb-5">{error}</p>}

            <Button
              type="submit"
              color="primary"
              radius="sm"
              size="lg"
              fullWidth
              className="py-3"
              isLoading={loading}
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>

      <footer className="bg-white text-center text-xs py-6">
        <p className="mb-1 flex justify-center space-x-4">
          <a href="#" className="hover:underline text-gray-500">
            Política de Privacidade
          </a>
          <span className="text-gray-200">•</span>
          <a href="#" className="hover:underline text-gray-500">
            Termos de Uso
          </a>
          <span className="text-gray-200">•</span>
          <a href="#" className="hover:underline text-gray-500">
            Contrato de Assinatura
          </a>
          <span className="text-gray-200">•</span>
          <a href="#" className="hover:underline text-gray-500">
            Preferências de cookies
          </a>
        </p>
        <p className="text-gray-500 mt-3">
          O Advance+ LTDA CNPJ nº 00.000.000/0001-97, com Sede na Av. Juca
          Sampaio, 2247 - Sala 30 - Feitosa, Maceió - AL, 57040-600 Todos os
          Direitos Reservados AdvanceMais
        </p>
      </footer>
    </div>
  )
}

export default LoginPage
