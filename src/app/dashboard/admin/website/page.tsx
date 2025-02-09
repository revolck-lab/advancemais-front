'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function WebsiteFeatures() {
  const router = useRouter()

  const features = [
    {
      id: 1,
      title: 'Página Inicial',
      description:
        'Gerencie os textos, botões e imagens dos components dedicados a página inicial.',
      link: '/dashboard/admin/website/home',
      imageUrl: '/images/dashboard/cards/homepage_1.webp',
      imageUrlHover: '/images/dashboard/cards/homepage.webp',
    },
    {
      id: 2,
      title: 'Sobre',
      description:
        'Gerencie os textos, botões e imagens dos components dedicados a página sobre.',
      link: '/dashboard/admin/website/about',
      imageUrl: '/images/dashboard/cards/about_1.webp',
      imageUrlHover: '/images/dashboard/cards/about.webp',
    },
    {
      id: 3,
      title: 'Cursos',
      description:
        'Gerencie os textos, botões e imagens dos components dedicados a página cursos.',
      link: '/dashboard/admin/website/courses',
      imageUrl: '/images/dashboard/cards/course_1.webp',
      imageUrlHover: '/images/dashboard/cards/course.webp',
    },
    {
      id: 4,
      title: 'Recrutamento',
      description:
        'Gerencie os textos, botões e imagens dos components dedicados a página recrutamento.',
      link: '/dashboard/admin/website/recruitment',
      imageUrl: '/images/dashboard/cards/recruitment_1.webp',
      imageUrlHover: '/images/dashboard/cards/recruitment.webp',
    },
    {
      id: 5,
      title: 'Treinamento',
      description:
        'Gerencie os textos, botões e imagens dos components dedicados a página treinamento.',
      link: '/dashboard/admin/website/training',
      imageUrl: '/images/dashboard/cards/training_1.webp',
      imageUrlHover: '/images/dashboard/cards/training.webp',
    },
    {
      id: 6,
      title: 'Contato',
      description:
        'Gerencie os textos, botões e imagens dos components dedicados a página contato.',
      link: '/dashboard/admin/website/contact',
      imageUrl: '/images/dashboard/cards/contact_1.webp',
      imageUrlHover: '/images/dashboard/cards/contact.webp',
    },
    {
      id: 7,
      title: 'Configurações Gerais',
      description:
        'Modifique informações de metadatas, favicons, titulo do site, redes sociais entre outros nas configurações gerais.',
      link: '/dashboard/admin/website/settings',
      imageUrl: '/images/dashboard/cards/settings_1.webp',
      imageUrlHover: '/images/dashboard/cards/settings.webp',
    },
  ]

  return (
    <div className="w-full py-7">
      <div className="container mx-auto justify-between py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              onClick={() => router.push(feature.link)}
              className={`
                ${styles.card}
                border
                border-gray-200
                rounded-xl
                p-6
                flex
                flex-col
                items-center
                cursor-pointer
              `}
            >
              {/* Container fixo 200x200 no desktop - no mobile fica em 1 coluna, sem corte */}
              <div className="relative w-[120px] h-[120px] mb-4 mx-auto">
                {/* Imagem principal */}
                <Image
                  src={feature.imageUrl}
                  alt={feature.title}
                  fill
                  className={`
                    ${styles.cardImage}
                    object-contain
                    rounded
                  `}
                />
                {/* Se existir imagem de hover, exibe sobre a principal */}
                {feature.imageUrlHover && (
                  <Image
                    src={feature.imageUrlHover}
                    alt={feature.title}
                    fill
                    className={`
                      ${styles.cardImageHover}
                      object-contain
                      rounded
                    `}
                  />
                )}
              </div>

              {/* Título e descrição: escalonando o tamanho da fonte em breakpoints */}
              <h4
                className="
                  text-base 
                  sm:text-lg 
                  md:text-xl 
                  font-semibold 
                  text-inherit 
                  mb-2 
                  text-left 
                  w-full
                "
              >
                {feature.title}
              </h4>

              <p
                className="
                  text-sm 
                  sm:text-base 
                  text-inherit 
                  text-left 
                  w-full
                "
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
