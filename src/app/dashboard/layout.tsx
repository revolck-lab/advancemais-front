'use client'

import { SidebarProvider } from '@/components/dashboard/layout/sidebar/sidebar-context'
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
            <div className="flex min-h-screen flex-col bg-gray-100">
              {/* Sidebar */}
              <Sidebar />
              {/* Header */}
              <Header />
              {/* Conteúdo Dinâmico */}
              <main
                className={cn(
                  'flex-1 pt-16 transition-all duration-300',
                  'ml-16 md:ml-64' // Ajuste responsivo do tamanho da Sidebar
                )}
              >
                {children}
              </main>
              {/* Footer */}
              <footer className="bg-gray-800 text-white p-4 text-center">
                Footer © {new Date().getFullYear()}
              </footer>
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}
