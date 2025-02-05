import React, { useState } from 'react'
import IconSelectorModal from '@/components/ui/icon-selector/icon-selector-modal'

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
  const [currentBoxId, setCurrentBoxId] = useState<number | null>(null)

  const handleOpenModal = (id: number) => {
    setCurrentBoxId(id)
    setIsModalOpen(true)
  }

  const handleIconSelect = (icon: string) => {
    if (currentBoxId !== null) {
      setBoxes((prev) =>
        prev.map((box) => (box.id === currentBoxId ? { ...box, icon } : box))
      )
    }
    setIsModalOpen(false)
  }

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Configurar Informações - Por que nos escolher?
      </h1>

      {/* Campos principais */}
      <div className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Título Principal
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Descrição Principal
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-20"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Texto do Botão
          </label>
          <input
            type="text"
            value={buttonLabel}
            onChange={(e) => setButtonLabel(e.target.value)}
            className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            URL do Botão
          </label>
          <input
            type="text"
            value={buttonUrl}
            onChange={(e) => setButtonUrl(e.target.value)}
            className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Configuração dos Boxes */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="p-4 bg-blue-900 rounded-lg shadow-md text-white space-y-4"
          >
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleOpenModal(box.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Alterar Ícone
              </button>
              <span className="text-gray-100">
                <strong>{box.icon}</strong>
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Título do Box
              </label>
              <input
                type="text"
                value={box.title}
                onChange={(e) =>
                  setBoxes((prev) =>
                    prev.map((b) =>
                      b.id === box.id ? { ...b, title: e.target.value } : b
                    )
                  )
                }
                className="w-full mt-2 p-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Descrição do Box
              </label>
              <textarea
                value={box.description}
                onChange={(e) =>
                  setBoxes((prev) =>
                    prev.map((b) =>
                      b.id === box.id
                        ? { ...b, description: e.target.value }
                        : b
                    )
                  )
                }
                className="w-full mt-2 p-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 h-20"
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
    </div>
  )
}
