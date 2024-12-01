'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input/input'
import { Checkbox, Button } from '@nextui-org/react'
import Image from 'next/image'

// Logo
import Logo from '/public/images/logo_branco.webp'

const LoginPage = () => {
  const [value, setValue] = useState('')
  const [hasError, setHasError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const getNumericValue = (input: string) => input.replace(/\D/g, '')

  const applyMask = (numericValue: string) => {
    if (numericValue.length <= 11) {
      return numericValue.replace(
        /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
        '$1.$2.$3-$4'
      )
    } else {
      return numericValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      )
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value
    let numericValue = getNumericValue(rawValue)

    if (numericValue.length > 14) {
      numericValue = numericValue.slice(0, 14)
      rawValue = applyMask(numericValue)
    } else {
      rawValue = applyMask(numericValue)
    }

    setValue(rawValue)

    const numericLength = numericValue.length
    if (numericLength !== 11 && numericLength !== 14) {
      setHasError(true)
    } else {
      setHasError(false)
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value.length < 6) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-900 to-gray-900">
      <div className="flex flex-1 flex-col items-center justify-center">
        <Image src={Logo} alt="Logo Advance+" className="mb-10 w-52" />
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
          <form>
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
                  onChange={handleInputChange}
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
                  style={{ marginTop: '2px' }}
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
                Me mantenha na conta
              </Checkbox>
              <a
                href="#"
                className="block font-normal text-sm text-neutral-600 hover:text-neutral-900 focus:underline focus:outline-none"
              >
                Esqueceu sua senha?
              </a>
            </div>

            <Button
              type="submit"
              color="primary"
              radius="sm"
              size="lg"
              fullWidth
              className="py-3"
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
          O Advance+ LTDA CNPJ nº 00.000.000/0001- 97, com Sede na Av. Juca
          Sampaio, 2247 - Sala 30 - Feitosa, Maceió - AL, 57040-600 Todos os
          Direitos Reservados AdvanceMais
        </p>
      </footer>
    </div>
  )
}

export default LoginPage
