'use client' // Adiciona a diretiva "use client" no topo do arquivo

import React from 'react'
import { useRouter } from 'next/navigation' // Importe o useRouter

interface PlanoProps {
  titulo: string
  icone: React.ReactNode
  preco: string
  descricao: string
  recursos: string[]
  isPopular?: boolean
}

const Plano: React.FC<PlanoProps> = ({
  titulo,
  icone,
  preco,
  descricao,
  recursos,
  isPopular = false,
}) => {
  const router = useRouter() // Hook para navegação

  const handleAssinarPlano = () => {
    router.push(`/checkout?plano=${encodeURIComponent(titulo)}`) // Passa o plano como query parameter
  }

  return (
    <div
      className={`rounded-lg p-6 flex flex-col relative ${
        isPopular
          ? 'bg-white border-2 border-secondary-200'
          : 'bg-white shadow-md border border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 right-4 bg-secondary text-white text-xs px-3 py-1 rounded-full">
          Mais popular
        </div>
      )}
      <div className="flex items-center gap-2 mb-4">
        {icone}
        <span className="text-gray-900">{titulo}</span>
      </div>
      <div className="mb-0">
        R$<span className="text-[2.7rem] font-bold text-gray-900">{preco}</span>
        <span className="text-gray-500 text-sm">/mês</span>
      </div>
      <div className="text-sm text-gray-500 mb-4">
        Aumente a produtividade e a criatividade com o acesso expandido.
      </div>
      <button
        onClick={handleAssinarPlano} // Adiciona o evento de clique
        className={`w-full text-white rounded py-2 mb-4 hover:${
          isPopular ? 'bg-secondary' : 'bg-gray-800'
        } ${isPopular ? 'bg-secondary' : 'bg-gray-700'}`}
      >
        Assinar plano
      </button>
      <div className="text-sm text-gray-500 mb-4">{descricao}</div>
      <ul className="space-y-3">
        {recursos.map((recurso) => (
          <li
            key={recurso}
            className="flex items-center gap-2 text-gray-600 text-sm"
          >
            <svg
              viewBox="0 0 24 24"
              className={`w-5 h-5 ${isPopular ? 'text-secondary' : 'text-gray-400'}`}
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12L11 15L16 9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {recurso}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Plano
