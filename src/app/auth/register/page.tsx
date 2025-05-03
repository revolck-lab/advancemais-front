'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button, Checkbox, Select, SelectItem } from '@nextui-org/react'
import { Input } from '@/components/ui/input/input'
import { Card, CardContent } from '@/components/ui/card/card'
import { useIsMobile } from '@/hooks/use-mobile'
import { useToast } from '@/hooks/use-toast'
import { Building2, User } from 'lucide-react'
import Logo from '/public/images/logo_branco.webp'

type RegisterType = 'student' | 'company' | null

interface FormData {
  // Common fields
  email: string
  password: string
  confirmPassword: string
  phone: string
  terms: boolean

  // Student fields
  fullName?: string
  cpf?: string
  birthDate?: string
  gender?: string

  // Company fields
  companyName?: string
  fantasyName?: string
  cnpj?: string
}

const GENDERS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'outro', label: 'Outro' },
  { value: 'prefiro-nao-dizer', label: 'Prefiro não dizer' },
]

const RegisterPage: React.FC = () => {
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useIsMobile()

  const [registerType, setRegisterType] = useState<RegisterType>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    terms: false,
    fullName: '',
    cpf: '',
    birthDate: '',
    gender: '',
    companyName: '',
    fantasyName: '',
    cnpj: '',
  })

  const formatCPF = (value: string): string => {
    const numeric = value.replace(/\D/g, '').slice(0, 11)
    return numeric.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const formatCNPJ = (value: string): string => {
    const numeric = value.replace(/\D/g, '').slice(0, 14)
    return numeric.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
    )
  }

  const formatPhone = (value: string): string => {
    const numeric = value.replace(/\D/g, '').slice(0, 11)
    if (numeric.length <= 10) {
      return numeric.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    }
    return numeric.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  const formatDate = (value: string): string => {
    const numeric = value.replace(/\D/g, '').slice(0, 8)
    if (numeric.length <= 2) return numeric
    if (numeric.length <= 4) return `${numeric.slice(0, 2)}/${numeric.slice(2)}`
    return `${numeric.slice(0, 2)}/${numeric.slice(2, 4)}/${numeric.slice(4)}`
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    let formattedValue = value

    if (field === 'cpf') formattedValue = formatCPF(value)
    if (field === 'cnpj') formattedValue = formatCNPJ(value)
    if (field === 'phone') formattedValue = formatPhone(value)
    if (field === 'birthDate') formattedValue = formatDate(value)

    setFormData((prev) => ({ ...prev, [field]: formattedValue }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Common validations
    if (!formData.email) newErrors.email = 'E-mail é obrigatório'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'E-mail inválido'

    if (!formData.password) newErrors.password = 'Senha é obrigatória'
    else if (formData.password.length < 6)
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres'

    if (!formData.confirmPassword)
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória'
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'As senhas não coincidem'

    if (!formData.phone) newErrors.phone = 'Telefone é obrigatório'
    if (!formData.terms) newErrors.terms = 'Você precisa aceitar os termos'

    // Student specific validations
    if (registerType === 'student') {
      if (!formData.fullName) newErrors.fullName = 'Nome completo é obrigatório'
      if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório'
      else if (formData.cpf.replace(/\D/g, '').length !== 11)
        newErrors.cpf = 'CPF inválido'
      if (!formData.birthDate)
        newErrors.birthDate = 'Data de nascimento é obrigatória'
      if (!formData.gender) newErrors.gender = 'Gênero é obrigatório'
    }

    // Company specific validations
    if (registerType === 'company') {
      if (!formData.companyName)
        newErrors.companyName = 'Razão social é obrigatória'
      if (!formData.fantasyName)
        newErrors.fantasyName = 'Nome fantasia é obrigatório'
      if (!formData.cnpj) newErrors.cnpj = 'CNPJ é obrigatório'
      else if (formData.cnpj.replace(/\D/g, '').length !== 14)
        newErrors.cnpj = 'CNPJ inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Simulando chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: 'Conta criada com sucesso!',
        description: 'Redirecionando para o login...',
        variant: 'success',
      })

      setTimeout(() => {
        router.push('/auth/login')
      }, 1500)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: 'Erro ao criar conta',
        description: 'Por favor, tente novamente.',
        variant: 'danger',
      })
    } finally {
      setLoading(false)
    }
  }

  const renderTypeSelection = () => (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white text-center mb-8">
        Como deseja se cadastrar?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className="cursor-pointer bg-white hover:border-blue-500 transition-all duration-300 hover:scale-105"
          onClick={() => setRegisterType('student')}
        >
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Candidato/Aluno</h3>
            <p className="text-gray-600">
              Para quem busca oportunidades de aprendizado e carreira
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer bg-white hover:border-blue-500 transition-all duration-300 hover:scale-105"
          onClick={() => setRegisterType('company')}
        >
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Empresa</h3>
            <p className="text-gray-600">
              Para empresas que buscam talentos e oferecem oportunidades
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderStudentForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-normal text-sm text-neutral-900">
          Nome completo<span className="text-red-500 font-black ml-1">*</span>
        </label>
        <Input
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder="Digite seu nome completo"
          hasError={!!errors.fullName}
          className="mt-2 w-full"
          disabled={loading}
        />
        {errors.fullName && (
          <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-normal text-sm text-neutral-900">
            CPF<span className="text-red-500 font-black ml-1">*</span>
          </label>
          <Input
            value={formData.cpf}
            onChange={(e) => handleInputChange('cpf', e.target.value)}
            placeholder="000.000.000-00"
            hasError={!!errors.cpf}
            className="mt-2 w-full"
            disabled={loading}
          />
          {errors.cpf && (
            <p className="text-red-600 text-sm mt-1">{errors.cpf}</p>
          )}
        </div>

        <div>
          <label className="block font-normal text-sm text-neutral-900">
            Data de nascimento
            <span className="text-red-500 font-black ml-1">*</span>
          </label>
          <Input
            value={formData.birthDate}
            onChange={(e) => handleInputChange('birthDate', e.target.value)}
            placeholder="DD/MM/AAAA"
            hasError={!!errors.birthDate}
            className="mt-2 w-full"
            disabled={loading}
          />
          {errors.birthDate && (
            <p className="text-red-600 text-sm mt-1">{errors.birthDate}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-normal text-sm text-neutral-900">
            Telefone<span className="text-red-500 font-black ml-1">*</span>
          </label>
          <Input
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="(00) 00000-0000"
            hasError={!!errors.phone}
            className="mt-2 w-full"
            disabled={loading}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block font-normal text-sm text-neutral-900">
            Gênero<span className="text-red-500 font-black ml-1">*</span>
          </label>
          <Select
            placeholder="Selecione seu gênero"
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            isInvalid={!!errors.gender}
            className="mt-2"
            isDisabled={loading}
          >
            {GENDERS.map((gender) => (
              <SelectItem key={gender.value} value={gender.value}>
                {gender.label}
              </SelectItem>
            ))}
          </Select>
          {errors.gender && (
            <p className="text-red-600 text-sm mt-1">{errors.gender}</p>
          )}
        </div>
      </div>

      {renderCommonFields()}
    </form>
  )

  const renderCompanyForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-normal text-sm text-neutral-900">
          Razão Social<span className="text-red-500 font-black ml-1">*</span>
        </label>
        <Input
          value={formData.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
          placeholder="Digite a razão social"
          hasError={!!errors.companyName}
          className="mt-2 w-full"
          disabled={loading}
        />
        {errors.companyName && (
          <p className="text-red-600 text-sm mt-1">{errors.companyName}</p>
        )}
      </div>

      <div>
        <label className="block font-normal text-sm text-neutral-900">
          Nome Fantasia<span className="text-red-500 font-black ml-1">*</span>
        </label>
        <Input
          value={formData.fantasyName}
          onChange={(e) => handleInputChange('fantasyName', e.target.value)}
          placeholder="Digite o nome fantasia"
          hasError={!!errors.fantasyName}
          className="mt-2 w-full"
          disabled={loading}
        />
        {errors.fantasyName && (
          <p className="text-red-600 text-sm mt-1">{errors.fantasyName}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-normal text-sm text-neutral-900">
            CNPJ<span className="text-red-500 font-black ml-1">*</span>
          </label>
          <Input
            value={formData.cnpj}
            onChange={(e) => handleInputChange('cnpj', e.target.value)}
            placeholder="00.000.000/0000-00"
            hasError={!!errors.cnpj}
            className="mt-2 w-full"
            disabled={loading}
          />
          {errors.cnpj && (
            <p className="text-red-600 text-sm mt-1">{errors.cnpj}</p>
          )}
        </div>

        <div>
          <label className="block font-normal text-sm text-neutral-900">
            Telefone<span className="text-red-500 font-black ml-1">*</span>
          </label>
          <Input
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="(00) 00000-0000"
            hasError={!!errors.phone}
            className="mt-2 w-full"
            disabled={loading}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {renderCommonFields()}
    </form>
  )

  const renderCommonFields = () => (
    <>
      <div>
        <label className="block font-normal text-sm text-neutral-900">
          E-mail<span className="text-red-500 font-black ml-1">*</span>
        </label>
        <Input
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Digite seu e-mail"
          type="email"
          hasError={!!errors.email}
          className="mt-2 w-full"
          disabled={loading}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-normal text-sm text-neutral-900">
            Senha<span className="text-red-500 font-black ml-1">*</span>
          </label>
          <Input
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Digite sua senha"
            type="password"
            hasError={!!errors.password}
            className="mt-2 w-full"
            disabled={loading}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block font-normal text-sm text-neutral-900">
            Confirmar senha
            <span className="text-red-500 font-black ml-1">*</span>
          </label>
          <Input
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange('confirmPassword', e.target.value)
            }
            placeholder="Confirme sua senha"
            type="password"
            hasError={!!errors.confirmPassword}
            className="mt-2 w-full"
            disabled={loading}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <div>
        <Checkbox
          isSelected={formData.terms}
          onValueChange={(value) =>
            handleInputChange('terms', value as unknown as string)
          }
          isInvalid={!!errors.terms}
          isDisabled={loading}
        >
          <span className="text-sm">
            Ao informar meus dados, estou ciente que o tratamento dos dados
            pessoais ocorrerá conforme a Política de Privacidade
          </span>
        </Checkbox>
        {errors.terms && (
          <p className="text-red-600 text-sm mt-1">{errors.terms}</p>
        )}
      </div>

      <Button
        type="submit"
        color="primary"
        radius="sm"
        size="lg"
        fullWidth
        isLoading={loading}
      >
        Criar conta
      </Button>

      <p className="text-center text-sm">
        Já possui uma conta?{' '}
        <a href="/auth/login" className="text-blue-600 hover:underline">
          Faça login
        </a>
      </p>
    </>
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-900 to-gray-900">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <Image src={Logo} alt="Logo Advance+" className="mb-10 w-52" />

        {!registerType ? (
          renderTypeSelection()
        ) : (
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {registerType === 'student'
                  ? 'Cadastro de Candidato/Aluno'
                  : 'Cadastro de Empresa'}
              </h2>
              <Button
                onClick={() => setRegisterType(null)}
                className="text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                Voltar
              </Button>
            </div>

            {registerType === 'student'
              ? renderStudentForm()
              : renderCompanyForm()}
          </div>
        )}
      </div>

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

export default RegisterPage
