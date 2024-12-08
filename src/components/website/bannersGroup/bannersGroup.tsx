import React from 'react'

const BannersGroup: React.FC = (): JSX.Element => {
  return (
    <section className="bg-gray-100 py-16 relative">
      {/* Imagens de fundo laterais */}
      <div
        className="absolute top-0 left-0 w-[300px] h-full bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url('https://via.placeholder.com/300x600.png?text=Lateral+Esquerda')`,
        }}
      ></div>
      <div
        className="absolute top-0 right-0 w-[300px] h-full bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url('https://via.placeholder.com/300x600.png?text=Lateral+Direita')`,
        }}
      ></div>

      {/* Conteúdo Central */}
      <div className="container mx-auto relative z-10">
        <h2 className="text-center text-2xl font-bold text-neutral-800 mb-8">
          Confira os destaques para você e sua empresa decolarem
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Banners */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-blue-600 h-[400px] w-[300px] rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-xl"
            >
              Banner {i + 1}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BannersGroup
