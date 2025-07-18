'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import {
  Book,
  Users,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  FileText,
  Video,
  Building,
  Monitor,
  Globe,
  CheckCircle,
  Star,
  Target,
  Activity,
  GraduationCap,
  UserCheck,
  ArrowUp,
  ArrowDown,
  Minus,
  Edit,
  HelpCircle,
} from 'lucide-react'
import Image from 'next/image'

const monthlyEnrollmentData = [
  { month: 'Jan', enrollments: 120, completions: 95 },
  { month: 'Fev', enrollments: 135, completions: 108 },
  { month: 'Mar', enrollments: 148, completions: 125 },
  { month: 'Abr', enrollments: 162, completions: 140 },
  { month: 'Mai', enrollments: 178, completions: 155 },
  { month: 'Jun', enrollments: 195, completions: 172 },
]

const categoryPerformanceData = [
  { category: 'RH', courses: 12, students: 5, completion: 3, rating: 4.6 },
  {
    category: 'Operações',
    courses: 8,
    students: 20,
    completion: 0,
    rating: 4.4,
  },
  {
    category: 'Liderança',
    courses: 6,
    students: 5,
    completion: 12,
    rating: 4.8,
  },
  {
    category: 'Tecnologia',
    courses: 10,
    students: 10,
    completion: 15,
    rating: 4.3,
  },
  {
    category: 'Comunicação',
    courses: 5,
    students: 4,
    completion: 2,
    rating: 4.7,
  },
]

const topInstructors = [
  {
    id: 1,
    name: 'Ana Silva',
    courses: 8,
    students: 240,
    rating: 4.9,
    completionRate: 92,
    photo: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    name: 'Carlos Oliveira',
    courses: 6,
    students: 180,
    rating: 4.7,
    completionRate: 88,
    photo: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    name: 'Maria Santos',
    courses: 5,
    students: 150,
    rating: 4.8,
    completionRate: 90,
    photo: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 4,
    name: 'João Costa',
    courses: 4,
    students: 120,
    rating: 4.6,
    completionRate: 85,
    photo: '/placeholder.svg?height=40&width=40',
  },
]

const recentActivities = [
  {
    id: 1,
    type: 'course_created',
    title: 'Novo curso criado',
    description: 'Excel Avançado para RH foi criado por Ana Silva',
    time: '2 horas atrás',
    icon: Book,
    color: 'blue',
  },
  {
    id: 2,
    type: 'material_uploaded',
    title: 'Material adicionado',
    description: 'Apostila de Departamento Pessoal foi enviada',
    time: '4 horas atrás',
    icon: FileText,
    color: 'green',
  },
  {
    id: 3,
    type: 'student_completed',
    title: 'Curso concluído',
    description: '25 alunos concluíram Gestão de RH',
    time: '6 horas atrás',
    icon: GraduationCap,
    color: 'purple',
  },
  {
    id: 4,
    type: 'enrollment',
    title: 'Novas matrículas',
    description: '15 novos alunos se matricularam hoje',
    time: '8 horas atrás',
    icon: UserCheck,
    color: 'orange',
  },
]

const upcomingDeadlines = [
  {
    id: 1,
    title: 'Atualização de material - Gestão de RH',
    date: '2024-06-20',
    priority: 'high',
    type: 'material_update',
  },
  {
    id: 2,
    title: 'Revisão de questionários - DP na Prática',
    date: '2024-06-22',
    priority: 'medium',
    type: 'content_review',
  },
  {
    id: 3,
    title: 'Finalização - Excel Avançado para RH',
    date: '2024-06-25',
    priority: 'high',
    type: 'course_completion',
  },
  {
    id: 4,
    title: 'Avaliação de feedback - Liderança',
    date: '2024-06-28',
    priority: 'low',
    type: 'feedback_review',
  },
]

export default function PedagogicalOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  const getActivityIcon = (type: string, color: string) => {
    const iconMap: { [key: string]: React.ElementType } = {
      course_created: Book,
      material_uploaded: FileText,
      student_completed: GraduationCap,
      enrollment: UserCheck,
    }

    const Icon = (iconMap[type] || Activity) as React.ElementType
    const colorMap: { [key: string]: string } = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      orange: 'text-orange-600 bg-orange-100',
    }

    return (
      <div
        className={`p-2 rounded-full ${colorMap[color] || 'text-gray-600 bg-gray-100'}`}
      >
        <Icon className="h-4 w-4" />
      </div>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous)
      return <ArrowUp className="h-4 w-4 text-green-600" />
    if (current < previous)
      return <ArrowDown className="h-4 w-4 text-red-600" />
    return <Minus className="h-4 w-4 text-gray-600" />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 rounded-sm">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Visão Geral Pedagógica
              </h1>
              <p className="text-gray-600">
                Dashboard administrativo com métricas e insights dos cursos
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                  <SelectItem value="90d">Últimos 90 dias</SelectItem>
                  <SelectItem value="1y">Último ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cursos</p>
                  <p className="text-3xl font-bold text-gray-900">10</p>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(41, 38)}
                    <span className="text-sm text-green-600 ml-1">
                      +7.9% vs mês anterior
                    </span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Book className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Alunos</p>
                  <p className="text-3xl font-bold text-gray-900">50</p>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(1170, 1050)}
                    <span className="text-sm text-green-600 ml-1">
                      +11.4% vs mês anterior
                    </span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Taxa de Conclusão
                  </p>
                  <p className="text-3xl font-bold text-gray-900">25.2%</p>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(84.2, 81.5)}
                    <span className="text-sm text-green-600 ml-1">
                      +2.7% vs mês anterior
                    </span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="instructors">Instrutores</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enrollment Trends */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Tendências de Matrícula e Conclusão
                  </CardTitle>
                  <CardDescription>
                    Evolução mensal de matrículas e conclusões de cursos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyEnrollmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="enrollments"
                        stackId="1"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.6}
                        name="Matrículas"
                      />
                      <Area
                        type="monotone"
                        dataKey="completions"
                        stackId="2"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.6}
                        name="Conclusões"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Category Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Performance por Categoria
                </CardTitle>
                <CardDescription>
                  Métricas detalhadas por categoria de curso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Categoria
                        </th>
                        <th className="text-center py-3 px-4 font-medium text-gray-900">
                          Cursos
                        </th>
                        <th className="text-center py-3 px-4 font-medium text-gray-900">
                          Alunos
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryPerformanceData.map((category, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">
                            {category.category}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {category.courses}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {category.students}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Course Status Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Status dos Cursos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Ativos</span>
                    </div>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span className="text-sm">Em Desenvolvimento</span>
                    </div>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-sm">Arquivados</span>
                    </div>
                    <span className="font-semibold">3</span>
                  </div>
                </CardContent>
              </Card>

              {/* Course Types */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Modalidades
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Presencial</span>
                    </div>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Online</span>
                    </div>
                    <span className="font-semibold">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">Ao Vivo</span>
                    </div>
                    <span className="font-semibold">3</span>
                  </div>
                </CardContent>
              </Card>

              {/* Materials Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Materiais Didáticos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Documentos</span>
                    </div>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Vídeos</span>
                    </div>
                    <span className="font-semibold">20</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Questionários</span>
                    </div>
                    <span className="font-semibold">1</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Course Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Atualizações Recentes de Cursos
                </CardTitle>
                <CardDescription>
                  Últimas modificações nos cursos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      course: 'Gestão de RH: Processos e Práticas',
                      action: 'Material adicionado',
                      user: 'Ana Silva',
                      time: '2 horas atrás',
                      type: 'material',
                    },
                    {
                      course: 'Auxiliar de Empilhadeira',
                      action: 'Aula atualizada',
                      user: 'Carlos Oliveira',
                      time: '4 horas atrás',
                      type: 'content',
                    },
                    {
                      course: 'Excel Avançado para RH',
                      action: 'Curso publicado',
                      user: 'Maria Santos',
                      time: '1 dia atrás',
                      type: 'status',
                    },
                    {
                      course: 'Liderança e Gestão de Equipes',
                      action: 'Questionário criado',
                      user: 'João Costa',
                      time: '2 dias atrás',
                      type: 'assessment',
                    },
                  ].map((update, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            update.type === 'material'
                              ? 'bg-blue-100 text-blue-600'
                              : update.type === 'content'
                                ? 'bg-green-100 text-green-600'
                                : update.type === 'status'
                                  ? 'bg-purple-100 text-purple-600'
                                  : 'bg-orange-100 text-orange-600'
                          }`}
                        >
                          {update.type === 'material' && (
                            <FileText className="h-4 w-4" />
                          )}
                          {update.type === 'content' && (
                            <Edit className="h-4 w-4" />
                          )}
                          {update.type === 'status' && (
                            <CheckCircle className="h-4 w-4" />
                          )}
                          {update.type === 'assessment' && (
                            <HelpCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{update.course}</p>
                          <p className="text-sm text-gray-600">
                            {update.action} por {update.user}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {update.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Instructors Tab */}
          <TabsContent value="instructors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Instrutores
                </CardTitle>
                <CardDescription>
                  Ranking dos instrutores por performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topInstructors.map((instructor, index) => (
                    <div
                      key={instructor.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold">
                          {index + 1}
                        </div>
                        <Image
                          src={instructor.photo || '/placeholder.svg'}
                          alt={instructor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{instructor.name}</h3>
                          <p className="text-sm text-gray-600">
                            {instructor.courses} cursos • {instructor.students}{' '}
                            alunos
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-semibold">{instructor.rating}</p>
                          <p className="text-gray-600">Avaliação</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">
                            {instructor.completionRate}%
                          </p>
                          <p className="text-gray-600">Conclusão</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructor Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Instrutores Ativos
                      </p>
                      <p className="text-3xl font-bold text-gray-900">12</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Avaliação Média
                      </p>
                      <p className="text-3xl font-bold text-gray-900">4.7</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Taxa de Conclusão
                      </p>
                      <p className="text-3xl font-bold text-gray-900">88.5%</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Atividades Recentes
                  </CardTitle>
                  <CardDescription>Últimas ações na plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        {getActivityIcon(activity.type, activity.color)}
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-gray-600">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Próximos Prazos
                  </CardTitle>
                  <CardDescription>
                    Tarefas e entregas programadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingDeadlines.map((deadline) => (
                      <div
                        key={deadline.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{deadline.title}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(deadline.date).toLocaleDateString(
                              'pt-BR'
                            )}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(deadline.priority)}
                        >
                          {deadline.priority === 'high'
                            ? 'Alta'
                            : deadline.priority === 'medium'
                              ? 'Média'
                              : 'Baixa'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
