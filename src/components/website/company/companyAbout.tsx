'use client'

import React from 'react'
import Image from 'next/image'

const CompanyAbout: React.FC = () => {
  return (
    <section className="container mx-auto py-16 flex flex-col lg:flex-row items-center gap-8">
      {/* Text Section */}
      <div className="lg:w-1/2 w-full">
        <div className="text-left mb-10">
          <h2 className="text-4xl font-extrabold mb-6 text-neutral-900 leading-tight">
            Conexão Forte = Resultado Forte
          </h2>
          <p className="text-lg text-neutral-700 leading-relaxed mb-4">
            De acordo com uma pesquisa recente{' '}
            <span className="italic">(Front)</span> realizada com mais de 1.100
            profissionais,{' '}
            <span className="font-bold">
              um dos principais padrões das equipes de alta performance é a
              comunicação aberta e de confiança.
            </span>
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed mb-4">
            Estes times valorizam o tempo de cada um e possuem fortes
            habilidades de comunicação.
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed">
            Entendemos que o seu desafio é único e focamos na personalização de
            acordo com as necessidades de comunicação da sua equipe. Conheça
            nossas soluções que já ajudaram centenas de empresas a se
            comunicarem de forma estratégica e eficaz.
          </p>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="lg:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
          <Image
            src="https://via.placeholder.com/600x400"
            alt="Treinamento 1"
            width={400}
            height={300}
            layout="responsive"
            className="hover:scale-105 transition-transform"
          />
        </div>
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
          <Image
            src="https://via.placeholder.com/600x400"
            alt="Treinamento 2"
            width={400}
            height={300}
            layout="responsive"
            className="hover:scale-105 transition-transform"
          />
        </div>
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
          <Image
            src="https://via.placeholder.com/600x400"
            alt="Treinamento 3"
            width={400}
            height={300}
            layout="responsive"
            className="hover:scale-105 transition-transform"
          />
        </div>
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
          <Image
            src="https://via.placeholder.com/600x400"
            alt="Treinamento 4"
            width={400}
            height={300}
            layout="responsive"
            className="hover:scale-105 transition-transform"
          />
        </div>
      </div>
    </section>
  )
}

export default CompanyAbout
