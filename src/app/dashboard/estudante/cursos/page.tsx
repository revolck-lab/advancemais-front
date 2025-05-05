'use client'

import { useState } from 'react'
import { Clock, FileText, Filter, Search } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress/progress'
import { Input } from '@/components/ui/input/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CursosPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [semesterFilter, setSemesterFilter] = useState('atual')
  const [statusFilter, setStatusFilter] = useState('todos')

  // Filtragem de cursos
  const filteredCourses = allCourses.filter((course) => {
    // Filtro por semestre
    if (semesterFilter === 'atual' && !course.current) return false
    if (semesterFilter === 'anteriores' && course.current) return false
    if (semesterFilter === 'futuros' && !course.future) return false

    // Filtro por status
    if (statusFilter === 'concluidos' && !course.completed) return false
    if (statusFilter === 'em_andamento' && !course.current) return false
    if (statusFilter === 'pendentes' && !course.future) return false

    // Filtro por busca
    if (
      searchQuery &&
      !course.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    return true
  })

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Cursos</h1>
          <p className="text-muted-foreground">
            Gerencie suas disciplinas e acompanhe seu progresso
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Histórico acadêmico</Button>
          <Button>Solicitar matrícula</Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-auto md:flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar disciplinas..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={semesterFilter} onValueChange={setSemesterFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Semestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os semestres</SelectItem>
                <SelectItem value="atual">Semestre atual</SelectItem>
                <SelectItem value="anteriores">Semestres anteriores</SelectItem>
                <SelectItem value="futuros">Próximo semestre</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="em_andamento">Em andamento</SelectItem>
                <SelectItem value="concluidos">Concluídos</SelectItem>
                <SelectItem value="pendentes">Pendentes</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resumo do semestre atual */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Semestre Atual (2024.1)</CardTitle>
          <CardDescription>
            Visão geral do seu desempenho neste semestre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">Disciplinas matriculadas</p>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                Total de 24 créditos
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Média atual</p>
              <div className="text-2xl font-bold">8.7</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+0.3</span> vs semestre
                anterior
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Progresso do semestre</p>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">50%</div>
                <Progress value={50} className="h-2 flex-1" />
              </div>
              <p className="text-xs text-muted-foreground">
                8 de 16 semanas concluídas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Abas para diferentes visualizações */}
      <Tabs defaultValue="cards" className="space-y-4">
        <TabsList className="bg-white">
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
        </TabsList>

        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="bg-white overflow-hidden">
                <div
                  className="h-3"
                  style={{ backgroundColor: course.color }}
                ></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    {course.current && (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Atual
                      </Badge>
                    )}
                    {course.completed && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Concluído
                      </Badge>
                    )}
                    {course.future && (
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        Próximo
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{course.code}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Professor:</span>
                      <span className="font-medium">{course.professor}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Créditos:</span>
                      <span className="font-medium">{course.credits}</span>
                    </div>
                    {(course.current || course.completed) && (
                      <div className="flex justify-between text-sm">
                        <span>Nota:</span>
                        <span className="font-medium">
                          {course.grade || 'N/A'}
                        </span>
                      </div>
                    )}
                    {course.current && (
                      <div className="space-y-1 pt-2">
                        <div className="flex justify-between text-sm">
                          <span>Progresso:</span>
                          <span className="font-medium">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    {course.current
                      ? 'Ver detalhes'
                      : course.completed
                        ? 'Ver histórico'
                        : 'Ver ementa'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card className="bg-white">
            <CardContent className="p-0">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="py-3 px-4 text-left text-sm font-medium">
                        Disciplina
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium">
                        Código
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium">
                        Professor
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium">
                        Créditos
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium">
                        Nota
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium">
                        Status
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((course) => (
                      <tr key={course.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: course.color }}
                            ></div>
                            <span className="font-medium">{course.title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{course.code}</td>
                        <td className="py-3 px-4 text-sm">
                          {course.professor}
                        </td>
                        <td className="py-3 px-4 text-sm">{course.credits}</td>
                        <td className="py-3 px-4 text-sm">
                          {course.grade || 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          {course.current && (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                              Atual
                            </Badge>
                          )}
                          {course.completed && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              Concluído
                            </Badge>
                          )}
                          {course.future && (
                            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                              Próximo
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            Detalhes
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Calendário de Aulas</CardTitle>
              <CardDescription>
                Visualize sua grade horária semanal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <div className="grid grid-cols-6 border-b">
                  <div className="p-3 text-center font-medium">Horário</div>
                  <div className="p-3 text-center font-medium">Segunda</div>
                  <div className="p-3 text-center font-medium">Terça</div>
                  <div className="p-3 text-center font-medium">Quarta</div>
                  <div className="p-3 text-center font-medium">Quinta</div>
                  <div className="p-3 text-center font-medium">Sexta</div>
                </div>

                {scheduleHours.map((hour, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-6 border-b last:border-0"
                  >
                    <div className="border-r p-3 text-center text-sm font-medium">
                      {hour}
                    </div>
                    {[1, 2, 3, 4, 5].map((day) => {
                      const classInfo = schedule.find(
                        (s) => s.day === day && s.hour === hour
                      )
                      return (
                        <div
                          key={`${day}-${hour}`}
                          className={`p-2 ${classInfo ? 'bg-opacity-10' : ''}`}
                          style={{
                            backgroundColor: classInfo
                              ? classInfo.color + '20'
                              : '',
                          }}
                        >
                          {classInfo && (
                            <div className="rounded p-1 text-xs">
                              <div
                                className="font-medium"
                                style={{ color: classInfo.color }}
                              >
                                {classInfo.course}
                              </div>
                              <div className="text-muted-foreground">
                                {classInfo.room}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Materiais de estudo */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Materiais de Estudo</CardTitle>
            <CardDescription>
              Recursos disponíveis para suas disciplinas
            </CardDescription>
          </div>
          <Button variant="outline">Ver biblioteca completa</Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {studyMaterials.map((material) => (
              <Card key={material.id} className="bg-white">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <FileText
                      className="h-4 w-4"
                      style={{ color: material.courseColor }}
                    />
                    <Badge variant="outline">{material.courseCode}</Badge>
                  </div>
                  <CardTitle className="text-base mt-2">
                    {material.title}
                  </CardTitle>
                  <CardDescription>{material.type}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm line-clamp-2">{material.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    <Clock className="mr-1 h-3 w-3" /> {material.duration}
                  </Button>
                  <Button variant="outline" size="sm">
                    Acessar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Dados de exemplo
const allCourses = [
  {
    id: 1,
    title: 'Programação Web',
    code: 'CC4302',
    professor: 'Dr. Carlos Mendes',
    credits: 4,
    grade: '9.2',
    progress: 65,
    color: '#3b82f6',
    current: true,
    completed: false,
    future: false,
  },
  {
    id: 2,
    title: 'Cálculo III',
    code: 'MAT2103',
    professor: 'Dra. Ana Oliveira',
    credits: 6,
    grade: '8.5',
    progress: 60,
    color: '#10b981',
    current: true,
    completed: false,
    future: false,
  },
  {
    id: 3,
    title: 'Engenharia de Software',
    code: 'CC4210',
    professor: 'Dr. Roberto Santos',
    credits: 4,
    grade: '9.0',
    progress: 70,
    color: '#8b5cf6',
    current: true,
    completed: false,
    future: false,
  },
  {
    id: 4,
    title: 'Física Experimental',
    code: 'FIS2201',
    professor: 'Dr. Paulo Ribeiro',
    credits: 4,
    grade: '7.8',
    progress: 55,
    color: '#f59e0b',
    current: true,
    completed: false,
    future: false,
  },
  {
    id: 5,
    title: 'Estrutura de Dados',
    code: 'CC3301',
    professor: 'Dra. Mariana Costa',
    credits: 4,
    grade: '8.7',
    progress: 62,
    color: '#ec4899',
    current: true,
    completed: false,
    future: false,
  },
  {
    id: 6,
    title: 'Inteligência Artificial',
    code: 'CC5501',
    professor: 'Dr. Fernando Almeida',
    credits: 4,
    grade: '9.5',
    progress: 68,
    color: '#6366f1',
    current: true,
    completed: false,
    future: false,
  },
  {
    id: 7,
    title: 'Algoritmos',
    code: 'CC2201',
    professor: 'Dr. Marcos Silva',
    credits: 4,
    grade: '8.2',
    progress: 100,
    color: '#14b8a6',
    current: false,
    completed: true,
    future: false,
  },
  {
    id: 8,
    title: 'Cálculo II',
    code: 'MAT2102',
    professor: 'Dr. José Pereira',
    credits: 6,
    grade: '7.5',
    progress: 100,
    color: '#f43f5e',
    current: false,
    completed: true,
    future: false,
  },
  {
    id: 9,
    title: 'Banco de Dados',
    code: 'CC4401',
    professor: 'Dra. Lucia Ferreira',
    credits: 4,
    grade: null,
    progress: 0,
    color: '#0ea5e9',
    current: false,
    completed: false,
    future: true,
  },
  {
    id: 10,
    title: 'Redes de Computadores',
    code: 'CC4501',
    professor: 'Dr. André Martins',
    credits: 4,
    grade: null,
    progress: 0,
    color: '#84cc16',
    current: false,
    completed: false,
    future: true,
  },
]

const scheduleHours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00']

const schedule = [
  {
    day: 1, // Segunda
    hour: '08:00',
    course: 'Cálculo III',
    room: 'Sala 201',
    color: '#10b981',
  },
  {
    day: 1, // Segunda
    hour: '10:00',
    course: 'Programação Web',
    room: 'Lab 3',
    color: '#3b82f6',
  },
  {
    day: 2, // Terça
    hour: '14:00',
    course: 'Engenharia de Software',
    room: 'Sala 305',
    color: '#8b5cf6',
  },
  {
    day: 3, // Quarta
    hour: '08:00',
    course: 'Cálculo III',
    room: 'Sala 201',
    color: '#10b981',
  },
  {
    day: 3, // Quarta
    hour: '16:00',
    course: 'Física Experimental',
    room: 'Lab Física',
    color: '#f59e0b',
  },
  {
    day: 4, // Quinta
    hour: '10:00',
    course: 'Programação Web',
    room: 'Lab 3',
    color: '#3b82f6',
  },
  {
    day: 5, // Sexta
    hour: '14:00',
    course: 'Estrutura de Dados',
    room: 'Sala 102',
    color: '#ec4899',
  },
  {
    day: 5, // Sexta
    hour: '16:00',
    course: 'Inteligência Artificial',
    room: 'Lab IA',
    color: '#6366f1',
  },
]

const studyMaterials = [
  {
    id: 1,
    title: 'Introdução ao React',
    courseCode: 'CC4302',
    courseColor: '#3b82f6',
    type: 'Vídeo-aula',
    description:
      'Aprenda os fundamentos do React e como criar componentes reutilizáveis.',
    duration: '45 min',
  },
  {
    id: 2,
    title: 'Derivadas Parciais',
    courseCode: 'MAT2103',
    courseColor: '#10b981',
    type: 'PDF',
    description:
      'Material de estudo sobre derivadas parciais e suas aplicações.',
    duration: '32 páginas',
  },
  {
    id: 3,
    title: 'Metodologias Ágeis',
    courseCode: 'CC4210',
    courseColor: '#8b5cf6',
    type: 'Apresentação',
    description: 'Slides sobre Scrum, Kanban e outras metodologias ágeis.',
    duration: '28 slides',
  },
  {
    id: 4,
    title: 'Experimento de Óptica',
    courseCode: 'FIS2201',
    courseColor: '#f59e0b',
    type: 'Roteiro de Laboratório',
    description: 'Instruções para o experimento de refração da luz.',
    duration: '15 páginas',
  },
  {
    id: 5,
    title: 'Árvores Binárias',
    courseCode: 'CC3301',
    courseColor: '#ec4899',
    type: 'Exercícios',
    description:
      'Lista de exercícios sobre implementação e manipulação de árvores binárias.',
    duration: '10 exercícios',
  },
  {
    id: 6,
    title: 'Redes Neurais',
    courseCode: 'CC5501',
    courseColor: '#6366f1',
    type: 'Artigo',
    description:
      'Artigo científico sobre aplicações de redes neurais em problemas reais.',
    duration: '12 páginas',
  },
]
