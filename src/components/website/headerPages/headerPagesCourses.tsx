'use client'

import { Button, Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Styles from './headerPages.module.css'
import { useIsMobile } from '@/hooks/use-mobile'

const courses = [
  {
    id: 1,
    image: 'https://via.placeholder.com/300x400.png?text=Curso+1',
    title: 'Indicadores de Recrutamento e Seleção',
    tag: 'Popular',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/300x400.png?text=Curso+2',
    title: 'Oratória e Persuasão para Líderes',
    tag: 'Novo',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/300x400.png?text=Curso+3',
    title: 'Formação em RH Generalista',
    tag: 'Novo',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/300x400.png?text=Curso+4',
    title: 'Formação em Análise e Desenvolvimento de Sistemas',
    tag: 'Novo',
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/300x400.png?text=Curso+4',
    title: 'Formação em Análise e Desenvolvimento de Sistemas',
    tag: 'Novo',
  },
]

interface HeaderPagesCoursesProps {
  title: string
  subtitle: string
  description: string
  buttonText: string
  buttonUrl: string
  breadcrumbs?: { label: string; href: string }[]
}

export default function HeaderPagesCourses({
  title,
  subtitle,
  description,
  buttonText,
  buttonUrl,
  breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Cursos', href: '/cursos' },
  ],
}: HeaderPagesCoursesProps): JSX.Element {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <section className="container mx-auto py-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">Hello World</h1>
      </section>
    )
  }

  return (
    <section className="container mx-auto py-16 flex flex-col lg:flex-row items-center gap-8">
      <div className="w-full flex flex-col lg:flex-row items-start justify-between">
        {/* Texto principal */}
        <div className="text-center lg:text-left" style={{ width: '40%' }}>
          <h3 className={`${Styles.subTitle} mb-1 text-secondary`}>
            {subtitle}
          </h3>
          <h2 className={`${Styles.mainTitle} text-neutral`}>{title}</h2>
          <p className={`${Styles.paragraphyTitle} text-neutral-400`}>
            {description}
          </p>
          <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
            <Button className="mt-2 bg-secondary-600 text-neutral-50" size="lg">
              {buttonText}
            </Button>
          </a>
        </div>

        {/* Carrossel e Breadcrumbs */}
        <div className="relative w-full lg:w-[55%]">
          {/* Breadcrumbs */}
          <Breadcrumbs
            className={Styles.breadcrumbs}
            itemClasses={{
              separator: 'px-2',
            }}
            separator="/"
          >
            {breadcrumbs.map((crumb, index) => (
              <BreadcrumbItem key={index} href={crumb.href}>
                {crumb.label}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>

          {/* Carrossel */}
          <div className="relative w-full mt-4">
            <Carousel
              className="w-full"
              opts={{
                align: 'center', // Alinhe os itens para evitar cortes
                containScroll: 'trimSnaps', // Evite cortes visuais
                loop: true, // Permite rolagem infinita
              }}
            >
              <CarouselContent className="flex space-x-4 px-6">
                {/* Adicione padding (px-6) */}
                {courses.map((course) => (
                  <CarouselItem
                    key={course.id}
                    className="flex-shrink-0 basis-[260px] w-[260px] h-[340px] rounded-lg shadow-md overflow-hidden relative"
                    style={{
                      backgroundImage: `url(${course.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md">
                      {course.tag}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-800 to-transparent p-4 text-white text-center">
                      <h3 className="carousel-item-title text-lg font-semibold">
                        {course.title}
                      </h3>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${Styles.buttonPrevious}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </CarouselPrevious>

              <CarouselNext
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${Styles.buttonNext}`}
              >
                <ChevronRight className="w-4 h-4" />
              </CarouselNext>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}
