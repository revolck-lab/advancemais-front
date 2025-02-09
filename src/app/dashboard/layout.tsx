// src/app/dashboard/layout.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { TooltipProvider } from '@radix-ui/react-tooltip'

import {
  SidebarProvider,
  useSidebar,
} from '@/components/dashboard/layout/sidebar/sidebar-context'
import { Sidebar } from '@/components/dashboard/layout/sidebar/sidebar'
import { Header } from '@/components/dashboard/layout/header/header'
import PageHeader from '@/components/dashboard/layout/page-header/page-header'
import LoadingChildren from '@/components/dashboard/layout/loading-children/loading-children'
import { getBreadcrumbConfig } from '@/config/dashboard/breadcrumb'
import { cn } from '@/lib/utils'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoadingInitial, setIsLoadingInitial] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verifica se o token está presente nos cookies
    const hasToken = document.cookie
      .split('; ')
      .some((cookie) => cookie.startsWith('authToken='))

    if (!hasToken) {
      // Redireciona para login se o token não estiver presente
      router.push('/auth/login')
    } else {
      // Autenticação bem-sucedida
      setIsAuthenticated(true)
      setIsLoadingInitial(false)
    }
  }, [router])

  // Exibe o loader em tela cheia durante o carregamento inicial
  if (isLoadingInitial) {
    return <LoadingChildren fullScreen />
  }

  // Bloqueia a renderização caso o usuário não esteja autenticado
  if (!isAuthenticated) {
    return null
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen flex-col bg-gray-100">
          <Sidebar />
          <Header />
          <DashboardMain>{children}</DashboardMain>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}

function DashboardMain({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()
  const pathname = usePathname()
  const breadcrumbConfig = getBreadcrumbConfig(pathname)

  const [isLoadingChildren, setIsLoadingChildren] = useState(false)

  useEffect(() => {
    // Exibe o loader durante as transições de rota
    setIsLoadingChildren(true)
    const timeout = setTimeout(() => {
      setIsLoadingChildren(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <main
      className={cn(
        'flex-1 pt-24 px-14 transition-all duration-300 relative',
        isCollapsed ? 'ml-16' : 'ml-64'
      )}
    >
      <PageHeader
        title={breadcrumbConfig.title}
        breadcrumbs={breadcrumbConfig.breadcrumbs}
      />
      {isLoadingChildren ? <LoadingChildren /> : children}
    </main>
  )
}
