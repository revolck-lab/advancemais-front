'use client'
import { useEffect } from 'react'
import { initMercadoPago } from '@mercadopago/sdk-react'

export default function MercadoPagoProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    initMercadoPago('TEST-801f2ef8-6914-45f3-b582-a219ea9c1d42')
  }, [])

  return <>{children}</>
}
