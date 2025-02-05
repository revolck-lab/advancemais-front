import React, { useState } from 'react'
import { Button } from '@/components/ui/button1'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'

export default function CourseHeader() {
  const [subtitle, setSubtitle] = useState<string>('Conheça nossos Cursos')
  const [title, setTitle] = useState<string>(
    'Capacite-se para transformar o futuro'
  )
  const [description, setDescription] = useState<string>(
    'Descubra nossos cursos e treinamentos projetados para desenvolver habilidades, capacitar profissionais e transformar carreiras. Nosso objetivo é fornecer soluções práticas e relevantes que impactam positivamente o mercado e a vida das pessoas.'
  )
  const [buttonLabel, setButtonLabel] = useState<string>('Ver Cursos')
  const [buttonUrl, setButtonUrl] = useState<string>('/cursos')

  const handleSave = () => {
    if (!subtitle || !title || !description || !buttonLabel || !buttonUrl) {
      alert('Preencha todos os campos antes de salvar.')
      return
    }

    // Simulação de salvar os dados
    console.log('Salvando...', {
      subtitle,
      title,
      description,
      buttonLabel,
      buttonUrl,
    })

    alert('Informações salvas com sucesso!')
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Configurar Cabeçalho dos Cursos
      </h1>

      <div className="flex flex-col space-y-6">
        {/* Subtitle */}
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
            placeholder="Digite o subtítulo"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>

        {/* Title */}
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

        {/* Description */}
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

        {/* Button Label */}
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
            placeholder="Digite o texto do botão"
            value={buttonLabel}
            onChange={(e) => setButtonLabel(e.target.value)}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>

        {/* Button URL */}
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
            placeholder="Digite a URL do botão"
            value={buttonUrl}
            onChange={(e) => setButtonUrl(e.target.value)}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
          />
        </div>

        {/* Save Button */}
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
