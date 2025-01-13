'use client'

import React, { useCallback, useState, useEffect } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import Styles from './slider.module.css'

const slidesDesktop = [
  { id: 1, image: '/images/banners/banner_1_desktop.png', title: 'Banner 1' },
  { id: 2, image: '/images/banners/banner_2_desktop.png', title: 'Banner 2' },
  { id: 3, image: '/images/banners/banner_3_desktop.png', title: 'Banner 3' },
]

const slidesMobile = [
  { id: 1, image: '/images/banners/banner_1_mobile.png', title: 'Banner 1' },
  { id: 2, image: '/images/banners/banner_2_mobile.png', title: 'Banner 2' },
  { id: 3, image: '/images/banners/banner_3_mobile.png', title: 'Banner 3' },
]

const Slider: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const isMobile = useIsMobile()
  const slides = isMobile ? slidesMobile : slidesDesktop

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className={Styles['slider-container']}>
      <div ref={emblaRef} className={Styles.embla}>
        <div className={Styles.embla__container}>
          {slides.map((slide) => (
            <div key={slide.id} className={Styles.embla__slide}>
              <div
                className={`${Styles.embla__imageWrapper} ${
                  isMobile
                    ? Styles.embla__imageWrapperMobile
                    : Styles.embla__imageWrapperDesktop
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className={Styles.embla__image}
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Botões de Navegação com Ícones */}
      <div className={Styles.embla__controls}>
        <button
          className={`${Styles.embla__button} ${Styles.embla__buttonPrev}`}
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className={`${Styles.embla__button} ${Styles.embla__buttonNext}`}
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

export default Slider
