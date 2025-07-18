'use client'
import { CardPayment } from '@mercadopago/sdk-react'

interface MercadoPagoCheckoutProps {
  amount: number
  onSubmit: (formData: any, additionalData?: any) => Promise<void>
  onError: (error: any) => void
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
