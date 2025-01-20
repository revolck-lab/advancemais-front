'use client'

import { Button, Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Image from 'next/image'
import { useIsMobile } from '@/hooks/use-mobile'
import { usePathname } from 'next/navigation'
import Styles from './headerPages.module.css'

interface HeaderPagesProps {
  title: string
  subtitle: string
  description: string
  buttonText: string
  buttonUrl: string
  imageUrl: string
  imageAlt: string
}

export default function HeaderPages({
  title,
  subtitle,
  description,
  buttonText,
  buttonUrl,
  imageUrl,
  imageAlt,
}: HeaderPagesProps): JSX.Element {
  const isMobile = useIsMobile()
  const pathname = usePathname() // Hook do Next.js para capturar a URL atual

  // Função para gerar os breadcrumbs dinamicamente
  const generateBreadcrumbs = () => {
    // Quebra o caminho atual em segmentos
    const pathSegments = pathname.split('/').filter(Boolean)

    // Mapeia os segmentos em BreadcrumbItems
    return pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/')
      const label = segment.charAt(0).toUpperCase() + segment.slice(1) // Capitaliza o segmento
      return (
        <BreadcrumbItem key={href} href={href}>
          {label}
        </BreadcrumbItem>
      )
    })
  }

  if (isMobile) {
    // Layout para dispositivos móveis
    return (
      <section className="container mx-auto py-10 flex flex-col items-center text-center">
        {/* Breadcrumbs Dinâmicos */}
        <Breadcrumbs
          className={Styles.breadcrumbs}
          itemClasses={{
            separator: 'px-2',
          }}
          separator="/"
        >
          <BreadcrumbItem href="/">Home</BreadcrumbItem> {/* Página inicial */}
          {generateBreadcrumbs()} {/* Breadcrumbs dinâmicos */}
        </Breadcrumbs>

        {/* Título principal */}
        <h3 className={`${Styles.subTitle} mb-1 text-secondary`}>{subtitle}</h3>
        <h2 className={`${Styles.mainTitle} text-neutral`}>{title}</h2>
        <p className={`${Styles.paragraphyTitle} text-neutral-400`}>
          {description}
        </p>

        {/* Botão principal */}
        <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
          <Button className="mt-4 bg-secondary-600 text-neutral-50" size="lg">
            {buttonText}
          </Button>
        </a>
      </section>
    )
  }

  // Layout padrão (desktop)
  return (
    <section
      className={`${Styles.pxResponsive} container mx-auto py-16 flex flex-col lg:flex-row items-center gap-8`}
    >
      <div className="w-full flex flex-col lg:flex-row items-start justify-between">
        {/* Texto principal */}
        <div className="text-center lg:text-left" style={{ width: '43%' }}>
          <h3 className={`${Styles.subTitle} mb-1 text-secondary`}>
            {subtitle}
          </h3>
          <h2 className={`${Styles.mainTitle} text-neutral`}>{title}</h2>
          <p className={`${Styles.paragraphyTitle} text-neutral-400`}>
            {description}
          </p>
          <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
            <Button className="mt-2 bg-secondary-600 text-neutral-50" size="lg">
              {buttonText}
            </Button>
          </a>
        </div>

        {/* Imagem e Breadcrumbs */}
        <div className={Styles.imageContainer}>
          {/* Breadcrumbs Dinâmicos */}
          <Breadcrumbs
            className={Styles.breadcrumbs}
            itemClasses={{
              separator: 'px-2',
            }}
            separator="/"
          >
            <BreadcrumbItem href="/">Página Inicial</BreadcrumbItem>{' '}
            {/* Página inicial */}
            {generateBreadcrumbs()} {/* Breadcrumbs dinâmicos */}
          </Breadcrumbs>

          {/* Imagem */}
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={810}
            height={360}
            className={Styles.image}
            priority={true}
            unoptimized={true}
          />
        </div>
      </div>
    </section>
  )
}
