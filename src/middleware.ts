// src/middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import websiteRoutes from './config/routes/website-routes'
import dashboardRoutes from './config/routes/dashboard-routes'

// ------------------------------------
// 1) Montar os arrays de rotas ANTES
// ------------------------------------

const websiteRoutesMatcher: string[] = []
for (const route of websiteRoutes) {
  if (route.subLinks && route.subLinks.length > 0) {
    for (const sub of route.subLinks) {
      websiteRoutesMatcher.push(sub.path)
    }
  }
  websiteRoutesMatcher.push(route.path)
}

const dashboardRoutesMatcher: string[] = []
for (const category of dashboardRoutes) {
  for (const item of category.items) {
    if (item.submenu && item.submenu.length > 0) {
      for (const sub of item.submenu) {
        dashboardRoutesMatcher.push(sub.href)
      }
    } else if (item.href) {
      dashboardRoutesMatcher.push(item.href)
    }
  }
}

// Cria o array final com todas as rotas “literalmente”
// Você pode usar concat ou spread aqui, pois agora é top-level e não dentro de config
const allRoutes = [
  '/',
  '/auth/login',
  '/website/pagina-inicial',
  // Rotas do website
  ...websiteRoutesMatcher,
  // Rotas do dashboard
  ...dashboardRoutesMatcher,
]

// ------------------------------------
// 2) Exportar config com matcher ESTÁTICO
// ------------------------------------
export const config = {
  matcher: allRoutes,
}

// ------------------------------------
// 3) Função principal do middleware
// ------------------------------------
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
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
