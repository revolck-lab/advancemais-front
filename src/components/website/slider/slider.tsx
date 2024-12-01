'use client'

import React from 'react'
import Image from 'next/image'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel/carousel'
import Styles from './slider.module.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: 'https://via.placeholder.com/1920x500.png?text=Slide+1',
    title: 'Slide 1',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/1920x500.png?text=Slide+2',
    title: 'Slide 2',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/1920x500.png?text=Slide+3',
    title: 'Slide 3',
  },
]

const Slider = () => {
  const isMobile = useIsMobile()

  return (
    <div
      className={`relative w-full ${
        isMobile ? 'h-[400px]' : 'h-48 md:h-64 lg:h-[400px] xl:h-[500px]'
      } group`}
    >
      <Carousel className="relative w-full h-full" opts={{ loop: true }}>
        <CarouselContent className="h-full">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="relative w-full h-full">
              <div
                className={`relative w-full ${
                  isMobile
                    ? 'h-[400px]'
                    : 'h-48 md:h-64 lg:h-[400px] xl:h-[500px]'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  layout="fill"
                  className="object-cover"
                  priority
                  quality={100}
                  sizes={
                    isMobile
                      ? '100vw'
                      : '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1920px'
                  }
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navegação no Desktop */}
        {!isMobile && (
          <>
            <CarouselPrevious
              className={`${Styles.sliderButton} ${Styles.sliderPrevious} absolute top-1/2 transform -translate-y-1/2 z-10`}
            >
              <ChevronLeft />
            </CarouselPrevious>
            <CarouselNext
              className={`${Styles.sliderButton} ${Styles.sliderNext} absolute top-1/2 transform -translate-y-1/2 z-10`}
            >
              <ChevronRight />
            </CarouselNext>
          </>
        )}

        {/* Dots para Mobile */}
        {isMobile && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === 0 ? 'bg-gray-800' : 'bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  )
}

export default Slider
