// src/middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Importar suas rotas de "website" e "dashboard" (caso esteja usando)
import websiteRoutes from './config/routes/website-routes'
import dashboardRoutes from './config/routes/dashboard-routes'

export const config = {
  // Lista de rotas para as quais o middleware deve rodar
  matcher: [
    // Páginas comuns
    '/',
    '/auth/login',

    // Exemplo de páginas do "website"
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

    // Se você usa subdiretório /website/ explicitamente
    '/website/pagina-inicial',

    // Exemplo de páginas do "dashboard"
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
    // ... Inclua aqui TODAS as rotas que o middleware deve interceptar ...
  ],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authToken = request.cookies.get('authToken') // <-- Verifica se existe 'authToken' no cookie

  // 1) Se a requisição é para "/", reescreve para "/website/pagina-inicial"
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/website/pagina-inicial', request.url))
  }

  // 2) Verifica se a rota pertence ao website (conforme sua lista `websiteRoutes`):
  const isWebsiteRoute = websiteRoutes.some((route) => {
    // Se o route tiver subLinks, verifica se o pathname inicia com algum deles
    if (route.subLinks) {
      return route.subLinks.some((sub) => pathname.startsWith(sub.path))
    }
    // Caso contrário, verifica se inicia com route.path
    return pathname.startsWith(route.path)
  })
  if (isWebsiteRoute) {
    // Reescreve para subcaminho /website
    return NextResponse.rewrite(new URL(`/website${pathname}`, request.url))
  }

  // 3) Verifica se a rota pertence ao dashboard
  const isDashboardRoute = dashboardRoutes.some((category) =>
    category.items.some((item) =>
      item.submenu
        ? item.submenu.some((sub) => pathname.startsWith(sub.href))
        : pathname.startsWith(item.href || '')
    )
  )
  if (isDashboardRoute) {
    // Se não estiver autenticado, redireciona para /auth/login
    if (!authToken) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    // Se estiver autenticado, segue normalmente
    return NextResponse.next()
  }

  // 4) Impede que um usuário autenticado acesse a página de login
  const isAuthenticated = !!authToken
  if (isAuthenticated && pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 5) Caso contrário, segue a rota normalmente
  return NextResponse.next()
}
