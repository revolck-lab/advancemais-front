import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '/public/images/logo_branco.webp'
import { Button } from '@/components/ui/button/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from '@/components/ui/menubar/menubar'
import { ChevronDown } from 'lucide-react'

const Header: React.FC = (): JSX.Element => {
  const navLinks = [
    { href: '/pagina-inicial', label: 'Início' },
    {
      label: 'Cursos',
      subLinks: [
        { href: '#', label: 'Curso 1' },
        { href: '#', label: 'Curso 2' },
      ],
    },
    {
      label: 'Serviços',
      subLinks: [
        { href: '#', label: 'Serviço 1' },
        { href: '#', label: 'Serviço 2' },
      ],
    },
    { href: '/sobre', label: 'Sobre nós' },
    { href: '#', label: 'Fale conosco' },
  ]

  const rightLinks = [
    { href: '#', label: 'Vagas' },
    { href: '#', label: 'Treinamentos' },
    { href: '#', label: 'Blog' },
  ]

  const topLinks = [
    { href: '#', label: 'Para empresas' },
    { href: '#', label: 'Para estudantes' },
    { href: '#', label: 'Para empregos' },
  ]

  return (
    <section className="bg-primary text-white">
      {/* Top Links */}
      <div className="py-4 px-6 md:px-12">
        <div className="container mx-auto flex flex-wrap md:flex-nowrap justify-between items-center">
          {/* Links superiores */}
          <div className="w-full md:w-auto flex flex-wrap md:flex-nowrap space-y-2 md:space-y-0 md:space-x-4">
            {topLinks.map((link) => (
              <Button key={link.label} variant="outline">
                {link.label}
              </Button>
            ))}
          </div>

          {/* Links à direita */}
          <div className="w-full md:w-auto flex items-center space-x-1">
            {rightLinks.map((link) => (
              <Button key={link.label} variant="link" className="p-0 text-sm">
                {link.label}
              </Button>
            ))}

            {/* Dropdown de idiomas */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="p-0 text-sm">
                  PT/BR
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-black rounded shadow-md">
                {['EN/US', 'PT/BR', 'ES/ES'].map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    className="hover:bg-gray-200 cursor-pointer p-2"
                  >
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Header Principal */}
      <header className="bg-[#00257D] py-4 px-6 md:px-12">
        <div className="container mx-auto flex flex-wrap md:flex-nowrap justify-between items-center">
          {/* Logo */}
          <Link href="/website">
            <Image src={Logo} alt="Advance+ Logo" width={240} height={40} />
          </Link>

          {/* Menu principal */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((navItem, index) => (
              <div key={index} className="relative group">
                {navItem.subLinks ? (
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger asChild>
                        <button className="text-white hover:underline flex items-center">
                          {navItem.label}
                          <ChevronDown className="w-4 h-4 ml-1" />
                        </button>
                      </MenubarTrigger>
                      <MenubarContent className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
                        {navItem.subLinks.map((subLink) => (
                          <MenubarItem key={subLink.label}>
                            <Link
                              href={subLink.href}
                              className="block px-4 py-2 hover:bg-gray-200"
                            >
                              {subLink.label}
                            </Link>
                          </MenubarItem>
                        ))}
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                ) : (
                  <Link
                    href={navItem.href}
                    className="text-white hover:underline"
                  >
                    {navItem.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Botões de ação */}
          <div className="flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-blue-900 transition text-sm md:text-base"
            >
              Entrar
            </Link>
            <Link
              href="#"
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition text-sm md:text-base"
            >
              Matricule-se
            </Link>
          </div>
        </div>
      </header>
    </section>
  )
}

export default Header
