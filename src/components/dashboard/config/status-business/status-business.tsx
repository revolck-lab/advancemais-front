import React, { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { TextareaDashboard } from '@/components/ui/textarea/textarea-dashboard'
import { useToast } from '@/hooks/use-toast'

export default function StatsSection() {
  const { toast } = useToast()
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
      toast({
        title: 'Erro ao salvar!',
        description: 'Preencha todos os campos antes de salvar.',
        variant: 'danger',
      })
      return
    }

    // Simulação de salvar os dados
    console.log('Salvando...', {
      subtitle,
      title,
      stats,
    })

    toast({
      title: 'Salvo com sucesso!',
      description: 'As informações foram salvas com sucesso.',
      variant: 'success',
    })
  }

  return (
    <div className="p-4 mx-auto">
      {/* Campos principais */}
      <div className="space-y-4">
        <div>
          <Label
            htmlFor="subtitle"
            className="text-base font-normal text-neutral required"
          >
            Subtítulo
          </Label>
          <Input
            id="subtitle"
            type="text"
            placeholder="Digite o subtítulo"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value.substring(0, 50))}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
            maxLength={50}
          />
        </div>
        <div>
          <Label
            htmlFor="title"
            className="text-base font-normal text-neutral required"
          >
            Título
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Digite o título"
            value={title}
            onChange={(e) => setTitle(e.target.value.substring(0, 100))}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
            maxLength={100}
          />
        </div>
      </div>
      <div className="mt-8 space-y-6">
        {stats.map((stat, index) => (
          <div key={stat.id} className="rounded-lg space-y-4">
            <div>
              <Label
                htmlFor={`number-${stat.id}`}
                className="text-sm font-medium text-gray-700"
              >
                Número em Destaque{' '}
                <span className="bg-primary text-white rounded-xl px-1 py-1 text-xs ml-2">
                  {String(index + 1).padStart(2, '0')}
                </span>
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
              <TextareaDashboard
                id={`description-${stat.id}`}
                value={stat.description}
                onChange={(value: string) =>
                  handleStatChange(
                    stat.id,
                    'description',
                    value.substring(0, 500)
                  )
                }
                placeholder="Digite a descrição"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end mt-5">
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
