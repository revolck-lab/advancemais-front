'use client'
import React from 'react'
import Image from 'next/image'
import Styles from './list-services.module.css'
import { useIsMobile } from '@/hooks/use-mobile'

const ListServices: React.FC = () => {
  const isMobile = useIsMobile()

  const benefits = [
    {
      text: 'Aumente a qualidade da sua equipe.',
      gradientClass: Styles.gradientBackgroundSecondary, // Azul com gradiente
      circleClass: 'bg-secondary',
    },
    {
      text: 'Reduza o tempo na contratação.',
      gradientClass: Styles.gradientBackgroundPrimary, // Vermelho com gradiente
      circleClass: 'bg-primary',
    },
    {
      text: 'Recrutadores experientes e especialistas na área.',
      gradientClass: Styles.gradientBackgroundSecondary, // Azul com gradiente
      circleClass: 'bg-secondary',
    },
    {
      text: 'Garantia de reposição.',
      gradientClass: Styles.gradientBackgroundPrimary, // Vermelho com gradiente
      circleClass: 'bg-primary',
    },
  ]

  return (
    <section
      className={`${
        Styles.pxResponsive
      } container mx-auto py-14 flex flex-col ${
        isMobile ? 'items-center gap-6' : 'lg:flex-row items-center gap-8'
      }`}
    >
      {/* Image Section */}
      <div
        className={`${
          isMobile
            ? 'w-full flex justify-center'
            : 'lg:w-1/2 w-full flex flex-col lg:flex-row items-start justify-between'
        }`}
      >
        <Image
          src="/images/home/banner_site_3.webp"
          alt="Team working"
          className={`rounded-lg shadow-${isMobile ? 'md' : 'lg'}`}
          width={isMobile ? 300 : 600}
          height={isMobile ? 200 : 400}
        />
      </div>

      {/* Text Section */}
      <div className={isMobile ? 'w-full px-4 text-center' : 'lg:w-1/2'}>
        <h2
          className={`${
            isMobile
              ? 'text-3xl font-semibold leading-tight text-gray-900 mb-4'
              : 'text-4xl font-bold leading-tight text-gray-900 mb-6'
          }`}
        >
          Conheça nosso serviço <br /> de Recrutamento & Seleção
        </h2>
        <p
          className={`${
            isMobile
              ? 'text-gray-600 text-base mb-6'
              : 'text-gray-600 text-lg mb-6'
          }`}
        >
          O segredo para uma empresa de sucesso está em talentos excepcionais. A
          Advance+ auxilia sua empresa a recrutar os melhores profissionais de
          forma descomplicada, permitindo que você se concentre no que realmente
          importa.
        </p>

        {/* Benefits List */}
        <ul className={isMobile ? 'space-y-4' : 'space-y-3'}>
          {benefits.map((item, index) => (
            <li
              key={index}
              className={`flex items-center gap-3 ${
                isMobile ? 'py-2 px-4 rounded-md' : ''
              } ${item.gradientClass}`}
            >
              <span
                className={`${
                  isMobile ? 'w-8 h-8' : 'w-6 h-6'
                } flex items-center justify-center text-white rounded-full ${
                  item.circleClass
                }`}
              >
                ✓
              </span>
              <span
                className={`${
                  isMobile ? 'text-base' : 'text-lg'
                } text-gray-800`}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ListServices
