'use client'

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Styles from './coursesCarousel.module.css'

const courses = [
  {
    id: 1,
    image: 'https://via.placeholder.com/385x615.png?text=Curso+1',
    title: 'Indicadores de Recrutamento e Seleção',
    tag: 'Popular',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/385x615.png?text=Curso+2',
    title: 'Oratória e Persuasão para Líderes',
    tag: 'Novo',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/385x615.png?text=Curso+3',
    title: 'Formação em RH Generalista',
    tag: 'Novo',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/385x615.png?text=Curso+4',
    title: 'Como Montar um Currículo',
    tag: 'Popular',
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/385x615.png?text=Curso+5',
    title: 'Emprego e Métodos Eficazes',
    tag: 'Novo',
  },
  {
    id: 6,
    image: 'https://via.placeholder.com/385x615.png?text=Curso+6',
    title: 'Técnicas de Feedback Eficaz',
    tag: 'Novo',
  },
  {
    id: 7,
    image: 'https://via.placeholder.com/385x615.png?text=Curso+7',
    title: 'Gestão de Tempo e Produtividade',
    tag: 'Popular',
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/385x615.png?text=Curso+8',
    title: 'Liderança e Gestão de Equipes',
    tag: 'Novo',
  },
  {
    id: 9,
    image: 'https://via.placeholder.com/385x615.png?text=Curso+9',
    title: 'Estratégias de Comunicação Corporativa',
    tag: 'Popular',
  },
  {
    id: 10,
    image: 'https://via.placeholder.com/385x615.png?text=Curso+10',
    title: 'Marketing Pessoal e Networking',
    tag: 'Popular',
  },
]

const CoursesCarousel = () => {
  return (
    <section className="container mx-auto py-16 flex flex-col lg:flex-row items-center gap-8">
      <div className="w-full bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-neutral-800">
              Cursos em destaque
            </h2>
            <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-500 transition flex items-center">
              Ver todos os cursos <span className="ml-2">→</span>
            </button>
          </div>
          <div className="relative w-screen overflow-x-visible">
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
                    style={{
                      backgroundImage: `url(${course.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md">
                      {course.tag}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-800 to-transparent p-10 text-white text-center">
                      <h3 className="carousel-item-title mb-2">
                        {course.title}
                      </h3>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className={`absolute ${Styles.buttonPrevious}`}>
                <ChevronLeft className="w-6 h-6" />
              </CarouselPrevious>

              <CarouselNext className={`absolute ${Styles.buttonNext}`}>
                <ChevronRight className="w-6 h-6" />
              </CarouselNext>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoursesCarousel
