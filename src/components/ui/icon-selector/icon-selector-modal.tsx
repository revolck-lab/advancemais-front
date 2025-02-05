import React, { useState } from 'react'
import * as Icons from 'lucide-react'

type IconSelectorModalProps = {
  isOpen: boolean
  onClose: () => void
  onSelect: (icon: string) => void
}

const IconSelectorModal: React.FC<IconSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [search, setSearch] = useState<string>('')

  // Filtra apenas componentes React válidos
  const validIcons = Object.keys(Icons).filter((key) => {
    const Icon = Icons[key as keyof typeof Icons]
    return typeof Icon === 'function' // Garante que é um componente React
  }) as Array<keyof typeof Icons>

  // Aplica filtro de pesquisa
  const filteredIcons = validIcons.filter((iconName) =>
    iconName.toLowerCase().includes(search.toLowerCase())
  )

  if (!isOpen) return null // Não renderiza nada se o modal não estiver aberto

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-6xl rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Biblioteca de Ícones
        </h2>

        {/* Campo de pesquisa */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Pesquisar ícone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Grade de ícones */}
        <div className="grid grid-cols-6 gap-4 max-h-80 overflow-y-auto">
          {filteredIcons.map((iconName) => {
            const IconComponent = Icons[iconName] as React.FC<
              React.SVGProps<SVGSVGElement>
            >
            return (
              <button
                key={iconName}
                onClick={() => onSelect(iconName)}
                className="flex flex-col items-center p-2 border rounded-lg hover:bg-gray-100"
              >
                <IconComponent className="w-8 h-8 text-gray-700" />
                <span className="text-xs mt-1 text-gray-600">{iconName}</span>
              </button>
            )
          })}
        </div>

        {/* Botão de fechar */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default IconSelectorModal
