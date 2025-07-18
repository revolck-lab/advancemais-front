import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const paymentData = await request.json()

  const res = await fetch('https://api.mercadopago.com/v1/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer TEST-2978560799706105-041413-6fb740b3edc1bad38e3ab6a8962d380b-2320112722`,
    },
    body: JSON.stringify(paymentData),
  })

  const data = await res.json()
  return NextResponse.json(data)
}
