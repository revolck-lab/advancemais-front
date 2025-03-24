// src\components\dashboard\layout\header\header.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Bell, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Input } from '@/components/ui/input1'
import { Button } from '@/components/ui/button1'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/dropdown-menu'
import { useSidebar } from '@/components/dashboard/layout/sidebar/sidebar-context'
import Styles from './header.module.css'

export function Header() {
  const router = useRouter()
  const { isCollapsed, toggleSidebar } = useSidebar()

  // Função de Logout
  function handleLogout() {
    // Remove token do localStorage
    localStorage.removeItem('authToken')

    // Apaga o cookie (expira agora)
    // Se você colocou "SameSite=Lax" ou "Path=/" ao definir, mantenha aqui
    document.cookie = 'authToken=; Path=/; Max-Age=0; SameSite=Lax'

    // Redireciona para a tela de login
    router.push('/auth/login')
  }

  return (
    <header
      className={cn(
        'fixed right-0 top-0 z-30 flex h-16 items-center justify-between bg-primary px-4 transition-all duration-300 border-l border-[#00267e]',
        isCollapsed ? 'left-16' : 'left-64'
      )}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={`${Styles.buttonCollapse}`}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Input placeholder="Search..." className="w-[300px] bg-gray-100" />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <Image
                src="/images/avatar.jpg"
                alt="Profile"
                height={32}
                width={32}
                className="rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem>
              <a href="/dashboard/perfil">Meu perfil</a>
            </DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>

            {/* Chama handleLogout ao clicar */}
            <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
