import React, { useState } from 'react'
import IconSelectorModal from '@/components/ui/icon-selector/icon-selector-modal'
import { Label } from '@/components/ui/label/label'
import { Input } from '@/components/ui/input/input'
import { TextareaDashboard } from '@/components/ui/textarea/textarea-dashboard'
import InputIcons from '@/components/ui/select-icons/inputIcons'
import { Button } from '@/components/ui/button/button'
import { toast } from '@/hooks/use-toast'

export default function WhatBusiness() {
  const [title, setTitle] = useState<string>('Por que escolher a AdvanceMais?')
  const [description, setDescription] = useState<string>(
    'Descubra os motivos pelos quais somos a escolha certa para conectar talentos, impulsionar empresas e promover soluções que transformam o mercado.'
  )
  const [buttonLabel, setButtonLabel] = useState<string>('Quero um diagnóstico')
  const [buttonUrl, setButtonUrl] = useState<string>('/contato')

  const [boxes, setBoxes] = useState<
    { id: number; icon: string; title: string; description: string }[]
  >([
    {
      id: 1,
      icon: 'User',
      title: 'Talentos e Empresas',
      description:
        'Unindo profissionais qualificados a empresas que compartilham valores e objetivos, promovendo crescimento e realizações mútuas.',
    },
    {
      id: 2,
      icon: 'Heart',
      title: 'Desenvolver Potenciais',
      description:
        'Oferecemos treinamentos e consultorias personalizadas que preparam profissionais e empresas para superar desafios, crescer e alcançar seus sonhos.',
    },
    {
      id: 3,
      icon: 'Lightbulb',
      title: 'Fomentar Inovação',
      description:
        'Apoiamos a criação de soluções inovadoras que tornam empresas mais competitivas e preparadas para enfrentar os desafios de um mundo em constante transformação.',
    },
    {
      id: 4,
      icon: 'Shield',
      title: 'Compromisso',
      description:
        'Trabalhamos com ética e dedicação para garantir que empresas e profissionais atinjam resultados extraordinários, construindo um futuro sólido e promissor.',
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentBoxId] = useState<number | null>(null)

  const handleIconSelect = (icon: string) => {
    if (currentBoxId !== null) {
      setBoxes((prev) =>
        prev.map((box) => (box.id === currentBoxId ? { ...box, icon } : box))
      )
    }
    setIsModalOpen(false)
  }

  const handleSave = () => {
    if (!title || !description) {
      toast({
        title: 'Erro ao salvar!',
        description: 'Preencha todos os campos antes de salvar.',
        variant: 'danger',
      })
      return
    }

    console.log('Salvando...', {
      title,
      description,
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
            maxLength={100} // Caso o componente Input suporte
          />
        </div>
        <div>
          <Label
            htmlFor="description"
            className="text-base font-normal text-neutral required"
          >
            Descrição
          </Label>
          <TextareaDashboard
            value={description}
            onChange={(value) => setDescription(value.substring(0, 500))}
            placeholder="Digite a descrição"
          />
        </div>
        <div>
          <Label
            htmlFor="buttonText"
            className="text-base font-normal text-neutral required"
          >
            Texto do Botão
          </Label>
          <Input
            id="buttonText"
            type="text"
            placeholder="Digite o texto do botão"
            value={buttonLabel}
            onChange={(e) => setButtonLabel(e.target.value.substring(0, 100))}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
            maxLength={100}
          />
        </div>
        <div>
          <Label
            htmlFor="buttonURL"
            className="text-base font-normal text-neutral required"
          >
            URL do Botão
          </Label>
          <Input
            id="buttonURL"
            type="text"
            placeholder="Digite o texto do botão"
            value={buttonUrl}
            onChange={(e) => setButtonUrl(e.target.value.substring(0, 100))}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
            maxLength={100}
          />
        </div>
      </div>

      {/* Configuração dos Boxes */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="p-4 bg-white rounded-lg border-1 border-neutral-100 text-neutral space-y-4"
          >
            <div className="flex items-center justify-between">
              {/* Componente InputIcons para alterar o ícone */}
              <div className="flex items-center">
                <InputIcons
                  onIconSelect={(iconName) =>
                    setBoxes((prev) =>
                      prev.map((b) =>
                        b.id === box.id ? { ...b, icon: iconName } : b
                      )
                    )
                  }
                />
              </div>
              <span className="text-neutral">
                <strong>{box.icon}</strong>
              </span>
            </div>
            <div>
              <Label
                htmlFor={`titleBox-${box.id}`}
                className="text-base font-normal text-neutral required"
              >
                Título do Box
              </Label>
              <Input
                id={`titleBox-${box.id}`}
                type="text"
                placeholder="Digite o título"
                value={box.title}
                onChange={(e) =>
                  setBoxes((prev) =>
                    prev.map((b) =>
                      b.id === box.id
                        ? { ...b, title: e.target.value.substring(0, 50) }
                        : b
                    )
                  )
                }
                className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
                maxLength={50}
              />
            </div>
            <div>
              <Label
                htmlFor={`descriptionBox-${box.id}`}
                className="text-base font-normal text-neutral required"
              >
                Descrição do Box
              </Label>
              <TextareaDashboard
                value={box.description}
                onChange={(value: string) =>
                  setBoxes((prev) =>
                    prev.map((b) =>
                      b.id === box.id
                        ? { ...b, description: value.substring(0, 200) }
                        : b
                    )
                  )
                }
                placeholder="Digite a descrição"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal para Seleção de Ícones */}
      <IconSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleIconSelect}
      />

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
