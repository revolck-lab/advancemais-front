import React from 'react'
import Image from 'next/image'
import Styles from './list-services-company.module.css'

const ListServicesCompany: React.FC = () => {
  const benefits = [
    {
      text: 'Aprimore as competências da sua equipe.',
      gradientClass: Styles.gradientBackgroundSecondary, // Azul com gradiente
      circleClass: 'bg-secondary',
    },
    {
      text: 'Melhore a perfomance e produtividade.',
      gradientClass: Styles.gradientBackgroundPrimary, // Vermelho com gradiente
      circleClass: 'bg-primary',
    },
    {
      text: 'Recrutadores experientes e especialistas na área.',
      gradientClass: Styles.gradientBackgroundSecondary, // Azul com gradiente
      circleClass: 'bg-secondary',
    },
    {
      text: 'Diversas áreas de atuação.',
      gradientClass: Styles.gradientBackgroundPrimary, // Vermelho com gradiente
      circleClass: 'bg-primary',
    },
  ]

  return (
    <section className="container mx-auto py-16 flex flex-col lg:flex-row items-center gap-8">
      {/* Left Content (Image) */}
      <div className="lg:w-1/2 w-full flex flex-col lg:flex-row items-start justify-between">
        <Image
          src="/images/home/banner_site_2.webp"
          alt="Conheça nosso serviço de Consultoria Empresarial"
          className="rounded-lg shadow-lg"
          width={600}
          height={400}
        />
      </div>

      {/* Right Content (Text and Benefits) */}
      <div className="lg:w-1/2">
        <h2 className="text-4xl font-bold leading-tight text-gray-900 mb-6">
          Conheça nosso serviço de Treinamento In Company
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          O segredo para uma empresa de sucesso está em uma capactação contínua
          da equipe. A Advance+ oferece treinamentos personalizados que
          pontecializam as habilibidades dos seus colaboradores, permitindo que
          você se concente no crescimento do seu negócio
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

export default ListServicesCompany
