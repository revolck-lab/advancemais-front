import { StatusCard } from '@/components/dashboard/overview/status-card'
import { Button } from '@/components/ui/button/button'
import { CreditCard, Info } from 'lucide-react'
import { Component as AlterarPlanoModal } from '@/components/dashboard/overview/alterar-plano'
import { useState } from 'react'
import { AdicionarCartaoModal } from '@/components/dashboard/overview/AdicionarCartaoModal'
import { EditarCartaoModal } from '@/components/dashboard/overview/EditarCartaoModal'
import { RemoverCartaoModal } from '@/components/dashboard/overview/RemoverCartaoModal'

// Definindo a interface Cartao
interface Cartao {
  id: number
  type: string
  lastFour: string
  expiry: string
  isPrimary: boolean
}

export default function SubscriptionPage() {
  // Tipificando o estado cartoes como Cartao[]
  const [cartoes, setCartoes] = useState<Cartao[]>([
    {
      id: 1,
      type: 'Mastercard',
      lastFour: '4587',
      expiry: '05/2025',
      isPrimary: true,
    },
    {
      id: 2,
      type: 'Visa',
      lastFour: '1234',
      expiry: '09/2024',
      isPrimary: false,
    },
  ])

  // Função para adicionar cartão com newCard tipado como Cartao
  const handleAddCard = (newCard: Cartao) => {
    setCartoes((prevCartoes) => {
      if (newCard.isPrimary) {
        return [
          ...prevCartoes.map((c) => ({ ...c, isPrimary: false })),
          newCard,
        ]
      }
      return [...prevCartoes, newCard]
    })
  }

  // Função para editar cartão com updatedCard tipado como Cartao
  const handleEditCard = (updatedCard: Cartao) => {
    setCartoes((prevCartoes) => {
      if (updatedCard.isPrimary) {
        return prevCartoes.map((c) =>
          c.id === updatedCard.id ? updatedCard : { ...c, isPrimary: false }
        )
      }
      return prevCartoes.map((c) => (c.id === updatedCard.id ? updatedCard : c))
    })
  }

  // Função para remover cartão com id tipado como number
  const handleRemoveCard = (id: number) => {
    setCartoes((prevCartoes) => prevCartoes.filter((c) => c.id !== id))
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto">
        <div className="bg-white rounded-md shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-medium mb-6">Seu plano</h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-6">
              <StatusCard title="ACESSO" value="ATIVO" />
              <StatusCard title="ASSINATURA" value="ATIVA" />
              <StatusCard title="PLANO" value="INICIAL" />

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground uppercase">
                  PRÓXIMA COBRANÇA <Info className="h-4 w-4" />
                </div>
                <div className="text-sm">28/03/2025</div>
              </div>

              <div className="flex items-end mb-0">
                <AlterarPlanoModal />
              </div>
            </div>

            <div className="flex justify-end mt-0">
              <Button className="text-sm text-gray-500 hover:text-gray-700">
                Cancelar assinatura
              </Button>
            </div>
          </div>

          <div className="p-6 border-t">
            <div className="mb-6 justify-between flex">
              <h2 className="text-lg font-medium mt-6">
                Seus dados de pagamento
              </h2>
              <AdicionarCartaoModal onAddCard={handleAddCard} />
            </div>
            <div className="space-y-4">
              {cartoes.map((cartao) => (
                <div key={cartao.id} className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-neutral" />
                      <div>
                        <p className="font-medium mb-0 text-neutral">
                          {cartao.type} •••• {cartao.lastFour}
                        </p>
                        <p className="text-sm text-neutral-400 mb-0">
                          Expira em {cartao.expiry}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {cartao.isPrimary && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                          Principal
                        </span>
                      )}
                      <EditarCartaoModal
                        cartao={cartao}
                        onEditCard={(formData) => handleEditCard({ ...cartao, ...formData })}
                      />
                      <RemoverCartaoModal
                        cartao={cartao}
                        onRemoveCard={handleRemoveCard}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
