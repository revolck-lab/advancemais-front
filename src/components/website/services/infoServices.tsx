'use client'

import React from 'react'
import { Target, Database, Activity } from 'lucide-react'
import Styles from './services.module.css'

const InfoServices: React.FC = () => {
  const infoCards = [
    {
      icon: <Activity size={32} className="text-secondary" />,
      title: 'Sensação de Desorganização',
      description:
        'Se sentir desorganizado com a avalanche de demandas e informações afeta diretamente o desempenho do negócio.',
    },
    {
      icon: <Target size={32} className="text-primary" />,
      title: 'Esforço Repetitivo',
      description:
        'Tarefas manuais travam o bom uso do seu tempo e não te permite focar no que é essencial.',
    },
    {
      icon: <Database size={32} className="text-secondary" />,
      title: 'Resultados Insatisfatórios',
      description:
        'Recrutamento manual gera atrasos que impedem seu negócio de crescer na velocidade que ele poderia.',
    },
  ]

  return (
    <section
      className={`${Styles.pxResponsive} container mx-auto py-14 flex flex-col lg:flex-row items-center gap-16`}
    >
      {/* Texto no lado esquerdo */}
      <div className="lg:w-1/2 text-left animate-fade-in">
        <h2
          className={`${Styles.titleMobile} text-3xl text-neutral sm:text-5xl mb-8`}
        >
          Você ainda recruta com <br /> emails e planilhas?
        </h2>
        <p
          className={`${Styles.descriptionMobile} text-lg text-neutral-400 leading-relaxed mb-8`}
        >
          O esforço e a boa vontade do recrutador têm um limite claro e acabam
          criando problemas e desafios relevantes. Simplifique seus processos e
          alcance resultados melhores com as ferramentas certas.
        </p>
      </div>

      {/* Cards no lado direito */}
      <div className={`${Styles.mobileTopItem} lg:w-1/2 flex flex-col gap-6`}>
        {infoCards.map((card, index) => (
          <div
            key={index}
            className="flex items-start gap-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-primary"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-50">
              {card.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral mb-2">
                {card.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default InfoServices
