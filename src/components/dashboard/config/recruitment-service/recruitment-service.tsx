import React, { useState } from 'react'
import { Button } from '@/components/ui/button1'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import Image from 'next/image'

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
  title,
  description,
  image,
  pro_item1,
  pro_item2,
  pro_item3,
  pro_item4,
}: RecruitmentServiceProps) {
  const [mainTitle, setMainTitle] = useState<string>(title)
  const [mainDescription, setMainDescription] = useState<string>(description)
  const [currentImage, setCurrentImage] = useState<string>(image)
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage)

  const [benefits, setBenefits] = useState<string[]>([
    pro_item1,
    pro_item2,
    pro_item3,
    pro_item4,
  ])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
      setCurrentImage(file.name) // Simulação de nome de arquivo salvo
    }
  }

  const handleBenefitChange = (index: number, value: string) => {
    setBenefits((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const handleSave = () => {
    if (!mainTitle || !mainDescription || !currentImage) {
      alert('Preencha todos os campos antes de salvar.')
      return
    }

    console.log('Salvando...', {
      title: mainTitle,
      description: mainDescription,
      image: currentImage,
      benefits,
    })

    alert('Informações salvas com sucesso!')
  }

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Configurar Serviço de Recrutamento & Seleção
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
                setCurrentImage('')
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

      {/* Lista de Benefícios (editáveis) */}
      <div className="mt-8 space-y-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 rounded-lg shadow-md space-y-4"
          >
            <div>
              <Label
                htmlFor={`benefit-${index}`}
                className="text-sm font-medium text-gray-700"
              >
                Benefício {index + 1}
              </Label>
              <textarea
                id={`benefit-${index}`}
                placeholder={`Digite o benefício ${index + 1}`}
                value={benefit}
                onChange={(e) => handleBenefitChange(index, e.target.value)}
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
