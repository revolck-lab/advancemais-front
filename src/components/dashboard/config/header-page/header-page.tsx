// src/components/dashboard/config/header-page/header-page.tsx
import React, { useState } from 'react'
import { Button } from '@/components/ui/button1'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import Image from 'next/image'

interface HeaderPagesAPIProps {
  subtitle: string
  title: string
  description: string
  buttonLabel: string
  buttonUrl: string
  image: string
}

export default function HeaderPagesAPI({
  subtitle: initialSubtitle,
  title: initialTitle,
  description: initialDescription,
  buttonLabel: initialButtonLabel,
  buttonUrl: initialButtonUrl,
  image: initialImage,
}: HeaderPagesAPIProps) {
  const [subtitle, setSubtitle] = useState<string>(initialSubtitle)
  const [title, setTitle] = useState<string>(initialTitle)
  const [description, setDescription] = useState<string>(initialDescription)
  const [buttonLabel, setButtonLabel] = useState<string>(initialButtonLabel)
  const [buttonUrl, setButtonUrl] = useState<string>(initialButtonUrl)
  const [image, setImage] = useState<string | null>(initialImage)
  const [previewImage, setPreviewImage] = useState<string | null>(image)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
      setImage(file.name)
    }
  }

  const handleDeleteImage = () => {
    setPreviewImage(null)
    setImage(null)
  }

  const handleSave = () => {
    if (
      !subtitle ||
      !title ||
      !description ||
      !image ||
      !buttonLabel ||
      !buttonUrl
    ) {
      alert('Preencha todos os campos antes de salvar.')
      return
    }

    console.log('Salvando...', {
      subtitle,
      title,
      description,
      image,
      buttonLabel,
      buttonUrl,
    })

    alert('Informações salvas com sucesso!')
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Configurar Informações do Negócio
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
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

        <div className="flex flex-col space-y-6 w-full md:w-1/2">
          <div>
            <Label
              htmlFor="subtitle"
              className="text-lg font-medium text-gray-700"
            >
              Subtítulo
            </Label>
            <Input
              id="subtitle"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
            />
          </div>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
            />
          </div>
          <div>
            <Label
              htmlFor="description"
              className="text-lg font-medium text-gray-700"
            >
              Descrição
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg p-3 text-gray-900 h-28"
            />
          </div>
          <div>
            <Label
              htmlFor="buttonLabel"
              className="text-lg font-medium text-gray-700"
            >
              Texto do Botão
            </Label>
            <Input
              id="buttonLabel"
              type="text"
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
              URL do Botão
            </Label>
            <Input
              id="buttonUrl"
              type="text"
              value={buttonUrl}
              onChange={(e) => setButtonUrl(e.target.value)}
              className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg"
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
