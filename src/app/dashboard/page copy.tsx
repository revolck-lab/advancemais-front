'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Header } from '@/components/dashboard/layout/header/header'
import { Sidebar } from '@/components/dashboard/layout/sidebar/sidebar'
import { StatsCard } from '@/components/dashboard/stats-card/stats-card'
import { ProfessorsList } from '@/components/dashboard/professors/professors-list'
import { StudentsList } from '@/components/dashboard/list/students-list'
import { useSidebar } from '@/components/dashboard/layout/sidebar/sidebar-context'
import { Loader } from '@/components/ui/loader/loader'

export default function DashboardPage() {
  const { isCollapsed } = useSidebar()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    window.addEventListener('beforeunload', handleStart)
    window.addEventListener('load', handleComplete)

    return () => {
      window.removeEventListener('beforeunload', handleStart)
      window.removeEventListener('load', handleComplete)
    }
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Sidebar />
      <Header />
      <main
        className={cn(
          'flex-1 pt-16 transition-all duration-300',
          isCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Students"
              value="3280"
              change="80% Increase in 20 Days"
              color="orange"
            />
            <StatsCard
              title="New Students"
              value="245"
              change="50% Increase in 25 Days"
              color="blue"
            />
            <StatsCard
              title="Total Course"
              value="28"
              change="76% Increase in 20 Days"
              color="red"
            />
            <StatsCard
              title="Fees Collection"
              value="25160$"
              change="30% Increase in 30 Days"
              color="green"
            />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ProfessorsList />
            <StudentsList />
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        Footer © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
