'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Badge } from '@/components/ui/badge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { Textarea } from '@/components/ui/textarea/textarea'
import {
  Eye,
  Edit,
  Users,
  Calendar,
  TrendingUp,
  Award,
  CheckCircle,
  XCircle,
} from 'lucide-react'

// Dados mockados
const courses = [
  { id: '1', name: 'Informática Básica', period: 'Matutino' },
  { id: '2', name: 'Informática Básica', period: 'Vespertino' },
  { id: '3', name: 'Excel Avançado', period: 'Turma A' },
  { id: '4', name: 'Excel Avançado', period: 'Turma B' },
  { id: '5', name: 'PowerPoint', period: 'Matutino' },
]

const students = [
  {
    id: '1',
    name: 'Ana Silva',
    matricula: '2024001',
    avatar: '/placeholder.svg?height=40&width=40',
    grade: 8.5,
    examDate: '2024-01-15',
    courseId: '2',
    status: 'approved',
    exam: {
      title: 'Prova de Informática Básica - Módulo 1',
      questions: [
        {
          id: 1,
          question: 'O que significa CPU?',
          answer: 'Central Processing Unit',
          correct: true,
        },
        {
          id: 2,
          question: 'Qual a função do sistema operacional?',
          answer: 'Gerenciar recursos do computador',
          correct: true,
        },
        {
          id: 3,
          question: 'O que é RAM?',
          answer: 'Memória de acesso aleatório',
          correct: false,
        },
      ],
    },
  },
  {
    id: '2',
    name: 'Carlos Santos',
    matricula: '2024002',
    avatar: '/placeholder.svg?height=40&width=40',
    grade: 7.0,
    examDate: '2024-01-15',
    courseId: '2',
    status: 'approved',
    exam: {
      title: 'Prova de Informática Básica - Módulo 1',
      questions: [
        {
          id: 1,
          question: 'O que significa CPU?',
          answer: 'Processador central',
          correct: true,
        },
        {
          id: 2,
          question: 'Qual a função do sistema operacional?',
          answer: 'Controlar o computador',
          correct: true,
        },
        { id: 3, question: 'O que é RAM?', answer: 'Não sei', correct: false },
      ],
    },
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    matricula: '2024003',
    avatar: '/placeholder.svg?height=40&width=40',
    grade: 9.2,
    examDate: '2024-01-16',
    courseId: '2',
    status: 'approved',
    exam: {
      title: 'Prova de Informática Básica - Módulo 1',
      questions: [
        {
          id: 1,
          question: 'O que significa CPU?',
          answer: 'Central Processing Unit',
          correct: true,
        },
        {
          id: 2,
          question: 'Qual a função do sistema operacional?',
          answer: 'Gerenciar recursos e programas',
          correct: true,
        },
        {
          id: 3,
          question: 'O que é RAM?',
          answer: 'Random Access Memory',
          correct: true,
        },
      ],
    },
  },
  {
    id: '4',
    name: 'João Pedro',
    matricula: '2024004',
    avatar: '/placeholder.svg?height=40&width=40',
    grade: 6.5,
    examDate: '2024-01-16',
    courseId: '2',
    status: 'needs_attention',
    exam: {
      title: 'Prova de Informática Básica - Módulo 1',
      questions: [
        {
          id: 1,
          question: 'O que significa CPU?',
          answer: 'Computador',
          correct: false,
        },
        {
          id: 2,
          question: 'Qual a função do sistema operacional?',
          answer: 'Fazer o computador funcionar',
          correct: true,
        },
        {
          id: 3,
          question: 'O que é RAM?',
          answer: 'Não lembro',
          correct: false,
        },
      ],
    },
  },
]

export default function TeacherDashboard() {
  const [selectedCourse, setSelectedCourse] = useState('2')
  const [editModalOpen, setEditModalOpen] = useState(false)
  interface Student {
    id: string
    name: string
    matricula: string
    avatar: string
    grade: number
    examDate: string
    courseId: string
    status: string
    exam: {
      title: string
      questions: Array<{
        id: number
        question: string
        answer: string
        correct: boolean
      }>
    }
  }

  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [newGrade, setNewGrade] = useState('')
  const [bonusPoints, setBonusPoints] = useState('')
  const [bonusReason, setBonusReason] = useState('')

  const filteredStudents = selectedCourse
    ? students.filter((student) => student.courseId === selectedCourse)
    : []
  const selectedCourseInfo = courses.find(
    (course) => course.id === selectedCourse
  )

  const handleEditGrade = (student: Student) => {
    setEditingStudent(student)
    setNewGrade(student.grade.toString())
    setEditModalOpen(true)
  }

  const handleSaveGrade = () => {
    if (editingStudent && newGrade) {
      console.log(`Salvando nota ${newGrade} para aluno ${editingStudent.name}`)
      setEditModalOpen(false)
      setEditingStudent(null)
      setNewGrade('')
      setBonusPoints('')
      setBonusReason('')
    }
  }

  const getGradeStatus = (grade: number) => {
    if (grade >= 9)
      return {
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        label: 'Excelente',
      }
    if (grade >= 7)
      return { color: 'text-blue-600', bg: 'bg-blue-50', label: 'Aprovado' }
    return { color: 'text-amber-600', bg: 'bg-amber-50', label: 'Atenção' }
  }

  const averageGrade =
    filteredStudents.reduce((acc, student) => acc + student.grade, 0) /
    filteredStudents.length
  const approvedCount = filteredStudents.filter(
    (student) => student.grade >= 7
  ).length

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                Avaliações
              </h1>
              <p className="text-gray-600 mt-1">
                Gerencie as notas e acompanhe o desempenho dos alunos
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Seletor de Turma */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium text-gray-900 mb-3 block">
                  Selecionar Turma
                </Label>
                <Select
                  value={selectedCourse}
                  onValueChange={setSelectedCourse}
                >
                  <SelectTrigger className="w-80 h-11 border-gray-300 rounded-xl bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem
                        key={course.id}
                        value={course.id}
                        className="py-3"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{course.name}</span>
                          <span className="text-sm text-gray-500">
                            {course.period}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCourseInfo && (
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-2">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">
                      {filteredStudents.length}
                    </div>
                    <div className="text-sm text-gray-600">Alunos</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-2">
                      <TrendingUp className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">
                      {averageGrade.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Média</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">
                      {approvedCount}
                    </div>
                    <div className="text-sm text-gray-600">Aprovados</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info da Turma */}
        {selectedCourseInfo && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedCourseInfo.name}
              </h2>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                {selectedCourseInfo.period}
              </Badge>
            </div>
          </div>
        )}

        {/* Lista de Alunos */}
        {filteredStudents.length > 0 ? (
          <div className="grid gap-4">
            {filteredStudents.map((student) => {
              const gradeStatus = getGradeStatus(student.grade)
              return (
                <Card
                  key={student.id}
                  className="border-0 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                          <AvatarImage
                            src={student.avatar || '/placeholder.svg'}
                            alt={student.name}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                            {student.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {student.name}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-gray-600">
                              Mat. {student.matricula}
                            </span>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">
                                {new Date(student.examDate).toLocaleDateString(
                                  'pt-BR'
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        {/* Status da Nota */}
                        <div className="text-center">
                          <div
                            className={`inline-flex items-center px-4 py-2 rounded-full ${gradeStatus.bg}`}
                          >
                            <span
                              className={`text-2xl font-bold ${gradeStatus.color}`}
                            >
                              {student.grade.toFixed(1)}
                            </span>
                          </div>
                          <div
                            className={`text-xs font-medium mt-1 ${gradeStatus.color}`}
                          >
                            {gradeStatus.label}
                          </div>
                        </div>

                        {/* Ações */}
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-9 px-4 border-gray-300"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Prova
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-white">
                              <DialogHeader>
                                <DialogTitle className="text-xl">
                                  {student.exam.title}
                                </DialogTitle>
                                <DialogDescription className="text-base">
                                  {student.name} • Matrícula {student.matricula}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6 mt-6">
                                {student.exam.questions.map(
                                  (question, index) => (
                                    <Card
                                      key={question.id}
                                      className="border border-gray-200"
                                    >
                                      <CardContent className="p-5">
                                        <div className="flex justify-between items-start mb-3">
                                          <h4 className="font-medium text-gray-900 flex-1 pr-4">
                                            <span className="text-blue-600 font-semibold">
                                              {index + 1}.
                                            </span>{' '}
                                            {question.question}
                                          </h4>
                                          <div className="flex items-center gap-2">
                                            {question.correct ? (
                                              <CheckCircle className="w-5 h-5 text-emerald-500" />
                                            ) : (
                                              <XCircle className="w-5 h-5 text-red-500" />
                                            )}
                                            <Badge
                                              variant={
                                                question.correct
                                                  ? 'default'
                                                  : 'destructive'
                                              }
                                            >
                                              {question.correct
                                                ? 'Correta'
                                                : 'Incorreta'}
                                            </Badge>
                                          </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
                                          <p className="text-gray-700">
                                            <span className="font-medium text-gray-900">
                                              Resposta:
                                            </span>{' '}
                                            {question.answer}
                                          </p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditGrade(student)}
                            className="h-9 px-4 border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="border-0 shadow-sm">
            <CardContent className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma avaliação encontrada
              </h3>
              <p className="text-gray-600">
                Esta turma ainda não realizou nenhuma prova.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Modal Editar Nota */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl">Editar Nota</DialogTitle>
              <DialogDescription className="text-base">
                {editingStudent?.name} • Mat. {editingStudent?.matricula}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-6">
              <div>
                <Label
                  htmlFor="grade"
                  className="text-base font-medium text-gray-900 mb-3 block"
                >
                  Nova Nota
                </Label>
                <Input
                  id="grade"
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                  className="h-12 text-lg text-center border-gray-300 rounded-xl"
                  placeholder="0.0"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Digite uma nota de 0 a 10
                </p>
              </div>

              <div className="border-t pt-6">
                <Label className="text-base font-medium text-gray-900 mb-3 block">
                  Pontos Extras (Opcional)
                </Label>
                <div className="space-y-3">
                  <Input
                    type="number"
                    min="0"
                    max="2"
                    step="0.1"
                    value={bonusPoints}
                    onChange={(e) => setBonusPoints(e.target.value)}
                    placeholder="Ex: 0.5"
                    className="h-11 border-gray-300 rounded-xl"
                  />
                  <Textarea
                    value={bonusReason}
                    onChange={(e) => setBonusReason(e.target.value)}
                    placeholder="Motivo dos pontos extras (trabalho, participação, etc.)"
                    className="min-h-[80px] border-gray-300 rounded-xl resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setEditModalOpen(false)}
                  className="flex-1 h-11 border-gray-300 rounded-xl"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveGrade}
                  disabled={!newGrade}
                  className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 rounded-xl"
                >
                  Salvar Nota
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
