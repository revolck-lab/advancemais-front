// src/app/dashboard/layout.tsx
'use client'

import {
  SidebarProvider,
  useSidebar,
} from '@/components/dashboard/layout/sidebar/sidebar-context'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Sidebar } from '@/components/dashboard/layout/sidebar/sidebar'
import { Header } from '@/components/dashboard/layout/header/header'
import { cn } from '@/lib/utils'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <TooltipProvider>
          <SidebarProvider>
            <DashboardMain>{children}</DashboardMain>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}

function DashboardMain({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Sidebar />
      <Header />

      <main
        className={cn(
          'flex-1 pt-24 px-10 transition-all duration-300',
          isCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        Footer © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
