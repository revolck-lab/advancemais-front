import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken') // Verifica o cookie 'authToken'

  // Redireciona para '/website' caso seja a rota principal
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/website', request.url))
  }

  // Se o usuário estiver autenticado e tentar acessar a página de login, redireciona para o dashboard
  if (authToken && request.nextUrl.pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Permite acesso ao login se o usuário não estiver autenticado
  if (!authToken && request.nextUrl.pathname === '/auth/login') {
    return NextResponse.next() // Permite acessar a página de login
  }

  // Protege páginas do dashboard contra usuários não autenticados
  if (!authToken && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url)) // Redireciona para login
  }

  return NextResponse.next() // Permite o acesso em outros casos
}

// Define as rotas onde o middleware deve ser aplicado
export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'], // Aplica o middleware a todas as rotas relevantes
}
