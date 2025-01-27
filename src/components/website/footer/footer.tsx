'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import websiteRoutes from '@/config/routes/website-routes'
import socials from '@/config/socials'
import Socials from '@/components/ui/socials/socials'

const Footer: React.FC = (): JSX.Element => {
  const isMobile = useIsMobile()

  // Obtem as rotas necessárias
  const homeRoute =
    websiteRoutes.find((route) => route.label === 'Página Inicial')?.path || '/'
  const aboutRoute =
    websiteRoutes.find((route) => route.label === 'Sobre')?.path || '/sobre'
  const contactRoute =
    websiteRoutes.find((route) => route.label === 'Contato')?.path || '/contato'
  const coursesRoute =
    websiteRoutes.find((route) => route.label === 'Cursos')?.path || '/cursos'
  const solutionsSubRoutes =
    websiteRoutes.find((route) => route.label === 'Soluções')?.subLinks || []

  return (
    <footer className="bg-[#001a57] text-white">
      <div className="container mx-auto py-16 px-4">
        {isMobile ? (
          // Versão Mobile
          <div>
            {/* Redes Sociais e Logo */}
            <div className="flex flex-col items-center mb-8">
              <Image
                src="/images/logo_footer.svg"
                alt="Advance+ Logo"
                width={200}
                height={80}
                className="mb-4"
              />
              <h4 className="text-sm font-semibold uppercase text-white mt-4 text-center">
                Siga Nossas Redes Sociais
              </h4>
              <div className="flex gap-4 mt-2">
                <Link href="https://facebook.com" aria-label="Facebook">
                  <Facebook
                    className="text-red-600 hover:text-white"
                    size={24}
                  />
                </Link>
                <Link href="https://linkedin.com" aria-label="LinkedIn">
                  <Linkedin
                    className="text-red-600 hover:text-white"
                    size={24}
                  />
                </Link>
                <Link href="https://youtube.com" aria-label="YouTube">
                  <Youtube
                    className="text-red-600 hover:text-white"
                    size={24}
                  />
                </Link>
                <Link href="https://instagram.com" aria-label="Instagram">
                  <Instagram
                    className="text-red-600 hover:text-white"
                    size={24}
                  />
                </Link>
              </div>
            </div>

            {/* Links em Colunas */}
            <div className="grid grid-cols-1 gap-8 text-center">
              {/* Sobre Nós */}
              <div>
                <h4 className="text-sm font-semibold uppercase text-white mb-4">
                  Sobre Nós
                </h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <Link href={aboutRoute}>Quem Somos</Link>
                  </li>
                  <li>
                    <Link href={homeRoute}>Página Inicial</Link>
                  </li>
                  <li>
                    <Link href={contactRoute}>Contato</Link>
                  </li>
                </ul>
              </div>

              {/* Acesso Rápido */}
              <div>
                <h4 className="text-sm font-semibold uppercase text-white mb-4">
                  Acesso Rápido
                </h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <Link href={coursesRoute}>Cursos</Link>
                  </li>
                  {solutionsSubRoutes.map((subLink) => (
                    <li key={subLink.path}>
                      <Link href={subLink.path}>{subLink.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fale Conosco */}
              <div>
                <h4 className="text-sm font-semibold uppercase text-white mb-4">
                  Fale Conosco
                </h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <Link href={contactRoute}>Fale Conosco</Link>
                  </li>
                  <li>Ouvidoria</li>
                  <li>FAQ</li>
                </ul>
                <p className="text-white text-xs mt-4">
                  Horário de atendimento: <br />
                  segunda a sexta (08h às 20h) e sábado (09h às 13h)
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Versão Desktop
          <div>
            <div className="flex flex-wrap lg:flex-nowrap justify-between gap-8">
              {/* Logo e Redes Sociais */}
              <div className="flex-1 lg:basis-[30%] flex flex-col items-center lg:items-start">
                <Image
                  src="/images/logo_footer.svg"
                  alt="Advance+ Logo"
                  width={170}
                  height={100}
                  className="mb-4"
                />
                <h4 className="text-sm font-semibold uppercase text-white mt-6">
                  Siga Nossas Redes Sociais
                </h4>
                <div className="flex gap-4 mt-2">
                  {/* <Link href="https://facebook.com" aria-label="Facebook">
                    <Facebook
                      className="text-red-600 hover:text-white"
                      size={24}
                    />
                  </Link>
                  <Link href="https://linkedin.com" aria-label="LinkedIn">
                    <Linkedin
                      className="text-red-600 hover:text-white"
                      size={24}
                    />
                  </Link>
                  <Link href="https://youtube.com" aria-label="YouTube">
                    <Youtube
                      className="text-red-600 hover:text-white"
                      size={24}
                    />
                  </Link>
                  <Link href="https://instagram.com" aria-label="Instagram">
                    <Instagram
                      className="text-red-600 hover:text-white"
                      size={24}
                    />
                  </Link> */}
                  <Socials socials={socials} />
                </div>
              </div>

              {/* Sobre Nós */}
              <div className="flex-1 lg:basis-[17.5%]">
                <h4 className="text-sm font-semibold uppercase text-white mb-4">
                  Sobre Nós
                </h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href={aboutRoute}>Quem Somos</Link>
                  </li>
                  <li>
                    <Link href={homeRoute}>Página Inicial</Link>
                  </li>
                  <li>
                    <Link href={contactRoute}>Contato</Link>
                  </li>
                </ul>
              </div>

              {/* Acesso Rápido */}
              <div className="flex-1 lg:basis-[17.5%]">
                <h4 className="text-sm font-semibold uppercase text-white mb-4">
                  Acesso Rápido
                </h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href={coursesRoute}>Cursos</Link>
                  </li>
                  {solutionsSubRoutes.map((subLink) => (
                    <li key={subLink.path}>
                      <Link href={subLink.path}>{subLink.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fale Conosco */}
              <div className="flex-1 lg:basis-[17.5%]">
                <h4 className="text-sm font-semibold uppercase text-white mb-4">
                  Fale Conosco
                </h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href={contactRoute}>Fale Conosco</Link>
                  </li>
                  <li>Ouvidoria</li>
                  <li>FAQ</li>
                </ul>
                <p className="text-white mt-4">
                  Horário de atendimento: <br />
                  segunda a sexta (08h às 20h) e sábado (09h às 13h)
                </p>
                <p className="text-white mt-4">
                  Contato:
                  <br />
                  (82) 3234-1397 <br />
                  (82) 98882-5559 <br />
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Inferior */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-xs mt-3">
            Av. Juca Sampaio, 2247 - sala 30 Condominio Shopping Miramar -
            Feitosa CEP 57.042-530 Maceió/AL. <br />
            Todos os Direitos Reservados AdvanceMais
          </p>
          <nav className="flex justify-center mt-4 space-x-4 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:underline">
              Política de Privacidade
            </Link>
            <Link href="/terms" className="text-gray-400 hover:underline">
              Termos de Uso
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:underline">
              Preferências de Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
