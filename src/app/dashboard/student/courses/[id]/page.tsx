'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Clock,
  Download,
  BookOpen,
  CheckCircle,
  PlayCircle,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Progress } from '@/components/ui/progress/progress'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'
import { Badge } from '@/components/ui/badge/badge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar'

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id
  const [, setActiveTab] = useState('content')

  // Dados de exemplo do curso
  const course = {
    id: courseId,
    title: 'Dominando UI/UX Design: Um Guia para Iniciantes',
    description:
      'Aprenda os fundamentos do design UI/UX e crie interfaces impressionantes que proporcionam experiências excepcionais.',
    progress: 25,
    totalMaterials: 12,
    completedMaterials: 3,
    instructor: {
      name: 'Leonardo Samsul',
      role: 'Designer UI/UX Sênior',
      avatar: '/placeholder.svg',
    },
    deadline: '1 Dia',
    modules: [
      {
        id: 1,
        title: 'Introdução ao Design UI/UX',
        completed: true,
        materials: [
          {
            id: 1,
            title: 'O que é Design UI/UX?',
            type: 'video',
            duration: '10:25',
            completed: true,
          },
          {
            id: 2,
            title: 'O Processo de Design',
            type: 'document',
            duration: '15 min de leitura',
            completed: true,
          },
          {
            id: 3,
            title: 'Ferramentas do Mercado',
            type: 'video',
            duration: '15:40',
            completed: true,
          },
        ],
      },
      {
        id: 2,
        title: 'Fundamentos da Pesquisa de Usuário',
        completed: false,
        materials: [
          {
            id: 4,
            title: 'Compreendendo as Necessidades do Usuário',
            type: 'video',
            duration: '12:15',
            completed: false,
          },
          {
            id: 5,
            title: 'Personas de Usuário',
            type: 'document',
            duration: '20 min de leitura',
            completed: false,
          },
          {
            id: 6,
            title: 'Mapeamento da Jornada do Usuário',
            type: 'exercise',
            duration: '45 min',
            completed: false,
          },
        ],
      },
      {
        id: 3,
        title: 'Wireframing e Prototipagem',
        completed: false,
        materials: [
          {
            id: 7,
            title: 'Criando Wireframes',
            type: 'video',
            duration: '18:30',
            completed: false,
          },
          {
            id: 8,
            title: 'Noções Básicas de Prototipagem',
            type: 'video',
            duration: '22:10',
            completed: false,
          },
          {
            id: 9,
            title: 'Testes com Usuários',
            type: 'document',
            duration: '15 min de leitura',
            completed: false,
          },
        ],
      },
      {
        id: 4,
        title: 'Princípios do Design Visual',
        completed: false,
        materials: [
          {
            id: 10,
            title: 'Teoria das Cores',
            type: 'video',
            duration: '14:20',
            completed: false,
          },
          {
            id: 11,
            title: 'Tipografia',
            type: 'video',
            duration: '16:45',
            completed: false,
          },
          {
            id: 12,
            title: 'Projeto Final',
            type: 'exercise',
            duration: '2 horas',
            completed: false,
          },
        ],
      },
    ],
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6">
        <Link
          href="/dashboard/courses"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para cursos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
            <p className="text-muted-foreground mb-4">{course.description}</p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                  />
                  <AvatarFallback>LS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">
                    {course.instructor.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {course.instructor.role}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <BookOpen className="mr-1 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {course.totalMaterials} materiais
                </span>
              </div>

              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Prazo: {course.deadline}</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <div className="text-sm font-medium">Progresso do curso</div>
                <div className="text-sm font-medium">{course.progress}%</div>
              </div>
              <Progress value={course.progress} className="h-2" />
              <div className="text-xs text-muted-foreground mt-2">
                {course.completedMaterials} de {course.totalMaterials} materiais
                concluídos
              </div>
            </div>

            <Tabs
              defaultValue="content"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Conteúdo do Curso</TabsTrigger>
                <TabsTrigger value="resources">Recursos</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-4">
                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <Card
                      key={module.id}
                      className={
                        module.completed ? 'border-green-200 bg-green-50' : ''
                      }
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          {module.completed && (
                            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                          )}
                          {module.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {module.materials.map((material) => (
                            <div
                              key={material.id}
                              className={`flex items-center justify-between p-2 rounded-md ${
                                material.completed
                                  ? 'bg-green-100'
                                  : 'hover:bg-slate-100'
                              }`}
                            >
                              <div className="flex items-center">
                                {material.type === 'video' && (
                                  <PlayCircle className="mr-2 h-4 w-4 text-blue-500" />
                                )}
                                {material.type === 'document' && (
                                  <BookOpen className="mr-2 h-4 w-4 text-amber-500" />
                                )}
                                {material.type === 'exercise' && (
                                  <Download className="mr-2 h-4 w-4 text-purple-500" />
                                )}
                                <div>
                                  <div className="text-sm font-medium">
                                    {material.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {material.duration}
                                  </div>
                                </div>
                              </div>
                              <div>
                                {material.completed ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-100 text-green-800 border-0"
                                  >
                                    Concluído
                                  </Badge>
                                ) : (
                                  <Button size="sm" variant="outline">
                                    {material.type === 'video'
                                      ? 'Assistir'
                                      : 'Acessar'}
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-2 rounded-md hover:bg-slate-100">
                        <div className="flex items-center">
                          <Download className="mr-2 h-4 w-4 text-blue-500" />
                          <div className="text-sm font-medium">
                            Guia de Estudo UI/UX
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-md hover:bg-slate-100">
                        <div className="flex items-center">
                          <Download className="mr-2 h-4 w-4 text-blue-500" />
                          <div className="text-sm font-medium">
                            Templates de Wireframe
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-md hover:bg-slate-100">
                        <div className="flex items-center">
                          <Download className="mr-2 h-4 w-4 text-blue-500" />
                          <div className="text-sm font-medium">
                            Paleta de Cores UI
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seu progresso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full transform -rotate-90"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e6e6e6"
                        strokeWidth="10"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="10"
                        strokeDasharray="282.7"
                        strokeDashoffset={
                          282.7 - (282.7 * course.progress) / 100
                        }
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl font-bold">
                        {course.progress}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Materiais concluídos</div>
                    <div className="font-medium">
                      {course.completedMaterials}/{course.totalMaterials}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">Tempo estimado restante</div>
                    <div className="font-medium">3h 45min</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">Prazo</div>
                    <div className="font-medium text-red-500">
                      {course.deadline}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full">Continuar Aprendendo</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Próximas atividades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="min-w-8 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <PlayCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        Understanding User Needs
                      </div>
                      <div className="text-xs text-muted-foreground">
                        12:15 min
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="min-w-8 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">User Personas</div>
                      <div className="text-xs text-muted-foreground">
                        20 min read
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="min-w-8 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Download className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        User Journey Mapping
                      </div>
                      <div className="text-xs text-muted-foreground">
                        45 min exercise
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
