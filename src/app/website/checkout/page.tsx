//src\app\website\checkout\page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, HelpCircle, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

import { Button } from '@/components/ui/button/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { Separator } from '@/components/ui/separator/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip/tooltip'
import { Progress } from '@/components/ui/progress/progress'
import { LoginModal } from '@/components/website/login-modal/login-modal'
import { PaymentMethodSelector } from '@/components/website/payment-method-selector/payment-method-selector'

// Updated schema to match API validation
const personalSchema = z
  .object({
    contact_name: z.string().max(255).min(1, { message: 'Campo obrigatório' }),
    business_name: z.string().max(255).min(1, { message: 'Campo obrigatório' }),
    trade_name: z.string().max(255).min(1, { message: 'Campo obrigatório' }),
    cnpj: z
      .string()
      .length(14)
      .regex(/^[0-9]+$/, { message: 'CNPJ inválido' }),
    landline_phone: z
      .string()
      .length(11)
      .regex(/^[0-9]+$/, { message: 'Telefone inválido' })
      .optional()
      .or(z.literal('')),
    whatsapp: z
      .string()
      .length(11)
      .regex(/^[0-9]+$/, { message: 'WhatsApp inválido' }),
    mobile_phone: z
      .string()
      .length(11)
      .regex(/^[0-9]+$/, { message: 'Celular inválido' }),
    email: z.string().email({ message: 'Email inválido' }).max(255),
    password: z.string().min(6, { message: 'Mínimo de 6 caracteres' }).max(255),
    confirmarSenha: z.string(),
    // Temporarily keep address fields in the form, will be modified for API
    endereco: z.string().min(1, { message: 'Campo obrigatório' }),
    bairro: z.string().min(1, { message: 'Campo obrigatório' }),
    complemento: z.string().optional(),
    cidade: z.string().min(1, { message: 'Campo obrigatório' }),
    estado: z.string().min(2, { message: 'Campo obrigatório' }),
    cep: z.string().min(8, { message: 'CEP inválido' }),
    // Hidden fields with default values
    status: z.boolean().default(true),
    role_id: z.number().default(2),
  })
  .refine((data) => data.password === data.confirmarSenha, {
    message: 'As senhas não conferem',
    path: ['confirmarSenha'],
  })

type PersonalFormData = z.infer<typeof personalSchema>
type PersonalFormFields = keyof PersonalFormData

// Definir o tipo das chaves dos planos
type PlanoKey = 'Inicial' | 'Intermediario' | 'Avançado' | 'Destaque'

// Definir o objeto planos
const planos: Record<
  PlanoKey,
  {
    precoOriginal: string
    precoComDesconto: string
    desconto: string
    descricao: string
  }
> = {
  Inicial: {
    precoOriginal: '49,99',
    precoComDesconto: '49,99',
    desconto: '0,00',
    descricao: 'Assinatura Mensal',
  },
  Intermediario: {
    precoOriginal: '74,99',
    precoComDesconto: '74,99',
    desconto: '0,00',
    descricao: 'Assinatura Mensal',
  },
  Avançado: {
    precoOriginal: '149,99',
    precoComDesconto: '149,99',
    desconto: '0,00',
    descricao: 'Assinatura Mensal',
  },
  Destaque: {
    precoOriginal: '199,99',
    precoComDesconto: '199,99',
    desconto: '0,00',
    descricao: 'Assinatura Mensal',
  },
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const totalSteps = 3
  const searchParams = useSearchParams()
  const planoSelecionado = searchParams.get('plano')

  // Função para verificar se o plano é válido
  const isValidPlano = (key: string | null): key is PlanoKey => {
    return key !== null && Object.keys(planos).includes(key)
  }

  // Obter informações do plano com valores padrão para casos inválidos
  const planoInfo = isValidPlano(planoSelecionado)
    ? planos[planoSelecionado]
    : {
        precoOriginal: '0,00',
        precoComDesconto: '0,00',
        desconto: '0,00',
        descricao: 'Nenhum plano selecionado',
      }

  // Check login status when component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)

    // If user is logged in, skip to payment methods
    if (loggedIn) {
      setStep(2)
    } else {
      setIsLoginModalOpen(true)
    }

    // Setup event listener for message from payment window
    const handlePaymentMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'payment_completed') {
        if (event.data.status === 'success') {
          setStep(3)
        }
      }
    }

    window.addEventListener('message', handlePaymentMessage)
    return () => window.removeEventListener('message', handlePaymentMessage)
  }, [])

  // Updated form configuration
  const personalForm: UseFormReturn<PersonalFormData> =
    useForm<PersonalFormData>({
      resolver: zodResolver(personalSchema),
      defaultValues: {
        contact_name: '',
        business_name: '',
        trade_name: '',
        cnpj: '',
        landline_phone: '',
        whatsapp: '',
        mobile_phone: '',
        email: '',
        password: '',
        confirmarSenha: '',
        endereco: '',
        bairro: '',
        complemento: '',
        cidade: '',
        estado: '',
        cep: '',
        status: true,
        role_id: 2,
      },
    })

  // Removed unused payment form

  const onPersonalSubmit = async (data: PersonalFormData) => {
    try {
      // Company data creation logic
      const companyData = {
        cnpj: data.cnpj,
        trade_name: data.trade_name,
        business_name: data.business_name,
        contact_name: data.contact_name,
        whatsapp: data.whatsapp,
        mobile_phone: data.mobile_phone,
        landline_phone: data.landline_phone || null,
        email: data.email,
        password: data.password,
        status: data.status,
        role_id: data.role_id,
        street: data.endereco,
        neighborhood: data.bairro,
        complement: data.complemento || null,
        city: data.cidade,
        state: data.estado,
        zip_code: data.cep,
      }

      const companyResponse = await fetch(
        'https://advancemais-api.onrender.com/api/company/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(companyData),
        }
      )
      const companyResult = await companyResponse.json()
      console.log('Company response:', companyResult)

      // Set login state after successful registration
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userEmail', data.email)
      setIsLoggedIn(true)
    } catch (error) {
      console.error('Error submitting data:', error)
    } finally {
      setStep(2)
    }
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    setIsLoginModalOpen(false)
    setStep(2)
  }

  const handlePaymentMethodSelect = (method: string) => {
    // Open MercadoPago simulator in a new tab
    const mercadoPagoUrl = `/mercadopago/checkout?method=${method}&plano=${encodeURIComponent(
      planoSelecionado || 'Unknown'
    )}&price=${encodeURIComponent(planoInfo.precoComDesconto)}`

    window.open(mercadoPagoUrl, '_blank', 'width=500,height=600')
  }

  interface FormFieldProps {
    name: PersonalFormFields
    label: string
    type?: string
    placeholder?: string
    tooltip?: string
  }

  const FormField: React.FC<FormFieldProps> = ({
    name,
    label,
    type = 'text',
    placeholder = '',
    tooltip = '',
  }) => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...personalForm.register(name)}
        className="h-11 rounded-lg border-gray-200 focus:border-primary focus:ring-primary"
      />
      {personalForm.formState.errors[name] && (
        <p className="text-sm text-destructive">
          {personalForm.formState.errors[name]?.message}
        </p>
      )}
    </div>
  )

  return (
    <div className="min-h-screen mt-10 mb-10">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-0">Configure seu pedido</h1>
          <p className="text-muted-foreground">
            Complete sua compra em poucos passos
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Progresso</span>
            <span className="text-sm text-muted-foreground">
              {step} de {totalSteps}
            </span>
          </div>
          <Progress value={(step / totalSteps) * 100} className="h-2" />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form
                    onSubmit={personalForm.handleSubmit(onPersonalSubmit)}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-semibold">
                        Informações da Empresa
                      </h2>
                      <div className="grid gap-6 md:grid-cols-2 mt-4">
                        <FormField
                          name="contact_name"
                          label="Nome Responsável"
                          tooltip="Nome completo do responsável pela empresa"
                        />
                        <FormField
                          name="business_name"
                          label="Razão Social"
                          tooltip="Nome oficial registrado da empresa"
                        />
                        <FormField
                          name="trade_name"
                          label="Nome Fantasia"
                          tooltip="Nome comercial da empresa"
                        />
                        <FormField
                          name="cnpj"
                          label="CNPJ"
                          tooltip="Apenas números - 14 dígitos"
                          placeholder="00000000000000"
                        />
                        <FormField
                          name="landline_phone"
                          label="Telefone Fixo"
                          type="tel"
                          tooltip="Apenas números - 11 dígitos com DDD"
                          placeholder="00000000000"
                        />
                        <FormField
                          name="whatsapp"
                          label="WhatsApp"
                          type="tel"
                          tooltip="Apenas números - 11 dígitos com DDD"
                          placeholder="00000000000"
                        />
                        <FormField
                          name="mobile_phone"
                          label="Telefone Celular"
                          type="tel"
                          tooltip="Apenas números - 11 dígitos com DDD"
                          placeholder="00000000000"
                        />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold">
                        Informações de Acesso
                      </h2>
                      <div className="grid gap-6 md:grid-cols-2 mt-4">
                        <FormField
                          name="email"
                          label="Email"
                          type="email"
                          tooltip="Email principal para contato"
                        />
                        <FormField
                          name="password"
                          label="Senha"
                          type="password"
                          tooltip="Mínimo de 6 caracteres"
                        />
                        <FormField
                          name="confirmarSenha"
                          label="Confirmar Senha"
                          type="password"
                        />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold">Endereço</h2>
                      <div className="grid gap-6 md:grid-cols-2 mt-4">
                        <FormField name="endereco" label="Rua" />
                        <FormField name="bairro" label="Bairro" />
                        <FormField name="complemento" label="Complemento" />
                        <FormField name="cidade" label="Cidade" />
                        <FormField name="estado" label="Estado" />
                        <FormField
                          name="cep"
                          label="CEP"
                          placeholder="00000000"
                          tooltip="Apenas números - 8 dígitos"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="secondary"
                      className="w-full h-11 rounded-lg text-base bg-secondary text-white"
                    >
                      Continuar para Pagamento
                    </Button>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PaymentMethodSelector onSelect={handlePaymentMethodSelect} />

                  {!isLoggedIn && (
                    <div className="mt-4">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <motion.div
                        className="text-center space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.div
                          className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.4 }}
                        >
                          <Check className="w-8 h-8" />
                        </motion.div>
                        <h2 className="text-2xl font-semibold">
                          Pagamento Confirmado!
                        </h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Obrigado por escolher nossos serviços. Em breve você
                          receberá um email com todos os detalhes da sua compra.
                        </p>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resumo do Pedido */}
          <div>
            <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm sticky top-8">
              <CardHeader className="border-b pb-6">
                <CardTitle className="text-xl font-semibold">
                  Resumo do seu pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src="/placeholder.svg"
                        alt="Plano thumbnail"
                        className="object-cover"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium mb-0">
                        {planoSelecionado
                          ? `Plano ${planoSelecionado}`
                          : 'Nenhum plano selecionado'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {planoInfo.descricao}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Preço original
                      </span>
                      <span>R$ {planoInfo.precoOriginal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Desconto</span>
                      <span className="text-primary">
                        R$ {planoInfo.desconto}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taxa</span>
                      <span>R$ 0,00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-end">
                      <span className="font-medium">Total</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          R$ {planoInfo.precoComDesconto}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          por mês
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-blue-600 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-blue-900 mb-0">
                          Cobrança Recorrente
                        </p>
                        <p className="text-xs text-blue-700 mt-0.5">
                          Seu cartão será cobrado automaticamente todo mês. Você
                          pode cancelar a qualquer momento.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  )
}
