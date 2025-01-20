'use client'

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

const Header: React.FC = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const navLinks = [
    { href: '/pagina-inicial', label: 'Página Inicial' },
    { href: '/sobre', label: 'Sobre' },
    {
      label: 'Cursos',
      href: '/cursos',
    },
    {
      label: 'Soluções',
      href: '/cursos',
      subLinks: [
        { href: '#', label: 'Recrutamento & Seleção' },
        { href: '#', label: 'Treinamento In Company' },
      ],
    },
    { href: '/vagas', label: 'Vagas' },
    { href: '/blog', label: 'Blog' },
    { href: '/contato', label: 'Contato' },
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

  const closeMenu = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsMenuOpen(false)
      setIsClosing(false)
    }, 300) // Tempo da animação
  }

  return (
    <section className="bg-primary text-white">
      {/* Top Links */}
      <div className="py-4 px-6 md:px-12 hidden md:block">
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
          </div>
        </div>
      </div>

      {/* Header Principal */}
      <header className="bg-[#00257D] py-6 px-6 md:px-12">
        <div className="container mx-auto flex flex-wrap md:flex-nowrap justify-between items-center">
          {/* Logo */}
          <Link href="/pagina-inicial">
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
            {navLinks.map((navItem, index) => (
              <div key={index} className="relative group">
                {navItem.subLinks ? (
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger asChild>
                        <button
                          className={`${Styles.menuItem} flex items-center`}
                        >
                          {navItem.label}
                          <ChevronDown />
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
                  <Link href={navItem.href} className={`${Styles.menuItem}`}>
                    {navItem.label}
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
          {/* Fundo com blur */}
          <div
            className={`fixed inset-0 bg-opacity-50 z-40 ${Styles['menu-overlay']}`}
          ></div>

          {/* Menu deslizante */}
          <div
            className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-[#00257D] text-white shadow-lg p-6 flex flex-col z-50 ${
              isClosing ? Styles['menu-slide-out'] : Styles['menu-slide-in']
            }`}
          >
            {/* Botão para fechar o menu */}
            <button onClick={closeMenu} className="self-end text-white">
              <X size={24} />
            </button>

            {/* Links do menu */}
            <nav className="mt-4 space-y-4">
              {navLinks.map((navItem, index) => (
                <div key={index} className="relative">
                  {navItem.subLinks ? (
                    <details className="group">
                      <summary className="cursor-pointer flex justify-between items-center">
                        {navItem.label}
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </summary>
                      <div className="mt-2 pl-4">
                        {navItem.subLinks.map((subLink) => (
                          <Link
                            key={subLink.label}
                            href={subLink.href}
                            className="block py-2 hover:underline"
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={navItem.href}
                      className="block py-2 hover:underline"
                    >
                      {navItem.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Botões de ação no menu mobile */}
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
