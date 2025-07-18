'use client'

import {
  ArrowLeft,
  Play,
  Clock,
  Calendar,
  FileText,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

/* ---- TIPOS ---- */
type LessonVideo = {
  title: string
  date: string
  duration: string
  moduleTitle: string
  youtubeId: string
  type: 'video'
  description: string
  objectives: string[]
  materials: string[]
}
type LessonQuiz = {
  title: string
  date: string
  duration: string
  moduleTitle: string
  type: 'quiz'
  description: string
  questions: {
    id: number
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }[]
}
type Lesson = LessonVideo | LessonQuiz

const lessonsData: Record<number, Lesson> = {
  1: {
    title: 'Introdução à Farmacologia Básica',
    date: 'Quarta-feira, 4 de Junho de 2025',
    duration: '2h',
    moduleTitle: 'Módulo 1: Fundamentos da Farmácia',
    youtubeId: 'dQw4w9WgXcQ',
    type: 'video',
    description:
      'Nesta aula introdutória, vamos abordar os conceitos fundamentais da farmacologia, incluindo farmacocinética e farmacodinâmica.',
    objectives: [
      'Entender os princípios básicos da farmacologia',
      'Conhecer os mecanismos de ação dos medicamentos',
      'Compreender a importância do auxiliar de farmácia',
      'Identificar as principais classes de medicamentos',
    ],
    materials: [
      'Apostila - Introdução à Farmacologia.pdf',
      'Slides da Aula.pptx',
    ],
  },
  2: {
    title: 'Anatomia e Fisiologia Aplicada',
    date: 'Sexta-feira, 6 de Junho de 2025',
    duration: '2h',
    moduleTitle: 'Módulo 1: Fundamentos da Farmácia',
    youtubeId: 'dQw4w9WgXcQ',
    type: 'video',
    description: 'Estudo da anatomia e fisiologia humana aplicada à farmácia.',
    objectives: [
      'Conhecer os sistemas do corpo humano',
      'Entender como os medicamentos afetam o organismo',
      'Identificar órgãos e suas funções',
    ],
    materials: ['Apostila - Anatomia.pdf', 'Atlas Anatômico.pdf'],
  },
  3: {
    title: 'Legislação Farmacêutica',
    date: 'Segunda-feira, 9 de Junho de 2025',
    duration: '1h 30min',
    moduleTitle: 'Módulo 1: Fundamentos da Farmácia',
    youtubeId: 'dQw4w9WgXcQ',
    type: 'video',
    description:
      'Conhecimento das leis e regulamentações que regem a prática farmacêutica.',
    objectives: [
      'Conhecer a legislação farmacêutica brasileira',
      'Entender as responsabilidades do auxiliar',
      'Compreender as normas sanitárias',
    ],
    materials: ['Legislação Farmacêutica.pdf', 'Normas ANVISA.pdf'],
  },
  4: {
    title: 'Ética Profissional',
    date: 'Quarta-feira, 11 de Junho de 2025',
    duration: '1h 30min',
    moduleTitle: 'Módulo 1: Fundamentos da Farmácia',
    youtubeId: 'dQw4w9WgXcQ',
    type: 'video',
    description:
      'Princípios éticos na prática farmacêutica e relacionamento profissional.',
    objectives: [
      'Compreender os princípios éticos',
      'Desenvolver postura profissional',
      'Entender o código de ética',
    ],
    materials: ['Código de Ética.pdf', 'Casos Práticos.pdf'],
  },
  5: {
    title: 'Avaliação do Módulo 1',
    date: 'Sexta-feira, 13 de Junho de 2025',
    duration: '1h',
    moduleTitle: 'Módulo 1: Fundamentos da Farmácia',
    type: 'quiz',
    description: 'Avaliação dos conhecimentos adquiridos no Módulo 1.',
    questions: [
      {
        id: 1,
        question: 'Qual é o principal objetivo da farmacologia?',
        options: [
          'Estudar apenas os efeitos colaterais dos medicamentos',
          'Compreender como os medicamentos interagem com o organismo',
          'Fabricar novos medicamentos',
          'Vender medicamentos',
          'Armazenar medicamentos',
        ],
        correctAnswer: 1,
        explanation:
          'A farmacologia estuda como os medicamentos interagem com o organismo, incluindo absorção, distribuição, metabolismo e excreção.',
      },
      // ...restante omitido por brevidade, pode manter igual
    ],
  },
  // ... continue para os demais lessons
}

/* ---- COMPONENTE ---- */
export default function AulaPage() {
  const params = useParams()
  const courseId = params.id as string
  const lessonId = Number.parseInt(params.lessonId as string)
  const [videoCompleted, setVideoCompleted] = useState(false)

  const lesson = lessonsData[lessonId]

  if (!lesson) {
    return <div>Aula não encontrada</div>
  }

  // Redireciona para página de quiz se for avaliação
  if (lesson.type === 'quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg border-0 bg-white">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {lesson.title}
                </h2>
                <p className="text-gray-600 mb-6">{lesson.description}</p>

                <div className="space-y-3">
                  <Link
                    href={`/dashboard/estudante/cursos/${courseId}/quiz/${lessonId}`}
                  >
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Iniciar Avaliação
                    </Button>
                  </Link>
                  <Link href={`/dashboard/estudante/cursos/${courseId}`}>
                    <Button variant="outline" className="w-full">
                      Voltar ao Curso
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Garantido: lesson é LessonVideo aqui
  const getNextLessonId = (currentId: number) => {
    return currentId < 10 ? currentId + 1 : null
  }

  const nextLessonId = getNextLessonId(lessonId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/dashboard/estudante/cursos/${courseId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Curso
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {lesson.title}
                </h1>
                <p className="text-sm text-gray-600">{lesson.moduleTitle}</p>
              </div>
            </div>
            <Badge className="bg-red-500 text-white px-3 py-1">
              VÍDEO AULA
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* YouTube Video Player */}
            <Card className="overflow-hidden shadow-lg border-0 bg-white">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${lesson.youtubeId}?rel=0&modestbranding=1`}
                    title={lesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                    onLoad={() => {
                      // Simular conclusão do vídeo após alguns segundos (para demonstração)
                      setTimeout(() => setVideoCompleted(true), 3000)
                    }}
                  ></iframe>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {lesson.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {lesson.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                    {videoCompleted && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Concluída</span>
                      </div>
                    )}
                  </div>

                  {videoCompleted && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">
                        ✅ Parabéns! Você concluiu esta aula. Agora você pode
                        prosseguir para a próxima.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={!videoCompleted}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Marcar como Concluída
                    </Button>
                    {videoCompleted && nextLessonId && (
                      <Link
                        href={`/dashboard/estudante/cursos/${courseId}/aula/${nextLessonId}`}
                      >
                        <Button variant="outline">
                          {nextLessonId === 5 || nextLessonId === 10
                            ? 'Fazer Avaliação'
                            : 'Próxima Aula'}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lesson Description */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle>Sobre esta Aula</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{lesson.description}</p>

                <h4 className="font-semibold text-gray-900 mb-2">
                  Objetivos de Aprendizagem:
                </h4>
                <ul className="space-y-1">
                  {lesson.objectives &&
                    lesson.objectives.map(
                      (objective: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-blue-600 mt-1">•</span>
                          {objective}
                        </li>
                      )
                    )}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson Info */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Informações da Aula
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{lesson.date}</p>
                    <p className="text-sm text-gray-600">
                      Duração: {lesson.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Play className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Vídeo Aula</p>
                    <p className="text-sm text-gray-600">
                      YouTube (Link Privado)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Materials */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle>Materiais da Aula</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lesson.materials &&
                  lesson.materials.map((material: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="flex-1 text-sm font-medium text-gray-900">
                        {material}
                      </span>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Next Lessons */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle>Próximas Aulas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lessonsData &&
                  Object.entries(lessonsData)
                    .filter(([key]) => Number(key) > lessonId)
                    .sort(([, a], [, b]) => Number(a) - Number(b))
                    .slice(0, 4)
                    .map(([key, nextLesson]) => (
                      <div
                        key={key}
                        className={`p-3 rounded-lg border ${
                          Number(key) === lessonId + 1 && videoCompleted
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <Play className="w-3 h-3 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {nextLesson.title}
                            </p>
                            <p className="text-xs text-gray-600">
                              {nextLesson.date}
                            </p>
                          </div>
                          {Number(key) === lessonId + 1 && videoCompleted && (
                            <Badge className="bg-green-500 text-white text-xs">
                              Disponível
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
