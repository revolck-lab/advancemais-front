import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const authToken = request.cookies.get('authToken')

  // Redireciona a raiz `/` para `/website/pagina-inicial`
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/website/pagina-inicial', request.url))
  }

  // Rotas públicas no website
  const websiteRoutes = [
    '/pagina-inicial',
    '/sobre',
    '/cursos',
    '/servicos',
    '/fale-conosco',
  ]

  // Verifica se o usuário está autenticado
  const isAuthenticated = !!authToken

  // Reescreve rotas simplificadas para rotas internas no diretório `/website`
  if (websiteRoutes.some((route) => pathname === route)) {
    return NextResponse.rewrite(new URL(`/website${pathname}`, request.url))
  }

  // Protege as rotas do dashboard (requer autenticação)
  if (!isAuthenticated && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Impede que um usuário autenticado acesse a página de login
  if (isAuthenticated && pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url)) // Redireciona para o dashboard
  }

  // Permite o acesso em outros casos
  return NextResponse.next()
}

// Define as rotas onde o middleware deve ser aplicado
export const config = {
  matcher: [
    '/', // Middleware ativo na raiz
    '/pagina-inicial',
    '/sobre',
    '/cursos',
    '/servicos',
    '/fale-conosco',
    '/dashboard/:path*',
    '/auth/login',
  ],
}
