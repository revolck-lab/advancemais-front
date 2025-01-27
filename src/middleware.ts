// src/middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Importar rotas se ainda quiser usar dentro do middleware,
// mas NÃO as use no objeto config, pois o Next não permite.
import websiteRoutes from './config/routes/website-routes'
import dashboardRoutes from './config/routes/dashboard-routes'

// ------------------------------------------------------
// 1) Exportar config.matcher como array LITERAL e estático
//    --> copie todas as rotas manualmente, sem spreads ou loops
// ------------------------------------------------------

export const config = {
  matcher: [
    '/',
    '/auth/login',

    // Exemplo de páginas do "website"
    // (estas aqui têm que ser todas as que você precisa que o middleware intercepte)
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

    // Páginas específicas de /website/ (caso queira interceptar via matcher)
    // Por exemplo, se quer /website/pagina-inicial explicitamente:
    '/website/pagina-inicial',

    // Exemplos de páginas do "dashboard"
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
    // ... Inclua aqui TODAS as rotas que o middleware deve tratar ...
  ],
}

// ------------------------------------------------------
// 2) Função middleware pode continuar usando a lógica dinâmica
//    com websiteRoutes e dashboardRoutes, sem problemas
// ------------------------------------------------------

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authToken = request.cookies.get('authToken')

  // Redireciona a raiz `/` para `/website/pagina-inicial`
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/website/pagina-inicial', request.url))
  }

  // Reescreve rotas simplificadas para rotas internas no diretório `/website`
  const isWebsiteRoute = websiteRoutes.some((route) =>
    route.subLinks
      ? route.subLinks.some((sub) => pathname.startsWith(sub.path))
      : pathname.startsWith(route.path)
  )

  if (isWebsiteRoute) {
    return NextResponse.rewrite(new URL(`/website${pathname}`, request.url))
  }

  // Verifica rotas do dashboard
  const isDashboardRoute = dashboardRoutes.some((category) =>
    category.items.some((item) =>
      item.submenu
        ? item.submenu.some((sub) => pathname.startsWith(sub.href))
        : pathname.startsWith(item.href || '')
    )
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

  // Permite acesso a outras rotas sem autenticação (temporariamente)
  return NextResponse.next()
}
