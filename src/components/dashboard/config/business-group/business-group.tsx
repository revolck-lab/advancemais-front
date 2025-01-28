import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import Image from 'next/image'

type GroupState = {
  title: string
  description: string
  image: string | null
  previewImage: string | null
  buttonText: string
  buttonUrl: string
}

export default function BusinessGroup() {
  const [group1, setGroup1] = useState<GroupState>({
    title: 'Conheça nosso serviço de Consultoria Empresarial',
    description:
      'O segredo para uma empresa de sucesso está em decisões estratégicas bem fundamentadas. A Advance+ oferece consultoria personalizada para auxiliar no crescimento sustentável e inovação do seu negócio.',
    image: '/images/home/banner_site_2.webp',
    previewImage: '/images/home/banner_site_2.webp',
    buttonText: 'Saiba mais',
    buttonUrl: '#',
  })

  const [group2, setGroup2] = useState<GroupState>({
    title: 'Conheça nosso serviço de Recrutamento & Seleção',
    description:
      'O segredo para uma empresa de sucesso está em decisões estratégicas bem fundamentadas. A Advance+ oferece consultoria personalizada para auxiliar no crescimento sustentável e inovação do seu negócio.',
    image: '/images/home/banner_site_2.webp',
    previewImage: '/images/home/banner_site_3.webp',
    buttonText: 'Saiba mais',
    buttonUrl: '#',
  })

  const handleImageUpload = (
    groupKey: 'group1' | 'group2',
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      if (groupKey === 'group1') {
        setGroup1((prev) => ({
          ...prev,
          previewImage: imageUrl,
          image: file.name, // Simulação de nome de arquivo salvo
        }))
      } else {
        setGroup2((prev) => ({
          ...prev,
          previewImage: imageUrl,
          image: file.name, // Simulação de nome de arquivo salvo
        }))
      }
    }
  }

  const handleDeleteImage = (groupKey: 'group1' | 'group2') => {
    if (groupKey === 'group1') {
      setGroup1((prev) => ({
        ...prev,
        previewImage: null,
        image: null,
      }))
    } else {
      setGroup2((prev) => ({
        ...prev,
        previewImage: null,
        image: null,
      }))
    }
  }

  const handleSave = () => {
    if (
      !group1.title ||
      !group1.description ||
      !group1.image ||
      !group1.buttonText ||
      !group1.buttonUrl
    ) {
      alert('Preencha todos os campos do Grupo 1 antes de salvar.')
      return
    }
    if (
      !group2.title ||
      !group2.description ||
      !group2.image ||
      !group2.buttonText ||
      !group2.buttonUrl
    ) {
      alert('Preencha todos os campos do Grupo 2 antes de salvar.')
      return
    }

    // Simulação de salvar os dados
    console.log('Salvando...', {
      group1,
      group2,
    })

    alert('Informações salvas com sucesso!')
  }

  const renderGroup = (
    group: GroupState,
    groupKey: 'group1' | 'group2',
    groupTitle: string
  ) => (
    <div className="flex flex-col md:flex-row gap-8 mb-8">
      {/* Coluna da Imagem */}
      <div className="flex flex-col items-center justify-start space-y-4 w-full md:w-1/2">
        {group.previewImage ? (
          <div className="relative group w-full">
            <Image
              src={group.previewImage}
              alt={`${groupTitle} Preview`}
              width={400}
              height={300}
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
            <button
              onClick={() => handleDeleteImage(groupKey)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Deletar
            </button>
          </div>
        ) : (
          <div className="w-full">
            <Label
              htmlFor={`${groupKey}-image`}
              className="text-lg font-medium text-gray-700"
            >
              Imagem
            </Label>
            <Input
              id={`${groupKey}-image`}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(groupKey, e)}
              className="mt-2 w-full border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Coluna de Título, Descrição e Botões */}
      <div className="flex flex-col space-y-6 w-full md:w-1/2">
        {/* Título */}
        <div>
          <Label
            htmlFor={`${groupKey}-title`}
            className="text-lg font-medium text-gray-700"
          >
            Título
          </Label>
          <Input
            id={`${groupKey}-title`}
            type="text"
            placeholder={`Digite o título do ${groupTitle}`}
            value={group.title}
            onChange={(e) =>
              groupKey === 'group1'
                ? setGroup1((prev) => ({ ...prev, title: e.target.value }))
                : setGroup2((prev) => ({ ...prev, title: e.target.value }))
            }
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>

        {/* Descrição */}
        <div>
          <Label
            htmlFor={`${groupKey}-description`}
            className="text-lg font-medium text-gray-700"
          >
            Descrição
          </Label>
          <textarea
            id={`${groupKey}-description`}
            placeholder={`Digite a descrição do ${groupTitle}`}
            value={group.description}
            onChange={(e) =>
              groupKey === 'group1'
                ? setGroup1((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                : setGroup2((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
            }
            className="w-full border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg p-3 text-gray-900 h-28 mt-2"
          />
        </div>

        {/* Botão Texto */}
        <div>
          <Label
            htmlFor={`${groupKey}-buttonText`}
            className="text-lg font-medium text-gray-700"
          >
            Texto do Botão
          </Label>
          <Input
            id={`${groupKey}-buttonText`}
            type="text"
            placeholder="Digite o texto do botão"
            value={group.buttonText}
            onChange={(e) =>
              groupKey === 'group1'
                ? setGroup1((prev) => ({ ...prev, buttonText: e.target.value }))
                : setGroup2((prev) => ({ ...prev, buttonText: e.target.value }))
            }
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>

        {/* Botão URL */}
        <div>
          <Label
            htmlFor={`${groupKey}-buttonUrl`}
            className="text-lg font-medium text-gray-700"
          >
            URL do Botão
          </Label>
          <Input
            id={`${groupKey}-buttonUrl`}
            type="text"
            placeholder="Digite a URL do botão"
            value={group.buttonUrl}
            onChange={(e) =>
              groupKey === 'group1'
                ? setGroup1((prev) => ({ ...prev, buttonUrl: e.target.value }))
                : setGroup2((prev) => ({ ...prev, buttonUrl: e.target.value }))
            }
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Configurar Grupos de Informações do Negócio
      </h1>

      {renderGroup(group1, 'group1', 'Grupo 1')}
      {renderGroup(group2, 'group2', 'Grupo 2')}

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
