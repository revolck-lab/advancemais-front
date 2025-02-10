import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { TextareaDashboard } from '@/components/ui/textarea/textarea-dashboard'
import { FileUpload } from '@/components/ui/file-upload/file-upload'
import { useToast } from '@/hooks/use-toast'

export default function AboutBusiness() {
  const [title, setTitle] = useState<string>('Sobre a AdvanceMais')
  const [description, setDescription] = useState<string>(
    'A AdvanceMais é uma empresa líder em soluções para educação e desenvolvimento corporativo. Oferecemos serviços inovadores que transformam desafios em oportunidades e capacitam profissionais para atender às demandas do mercado.\n\nDesde 2020, já impactamos mais de 500 empresas e auxiliamos milhares de profissionais na construção de carreiras sólidas, promovendo a transformação do ambiente de trabalho.\n\nNosso compromisso é continuar crescendo e fornecendo soluções personalizadas que impulsionam o sucesso de nossos clientes.'
  )
  const [image, setImage] = useState<string | null>(
    '/images/sobre/banner_about.webp'
  )
  const [previewImage, setPreviewImage] = useState<string | null>(image)

  const [overlayTitle, setOverlayTitle] = useState<string>(
    'Transformamos desafios em oportunidades reais.'
  )
  const [overlayDescription, setOverlayDescription] = useState<string>(
    'Descubra como podemos conectar talentos, transformar desafios em oportunidades e criar soluções que impulsionam resultados.'
  )
  const [buttonLabel, setButtonLabel] = useState<string>(
    'Solicitar consultoria'
  )
  const [buttonUrl, setButtonUrl] = useState<string>('#')
  const { toast } = useToast()

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
    if (!title || !description || !image || !buttonLabel || !buttonUrl) {
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
      image,
      buttonLabel,
      buttonUrl,
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
              onChange={(e) => setTitle(e.target.value.substring(0, 50))}
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
              maxLength={50}
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

          {/* Título Imagem */}
          <div>
            <Label
              htmlFor="titleImagem"
              className="text-base font-normal text-neutral required"
            >
              Título Sobreposto na Imagem
            </Label>
            <Input
              id="titleImagem"
              type="text"
              placeholder="Digite o título da imagem"
              value={overlayTitle}
              onChange={(e) => setOverlayTitle(e.target.value.substring(0, 50))}
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
              maxLength={50}
            />
          </div>

          {/* Descrição Imagem */}
          <div>
            <Label
              htmlFor="overlayDescription"
              className="text-base font-normal text-neutral required"
            >
              Descrição Sobreposta na Imagem
            </Label>
            <Input
              id="overlayDescription"
              type="text"
              placeholder="Digite o descrição da imagem"
              value={overlayDescription}
              onChange={(e) =>
                setOverlayDescription(e.target.value.substring(0, 250))
              }
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
              maxLength={250}
            />
          </div>

          {/* Botão */}
          <div>
            <Label
              htmlFor="buttonLabel"
              className="text-base font-normal text-neutral required"
            >
              Texto do Botão
            </Label>
            <Input
              id="buttonLabel"
              type="text"
              placeholder="Digite o texto do botão"
              value={buttonLabel}
              onChange={(e) => setButtonLabel(e.target.value.substring(0, 50))}
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
              maxLength={50} // Caso o componente Input suporte
            />
          </div>

          {/* Botão */}
          <div>
            <Label
              htmlFor="buttonUrl"
              className="text-base font-normal text-neutral required"
            >
              URL do Botão
            </Label>
            <Input
              id="buttonUrl"
              type="text"
              placeholder="Digite a URL do botão"
              value={buttonUrl}
              onChange={(e) => setButtonUrl(e.target.value.substring(0, 100))}
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
              maxLength={100}
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
