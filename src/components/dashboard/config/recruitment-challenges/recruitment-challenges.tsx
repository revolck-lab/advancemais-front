import React, { useState } from 'react'
import IconSelectorModal from '@/components/ui/icon-selector/icon-selector-modal'
import { Label } from '@/components/ui/label/label'
import { Input } from '@/components/ui/input/input'
import { TextareaDashboard } from '@/components/ui/textarea/textarea-dashboard'
import InputIcons from '@/components/ui/select-icons/inputIcons'
import { Button } from '@/components/ui/button/button'
import { toast } from '@/hooks/use-toast'

export default function RecruitmentChallenges() {
  const [title, setTitle] = useState<string>(
    'Você ainda recruta com emails e planilhas?'
  )
  const [description, setDescription] = useState<string>(
    'O esforço e a boa vontade do recrutador têm um limite claro e acabam criando problemas e desafios relevantes. Simplifique seus processos e alcance resultados melhores com as ferramentas certas.'
  )
  const [boxes, setBoxes] = useState<
    { id: number; icon: string; title: string; description: string }[]
  >([
    {
      id: 1,
      icon: 'Activity',
      title: 'Sensação de Desorganização',
      description:
        'Se sentir desorganizado com a avalanche de demandas e informações afeta diretamente o desempenho do negócio.',
    },
    {
      id: 2,
      icon: 'Target',
      title: 'Esforço Repetitivo',
      description:
        'Tarefas manuais travam o bom uso do seu tempo e não te permite focar no que é essencial.',
    },
    {
      id: 3,
      icon: 'Database',
      title: 'Resultados Insatisfatórios',
      description:
        'Recrutamento manual gera atrasos que impedem seu negócio de crescer na velocidade que ele poderia.',
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentBoxId] = useState<number | null>(null)

  const handleIconSelect = (icon: string) => {
    if (currentBoxId !== null) {
      setBoxes((prev) =>
        prev.map((box) => (box.id === currentBoxId ? { ...box, icon } : box))
      )
    }
    setIsModalOpen(false)
  }

  const handleSave = () => {
    if (!title || !description) {
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
            maxLength={100} // Caso o componente Input suporte
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
      </div>

      {/* Configuração dos Boxes */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="p-4 bg-white rounded-lg border-1 border-neutral-100 text-neutral space-y-4"
          >
            <div className="flex items-center justify-between">
              {/* Componente InputIcons para alterar o ícone */}
              <div className="flex items-center">
                <InputIcons
                  onIconSelect={(iconName) =>
                    setBoxes((prev) =>
                      prev.map((b) =>
                        b.id === box.id ? { ...b, icon: iconName } : b
                      )
                    )
                  }
                />
              </div>
              <span className="text-neutral">
                <strong>{box.icon}</strong>
              </span>
            </div>
            <div>
              <Label
                htmlFor={`titleBox-${box.id}`}
                className="text-base font-normal text-neutral required"
              >
                Título do Box
              </Label>
              <Input
                id={`titleBox-${box.id}`}
                type="text"
                placeholder="Digite o título"
                value={box.title}
                onChange={(e) =>
                  setBoxes((prev) =>
                    prev.map((b) =>
                      b.id === box.id
                        ? { ...b, title: e.target.value.substring(0, 50) }
                        : b
                    )
                  )
                }
                className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
                maxLength={50}
              />
            </div>
            <div>
              <Label
                htmlFor={`descriptionBox-${box.id}`}
                className="text-base font-normal text-neutral required"
              >
                Descrição do Box
              </Label>
              <TextareaDashboard
                value={box.description}
                onChange={(value: string) =>
                  setBoxes((prev) =>
                    prev.map((b) =>
                      b.id === box.id
                        ? { ...b, description: value.substring(0, 200) }
                        : b
                    )
                  )
                }
                placeholder="Digite a descrição"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal para Seleção de Ícones */}
      <IconSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleIconSelect}
      />

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
