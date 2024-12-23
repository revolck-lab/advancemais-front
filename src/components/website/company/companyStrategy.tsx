'use client'

import React from 'react'
import Image from 'next/image'

const CompanyStrategy: React.FC = () => {
  return (
    <section className="container mx-auto py-16 flex flex-col lg:flex-row items-center gap-8">
      {/* Text Content */}
      <div className="lg:w-1/2 w-full">
        <h2 className="text-4xl font-bold leading-tight text-gray-900 mb-6">
          Fortaleça as conexões do seu time e gere mais resultados
        </h2>
        <ul className="list-disc ml-5 space-y-4 text-neutral-700">
          <li>
            <span className="font-bold">
              Transforme a confiança do seu time por meio da comunicação.
            </span>
          </li>
          <li>Elimine ruídos e garanta um ambiente de alta performance.</li>
        </ul>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 w-full flex justify-center">
        <div className="relative rounded-full overflow-hidden w-80 h-80 lg:w-96 lg:h-96">
          <Image
            src="https://via.placeholder.com/600x400"
            alt="Team working"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </section>
  )
}

export default CompanyStrategy
