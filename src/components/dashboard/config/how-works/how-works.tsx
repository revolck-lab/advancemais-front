import React, { useState } from 'react'
import { Button } from '@/components/ui/button1'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'

export default function HowItWorks() {
  const [subtitle, setSubtitle] = useState<string>('Como funciona?')
  const [mainTitle, setMainTitle] = useState<string>('Feito para ser simples!')
  const [mainDescription, setMainDescription] = useState<string>(
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

  const handleStepChange = (
    id: number,
    field: 'title' | 'description',
    value: string
  ) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === id ? { ...step, [field]: value } : step))
    )
  }

  const handleSave = () => {
    if (
      !subtitle ||
      !mainTitle ||
      !mainDescription ||
      steps.some((step) => !step.title || !step.description)
    ) {
      alert('Preencha todos os campos antes de salvar.')
      return
    }

    // Simulação de salvar os dados
    console.log('Salvando...', {
      subtitle,
      mainTitle,
      mainDescription,
      steps,
    })

    alert('Informações salvas com sucesso!')
  }

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Configurar Seção - Como Funciona
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

      {/* Configuração dos Passos */}
      <div className="mt-8 space-y-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="p-4 bg-gray-100 rounded-lg shadow-md space-y-4"
          >
            <div>
              <Label
                htmlFor={`title-${step.id}`}
                className="text-sm font-medium text-gray-700"
              >
                Título do Passo {step.id}
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
                Descrição do Passo {step.id}
              </Label>
              <textarea
                id={`description-${step.id}`}
                placeholder="Digite a descrição do passo"
                value={step.description}
                onChange={(e) =>
                  handleStepChange(step.id, 'description', e.target.value)
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
