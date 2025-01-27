import { Bell, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/dropdown-menu'
import { useSidebar } from '@/components/dashboard/layout/sidebar/sidebar-context'
import Styles from './header.module.css'

export function Header() {
  const { isCollapsed, toggleSidebar } = useSidebar()

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
        <Button variant="ghost" size="icon" className="relative">
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
              {/* Substituindo <img> por <Image> */}
              <Image
                src="/placeholder.svg"
                alt="Profile"
                height={32} // Definindo altura da imagem
                width={32} // Definindo largura da imagem
                className="rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
