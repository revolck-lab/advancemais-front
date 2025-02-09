// src/components/dashboard/config/business-group/business-group.tsx
import React, { useState } from 'react'
import { Button } from '@/components/ui/button1'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import Image from 'next/image'
import { FileUpload } from '@/components/ui/file-upload/file-upload'
import { TextareaDashboard } from '@/components/ui/textarea/textarea-dashboard'
import { useToast } from '@/hooks/use-toast'

type GroupState = {
  title: string
  description: string
  image: string | null
  previewImage: string | null
  buttonText: string
  buttonUrl: string
}

export default function BusinessGroup() {
  const { toast } = useToast()
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

  const handleImageUpload = (groupKey: 'group1' | 'group2', files: File[]) => {
    if (files.length > 0) {
      const file = files[0]
      const imageUrl = URL.createObjectURL(file)
      if (groupKey === 'group1') {
        setGroup1((prev) => ({
          ...prev,
          previewImage: imageUrl,
          image: file.name, // Simula nome do arquivo salvo
        }))
      } else {
        setGroup2((prev) => ({
          ...prev,
          previewImage: imageUrl,
          image: file.name,
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
      toast({
        title: 'Erro ao salvar!',
        description: 'Preencha todos os campos do Grupo 1 antes de salvar.',
        variant: 'danger',
      })
      return
    }

    if (
      !group2.title ||
      !group2.description ||
      !group2.image ||
      !group2.buttonText ||
      !group2.buttonUrl
    ) {
      toast({
        title: 'Erro ao salvar!',
        description: 'Preencha todos os campos do Grupo 2 antes de salvar.',
        variant: 'danger',
      })
      return
    }

    // Simulação de salvar os dados
    console.log('Salvando...', {
      group1,
      group2,
    })

    toast({
      title: 'Salvo com sucesso!',
      description: 'As informações foram salvas com sucesso.',
      variant: 'success',
    })
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
            <FileUpload
              multiple={false}
              maxFiles={1}
              maxSize={5 * 1024 * 1024} // 5MB máximo
              allowedFormats={['image/jpeg', 'image/png', 'image/webp']}
              onUpload={(files) => handleImageUpload(groupKey, files)}
              onRemove={() => handleDeleteImage(groupKey)}
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
            className="text-base font-normal text-neutral required"
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
                ? setGroup1((prev) => ({
                    ...prev,
                    title: e.target.value.substring(0, 100),
                  }))
                : setGroup2((prev) => ({
                    ...prev,
                    title: e.target.value.substring(0, 100),
                  }))
            }
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
            maxLength={100}
          />
        </div>

        {/* Descrição */}
        <div>
          <Label
            htmlFor={`${groupKey}-description`}
            className="text-base font-normal text-neutral required"
          >
            Descrição
          </Label>
          <TextareaDashboard
            value={group.description}
            onChange={(value) =>
              groupKey === 'group1'
                ? setGroup1((prev) => ({
                    ...prev,
                    description: value.substring(0, 500),
                  }))
                : setGroup2((prev) => ({
                    ...prev,
                    description: value.substring(0, 500),
                  }))
            }
            placeholder={`Digite a descrição do ${groupTitle}`}
          />
        </div>

        {/* Botão Texto */}
        <div>
          <Label
            htmlFor={`${groupKey}-buttonText`}
            className="text-base font-normal text-neutral required"
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
                ? setGroup1((prev) => ({
                    ...prev,
                    buttonText: e.target.value.substring(0, 50),
                  }))
                : setGroup2((prev) => ({
                    ...prev,
                    buttonText: e.target.value.substring(0, 50),
                  }))
            }
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
            maxLength={50}
          />
        </div>

        {/* Botão URL */}
        <div>
          <Label
            htmlFor={`${groupKey}-buttonUrl`}
            className="text-base font-normal text-neutral required"
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
    <div className="p-4 mx-auto">
      {renderGroup(group1, 'group1', 'Grupo 1')}
      <div className="border-t border-neutral-100 my-6"></div>
      {renderGroup(group2, 'group2', 'Grupo 2')}

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="px-8 py-6 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}
