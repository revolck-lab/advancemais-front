import React, { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import Image from 'next/image'
import { TextareaDashboard } from '@/components/ui/textarea/textarea-dashboard'
import { FileUpload } from '@/components/ui/file-upload/file-upload'
import { useToast } from '@/hooks/use-toast'

export default function PlatformAdvantages() {
  const { toast } = useToast()

  const [title, setTitle] = useState<string>(
    'Nós ajudamos você a migrar para a advance+'
  )
  const [description, setDescription] = useState<string>(
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

  // Função chamada ao fazer upload de uma nova imagem
  const handleImageUpload = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0]
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
      setImage(file.name) // Simulação de nome de arquivo salvo
    }
  }

  // Função chamada ao remover a imagem
  const handleDeleteImage = () => {
    setPreviewImage(null)
    setImage(null)
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
      !title ||
      !description ||
      !image ||
      advantages.some((adv) => !adv.title || !adv.description)
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
      title,
      description,
      image,
      advantages,
    })

    toast({
      title: 'Salvo com sucesso!',
      description: 'As informações foram salvas com sucesso.',
      variant: 'success',
    })
  }

  return (
    <div className="p-4 mx-auto">
      {/* O toast será exibido globalmente via o hook useToast */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Coluna da Imagem */}
        <div className="flex flex-col items-center justify-start space-y-4 w-full md:w-1/2">
          {previewImage ? (
            <div className="relative group w-full">
              <Image
                src={previewImage}
                alt="Preview"
                width={400}
                height={300}
                className="rounded-lg shadow-md w-full h-auto object-cover"
              />
              <button
                onClick={handleDeleteImage}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Deletar
              </button>
            </div>
          ) : (
            <div className="w-full">
              <Label
                htmlFor="image"
                className="text-lg font-medium text-gray-700 required"
              >
                Imagem
              </Label>
              <FileUpload
                maxFiles={1}
                maxSize={5 * 1024 * 1024} // 5MB máximo
                allowedFormats={['image/jpeg', 'image/png', 'image/webp']}
                onUpload={handleImageUpload}
                onRemove={handleDeleteImage}
              />
            </div>
          )}
        </div>

        {/* Coluna de Título e Descrição */}
        <div className="flex flex-col space-y-6 w-full md:w-1/2">
          {/* Título */}
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

          {/* Descrição */}
          <div>
            <Label
              htmlFor="description"
              className="text-base font-normal text-neutral required"
            >
              Descrição
            </Label>
            <TextareaDashboard
              value={description}
              onChange={(value: string) =>
                setDescription(value.substring(0, 500))
              }
              placeholder="Digite a descrição"
            />
          </div>
        </div>
      </div>

      {/* Grid de Vantagens */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {advantages.map((advantage) => (
          <div
            key={advantage.id}
            className="p-4 border border-gray-300 rounded-lg space-y-4"
          >
            <div>
              <Label
                htmlFor={`title-${advantage.id}`}
                className="text-sm font-medium text-gray-700"
              >
                Título da vantagem
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
              <TextareaDashboard
                id={`description-${advantage.id}`}
                value={advantage.description}
                onChange={(value: string) =>
                  handleAdvantageChange(
                    advantage.id,
                    'description',
                    value.substring(0, 200)
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
