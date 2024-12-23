import Header from '@/components/website/header/header'
import Footer from '@/components/website/footer/footer'
import { NextUIProvider } from '@nextui-org/react'
export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
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
