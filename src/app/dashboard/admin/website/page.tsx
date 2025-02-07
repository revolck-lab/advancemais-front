'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function WebsiteFeatures() {
  const router = useRouter()

  // Dados (7 itens), com link
  const features = [
    {
      id: 1,
      title: 'Página Inicial',
      description: 'Gerencie as configurações da página inicial.',
      link: '/dashboard/admin/website/home',
      imageUrl: 'https://via.placeholder.com/400x300?text=Home',
    },
    {
      id: 2,
      title: 'Sobre Nós',
      description: 'Configure as informações da página sobre.',
      link: '/dashboard/admin/website/about',
      imageUrl: 'https://via.placeholder.com/400x300?text=Sobre+Nós',
    },
    {
      id: 3,
      title: 'Cursos',
      description: 'Gerencie os cursos exibidos no site.',
      link: '/dashboard/admin/website/courses',
      imageUrl: 'https://via.placeholder.com/400x300?text=Cursos',
    },
    {
      id: 4,
      title: 'Recrutamento',
      description: 'Personalize as páginas de recrutamento.',
      link: '/dashboard/admin/website/recruitment',
      imageUrl: 'https://via.placeholder.com/400x300?text=Recrutamento',
    },
    {
      id: 5,
      title: 'Treinamento',
      description: 'Edite as informações de treinamentos.',
      link: '/dashboard/admin/website/training',
      imageUrl: 'https://via.placeholder.com/400x300?text=Treinamento',
    },
    {
      id: 6,
      title: 'Contato',
      description: 'Configure a página de contato.',
      link: '/dashboard/admin/website/contact',
      imageUrl: 'https://via.placeholder.com/400x300?text=Contato',
    },
    {
      id: 7,
      title: 'Configurações Gerais',
      description: 'Gerencie as configurações globais do site.',
      link: '/dashboard/admin/website/settings',
      imageUrl: 'https://via.placeholder.com/400x300?text=Configurações',
    },
  ]

  return (
    <div className="w-full py-7">
      <div className="container mx-auto">
        {/* Grid com 4 colunas em telas grandes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              onClick={() => router.push(feature.link)}
              // Usamos nossas classes do CSS Module + Tailwind
              className={`${styles.card} border border-gray-200 rounded-xl p-6 flex flex-col cursor-pointer`}
            >
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={feature.imageUrl}
                  alt={feature.title}
                  fill
                  // Adicionamos a classe .cardImage para o efeito no hover
                  className={`${styles.cardImage} object-cover rounded`}
                />
              </div>
              {/* 
                Aqui, usamos "text-inherit" para que, ao mudar a cor de fundo
                (hover), o texto passe a herdar a cor branca definida em .card:hover 
              */}
              <h3 className="text-xl font-semibold text-inherit mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-inherit">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
