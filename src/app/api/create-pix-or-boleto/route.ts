// src/app/api/create-pix-or-boleto/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { method } = body

  if (method === 'pix') {
    return NextResponse.json({
      point_of_interaction: {
        transaction_data: {
          qr_code:
            '00020101021243650016COM.MERCADOLIBRE02013063638f1264-5401-4901-ae8b-dcf4c80f0a4a5204000053039865802BR5909Test User6009SAO PAULO61080540-090062070503***63040B6D',
          qr_code_base64: '/qrcode.svg',
        },
      },
      status: 'pending',
      id: 'fake-pix-id-789',
    })
  }

  if (method === 'bolbradesco' || method === 'boleto') {
    return NextResponse.json({
      barcode: { content: '23793381286008301234567890123456789012' },
      transaction_details: {
        external_resource_url:
          'https://www.mercadopago.com.br/checkout/test-boleto.pdf',
      },
      status: 'pending',
      id: 'fake-boleto-id-456',
    })
  }

  return NextResponse.json(
    { error: 'Método não suportado no mock' },
    { status: 400 }
  )
}
