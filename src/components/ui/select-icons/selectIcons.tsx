// src/components/ui/select-icons/selectIcons.tsx
import React, { useState } from 'react'
import * as lucideIcons from 'lucide-react'
import { LucideProps } from 'lucide-react'
import { validIconNames } from '@/config/dashboard/validIconNames'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'

interface SelectIconsProps {
  onSelect: (iconName: string) => void
  onClose: () => void
  initialSelectedIcon?: string
}

const SelectIcons: React.FC<SelectIconsProps> = ({
  onSelect,
  onClose,
  initialSelectedIcon,
}) => {
  const [search, setSearch] = useState('')
  // Inicializa o estado com o valor passado (se houver)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(
    initialSelectedIcon ?? null
  )

  // Filtra os ícones com base no termo de busca usando a lista importada.
  const filteredIcons = validIconNames.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-[90%] max-w-2xl">
        {/* Cabeçalho da modal */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Selecione um Ícone</h2>
          <Button onClick={onClose} className="p-2 hover:text-secondary">
            ✕
          </Button>
        </div>
        {/* Campo de busca */}
        <Input
          type="text"
          placeholder="Pesquisar ícones..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {/* Grid de ícones */}
        <div className="grid grid-cols-5 gap-4 max-h-[400px] overflow-y-auto">
          {filteredIcons.map((iconName) => {
            // Obtém o componente correspondente a partir do objeto lucideIcons.
            const Icon = lucideIcons[
              iconName as keyof typeof lucideIcons
            ] as React.FC<LucideProps>
            if (!Icon) return null

            // Verifica se o ícone atual é o selecionado para aplicar destaque.
            const isSelected = selectedIcon === iconName

            return (
              <Button
                key={iconName}
                onClick={() => setSelectedIcon(iconName)}
                className={`flex flex-col items-center p-2 rounded 
                  ${isSelected ? 'bg-secondary text-white border border-neutral-100 rounded-md' : 'hover:bg-secondary-100'}`}
              >
                <Icon size={24} />
                <span
                  className={`text-xs mt-1 ${isSelected ? 'text-white' : 'text-gray-600'}`}
                >
                  {iconName}
                </span>
              </Button>
            )
          })}
        </div>
        {/* Botões de ação */}
        <div className="flex justify-end mt-4 space-x-2">
          <Button
            onClick={onClose}
            className="py-2 px-4 bg-neutral-50 text-neutral hover:text-white hover:bg-neutral-400 rounded"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (selectedIcon) {
                onSelect(selectedIcon)
              }
            }}
            disabled={!selectedIcon}
            className={`px-4 py-2 rounded text-white ${
              selectedIcon
                ? 'bg-primary hover:bg-primary-800'
                : 'bg-primary-200 cursor-not-allowed'
            }`}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SelectIcons
