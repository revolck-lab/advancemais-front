'use client'
import { CardPayment } from '@mercadopago/sdk-react'

interface MercadoPagoCheckoutProps {
  amount: number
  onSubmit: Parameters<typeof CardPayment>[0]['onSubmit']
  onError: Parameters<typeof CardPayment>[0]['onError']
}

export default function MercadoPagoCheckout({
  amount,
  onSubmit,
  onError,
}: MercadoPagoCheckoutProps) {
  return (
    <CardPayment
      initialization={{ amount }}
      onSubmit={onSubmit}
      onError={onError}
    />
  )
}
