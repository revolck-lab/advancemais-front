import Image from 'next/image'

const Business: React.FC = (): JSX.Element => {
  return (
    <section>
      <div className="container mx-auto py-16 px-4 flex flex-col lg:flex-row items-center gap-20 mt-5">
        {/* Imagem do lado esquerdo */}
        <div className="w-full lg:w-1/2">
          <Image
            src="/images/home/banner_info.webp"
            alt="Acelere o crescimento"
            width={600}
            height={400}
            layout="responsive"
            className="rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Título e descrição do lado direito */}
        <div className="w-full lg:w-1/2 lg:text-left">
          <h1 className="text-3xl mb-4 text-neutral-600">
            <span className="font-bold">Acelere o crescimento</span> do seu
            negócio
          </h1>
          <p className="text-neutral-400 leading-relaxed text-justify">
            Na Advance+, fornecemos soluções estratégicas em gestão de pessoas e
            recrutamento, focadas em elevar o desempenho e a competitividade da
            sua empresa. Nosso trabalho envolve identificar e desenvolver
            talentos, otimizar processos e fortalecer a cultura organizacional,
            reduzindo custos de rotatividade e aumentando a produtividade da
            equipe. Conte conosco para potencializar resultados e alcançar novos
            patamares de sucesso.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Business
