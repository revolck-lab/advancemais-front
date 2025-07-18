// src/app/api/create-card-payment/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // Recebe os dados do cartão (não faz nada com eles no mock)
  const body = await req.json()

  // Aqui, você pode simular rejeição ou aprovação
  // Vamos aprovar se o cartão for 4111111111111111 (cartão teste MP)
  if (
    body.cardNumber === '4111111111111111' ||
    body['card_number'] === '4111111111111111'
  ) {
    return NextResponse.json({
      status: 'approved',
      id: 'fake-payment-id-123',
    })
  }

  // Senão, retorna erro
  return NextResponse.json({
    status: 'rejected',
    message: 'Cartão recusado no mock',
  })
}
