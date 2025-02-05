import React, { useState } from 'react'
import { Button } from '@/components/ui/button1'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'

export default function RecruitmentChallenges() {
  const [mainTitle, setMainTitle] = useState<string>(
    'Você ainda recruta com emails e planilhas?'
  )
  const [mainDescription, setMainDescription] = useState<string>(
    'O esforço e a boa vontade do recrutador têm um limite claro e acabam criando problemas e desafios relevantes. Simplifique seus processos e alcance resultados melhores com as ferramentas certas.'
  )
  const [cards, setCards] = useState<
    { id: number; icon: string; title: string; description: string }[]
  >([
    {
      id: 1,
      icon: 'Activity', // Ícone inicial (Lucide Icons)
      title: 'Sensação de Desorganização',
      description:
        'Se sentir desorganizado com a avalanche de demandas e informações afeta diretamente o desempenho do negócio.',
    },
    {
      id: 2,
      icon: 'Target', // Ícone inicial (Lucide Icons)
      title: 'Esforço Repetitivo',
      description:
        'Tarefas manuais travam o bom uso do seu tempo e não te permite focar no que é essencial.',
    },
    {
      id: 3,
      icon: 'Database', // Ícone inicial (Lucide Icons)
      title: 'Resultados Insatisfatórios',
      description:
        'Recrutamento manual gera atrasos que impedem seu negócio de crescer na velocidade que ele poderia.',
    },
  ])

  const handleCardChange = (
    id: number,
    field: 'title' | 'description',
    value: string
  ) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Configurar Desafios de Recrutamento
      </h1>

      {/* Campos principais */}
      <div className="space-y-4">
        <div>
          <Label
            htmlFor="mainTitle"
            className="text-lg font-medium text-gray-700"
          >
            Título Principal
          </Label>
          <Input
            id="mainTitle"
            type="text"
            placeholder="Digite o título principal"
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>
        <div>
          <Label
            htmlFor="mainDescription"
            className="text-lg font-medium text-gray-700"
          >
            Descrição Principal
          </Label>
          <textarea
            id="mainDescription"
            placeholder="Digite a descrição principal"
            value={mainDescription}
            onChange={(e) => setMainDescription(e.target.value)}
            className="w-full border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg p-3 text-gray-900 h-20"
          />
        </div>
      </div>

      {/* Configuração dos Cards */}
      <div className="mt-8 space-y-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="p-4 bg-gray-100 rounded-lg shadow-md space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-700">
                Ícone Atual: <strong>{card.icon}</strong>
              </span>
              <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Selecionar Ícone
              </Button>
            </div>
            <div>
              <Label
                htmlFor={`title-${card.id}`}
                className="text-sm font-medium text-gray-700"
              >
                Título do Card
              </Label>
              <Input
                id={`title-${card.id}`}
                type="text"
                placeholder="Digite o título do card"
                value={card.title}
                onChange={(e) =>
                  handleCardChange(card.id, 'title', e.target.value)
                }
                className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
              />
            </div>
            <div>
              <Label
                htmlFor={`description-${card.id}`}
                className="text-sm font-medium text-gray-700"
              >
                Descrição do Card
              </Label>
              <textarea
                id={`description-${card.id}`}
                placeholder="Digite a descrição do card"
                value={card.description}
                onChange={(e) =>
                  handleCardChange(card.id, 'description', e.target.value)
                }
                className="w-full mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg p-3 text-gray-900 h-20"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
