// src/middleware.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// Middleware principal
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const authToken = request.cookies.get('authToken')

  // Redireciona a raiz `/` para `/website/pagina-inicial`
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/website/pagina-inicial', request.url))
  }

  // Rotas protegidas (Dashboard)
  const isDashboardRoute = dashboardRoutesMatcher.some((route) =>
    pathname.startsWith(route)
  )

  if (isDashboardRoute) {
    if (!authToken) {
      // Se não autenticado, redireciona para login
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    return NextResponse.next()
  }

  // Impede que um usuário autenticado acesse a página de login
  const isAuthenticated = !!authToken
  if (isAuthenticated && pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Permite acesso a outras rotas
  return NextResponse.next()
}

// Arrays estáticos de rotas do Website
const websiteRoutesMatcher = [
  '/',
  '/sobre',
  '/cursos',
  '/solucoes',
  '/solucoes/recrutamento-selecao',
  '/solucoes/treinamento-company',
  '/vagas',
  '/blog',
  '/contato',
  '/para-empresas',
  '/para-estudantes',
  '/para-empregos',
]

// Arrays estáticos de rotas do Dashboard
const dashboardRoutesMatcher = [
  '/dashboard/admin/website/pagina-inicial',
  '/dashboard/admin/website/about',
  '/dashboard/admin/website/courses',
  '/dashboard/admin/website/recruitment',
  '/dashboard/admin/website/training',
  '/dashboard/admin/website/jobs',
  '/dashboard/admin/website/blog',
  '/dashboard/admin/website/contact',
  '/dashboard/admin/professores',
  '/dashboard/admin/users/list',
  '/dashboard/admin/users/create',
  '/dashboard/admin/settings',
]

// Configuração estática do middleware
export const config = {
  matcher: [
    '/', // Redirecionamento raiz
    '/auth/login', // Login
    ...websiteRoutesMatcher, // Rotas do Website
    ...dashboardRoutesMatcher, // Rotas do Dashboard
  ],
}
