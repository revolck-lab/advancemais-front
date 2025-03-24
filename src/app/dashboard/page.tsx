'use client'

import { MetricsCard } from '@/components/dashboard/overview/metrics-card'
import { OverviewCard } from '@/components/dashboard/overview/overview-cards'
import { StatsGrid } from '@/components/dashboard/overview/stats-grid'
import React from 'react'

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6 space-y-8 mb-10 bg-white border rounded-lg">
      <StatsGrid
        items={[
          {
            title: 'Total de Usuários',
            value: 12458,
            description: 'Ativos na plataforma',
          },
          {
            title: 'Novas Inscrições',
            value: 245,
            description: 'Últimos 30 dias',
          },
          {
            title: 'Vagas Publicadas',
            value: 862,
            description: 'Vagas ativas',
          },
          {
            title: 'Contratações',
            value: 156,
            description: 'Este mês',
          },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <OverviewCard
          title="Visão Geral de Alunos"
          value={8654}
          description="Total de alunos"
          stats={[
            { label: 'Ativos', value: 6500, color: 'bg-emerald-500' },
            { label: 'Em Curso', value: 1654, color: 'bg-blue-500' },
            { label: 'Formados', value: 500, color: 'bg-purple-500' },
          ]}
        />

        <OverviewCard
          title="Visão Geral de Empresas"
          value={1245}
          description="Total de empresas"
          stats={[
            { label: 'Ativas', value: 980, color: 'bg-emerald-500' },
            { label: 'Novas', value: 185, color: 'bg-blue-500' },
            { label: 'Inadimplentes', value: 80, color: 'bg-red-500' },
          ]}
        />

        <OverviewCard
          title="Visão Geral de Recrutadores"
          value={425}
          description="Total de recrutadores"
          stats={[
            { label: 'Ativos', value: 350, color: 'bg-emerald-500' },
            { label: 'Novos', value: 45, color: 'bg-blue-500' },
            { label: 'Inativos', value: 30, color: 'bg-red-500' },
          ]}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <MetricsCard
          title="Crescimento de Usuários"
          data={{
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [
              {
                label: 'Alunos',
                data: [6500, 7000, 7500, 8000, 8300, 8654],
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.5)',
              },
              {
                label: 'Empresas',
                data: [800, 900, 1000, 1100, 1200, 1245],
                borderColor: 'rgb(14, 165, 233)',
                backgroundColor: 'rgba(14, 165, 233, 0.5)',
              },
            ],
          }}
        />

        <MetricsCard
          title="Vagas e Contratações"
          data={{
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [
              {
                label: 'Vagas Publicadas',
                data: [450, 520, 610, 720, 800, 862],
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.5)',
              },
              {
                label: 'Contratações',
                data: [80, 95, 110, 130, 145, 156],
                borderColor: 'rgb(168, 85, 247)',
                backgroundColor: 'rgba(168, 85, 247, 0.5)',
              },
            ],
          }}
        />
      </div>
    </div>
  )
}

export default DashboardPage
