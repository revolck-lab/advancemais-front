'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Importar o componente de login
import LoginPage from './auth/login/page'

export default function HomePage(): JSX.Element {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const authToken = localStorage.getItem('authToken') // Aqui você pode verificar no localStorage ou cookie

    // Se o usuário estiver autenticado, redireciona para o dashboard
    if (authToken) {
      router.push('/dashboard')
    }

    setLoading(false)
  }, [router])

  if (loading) {
    return <div>Carregando...</div>
  }

  // Se não estiver autenticado, renderiza a página de login
  return <LoginPage />
}
