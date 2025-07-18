// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Expressão regular para identificar os prefixos das rotas do website
const websiteRegex =
  /^\/(sobre|cursos|solucoes|vagas|blog|contato|para-empresas|para-estudantes|para-empregos|politica-privacidade|termos-uso|checkout)(\/|$)/

export const config = {
  // Aplica o middleware apenas para as rotas necessárias,
  // evitando processamento para recursos estáticos.
  matcher: [
    '/',
    '/auth/:path*',
    '/dashboard/:path*',
    '/sobre/:path*',
    '/cursos/:path*',
    '/solucoes/:path*',
    '/vagas/:path*',
    '/blog/:path*',
    '/contato/:path*',
    '/politica-privacidade/:path*',
    '/termos-uso/:path*',
    '/para-empresas/:path*',
    '/para-estudantes/:path*',
    '/para-empregos/:path*',
    '/website/:path*',
    '/checkout/:path*',
  ],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authToken = request.cookies.get('authToken')

  // 1. Se o usuário acessar a raiz ("/"), reescreve para "/website/pagina-inicial"
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/website/pagina-inicial', request.url))
  }

  // 2. Rotas do Dashboard:
  // Se a rota começa com "/dashboard" e o usuário não está autenticado, redireciona para "/auth/login".
  if (pathname.startsWith('/dashboard')) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    return NextResponse.next()
  }

  // 3. Rotas de autenticação:
  // Se o usuário autenticado tentar acessar "/auth/login", redireciona para o dashboard.
  if (pathname === '/auth/login' && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 4. Se o pathname já começa com "/website", deixa seguir normalmente.
  if (pathname.startsWith('/website')) {
    return NextResponse.next()
  }

  // 5. Se o pathname corresponder a um dos prefixos do website (ex: "/sobre", "/cursos", etc.),
  // reescreve para "/website" + pathname.
  if (websiteRegex.test(pathname)) {
    return NextResponse.rewrite(new URL(`/website${pathname}`, request.url))
  }

  // 6. Para todas as outras rotas, deixa seguir normalmente.
  return NextResponse.next()
}
