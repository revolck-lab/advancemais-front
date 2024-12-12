import React from 'react'

const CounterInformation: React.FC = (): JSX.Element => {
  return (
    <section className="bg-primary py-12">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-8">
        {/* Estatística 1 */}
        <div className="text-center flex-1 min-w-[200px]">
          <p className="uppercase text-sm mb-2 text-white">mais de</p>
          <p className="text-5xl font-bold text-secondary mb-2">150mil</p>
          <p className="text-lg text-white">alunos</p>
        </div>
        {/* Estatística 2 */}
        <div className="text-center flex-1 min-w-[200px]">
          <p className="uppercase text-sm mb-2 text-white">mais de</p>
          <p className="text-5xl font-bold text-secondary mb-2">120</p>
          <p className="text-lg text-white">cursos</p>
        </div>
        {/* Estatística 3 */}
        <div className="text-center flex-1 min-w-[200px]">
          <p className="uppercase text-sm mb-2 text-white">mais de</p>
          <p className="text-5xl font-bold text-secondary mb-2">60</p>
          <p className="text-lg text-white">professores</p>
        </div>
        {/* Estatística 4 */}
        <div className="text-center flex-1 min-w-[200px]">
          <p className="uppercase text-sm mb-2 text-white">mais de</p>
          <p className="text-5xl font-bold text-secondary mb-2">20mil</p>
          <p className="text-lg text-white">certificados emitidos</p>
        </div>
      </div>
    </section>
  )
}

export default CounterInformation
