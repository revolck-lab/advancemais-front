// src/components/ui/select-icons/selectIcons.tsx
import React, { useState } from 'react'
import * as lucideIcons from 'lucide-react'
import { LucideProps } from 'lucide-react'
import { validIconNames } from '@/config/dashboard/validIconNames'

interface SelectIconsProps {
  onSelect: (iconName: string) => void
  onClose: () => void
}

const SelectIcons: React.FC<SelectIconsProps> = ({ onSelect, onClose }) => {
  const [search, setSearch] = useState('')

  // Filtra os ícones com base no termo de busca usando a lista importada.
  const filteredIcons = validIconNames.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-[90%] max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Selecione um Ícone</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        <input
          type="text"
          placeholder="Pesquisar ícones..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="grid grid-cols-5 gap-4 max-h-[400px] overflow-y-auto">
          {filteredIcons.map((iconName) => {
            // Obtém o componente correspondente a partir do objeto lucideIcons.
            const Icon = lucideIcons[
              iconName as keyof typeof lucideIcons
            ] as React.FC<LucideProps>
            if (!Icon) return null
            return (
              <button
                key={iconName}
                onClick={() => onSelect(iconName)}
                className="flex flex-col items-center p-2 hover:bg-gray-100 rounded"
              >
                <Icon size={24} />
                <span className="text-xs mt-1 text-gray-600">{iconName}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SelectIcons
