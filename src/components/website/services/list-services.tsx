import React from 'react'
import Image from 'next/image'
import Styles from './list-services.module.css'

const ListServices: React.FC = () => {
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
    <section className="container mx-auto py-16 flex flex-col lg:flex-row items-center gap-8">
      {/* Left Content (Image) */}
      <div className="lg:w-1/2 w-full flex flex-col lg:flex-row items-start justify-between">
        <Image
          src="https://via.placeholder.com/600x400"
          alt="Team working"
          className="rounded-lg shadow-lg"
          width={600}
          height={400}
        />
      </div>

      {/* Right Content (Text and Benefits) */}
      <div className="lg:w-1/2">
        <h2 className="text-4xl font-bold leading-tight text-gray-900 mb-6">
          Conheça nosso serviço <br /> de Recrutamento & Seleção
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          O segredo para uma empresa de sucesso está em talentos excepcionais. A
          Advance+ auxilia sua empresa a recrutar os melhores profissionais de
          forma descomplicada, permitindo que você se concentre no que realmente
          importa.
        </p>

        {/* Benefits List */}
        <ul className="space-y-3">
          {benefits.map((item, index) => (
            <li
              key={index}
              className={`flex items-center gap-4 ${item.gradientClass}`}
            >
              <span
                className={`w-6 h-6 flex items-center justify-center text-white rounded-full ${item.circleClass}`}
              >
                ✓
              </span>
              <span className="text-lg text-gray-800">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ListServices
