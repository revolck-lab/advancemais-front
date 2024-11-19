import React, { useState, useEffect } from 'react'
import Styles from './loginpage.module.css'
import Logo from '@/components/ui/logo/logo'
import { Input } from '@/components/ui/input/input'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { Button } from '@/components/ui/button/button'
import { Eye, EyeOff } from 'lucide-react'

// Componente para o cabeçalho da seção direita
const LoginHeader = () => (
  <div className="flex flex-col items-center text-center space-y-1">
    <h1 className="text-4xl font-bold text-neutral-900">Acesse sua Conta</h1>
    <p className="text-neutral-400 font-normal">
      Acompanhe seu atendimento de forma simples e eficiente.
    </p>
  </div>
)

// Função para formatar CPF ou código de matrícula
const formatCPFOrMatricula = (value: string): string => {
  // Remove caracteres não numéricos
  const numericValue = value.replace(/\D/g, '')

  if (numericValue.length <= 6) {
    // Formatar como código de matrícula: 0000-00
    return numericValue.replace(
      /^(\d{4})(\d{2})?$/,
      (_, p1: string, p2: string | undefined) => (p2 ? `${p1}-${p2}` : `${p1}`)
    )
  }

  // Formatar como CPF: 000.000.000-00
  return numericValue.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})?$/,
    (_, p1: string, p2: string, p3: string, p4: string | undefined) =>
      p4 ? `${p1}.${p2}.${p3}-${p4}` : `${p1}.${p2}.${p3}`
  )
}

// Componente para o formulário
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [cpfOrMatricula, setCpfOrMatricula] = useState('')
  const [password, setPassword] = useState('')

  const handleCpfOrMatriculaChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Remove todos os caracteres não numéricos
    const numericValue = e.target.value.replace(/\D/g, '')

    // Limita a entrada a no máximo 11 números (sem contar a máscara)
    const limitedValue = numericValue.slice(0, 11)

    // Formata o valor de acordo com CPF ou código de matrícula
    setCpfOrMatricula(formatCPFOrMatricula(limitedValue))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Impede caracteres não numéricos
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault()
    }
  }

  return (
    <form className="space-y-6">
      <div className="text-left">
        <label
          htmlFor="cpf"
          className="block font-medium text-sm text-neutral-900"
        >
          CPF ou Matrícula
          <span className="text-red-500 font-black ml-1">*</span>
        </label>
        <Input
          type="text"
          id="cpf"
          value={cpfOrMatricula}
          onChange={handleCpfOrMatriculaChange}
          onKeyPress={handleKeyPress}
          placeholder="Digite seu CPF ou matrícula"
          className="mt-2"
          required
        />
      </div>
      <div className="text-left relative">
        <label
          htmlFor="password"
          className="block font-normal text-sm text-neutral-900"
        >
          Senha <span className="text-red-500 font-black ml-1">*</span>
        </label>
        <div className="mt-2 relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 12)
              setPassword(newValue)
            }}
            placeholder="Digite sua senha"
            className="pr-10"
            maxLength={12} // Garante que não exceda 8 caracteres
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox
            id="rememberMe"
            label="Me mantenha na conta"
            checked={rememberMe}
            onChange={(checked) => setRememberMe(checked)}
          />
        </div>
        <a
          href="#"
          className="block font-normal text-sm text-neutral-600 hover:text-neutral-900 focus:underline focus:outline-none"
        >
          Esqueceu sua senha?
        </a>
      </div>

      <Button
        type="submit"
        variant="filled"
        size="large"
        className="w-full py-3 rounded-lg"
      >
        Entrar
      </Button>
    </form>
  )
}

// Função para pegar o ano atual
const getCurrentYear = () => new Date().getFullYear()

// Componente para o rodapé
const LoginFooter = () => (
  <footer
    className={`${Styles.footer} w-full flex items-center justify-between text-sm text-gray-500 px-6`}
  >
    <span className="text-center lg:text-left">
      Integra Social - {getCurrentYear()} © Todos os direitos reservados
    </span>
    <div className="flex gap-4">
      <a
        href="#"
        className="block font-normal text-sm text-neutral-600 hover:text-neutral-900 focus:underline focus:outline-none"
      >
        Política de Privacidade
      </a>
      <a
        href="#"
        className="block font-normal text-sm text-neutral-600 hover:text-neutral-900 focus:underline focus:outline-none"
      >
        Termos e Condições
      </a>
    </div>
  </footer>
)

// Página principal de login
const LoginPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isMobile) {
    return (
      <div className="flex flex-col justify-center items-center">
        {/* Logo */}
        <header className="bg-[#A6EC68] w-full flex flex-col items-center py-6">
          <div className="flex justify-center mt-10">
            <Logo className="w-40 h-auto" />
          </div>
        </header>

        <div className="flex flex-col justify-center items-center px-8 mt-8">
          {/* Formulário */}
          <div className="w-full max-w-md mt-6">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-neutral-900">
                Acesse sua Conta
              </h1>
              <p className="text-sm text-neutral-600">
                Acompanhe seu atendimento de forma simples e eficiente.
              </p>
            </div>
            <LoginForm />
          </div>

          {/* Rodapé */}
          <div className="mt-6 text-center text-sm text-neutral-500">
            <p>
              Ao fazer login, você está consentindo com nossos{' '}
              <a
                href="#"
                className="text-green-600 underline hover:text-green-800"
              >
                Termos e Condições
              </a>{' '}
              e com a{' '}
              <a
                href="#"
                className="text-green-600 underline hover:text-green-800"
              >
                Declaração de Privacidade
              </a>
              .
            </p>
            {/* <p className="mt-4">
        Novo por aqui?{' '}
        <a href="#" className="text-green-600 font-semibold">
          Criar uma conta
        </a>
      </p> */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="main-container flex lg:flex-row h-screen">
      {/* Lado Esquerdo */}
      <div className="flex-[0.9] flex items-center justify-center bg-gray-100 relative">
        <div
          className={`${Styles.circleDiv} flex items-center justify-center rounded-lg`}
        >
          <Logo variant="auth" className="absolute top-10 left-10 max-w-xs" />
        </div>
      </div>

      {/* Lado Direito (Formulário e Rodapé) */}
      <div className="flex-[1.2] flex flex-col justify-between px-6 lg:px-20 relative">
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-10">
              <LoginHeader />
            </div>
            <LoginForm />
            <div className="mt-6 text-center text-sm text-neutral-500">
              <p>
                Ao fazer login, você está consentindo com nossos{' '}
                <a
                  href="#"
                  className="text-green-600 underline hover:text-green-800"
                >
                  Termos e Condições
                </a>{' '}
                e com a{' '}
                <a
                  href="#"
                  className="text-green-600 underline hover:text-green-800"
                >
                  Declaração de Privacidade
                </a>
                .
              </p>
              {/* <p className="mt-4">
                Novo por aqui?{' '}
                <a href="#" className="text-green-600 font-semibold">
                  Criar uma conta
                </a>
              </p> */}
            </div>
          </div>
        </div>

        <LoginFooter />
      </div>
    </div>
  )
}

export default LoginPage
