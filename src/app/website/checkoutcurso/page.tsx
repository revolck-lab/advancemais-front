'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CardPayment } from '@mercadopago/sdk-react'
import MercadoPagoCheckout from '@/components/mercadopago/MercadoPagoCheckout'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Separator } from '@/components/ui/separator/separator'

import {
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  CreditCard,
  Smartphone,
  FileText,
  User,
  Eye,
  EyeOff,
  QrCode,
  Download,
  Shield,
  Clock,
} from 'lucide-react'

import { AnimatePresence, motion } from 'framer-motion'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { Checkbox } from '@nextui-org/react'
import { cn } from '@/lib/utils'

// -----------------------------------------------------------------------------
// MOCK – você trocará isso por dados vindos da API de cursos, se quiser
// -----------------------------------------------------------------------------
const mockCourses = [
  {
    id: 'auxiliar-farmacia',
    image: '/images/courses/course-1.png',
    title: 'Auxiliar de farmácia',
    location: 'Presencial',
    price: 249.9,
    priceDiscount: 0.5,
    duration: '3 semanas',
  },
  {
    id: 'operador-empilhadeira',
    image: '/images/courses/course-2.png',
    title: 'Operador de empilhadeira',
    location: 'Presencial',
    price: 499.9,
    priceDiscount: 199.89,
    duration: '6 meses',
  },
]

// -----------------------------------------------------------------------------
// Schemas de validação
// -----------------------------------------------------------------------------
const cadastroSchema = z
  .object({
    nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Insira um e-mail válido'),
    telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
    senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmarSenha: z.string(),
    aceitarTermos: z.boolean().refine((val) => val, {
      message: 'É obrigatório aceitar os termos de uso.',
    }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não conferem',
    path: ['confirmarSenha'],
  })

const loginSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório'),
  senha: z.string().min(1, 'Senha é obrigatória'),
})

// -----------------------------------------------------------------------------
// Tipos
// -----------------------------------------------------------------------------
type CadastroFormType = z.infer<typeof cadastroSchema>
type LoginFormType = z.infer<typeof loginSchema>

type StepType = 'auth-choice' | 'cadastro' | 'login' | 'payment' | 'success'
type PaymentMethodType = 'credit' | 'debit' | 'pix' | 'boleto'

// -----------------------------------------------------------------------------
// Componente
// -----------------------------------------------------------------------------
export default function CheckoutCursoPage() {
  const params = useSearchParams()
  const router = useRouter()
  const courseId = params.get('course')
  const [pixQrCode, setPixQrCode] = useState('')
  const [pixQrCodeImage, setPixQrCodeImage] = useState('')

  // -------------------------------------------------- estados principais
  const [course, setCourse] = useState<(typeof mockCourses)[0] | null>(null)
  const [step, setStep] = useState<StepType>('auth-choice')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // -------------------------------------------------- pagamento / MP
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>('credit')

  // Para mostrar status do pagamento
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)

  // mocks PIX / boleto (você pode substituir por integração real)
  const [boletoUrl, setBoletoUrl] = useState('')
  const [boletoBarcode, setBoletoBarcode] = useState('')

  // -------------------------------------------------- forms
  const cadastroForm = useForm<CadastroFormType>({
    resolver: zodResolver(cadastroSchema),
    mode: 'onChange',
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      senha: '',
      confirmarSenha: '',
      aceitarTermos: false,
    },
  })

  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      senha: '',
    },
  })

  // -------------------------------------------------- load do curso
  useEffect(() => {
    if (!courseId) return
    setCourse(mockCourses.find((c) => c.id === courseId) || null)
  }, [courseId])

  // -------------------------------------------------- handlers de usuario
  const handleCadastro = async (data: CadastroFormType) => {
    setError(null)
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1200))
      localStorage.setItem('userEmail', data.email)
      localStorage.setItem('userName', data.nome)
      localStorage.setItem('isLoggedIn', 'true')
      setStep('payment')
    } catch {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (data: LoginFormType) => {
    setError(null)
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 800))
      if (data.email === '12345617801' && data.senha === 'Revolck321@') {
        localStorage.setItem('userEmail', data.email)
        localStorage.setItem('userName', 'Usuário Teste')
        localStorage.setItem('isLoggedIn', 'true')
        setStep('payment')
      } else {
        setError('Email ou senha incorretos. Use: 12345617801 / Revolck321@')
      }
    } catch {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  // -------------------------------------------------- CARTÃO de CRÉDITO/DÉBITO com BRICK (MercadoPago)
  const handleCardPaymentSubmit: Parameters<typeof CardPayment>[0]['onSubmit'] = async (
    formData,
    additionalData
  ) => {
    setError(null)
    setPaymentStatus(null)
    setLoading(true)
    try {
      // Criar payload com description para a API
      const paymentPayload = {
        ...formData,
        description: course?.title || 'Curso',
        ...additionalData,
      }
      
      // Envie os dados do cartão para sua API
      const response = await fetch('/api/create-card-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentPayload),
      })
      const paymentResult = await response.json()
      if (paymentResult.status === 'approved') {
        setStep('success')
      } else {
        setPaymentStatus('Pagamento recusado ou pendente.')
      }
    } catch {
      setError('Erro ao processar pagamento.')
    } finally {
      setLoading(false)
    }
  }

  const handleCardPaymentError: Parameters<typeof CardPayment>[0]['onError'] = () => {
    setError('Erro ao processar pagamento.')
  }

  // -------------------------------------------------- PIX mock
  const handlePixPayment = async () => {
    setLoading(true)
    setError(null)
    try {
      const payer = {
        email: 'seu@email.com',
        first_name: 'SeuNome',
        last_name: 'SeuSobrenome',
        cpf: '12345678909',
      }
      const res = await fetch('/api/create-pix-or-boleto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: course!.title,
          price: course!.priceDiscount,
          method: 'pix',
          payer,
        }),
      })
      const data = await res.json()

      // Use agora a imagem base64 retornada da API mock
      setPixQrCode(data.point_of_interaction.transaction_data.qr_code)
      setPixQrCodeImage(
        data.point_of_interaction.transaction_data.qr_code_base64
      )

      setTimeout(() => {
        if (step === 'payment') setStep('success')
      }, 25000) // 25 segundos
    } catch {
      setError('Erro ao gerar PIX.')
    } finally {
      setLoading(false)
    }
  }

  // -------------------------------------------------- Boleto mock
  const handleBoletoPayment = async () => {
    if (!course) return
    setLoading(true)
    setError(null)
    try {
      const payer = {
        email: 'seu@email.com',
        first_name: 'SeuNome',
        last_name: 'SeuSobrenome',
        cpf: '12345678909',
      }
      const res = await fetch('/api/create-pix-or-boleto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: course.title,
          price: course.priceDiscount,
          method: 'bolbradesco',
          payer,
        }),
      })
      const data = await res.json()
      setBoletoUrl(data.transaction_details.external_resource_url)
      setBoletoBarcode(data.barcode.content)
      setTimeout(() => {
        if (step === 'payment') setStep('success')
      }, 6000)
    } catch {
      setError('Erro ao gerar boleto.')
    } finally {
      setLoading(false)
    }
  }

  // -------------------------------------------------- redirect pós-sucesso
  const redirectToDashboard = () => {
    localStorage.setItem('authToken', `fake-jwt-token-${Date.now()}`)
    router.push('/dashboard/estudante')
  }

  // -------------------------------------------------- mascara telefone
  const formatPhone = (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1')

  // -------------------------------------------------- early return p/ curso não encontrado
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center py-12">
            <AlertTriangle className="w-16 h-16 text-amber-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Curso não encontrado</h1>
            <p className="text-muted-foreground text-center mb-6">
              O curso solicitado não existe ou foi removido.
            </p>
            <Link href="/website/cursos">
              <Button variant="default">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Voltar para cursos
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ===========================================================================
  // RENDER
  // ===========================================================================
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/website/cursos/${course.id}`}>
            <Button variant="default" size="sm" className="mb-4">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar para detalhes do curso
            </Button>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">
            {step === 'success'
              ? 'Matrícula confirmada!'
              : 'Finalizar matrícula'}
          </h1>
          <p className="text-gray-600 mt-2">
            {step === 'success'
              ? 'Parabéns! Você já pode acessar seu curso'
              : 'Complete o processo para garantir sua vaga'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* -------------------------------------------------- COLUNA PRINCIPAL */}
          <div>
            <AnimatePresence mode="wait">
              {/* ================================================== ESCOLHA */}
              {step === 'auth-choice' && (
                <motion.div
                  key="auth-choice"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="shadow-sm border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">
                        Como você gostaria de continuar?
                      </CardTitle>
                      <p className="text-gray-600 text-sm">
                        Para finalizar sua compra, precisamos que você se
                        identifique
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        onClick={() => setStep('cadastro')}
                        variant="default"
                        className="w-full h-16 text-left justify-start group"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-lg">
                            Sou novo aqui
                          </div>
                          <div className="text-sm text-gray-500">
                            Criar uma nova conta rapidamente
                          </div>
                        </div>
                      </Button>

                      <Button
                        onClick={() => setStep('login')}
                        variant="default"
                        className="w-full h-16 text-left justify-start group"
                      >
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-lg">
                            Já tenho conta
                          </div>
                          <div className="text-sm text-gray-500">
                            Fazer login na minha conta existente
                          </div>
                        </div>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ================================================== CADASTRO */}
              {step === 'cadastro' && (
                <motion.div
                  key="cadastro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="shadow-sm border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">
                        Criar sua conta
                      </CardTitle>
                      <p className="text-gray-600 text-sm">
                        Preencha os dados abaixo para criar sua conta
                      </p>
                    </CardHeader>

                    <CardContent>
                      <form
                        onSubmit={cadastroForm.handleSubmit(handleCadastro)}
                        className="space-y-4"
                      >
                        {/* Nome */}
                        <div className="space-y-2">
                          <Label htmlFor="nome">
                            Nome completo{' '}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="nome"
                            {...cadastroForm.register('nome')}
                            disabled={loading}
                            className={cn(
                              cadastroForm.formState.errors.nome &&
                                'border-red-500'
                            )}
                            placeholder="Digite seu nome completo"
                          />
                          {cadastroForm.formState.errors.nome && (
                            <p className="text-xs text-red-600 flex gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {cadastroForm.formState.errors.nome.message}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            E-mail <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            {...cadastroForm.register('email')}
                            disabled={loading}
                            className={cn(
                              cadastroForm.formState.errors.email &&
                                'border-red-500'
                            )}
                            placeholder="seu@email.com"
                          />
                          {cadastroForm.formState.errors.email && (
                            <p className="text-xs text-red-600 flex gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {cadastroForm.formState.errors.email.message}
                            </p>
                          )}
                        </div>

                        {/* Telefone */}
                        <div className="space-y-2">
                          <Label htmlFor="telefone">
                            Telefone <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="telefone"
                            {...cadastroForm.register('telefone', {
                              onChange: (e) =>
                                (e.target.value = formatPhone(e.target.value)),
                            })}
                            disabled={loading}
                            className={cn(
                              cadastroForm.formState.errors.telefone &&
                                'border-red-500'
                            )}
                            placeholder="(00) 00000-0000"
                          />
                          {cadastroForm.formState.errors.telefone && (
                            <p className="text-xs text-red-600 flex gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {cadastroForm.formState.errors.telefone.message}
                            </p>
                          )}
                        </div>

                        {/* Senha */}
                        <div className="space-y-2">
                          <Label htmlFor="senha">
                            Senha <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="senha"
                              type={showPassword ? 'text' : 'password'}
                              {...cadastroForm.register('senha')}
                              disabled={loading}
                              className={cn(
                                cadastroForm.formState.errors.senha &&
                                  'border-red-500',
                                'pr-10'
                              )}
                              placeholder="Mínimo 6 caracteres"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          {cadastroForm.formState.errors.senha && (
                            <p className="text-xs text-red-600 flex gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {cadastroForm.formState.errors.senha.message}
                            </p>
                          )}
                        </div>

                        {/* Confirmar senha */}
                        <div className="space-y-2">
                          <Label htmlFor="confirmarSenha">
                            Confirmar senha{' '}
                            <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="confirmarSenha"
                              type={showConfirmPassword ? 'text' : 'password'}
                              {...cadastroForm.register('confirmarSenha')}
                              disabled={loading}
                              className={cn(
                                cadastroForm.formState.errors.confirmarSenha &&
                                  'border-red-500',
                                'pr-10'
                              )}
                              placeholder="Digite a senha novamente"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          {cadastroForm.formState.errors.confirmarSenha && (
                            <p className="text-xs text-red-600 flex gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {
                                cadastroForm.formState.errors.confirmarSenha
                                  .message
                              }
                            </p>
                          )}
                        </div>

                        {/* Termos */}
                        <div className="space-y-2 pt-2">
                          <Checkbox
                            isSelected={cadastroForm.watch('aceitarTermos')}
                            onValueChange={(checked) =>
                              cadastroForm.setValue('aceitarTermos', checked, {
                                shouldValidate: true,
                              })
                            }
                            isDisabled={loading}
                            className="text-sm leading-relaxed"
                          >
                            Li e aceito os{' '}
                            <Link
                              href="/website/termos"
                              target="_blank"
                              className="text-blue-600 underline"
                            >
                              Termos de Uso
                            </Link>{' '}
                            e{' '}
                            <Link
                              href="/website/privacidade"
                              target="_blank"
                              className="text-blue-600 underline"
                            >
                              Política de Privacidade
                            </Link>
                          </Checkbox>
                          {cadastroForm.formState.errors.aceitarTermos && (
                            <p className="text-xs text-red-600 flex gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {
                                cadastroForm.formState.errors.aceitarTermos
                                  .message
                              }
                            </p>
                          )}
                        </div>

                        {/* mensagem erro geral */}
                        {error && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex gap-2 text-red-700">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                {error}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3 pt-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep('auth-choice')}
                            disabled={loading}
                            className="flex-1"
                          >
                            Voltar
                          </Button>

                          <Button
                            type="submit"
                            variant="default"
                            disabled={
                              loading || !cadastroForm.formState.isValid
                            }
                            className="flex-1"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Criando conta...
                              </>
                            ) : (
                              'Criar conta e continuar'
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ================================================== LOGIN */}
              {step === 'login' && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="shadow-sm border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">
                        Entrar na sua conta
                      </CardTitle>
                      <p className="text-gray-600 text-sm">
                        Use suas credenciais para acessar sua conta
                      </p>
                    </CardHeader>

                    <CardContent>
                      <form
                        onSubmit={loginForm.handleSubmit(handleLogin)}
                        className="space-y-4"
                      >
                        {/* credenciais de teste */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2">
                            🧪 Credenciais de teste
                          </h4>
                          <p className="text-sm text-blue-700">
                            Email: <code>12345617801</code> <br />
                            Senha: <code>Revolck321@</code>
                          </p>
                        </div>

                        {/* email */}
                        <div className="space-y-2">
                          <Label htmlFor="loginEmail">
                            E-mail <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="loginEmail"
                            {...loginForm.register('email')}
                            disabled={loading}
                            className={cn(
                              loginForm.formState.errors.email &&
                                'border-red-500'
                            )}
                            placeholder="Digite seu e-mail ou CPF/CNPJ"
                          />
                          {loginForm.formState.errors.email && (
                            <p className="text-xs text-red-600 flex gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {loginForm.formState.errors.email.message}
                            </p>
                          )}
                        </div>

                        {/* senha */}
                        <div className="space-y-2">
                          <Label htmlFor="loginSenha">
                            Senha <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="loginSenha"
                              type={showPassword ? 'text' : 'password'}
                              {...loginForm.register('senha')}
                              disabled={loading}
                              className={cn(
                                loginForm.formState.errors.senha &&
                                  'border-red-500',
                                'pr-10'
                              )}
                              placeholder="Digite sua senha"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          {loginForm.formState.errors.senha && (
                            <p className="text-xs text-red-600 flex gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {loginForm.formState.errors.senha.message}
                            </p>
                          )}
                        </div>

                        {/* erro geral */}
                        {error && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex gap-2 text-red-700">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                {error}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3 pt-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep('auth-choice')}
                            disabled={loading}
                            className="flex-1"
                          >
                            Voltar
                          </Button>

                          <Button
                            type="submit"
                            variant="default"
                            disabled={loading || !loginForm.formState.isValid}
                            className="flex-1"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Entrando...
                              </>
                            ) : (
                              'Entrar e continuar'
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ================================================== PAGAMENTO */}
              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="shadow-sm border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">
                        Escolha a forma de pagamento
                      </CardTitle>
                      <p className="text-gray-600 text-sm">
                        Selecione como você gostaria de pagar
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* --------------------------- seleção método */}
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          {
                            id: 'credit',
                            icon: CreditCard,
                            label: 'Cartão de Crédito',
                            desc: 'À vista ou parcelado',
                          },
                          {
                            id: 'debit',
                            icon: CreditCard,
                            label: 'Cartão de Débito',
                            desc: 'Débito à vista',
                          },
                          {
                            id: 'pix',
                            icon: Smartphone,
                            label: 'PIX',
                            desc: 'Pagamento instantâneo',
                          },
                          {
                            id: 'boleto',
                            icon: FileText,
                            label: 'Boleto',
                            desc: 'Vence em 3 dias',
                          },
                        ].map((method) => (
                          <Button
                            key={method.id}
                            type="button"
                            variant="default"
                            onClick={() =>
                              setPaymentMethod(method.id as PaymentMethodType)
                            }
                            className={cn(
                              'h-20 flex-col p-4',
                              paymentMethod === method.id
                                ? 'bg-gray-500'
                                : 'hover:bg-gray-500'
                            )}
                          >
                            <method.icon className="w-6 h-6 mb-1" />
                            <span className="text-sm font-medium">
                              {method.label}
                            </span>
                            <span className="text-xs text-white">
                              {method.desc}
                            </span>
                          </Button>
                        ))}
                      </div>

                      {/* --------------------------- cartão (CardPayment Brick) */}
                      {(paymentMethod === 'credit' ||
                        paymentMethod === 'debit') && (
                        <div className="space-y-4">
                          <MercadoPagoCheckout
                            amount={course.priceDiscount}
                            onSubmit={handleCardPaymentSubmit}
                            onError={handleCardPaymentError}
                          />
                          {paymentStatus && (
                            <div className="text-red-600 text-center font-medium">
                              {paymentStatus}
                            </div>
                          )}
                        </div>
                      )}

                      {/* --------------------------- PIX mock */}
                      {paymentMethod === 'pix' && (
                        <div className="space-y-4">
                          {!pixQrCode ? (
                            <Button
                              onClick={handlePixPayment}
                              className="w-full h-12"
                              disabled={loading}
                              variant="secondary"
                            >
                              {loading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Gerando PIX...
                                </>
                              ) : (
                                <>
                                  <Smartphone className="mr-2 h-4 w-4" />
                                  Gerar PIX - R$
                                  {` ${course.priceDiscount.toFixed(2).replace('.', ',')}`}
                                </>
                              )}
                            </Button>
                          ) : (
                            <div className="text-center space-y-4">
                              <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg mx-auto flex items-center justify-center">
                                {pixQrCodeImage ? (
                                  <Image
                                    src={pixQrCodeImage}
                                    alt="QR Code PIX"
                                    width={256}
                                    height={256}
                                    className="w-full h-full object-contain"
                                  />
                                ) : (
                                  <QrCode className="w-32 h-32 text-gray-400" />
                                )}
                              </div>
                              <div className="space-y-2">
                                <p className="font-medium">PIX Copia e Cola:</p>
                                <div className="bg-gray-100 p-3 rounded-lg text-xs font-mono break-all">
                                  {pixQrCode}
                                </div>
                                <Button
                                  onClick={() =>
                                    navigator.clipboard.writeText(pixQrCode)
                                  }
                                  size="sm"
                                  variant="default"
                                >
                                  Copiar código PIX
                                </Button>
                              </div>
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex gap-2 text-blue-700">
                                  <Clock className="w-4 h-4" />
                                  <span className="text-sm font-medium">
                                    Aguardando pagamento...
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* --------------------------- boleto mock */}
                      {paymentMethod === 'boleto' && (
                        <div className="space-y-4">
                          {!boletoUrl ? (
                            <Button
                              onClick={handleBoletoPayment}
                              className="w-full h-12"
                              disabled={loading}
                              variant="secondary"
                            >
                              {loading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Gerando boleto...
                                </>
                              ) : (
                                <>
                                  <FileText className="mr-2 h-4 w-4" />
                                  Gerar Boleto - R$
                                  {` ${course.priceDiscount.toFixed(2).replace('.', ',')}`}
                                </>
                              )}
                            </Button>
                          ) : (
                            <div className="text-center space-y-4">
                              <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto flex items-center justify-center">
                                <FileText className="w-8 h-8 text-orange-600" />
                              </div>
                              <div>
                                <h3 className="font-medium mb-2">
                                  Boleto gerado com sucesso!
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                  Código de barras: <br />
                                  <code className="text-xs">
                                    {boletoBarcode}
                                  </code>
                                </p>
                              </div>
                              <Button
                                onClick={() => window.open(boletoUrl, '_blank')}
                                className="w-full"
                                variant="default"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Visualizar boleto
                              </Button>
                              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <div className="flex gap-2 text-orange-700">
                                  <Clock className="w-4 h-4" />
                                  <div className="text-sm">
                                    <p className="font-medium">
                                      Vencimento: 3 dias úteis
                                    </p>
                                    <p>
                                      Confirmação em até 2 dias úteis após o
                                      pagamento.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* erro geral */}
                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex gap-2 text-red-700">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-sm font-medium">{error}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ================================================== SUCESSO */}
              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <Card className="shadow-sm border-0 bg-white">
                    <CardContent className="flex flex-col items-center py-16 px-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: 'spring',
                          stiffness: 200,
                        }}
                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="text-center"
                      >
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                          Pagamento confirmado!
                        </h2>
                        <p className="text-gray-600 max-w-md leading-relaxed mb-8">
                          Parabéns! Sua matrícula no curso{' '}
                          <strong>{course.title}</strong> foi confirmada com
                          sucesso.
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="space-y-3 w-full max-w-sm"
                      >
                        <Button
                          onClick={redirectToDashboard}
                          className="w-full h-12 text-base font-medium"
                          variant="default"
                        >
                          🎓 Acessar meu curso agora
                        </Button>

                        <Link href="/website/cursos" className="block">
                          <Button variant="default" className="w-full h-12">
                            Ver outros cursos
                          </Button>
                        </Link>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* -------------------------------------------------- SIDEBAR */}
          <div className="lg:sticky lg:top-8 h-fit">
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold">
                  Resumo do curso
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg leading-tight mb-1">
                      {course.title}
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          📍 {course.location}
                        </span>
                        <span>⏱️ {course.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Valor original:</span>
                    <span className="line-through text-gray-400">
                      R$ {course.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Valor promocional:</span>
                    <span className="text-2xl font-bold text-green-600">
                      R$ {course.priceDiscount.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-sm text-green-800 font-medium">
                      🎉 Você economiza R$
                      {` ${(course.price - course.priceDiscount)
                        .toFixed(2)
                        .replace('.', ',')}`}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex gap-2">
                    <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        Garantia de 7 dias
                      </p>
                      <p className="text-xs text-blue-700">
                        Se não ficar satisfeito, devolvemos 100% do seu
                        dinheiro.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}