'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, use } from 'react'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  XCircle,
  Edit,
  Plus,
  FileText,
  Upload,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress/progress'
import { useToast } from '@/hooks/use-toast'

// Interface para dados de nota existente
interface GradeData {
  id: number
  assessment: string
  date: string
  grade: number
  maxGrade: number
  module: string
  status: 'aprovado' | 'reprovado'
}

export default function StudentProfile({
  params,
}: {
  params: Promise<{ courseId: string; studentId: string }>
}) {
  const router = useRouter()
  const { toast } = useToast()
  
  // Resolver params assíncronos
  const resolvedParams = use(params)
  const { studentId } = resolvedParams

  // Dados simulados do aluno
  const studentInfo = {
    id: studentId,
    name: 'Ana Silva',
    enrollment: '2023001',
    course: 'Gestão de RH e DP',
    status: 'Regular',
    avatar: '/placeholder.svg?height=100&width=100',
  }

  // Dados simulados de frequência por aula
  const [attendanceData, setAttendanceData] = useState([
    {
      module: 'Módulo 1 - Fundamentos de RH',
      classes: [
        { id: 1, date: '01/03/2024', topic: 'Introdução ao RH', present: true },
        {
          id: 2,
          date: '05/03/2024',
          topic: 'História do RH',
          present: false,
        },
        {
          id: 3,
          date: '08/03/2024',
          topic: 'Estrutura Organizacional',
          present: true,
        },
        {
          id: 4,
          date: '12/03/2024',
          topic: 'Recrutamento e Seleção',
          present: true,
        },
      ],
    },
    {
      module: 'Módulo 2 - Departamento Pessoal',
      classes: [
        { id: 5, date: '15/03/2024', topic: 'Folha de Pagamento', present: true },
        { id: 6, date: '19/03/2024', topic: 'Benefícios', present: false },
        { id: 7, date: '22/03/2024', topic: 'Férias e 13º', present: true },
      ],
    },
  ])

  // Dados simulados de notas
  const [gradesData, setGradesData] = useState<GradeData[]>([
    {
      id: 1,
      assessment: 'Prova 1 - Fundamentos',
      date: '20/03/2024',
      grade: 8.5,
      maxGrade: 10,
      module: 'Módulo 1',
      status: 'aprovado',
    },
    {
      id: 2,
      assessment: 'Trabalho - Recrutamento',
      date: '25/03/2024',
      grade: 9.0,
      maxGrade: 10,
      module: 'Módulo 1',
      status: 'aprovado',
    },
    {
      id: 3,
      assessment: 'Prova 2 - DP',
      date: '10/04/2024',
      grade: 7.5,
      maxGrade: 10,
      module: 'Módulo 2',
      status: 'aprovado',
    },
  ])

  // Estados para diálogos
  const [isAddGradeOpen, setIsAddGradeOpen] = useState(false)
  const [newGradeForm, setNewGradeForm] = useState({
    assessment: '',
    module: '',
    grade: 0,
    maxGrade: 10,
    date: '',
  })

  // Calcular estatísticas
  const totalClasses = attendanceData.reduce(
    (acc, module) => acc + module.classes.length,
    0
  )
  const presentClasses = attendanceData.reduce(
    (acc, module) =>
      acc + module.classes.filter((cls) => cls.present).length,
    0
  )
  const attendancePercentage = (presentClasses / totalClasses) * 100

  const averageGrade =
    gradesData.reduce((acc, grade) => acc + grade.grade, 0) / gradesData.length

  // Funções para manipular dados
  const toggleAttendance = (moduleIndex: number, classIndex: number) => {
    const newData = [...attendanceData]
    newData[moduleIndex].classes[classIndex].present =
      !newData[moduleIndex].classes[classIndex].present
    setAttendanceData(newData)
    
    toast({
      title: 'Presença atualizada',
      description: 'A frequência do aluno foi atualizada com sucesso.',
    })
  }

  const addNewGrade = () => {
    // Validar campos obrigatórios
    if (!newGradeForm.assessment || !newGradeForm.module || !newGradeForm.date) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      })
      return
    }

    const newGrade: GradeData = {
      id: gradesData.length + 1,
      assessment: newGradeForm.assessment,
      date: newGradeForm.date,
      grade: newGradeForm.grade,
      maxGrade: newGradeForm.maxGrade,
      module: newGradeForm.module,
      status: newGradeForm.grade >= 7 ? 'aprovado' : 'reprovado',
    }
    
    setGradesData([...gradesData, newGrade])
    setIsAddGradeOpen(false)
    
    // Resetar formulário
    setNewGradeForm({
      assessment: '',
      module: '',
      grade: 0,
      maxGrade: 10,
      date: '',
    })
    
    toast({
      title: 'Nota adicionada',
      description: 'A nova avaliação foi registrada com sucesso.',
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>

        {/* Student Profile Header */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={studentInfo.avatar} alt={studentInfo.name} />
                <AvatarFallback className="text-lg">
                  {studentInfo.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {studentInfo.name}
                    </h1>
                    <p className="text-gray-600">
                      Matrícula: {studentInfo.enrollment}
                    </p>
                    <p className="text-gray-600">{studentInfo.course}</p>
                  </div>
                  <Badge
                    variant={
                      studentInfo.status === 'Regular' ? 'success' : 'destructive'
                    }
                    className="self-start md:self-center"
                  >
                    {studentInfo.status}
                  </Badge>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {attendancePercentage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Frequência</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {averageGrade.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Média Geral</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {gradesData.length}
                    </div>
                    <div className="text-sm text-gray-600">Avaliações</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content Tabs */}
      <Tabs defaultValue="attendance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attendance">Frequência</TabsTrigger>
          <TabsTrigger value="grades">Notas</TabsTrigger>
          <TabsTrigger value="materials">Materiais</TabsTrigger>
        </TabsList>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Controle de Frequência</h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {presentClasses}/{totalClasses} presenças
              </Badge>
              <Progress value={attendancePercentage} className="w-24" />
            </div>
          </div>

          {attendanceData.map((module, moduleIndex) => (
            <Card key={moduleIndex} className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {module.module}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {module.classes.map((classItem, classIndex) => (
                    <div
                      key={classItem.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-sm">
                          <div className="font-medium">{classItem.topic}</div>
                          <div className="text-gray-500">{classItem.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={classItem.present ? 'success' : 'destructive'}
                        >
                          {classItem.present ? 'Presente' : 'Ausente'}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAttendance(moduleIndex, classIndex)}
                        >
                          {classItem.present ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Grades Tab */}
        <TabsContent value="grades" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Notas e Avaliações</h2>
            <Dialog open={isAddGradeOpen} onOpenChange={setIsAddGradeOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Nota
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Avaliação</DialogTitle>
                  <DialogDescription>
                    Registre uma nova nota para este aluno.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="assessment">Avaliação</Label>
                    <Input
                      id="assessment"
                      placeholder="Ex: Prova 3 - Direito Trabalhista"
                      value={newGradeForm.assessment}
                      onChange={(e) =>
                        setNewGradeForm({ ...newGradeForm, assessment: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="module">Módulo</Label>
                    <Select
                      value={newGradeForm.module}
                      onValueChange={(value) =>
                        setNewGradeForm({ ...newGradeForm, module: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o módulo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Módulo 1">Módulo 1</SelectItem>
                        <SelectItem value="Módulo 2">Módulo 2</SelectItem>
                        <SelectItem value="Módulo 3">Módulo 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="grade">Nota</Label>
                      <Input
                        id="grade"
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        placeholder="0.0"
                        value={newGradeForm.grade.toString()}
                        onChange={(e) =>
                          setNewGradeForm({
                            ...newGradeForm,
                            grade: parseFloat(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxGrade">Nota Máxima</Label>
                      <Input
                        id="maxGrade"
                        type="number"
                        min="1"
                        max="10"
                        value={newGradeForm.maxGrade.toString()}
                        onChange={(e) =>
                          setNewGradeForm({
                            ...newGradeForm,
                            maxGrade: parseInt(e.target.value) || 10,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newGradeForm.date}
                      onChange={(e) =>
                        setNewGradeForm({ ...newGradeForm, date: e.target.value })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddGradeOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={addNewGrade}>Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="space-y-4">
                {gradesData.map((grade) => (
                  <div
                    key={grade.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{grade.assessment}</div>
                      <div className="text-sm text-gray-500">
                        {grade.module} • {grade.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {grade.grade}/{grade.maxGrade}
                        </div>
                        <Badge
                          variant={
                            grade.status === 'aprovado' ? 'success' : 'destructive'
                          }
                        >
                          {grade.status === 'aprovado' ? 'Aprovado' : 'Reprovado'}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Materiais e Atividades</h2>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Material
            </Button>
          </div>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum material disponível
                </h3>
                <p className="text-gray-500">
                  Faça upload de materiais para disponibilizar ao aluno.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}