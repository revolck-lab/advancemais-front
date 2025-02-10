import React, { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { TextareaDashboard } from '@/components/ui/textarea/textarea-dashboard'
import { useToast } from '@/hooks/use-toast'

export default function HowItWorks() {
  const { toast } = useToast()

  const [subtitle, setSubtitle] = useState<string>('Como funciona?')
  const [title, settitle] = useState<string>('Feito para ser simples!')
  const [description, setDescription] = useState<string>(
    'Você não precisa ser um expert para utilizar o nosso sistema de recrutamento.'
  )
  const [steps, setSteps] = useState<
    { id: number; title: string; description: string }[]
  >([
    {
      id: 1,
      title: 'Crie a conta da sua Empresa',
      description: 'Cadastre sua empresa e depois insira outros recrutadores.',
    },
    {
      id: 2,
      title: 'Publique sua Primeira Vaga',
      description: 'Em menos de 5 minutos você insere os dados das suas vagas.',
    },
    {
      id: 3,
      title: 'Receba seus Candidatos',
      description: 'Tudo estará pronto para que seus talentos se cadastrem.',
    },
  ])
  const handleSave = () => {
    if (
      !subtitle ||
      !title ||
      !description ||
      steps.some((step) => !step.title || !step.description)
    ) {
      toast({
        title: 'Erro ao salvar!',
        description:
          'Preencha os campos de Título e Subtítulo antes de salvar.',
        variant: 'danger',
      })
      return
    }

    // Simulação de salvar os dados
    console.log('Salvando...', {
      subtitle,
      title,
      description,
      steps,
    })

    toast({
      title: 'Salvo com sucesso!',
      description: 'As informações foram salvas com sucesso.',
      variant: 'success',
    })
  }

  const handleStepChange = (
    id: number,
    field: 'title' | 'description',
    value: string
  ) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === id ? { ...step, [field]: value } : step))
    )
  }

  return (
    <div className="p-4 mx-auto">
      {/* Seção de Título e Subtítulo na mesma linha */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          {/* Subtítulo */}
          <div className="w-full">
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
              onChange={(e) => setSubtitle(e.target.value.substring(0, 100))}
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
              maxLength={100}
            />
          </div>
          {/* Título */}
          <div className="w-full">
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
              onChange={(e) => settitle(e.target.value.substring(0, 100))}
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
              maxLength={100}
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Label
          htmlFor="description"
          className="text-base font-normal text-neutral required"
        >
          Descrição
        </Label>
        <TextareaDashboard
          id="description"
          value={description}
          onChange={(value: string) => setDescription(value.substring(0, 500))}
          placeholder="Digite a descrição"
        />
      </div>

      {/* Grid de Benefícios */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div key={step.id} className="p-4 border-1 rounded-lg space-y-4">
            <div>
              <Label
                htmlFor={`title-${step.id}`}
                className="text-sm font-medium text-gray-700"
              >
                Título
              </Label>
              <Input
                id={`title-${step.id}`}
                type="text"
                placeholder="Digite o título do passo"
                value={step.title}
                onChange={(e) =>
                  handleStepChange(step.id, 'title', e.target.value)
                }
                className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
              />
            </div>
            <div>
              <Label
                htmlFor={`description-${step.id}`}
                className="text-sm font-medium text-gray-700"
              >
                Descrição
              </Label>
              <TextareaDashboard
                id={`description-${step.id}`}
                value={step.description}
                onChange={(value: string) =>
                  handleStepChange(
                    step.id,
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
