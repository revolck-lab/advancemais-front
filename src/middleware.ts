// src/middleware.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import websiteRoutes from './config/routes/website-routes'
import dashboardRoutes from './config/routes/dashboard-routes'

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

  // Permite acesso a outras rotas sem autenticação temporariamente
  return NextResponse.next()
}

// Gerar arrays de rotas de forma estática
const websiteRoutesMatcher: string[] = websiteRoutes.flatMap((route) =>
  route.subLinks
    ? [route.path, ...route.subLinks.map((sub) => sub.path)]
    : [route.path]
)

const dashboardRoutesMatcher: string[] = dashboardRoutes.flatMap((category) =>
  category.items.flatMap((item) =>
    item.submenu ? item.submenu.map((sub) => sub.href) : item.href ? [item.href] : []
  )
)

// Configuração do middleware com valores estáticos
export const config = {
  matcher: [
    '/',
    '/auth/login',
    '/website/pagina-inicial',
    ...websiteRoutesMatcher, // Agora os arrays são gerados de forma estática
    ...dashboardRoutesMatcher,
  ],
}
