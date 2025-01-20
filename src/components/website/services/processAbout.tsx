'use client'

import React from 'react'
import Styles from './list-services.module.css'

const ProcessAbout: React.FC = () => {
  return (
    <section className="bg-primary py-20 text-white">
      <div
        className={`${Styles.pxResponsive} container mx-auto grid lg:grid-cols-2 gap-16 items-center`}
      >
        {/* Lado esquerdo: Texto */}
        <div className={`${Styles.centerResponsive}`}>
          <h3 className="text-lg uppercase text-secondary font-light mb-4">
            Como Funciona?
          </h3>
          <h2 className="text-4xl font-extrabold mb-6">
            Feito para ser simples!
          </h2>
          <p className="leading-relaxed mb-8 text-neutral-300">
            Você não precisa ser um expert para utilizar o nosso sistema de
            recrutamento.
          </p>
        </div>

        {/* Lado direito: Etapas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Etapa 1 */}
          <div className="text-center">
            <div className="w-12 h-12 bg-secondary text-white font-bold rounded-full flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h4 className="text-xl font-semibold mb-2">
              Crie a conta da sua Empresa
            </h4>
            <p className="text-neutral-300 leading-relaxed">
              Cadastre sua empresa e depois insira outros recrutadores.
            </p>
          </div>

          {/* Etapa 2 */}
          <div className="text-center">
            <div className="w-12 h-12 bg-secondary text-white font-bold rounded-full flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h4 className="text-xl font-semibold mb-2">
              Publique sua Primeira Vaga
            </h4>
            <p className="text-neutral-300 leading-relaxed">
              Em menos de 5 minutos você insere os dados das suas vagas.
            </p>
          </div>

          {/* Etapa 3 */}
          <div className="text-center">
            <div className="w-12 h-12 bg-secondary text-white font-bold rounded-full flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h4 className="text-xl font-semibold mb-2">
              Receba seus Candidatos
            </h4>
            <p className="text-neutral-300 leading-relaxed">
              Tudo estará pronto para que seus talentos se cadastrem.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessAbout
