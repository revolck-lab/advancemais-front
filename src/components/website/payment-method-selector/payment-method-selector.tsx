'use client'

import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'

interface PaymentMethodProps {
  onSelect: (method: string) => void
}

export function PaymentMethodSelector({ onSelect }: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const handleSelect = (method: string) => {
    setSelectedMethod(method)
  }

  const handleContinue = () => {
    if (selectedMethod) {
      onSelect(selectedMethod)
    }
  }

  const paymentMethods = [
    {
      id: 'pix',
      name: 'PIX',
      icon: '💱',
      description: 'O pagamento será aprovado na hora.',
    },
    {
      id: 'boleto',
      name: 'Boleto bancário',
      icon: '📃',
      description: 'O pagamento será aprovado em 1 ou 2 dias úteis.',
    },
    {
      id: 'credit',
      name: 'Cartão de crédito',
      icon: '💳',
      description: 'Pagamento imediato na sua conta bancária.',
    },
    {
      id: 'debit',
      name: 'Cartão de débito',
      icon: '💳',
      description: 'Pagamento imediato na sua conta bancária.',
    },
  ]

  return (
    <Card className="shadow-sm border-0 bg-white/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Método de pagamento</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:border-primary transition-colors ${
                  selectedMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200'
                }`}
                onClick={() => handleSelect(method.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                    <span className="text-xl">{method.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{method.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`h-5 w-5 ${
                    selectedMethod === method.id
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              </div>
            ))}
          </div>

          <Button
            onClick={handleContinue}
            disabled={!selectedMethod}
            className="w-full mt-6"
          >
            Continuar para pagamento
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
