import React from 'react'

const CompanyInformation: React.FC = (): JSX.Element => {
  return (
    <section className="bg-primary py-10">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-8">
        {/* Estatística 1 */}
        <div className="text-center flex-1 min-w-[200px]">
          <p className="uppercase text-sm mb-2 text-white">mais de</p>
          <p className="text-5xl font-bold text-secondary mb-2">20mil</p>
          <p className="text-lg text-white">vagas preenchidas</p>
        </div>
        {/* Estatística 2 */}
        <div className="text-center flex-1 min-w-[200px]">
          <p className="uppercase text-sm mb-2 text-white">mais de</p>
          <p className="text-5xl font-bold text-secondary mb-2">85%</p>
          <p className="text-lg text-white">aprovados</p>
        </div>
        {/* Estatística 3 */}
        <div className="text-center flex-1 min-w-[200px]">
          <p className="uppercase text-sm mb-2 text-white">mais de</p>
          <p className="text-5xl font-bold text-secondary mb-2">4mil</p>
          <p className="text-lg text-white">empresas parceiras</p>
        </div>
        {/* Estatística 4 */}
        <div className="text-center flex-1 min-w-[200px]">
          <p className="uppercase text-sm mb-2 text-white">mais de</p>
          <p className="text-5xl font-bold text-secondary mb-2">10</p>
          <p className="text-lg text-white">profissionais especialista</p>
        </div>
      </div>
    </section>
  )
}

export default CompanyInformation
