import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Reescreve a raiz `/` para `/website/pagina-inicial`
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/website/pagina-inicial', request.url))
  }

  // Reescreve rotas simplificadas para rotas internas no diretório `/website`
  const websiteRoutes = [
    '/pagina-inicial',
    '/sobre',
    '/cursos',
    '/servicos',
    '/fale-conosco',
  ]
  if (websiteRoutes.some((route) => pathname === route)) {
    return NextResponse.rewrite(new URL(`/website${pathname}`, request.url))
  }

  // Protege rotas de dashboard (exige autenticação)
  const authToken = request.cookies.get('authToken')
  if (!authToken && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next() // Permite o acesso em outros casos
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
