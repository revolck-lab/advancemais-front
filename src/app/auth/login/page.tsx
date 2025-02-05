// src/app/auth/login/page.tsx

'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Checkbox, Button } from '@nextui-org/react'
import { Input } from '@/components/ui/input/input'
import { useIsMobile } from '@/hooks/use-mobile'
import { useToast } from '@/hooks/use-toast'
import { loginUser } from '@/app/api/auth/apiClient'

import { AxiosError } from 'axios'

import Logo from '/public/images/logo_branco.webp'
import Styles from './loginpage.module.css'

const LoginPage: React.FC = () => {
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useIsMobile()

  // Estados locais
  const [value, setValue] = useState('')
  const [hasError, setHasError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simula splash de carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  /**
   * Máscara simples de CPF/CNPJ
   */
  const applyMask = (raw: string): string => {
    const numeric = raw.replace(/\D/g, '')
    if (numeric.length <= 11) {
      // CPF -> 999.999.999-99
      return numeric.replace(
        /(\d{3})(\d{0,3})(\d{0,3})(\d{0,2})/,
        (_, g1, g2, g3, g4) =>
          `${g1}${g2 ? `.${g2}` : ''}${g3 ? `.${g3}` : ''}${g4 ? `-${g4}` : ''}`
      )
    } else {
      // CNPJ -> 99.999.999/9999-99
      return numeric.replace(
        /(\d{2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/,
        (_, g1, g2, g3, g4, g5) =>
          `${g1}${g2 ? `.${g2}` : ''}${g3 ? `.${g3}` : ''}` +
          `${g4 ? `/${g4}` : ''}${g5 ? `-${g5}` : ''}`
      )
    }
  }

  /**
   * Lida com a digitação do CPF/CNPJ
   */
  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const numericValue = inputValue.replace(/\D/g, '').slice(0, 14)
    const formattedValue = applyMask(numericValue)

    setValue(formattedValue)

    // Se não tem 11 (CPF) ou 14 (CNPJ), marcamos como erro
    if (numericValue.length !== 11 && numericValue.length !== 14) {
      setHasError(true)
    } else {
      setHasError(false)
    }
  }

  /**
   * Lida com alteração de senha
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value
    setPassword(inputPassword)
    setPasswordError(inputPassword.length < 6)
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  /**
   * SUBMIT do form de Login
   * - Faz chamada API
   * - Exibe toasts conforme resposta
   * - Armazena token no localStorage e cookie
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const numericValue = value.replace(/\D/g, '')
      const response = await loginUser({
        login: numericValue,
        password: password.trim(),
      })

      // Se a API retornar token => sucesso
      if (response?.token) {
        toast({
          title: 'Login bem-sucedido!',
          description: 'Você está conectado(a) ao Advance+. Bem-vindo(a)!',
          variant: 'default', // ou 'success', dependendo do seu setup
        })

        // 1) Salva no localStorage (se precisar usar no Axios interceptors)
        localStorage.setItem('authToken', response.token)

        // 2) Define o cookie para que o middleware possa ler
        //    (para fins de exemplo, não httpOnly)
        document.cookie = `authToken=${response.token}; Path=/; Max-Age=86400; SameSite=Lax`

        // Redireciona
        router.push('/dashboard')
      } else {
        // Resposta inesperada da API (sem token)
        toast({
          title: 'Erro inesperado',
          description: 'Não foi possível concluir o login. Tente novamente.',
          variant: 'destructive',
        })
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Erro HTTP via Axios (status 401, etc.)
        const status = error.response?.status
        const errorMsg = error.response?.data?.error || ''

        if (status === 401 && errorMsg === 'Invalid credentials') {
          // CPF/CNPJ existe, mas senha está errada
          toast({
            title: 'Senha incorreta',
            description:
              'Ops, parece que sua senha não confere. Por favor, tente novamente ou recupere sua senha.',
            variant: 'destructive',
          })
        } else if (status === 401 && errorMsg === 'User not found') {
          // Nenhum usuário com esse CPF/CNPJ
          toast({
            title: 'Usuário não cadastrado',
            description:
              'Não encontramos uma conta com este CPF/CNPJ. Verifique seus dados ou faça seu cadastro.',
            variant: 'destructive',
          })
        } else {
          // Erro genérico
          toast({
            title: 'Não foi possível entrar',
            description:
              'Verifique suas credenciais ou tente novamente mais tarde.',
            variant: 'destructive',
          })
        }
      } else {
        // Erro não-Axios (throw manual, erro interno etc.)
        toast({
          title: 'Não foi possível entrar',
          description:
            'Ocorreu um erro inesperado. Tente novamente mais tarde.',
          variant: 'destructive',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * Splash/loader inicial
   */
  if (isLoading) {
    return (
      <div className={Styles['loader-container']}>
        <div className={Styles.loader} />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-900 to-gray-900">
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <Image src={Logo} alt="Logo Advance+" className="mb-10 w-52" />

        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit}>
            {/* CPF/CNPJ */}
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

            {/* Senha */}
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
                  onChange={handlePasswordChange}
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
            </div>

            {/* Opções + Esqueceu senha */}
            <div>
              {/* Desktop */}
              <div className="hidden md:flex items-center justify-between mb-6">
                <Checkbox
                  value="remember"
                  size="md"
                  color="primary"
                  radius="sm"
                >
                  Me mantenha conectado
                </Checkbox>
                <a
                  href="#"
                  className="block font-normal text-sm text-neutral-600 hover:text-neutral-900 focus:underline focus:outline-none"
                >
                  Esqueceu sua senha?
                </a>
              </div>

              {/* Mobile */}
              <div className="md:hidden flex flex-col items-start justify-start mb-4 space-y-4">
                <Checkbox
                  value="remember"
                  size="sm"
                  color="primary"
                  radius="sm"
                >
                  Me mantenha conectado
                </Checkbox>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 focus:underline focus:outline-none"
                >
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            {/* Botão de Entrar */}
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

      {/* Rodapé desktop */}
      {!isMobile && (
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
      )}
    </div>
  )
}

export default LoginPage
