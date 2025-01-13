'use client'

import React, { useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import styles from './embla.module.css'

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.embla__imageWrapper}>
                <Image
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  fill
                  className={styles.embla__image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.embla__controls}>
        <button
          onClick={scrollPrev}
          className={`${styles.embla__button} ${styles.embla__button_prev}`}
        >
          Prev
        </button>
        <button
          onClick={scrollNext}
          className={`${styles.embla__button} ${styles.embla__button_next}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default EmblaCarousel
