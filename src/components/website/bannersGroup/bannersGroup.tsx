'use client'

import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import styles from './bannersGroup.module.css'

const slides = [
  { id: 1, text: 'Banner 1' },
  { id: 2, text: 'Banner 2' },
  { id: 3, text: 'Banner 3' },
  { id: 4, text: 'Banner 4' },
  { id: 5, text: 'Banner 5' },
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
                  <div className={styles.banner}>{slide.text}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Desktop e Notebook: Grid Layout
          <div className={styles.grid}>
            {slides.map((slide) => (
              <div key={slide.id} className={styles.banner}>
                {slide.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default BannersGroup
