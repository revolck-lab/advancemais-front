import React, { useState } from 'react'
import { Button } from '@/components/ui/button1'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import Image from 'next/image'

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
      setImage(file.name) // Simulação de nome de arquivo salvo
    }
  }

  const handleDeleteImage = () => {
    setPreviewImage(null)
    setImage(null)
  }

  const handleSave = () => {
    if (
      !title ||
      !description ||
      !overlayTitle ||
      !overlayDescription ||
      !image ||
      !buttonLabel ||
      !buttonUrl
    ) {
      alert('Preencha todos os campos antes de salvar.')
      return
    }

    // Simulação de salvar os dados
    console.log('Salvando...', {
      title,
      description,
      image,
      overlayTitle,
      overlayDescription,
      buttonLabel,
      buttonUrl,
    })

    alert('Informações salvas com sucesso!')
  }

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Configurar Sobre o Negócio
      </h1>

      {/* Campos principais */}
      <div className="flex flex-col space-y-6">
        {/* Título */}
        <div>
          <Label htmlFor="title" className="text-lg font-medium text-gray-700">
            Título
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Digite o título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>

        {/* Descrição */}
        <div>
          <Label
            htmlFor="description"
            className="text-lg font-medium text-gray-700"
          >
            Descrição
          </Label>
          <textarea
            id="description"
            placeholder="Digite a descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg p-3 text-gray-900 h-28 mt-2"
          />
        </div>

        {/* Imagem */}
        <div className="flex flex-col items-center space-y-4">
          {previewImage ? (
            <div className="relative group w-full">
              <Image
                src={previewImage}
                alt="Preview"
                width={600}
                height={400}
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
                className="text-lg font-medium text-gray-700"
              >
                Imagem
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-2 w-full border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Sobreposições na imagem */}
        <div>
          <Label
            htmlFor="overlayTitle"
            className="text-lg font-medium text-gray-700"
          >
            Título Sobreposto na Imagem
          </Label>
          <Input
            id="overlayTitle"
            type="text"
            placeholder="Digite o título sobreposto"
            value={overlayTitle}
            onChange={(e) => setOverlayTitle(e.target.value)}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>

        <div>
          <Label
            htmlFor="overlayDescription"
            className="text-lg font-medium text-gray-700"
          >
            Descrição Sobreposta na Imagem
          </Label>
          <textarea
            id="overlayDescription"
            placeholder="Digite a descrição sobreposta"
            value={overlayDescription}
            onChange={(e) => setOverlayDescription(e.target.value)}
            className="w-full border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg p-3 text-gray-900 h-20 mt-2"
          />
        </div>

        {/* Botão Sobreposto */}
        <div>
          <Label
            htmlFor="buttonLabel"
            className="text-lg font-medium text-gray-700"
          >
            Texto do Botão Sobreposto
          </Label>
          <Input
            id="buttonLabel"
            type="text"
            placeholder="Digite o texto do botão"
            value={buttonLabel}
            onChange={(e) => setButtonLabel(e.target.value)}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>

        <div>
          <Label
            htmlFor="buttonUrl"
            className="text-lg font-medium text-gray-700"
          >
            URL do Botão Sobreposto
          </Label>
          <Input
            id="buttonUrl"
            type="text"
            placeholder="Digite o URL do botão"
            value={buttonUrl}
            onChange={(e) => setButtonUrl(e.target.value)}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
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
  )
}
