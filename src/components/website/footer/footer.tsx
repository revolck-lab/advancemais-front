import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#001a57] text-white">
      <div className="container mx-auto py-16 px-4">
        {/* Primeira Linha: 5 Colunas */}
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-8">
          {/* Logo - 30% */}
          <div className="flex-1 lg:basis-[30%] flex flex-col items-center lg:items-start">
            <Image
              src="https://via.placeholder.com/250x100.png?text=Advance+Logo"
              alt="Advance+ Logo"
              width={250}
              height={100}
              className="mb-4"
            />
            <h4 className="text-sm font-semibold uppercase text-white mt-6">
              Siga Nossas Redes Sociais
            </h4>
            <div className="flex gap-4 mt-2">
              <Link href="https://facebook.com" aria-label="Facebook">
                <Facebook className="text-red-600 hover:text-white" size={24} />
              </Link>
              <Link href="https://linkedin.com" aria-label="LinkedIn">
                <Linkedin className="text-red-600 hover:text-white" size={24} />
              </Link>
              <Link href="https://youtube.com" aria-label="YouTube">
                <Youtube className="text-red-600 hover:text-white" size={24} />
              </Link>
              <Link href="https://instagram.com" aria-label="Instagram">
                <Instagram
                  className="text-red-600 hover:text-white"
                  size={24}
                />
              </Link>
            </div>
          </div>

          {/* Nossos Cursos - 17.5% */}
          <div className="flex-1 lg:basis-[17.5%]">
            <h4 className="text-sm font-semibold uppercase text-white mb-4">
              Nossos Cursos
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Educação</li>
              <li>Gestão e Negócios</li>
              <li>Jurídica</li>
            </ul>
          </div>

          {/* Sobre Nós - 17.5% */}
          <div className="flex-1 lg:basis-[17.5%]">
            <h4 className="text-sm font-semibold uppercase text-white mb-4">
              Sobre Nós
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
            </ul>
          </div>

          {/* Acesso Rápido - 17.5% */}
          <div className="flex-1 lg:basis-[17.5%]">
            <h4 className="text-sm font-semibold uppercase text-white mb-4">
              Acesso Rápido
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
            </ul>
          </div>

          {/* Fale Conosco - 17.5% */}
          <div className="flex-1 lg:basis-[17.5%]">
            <h4 className="text-sm font-semibold uppercase text-white mb-4">
              Fale Conosco
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Fale Conosco</li>
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

      {/* Footer Inferior */}
      <div className="container mx-auto px-4 py-6 border-t border-gray-700 text-center">
        <p className="text-gray-400 text-xs">
          O Advance+ LTDA CNPJ nº 00.000.000/0001-97, com Sede na Av. Juca
          Sampaio, 2247 - Sala 30 - Feitosa, Maceió - AL, 57040-600 <br />
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
    </footer>
  )
}

export default Footer
