export type BreadcrumbConfig = {
  title: string
  breadcrumbs: { label: string; href?: string }[]
}

export function getBreadcrumbConfig(pathname: string): BreadcrumbConfig {
  switch (pathname) {
    case '/dashboard/admin/website':
      return {
        title: 'Configurações do Website',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Configurações do Website' },
        ],
      }
    case '/dashboard/admin/website/home':
      return {
        title: 'Configuração da Página inicial',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          {
            label: 'Configurações do Website',
            href: '/dashboard/admin/website',
          },
          { label: 'Página inicial' },
        ],
      }
    default:
      return {
        title: 'Dashboard',
        breadcrumbs: [{ label: 'Dashboard' }],
      }
  }
}
