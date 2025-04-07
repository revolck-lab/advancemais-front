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
    //Courses
    case '/dashboard/courses/students':
      return {
        title: 'Matrículas',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Matrículas' },
        ],
      }
    case '/dashboard/courses/courses':
      return {
        title: 'Painel de Cursos',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Cursos' },
        ],
      }
    case '/dashboard/courses/teacher':
      return {
        title: 'Professores',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Professores' },
        ],
      }
    case '/dashboard/courses/library':
      return {
        title: 'Biblioteca',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Biblioteca' },
        ],
      }
    case '/dashboard/courses/certificate':
      return {
        title: 'Certificados',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Certificados' },
        ],
      }
    case '/dashboard/courses/evidence':
      return {
        title: 'Provas',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Provas' },
        ],
      }
    case '/dashboard/courses/config':
      return {
        title: 'Configurações',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Configurações' },
        ],
      }
    case '/dashboard/courses/testimonials':
      return {
        title: 'Depoimentos',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Depoimentos' },
        ],
      }
    case '/dashboard/courses/courses/create':
      return {
        title: 'Criando um curso',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Cursos', href: '/dashboard/courses/courses' },
          { label: 'Criando um curso' },
        ],
      }
      case 'dashboard/courses/courses/create/[id]':
      return {
        title: 'Criando um curso',
        breadcrumbs: [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Cursos', href: '/dashboard/courses/courses' },
          { label: 'Criando um curso', href: '/dashboard/courses/courses/create' },
          { label: 'Configurando um curso' },
        ],
      }
    default:
      return {
        title: 'Dashboard',
        breadcrumbs: [{ label: 'Dashboard' }],
      }
  }
}
