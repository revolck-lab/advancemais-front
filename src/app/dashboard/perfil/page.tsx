'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, CreditCard, Shield, Package } from 'lucide-react'
import DadosPessoais from './dados-pessoais'
import Assinatura from './assinatura'
import Seguranca from './seguranca'
import Faturas from './faturas'

// Definição das abas com ID, rótulo, ícone e componente correspondente
const tabs = [
  {
    id: 'dados-pessoais',
    label: 'Dados Pessoais',
    icon: User,
    component: DadosPessoais,
  },
  {
    id: 'seguranca',
    label: 'Segurança',
    icon: Shield,
    component: Seguranca,
  },
  {
    id: 'assinatura',
    label: 'Assinatura',
    icon: CreditCard,
    component: Assinatura,
  },
  { id: 'faturas', label: 'Faturas', icon: Package, component: Faturas },
]

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    // Container principal com padding e fundo claro
    <div className="w-full min-h-screen p-3 mb-5">
      {/* Layout principal com flexbox */}
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Sidebar de navegação */}
        <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm">
          <nav className="flex flex-col space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center gap-3 rounded-lg p-3 text-left transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-neutral hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveTab(tab.id)
                  }
                }}
                role="tab"
                aria-selected={activeTab === tab.id}
                tabIndex={0}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Área de conteúdo com altura mínima fixa */}
        <main className="flex-1 rounded-lg bg-white p-6 shadow-sm min-h-screen">
          <AnimatePresence mode="wait">
            {tabs.map((tab) =>
              activeTab === tab.id ? (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <tab.component />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
