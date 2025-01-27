import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { staticWebsiteRoutes } from './config/routes/website-routes'
import { staticDashboardRoutes } from './config/routes/dashboard-routes'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const authToken = request.cookies.get('authToken')

  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/website/pagina-inicial', request.url))
  }

  if (staticWebsiteRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.rewrite(new URL(`/website${pathname}`, request.url))
  }

  if (staticDashboardRoutes.some((route) => pathname.startsWith(route))) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    return NextResponse.next()
  }

  if (pathname === '/auth/login' && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/auth/login',
    ...staticWebsiteRoutes,
    ...staticDashboardRoutes,
  ],
}
