import { LayoutDashboard, Users } from 'lucide-react'

export const dashboardRoutes = [
  {
    category: 'ADMINISTRADOR',
    items: [
      {
        title: 'WEBSITE',
        icon: LayoutDashboard,
        submenu: [
          { title: 'Página Inicial', href: '/dashboard/admin/website/pagina-inicial' },
          { title: 'Sobre', href: '/dashboard/admin/website/about' },
          { title: 'Cursos', href: '/dashboard/admin/website/courses' },
          { title: 'Recrutamento', href: '/dashboard/admin/website/recruitment' },
          { title: 'Treinamento', href: '/dashboard/admin/website/training' },
          { title: 'Vagas', href: '/dashboard/admin/website/jobs' },
          { title: 'Blog', href: '/dashboard/admin/website/blog' },
          { title: 'Contato', href: '/dashboard/admin/website/contact' },
        ],
      },
      {
        title: 'Professores',
        icon: Users,
        href: '/dashboard/admin/professores',
      },
    ],
  },
  {
    category: 'GERENCIAMENTO',
    items: [
      {
        title: 'Usuários',
        icon: Users,
        submenu: [
          { title: 'Lista de Usuários', href: '/dashboard/admin/users/list' },
          { title: 'Criar Usuário', href: '/dashboard/admin/users/create' },
        ],
      },
      {
        title: 'Configurações',
        icon: LayoutDashboard,
        href: '/dashboard/admin/settings',
      },
    ],
  },
]

export const staticDashboardRoutes = dashboardRoutes.flatMap((category) =>
  category.items.flatMap((item) =>
    item.submenu ? item.submenu.map((sub) => sub.href) : item.href ? [item.href] : []
  )
)

export default dashboardRoutes
