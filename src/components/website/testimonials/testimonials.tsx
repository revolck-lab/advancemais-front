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
import Styles from './testimonials.module.css'

const testimonials = [
  {
    id: 1,
    image: '/images/testemonials/face_1.png',
    name: 'Carolina Lemelle',
    position: 'Gerente de Gente e Gestão',
    testimonial:
      '“Para a contratação, precisávamos ser assertivos. Com o suporte da AdvanceMais, realizamos contratações mais rápidas e eficazes, otimizando nosso processo.”',
  },
  {
    id: 2,
    image: '/images/testemonials/face_2.png',
    name: 'Kaique Barboza',
    position: 'Coordenador de Gente & Cultura',
    testimonial:
      '“A AdvanceMais trouxe automação e inovação para nosso processo seletivo. Conseguimos reduzir o tempo de contratação e focar mais no desenvolvimento dos colaboradores.”',
  },
  {
    id: 3,
    image: '/images/testemonials/face_3.png',
    name: 'Rodolfo Martins',
    position: 'Coordenador Administrativo',
    testimonial:
      '“Com as soluções da AdvanceMais, otimizamos os processos internos e conseguimos atingir resultados que antes pareciam impossíveis.”',
  },
  {
    id: 4,
    image: '/images/testemonials/face_4.png',
    name: 'Camilla Souza',
    position: 'Coordenadora de RH',
    testimonial:
      '“Com a AdvanceMais, otimizamos todo o ciclo de recrutamento e seleção. Um processo que durava 45 dias agora é concluído em apenas 15.”',
  },
]

const Testimonials: React.FC = () => {
  const isMobile = useIsMobile()

  return (
    <section className="py-10">
      <div className="container mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral">Depoimentos</h2>
          <p className="mt-4 text-lg text-neutral-400 leading-relaxed max-w-4xl mx-auto">
            Conheça as histórias de quem confiou na AdvanceMais para transformar
            desafios em conquistas.
          </p>
        </div>

        {/* Carrossel */}
        <div className="relative w-full px-10 lg:px-5">
          <Carousel
            className="w-full"
            opts={{
              align: isMobile ? 'center' : 'start',
              containScroll: 'trimSnaps',
              loop: true,
            }}
          >
            <CarouselContent
              className={`${Styles.mobileContent} flex space-x-5 px-4`}
            >
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className={`flex-shrink-0 ${
                    isMobile ? 'basis-[100%] w-[100%]' : 'basis-[30%] w-[30%]'
                  } rounded-lg border border-secondary-100 hover:border-secondary p-6`}
                >
                  <div className="flex flex-col justify-between h-full">
                    {/* Texto do depoimento */}
                    <p className="text-[15px] text-neutral italic leading-relaxed mb-6">
                      {testimonial.testimonial}
                    </p>

                    {/* Informações do autor */}
                    <div className="flex items-center gap-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="rounded-full"
                      />
                      <div className="leading-none">
                        <h3 className="text-lg font-semibold text-primary">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-neutral-400">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Botões de navegação */}
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
      </div>
    </section>
  )
}

export default Testimonials
