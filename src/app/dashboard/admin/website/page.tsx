'use client'

import { useRouter } from 'next/navigation'
import {
  Home,
  Info,
  BookOpen,
  Briefcase,
  GraduationCap,
  Mail,
  Settings,
} from 'lucide-react' // Ícones do Lucide
import styles from './page.module.css'

const websitePages = [
  {
    id: 1,
    icon: Home,
    title: 'Página Inicial',
    description: 'Gerencie as configurações da página inicial.',
    link: '/dashboard/admin/website/home',
  },
  {
    id: 2,
    icon: Info,
    title: 'Sobre Nós',
    description: 'Configure as informações da página sobre.',
    link: '/dashboard/admin/website/about',
  },
  {
    id: 3,
    icon: BookOpen,
    title: 'Cursos',
    description: 'Gerencie os cursos exibidos no site.',
    link: '/dashboard/admin/website/courses',
  },
  {
    id: 4,
    icon: Briefcase,
    title: 'Recrutamento',
    description: 'Personalize as páginas de recrutamento.',
    link: '/dashboard/admin/website/recruitment',
  },
  {
    id: 5,
    icon: GraduationCap,
    title: 'Treinamento',
    description: 'Edite as informações de treinamentos.',
    link: '/dashboard/admin/website/training',
  },
  {
    id: 6,
    icon: Mail,
    title: 'Contato',
    description: 'Configure a página de contato.',
    link: '/dashboard/admin/website/contact',
  },
  {
    id: 7,
    icon: Settings,
    title: 'Configurações Gerais',
    description: 'Gerencie as configurações globais do site.',
    link: '/dashboard/admin/website/settings',
  },
]

export default function WebsiteDashboard() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-8">
      {/* Grid Responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {websitePages.map((page) => (
          <div
            key={page.id}
            onClick={() => router.push(page.link)}
            className={`${styles.card} cursor-pointer p-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow-lg transition transform hover:-translate-y-1 hover:scale-105`}
          >
            <div className="flex justify-center mb-4">
              <page.icon className="w-12 h-12 text-indigo-400" />
            </div>
            <h2 className="text-lg font-semibold text-center">{page.title}</h2>
            <p className="text-sm text-gray-300 text-center">
              {page.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
