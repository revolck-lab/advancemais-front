'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkPermission, validateToken } from '@/services/api/auth/authService'

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        await validateToken() // Valida o token no backend
        const roles = ['admin', 'company', 'teacher', 'student']

        for (const role of roles) {
          try {
            await checkPermission(
              role as 'admin' | 'company' | 'teacher' | 'student'
            )
            setUserRole(role)
            break
          } catch {
            // Ignorar erros para roles que não possuem permissão
          }
        }
      } catch (error) {
        console.error('Erro ao validar token ou permissões:', error)
        router.push('/auth/login') // Redireciona para login se o token não for válido
      } finally {
        setLoading(false)
      }
    }

    fetchUserRole()
  }, [router])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!userRole) {
    return <div>Você não tem permissão para acessar esta área.</div>
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-lg font-bold">Dashboard</div>
        <nav className="flex-1">
          <ul>
            <li className="p-4 hover:bg-gray-700">
              <a href="/dashboard">Home</a>
            </li>
            {userRole === 'admin' && (
              <li className="p-4 hover:bg-gray-700">
                <a href="/dashboard/admin">Admin Area</a>
              </li>
            )}
            {userRole === 'teacher' && (
              <li className="p-4 hover:bg-gray-700">
                <a href="/dashboard/teacher">Teacher Area</a>
              </li>
            )}
            {/* Outras opções baseadas em roles */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">Bem-vindo, {userRole}</div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 bg-gray-100 p-4 overflow-auto">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          Footer © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}

export default DashboardLayout
