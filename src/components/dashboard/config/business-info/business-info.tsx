import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import Image from 'next/image'

export default function BusinessInfo() {
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
    if (!title || !description || !image) {
      alert('Preencha todos os campos antes de salvar.')
      return
    }

    // Simulação de salvar os dados
    console.log('Salvando...', {
      title,
      description,
      image,
    })

    alert('Informações salvas com sucesso!')
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Configurar Informações do Negócio
      </h1>

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

        {/* Coluna de Título e Descrição */}
        <div className="flex flex-col space-y-6 w-full md:w-1/2">
          {/* Título */}
          <div>
            <Label
              htmlFor="title"
              className="text-lg font-medium text-gray-700"
            >
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
