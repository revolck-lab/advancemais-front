'use client'

import { Award, BookOpen, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress/progress'
import Link from 'next/link'

// 1. Defina o tipo das avaliações
type Evaluation = {
  title: string
  date: string
  grade: number | null
}

// 2. Defina o tipo dos cursos
type StudentGrade = {
  id: number
  courseTitle: string
  type: 'online' | 'presencial'
  status: 'concluido' | 'em_andamento' | 'nao_iniciado'
  period: string
  grade: number | null
  maxGrade: number
  evaluations: Evaluation[]
}

// 3. Adicione os tipos aos arrays
const studentGrades: StudentGrade[] = [
  {
    id: 1,
    courseTitle: 'Auxiliar de Farmácia',
    type: 'online',
    status: 'em_andamento',
    period: 'Jun 2025',
    grade: null,
    maxGrade: 10,
    evaluations: [],
  },
  {
    id: 2,
    courseTitle: 'Auxiliar Administrativo',
    type: 'presencial',
    status: 'nao_iniciado',
    period: 'Jul 2025',
    grade: null,
    maxGrade: 10,
    evaluations: [],
  },
]

export default function MinhasNotasPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido':
        return 'bg-green-500'
      case 'em_andamento':
        return 'bg-blue-500'
      case 'nao_iniciado':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'concluido':
        return 'Concluído'
      case 'em_andamento':
        return 'Em Andamento'
      case 'nao_iniciado':
        return 'Não Iniciado'
      default:
        return 'N/A'
    }
  }

  // Aqui não muda nada, pois o TypeScript já entende que course.grade pode ser number ou null
  const completedCourses = studentGrades.filter(
    (course) => course.grade !== null
  )
  const overallAverage =
    completedCourses.length > 0
      ? (
          completedCourses.reduce(
            (acc, course) => acc + (course.grade ?? 0),
            0
          ) / completedCourses.length
        ).toFixed(1)
      : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Minhas Notas
          </h1>
          <p className="text-gray-600">Acompanhe suas notas e desempenho</p>
        </div>

        {/* Summary */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {studentGrades.length}
                </div>
                <p className="text-sm text-gray-600">Cursos</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {completedCourses.length}
                </div>
                <p className="text-sm text-gray-600">Concluídos</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {overallAverage || '-'}
                </div>
                <p className="text-sm text-gray-600">Média Geral</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses List */}
        <div className="space-y-4">
          {studentGrades.map((course) => (
            <Card
              key={course.id}
              className="border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {course.courseTitle}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {course.type === 'online' ? 'Online' : 'Presencial'}
                      </Badge>
                      <Badge
                        className={`${getStatusColor(course.status)} text-white text-xs`}
                      >
                        {getStatusText(course.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {course.period}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    {course.grade !== null ? (
                      <div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {course.grade.toFixed(1)}
                        </div>
                        <div className="w-16">
                          <Progress
                            value={(course.grade / course.maxGrade) * 100}
                            className="h-2"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-gray-400">-</div>
                    )}
                  </div>
                </div>

                {/* Evaluations */}
                {course.evaluations.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Avaliações
                    </h4>
                    {course.evaluations.map((evaluation, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {evaluation.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {evaluation.date}
                          </p>
                        </div>
                        <div className="text-right">
                          {evaluation.grade !== null ? (
                            <span className="text-sm font-semibold text-blue-600">
                              {evaluation.grade}/10
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">
                              Pendente
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">
                      Nenhuma avaliação disponível
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Link
                    href={`/dashboard/estudante/cursos/${course.id}/boletim`}
                  >
                    <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      Ver Boletim
                    </button>
                  </Link>
                  <Link href={`/dashboard/estudante/cursos/${course.id}`}>
                    <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      Acessar Curso
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
