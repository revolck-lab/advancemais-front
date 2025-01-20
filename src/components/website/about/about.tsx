'use client'

import Image from 'next/image'
import { Button } from '@nextui-org/react'
import Styles from './about.module.css'

interface AboutProps {
  aboutText: {
    title: string
    paragraphs: string[]
  }
  aboutImage: {
    src: string
    alt: string
  }
  whyChooseText: {
    title: string
    description: string
    buttonText: string
    buttonUrl: string
  }
  whyChooseCards: {
    icon: React.ReactNode
    title: string
    description: string
  }[]
}

export default function About({
  aboutText,
  aboutImage,
  whyChooseText,
  whyChooseCards,
}: AboutProps): JSX.Element {
  return (
    <>
      {/* Por que escolher AdvanceMais */}
      <section className={`${Styles.pxResponsive} py-16`}>
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-20">
          {/* Grid de Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            {whyChooseCards.map((card, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-primary text-white rounded-lg p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative mb-4">
                  <div className="bg-secondary p-4 rounded-full flex items-center justify-center w-16 h-16">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 text-center">
                  {card.title}
                </h3>
                <p className="text-neutral-200 text-center text-sm">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Lado direito com texto */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-neutral mb-6">
              {whyChooseText.title}
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              {whyChooseText.description}
            </p>
            <a
              href={whyChooseText.buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="mt-2 bg-secondary-600 text-neutral-50"
                size="lg"
              >
                {whyChooseText.buttonText}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Sobre a AdvanceMais */}
      <section className={`${Styles.pxResponsive} py-6`}>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lado esquerdo com texto */}
            <div className="w-full lg:w-1/2 flex flex-col gap-2">
              <h2 className="text-4xl font-bold text-neutral">
                {aboutText.title}
              </h2>
              <div className={`${Styles.aboutSection} text-justify mr-10`}>
                {aboutText.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg text-neutral-400 leading-relaxed max-w-4xl mx-auto mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Lado direito com imagem */}
            <div className={`${Styles.spaceMobile} w-full lg:w-1/2 h-auto`}>
              <div className="relative rounded-lg overflow-hidden shadow-lg h-full">
                <Image
                  src={aboutImage.src}
                  alt={aboutImage.alt}
                  width={530}
                  height={360}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div
                  className={`${Styles.aboutImagem} absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-14`}
                >
                  <div className="self-end text-right">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      Transformamos desafios em oportunidades reais.
                    </h2>
                    <p className="text-sm text-gray-200 mb-6 ml-44 mt-5">
                      Descubra como podemos conectar talentos, transformar
                      desafios em oportunidades e criar soluções que impulsionam
                      resultados.
                    </p>
                  </div>
                  <div className="self-end">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Button
                        className="mt-2 bg-secondary text-neutral-50"
                        size="lg"
                      >
                        Solicitar Consultoria
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
