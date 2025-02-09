// src/components/dashboard/config/business-info/business-info.tsx
import React, { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import Image from 'next/image'
import { TextareaDashboard } from '@/components/ui/textarea/textarea-dashboard'
import { FileUpload } from '@/components/ui/file-upload/file-upload'
import { useToast } from '@/hooks/use-toast'

export default function BusinessInfo() {
  const { toast } = useToast()

  const [title, setTitle] = useState<string>(
    'Acelere o crescimento do seu negócio'
  )
  const [description, setDescription] = useState<string>(
    'Na Advance+, fornecemos soluções estratégicas em gestão de pessoas e recrutamento, focadas em elevar o desempenho e a competitividade da sua empresa. Nosso trabalho envolve identificar e desenvolver talentos, otimizar processos e fortalecer a cultura organizacional, reduzindo custos de rotatividade e aumentando a produtividade da equipe. Conte conosco para potencializar resultados e alcançar novos patamares de sucesso.'
  )
  const [image, setImage] = useState<string | null>(
    '/images/home/banner_info.webp'
  )
  const [previewImage, setPreviewImage] = useState<string | null>(image)

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

  const handleSave = () => {
    if (!title || !description || !image) {
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
              maxLength={100} // Caso o componente Input suporte
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
              onChange={(value) => setDescription(value.substring(0, 500))}
              placeholder="Digite a descrição"
            />
          </div>

          {/* Botão Salvar */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
