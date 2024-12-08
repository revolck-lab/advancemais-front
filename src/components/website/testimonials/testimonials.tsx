import React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel/carousel'

const testimonials = [
  {
    id: 1,
    image: 'https://via.placeholder.com/100',
    name: 'Carolina Lemelle',
    position: 'Gerente de Gente e Gestão',
    tag: 'Comunicadora Planejadora',
    testimonial:
      '“Para a contratação, precisávamos ser assertivos. Com o suporte da AdvanceMais, realizamos contratações mais rápidas e eficazes, otimizando nosso processo.”',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/100',
    name: 'Kaique Barboza',
    position: 'Coordenador de Gente & Cultura',
    tag: 'Comunicador Executor',
    testimonial:
      '“A AdvanceMais trouxe automação e inovação para nosso processo seletivo. Conseguimos reduzir o tempo de contratação e focar mais no desenvolvimento dos colaboradores.”',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/100',
    name: 'Rodolfo Martins',
    position: 'Coordenador Administrativo',
    tag: 'Analista Planejador',
    testimonial:
      '“Com as soluções da AdvanceMais, otimizamos os processos internos e conseguimos atingir resultados que antes pareciam impossíveis.”',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/100',
    name: 'Camilla Souza',
    position: 'Coordenadora de RH',
    tag: 'Planejadora Analista',
    testimonial:
      '“Com a AdvanceMais, otimizamos todo o ciclo de recrutamento e seleção. Um processo que durava 45 dias agora é concluído em apenas 15.”',
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/100',
    name: 'Carlos Santos',
    position: 'Gerente de Projetos',
    tag: 'Executor Estratégico',
    testimonial:
      '“O suporte da AdvanceMais foi essencial para implementar estratégias de sucesso na nossa empresa.”',
  },
]

const Testimonials: React.FC = () => (
  <section className="py-1">
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
      <div className="relative">
        <Carousel
          className="w-full"
          opts={{
            align: 'start',
            containScroll: 'trimSnaps',
            loop: true,
          }}
        >
          <CarouselContent className="flex space-x-4 px-10 mr-20">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="flex-shrink-0 basis-[25%] w-[25%] rounded-lg border-1 border-secondary border-opacity-45 bg-white p-5"
              >
                <div className="flex flex-col justify-between h-full">
                  {/* Aspas e texto */}
                  <div className="mt-2">
                    <p className="text-[15px] text-neutral italic leading-relaxed">
                      {testimonial.testimonial}
                    </p>
                  </div>

                  {/* Informações do usuário */}
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full flex-shrink-0"
                    />
                    <div className="leading-none">
                      <h3 className="text-lg font-semibold text-primary mb-[-2px]">
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
        </Carousel>
      </div>
    </div>
  </section>
)

export default Testimonials
