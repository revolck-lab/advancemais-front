import React, { useState } from 'react'
import { Button } from '@/components/ui/button1'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'

export default function InCompanyTraining() {
  const [mainTitle, setMainTitle] = useState<string>(
    'O TREINAMENTO IN COMPANY É IDEAL PARA'
  )
  const [items, setItems] = useState<
    { id: number; icon: string; description: string }[]
  >([
    {
      id: 1,
      icon: 'Settings',
      description: 'Enxergar novas oportunidades nos processos',
    },
    {
      id: 2,
      icon: 'FileText',
      description: 'Repensar como o trabalho atual é feito',
    },
    {
      id: 3,
      icon: 'PieChart',
      description: 'Aprender como resolver problemas',
    },
    {
      id: 4,
      icon: 'BarChart2',
      description: 'Aplicar conhecimento em um caso real da empresa',
    },
    {
      id: 5,
      icon: 'TrendingUp',
      description: 'Desafiar os resultados da empresa',
    },
  ])

  const handleItemChange = (
    id: number,
    field: 'description',
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Configurar Treinamento In Company
      </h1>

      {/* Campo principal do título */}
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
      </div>

      {/* Configuração dos Itens */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-gray-100 rounded-lg shadow-md space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-700">
                Ícone Atual: <strong>{item.icon}</strong>
              </span>
              <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Selecionar Ícone
              </Button>
            </div>
            <div>
              <Label
                htmlFor={`description-${item.id}`}
                className="text-sm font-medium text-gray-700"
              >
                Descrição
              </Label>
              <textarea
                id={`description-${item.id}`}
                placeholder="Digite a descrição"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(item.id, 'description', e.target.value)
                }
                className="w-full mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg p-3 text-gray-900 h-20"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => console.log({ mainTitle, items })}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}
