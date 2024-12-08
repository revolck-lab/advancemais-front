'use client'

import React from 'react'
import styles from './logoEnterprises.module.css'
import Image from 'next/image'

const logos = [
  {
    id: 1,
    name: 'Appian',
    src: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Appian_Logo.svg/512px-Appian_Logo.svg.png',
  },
  {
    id: 2,
    name: 'Kofax',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Tungsten_Automation.svg/220px-Tungsten_Automation.svg.png',
  },
  {
    id: 3,
    name: 'AWS',
    src: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  },
  {
    id: 4,
    name: 'Microsoft',
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  },
  {
    id: 5,
    name: 'Google',
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  },
  {
    id: 6,
    name: 'Falconi',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/90px-Apple_logo_black.svg.png',
  },
  {
    id: 7,
    name: 'Konica Minolta',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg/100px-Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg.png',
  },
  {
    id: 8,
    name: 'Lexmark',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Windows_logo_and_wordmark_-_2021.svg/210px-Windows_logo_and_wordmark_-_2021.svg.png',
  },
  {
    id: 9,
    name: 'Kyocera',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/220px-Amazon_2024.svg.png',
  },
  {
    id: 10,
    name: 'Xerox',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/220px-Logo_NIKE.svg.png',
  },
]

const LogoEnterprises: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center">
        {/* Título e subtítulo */}
        <h2 className="text-4xl font-bold text-neutral mb-4">
          Quem está com a gente nessa jornada
        </h2>
        <p className="text-[15px] text-neutral-400 leading-relaxed mb-8">
          Na Advance RH, acreditamos que cada talento é singular e cada empresa
          tem um potencial ilimitado. Conectamos histórias para criar um futuro
          mais inovador, inclusivo e promissor.
        </p>

        {/* Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {logos.map((logo) => (
            <div key={logo.id} className={styles.logoWrapper}>
              <Image
                src={logo.src}
                alt={logo.name}
                width={100} // Ajuste o tamanho conforme necessário
                height={40} // Ajuste o tamanho conforme necessário
                className={styles.logoImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LogoEnterprises
