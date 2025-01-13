import React from 'react'

const CounterInformation: React.FC = (): JSX.Element => {
  return (
    <section className="bg-primary py-12">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-8">
        {/* Estatística 1 */}
        <div className="text-center flex-1 min-w-[200px] md:min-w-0 mobile:flex mobile:flex-col mobile:gap-1">
          <p className="uppercase text-sm mb-2 text-white opacity-80 mobile:text-xs">
            mais de
          </p>
          <p className="text-5xl font-bold text-secondary mb-2 mobile:text-4xl">
            150mil
          </p>
          <p className="text-lg text-white opacity-90 mobile:text-base">
            alunos
          </p>
        </div>
        {/* Estatística 2 */}
        <div className="text-center flex-1 min-w-[200px] md:min-w-0 mobile:flex mobile:flex-col mobile:gap-1">
          <p className="uppercase text-sm mb-2 text-white opacity-80 mobile:text-xs">
            mais de
          </p>
          <p className="text-5xl font-bold text-secondary mb-2 mobile:text-4xl">
            120
          </p>
          <p className="text-lg text-white opacity-90 mobile:text-base">
            cursos
          </p>
        </div>
        {/* Estatística 3 */}
        <div className="text-center flex-1 min-w-[200px] md:min-w-0 mobile:flex mobile:flex-col mobile:gap-1">
          <p className="uppercase text-sm mb-2 text-white opacity-80 mobile:text-xs">
            mais de
          </p>
          <p className="text-5xl font-bold text-secondary mb-2 mobile:text-4xl">
            60
          </p>
          <p className="text-lg text-white opacity-90 mobile:text-base">
            professores
          </p>
        </div>
        {/* Estatística 4 */}
        <div className="text-center flex-1 min-w-[200px] md:min-w-0 mobile:flex mobile:flex-col mobile:gap-1">
          <p className="uppercase text-sm mb-2 text-white opacity-80 mobile:text-xs">
            mais de
          </p>
          <p className="text-5xl font-bold text-secondary mb-2 mobile:text-4xl">
            20mil
          </p>
          <p className="text-lg text-white opacity-90 mobile:text-base">
            certificados emitidos
          </p>
        </div>
      </div>
    </section>
  )
}

export default CounterInformation
