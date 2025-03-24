export type BreadcrumbConfig = {
  title: string
  breadcrumbs: { label: string; href?: string }[]
}

export function getBreadcrumbConfig(pathname: string): BreadcrumbConfig {
  switch (pathname) {
    //Configuração Admin - Website
    case '/dashboard/admin/website':
      return {
        title: 'Configurações do site principal',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Configurações do site principal' },
        ],
      }
    //Configuração Admin - Website / Pagina inicial
    case '/dashboard/admin/website/home':
      return {
        title: 'Configurações da página inicial',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          {
            label: 'Configurações do site principal',
            href: '/dashboard/admin/website',
          },
          { label: 'Página inicial' },
        ],
      }
    //Configuração Admin - Website / About
    case '/dashboard/admin/website/about':
      return {
        title: 'Configurações da sobre',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          {
            label: 'Configurações do site principal',
            href: '/dashboard/admin/website',
          },
          { label: 'Sobre' },
        ],
      }
    //Configuração Admin - Website / Course
    case '/dashboard/admin/website/courses':
      return {
        title: 'Configurações da cursos',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          {
            label: 'Configurações do site principal',
            href: '/dashboard/admin/courses',
          },
          { label: 'Cursos' },
        ],
      }
    //Configuração Admin - Website / Recruitment
    case '/dashboard/admin/website/recruitment':
      return {
        title: 'Configurações de recrutamento',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          {
            label: 'Configurações do site principal',
            href: '/dashboard/admin/website',
          },
          { label: 'Recrutamento' },
        ],
      }
    //Configuração Admin - Website / Training
    case '/dashboard/admin/website/training':
      return {
        title: 'Configurações de treinamento in company',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          {
            label: 'Configurações do site principal',
            href: '/dashboard/admin/website',
          },
          { label: 'Treinamento' },
        ],
      }
    //Configuração Admin - Website / contact
    case '/dashboard/admin/website/contact':
      return {
        title: 'Configurações de contato',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          {
            label: 'Configurações do site principal',
            href: '/dashboard/admin/website',
          },
          { label: 'Contato' },
        ],
      }
    //Configuração Admin - Website / settings
    case '/dashboard/admin/website/settings':
      return {
        title: 'Configurações gerais',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          {
            label: 'Configurações do site principal',
            href: '/dashboard/admin/website',
          },
          { label: 'Configurações gerais' },
        ],
      }
    //Perfil
    case '/dashboard/perfil':
      return {
        title: 'Meu perfil',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Meu perfil' },
        ],
      }
    //Candidatos
    case '/dashboard/business/candidatos':
      return {
        title: 'Lista de Candidatos',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Lista de Candidatos' },
        ],
      }

    //Business
    case '/dashboard/business':
      return {
        title: 'Painel de Recrutamento',
        breadcrumbs: [{ label: 'Painel de Recrutamento' }],
      }
    //Business
    case '/dashboard/business/vagas':
      return {
        title: 'Minhas vagas',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Minhas vagas' },
        ],
      }
    default:
      return {
        title: 'Dashboard',
        breadcrumbs: [{ label: 'Dashboard' }],
      }
  }
}
