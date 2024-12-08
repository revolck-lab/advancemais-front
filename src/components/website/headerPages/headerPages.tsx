'use client'

import { Button, Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Image from 'next/image'
import styles from './headerPages.module.css'

interface HeaderPagesProps {
  title: string
  subtitle: string
  description: string
  buttonText: string
  buttonUrl: string
  imageUrl: string
  imageAlt?: string
}

export default function HeaderPages({
  title,
  subtitle,
  description,
  buttonText,
  buttonUrl,
  imageUrl,
  imageAlt = 'Header Image',
}: HeaderPagesProps): JSX.Element {
  return (
    <section className="container mx-auto py-16 flex flex-col lg:flex-row items-center gap-8">
      <div className="w-full flex flex-col lg:flex-row items-start justify-between">
        {/* Texto principal */}
        <div className="text-center lg:text-left" style={{ width: '43%' }}>
          <h3 className={`${styles.subTitle} mb-1 text-secondary`}>
            {subtitle}
          </h3>
          <h2 className={`${styles.mainTitle} text-neural`}>{title}</h2>
          <p className={`${styles.paragraphyTitle} text-neutral-400`}>
            {description}
          </p>
          <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
            <Button className="mt-2 bg-secondary-600 text-neutral-50" size="lg">
              {buttonText}
            </Button>
          </a>
        </div>

        {/* Imagem e Breadcrumbs */}
        <div className={styles.imageContainer}>
          {/* Breadcrumbs */}
          <Breadcrumbs
            className={styles.breadcrumbs}
            itemClasses={{
              separator: 'px-2',
            }}
            separator="/"
          >
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/sobre">Sobre</BreadcrumbItem>
          </Breadcrumbs>

          {/* Imagem */}
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={600} // Ajuste para o tamanho necessário
            height={400} // Ajuste para o tamanho necessário
            className={styles.image}
          />
        </div>
      </div>
    </section>
  )
}
