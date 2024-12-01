import Header from '@/components/website/header/header'
import Footer from '@/components/website/footer/footer'

export const metadata = {
  title: 'AdvanceMais',
  description: 'Seu CMS avançado!',
}

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        {/* Cabeçalho */}
        <Header />

        {/* Conteúdo principal */}
        <main className="flex-grow">{children}</main>

        {/* Rodapé */}
        <Footer />
      </body>
    </html>
  )
}
