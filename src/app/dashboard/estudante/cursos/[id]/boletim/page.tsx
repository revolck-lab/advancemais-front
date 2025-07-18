'use client'

import {
  ArrowLeft,
  Award,
  TrendingUp,
  BarChart3,
  Target,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress/progress'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Tipagem para as avaliações
type Evaluation = {
  id: number
  title: string
  date: string
  maxScore: number | null
  score: number | null
  attempts: number
  maxAttempts: number
  questions: number
  correctAnswers: number | null
  status:
    | 'pendente'
    | 'aprovado'
    | 'reprovado'
    | 'em_andamento'
    | 'nao_iniciado'
}

// Tipagem para os módulos
type Module = {
  id: number
  title: string
  weight: number
  evaluations: Evaluation[]
  average: number | null
  status:
    | 'pendente'
    | 'aprovado'
    | 'reprovado'
    | 'em_andamento'
    | 'nao_iniciado'
}

// Tipagem para o boletim
type Grades = {
  courseTitle: string
  courseType: 'online' | 'presencial'
  student: {
    name: string
    registration: string
  }
  modules: Module[]
  overallAverage: number | null
  finalStatus:
    | 'pendente'
    | 'aprovado'
    | 'reprovado'
    | 'em_andamento'
    | 'nao_iniciado'
  minimumGrade: number
  attendancePercentage: number
  minimumAttendance: number
}

const gradesData: Record<number, Grades> = {
  1: {
    courseTitle: 'Auxiliar de Farmácia',
    courseType: 'online',
    student: {
      name: 'Filipe Reis Marques',
      registration: '2025001',
    },
    modules: [
      {
        id: 1,
        title: 'Módulo 1: Fundamentos da Farmácia',
        weight: 0,
        evaluations: [
          {
            id: 1,
            title: 'Avaliação do Módulo 1',
            date: '13/06/2025',
            maxScore: null,
            score: null,
            attempts: 0,
            maxAttempts: 0,
            questions: 0,
            correctAnswers: null,
            status: 'pendente',
          },
        ],
        average: null,
        status: 'pendente',
      },
      {
        id: 2,
        title: 'Módulo 2: Prática e Atendimento',
        weight: 0,
        evaluations: [
          {
            id: 2,
            title: 'Avaliação Final',
            date: '25/06/2025',
            maxScore: null,
            score: null,
            attempts: 0,
            maxAttempts: 0,
            questions: 0,
            correctAnswers: null,
            status: 'pendente',
          },
        ],
        average: null,
        status: 'pendente',
      },
    ],
    overallAverage: 0,
    finalStatus: 'em_andamento',
    minimumGrade: 7.0,
    attendancePercentage: 0,
    minimumAttendance: 75,
  },
  2: {
    courseTitle: 'Auxiliar Administrativo',
    courseType: 'presencial',
    student: {
      name: 'João Silva',
      registration: '2025001',
    },
    modules: [
      {
        id: 1,
        title: 'Módulo 1: Fundamentos Administrativos',
        weight: 30,
        evaluations: [],
        average: null,
        status: 'nao_iniciado',
      },
      {
        id: 2,
        title: 'Módulo 2: Rotinas Administrativas',
        weight: 40,
        evaluations: [],
        average: null,
        status: 'nao_iniciado',
      },
      {
        id: 3,
        title: 'Módulo 3: Prática Profissional',
        weight: 30,
        evaluations: [],
        average: null,
        status: 'nao_iniciado',
      },
    ],
    overallAverage: null,
    finalStatus: 'nao_iniciado',
    minimumGrade: 7.0,
    attendancePercentage: 0,
    minimumAttendance: 75,
  },
}

export default function BoletimPage() {
  const params = useParams()
  const courseId = Number.parseInt(params.id as string)
  const grades = gradesData[courseId]

  if (!grades) {
    return <div>Boletim não encontrado</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado':
        return 'bg-green-500'
      case 'reprovado':
        return 'bg-red-500'
      case 'pendente':
        return 'bg-yellow-500'
      case 'em_andamento':
        return 'bg-blue-500'
      case 'nao_iniciado':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'aprovado':
        return 'Aprovado'
      case 'reprovado':
        return 'Reprovado'
      case 'pendente':
        return 'Pendente'
      case 'em_andamento':
        return 'Em Andamento'
      case 'nao_iniciado':
        return 'Não Iniciado'
      default:
        return 'N/A'
    }
  }

  // Correção: verifica se average é number antes do cálculo
  const calculateWeightedAverage = () => {
    let totalWeight = 0
    let weightedSum = 0

    grades.modules.forEach((module) => {
      if (typeof module.average === 'number') {
        totalWeight += module.weight
        weightedSum += module.average * (module.weight / 100)
      }
    })

    return totalWeight > 0
      ? (weightedSum / (totalWeight / 100)).toFixed(1)
      : null
  }

  const weightedAverage = calculateWeightedAverage()

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
                  Boletim de Notas
                </h1>
                <p className="text-sm text-gray-600">{grades.courseTitle}</p>
              </div>
            </div>
            <Badge
              className={
                grades.courseType === 'online' ? 'bg-blue-500' : 'bg-green-500'
              }
            >
              {grades.courseType === 'online' ? 'ONLINE' : 'PRESENCIAL'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Student Info */}
            <Card className="shadow-lg border-0 bg-white mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Informações do Estudante
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Nome do Estudante</p>
                    <p className="font-semibold text-gray-900">
                      {grades.student.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Matrícula</p>
                    <p className="font-semibold text-gray-900">
                      {grades.student.registration}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Curso</p>
                    <p className="font-semibold text-gray-900">
                      {grades.courseTitle}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Modalidade</p>
                    <p className="font-semibold text-gray-900">
                      {grades.courseType === 'online' ? 'Online' : 'Presencial'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grades by Module */}
            <Card className="shadow-lg border-0 bg-white mb-6">
              <CardHeader>
                <CardTitle>Notas por Módulo</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Módulo
                        </th>
                        <th className="text-center p-4 font-semibold text-gray-900">
                          Peso
                        </th>
                        <th className="text-center p-4 font-semibold text-gray-900">
                          Avaliações
                        </th>
                        <th className="text-center p-4 font-semibold text-gray-900">
                          Média
                        </th>
                        <th className="text-center p-4 font-semibold text-gray-900">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {grades.modules.map((module) => (
                        <tr key={module.id} className="hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-gray-900">
                                {module.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                Módulo {module.id}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 text-center text-gray-700">
                            {module.weight}%
                          </td>
                          <td className="p-4 text-center">
                            <div className="space-y-1">
                              {module.evaluations.map((evaluation) => (
                                <div key={evaluation.id} className="text-sm">
                                  <p className="font-medium text-gray-900">
                                    {evaluation.title}
                                  </p>
                                  <p className="text-gray-600">
                                    {typeof evaluation.score === 'number' &&
                                    typeof evaluation.maxScore === 'number' ? (
                                      <span className="text-blue-600">
                                        {evaluation.score}/{evaluation.maxScore}
                                      </span>
                                    ) : (
                                      <span className="text-gray-400">
                                        Pendente
                                      </span>
                                    )}
                                  </p>
                                  {typeof evaluation.score === 'number' &&
                                    typeof evaluation.maxScore === 'number' &&
                                    evaluation.maxScore > 0 && (
                                      <p className="text-xs text-gray-500">
                                        {evaluation.correctAnswers !== null
                                          ? `${evaluation.correctAnswers}`
                                          : '-'}
                                        /{evaluation.questions} questões
                                        corretas
                                      </p>
                                    )}
                                </div>
                              ))}
                              {module.evaluations.length === 0 && (
                                <span className="text-gray-400 text-sm">
                                  Nenhuma avaliação
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            {typeof module.average === 'number' ? (
                              <div className="text-center">
                                <span
                                  className={`text-lg font-bold ${
                                    module.average >= grades.minimumGrade
                                      ? 'text-green-600'
                                      : 'text-red-600'
                                  }`}
                                >
                                  {module.average.toFixed(1)}
                                </span>
                                <div className="w-16 mx-auto mt-1">
                                  <Progress
                                    value={(module.average / 10) * 100}
                                    className="h-2"
                                    style={{
                                      backgroundColor:
                                        module.average >= grades.minimumGrade
                                          ? '#10b981'
                                          : '#ef4444',
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            <Badge
                              className={`${getStatusColor(module.status)} text-white border-0`}
                            >
                              {getStatusText(module.status)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Evaluations */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle>Detalhes das Avaliações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {grades.modules.map((module) =>
                  module.evaluations.map((evaluation) => (
                    <div key={evaluation.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {evaluation.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {module.title}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={`${getStatusColor(evaluation.status)} text-white border-0`}
                          >
                            {getStatusText(evaluation.status)}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            {evaluation.date}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">
                            {typeof evaluation.score === 'number'
                              ? evaluation.score
                              : '-'}
                          </p>
                          <p className="text-sm text-gray-600">Nota Final</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">
                            {evaluation.correctAnswers !== null
                              ? evaluation.correctAnswers
                              : '-'}
                          </p>
                          <p className="text-sm text-gray-600">Acertos</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-600">
                            {evaluation.questions}
                          </p>
                          <p className="text-sm text-gray-600">
                            Total de Questões
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">
                            {evaluation.attempts}/{evaluation.maxAttempts}
                          </p>
                          <p className="text-sm text-gray-600">Tentativas</p>
                        </div>
                      </div>

                      {typeof evaluation.score === 'number' &&
                        typeof evaluation.maxScore === 'number' &&
                        evaluation.maxScore > 0 && (
                          <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>Aproveitamento</span>
                              <span>
                                {Math.round(
                                  (evaluation.score / evaluation.maxScore) * 100
                                )}
                                %
                              </span>
                            </div>
                            <Progress
                              value={
                                (evaluation.score / evaluation.maxScore) * 100
                              }
                              className="h-2"
                            />
                          </div>
                        )}
                    </div>
                  ))
                )}

                {grades.modules.every(
                  (module) => module.evaluations.length === 0
                ) && (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">📚</div>
                    <p className="text-gray-500">
                      Nenhuma avaliação realizada ainda
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Overall Performance */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Desempenho Geral
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div
                    className={`text-4xl font-bold mb-2 ${
                      weightedAverage &&
                      Number.parseFloat(weightedAverage) >= grades.minimumGrade
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {weightedAverage || '-'}
                  </div>
                  <p className="text-sm text-gray-600">Média Ponderada</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nota Mínima</span>
                    <span className="font-semibold">{grades.minimumGrade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frequência</span>
                    <span className="font-semibold">
                      {grades.attendancePercentage}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status Final</span>
                    <Badge
                      className={`${getStatusColor(grades.finalStatus)} text-white border-0`}
                    >
                      {getStatusText(grades.finalStatus)}
                    </Badge>
                  </div>
                </div>

                {weightedAverage && (
                  <div className="mt-4">
                    <Progress
                      value={(Number.parseFloat(weightedAverage) / 10) * 100}
                      className="h-3"
                      style={{
                        backgroundColor:
                          Number.parseFloat(weightedAverage) >=
                          grades.minimumGrade
                            ? '#10b981'
                            : '#ef4444',
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Requisitos para Aprovação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Nota mínima</span>
                  <span className="font-semibold">{grades.minimumGrade}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Frequência mínima
                  </span>
                  <span className="font-semibold">
                    {grades.minimumAttendance}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Todas as avaliações
                  </span>
                  <span className="font-semibold">Obrigatórias</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/dashboard/estudante/cursos/${courseId}/presenca`}>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Ver Presença
                  </Button>
                </Link>
                <Link href={`/dashboard/estudante/cursos/${courseId}`}>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Voltar ao Curso
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle>Progresso por Módulo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {grades.modules.map((module) => (
                  <div key={module.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Módulo {module.id}</span>
                      <span className="font-semibold">
                        {typeof module.average === 'number'
                          ? `${module.average.toFixed(1)}/10`
                          : 'Pendente'}
                      </span>
                    </div>
                    <Progress
                      value={
                        typeof module.average === 'number'
                          ? (module.average / 10) * 100
                          : 0
                      }
                      className="h-2"
                    />
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
