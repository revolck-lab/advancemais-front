'use client'

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel/carousel'
import Image from 'next/image'
import { useIsMobile } from '@/hooks/use-mobile'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Styles from './coursesCarousel.module.css'

const courses = [
  {
    id: 1,
    image: '/images/courses/course-1.png',
    title: 'Indicadores de Recrutamento e Seleção',
    tag: 'Popular',
  },
  {
    id: 2,
    image: '/images/courses/course-2.png',
    title: 'Oratória e Persuasão para Líderes',
    tag: 'Novo',
  },
  {
    id: 3,
    image: '/images/courses/course-3.png',
    title: 'Formação em RH Generalista',
    tag: 'Novo',
  },
  {
    id: 4,
    image: '/images/courses/course-4.png',
    title: 'Como Montar um Currículo',
    tag: 'Popular',
  },
  {
    id: 5,
    image: '/images/courses/course-5.png',
    title: 'Emprego e Métodos Eficazes',
    tag: 'Novo',
  },
  {
    id: 6,
    image: '/images/courses/course-6.png',
    title: 'Técnicas de Feedback Eficaz',
    tag: 'Novo',
  },
  {
    id: 7,
    image: '/images/courses/course-7.png',
    title: 'Gestão de Tempo e Produtividade',
    tag: 'Popular',
  },
  {
    id: 8,
    image: '/images/courses/course-8.png',
    title: 'Liderança e Gestão de Equipes',
    tag: 'Novo',
  },
]

const CoursesCarousel: React.FC = (): JSX.Element => {
  const isMobile = useIsMobile()

  return (
    <section className="container mx-auto py-16 flex flex-col lg:flex-row items-center gap-8">
      <div className="w-full bg-white">
        <div className="container mx-auto lg:px-4">
          <div className="flex flex-col items-center justify-center mb-8 space-y-0 md:flex-row md:items-center md:space-y-0 md:justify-between">
            <h2 className="text-3xl font-bold text-neutral-800 text-center md:text-left">
              Cursos em destaque
            </h2>
            {!isMobile && (
              <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-500 transition flex items-center">
                Ver todos os cursos <span className="ml-2">→</span>
              </button>
            )}
          </div>

          <div className="relative w-screen overflow-x-visible px-10 lg:px-5">
            <Carousel
              className="w-full"
              opts={{
                align: 'start',
                containScroll: 'trimSnaps',
                loop: true,
              }}
            >
              <CarouselContent className="flex space-x-5 px-4 ml-0">
                {courses.map((course) => (
                  <CarouselItem
                    key={course.id}
                    className="flex-shrink-0 basis-[300px] w-[300px] h-[500px] rounded-lg shadow-lg overflow-hidden relative"
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md">
                        {course.tag}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-800 to-transparent p-10 text-white text-center">
                        <h3 className="carousel-item-title text-lg mb-2">
                          {course.title}
                        </h3>
                      </div>
                    </a>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${Styles.buttonPrevious}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </CarouselPrevious>

              <CarouselNext
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${Styles.buttonNext}`}
              >
                <ChevronRight className="w-5 h-5" />
              </CarouselNext>
            </Carousel>
          </div>

          {/* Botão na versão mobile */}
          {isMobile && (
            <div className="mt-4 flex justify-center">
              <button className="bg-red-600 text-white px-6 py-3 mt-5 rounded-md hover:bg-red-500 transition flex items-center">
                Ver todos os cursos <span className="ml-2">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CoursesCarousel
