import React from 'react'
import Styles from './counterInformation.module.css'

const CounterInformation: React.FC = (): JSX.Element => {
  return (
    <section className="bg-primary py-12">
      <div
        className={`${Styles.pxResponsive} container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center justify-between`}
      >
        {/* Texto Principal */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-2xl font-light text-secondary mb-1">
            Impulsione sua carreira
          </h3>
          <h2 className="text-5xl font-semibold text-white">
            no mercado de trabalho
          </h2>
        </div>

        {/* Estatística 1 */}
        <div className="flex flex-col text-center items-center">
          <p className="text-5xl font-bold text-secondary">30%</p>
          <p className="text-sm mt-0 leading-relaxed text-white">
            Profissionais que investem em estudos contínuos têm, em média,{' '}
            <span className="font-bold">aumento de 30%</span> em suas
            oportunidades de promoção.
          </p>
        </div>

        {/* Estatística 2 */}
        <div className="flex flex-col text-center items-center">
          <p className="text-5xl font-bold text-secondary">4x</p>
          <p className="text-sm mt-0 leading-relaxed text-white">
            Profissionais com objetivos de carreira são{' '}
            <span className="font-bold">4x mais engajados</span> com a
            aprendizagem do que os que não têm metas definidas.
          </p>
        </div>

        {/* Estatística 3 */}
        <div className="flex flex-col text-center items-center">
          <p className="text-5xl font-bold text-secondary">85%</p>
          <p className="text-sm mt-0 leading-relaxed text-white">
            Profissionais que investem em aprendizado contínuo têm{' '}
            <span className="font-bold">85%</span> mais chances de promoção.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CounterInformation
