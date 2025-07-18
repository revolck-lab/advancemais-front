'use client'

import type React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Badge } from '@/components/ui/badge/badge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion/accordion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table'
import {
  ArrowLeft,
  Users,
  BookOpen,
  Clock,
  Video,
  Play,
  FileText,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Star,
  Building2,
  Timer,
  Edit,
  Save,
  Eye,
} from 'lucide-react'
import { useState } from 'react'

// Tipos
type CourseType = 'live' | 'online' | 'presencial'

type Lesson = {
  id: string
  name: string
  type: 'aula' | 'prova' | 'trabalho' | 'estagio'
  duration: string
  status: 'concluida' | 'pendente' | 'em_andamento'
  date?: string
  time?: string
  room?: string
  meetLink?: string
  description?: string
}

type Module = {
  id: string
  name: string
  description: string
  lessons: Lesson[]
  status: 'concluido' | 'em_andamento' | 'pendente'
}

type Student = {
  id: string
  name: string
  email: string
  avatar: string
  enrollmentDate: string
  status: 'ativo' | 'inativo'
  grades: {
    [moduleId: string]: {
      [lessonId: string]: number
    }
  }
}

type Course = {
  id: string
  name: string
  type: CourseType
  coordinator: string
  coordinatorAvatar: string
  totalStudents: number
  startDate: string
  endDate: string
  description: string
  objectives: string[]
  modules: Module[]
  students: Student[]
  schedule?: {
    days: string[]
    time: string
    room?: string
  }
}

// Dados de exemplo
const courseData: Course = {
  id: 'A12345',
  name: 'Portaria Remota CFTV - Turma Matutino',
  type: 'presencial',
  coordinator: 'Patrícia Gomes',
  coordinatorAvatar: '/placeholder.svg?height=40&width=40',
  totalStudents: 25,
  startDate: '2024-07-01',
  endDate: '2024-12-15',
  description:
    'Curso completo de Portaria Remota e CFTV com foco em segurança predial e monitoramento eletrônico.',
  objectives: [
    'Dominar técnicas de monitoramento por CFTV',
    'Aprender protocolos de segurança predial',
    'Desenvolver habilidades de atendimento ao público',
    'Conhecer legislação de segurança privada',
  ],
  schedule: {
    days: ['Segunda', 'Quarta', 'Sexta'],
    time: '08:00 - 12:00',
    room: 'Sala 101 - Bloco A',
  },
  modules: [
    {
      id: 'mod1',
      name: 'Módulo 1 - Fundamentos de Segurança',
      description: 'Introdução aos conceitos básicos de segurança predial',
      status: 'concluido',
      lessons: [
        {
          id: 'aula1',
          name: 'Introdução à Segurança Predial',
          type: 'aula',
          duration: '2h',
          status: 'concluida',
          date: '2024-07-01',
          time: '08:00',
          room: 'Sala 101',
          description: 'Conceitos básicos e importância da segurança predial',
        },
        {
          id: 'aula2',
          name: 'Legislação e Normas',
          type: 'aula',
          duration: '2h',
          status: 'concluida',
          date: '2024-07-03',
          time: '08:00',
          room: 'Sala 101',
          description: 'Leis e regulamentações do setor de segurança',
        },
        {
          id: 'aula3',
          name: 'Equipamentos de Segurança',
          type: 'aula',
          duration: '2h',
          status: 'concluida',
          date: '2024-07-05',
          time: '08:00',
          room: 'Sala 101',
          description: 'Tipos e funcionamento de equipamentos de segurança',
        },
        {
          id: 'prova1',
          name: 'Prova - Fundamentos',
          type: 'prova',
          duration: '1h',
          status: 'concluida',
          date: '2024-07-08',
          time: '08:00',
          room: 'Sala 101',
          description: 'Avaliação dos conhecimentos do módulo 1',
        },
      ],
    },
    {
      id: 'mod2',
      name: 'Módulo 2 - Sistemas de CFTV',
      description:
        'Operação e monitoramento de sistemas de circuito fechado de TV',
      status: 'em_andamento',
      lessons: [
        {
          id: 'aula4',
          name: 'Introdução ao CFTV',
          type: 'aula',
          duration: '2h',
          status: 'concluida',
          date: '2024-07-10',
          time: '08:00',
          room: 'Sala 101',
          description: 'História e evolução dos sistemas de CFTV',
        },
        {
          id: 'aula5',
          name: 'Tipos de Câmeras',
          type: 'aula',
          duration: '2h',
          status: 'concluida',
          date: '2024-07-12',
          time: '08:00',
          room: 'Sala 101',
          description: 'Câmeras analógicas, IP, PTZ e suas aplicações',
        },
        {
          id: 'aula6',
          name: 'Central de Monitoramento',
          type: 'aula',
          duration: '2h',
          status: 'em_andamento',
          date: '2024-07-15',
          time: '08:00',
          room: 'Sala 101',
          description: 'Operação da central e análise de imagens',
        },
        {
          id: 'trabalho1',
          name: 'Trabalho - Projeto de CFTV',
          type: 'trabalho',
          duration: '1 semana',
          status: 'pendente',
          date: '2024-07-17',
          description: 'Desenvolver projeto básico de sistema de CFTV',
        },
        {
          id: 'prova2',
          name: 'Prova - CFTV',
          type: 'prova',
          duration: '1h',
          status: 'pendente',
          date: '2024-07-19',
          time: '08:00',
          room: 'Sala 101',
          description: 'Avaliação sobre sistemas de CFTV',
        },
      ],
    },
    {
      id: 'mod3',
      name: 'Módulo 3 - Atendimento e Comunicação',
      description: 'Técnicas de atendimento ao público e comunicação eficaz',
      status: 'pendente',
      lessons: [
        {
          id: 'aula7',
          name: 'Técnicas de Atendimento',
          type: 'aula',
          duration: '2h',
          status: 'pendente',
          date: '2024-07-22',
          time: '08:00',
          room: 'Sala 101',
          description: 'Como receber e orientar visitantes',
        },
        {
          id: 'aula8',
          name: 'Comunicação Empresarial',
          type: 'aula',
          duration: '2h',
          status: 'pendente',
          date: '2024-07-24',
          time: '08:00',
          room: 'Sala 101',
          description: 'Comunicação interna e externa',
        },
        {
          id: 'estagio1',
          name: 'Estágio Supervisionado',
          type: 'estagio',
          duration: '40h',
          status: 'pendente',
          date: '2024-07-26',
          description: 'Prática supervisionada em empresa conveniada',
        },
        {
          id: 'prova3',
          name: 'Prova Final',
          type: 'prova',
          duration: '2h',
          status: 'pendente',
          date: '2024-07-29',
          time: '08:00',
          room: 'Sala 101',
          description: 'Avaliação final do curso',
        },
      ],
    },
  ],
  students: [
    {
      id: 'std1',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      avatar: '/placeholder.svg?height=32&width=32',
      enrollmentDate: '2024-06-15',
      status: 'ativo',
      grades: {
        mod1: { prova1: 8.5 },
        mod2: { prova2: 0 },
      },
    },
    {
      id: 'std2',
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      avatar: '/placeholder.svg?height=32&width=32',
      enrollmentDate: '2024-06-15',
      status: 'ativo',
      grades: {
        mod1: { prova1: 9.2 },
        mod2: { prova2: 0 },
      },
    },
    {
      id: 'std3',
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      avatar: '/placeholder.svg?height=32&width=32',
      enrollmentDate: '2024-06-16',
      status: 'ativo',
      grades: {
        mod1: { prova1: 7.8 },
        mod2: { prova2: 0 },
      },
    },
  ],
}

export default function CourseViewPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [editingGrade, setEditingGrade] = useState('')
  const [, setSelectedStudent] = useState<Student | null>(null)
  const [grades, setGrades] = useState<{ [key: string]: number }>(() => {
    // Inicializar com as notas existentes
    const initialGrades: { [key: string]: number } = {}
    courseData.students.forEach((student) => {
      initialGrades[student.id] = student.grades.mod1?.prova1 || 0
    })
    return initialGrades
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'concluido':
      case 'concluida':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Concluído
          </Badge>
        )
      case 'em_andamento':
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Timer className="h-3 w-3 mr-1" />
            Em Andamento
          </Badge>
        )
      case 'pendente':
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        )
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'aula':
        return <BookOpen className="h-4 w-4" />
      case 'prova':
        return <FileText className="h-4 w-4" />
      case 'trabalho':
        return <Star className="h-4 w-4" />
      case 'estagio':
        return <GraduationCap className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getCourseTypeInfo = () => {
    switch (courseData.type) {
      case 'live':
        return {
          icon: <Video className="h-5 w-5" />,
          label: 'Aulas ao Vivo',
          color: 'text-red-600 bg-red-50',
        }
      case 'online':
        return {
          icon: <Play className="h-5 w-5" />,
          label: 'Aulas Gravadas',
          color: 'text-blue-600 bg-blue-50',
        }
      case 'presencial':
        return {
          icon: <Building2 className="h-5 w-5" />,
          label: 'Presencial',
          color: 'text-green-600 bg-green-50',
        }
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/courses/courses">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold mb-0">{courseData.name}</h1>
          <p className="text-muted-foreground">
            Visualização detalhada do curso
          </p>
        </div>
      </div>

      {/* Cards de Informações Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tipo do Curso</CardTitle>
            <div className={`p-2 rounded-full ${getCourseTypeInfo().color}`}>
              {getCourseTypeInfo().icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getCourseTypeInfo().label}
            </div>
            {courseData.type === 'presencial' && courseData.schedule && (
              <p className="text-xs text-muted-foreground mt-1">
                {courseData.schedule.days.join(', ')} -{' '}
                {courseData.schedule.time}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Alunos Matriculados
            </CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseData.totalStudents}</div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Módulos</CardTitle>
            <BookOpen className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courseData.modules.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Coordenador</CardTitle>
            <GraduationCap className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={courseData.coordinatorAvatar} />
                <AvatarFallback>
                  {courseData.coordinator.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">
                  {courseData.coordinator}
                </div>
                <div className="text-xs text-muted-foreground">Responsável</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs principais */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-white">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="modules">Módulos e Aulas</TabsTrigger>
          <TabsTrigger value="students">Alunos e Notas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Informações do Curso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">Data de Início</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(courseData.startDate).toLocaleDateString(
                        'pt-BR'
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Data de Término</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(courseData.endDate).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>

                {courseData.type === 'presencial' && courseData.schedule && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Local das Aulas</div>
                        <div className="text-sm text-muted-foreground">
                          {courseData.schedule.room}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Dias da Semana</div>
                        <div className="text-sm text-muted-foreground">
                          {courseData.schedule.days.join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Horário das Aulas</div>
                        <div className="text-sm text-muted-foreground">
                          {courseData.schedule.time}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Estrutura do Curso</CardTitle>
              <p className="text-sm text-muted-foreground">
                Organização dos módulos, aulas, provas, trabalhos e estágios
              </p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {courseData.modules.map((module) => (
                  <AccordionItem key={module.id} value={module.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5" />
                          <div className="text-left">
                            <div className="font-medium">{module.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {module.description}
                            </div>
                          </div>
                        </div>
                        {getStatusBadge(module.status)}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-4">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              {getTypeIcon(lesson.type)}
                              <div>
                                <div className="font-medium">{lesson.name}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-4">
                                  <span>Duração: {lesson.duration}</span>
                                  {lesson.date && (
                                    <span>
                                      Data:{' '}
                                      {new Date(lesson.date).toLocaleDateString(
                                        'pt-BR'
                                      )}
                                    </span>
                                  )}
                                  {lesson.time && (
                                    <span>Horário: {lesson.time}</span>
                                  )}
                                  {lesson.room &&
                                    courseData.type === 'presencial' && (
                                      <span>Sala: {lesson.room}</span>
                                    )}
                                </div>
                                {lesson.description && (
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {lesson.description}
                                  </div>
                                )}
                              </div>
                            </div>
                            {getStatusBadge(lesson.status)}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Alunos e Notas</CardTitle>
              <p className="text-sm text-muted-foreground">
                Visualize os alunos matriculados e gerencie suas notas
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>Nota</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courseData.students.map((student) => {
                    const currentGrade = grades[student.id] || 0

                    return (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>
                                {student.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {student.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(
                              student.enrollmentDate
                            ).toLocaleDateString('pt-BR')}
                          </div>
                        </TableCell>
                        <TableCell>
                          {currentGrade > 0 ? (
                            <Badge
                              className={`${currentGrade >= 7 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                            >
                              {currentGrade.toFixed(1)}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">
                              Sem nota
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Link
                              href={`/dashboard/professor/alunos/${student.id}`}
                            >
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3 mr-1" />
                                Ver Perfil
                              </Button>
                            </Link>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedStudent(student)
                                    setEditingGrade(currentGrade.toString())
                                  }}
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  {currentGrade > 0
                                    ? 'Editar Nota'
                                    : 'Adicionar Nota'}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-white">
                                <DialogHeader>
                                  <DialogTitle>
                                    {currentGrade > 0
                                      ? 'Editar Nota'
                                      : 'Adicionar Nota'}{' '}
                                    - {student.name}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                      Nota (0-10)
                                    </label>
                                    <Input
                                      type="number"
                                      min="0"
                                      max="10"
                                      step="0.1"
                                      value={editingGrade}
                                      onChange={(e) =>
                                        setEditingGrade(e.target.value)
                                      }
                                      placeholder="Digite a nota"
                                    />
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Esta nota pode ser de provas, trabalhos ou
                                    outras atividades avaliativas.
                                  </div>
                                </div>
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedStudent(null)
                                      setEditingGrade('')
                                    }}
                                  >
                                    Cancelar
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      const newGrade =
                                        parseFloat(editingGrade) || 0
                                      setGrades((prev) => ({
                                        ...prev,
                                        [student.id]: newGrade,
                                      }))
                                      setSelectedStudent(null)
                                      setEditingGrade('')
                                    }}
                                  >
                                    <Save className="h-3 w-3 mr-1" />
                                    Salvar Nota
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
