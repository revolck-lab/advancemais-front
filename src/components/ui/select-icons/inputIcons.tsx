// src/components/ui/select-icons/inputIcons.tsx
import React, { useState } from 'react'
import SelectIcons from './selectIcons'
import * as lucideIcons from 'lucide-react'
import type { LucideProps } from 'lucide-react'

interface InputIconsProps {
  onIconSelect?: (iconName: string) => void
  // Se desejar, você pode incluir uma propriedade para definir o ícone inicial
  defaultIcon?: string
}

const InputIcons: React.FC<InputIconsProps> = ({
  onIconSelect,
  defaultIcon,
}) => {
  // Inicializa o estado com defaultIcon, se fornecido.
  const [selectedIcon, setSelectedIcon] = useState<string | null>(
    defaultIcon ?? null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleIconSelect = (iconName: string) => {
    setSelectedIcon(iconName)
    setIsModalOpen(false)
    if (onIconSelect) {
      onIconSelect(iconName)
    }
  }

  const IconComponent = selectedIcon
    ? (lucideIcons[
        selectedIcon as keyof typeof lucideIcons
      ] as React.FC<LucideProps>)
    : null

  return (
    <div className="flex items-center space-x-2">
      <div
        className="flex items-center p-2 border border-gray-300 rounded cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {IconComponent ? (
          <IconComponent size={24} />
        ) : (
          <span className="text-gray-500">Selecione um ícone...</span>
        )}
      </div>
      {isModalOpen && (
        <SelectIcons
          onSelect={handleIconSelect}
          onClose={() => setIsModalOpen(false)}
          initialSelectedIcon={selectedIcon ?? undefined}
        />
      )}
    </div>
  )
}

export default InputIcons
