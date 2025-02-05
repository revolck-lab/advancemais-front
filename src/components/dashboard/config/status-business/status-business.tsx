import React, { useState } from 'react'
import { Button } from '@/components/ui/button1'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'

export default function StatsSection() {
  const [subtitle, setSubtitle] = useState<string>('Impulsione sua carreira')
  const [title, setTitle] = useState<string>('no mercado de trabalho')
  const [stats, setStats] = useState<
    { id: number; number: string; description: string }[]
  >([
    {
      id: 1,
      number: '30%',
      description:
        'Profissionais que investem em estudos contínuos têm, em média, aumento de 30% em suas oportunidades de promoção.',
    },
    {
      id: 2,
      number: '4x',
      description:
        'Profissionais com objetivos de carreira são 4x mais engajados com a aprendizagem do que os que não têm metas definidas.',
    },
    {
      id: 3,
      number: '85%',
      description:
        'Profissionais que investem em aprendizado contínuo têm 85% mais chances de promoção.',
    },
  ])

  const handleStatChange = (
    id: number,
    field: 'number' | 'description',
    value: string
  ) => {
    setStats((prev) =>
      prev.map((stat) => (stat.id === id ? { ...stat, [field]: value } : stat))
    )
  }

  const handleSave = () => {
    if (
      !subtitle ||
      !title ||
      stats.some((stat) => !stat.number || !stat.description)
    ) {
      alert('Preencha todos os campos antes de salvar.')
      return
    }

    // Simulação de salvar os dados
    console.log('Salvando...', {
      subtitle,
      title,
      stats,
    })

    alert('Informações salvas com sucesso!')
  }

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Configurar Seção de Estatísticas
      </h1>

      {/* Campos principais */}
      <div className="space-y-4">
        <div>
          <Label
            htmlFor="subtitle"
            className="text-lg font-medium text-gray-700"
          >
            Subtítulo
          </Label>
          <Input
            id="subtitle"
            type="text"
            placeholder="Digite o subtítulo"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>
        <div>
          <Label htmlFor="title" className="text-lg font-medium text-gray-700">
            Título
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Digite o título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>
      </div>

      {/* Configuração dos Cards de Estatísticas */}
      <div className="mt-8 space-y-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="p-4 bg-gray-100 rounded-lg shadow-md space-y-4"
          >
            <div>
              <Label
                htmlFor={`number-${stat.id}`}
                className="text-sm font-medium text-gray-700"
              >
                Número em Destaque
              </Label>
              <Input
                id={`number-${stat.id}`}
                type="text"
                placeholder="Digite o número ou porcentagem"
                value={stat.number}
                onChange={(e) =>
                  handleStatChange(stat.id, 'number', e.target.value)
                }
                className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
              />
            </div>
            <div>
              <Label
                htmlFor={`description-${stat.id}`}
                className="text-sm font-medium text-gray-700"
              >
                Descrição
              </Label>
              <textarea
                id={`description-${stat.id}`}
                placeholder="Digite a descrição"
                value={stat.description}
                onChange={(e) =>
                  handleStatChange(stat.id, 'description', e.target.value)
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
          onClick={handleSave}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}
