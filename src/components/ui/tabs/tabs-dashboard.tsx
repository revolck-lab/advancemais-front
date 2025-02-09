'use client'

import * as React from 'react'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs/tabs'

type DashboardTabItem = {
  key: string
  label: string
  component: React.ReactNode
}

interface TabsDashboardProps {
  tabs: DashboardTabItem[]
  defaultValue?: string
  className?: string
}

/**
 * Tabs minimalista com animação e persistência:
 * - As abas permanecem alinhadas à esquerda.
 * - Possui uma borda cinza fixa (divisória) na parte inferior da área das abas.
 * - Uma linha azul animada se move sobre essa borda, acompanhando o item ativo e o hover.
 * - A aba ativa é persistida no localStorage e recuperada ao atualizar a página.
 */
export function TabsDashboard({
  tabs,
  defaultValue,
  className,
}: TabsDashboardProps) {
  // Define a chave para armazenar a aba selecionada.
  // Usamos o pathname para possibilitar persistência por página.
  const storageKey =
    typeof window !== 'undefined'
      ? `tabs-dashboard-${window.location.pathname}`
      : 'tabs-dashboard'

  // Estado controlado para o valor atual da aba.
  const [currentTab, setCurrentTab] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey)
      if (stored && tabs.some((tab) => tab.key === stored)) {
        return stored
      }
    }
    return defaultValue || (tabs.length ? tabs[0].key : '')
  })

  // Sempre que a aba atual mudar, atualiza o localStorage.
  React.useEffect(() => {
    if (currentTab) {
      localStorage.setItem(storageKey, currentTab)
    }
  }, [currentTab, storageKey])

  // Ref para o container das abas (necessário para cálculos de posicionamento do indicador)
  const triggersContainerRef = React.useRef<HTMLDivElement>(null)
  // Armazena as referências individuais de cada aba
  const triggersRef = React.useRef<{ [key: string]: HTMLButtonElement | null }>(
    {}
  )
  // State para controlar a posição e a largura do indicador (linha azul)
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0 })

  // Atualiza o indicador com base no elemento fornecido
  const updateIndicatorFromElement = (el: HTMLElement | null) => {
    if (el) {
      const { offsetLeft, offsetWidth } = el
      setIndicator({ left: offsetLeft, width: offsetWidth })
    }
  }

  // Posiciona o indicador sobre o item ativo assim que o componente monta ou a aba muda
  React.useEffect(() => {
    if (triggersContainerRef.current) {
      const activeEl = triggersContainerRef.current.querySelector(
        '[data-state="active"]'
      ) as HTMLElement
      updateIndicatorFromElement(activeEl)
    }
  }, [currentTab, tabs])

  // Move o indicador para a aba em hover
  const handleMouseEnter = (key: string) => {
    const el = triggersRef.current[key]
    updateIndicatorFromElement(el)
  }

  // Ao sair do hover, retorna o indicador para a aba ativa
  const handleMouseLeave = () => {
    if (triggersContainerRef.current) {
      const activeEl = triggersContainerRef.current.querySelector(
        '[data-state="active"]'
      ) as HTMLElement
      updateIndicatorFromElement(activeEl)
    }
  }

  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      className={`w-full ${className ?? ''}`}
    >
      {/* Container das abas com borda cinza fixa (divisória) */}
      <div
        ref={triggersContainerRef}
        className="relative border-b border-gray-200"
      >
        <TabsList className="flex justify-start space-x-8 text-sm text-neutral-400 bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              // Guarda a referência do botão
              ref={(el) => {
                triggersRef.current[tab.key] = el
              }}
              onMouseEnter={() => handleMouseEnter(tab.key)}
              onMouseLeave={handleMouseLeave}
              className={`
                relative
                pb-3
                transition-colors duration-200 ease-in-out
                data-[state=active]:text-primary
                data-[state=active]:font-semibold
                hover:text-neutral
                focus:outline-none
              `}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* Linha azul animada que se move sobre a borda cinza */}
        <span
          className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
      </div>

      {/* Conteúdo de cada aba */}
      {tabs.map((tab) => (
        <TabsContent key={tab.key} value={tab.key} className="pt-4">
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  )
}
