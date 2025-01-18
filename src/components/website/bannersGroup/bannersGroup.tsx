'use client'

import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import styles from './bannersGroup.module.css'
import Image from 'next/image'

const slides = [
  { id: 1, image: '/images/home/banner_crescimento.webp' },
  { id: 2, image: '/images/home/banner_custos.webp' },
  { id: 3, image: '/images/home/banner_equipe.webp' },
  { id: 4, image: '/images/home/banner_produtividade.webp' },
  { id: 5, image: '/images/home/banner_resultados.webp' },
]

const BannersGroup: React.FC = (): JSX.Element => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Configuração do Embla com autoplay no mobile
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true }, // Loop infinito
    isMobile ? [Autoplay({ delay: 3000, stopOnInteraction: false })] : [] // Auto loop para mobile
  )

  // Garante que o autoplay seja pausado e reiniciado corretamente
  useEffect(() => {
    if (!isMobile && emblaApi) {
      emblaApi.destroy() // Remove o autoplay em telas maiores
    }
  }, [isMobile, emblaApi])

  return (
    <section className={styles.container}>
      {/* Conteúdo central */}
      <div className={styles.content}>
        <h2 className={styles.title}>
          Confira os destaques para você e sua empresa decolarem
        </h2>

        {isMobile ? (
          // Mobile: Embla Carousel com autoplay
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.embla__container}>
              {slides.map((slide) => (
                <div key={slide.id} className={styles.embla__slide}>
                  <Image
                    src={slide.image}
                    alt={`Banner ${slide.id}`}
                    width={400}
                    height={600}
                    className={styles.bannerImage}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Desktop e Notebook: Grid Layout
          <div className={styles.grid}>
            {slides.map((slide) => (
              <div key={slide.id} className={styles.banner}>
                <Image
                  src={slide.image}
                  alt={`Banner ${slide.id}`}
                  width={400}
                  height={600}
                  className={styles.bannerImage}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default BannersGroup
