'use client'

import { useState, useEffect, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Progress } from '@/components/ui/progress/progress'
import { CheckCircle, CreditCard, XCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

// Loading component for Suspense fallback
function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="border-b pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
              MP
            </div>
            <CardTitle className="text-lg">MercadoPago</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Carregando</span>
                <span className="text-sm text-muted-foreground">...</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main component wrapped with client directive
function MercadoPagoCheckoutContent() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<'processing' | 'success' | 'fail'>(
    'processing'
  )
  const searchParams = useSearchParams()
  const paymentMethod = searchParams.get('method') || 'unknown'
  const plano = searchParams.get('plano') || 'Desconhecido'
  const price = searchParams.get('price') || '0,00'

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(Math.min(progress + 10, 100))
      } else {
        setLoading(false)
        setStatus('success')
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [progress])

  const handleFinish = () => {
    // In a real implementation, this would send a webhook to the original site
    // For this prototype, we'll just close the window and simulate success
    window.opener.postMessage(
      {
        type: 'payment_completed',
        status: status,
        method: paymentMethod,
        plan: plano,
      },
      '*'
    )
    window.close()
  }

  const handleFailPayment = () => {
    setStatus('fail')
  }

  const getMethodIcon = () => {
    switch (paymentMethod) {
      case 'pix':
        return '💱'
      case 'boleto':
        return '📃'
      case 'credit':
      case 'debit':
        return <CreditCard className="h-6 w-6" />
      case 'loterica':
        return '🏪'
      default:
        return '💰'
    }
  }

  const getMethodName = () => {
    switch (paymentMethod) {
      case 'pix':
        return 'PIX'
      case 'boleto':
        return 'Boleto Bancário'
      case 'credit':
        return 'Cartão de Crédito'
      case 'debit':
        return 'Cartão de Débito'
      case 'loterica':
        return 'Pagamento na Lotérica'
      default:
        return 'Método desconhecido'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="border-b pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
              MP
            </div>
            <CardTitle className="text-lg">MercadoPago</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    Processando pagamento
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {progress}%
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 bg-blue-100 text-blue-600 p-1 rounded">
                    {typeof getMethodIcon() === 'string' ? (
                      <span className="text-lg">{getMethodIcon()}</span>
                    ) : (
                      getMethodIcon()
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">
                      Pagamento via {getMethodName()}
                    </h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Plano: {plano} - R$ {price}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center text-muted-foreground text-sm">
                <p>Por favor, aguarde enquanto processamos seu pagamento...</p>
              </div>
            </div>
          ) : status === 'success' ? (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  Pagamento bem-sucedido!
                </h3>
                <p className="text-muted-foreground mt-1">
                  Seu pagamento foi processado com sucesso.
                </p>
              </div>
              <Button
                onClick={handleFinish}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Finalizar
              </Button>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Falha no pagamento</h3>
                <p className="text-muted-foreground mt-1">
                  Ocorreu um erro ao processar seu pagamento. Por favor, tente
                  novamente.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleFinish}
                  variant="outline"
                  className="w-full"
                >
                  Voltar para o site
                </Button>
              </div>
            </div>
          )}

          {loading && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFailPayment}
                className="text-xs"
              >
                Simular falha no pagamento
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Export the main component wrapped in Suspense
export default function MercadoPagoCheckout() {
  return (
    <Suspense fallback={<LoadingState />}>
      <MercadoPagoCheckoutContent />
    </Suspense>
  )
}
