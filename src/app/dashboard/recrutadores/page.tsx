'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Clock, Filter, PieChart, Users } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Progress } from '@/components/ui/progress/progress'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('7d')

  // Dados para o gráfico de atividade
  const activityData = [
    { name: 'Seg', publicadas: 12, aprovadas: 10, recusadas: 2 },
    { name: 'Ter', publicadas: 19, aprovadas: 15, recusadas: 4 },
    { name: 'Qua', publicadas: 15, aprovadas: 12, recusadas: 3 },
    { name: 'Qui', publicadas: 25, aprovadas: 20, recusadas: 5 },
    { name: 'Sex', publicadas: 30, aprovadas: 25, recusadas: 5 },
    { name: 'Sáb', publicadas: 10, aprovadas: 8, recusadas: 2 },
    { name: 'Dom', publicadas: 5, aprovadas: 4, recusadas: 1 },
  ]

  // Dados para o gráfico de pizza
  const statusData = [
    { name: 'Publicadas', value: 142, color: '#10b981' },
    { name: 'Aguardando', value: 28, color: '#f59e0b' },
    { name: 'Rascunhos', value: 17, color: '#6b7280' },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Últimas 24 horas</SelectItem>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
          <Link href="/dashboard/recrutadores/vagas">
            <Button>Ver todas as vagas</Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Vagas Publicadas
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+12.5%</span> vs período
                anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Aguardando Aprovação
              </CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-amber-500">+4.3%</span> vs período
                anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Taxa de Aprovação
              </CardTitle>
              <PieChart className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+2.1%</span> vs período
                anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Candidatos
              </CardTitle>
              <Users className="h-4 w-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+18.2%</span> vs período
                anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="col-span-7 md:col-span-4">
            <CardHeader>
              <CardTitle>Atividade de Vagas</CardTitle>
              <CardDescription>
                Publicações, aprovações e rejeições ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={activityData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="publicadas"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="aprovadas"
                      stackId="2"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="recusadas"
                      stackId="3"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-7 md:col-span-3">
            <CardHeader>
              <CardTitle>Status das Vagas</CardTitle>
              <CardDescription>Distribuição atual por status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip
                      formatter={(value, name) => [`${value} vagas`, name]}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="col-span-7 md:col-span-4">
            <CardHeader>
              <CardTitle>Categorias de Vagas</CardTitle>
              <CardDescription>
                Distribuição por área de atuação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div
                          className="mr-2 h-3 w-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span>{category.name}</span>
                      </div>
                      <span className="font-medium">
                        {category.count} vagas ({category.percentage}%)
                      </span>
                    </div>
                    <Progress
                      value={category.percentage}
                      className="h-2 bg-muted"
                      indicatorClassName={`bg-[${category.color}]`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-7 md:col-span-3">
            <CardHeader>
              <CardTitle>Métricas de Eficiência</CardTitle>
              <CardDescription>Indicadores de desempenho</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Tempo médio de aprovação</span>
                    <span className="font-medium">1.4 dias</span>
                  </div>
                  <Progress value={70} className="h-2 bg-muted" />
                  <p className="text-xs text-muted-foreground text-right">
                    <span className="text-emerald-500">-0.3 dias</span> vs
                    período anterior
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Candidatos por vaga</span>
                    <span className="font-medium">9.2</span>
                  </div>
                  <Progress value={65} className="h-2 bg-muted" />
                  <p className="text-xs text-muted-foreground text-right">
                    <span className="text-emerald-500">+2.4</span> vs período
                    anterior
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Taxa de conversão</span>
                    <span className="font-medium">24%</span>
                  </div>
                  <Progress value={24} className="h-2 bg-muted" />
                  <p className="text-xs text-muted-foreground text-right">
                    <span className="text-emerald-500">+3.5%</span> vs período
                    anterior
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Vagas Aguardando Aprovação</CardTitle>
                <CardDescription>Vagas recentes para revisão</CardDescription>
              </div>
              <Link href="/recrutadores/vagas?filter=pendentes">
                <Button variant="outline" size="sm">
                  Ver todas
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingJobs.slice(0, 3).map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{job.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{job.company}</span>
                        <span className="mx-2">•</span>
                        <span>{job.receivedDate}</span>
                      </div>
                    </div>
                    <Link href={`/recrutadores/vagas/${job.id}`}>
                      <Button variant="outline" size="sm">
                        Revisar
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Vagas com Mais Candidatos</CardTitle>
                <CardDescription>Vagas mais populares</CardDescription>
              </div>
              <Link href="/recrutadores/candidatos">
                <Button variant="outline" size="sm">
                  Ver todos
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobsWithCandidates.slice(0, 3).map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{job.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{job.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-sm font-medium">
                        <Users className="mr-1 h-4 w-4 text-indigo-500" />
                        <span>{job.candidates.length}</span>
                      </div>
                      <Link href={`/recrutadores/candidatos/${job.id}`}>
                        <Button variant="outline" size="sm">
                          Ver
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// Dados de exemplo
const pendingJobs = [
  {
    id: 1,
    title: 'Desenvolvedor Full Stack',
    company: 'TechSolutions',
    location: 'São Paulo, SP',
    receivedDate: 'Hoje, 10:30',
  },
  {
    id: 2,
    title: 'Analista de Marketing Digital',
    company: 'AgênciaDigital',
    location: 'Remoto',
    receivedDate: 'Hoje, 09:15',
  },
  {
    id: 3,
    title: 'Gerente de Projetos',
    company: 'Construtora ABC',
    location: 'Rio de Janeiro, RJ',
    receivedDate: 'Ontem, 16:45',
  },
]

const jobsWithCandidates = [
  {
    id: 1,
    title: 'Desenvolvedor Full Stack',
    company: 'TechSolutions',
    candidates: Array(12).fill(null),
  },
  {
    id: 2,
    title: 'Analista de Marketing Digital',
    company: 'AgênciaDigital',
    candidates: Array(8).fill(null),
  },
  {
    id: 3,
    title: 'Gerente de Projetos',
    company: 'Construtora ABC',
    candidates: Array(15).fill(null),
  },
]

const jobCategories = [
  { name: 'Tecnologia', count: 48, percentage: 34, color: '#3b82f6' },
  { name: 'Marketing', count: 32, percentage: 23, color: '#8b5cf6' },
  { name: 'Administração', count: 27, percentage: 19, color: '#ec4899' },
  { name: 'Vendas', count: 18, percentage: 13, color: '#f97316' },
  { name: 'Outros', count: 16, percentage: 11, color: '#6b7280' },
]
