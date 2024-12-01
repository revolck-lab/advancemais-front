import React from 'react'

const CounterInformation = () => {
  return (
    <section className="bg-blue-600 py-12">
      <div className="container mx-auto flex flex-wrap justify-between items-center text-white gap-8">
        {/* Estatística 1 */}
        <div className="text-center flex-1 min-w-[200px]">
          <p className="uppercase text-sm mb-2">mais de</p>
          <p className="text-5xl font-bold text-primary-500 mb-2">150mil</p>
          <p className="text-lg">alunos</p>
        </div>
        {/* Estatística 2 */}
        <div className="text-center flex-1 min-w-[200px]">
          <p className="uppercase text-sm mb-2">mais de</p>
          <p className="text-5xl font-bold text-primary-500 mb-2">120</p>
          <p className="text-lg">cursos</p>
        </div>
        {/* Estatística 3 */}
        <div className="text-center flex-1 min-w-[200px]">
          <p className="uppercase text-sm mb-2">mais de</p>
          <p className="text-5xl font-bold text-primary-500 mb-2">60</p>
          <p className="text-lg">professores</p>
        </div>
        {/* Estatística 4 */}
        <div className="text-center flex-1 min-w-[200px]">
          <p className="uppercase text-sm mb-2">mais de</p>
          <p className="text-5xl font-bold text-primary-500 mb-2">20mil</p>
          <p className="text-lg">certificados emitidos</p>
        </div>
      </div>
    </section>
  )
}

export default CounterInformation
