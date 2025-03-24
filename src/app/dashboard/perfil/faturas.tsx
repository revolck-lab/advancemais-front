'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, FileText } from 'lucide-react'
import { StatusCard } from '@/components/dashboard/overview/status-card'

// Dados de exemplo para simular o histórico de pagamentos
const paymentHistory = [
  {
    id: 1,
    amount: 'R$ 15,45',
    date: '16/01/2025 07:59:14',
    status: 'PAGAMENTO EFETUADO',
    attempt: {
      number: '1ª tentativa',
      date: '16/04/2022 07:59:13',
      message: 'Transação capturada com sucesso',
    },
  },
  {
    id: 2,
    amount: 'R$ 99,90',
    date: '20/02/2025 09:14:09',
    status: 'PAGAMENTO EFETUADO',
  },
]

export default function InvoicesPage() {
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto">
        <div className="bg-white rounded-md shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 border-b">
            <StatusCard title="ACESSO" value="ATIVO" />
            <StatusCard title="ASSINATURA" value="ATIVA" />
            <StatusCard title="PLANO" value="INICIAL" />
          </div>

          <div className="p-6">
            <div className="flex items-center gap-1 mb-0">
              <h2 className="text-sm text-muted-foreground uppercase">
                HISTÓRICO DE PAGAMENTOS
              </h2>
            </div>

            <div className="space-y-4">
              {paymentHistory.map((payment) => {
                const isExpanded = expandedItems.includes(payment.id)

                return (
                  <div key={payment.id} className="border rounded-md">
                    <div
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4 cursor-pointer"
                      onClick={() => toggleItem(payment.id)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">
                          #{payment.id}
                        </span>
                        <span className="font-medium">{payment.amount}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {payment.date}
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                        <span className="text-[#4caf50] text-sm font-medium">
                          {payment.status}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Lógica para exibir recibo
                            }}
                          >
                            <FileText className="h-4 w-4" />
                            Exibir recibo
                          </button>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-gray-600" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-600" />
                          )}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="bg-gray-50 p-4 rounded-b-md border-t">
                        <div className="space-y-3">
                          <h3 className="font-medium text-sm">
                            Detalhes do pagamento
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-500">
                                ID da transação:
                              </span>
                              <span className="ml-2">
                                TRX{payment.id}2022{payment.id}45
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Método:</span>
                              <span className="ml-2">Cartão de crédito</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Data:</span>
                              <span className="ml-2">{payment.date}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Status:</span>
                              <span className="ml-2 text-[#4caf50] font-medium">
                                {payment.status}
                              </span>
                            </div>
                          </div>

                          {payment.attempt && (
                            <div className="mt-4 pt-4 border-t">
                              <h3 className="font-medium text-sm mb-2">
                                Histórico de tentativas
                              </h3>
                              <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
                                <span className="text-blue-600 font-medium">
                                  {payment.attempt.number}
                                </span>
                                <span className="text-gray-600">
                                  {payment.attempt.date}
                                </span>
                                <span className="text-gray-800">
                                  {payment.attempt.message}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
