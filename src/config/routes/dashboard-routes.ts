import { LayoutDashboard } from 'lucide-react'

export const dashboardRoutes = [
  {
    category: 'ADMINISTRAÇÃO',
    items: [
      {
        title: 'Configurações',
        icon: LayoutDashboard,
        submenu: [
          {
            title: 'Site principal',
            href: '/dashboard/admin/website',
          },
          // {
          //   title: 'Dashboard',
          //   href: '/dashboard/admin/dashboard',
          // },
        ],
        // submenu: [
        //   {
        //     title: 'Configurações do Site',
        //     href: '/dashboard/admin/website',
        //   },
        //   {
        //     title: 'Página Inicial',
        //     href: '/dashboard/admin/website/home',
        //   },
        //   {
        //     title: 'Sobre',
        //     href: '/dashboard/admin/website/about',
        //   },
        //   { title: 'Cursos', href: '/dashboard/admin/website/courses' },
        //   {
        //     title: 'Recrutamento',
        //     href: '/dashboard/admin/website/recruitment',
        //   },
        //   { title: 'Treinamento', href: '/dashboard/admin/website/training' },
        //   { title: 'Contato', href: '/dashboard/admin/website/contact' },
        // ],
      },
      {
        title: 'Cursos',
        icon: LayoutDashboard,
        submenu: [
          {
            title: 'Página Inicial',
            href: '/dashboard/courses',
          },
          {
            title: 'Cursos',
            href: '/dashboard/courses/courses',
          },
          {
            title: 'Matrículas',
            href: '/dashboard/courses/students',
          },
          {
            title: 'Bibliotecas',
            href: '/dashboard/courses/library',
          },
          {
            title: 'Professores',
            href: '/dashboard/courses/teacher',
          },
          {
            title: 'Provas',
            href: '/dashboard/courses/evidence',
          },
          {
            title: 'Certificados',
            href: '/dashboard/courses/certificate',
          },
          {
            title: 'Depoimentos',
            href: '/dashboard/courses/testimonials',
          },
          {
            title: 'Configurações',
            href: '/dashboard/courses/config',
          },
        ],
        // submenu: [
        //   {
        //     title: 'Configurações do Site',
        //     href: '/dashboard/admin/website',
        //   },
        //   {
        //     title: 'Página Inicial',
        //     href: '/dashboard/admin/website/home',
        //   },
        //   {
        //     title: 'Sobre',
        //     href: '/dashboard/admin/website/about',
        //   },
        //   { title: 'Cursos', href: '/dashboard/admin/website/courses' },
        //   {
        //     title: 'Recrutamento',
        //     href: '/dashboard/admin/website/recruitment',
        //   },
        //   { title: 'Treinamento', href: '/dashboard/admin/website/training' },
        //   { title: 'Contato', href: '/dashboard/admin/website/contact' },
        // ],
      },
    ],
  },
  {
    category: 'DASHBOARD',
    items: [
      {
        title: 'Página Inicial',
        icon: LayoutDashboard,
        href: '/dashboard/business',
      },
      {
        title: 'Vagas',
        icon: LayoutDashboard,
        href: '/dashboard/business/vagas',
      },
      {
        title: 'Lista de Candidatos',
        icon: LayoutDashboard,
        href: '/dashboard/business/candidatos',
      },
      {
        title: 'Configurações',
        icon: LayoutDashboard,
        href: '/dashboard/empresa/pagina-inicial',
      },
    ],
  },
]

export default dashboardRoutes
