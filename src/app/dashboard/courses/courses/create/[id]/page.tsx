'use client'

import { useState } from 'react'

// Tab components
import Informacoes from './tabs/informacoes'
import Produtos from './tabs/produtos'
import Colaboradores from './tabs/colaboradores'
import Modulos from './tabs/modulos'
import Aulas from './tabs/aulas'
import BancoQuestoes from './tabs/bancoquestoes'
import ProvaFinal from './tabs/provafinal'
import Matriculas from './tabs/matriculas'

export default function SidebarTabsPage() {
  const [activeTab, setActiveTab] = useState('informacoes')

  return (
    <div className="flex gap-6 p-6 min-h-screen">
      {/* Sidebar with tabs */}
      <div className="w-1/5">
        <div className="flex flex-col space-y-1 bg-white rounded-xl shadow-sm">
          <button
            onClick={() => setActiveTab('informacoes')}
            className={`p-4 text-left text-sm font-medium transition-colors ${
              activeTab === 'informacoes'
                ? 'bg-primary text-white rounded-t-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Informações
          </button>
          <button
            onClick={() => setActiveTab('produtos')}
            className={`p-4 text-left text-sm font-medium transition-colors ${
              activeTab === 'produtos'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Produtos
          </button>
          <button
            onClick={() => setActiveTab('colaboradores')}
            className={`p-4 text-left text-sm font-medium transition-colors ${
              activeTab === 'colaboradores'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Colaboradores
          </button>
          <button
            onClick={() => setActiveTab('modulos')}
            className={`p-4 text-left text-sm font-medium transition-colors ${
              activeTab === 'modulos'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Módulos
          </button>
          <button
            onClick={() => setActiveTab('aulas')}
            className={`p-4 text-left text-sm font-medium transition-colors ${
              activeTab === 'aulas'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Aulas
          </button>
          <button
            onClick={() => setActiveTab('banco-questoes')}
            className={`p-4 text-left text-sm font-medium transition-colors ${
              activeTab === 'banco-questoes'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Banco de questões
          </button>
          <button
            onClick={() => setActiveTab('prova-final')}
            className={`p-4 text-left text-sm font-medium transition-colors ${
              activeTab === 'prova-final'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Prova final
          </button>
          <button
            onClick={() => setActiveTab('matriculas')}
            className={`p-4 text-left text-sm font-medium transition-colors ${
              activeTab === 'matriculas'
                ? 'bg-primary text-white rounded-b-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Matrículas
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 bg-white rounded-xl py-5 px-5">
        {activeTab === 'informacoes' && <Informacoes />}
        {activeTab === 'produtos' && <Produtos />}
        {activeTab === 'colaboradores' && <Colaboradores />}
        {activeTab === 'modulos' && <Modulos />}
        {activeTab === 'aulas' && <Aulas />}
        {activeTab === 'banco-questoes' && <BancoQuestoes />}
        {activeTab === 'prova-final' && <ProvaFinal />}
        {activeTab === 'matriculas' && <Matriculas />}
      </div>
    </div>
  )
}
