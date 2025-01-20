'use client'

import React from 'react'
import Image from 'next/image'
import Styles from './services.module.css'

const InfoAbout: React.FC = () => {
  return (
    <section
      className={`${Styles.pxResponsive} container mx-auto py-14 grid lg:grid-cols-3 gap-16 items-center`}
    >
      {/* Lado esquerdo: Texto */}
      <div className="lg:col-span-1">
        <h2
          className={`${Styles.titleMobile} text-4xl text-neutral sm:text-4xl mb-6`}
        >
          Nós ajudamos você a migrar para a advance+
        </h2>
        <p
          className={`${Styles.descriptionMobile} text-neutral-400 leading-relaxed`}
        >
          Com a nossa plataforma você facilmente deixa tarefas chatas e
          repetitivas para trás com um sistema de recrutamento e seleção e foca
          no que mais importa em seu processo:{' '}
          <span className="text-secondary font-bold">
            escolher as pessoas certas!
          </span>
        </p>
      </div>

      {/* Imagem no meio */}
      <div
        className={`${Styles.mobileTopImage} lg:col-span-1 flex justify-center`}
      >
        <Image
          src="/images/home/banner_site_2.webp"
          alt="Team working"
          className="rounded-lg shadow-lg"
          width={600}
          height={400}
        />
      </div>

      {/* Lado direito: Benefícios */}
      <div className="lg:col-span-1 space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Atenda melhor os candidatos
          </h3>
          <p
            className={`${Styles.descriptionMobile} text-neutral-400 leading-relaxed`}
          >
            Tenha ferramentas incríveis para gerenciar e se comunicar melhor com
            seus potenciais talentos.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Ganhe Produtividade
          </h3>
          <p
            className={`${Styles.descriptionMobile} text-neutral-400 leading-relaxed`}
          >
            Atinga seus objetivos de recrutamento e seleção com menos esforço e
            otimize melhor seu tempo com nosso sistema.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Centralize Informações
          </h3>
          <p
            className={`${Styles.descriptionMobile} text-neutral-400 leading-relaxed`}
          >
            Realize as atividades mais importantes de emails e planilhas num só
            lugar, de um jeito mais fácil e organizado.
          </p>
        </div>
      </div>
    </section>
  )
}

export default InfoAbout
