import React, { useState } from 'react'
import { Button } from '@/components/ui/button1'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import Image from 'next/image'

export default function StrongConnectionSection() {
  const [title, setTitle] = useState<string>('Conexão Forte = Resultado Forte')
  const [description, setDescription] = useState<string>(
    `De acordo com uma pesquisa recente (Front) realizada com mais de 1.100 profissionais, um dos principais padrões das equipes de alta performance é a comunicação aberta e de confiança.

Estes times valorizam o tempo de cada um e possuem fortes habilidades de comunicação.

Entendemos que o seu desafio é único e focamos na personalização de acordo com as necessidades de comunicação da sua equipe. Conheça nossas soluções que já ajudaram centenas de empresas a se comunicarem de forma estratégica e eficaz.`
  )
  const [images, setImages] = useState<string[]>([
    '/images/home/banner_site_2.webp',
    '/images/home/banner_site_3.webp',
    '/images/home/banner_info.webp',
    '/images/sobre/banner_about.webp',
  ])
  const [previewImages, setPreviewImages] = useState<string[]>([...images])

  const handleImageUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      const updatedImages = [...previewImages]
      updatedImages[index] = imageUrl
      setPreviewImages(updatedImages)

      const storedImages = [...images]
      storedImages[index] = file.name // Simulação de nome de arquivo salvo
      setImages(storedImages)
    }
  }

  const handleSave = () => {
    if (!title || !description || images.some((img) => !img)) {
      alert('Preencha todos os campos antes de salvar.')
      return
    }

    // Simulação de salvamento
    console.log('Salvando...', {
      title,
      description,
      images,
    })

    alert('Informações salvas com sucesso!')
  }

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Configurar Seção - Conexão Forte
      </h1>

      {/* Título e Descrição */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-lg font-medium text-gray-700">
            Título Principal
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Digite o título principal"
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
            Descrição Principal
          </Label>
          <textarea
            id="description"
            placeholder="Digite a descrição principal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg p-3 text-gray-900 h-32"
          />
        </div>
      </div>

      {/* Galeria de Imagens */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {previewImages.map((img, index) => (
          <div
            key={index}
            className="relative group p-4 bg-gray-100 rounded-lg shadow-md"
          >
            {img ? (
              <Image
                src={img}
                alt={`Preview ${index + 1}`}
                width={300}
                height={200}
                className="rounded-lg w-full h-auto object-cover"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded-lg">
                <span className="text-gray-500">Sem imagem</span>
              </div>
            )}
            <div className="mt-2">
              <Label
                htmlFor={`image-${index}`}
                className="text-sm font-medium text-gray-700"
              >
                Upload de Imagem {index + 1}
              </Label>
              <Input
                id={`image-${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(index, e)}
                className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg"
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
