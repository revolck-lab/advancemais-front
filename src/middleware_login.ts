// src/middleware.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// Middleware para verificação de autenticação
export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken') // Verifica o cookie 'authToken'

  // Se o usuário estiver autenticado e tentar acessar a página de login, redireciona para o dashboard
  if (authToken && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Se não estiver autenticado e estiver acessando a página de login, permite o acesso
  if (!authToken && request.nextUrl.pathname === '/') {
    return NextResponse.next() // Permite acessar a página de login
  }

  // Para outras páginas, verifica a autenticação
  if (!authToken && !request.nextUrl.pathname.startsWith('/auth/login')) {
    return NextResponse.redirect(new URL('/', request.url)) // Redireciona para o login se não estiver autenticado
  }

  return NextResponse.next()
}

// Define as rotas onde o middleware deve ser aplicado
export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
}
