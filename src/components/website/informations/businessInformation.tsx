import Image from 'next/image'

const Business = () => {
  return (
    <section>
      <div className="container mx-auto py-16 px-4 flex flex-col lg:flex-row items-center gap-8">
        {/* Imagem do lado esquerdo */}
        <div className="w-full lg:w-1/2">
          <Image
            src="https://via.placeholder.com/600x400.png?text=Imagem+Ilustrativa"
            alt="Acelere o crescimento"
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Título e descrição do lado direito */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl mb-4 text-neutral-600">
            <span className="font-bold">Acelere o crescimento</span> do seu
            negócio
          </h1>
          <p className="text-neutral-400 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Business
