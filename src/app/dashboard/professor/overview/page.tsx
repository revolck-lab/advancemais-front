'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Bell,
  Plus,
  Eye,
  BarChart3,
  Activity,
  Award,
  MessageSquare,
  ChevronRight,
  CalendarDays,
  ClipboardList,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar'

export default function ProfessorOverviewPage() {
  const router = useRouter()

  // Dados simulados do professor
  const professorInfo = {
    name: 'Prof. João Silva',
    avatar: '/placeholder.svg?height=60&width=60',
    courses: ['Gestão de RH e DP', 'Direito Trabalhista'],
    totalStudents: 45,
    totalClasses: 28,
    nextClass: {
      title: 'Módulo 3 - Departamento Pessoal',
      time: '19:00',
      duration: '2h',
      room: 'Sala 205',
      studentsExpected: 23,
    },
  }

  // Dados simulados de estatísticas gerais
  const overviewStats = {
    totalStudents: 45,
    activeClasses: 6,
    pendingGrades: 12,
    averageAttendance: 87.5,
    classesToday: 2,
    assignmentsDue: 8,
    averageGrade: 8.2,
    completionRate: 92.3,
  }

  // Dados simulados de alunos com performance
  const studentsPerformance = [
    {
      id: '1',
      name: 'Ana Silva',
      enrollment: '2023001',
      avatar: '/placeholder.svg?height=32&width=32',
      course: 'Gestão de RH e DP',
      average: 9.2,
      attendance: 95,
      status: 'excelente',
      lastActivity: '2 horas atrás',
      trend: 'up',
    },
    {
      id: '2',
      name: 'Bruno Santos',
      enrollment: '2023002',
      avatar: '/placeholder.svg?height=32&width=32',
      course: 'Gestão de RH e DP',
      average: 7.5,
      attendance: 88,
      status: 'bom',
      lastActivity: '1 dia atrás',
      trend: 'stable',
    },
    {
      id: '3',
      name: 'Carla Oliveira',
      enrollment: '2023003',
      avatar: '/placeholder.svg?height=32&width=32',
      course: 'Gestão de RH e DP',
      average: 9.8,
      attendance: 98,
      status: 'excelente',
      lastActivity: '30 min atrás',
      trend: 'up',
    },
    {
      id: '4',
      name: 'Daniel Costa',
      enrollment: '2023004',
      avatar: '/placeholder.svg?height=32&width=32',
      course: 'Gestão de RH e DP',
      average: 5.8,
      attendance: 72,
      status: 'atencao',
      lastActivity: '3 dias atrás',
      trend: 'down',
    },
    {
      id: '5',
      name: 'Elena Ferreira',
      enrollment: '2023005',
      avatar: '/placeholder.svg?height=32&width=32',
      course: 'Gestão de RH e DP',
      average: 8.7,
      attendance: 91,
      status: 'bom',
      lastActivity: '4 horas atrás',
      trend: 'up',
    },
  ]

  // Dados simulados de próximas aulas
  const upcomingClasses = [
    {
      id: '1',
      title: 'Módulo 3 - Departamento Pessoal',
      course: 'Gestão de RH e DP',
      time: '14:00 - 16:00',
      date: 'Hoje',
      room: 'Sala 205',
      students: 23,
      type: 'presencial',
    },
    {
      id: '2',
      title: 'Módulo 2 - CLT Avançada',
      course: 'Direito Trabalhista',
      time: '19:00 - 21:00',
      date: 'Hoje',
      room: 'Sala 301',
      students: 18,
      type: 'presencial',
    },
    {
      id: '3',
      title: 'Módulo 4 - Gestão de Pessoas',
      course: 'Gestão de RH e DP',
      time: '14:00 - 16:00',
      date: 'Amanhã',
      room: 'Sala 205',
      students: 23,
      type: 'presencial',
    },
  ]

  // Dados simulados de tarefas pendentes
  const pendingTasks = [
    {
      id: '1',
      title: 'Corrigir Prova 2 - Legislação Trabalhista',
      type: 'correção',
      priority: 'alta',
      count: 18,
      dueDate: 'Hoje',
      course: 'Direito Trabalhista',
    },
    {
      id: '2',
      title: 'Lançar notas do Projeto Final',
      type: 'notas',
      priority: 'alta',
      count: 12,
      dueDate: 'Amanhã',
      course: 'Gestão de RH e DP',
    },
    {
      id: '3',
      title: 'Avaliar Trabalhos de Casa',
      type: 'avaliação',
      priority: 'média',
      count: 25,
      dueDate: '2 dias',
      course: 'Gestão de RH e DP',
    },
    {
      id: '4',
      title: 'Preparar Material - Módulo 5',
      type: 'preparação',
      priority: 'baixa',
      count: 1,
      dueDate: '1 semana',
      course: 'Gestão de RH e DP',
    },
  ]

  // Dados simulados de atividades recentes
  const recentActivities = [
    {
      id: '1',
      student: 'Ana Silva',
      action: 'entregou trabalho',
      item: 'Análise de Caso - RH',
      time: '30 min atrás',
      type: 'submission',
    },
    {
      id: '2',
      student: 'Bruno Santos',
      action: 'fez pergunta no fórum',
      item: 'Módulo 2 - Dúvidas CLT',
      time: '2 horas atrás',
      type: 'question',
    },
    {
      id: '3',
      student: 'Carla Oliveira',
      action: 'completou exercício',
      item: 'Exercícios - Departamento Pessoal',
      time: '3 horas atrás',
      type: 'completion',
    },
    {
      id: '4',
      student: 'Elena Ferreira',
      action: 'acessou material',
      item: 'Aula 15 - Folha de Pagamento',
      time: '4 horas atrás',
      type: 'access',
    },
    {
      id: '5',
      student: 'Daniel Costa',
      action: 'faltou na aula',
      item: 'Módulo 3 - Aula 12',
      time: '1 dia atrás',
      type: 'absence',
    },
  ]

  // Funções auxiliares
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excelente':
        return 'bg-green-100 text-green-800'
      case 'bom':
        return 'bg-blue-100 text-blue-800'
      case 'atencao':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta':
        return 'bg-red-100 text-red-800'
      case 'média':
        return 'bg-yellow-100 text-yellow-800'
      case 'baixa':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-600" />
      default:
        return <Activity className="h-3 w-3 text-blue-600" />
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return <FileText className="h-4 w-4 text-green-600" />
      case 'question':
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case 'completion':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'access':
        return <Eye className="h-4 w-4 text-blue-600" />
      case 'absence':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Cabeçalho de Boas-vindas */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={professorInfo.avatar}
                alt={professorInfo.name}
              />
              <AvatarFallback className="bg-blue-100 text-blue-800 text-lg">
                {professorInfo.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">
                Bem-vindo, {professorInfo.name}!
              </h1>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notificações
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Aula
            </Button>
          </div>
        </div>

        {/* Cards de Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">
                Total de Alunos
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {overviewStats.totalStudents}
              </div>
              <p className="text-xs text-blue-700">
                em {overviewStats.activeClasses} turmas ativas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">
                Média Geral
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {overviewStats.averageGrade}
              </div>
              <p className="text-xs text-green-700">
                +0.3 em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-800">
                Tarefas Pendentes
              </CardTitle>
              <ClipboardList className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-900">
                {overviewStats.pendingGrades}
              </div>
              <p className="text-xs text-yellow-700">correções e avaliações</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">
                Frequência Média
              </CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
                {overviewStats.averageAttendance}%
              </div>
              <p className="text-xs text-purple-700">presença nas aulas</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Próxima Aula */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Próxima Aula
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {professorInfo.nextClass.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Gestão de RH e DP
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Horário:</span>
                    <p className="font-medium">
                      {professorInfo.nextClass.time}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duração:</span>
                    <p className="font-medium">
                      {professorInfo.nextClass.duration}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Local:</span>
                    <p className="font-medium">
                      {professorInfo.nextClass.room}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Alunos:</span>
                    <p className="font-medium">
                      {professorInfo.nextClass.studentsExpected}
                    </p>
                  </div>
                </div>
                <Button className="w-full">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Iniciar Aula
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tarefas Urgentes */}
          <Card className="bg-white lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Tarefas Urgentes
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/dashboard/professor/tarefas')}
              >
                Ver Todas
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {task.course}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={getPriorityColor(task.priority)}
                      >
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {task.dueDate}
                      </span>
                      {task.count > 1 && (
                        <Badge variant="secondary">{task.count}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance dos Alunos */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Performance dos Alunos
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/dashboard/professor/notas')}
              >
                Ver Notas
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentsPerformance.slice(0, 4).map((student) => (
                  <div key={student.id} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>
                        {student.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{student.name}</h4>
                        {getTrendIcon(student.trend)}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Média: {student.average}</span>
                        <span>Frequência: {student.attendance}%</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={getStatusColor(student.status)}
                    >
                      {student.status}
                    </Badge>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push('/dashboard/professor/alunos')}
                >
                  Ver Todos os Alunos
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Próximas Aulas */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Próximas Aulas
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/dashboard/professor/cronograma')}
              >
                Ver Cronograma
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{classItem.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {classItem.course}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span>{classItem.time}</span>
                        <span>•</span>
                        <span>{classItem.room}</span>
                        <span>•</span>
                        <span>{classItem.students} alunos</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          classItem.date === 'Hoje' ? 'default' : 'secondary'
                        }
                      >
                        {classItem.date}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Atividades Recentes */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Atividades Recentes
            </CardTitle>
            <Button variant="outline" size="sm">
              Ver Histórico
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-2">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.student}</span>{' '}
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>{' '}
                      <span className="font-medium">{activity.item}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Button
            variant="outline"
            className="h-20 flex-col gap-2"
            onClick={() => router.push('/dashboard/professor/alunos')}
          >
            <Users className="h-6 w-6" />
            <span className="text-sm">Gerenciar Alunos</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2"
            onClick={() => router.push('/dashboard/professor/notas')}
          >
            <BarChart3 className="h-6 w-6" />
            <span className="text-sm">Ver Notas</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2"
            onClick={() => router.push('/dashboard/professor/materiais')}
          >
            <BookOpen className="h-6 w-6" />
            <span className="text-sm">Materiais</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2"
            onClick={() => router.push('/dashboard/professor/relatorios')}
          >
            <FileText className="h-6 w-6" />
            <span className="text-sm">Relatórios</span>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
