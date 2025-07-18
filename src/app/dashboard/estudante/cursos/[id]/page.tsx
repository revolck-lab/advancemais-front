'use client'

import {
  ArrowLeft,
  Play,
  Clock,
  Calendar,
  MapPin,
  BookOpen,
  FileText,
  Award,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useParams } from 'next/navigation'

/* -------------------------------------------------
 * 1. Tipos discriminados
 * -------------------------------------------------*/
type BaseLesson = {
  id: number
  title: string
  date: string
  type: 'video' | 'quiz'
  completed: boolean
}

type OnlineVideoLesson = BaseLesson & {
  type: 'video'
  duration: string
  youtubeId: string
}

type OnlineQuizLesson = BaseLesson & {
  type: 'quiz'
  duration: string
}

type PresencialLesson = BaseLesson & {
  time: string
}

type Lesson = OnlineVideoLesson | OnlineQuizLesson | PresencialLesson

type Module = {
  id: number
  title: string
  startDate: string
  endDate: string
  lessons: Lesson[]
}

type Quiz = {
  id: number
  title: string
  questions: number
  timeLimit: string
  attempts: number
  maxAttempts: number
}

type BaseCourse = {
  title: string
  type: 'online' | 'presencial'
  description: string
  startDate: string
  endDate: string
  duration: string
  modules: Module[]
}

type OnlineCourse = BaseCourse & {
  type: 'online'
  quizzes: Quiz[]
}

type PresencialCourse = BaseCourse & {
  type: 'presencial'
  location: string
}

type Course = OnlineCourse | PresencialCourse

/* -------------------------------------------------
 * 2. Dados mockados tipados
 * -------------------------------------------------*/
const coursesData: Record<number, Course> = {
  1: {
    title: 'Auxiliar de Farmácia',
    type: 'online',
    description:
      'Curso completo para formação profissional em auxiliar de farmácia',
    startDate: '4 de Junho de 2025',
    endDate: '26 de Junho de 2025',
    duration: '30h',
    modules: [
      {
        id: 1,
        title: 'Módulo 1: Fundamentos da Farmácia',
        startDate: '4 de Junho',
        endDate: '18 de Junho',
        lessons: [
          {
            id: 1,
            title: 'Introdução à Farmacologia Básica',
            date: 'Qua, 4 Jun',
            duration: '2h',
            type: 'video',
            completed: false,
            youtubeId: 'dQw4w9WgXcQ',
          },
          {
            id: 2,
            title: 'Anatomia e Fisiologia Aplicada',
            date: 'Sex, 6 Jun',
            duration: '2h',
            type: 'video',
            completed: false,
            youtubeId: 'dQw4w9WgXcQ',
          },
          {
            id: 3,
            title: 'Legislação Farmacêutica',
            date: 'Seg, 9 Jun',
            duration: '1h 30min',
            type: 'video',
            completed: false,
            youtubeId: 'dQw4w9WgXcQ',
          },
          {
            id: 4,
            title: 'Ética Profissional',
            date: 'Qua, 11 Jun',
            duration: '1h 30min',
            type: 'video',
            completed: false,
            youtubeId: 'dQw4w9WgXcQ',
          },
          {
            id: 5,
            title: 'Avaliação do Módulo 1',
            date: 'Sex, 13 Jun',
            duration: '1h',
            type: 'quiz',
            completed: false,
          },
        ],
      },
      {
        id: 2,
        title: 'Módulo 2: Prática e Atendimento',
        startDate: '16 de Junho',
        endDate: '26 de Junho',
        lessons: [
          {
            id: 6,
            title: 'Dispensação de Medicamentos',
            date: 'Seg, 16 Jun',
            duration: '2h',
            type: 'video',
            completed: false,
            youtubeId: 'dQw4w9WgXcQ',
          },
          {
            id: 7,
            title: 'Atendimento ao Cliente',
            date: 'Qua, 18 Jun',
            duration: '1h 30min',
            type: 'video',
            completed: false,
            youtubeId: 'dQw4w9WgXcQ',
          },
          {
            id: 8,
            title: 'Controle de Estoque',
            date: 'Sex, 20 Jun',
            duration: '2h',
            type: 'video',
            completed: false,
            youtubeId: 'dQw4w9WgXcQ',
          },
          {
            id: 9,
            title: 'Casos Práticos',
            date: 'Seg, 23 Jun',
            duration: '2h',
            type: 'video',
            completed: false,
            youtubeId: 'dQw4w9WgXcQ',
          },
          {
            id: 10,
            title: 'Avaliação Final',
            date: 'Qua, 25 Jun',
            duration: '1h 30min',
            type: 'quiz',
            completed: false,
          },
        ],
      },
    ],
    quizzes: [
      {
        id: 1,
        title: 'Avaliação Módulo 1 - Fundamentos',
        questions: 15,
        timeLimit: '60 minutos',
        attempts: 0,
        maxAttempts: 3,
      },
      {
        id: 2,
        title: 'Avaliação Final - Auxiliar de Farmácia',
        questions: 25,
        timeLimit: '90 minutos',
        attempts: 0,
        maxAttempts: 2,
      },
    ],
  },

  2: {
    title: 'Auxiliar Administrativo',
    type: 'presencial',
    description: 'Formação completa em rotinas administrativas',
    startDate: '7 de Julho de 2025',
    endDate: '28 de Julho de 2025',
    duration: '40h',
    location:
      'Av. Juca Sampaio, 2247 - Sala 30 - Feitosa, Maceió - AL, 57040-600',
    modules: [
      {
        id: 1,
        title: 'Módulo 1: Fundamentos Administrativos',
        startDate: '7 de Julho',
        endDate: '14 de Julho',
        lessons: [
          {
            id: 1,
            title: 'Introdução à Administração',
            date: 'Seg, 7 Jul',
            time: '14:00 - 17:00',
            type: 'video',
            completed: false,
          },
          {
            id: 2,
            title: 'Organização e Métodos',
            date: 'Qua, 9 Jul',
            time: '14:00 - 17:00',
            type: 'video',
            completed: false,
          },
          {
            id: 3,
            title: 'Comunicação Empresarial',
            date: 'Sex, 11 Jul',
            time: '14:00 - 17:00',
            type: 'video',
            completed: false,
          },
          {
            id: 4,
            title: 'Ética Profissional',
            date: 'Seg, 14 Jul',
            time: '14:00 - 17:00',
            type: 'video',
            completed: false,
          },
          {
            id: 5,
            title: 'Avaliação Módulo 1',
            date: 'Qua, 16 Jul',
            time: '14:00 - 15:30',
            type: 'quiz',
            completed: false,
          },
        ],
      },
      {
        id: 2,
        title: 'Módulo 2: Rotinas Administrativas',
        startDate: '16 de Julho',
        endDate: '23 de Julho',
        lessons: [
          {
            id: 6,
            title: 'Gestão de Documentos',
            date: 'Sex, 18 Jul',
            time: '14:00 - 17:00',
            type: 'video',
            completed: false,
          },
          {
            id: 7,
            title: 'Atendimento ao Cliente',
            date: 'Seg, 21 Jul',
            time: '14:00 - 17:00',
            type: 'video',
            completed: false,
          },
          {
            id: 8,
            title: 'Controle Financeiro Básico',
            date: 'Qua, 23 Jul',
            time: '14:00 - 17:00',
            type: 'video',
            completed: false,
          },
          {
            id: 9,
            title: 'Ferramentas de Escritório',
            date: 'Sex, 25 Jul',
            time: '14:00 - 17:00',
            type: 'video',
            completed: false,
          },
          {
            id: 10,
            title: 'Avaliação Final',
            date: 'Seg, 28 Jul',
            time: '14:00 - 16:00',
            type: 'quiz',
            completed: false,
          },
        ],
      },
    ],
  },
}

/* -------------------------------------------------
 * 3. Componente
 * -------------------------------------------------*/
export default function CursoDetalhePage() {
  const params = useParams()
  const courseId = Number.parseInt(params.id as string)
  const course = coursesData[courseId]

  if (!course) return <div>Curso não encontrado</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/estudante/cursos">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar aos Cursos
            </Button>
          </Link>
        </div>

        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            <Badge
              className={
                course.type === 'online' ? 'bg-blue-500' : 'bg-green-500'
              }
            >
              {course.type === 'online' ? 'ONLINE' : 'PRESENCIAL'}
            </Badge>
          </div>

          <p className="text-lg text-gray-600 mb-4">{course.description}</p>

          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {course.startDate} - {course.endDate}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {course.duration}
            </span>
            {course.type === 'presencial' && (
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {course.location}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Modules List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Módulos do Curso</h2>

            {course.modules.map((module) => (
              <Card
                key={module.id}
                className="overflow-hidden shadow-lg border-0 bg-white"
              >
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {module.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {module.startDate} - {module.endDate}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="p-6 hover:bg-gray-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          {/* Ícone */}
                          <div className="flex-shrink-0">
                            {lesson.type === 'video' ? (
                              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                                <Play className="w-4 h-4 text-red-600" />
                              </div>
                            ) : lesson.type === 'quiz' ? (
                              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                                <FileText className="w-4 h-4 text-purple-600" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <BookOpen className="w-4 h-4 text-blue-600" />
                              </div>
                            )}
                          </div>

                          {/* Título + infos */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {lesson.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {lesson.date}
                              </span>

                              {course.type === 'online'
                                ? 'duration' in lesson && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {lesson.duration}
                                    </span>
                                  )
                                : 'time' in lesson && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {lesson.time}
                                    </span>
                                  )}
                            </div>
                          </div>

                          {/* Ação */}
                          <div className="flex-shrink-0">
                            {course.type === 'online' ? (
                              <Link
                                href={`/dashboard/estudante/cursos/${courseId}/aula/${lesson.id}`}
                              >
                                <Button
                                  size="sm"
                                  disabled={!lesson.completed && lesson.id > 1}
                                >
                                  {lesson.type === 'video' ? (
                                    <>
                                      <Play className="w-4 h-4 mr-2" />
                                      Assistir
                                    </>
                                  ) : (
                                    <>
                                      <FileText className="w-4 h-4 mr-2" />
                                      Fazer Avaliação
                                    </>
                                  )}
                                </Button>
                              </Link>
                            ) : (
                              <div className="text-sm text-gray-500 text-right">
                                <p className="font-medium">Aula Presencial</p>
                                <p>Sala 30</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progresso */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle>Progresso do Curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">0%</div>
                  <p className="text-sm text-gray-600">Concluído</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Aulas assistidas</span>
                    <span>
                      0/
                      {course.modules.reduce(
                        (acc, mod) => acc + mod.lessons.length,
                        0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Módulos</span>
                    <span>0/{course.modules.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Avaliações (apenas online) */}
            {course.type === 'online' && (
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Avaliações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {course.quizzes.map((quiz) => (
                    <div key={quiz.id} className="p-4 border rounded-lg">
                      <h4 className="font-medium text-sm mb-2">{quiz.title}</h4>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>{quiz.questions} questões</p>
                        <p>Tempo: {quiz.timeLimit}</p>
                        <p>
                          Tentativas: {quiz.attempts}/{quiz.maxAttempts}
                        </p>
                      </div>
                      <Button size="sm" className="w-full mt-3" disabled>
                        Disponível após conclusão do módulo
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Informações do curso */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle>Informações do Curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Modalidade</span>
                  <span className="font-medium">
                    {course.type === 'online' ? 'Online' : 'Presencial'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duração</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Início</span>
                  <span className="font-medium">{course.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Término</span>
                  <span className="font-medium">{course.endDate}</span>
                </div>
                {course.type === 'presencial' && (
                  <div className="pt-2 border-t">
                    <p className="text-gray-600 mb-1">Local:</p>
                    <p className="font-medium text-sm">{course.location}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
