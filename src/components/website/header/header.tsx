import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '/public/images/logo_branco.webp'
import { Button } from '@/components/ui/button/button'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from '@/components/ui/menubar/menubar'
import { ChevronDown, Menu, X } from 'lucide-react'
import Styles from './header.module.css'
import websiteRoutes from '@/config/routes/website-routes'

const Header: React.FC = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const closeMenu = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsMenuOpen(false)
      setIsClosing(false)
    }, 300)
  }

  // Pega a rota da página inicial dinamicamente
  const homeRoute =
    websiteRoutes.find((route) => route.label === 'Página Inicial')?.path || '/'

  const mainRoutes = websiteRoutes.filter(
    (route) => !route.path.startsWith('/para-')
  )
  const additionalRoutes = websiteRoutes.filter((route) =>
    route.path.startsWith('/para-')
  )

  return (
    <section className="bg-primary text-white">
      {/* Top Links */}
      <div className="py-4 px-6 md:px-12 hidden md:block">
        <div className="container mx-auto flex flex-wrap md:flex-nowrap justify-between items-center">
          <div className="w-full md:w-auto flex flex-wrap md:flex-nowrap space-y-2 md:space-y-0 md:space-x-4">
            {additionalRoutes.map((route) => (
              <Button key={route.label} variant="outline">
                <Link href={route.path}>{route.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Header Principal */}
      <header className="bg-[#00257D] py-6 px-6 md:px-12">
        <div className="container mx-auto flex flex-wrap md:flex-nowrap justify-between items-center">
          {/* Logo */}
          <Link href={homeRoute}>
            <Image src={Logo} alt="Advance+ Logo" width={240} height={40} />
          </Link>

          {/* Botão para abrir o menu mobile */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-white md:hidden"
          >
            <Menu size={24} />
          </button>

          {/* Menu principal (desktop) */}
          <nav className="hidden md:flex space-x-8">
            {mainRoutes.map((route, index) => (
              <div key={index} className="relative group">
                {route.subLinks ? (
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger asChild>
                        <button
                          className={`${Styles.menuItem} flex items-center`}
                        >
                          {route.label}
                          <ChevronDown />
                        </button>
                      </MenubarTrigger>
                      <MenubarContent className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
                        {route.subLinks.map((subLink) => (
                          <MenubarItem key={subLink.path}>
                            <Link
                              href={subLink.path}
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
                  <Link href={route.path} className={`${Styles.menuItem}`}>
                    {route.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Botões de ação */}
          <div className="hidden md:flex items-center space-x-4">
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

      {/* Menu mobile estilo canvas */}
      {isMenuOpen && (
        <>
          <div
            className={`fixed inset-0 bg-opacity-50 z-40 ${Styles['menu-overlay']}`}
            onClick={closeMenu}
          ></div>
          <div
            className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-[#00257D] text-white shadow-lg p-6 flex flex-col z-50 ${
              isClosing ? Styles['menu-slide-out'] : Styles['menu-slide-in']
            }`}
          >
            <button onClick={closeMenu} className="self-end text-white">
              <X size={24} />
            </button>
            <nav className="mt-4 space-y-4">
              {mainRoutes.map((route, index) => (
                <div key={index}>
                  {route.subLinks ? (
                    <details>
                      <summary className="flex justify-between items-center cursor-pointer">
                        {route.label}
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </summary>
                      <div className="mt-2 pl-4">
                        {route.subLinks.map((subLink) => (
                          <Link
                            key={subLink.path}
                            href={subLink.path}
                            className="block py-2 hover:underline"
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={route.path}
                      className="block py-2 hover:underline"
                    >
                      {route.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-6">
                <Link
                  href="/auth/login"
                  className="block border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-blue-900 transition text-sm text-center"
                >
                  Entrar
                </Link>
                <Link
                  href="#"
                  className="block mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition text-sm text-center"
                >
                  Matricule-se
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </section>
  )
}

export default Header
