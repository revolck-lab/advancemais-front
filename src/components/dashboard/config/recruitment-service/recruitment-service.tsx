import React, { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import Image from 'next/image'
import { TextareaDashboard } from '@/components/ui/textarea/textarea-dashboard'
import { FileUpload } from '@/components/ui/file-upload/file-upload'
import { useToast } from '@/hooks/use-toast'

interface RecruitmentServiceProps {
  title: string
  description: string
  image: string
  pro_item1: string
  pro_item2: string
  pro_item3: string
  pro_item4: string
}

export default function RecruitmentService({
  title: initialTitle,
  description: initialDescription,
  image: initialImage,
  pro_item1,
  pro_item2,
  pro_item3,
  pro_item4,
}: RecruitmentServiceProps) {
  const { toast } = useToast()

  // Inicializa os valores do serviço com os dados das props
  const [serviceTitle, setServiceTitle] = useState<string>(
    initialTitle || 'Nós ajudamos você a migrar para a advance+'
  )
  const [serviceDescription, setServiceDescription] = useState<string>(
    initialDescription ||
      'Com a nossa plataforma você facilmente deixa tarefas chatas e repetitivas para trás com um sistema de recrutamento e seleção e foca no que mais importa em seu processo: escolher as pessoas certas!'
  )
  const [serviceImage, setServiceImage] = useState<string | null>(
    initialImage || '/images/home/banner_site_2.webp'
  )
  const [previewImage, setPreviewImage] = useState<string | null>(serviceImage)

  // Os benefícios são inicializados com os pro_items
  const [benefits, setBenefits] = useState<string[]>([
    pro_item1,
    pro_item2,
    pro_item3,
    pro_item4,
  ])

  const handleBenefitChange = (index: number, value: string) => {
    setBenefits((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  // Função chamada ao fazer upload de uma nova imagem
  const handleImageUpload = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0]
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
      setServiceImage(file.name) // Simulação de nome de arquivo salvo
    }
  }

  // Função chamada ao remover a imagem
  const handleDeleteImage = () => {
    setPreviewImage(null)
    setServiceImage(null)
  }

  const handleSave = () => {
    if (!serviceTitle || !serviceDescription || !serviceImage) {
      toast({
        title: 'Erro ao salvar!',
        description: 'Preencha todos os campos antes de salvar.',
        variant: 'danger',
      })
      return
    }

    // Simulação de salvar os dados
    console.log('Salvando...', {
      title: serviceTitle,
      description: serviceDescription,
      image: serviceImage,
      benefits,
    })

    toast({
      title: 'Salvo com sucesso!',
      description: 'As informações foram salvas com sucesso.',
      variant: 'success',
    })
  }

  return (
    <div className="p-4 mx-auto">
      {/* Seção principal com imagem e dados */}
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
              value={serviceTitle}
              onChange={(e) =>
                setServiceTitle(e.target.value.substring(0, 100))
              }
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
              value={serviceDescription}
              onChange={(value: string) =>
                setServiceDescription(value.substring(0, 500))
              }
              placeholder="Digite a descrição"
            />
          </div>
        </div>
      </div>

      {/* Grid de Benefícios */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="p-4 border-1 rounded-lg space-y-4">
            <div>
              <Label
                htmlFor={`benefit-${index}`}
                className="text-sm font-medium text-gray-700 required"
              >
                Benefício {index + 1}
              </Label>
              <TextareaDashboard
                id={`benefit-${index}`}
                value={benefit}
                onChange={(value: string) =>
                  handleBenefitChange(index, value.substring(0, 200))
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
