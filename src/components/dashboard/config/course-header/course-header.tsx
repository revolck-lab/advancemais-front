import React, { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { TextareaDashboard } from '@/components/ui/textarea/textarea-dashboard'
import { useToast } from '@/hooks/use-toast'

export default function CourseHeader() {
  const { toast } = useToast()
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
      toast({
        title: 'Erro ao salvar!',
        description: 'Preencha todos os campos antes de salvar.',
        variant: 'danger',
      })
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

    toast({
      title: 'Salvo com sucesso!',
      description: 'As informações foram salvas com sucesso.',
      variant: 'success',
    })
  }

  return (
    <div className="p-4 mx-auto">
      {/* Campos principais */}
      <div className="space-y-4">
        <div>
          <Label
            htmlFor="subtitle"
            className="text-base font-normal text-neutral required"
          >
            Subtítulo
          </Label>
          <Input
            id="subtitle"
            type="text"
            placeholder="Digite o subtítulo"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value.substring(0, 50))}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
            maxLength={50}
          />
        </div>
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
            maxLength={100}
          />
        </div>
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
        <div>
          <Label
            htmlFor="buttonText"
            className="text-base font-normal text-neutral required"
          >
            Texto do Botão
          </Label>
          <Input
            id="buttonText"
            type="text"
            placeholder="Digite o texto do botão"
            value={buttonLabel}
            onChange={(e) => setButtonLabel(e.target.value.substring(0, 100))}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
            maxLength={100}
          />
        </div>
        <div>
          <Label
            htmlFor="buttonURL"
            className="text-base font-normal text-neutral required"
          >
            URL do Botão
          </Label>
          <Input
            id="buttonURL"
            type="text"
            placeholder="Digite o texto do botão"
            value={buttonUrl}
            onChange={(e) => setButtonUrl(e.target.value.substring(0, 100))}
            className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
            maxLength={100}
          />
        </div>
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end mt-5">
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
