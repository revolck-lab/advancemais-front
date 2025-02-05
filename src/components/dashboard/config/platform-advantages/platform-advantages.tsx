import React, { useState } from 'react'
import { Button } from '@/components/ui/button1'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import Image from 'next/image'

export default function PlatformAdvantages() {
  const [mainTitle, setMainTitle] = useState<string>(
    'Nós ajudamos você a migrar para a advance+'
  )
  const [mainDescription, setMainDescription] = useState<string>(
    'Com a nossa plataforma você facilmente deixa tarefas chatas e repetitivas para trás com um sistema de recrutamento e seleção e foca no que mais importa em seu processo: escolher as pessoas certas!'
  )
  const [image, setImage] = useState<string | null>(
    '/images/home/banner_site_2.webp'
  )
  const [previewImage, setPreviewImage] = useState<string | null>(image)

  const [advantages, setAdvantages] = useState<
    { id: number; title: string; description: string }[]
  >([
    {
      id: 1,
      title: 'Atenda melhor os candidatos',
      description:
        'Tenha ferramentas incríveis para gerenciar e se comunicar melhor com seus potenciais talentos.',
    },
    {
      id: 2,
      title: 'Ganhe Produtividade',
      description:
        'Atinga seus objetivos de recrutamento e seleção com menos esforço e otimize melhor seu tempo com nosso sistema.',
    },
    {
      id: 3,
      title: 'Centralize Informações',
      description:
        'Realize as atividades mais importantes de emails e planilhas num só lugar, de um jeito mais fácil e organizado.',
    },
  ])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
      setImage(file.name) // Simulação de nome de arquivo salvo
    }
  }

  const handleAdvantageChange = (
    id: number,
    field: 'title' | 'description',
    value: string
  ) => {
    setAdvantages((prev) =>
      prev.map((advantage) =>
        advantage.id === id ? { ...advantage, [field]: value } : advantage
      )
    )
  }

  const handleSave = () => {
    if (
      !mainTitle ||
      !mainDescription ||
      !image ||
      advantages.some((adv) => !adv.title || !adv.description)
    ) {
      alert('Preencha todos os campos antes de salvar.')
      return
    }

    // Simulação de salvar os dados
    console.log('Salvando...', {
      mainTitle,
      mainDescription,
      image,
      advantages,
    })

    alert('Informações salvas com sucesso!')
  }

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Configurar Vantagens da Plataforma
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

      {/* Configuração da Imagem */}
      <div className="mt-8 space-y-4">
        {previewImage ? (
          <div className="relative group w-full">
            <Image
              src={previewImage}
              alt="Preview"
              width={500}
              height={300}
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
            <button
              onClick={() => {
                setPreviewImage(null)
                setImage(null)
              }}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Deletar
            </button>
          </div>
        ) : (
          <div>
            <Label
              htmlFor="image"
              className="text-lg font-medium text-gray-700"
            >
              Imagem
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Configuração das Vantagens */}
      <div className="mt-8 space-y-6">
        {advantages.map((advantage) => (
          <div
            key={advantage.id}
            className="p-4 bg-gray-100 rounded-lg shadow-md space-y-4"
          >
            <div>
              <Label
                htmlFor={`title-${advantage.id}`}
                className="text-sm font-medium text-gray-700"
              >
                Título da Vantagem
              </Label>
              <Input
                id={`title-${advantage.id}`}
                type="text"
                placeholder="Digite o título da vantagem"
                value={advantage.title}
                onChange={(e) =>
                  handleAdvantageChange(advantage.id, 'title', e.target.value)
                }
                className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
              />
            </div>
            <div>
              <Label
                htmlFor={`description-${advantage.id}`}
                className="text-sm font-medium text-gray-700"
              >
                Descrição da Vantagem
              </Label>
              <textarea
                id={`description-${advantage.id}`}
                placeholder="Digite a descrição da vantagem"
                value={advantage.description}
                onChange={(e) =>
                  handleAdvantageChange(
                    advantage.id,
                    'description',
                    e.target.value
                  )
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
