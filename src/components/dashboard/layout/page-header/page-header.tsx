'use client'

import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb/breadcrumb'
import { Home } from 'lucide-react'

interface PageHeaderProps {
  title: string
  breadcrumbs: { label: string; href?: string }[]
}

// Função que trunca o array de breadcrumbs se houver muitos itens
function truncateBreadcrumbs(
  breadcrumbs: { label: string; href?: string }[],
  maxItems = 4
) {
  if (breadcrumbs.length <= maxItems) {
    return breadcrumbs
  }

  return [
    breadcrumbs[0],
    breadcrumbs[1],
    { label: '...' },
    breadcrumbs[breadcrumbs.length - 1],
  ]
}

export default function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  // Trunca se houver muitos itens
  const truncated = truncateBreadcrumbs(breadcrumbs, 4)

  return (
    <div className="flex items-center justify-between py-4 px-4">
      {/* Título */}
      <h1 className="text-2xl font-semibold text-neutral">{title}</h1>

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          {truncated.map((breadcrumb, index) => {
            // Verifica se é o primeiro item
            const isFirst = index === 0
            const needsSlash = index < truncated.length - 1

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {breadcrumb.label === '...' ? (
                    // Item de truncamento: texto simples com transição
                    <span className="text-neutral-400 px-2 transition-colors duration-200 ease-in-out">
                      ...
                    </span>
                  ) : breadcrumb.href ? (
                    // Item com link: adiciona transição para mudanças de cor e tipografia
                    <BreadcrumbLink
                      href={breadcrumb.href}
                      className="text-neutral-400 font-normal transition-colors duration-400 ease-in-out hover:text-neutral hover:no-underline hover:font-medium flex items-center"
                    >
                      {isFirst && (
                        <Home className="inline-block mr-1 h-4 w-4" />
                      )}
                      {breadcrumb.label}
                    </BreadcrumbLink>
                  ) : (
                    // Item sem link (atual): adiciona transição similar
                    <span className="text-neutral-400 font-normal flex items-center">
                      {isFirst && (
                        <Home className="inline-block mr-1 h-4 w-4" />
                      )}
                      {breadcrumb.label}
                    </span>
                  )}
                </BreadcrumbItem>

                {/* Exibe a barra "/" se não for o último item e não for "..." */}
                {needsSlash && breadcrumb.label !== '...' && (
                  <li aria-hidden="true" className="px-2 text-gray-400">
                    /
                  </li>
                )}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
