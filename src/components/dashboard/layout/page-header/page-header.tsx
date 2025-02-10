'use client'

import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb/breadcrumb'
import { Home, ArrowLeft } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button/button'
import { allowedBackButtonRoutes } from '@/config/dashboard/backButtonRoutes'

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
  const router = useRouter()
  const pathname = usePathname()

  // Trunca os breadcrumbs se necessário
  const truncated = truncateBreadcrumbs(breadcrumbs, 4)

  // Verifica se a rota atual está entre as permitidas para exibir o botão de voltar
  const showBackButton = allowedBackButtonRoutes.some((route) =>
    pathname.startsWith(route)
  )

  return (
    <div className="flex items-center justify-between py-4 px-4">
      {/* Seção da esquerda: botão de voltar (condicional) e título */}
      <div className="flex items-center space-x-2">
        {showBackButton && (
          <Button
            onClick={() => router.back()}
            className="text-neutral hover:text-primary transition-colors m-0"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}
        <h1 className="text-2xl font-semibold text-neutral m-0">{title}</h1>
      </div>

      {/* Seção da direita: Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList className="flex items-center">
          {truncated.map((breadcrumb, index) => {
            // Verifica se é o primeiro item
            const isFirst = index === 0
            const needsSlash = index < truncated.length - 1

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {breadcrumb.label === '...' ? (
                    <span className="text-neutral-400 px-2 transition-colors duration-200 ease-in-out">
                      ...
                    </span>
                  ) : breadcrumb.href ? (
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
                    <span className="text-neutral-400 font-normal flex items-center">
                      {isFirst && (
                        <Home className="inline-block mr-1 h-4 w-4" />
                      )}
                      {breadcrumb.label}
                    </span>
                  )}
                </BreadcrumbItem>

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
