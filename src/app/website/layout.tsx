'use client'

import Header from '@/components/website/header/header'
import Footer from '@/components/website/footer/footer'
import { NextUIProvider } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Styles from './layout.module.css'

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula um carregamento para demonstrar o spinner
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // 1 segundo de carregamento simulado

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className={Styles['loader-container']}>
        <div className={Styles.loader}></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <NextUIProvider>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </NextUIProvider>
    </div>
  )
}
