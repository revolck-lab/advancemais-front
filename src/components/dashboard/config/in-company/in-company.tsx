import React, { useState } from 'react'
import IconSelectorModal from '@/components/ui/icon-selector/icon-selector-modal'
import { Label } from '@/components/ui/label/label'
import { Input } from '@/components/ui/input/input'
import InputIcons from '@/components/ui/select-icons/inputIcons'
import { Button } from '@/components/ui/button/button'
import { toast } from '@/hooks/use-toast'

export default function InCompanyTraining() {
  const [title, setTitle] = useState<string>(
    'O TREINAMENTO IN COMPANY É IDEAL PARA'
  )

  const [boxes, setBoxes] = useState<
    { id: number; icon: string; title: string }[]
  >([
    {
      id: 1,
      icon: 'Settings',
      title: 'Enxergar novas oportunidades nos processos',
    },
    {
      id: 2,
      icon: 'FileText',
      title: 'Repensar como o trabalho atual é feito',
    },
    {
      id: 3,
      icon: 'PieChart',
      title: 'Aprender como resolver problemas',
    },
    {
      id: 4,
      icon: 'BarChart2',
      title: 'Aplicar conhecimento em um caso real da empresa',
    },
    {
      id: 5,
      icon: 'TrendingUp',
      title: 'Desafiar os resultados da empresa',
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
    if (!title || !boxes) {
      toast({
        title: 'Erro ao salvar!',
        description: 'Preencha todos os campos antes de salvar.',
        variant: 'danger',
      })
      return
    }

    console.log('Salvando...', {
      title,
      boxes,
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
            maxLength={100}
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
