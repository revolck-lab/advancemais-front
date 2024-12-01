'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './logocarousel.module.css'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel/carousel'
import { Button } from '@/components/ui/button'

const LogoCarousel: React.FC = () => {
  const logos = [
    {
      src: 'https://via.placeholder.com/150x100.png?text=Logo+1',
      alt: 'Logo 1',
    },
    {
      src: 'https://via.placeholder.com/150x100.png?text=Logo+2',
      alt: 'Logo 2',
    },
    {
      src: 'https://via.placeholder.com/150x100.png?text=Logo+3',
      alt: 'Logo 3',
    },
    {
      src: 'https://via.placeholder.com/150x100.png?text=Logo+4',
      alt: 'Logo 4',
    },
    {
      src: 'https://via.placeholder.com/150x100.png?text=Logo+5',
      alt: 'Logo 5',
    },
    {
      src: 'https://via.placeholder.com/150x100.png?text=Logo+6',
      alt: 'Logo 6',
    },
    {
      src: 'https://via.placeholder.com/150x100.png?text=Logo+7',
      alt: 'Logo 7',
    },
    {
      src: 'https://via.placeholder.com/150x100.png?text=Logo+8',
      alt: 'Logo 8',
    },
    {
      src: 'https://via.placeholder.com/150x100.png?text=Logo+9',
      alt: 'Logo 9',
    },
    {
      src: 'https://via.placeholder.com/150x100.png?text=Logo+10',
      alt: 'Logo 10',
    },
  ]

  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const autoScrollInterval = 3000 // Ajuste do tempo entre cada rolagem

  useEffect(() => {
    if (!carouselApi) return

    const interval = setInterval(() => {
      carouselApi.scrollNext()
    }, autoScrollInterval)

    return () => clearInterval(interval)
  }, [carouselApi])

  const LogoItems = () =>
    logos.map((logo, index) => (
      <CarouselItem key={index} className={styles.carouselItem}>
        <Image
          src={logo.src}
          alt={logo.alt}
          width={150}
          height={100}
          className={styles.carouselImage}
        />
      </CarouselItem>
    ))

  return (
    <section className="container mx-auto py-16 text-center">
      {/* Título do carrossel */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-800">
          Grandes empresas que confiam na Advance+
        </h2>
      </div>

      {/* Carrossel */}
      <div className={styles.carouselContainer}>
        <Carousel opts={{ loop: true }} setApi={setCarouselApi}>
          {/* Botão anterior */}
          <CarouselPrevious
            aria-label="Scroll para trás"
            className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10"
          />

          {/* Conteúdo com os logos */}
          <CarouselContent className={styles.carouselContent}>
            <LogoItems />
          </CarouselContent>

          {/* Botão próximo */}
          <CarouselNext
            aria-label="Scroll para frente"
            className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10"
          />
        </Carousel>
      </div>

      {/* Botão abaixo do carrossel */}
      <div className="mt-8">
        <Button variant="default" size="default" className="text-white">
          Quero usar a Advance+
        </Button>
      </div>
    </section>
  )
}

export default LogoCarousel
