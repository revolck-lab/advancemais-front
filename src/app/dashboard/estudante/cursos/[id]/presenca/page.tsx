'use client'

import { ArrowLeft, CheckCircle, X, Clock, User, BarChart3 } from 'lucide-react'
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

// Tipagem do item de aula
type ClassItem = {
  id: number
  title: string
  date: string
  time: string
  type: string
  status: string
  completedAt: string
  duration: string
  score?: number // <- Agora score pode existir
}

type Attendance = {
  courseTitle: string
  courseType: 'online' | 'presencial'
  totalClasses: number
  attendedClasses: number
  attendancePercentage: number
  classes: ClassItem[]
}

// Tipando o attendanceData
const attendanceData: Record<number, Attendance> = {
  1: {
    courseTitle: 'Auxiliar de Farmácia',
    courseType: 'online',
    totalClasses: 32,
    attendedClasses: 0,
    attendancePercentage: 0,
    classes: [
      {
        id: 1,
        title: 'Introdução à Farmacologia Básica',
        date: '04/06/2025',
        time: '18:00 - 22:00',
        type: 'video',
        status: 'agendada',
        completedAt: '',
        duration: '1h 45min',
        // score: 8.5, // Exemplo de aula com score, adicione se precisar
      },
      // Exemplo de aula com score:
      // {
      //   id: 2,
      //   title: 'Aula Prática',
      //   date: '06/06/2025',
      //   time: '19:00 - 21:00',
      //   type: 'video',
      //   status: 'realizada',
      //   completedAt: '06/06/2025 21:10',
      //   duration: '2h',
      //   score: 8.5,
      // },
    ],
  },
}

export default function PresencaPage() {
  const params = useParams()
  const courseId = Number.parseInt(params.id as string)
  const attendance = attendanceData[courseId as keyof typeof attendanceData]

  if (!attendance) {
    return <div>Dados de presença não encontrados</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'presente':
      case 'realizada':
        return 'text-green-600 bg-green-50'
      case 'ausente':
        return 'text-red-600 bg-red-50'
      case 'justificado':
        return 'text-yellow-600 bg-yellow-50'
      case 'agendada':
      case 'pendente':
        return 'text-gray-600 bg-gray-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'presente':
      case 'realizada':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'ausente':
        return <X className="w-4 h-4 text-red-600" />
      case 'justificado':
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'presente':
        return 'Presente'
      case 'ausente':
        return 'Ausente'
      case 'justificado':
        return 'Justificado'
      case 'realizada':
        return 'Realizada'
      case 'agendada':
        return 'Agendada'
      case 'pendente':
        return 'Pendente'
      default:
        return 'N/A'
    }
  }

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
                  Tabela de Presença
                </h1>
                <p className="text-sm text-gray-600">
                  {attendance.courseTitle}
                </p>
              </div>
            </div>
            <Badge
              className={
                attendance.courseType === 'online'
                  ? 'bg-blue-500'
                  : 'bg-green-500'
              }
            >
              {attendance.courseType === 'online' ? 'ONLINE' : 'PRESENCIAL'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Attendance Summary */}
            <Card className="shadow-lg border-0 bg-white mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Resumo de Presença
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {attendance.totalClasses}
                    </div>
                    <p className="text-sm text-gray-600">Total de Aulas</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {attendance.attendedClasses}
                    </div>
                    <p className="text-sm text-gray-600">Aulas Assistidas</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {attendance.attendancePercentage}%
                    </div>
                    <p className="text-sm text-gray-600">Frequência</p>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progresso de Frequência</span>
                    <span>{attendance.attendancePercentage}%</span>
                  </div>
                  <Progress
                    value={attendance.attendancePercentage}
                    className="h-3"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {attendance.attendancePercentage >= 75
                      ? '✅ Frequência adequada para aprovação'
                      : '⚠️ Atenção: Frequência mínima necessária é 75%'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Table */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle>Registro de Presença</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Aula
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Data
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Horário
                        </th>
                        <th className="text-center p-4 font-semibold text-gray-900">
                          Status
                        </th>
                        {attendance.courseType === 'online' && (
                          <th className="text-left p-4 font-semibold text-gray-900">
                            Tempo Assistido
                          </th>
                        )}
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Observações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {attendance.classes.map((classItem) => (
                        <tr key={classItem.id} className="hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-gray-900">
                                {classItem.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {classItem.type === 'quiz'
                                  ? 'Avaliação'
                                  : 'Aula Teórica'}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 text-gray-700">
                            {classItem.date}
                          </td>
                          <td className="p-4 text-gray-700">
                            {classItem.time}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center">
                              <Badge
                                className={`${getStatusColor(classItem.status)} border-0`}
                              >
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(classItem.status)}
                                  {getStatusText(classItem.status)}
                                </div>
                              </Badge>
                            </div>
                          </td>
                          {attendance.courseType === 'online' && (
                            <td className="p-4 text-gray-700">
                              {classItem.duration ||
                              typeof classItem.score === 'number' ? (
                                <div>
                                  {classItem.duration && (
                                    <p>{classItem.duration}</p>
                                  )}
                                  {typeof classItem.score === 'number' && (
                                    <p className="text-green-600">
                                      Nota: {classItem.score}
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                          )}
                          <td className="p-4 text-gray-700">
                            {classItem.completedAt ? (
                              <p className="text-sm">
                                Concluída em {classItem.completedAt}
                              </p>
                            ) : classItem.status === 'agendada' ? (
                              <p className="text-sm text-blue-600">
                                Aguardando
                              </p>
                            ) : classItem.status === 'ausente' ? (
                              <p className="text-sm text-red-600">
                                Não assistida
                              </p>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Attendance Status */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Status Acadêmico
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Frequência Atual</span>
                  <span className="font-semibold">
                    {attendance.attendancePercentage}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mínimo Exigido</span>
                  <span className="font-semibold">75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge
                    className={
                      attendance.attendancePercentage >= 75
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }
                  >
                    {attendance.attendancePercentage >= 75
                      ? 'Regular'
                      : 'Irregular'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle>Legenda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Presente / Realizada</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-red-600" />
                  <span className="text-sm">Ausente</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm">Justificado</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Agendada / Pendente</span>
                </div>
              </CardContent>
            </Card>

            {/* Course Info */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle>Informações do Curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Modalidade</span>
                  <span className="font-medium">
                    {attendance.courseType === 'online'
                      ? 'Online'
                      : 'Presencial'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total de Aulas</span>
                  <span className="font-medium">{attendance.totalClasses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Período</span>
                  <span className="font-medium">Jun 2025</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
