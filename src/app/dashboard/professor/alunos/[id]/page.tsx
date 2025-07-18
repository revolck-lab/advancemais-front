'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Eye,
  Plus,
  FileText,
  Download,
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
import { Textarea } from '@/components/ui/textarea/textarea'
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

export default function StudentProfile({
  params,
}: {
  params: { courseId: string; studentId: string }
}) {
  const router = useRouter()
  const { toast } = useToast()

  // Dados simulados do aluno
  const studentInfo = {
    id: params.studentId,
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
          topic: 'História e Evolução do RH',
          present: true,
        },
        {
          id: 3,
          date: '08/03/2024',
          topic: 'Função Estratégica do RH',
          present: false,
        },
        {
          id: 4,
          date: '12/03/2024',
          topic: 'Competências em RH',
          present: true,
        },
        {
          id: 5,
          date: '15/03/2024',
          topic: 'Ética e Responsabilidade',
          present: true,
        },
        {
          id: 6,
          date: '19/03/2024',
          topic: 'Gestão por Competências',
          present: true,
        },
        {
          id: 7,
          date: '22/03/2024',
          topic: 'Indicadores de RH',
          present: true,
        },
        {
          id: 8,
          date: '26/03/2024',
          topic: 'Desafios Contemporâneos',
          present: true,
        },
        {
          id: 9,
          date: '29/03/2024',
          topic: 'Tecnologia em RH',
          present: false,
        },
        { id: 10, date: '02/04/2024', topic: 'Revisão Geral', present: true },
      ],
    },
    {
      module: 'Módulo 2 - Legislação Trabalhista',
      classes: [
        {
          id: 1,
          date: '05/04/2024',
          topic: 'CLT - Conceitos Básicos',
          present: true,
        },
        {
          id: 2,
          date: '09/04/2024',
          topic: 'Contrato de Trabalho',
          present: true,
        },
        {
          id: 3,
          date: '12/04/2024',
          topic: 'Jornada de Trabalho',
          present: true,
        },
        {
          id: 4,
          date: '16/04/2024',
          topic: 'Férias e Descansos',
          present: true,
        },
        { id: 5, date: '19/04/2024', topic: 'FGTS e PIS', present: true },
        {
          id: 6,
          date: '23/04/2024',
          topic: 'Rescisão Contratual',
          present: true,
        },
        {
          id: 7,
          date: '26/04/2024',
          topic: 'Segurança do Trabalho',
          present: true,
        },
        {
          id: 8,
          date: '30/04/2024',
          topic: 'Sindicatos e Convenções',
          present: true,
        },
        {
          id: 9,
          date: '03/05/2024',
          topic: 'Processo Trabalhista',
          present: false,
        },
        {
          id: 10,
          date: '07/05/2024',
          topic: 'Reforma Trabalhista',
          present: true,
        },
      ],
    },
    {
      module: 'Módulo 3 - Departamento Pessoal',
      classes: [
        {
          id: 1,
          date: '10/05/2024',
          topic: 'Admissão de Funcionários',
          present: true,
        },
        {
          id: 2,
          date: '14/05/2024',
          topic: 'Documentos Trabalhistas',
          present: true,
        },
        {
          id: 3,
          date: '17/05/2024',
          topic: 'Folha de Pagamento',
          present: false,
        },
        {
          id: 4,
          date: '21/05/2024',
          topic: 'Cálculos Trabalhistas',
          present: true,
        },
        {
          id: 5,
          date: '24/05/2024',
          topic: 'Benefícios e Descontos',
          present: true,
        },
        { id: 6, date: '28/05/2024', topic: 'eSocial', present: true },
        {
          id: 7,
          date: '31/05/2024',
          topic: 'Demissão e Homologação',
          present: true,
        },
        {
          id: 8,
          date: '04/06/2024',
          topic: 'Controle de Ponto',
          present: true,
        },
      ],
    },
    {
      module: 'Módulo 4 - Gestão de Pessoas',
      classes: [
        {
          id: 1,
          date: '07/06/2024',
          topic: 'Recrutamento e Seleção',
          present: true,
        },
        {
          id: 2,
          date: '11/06/2024',
          topic: 'Entrevistas e Dinâmicas',
          present: true,
        },
        {
          id: 3,
          date: '14/06/2024',
          topic: 'Integração de Novos Funcionários',
          present: false,
        },
        {
          id: 4,
          date: '18/06/2024',
          topic: 'Treinamento e Desenvolvimento',
          present: true,
        },
        {
          id: 5,
          date: '21/06/2024',
          topic: 'Avaliação de Desempenho',
          present: false,
        },
        {
          id: 6,
          date: '25/06/2024',
          topic: 'Plano de Carreira',
          present: true,
        },
      ],
    },
  ])

  // Dados simulados de notas
  const [gradesData, setGradesData] = useState([
    {
      assessment: 'Prova 1 - Fundamentos de RH',
      date: '15/03/2024',
      grade: 8.5,
      maxGrade: 10,
      status: 'aprovado',
      hasExam: true,
    },
    {
      assessment: 'Trabalho - Legislação Trabalhista',
      date: '22/03/2024',
      grade: 9.2,
      maxGrade: 10,
      status: 'aprovado',
      hasExam: false,
    },
    {
      assessment: 'Prova 2 - Departamento Pessoal',
      date: '05/04/2024',
      grade: 7.8,
      maxGrade: 10,
      status: 'aprovado',
      hasExam: true,
    },
    {
      assessment: 'Projeto Final',
      date: '20/04/2024',
      grade: 6.5,
      maxGrade: 10,
      status: 'recuperação',
      hasExam: false,
    },
  ])

  // Dados simulados de trabalhos
  interface Assignment {
    id: number
    title: string
    description: string
    module: string
    assignedDate: string
    dueDate: string
    submissionDate: string | null
    status: string
    grade: number | null
    maxGrade: number
    feedback: string | null
    hasSubmission: boolean
    submissionFile: string | null
  }

  const [assignmentsData, setAssignmentsData] = useState<Assignment[]>([
    {
      id: 1,
      title: 'Análise de Caso - Recrutamento',
      description:
        'Desenvolver um estudo de caso sobre processo de recrutamento e seleção em uma empresa de médio porte.',
      module: 'Módulo 1 - Fundamentos de RH',
      assignedDate: '10/03/2024',
      dueDate: '24/03/2024',
      submissionDate: '22/03/2024',
      status: 'entregue',
      grade: 8.5,
      maxGrade: 10,
      feedback:
        'Excelente análise dos processos. Poderia ter aprofundado mais nas métricas de eficiência.',
      hasSubmission: true,
      submissionFile: 'analise_caso_rh.pdf',
    },
    {
      id: 2,
      title: 'Projeto de Política de Benefícios',
      description:
        'Criar uma proposta completa de política de benefícios para uma startup de tecnologia.',
      module: 'Módulo 2 - Legislação Trabalhista',
      assignedDate: '15/04/2024',
      dueDate: '29/04/2024',
      submissionDate: '28/04/2024',
      status: 'entregue',
      grade: 9.0,
      maxGrade: 10,
      feedback:
        'Trabalho muito bem estruturado e criativo. Demonstra boa compreensão da legislação.',
      hasSubmission: true,
      submissionFile: 'politica_beneficios.pdf',
    },
    {
      id: 3,
      title: 'Simulação de Folha de Pagamento',
      description:
        'Realizar cálculos completos de folha de pagamento para 5 funcionários com diferentes perfis.',
      module: 'Módulo 3 - Departamento Pessoal',
      assignedDate: '20/05/2024',
      dueDate: '03/06/2024',
      submissionDate: null,
      status: 'pendente',
      grade: null,
      maxGrade: 10,
      feedback: null,
      hasSubmission: false,
      submissionFile: null,
    },
    {
      id: 4,
      title: 'Plano de Desenvolvimento de Carreira',
      description:
        'Elaborar um plano de desenvolvimento de carreira para um cargo específico na área de RH.',
      module: 'Módulo 4 - Gestão de Pessoas',
      assignedDate: '25/06/2024',
      dueDate: '10/07/2024',
      submissionDate: null,
      status: 'atrasado',
      grade: null,
      maxGrade: 10,
      feedback: null,
      hasSubmission: false,
      submissionFile: null,
    },
  ])

  // Dados simulados de estágios
  const internshipData = [
    {
      company: 'Empresa ABC Ltda',
      supervisor: 'Carlos Mendes',
      startDate: '01/02/2024',
      endDate: '01/06/2024',
      status: 'em_andamento',
      hours: 120,
      totalHours: 200,
      description: 'Assistente de Recursos Humanos',
    },
  ]

  // Dados simulados da prova
  const examData = {
    title: 'Prova 1 - Fundamentos de RH',
    duration: '2 horas',
    questions: [
      {
        question:
          'Qual a importância da gestão de recursos humanos para uma organização?',
        studentAnswer:
          'A gestão de recursos humanos é fundamental para o sucesso organizacional pois é responsável por recrutar, desenvolver e reter talentos. Ela garante que a empresa tenha as pessoas certas nos lugares certos, alinhadas com os objetivos estratégicos.',
        maxPoints: 2.5,
        points: 2.0,
        feedback:
          'Boa resposta, mas poderia ter mencionado aspectos como clima organizacional e produtividade.',
      },
      {
        question: 'Explique os principais processos de RH.',
        studentAnswer:
          'Os principais processos são: recrutamento e seleção, treinamento e desenvolvimento, avaliação de desempenho, remuneração e benefícios, e gestão de pessoas.',
        maxPoints: 2.5,
        points: 2.5,
        feedback: 'Excelente! Resposta completa e bem estruturada.',
      },
      {
        question: 'O que é cultura organizacional?',
        studentAnswer:
          'É o conjunto de valores, crenças e comportamentos compartilhados pelos membros de uma organização.',
        maxPoints: 2.5,
        points: 2.0,
        feedback: 'Conceito correto, mas poderia ter dado exemplos práticos.',
      },
      {
        question: 'Como a tecnologia impacta o RH moderno?',
        studentAnswer:
          'A tecnologia revolucionou o RH com sistemas de gestão integrados, recrutamento digital, análise de dados para tomada de decisões e automação de processos repetitivos.',
        maxPoints: 2.5,
        points: 2.0,
        feedback: 'Boa visão geral da transformação digital no RH.',
      },
    ],
  }

  // Estados para controlar os diálogos
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState<{
    [key: number]: boolean
  }>({})
  const [gradeDialogOpen, setGradeDialogOpen] = useState<{
    [key: number]: boolean
  }>({})
  const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false)
  const [assignmentGradeDialogOpen, setAssignmentGradeDialogOpen] = useState<{
    [key: number]: boolean
  }>({})

  // Estado para novo trabalho
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    module: '',
    dueDate: '',
    maxGrade: 10,
  })

  // Funções para edição de frequência por aula
  const handleAttendanceChange = (
    moduleIndex: number,
    classIndex: number,
    isPresent: boolean
  ) => {
    const newData = [...attendanceData]
    newData[moduleIndex].classes[classIndex].present = isPresent
    setAttendanceData(newData)
  }

  // Função para salvar alterações de frequência
  const handleSaveAttendance = (moduleIndex: number) => {
    // Simular salvamento (aqui você faria a requisição para a API)
    setTimeout(() => {
      toast({
        title: 'Frequência atualizada!',
        description: 'As alterações de frequência foram salvas com sucesso.',
        variant: 'success',
      })
      setAttendanceDialogOpen((prev) => ({ ...prev, [moduleIndex]: false }))
    }, 500)
  }

  // Calcular estatísticas do módulo
  interface ClassAttendance {
    id: number
    date: string
    topic: string
    present: boolean
  }

  const getModuleStats = (classes: ClassAttendance[]) => {
    const attended = classes.filter((c) => c.present).length
    const total = classes.length
    const percentage = total > 0 ? (attended / total) * 100 : 0
    return { attended, total, percentage }
  }

  // Funções para edição de notas
  const handleEditGrade = (index: number, grade: number) => {
    const newData = [...gradesData]
    const newStatus =
      grade >= 7 ? 'aprovado' : grade >= 5 ? 'recuperação' : 'reprovado'
    newData[index] = {
      ...newData[index],
      grade,
      status: newStatus,
    }
    setGradesData(newData)
  }

  // Função para salvar alterações de nota
  const handleSaveGrade = (index: number) => {
    // Simular salvamento (aqui você faria a requisição para a API)
    setTimeout(() => {
      toast({
        title: 'Nota atualizada!',
        description: 'A nota foi alterada e salva com sucesso.',
        variant: 'success',
      })
      setGradeDialogOpen((prev) => ({ ...prev, [index]: false }))
    }, 500)
  }

  // Funções para trabalhos
  const handleAddAssignment = () => {
    if (
      !newAssignment.title ||
      !newAssignment.module ||
      !newAssignment.dueDate
    ) {
      toast({
        title: 'Erro!',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      })
      return
    }

    const assignment = {
      id: assignmentsData.length + 1,
      ...newAssignment,
      assignedDate: new Date().toLocaleDateString('pt-BR'),
      submissionDate: null,
      status: 'pendente',
      grade: null,
      feedback: null,
      hasSubmission: false,
      submissionFile: null,
    }

    setAssignmentsData([...assignmentsData, assignment])
    setNewAssignment({
      title: '',
      description: '',
      module: '',
      dueDate: '',
      maxGrade: 10,
    })
    setAssignmentDialogOpen(false)

    toast({
      title: 'Trabalho adicionado!',
      description: 'O trabalho foi criado e atribuído ao aluno.',
      variant: 'success',
    })
  }

  const handleEditAssignmentGrade = (
    index: number,
    grade: number,
    feedback: string
  ) => {
    const newData = [...assignmentsData]
    const newStatus =
      grade >= 7 ? 'aprovado' : grade >= 5 ? 'recuperação' : 'reprovado'

    newData[index] = {
      ...newData[index],
      grade,
      feedback,
      status: newData[index].hasSubmission ? newStatus : newData[index].status,
    }
    setAssignmentsData(newData)
  }

  const handleSaveAssignmentGrade = (index: number) => {
    setTimeout(() => {
      toast({
        title: 'Nota do trabalho atualizada!',
        description: 'A avaliação foi salva com sucesso.',
        variant: 'success',
      })
      setAssignmentGradeDialogOpen((prev) => ({ ...prev, [index]: false }))
    }, 500)
  }

  // Voltar para a lista de alunos
  const goBack = () => {
    router.push(`/dashboard/professor/alunos`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado':
      case 'entregue':
        return 'bg-green-100 text-green-800'
      case 'reprovado':
        return 'bg-red-100 text-red-800'
      case 'recuperação':
        return 'bg-yellow-100 text-yellow-800'
      case 'em_andamento':
      case 'pendente':
        return 'bg-blue-100 text-blue-800'
      case 'concluído':
        return 'bg-green-100 text-green-800'
      case 'atrasado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aprovado':
      case 'concluído':
      case 'entregue':
        return <CheckCircle className="h-4 w-4" />
      case 'reprovado':
      case 'atrasado':
        return <XCircle className="h-4 w-4" />
      case 'recuperação':
      case 'em_andamento':
      case 'pendente':
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  // Obter lista de módulos únicos
  const modulesList = [...new Set(attendanceData.map((item) => item.module))]

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-6 pl-0" onClick={goBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para lista de alunos
      </Button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        {/* Cabeçalho do perfil */}
        <Card className="mb-6 bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={studentInfo.avatar || '/placeholder.svg'}
                  alt={studentInfo.name}
                />
                <AvatarFallback className="bg-gray-200 text-gray-800">
                  {studentInfo.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-0">{studentInfo.name}</h2>
                <p className="text-muted-foreground">
                  Matrícula: {studentInfo.enrollment} / Curso:{' '}
                  <b>{studentInfo.course}</b>
                </p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 hover:bg-green-100"
                  >
                    {studentInfo.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Abas de conteúdo */}
        <Tabs defaultValue="frequency" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="frequency" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Frequência
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Notas e Provas
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Trabalhos
            </TabsTrigger>
            <TabsTrigger value="internship" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Estágios
            </TabsTrigger>
          </TabsList>

          {/* Aba de Frequência */}
          <TabsContent value="frequency" className="mt-6">
            <div className="grid gap-6">
              {attendanceData.map((moduleData, moduleIndex) => {
                const stats = getModuleStats(moduleData.classes)
                return (
                  <Card key={moduleIndex} className="bg-white">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          {moduleData.module}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              stats.percentage >= 75
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }
                          >
                            {stats.attended}/{stats.total} aulas -{' '}
                            {stats.percentage.toFixed(1)}%
                          </Badge>
                          <Dialog
                            open={attendanceDialogOpen[moduleIndex] || false}
                            onOpenChange={(open) =>
                              setAttendanceDialogOpen((prev) => ({
                                ...prev,
                                [moduleIndex]: open,
                              }))
                            }
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Editar Frequência
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
                              <DialogHeader>
                                <DialogTitle>
                                  Lista de Chamada - {moduleData.module}
                                </DialogTitle>
                                <DialogDescription>
                                  Marque a presença do aluno {studentInfo.name}{' '}
                                  em cada aula
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="grid gap-3">
                                  {moduleData.classes.map(
                                    (classItem, classIndex) => (
                                      <div
                                        key={classItem.id}
                                        className="border rounded-lg p-4"
                                      >
                                        <div className="flex justify-between items-start mb-3">
                                          <div>
                                            <h4 className="font-medium">
                                              Aula {classItem.id} -{' '}
                                              {classItem.date}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                              {classItem.topic}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex gap-4">
                                          <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                              type="radio"
                                              name={`attendance-${moduleIndex}-${classIndex}`}
                                              checked={
                                                classItem.present === true
                                              }
                                              onChange={() =>
                                                handleAttendanceChange(
                                                  moduleIndex,
                                                  classIndex,
                                                  true
                                                )
                                              }
                                              className="w-4 h-4 text-green-600"
                                            />
                                            <span className="text-green-700 font-medium">
                                              ✓ Presente
                                            </span>
                                          </label>
                                          <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                              type="radio"
                                              name={`attendance-${moduleIndex}-${classIndex}`}
                                              checked={
                                                classItem.present === false
                                              }
                                              onChange={() =>
                                                handleAttendanceChange(
                                                  moduleIndex,
                                                  classIndex,
                                                  false
                                                )
                                              }
                                              className="w-4 h-4 text-red-600"
                                            />
                                            <span className="text-red-700 font-medium">
                                              ✗ Faltou
                                            </span>
                                          </label>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="button"
                                  onClick={() =>
                                    handleSaveAttendance(moduleIndex)
                                  }
                                >
                                  Salvar Alterações
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <Progress value={stats.percentage} className="w-full" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Presenças: {stats.attended}</span>
                          <span>Faltas: {stats.total - stats.attended}</span>
                        </div>
                      </div>

                      {/* Lista de aulas - apenas visualização */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm mb-3">
                          Resumo das aulas:
                        </h4>
                        <div className="grid gap-2">
                          {moduleData.classes.map((classItem) => (
                            <div
                              key={classItem.id}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  Aula {classItem.id}
                                </span>
                                <span className="text-muted-foreground">
                                  {classItem.date}
                                </span>
                                <span className="text-muted-foreground">
                                  - {classItem.topic}
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  classItem.present
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }
                              >
                                {classItem.present ? 'Presente' : 'Faltou'}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Aba de Notas */}
          <TabsContent value="grades" className="mt-6">
            <div className="grid gap-4">
              {gradesData.map((item, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{item.assessment}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`flex items-center gap-1 ${getStatusColor(item.status)}`}
                        >
                          {getStatusIcon(item.status)}
                          {item.status.replace('_', ' ')}
                        </Badge>
                        <div className="flex gap-1">
                          {item.hasExam && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
                                <DialogHeader>
                                  <DialogTitle>{examData.title}</DialogTitle>
                                  <DialogDescription>
                                    Duração: {examData.duration} | Aluno:{' '}
                                    {studentInfo.name}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  {examData.questions.map((q, qIndex) => (
                                    <div
                                      key={qIndex}
                                      className="border rounded-lg p-4"
                                    >
                                      <div className="mb-3">
                                        <h4 className="font-medium mb-2">
                                          Questão {qIndex + 1} ({q.maxPoints}{' '}
                                          pontos)
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                          {q.question}
                                        </p>
                                      </div>
                                      <div className="bg-blue-50 p-3 rounded-md mb-3">
                                        <h5 className="text-sm font-medium mb-1">
                                          Resposta do aluno:
                                        </h5>
                                        <p className="text-sm">
                                          {q.studentAnswer}
                                        </p>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <div className="text-sm">
                                          <span className="font-medium">
                                            Pontuação:{' '}
                                          </span>
                                          <span
                                            className={`${q.points === q.maxPoints ? 'text-green-600' : 'text-yellow-600'}`}
                                          >
                                            {q.points}/{q.maxPoints}
                                          </span>
                                        </div>
                                      </div>
                                      {q.feedback && (
                                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                                          <span className="font-medium">
                                            Feedback:{' '}
                                          </span>
                                          {q.feedback}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          <Dialog
                            open={gradeDialogOpen[index] || false}
                            onOpenChange={(open) =>
                              setGradeDialogOpen((prev) => ({
                                ...prev,
                                [index]: open,
                              }))
                            }
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-white">
                              <DialogHeader>
                                <DialogTitle>Editar Nota</DialogTitle>
                                <DialogDescription>
                                  {item.assessment}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="grade" className="text-right">
                                    Nota
                                  </Label>
                                  <Input
                                    id="grade"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max={item.maxGrade}
                                    defaultValue={item.grade}
                                    className="col-span-3"
                                    onChange={(e) => {
                                      const grade =
                                        parseFloat(e.target.value) || 0
                                      handleEditGrade(index, grade)
                                    }}
                                  />
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Nota máxima: {item.maxGrade}
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="button"
                                  onClick={() => handleSaveGrade(index)}
                                >
                                  Salvar alterações
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold">
                        {item.grade.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        de {item.maxGrade}
                      </div>
                      <Progress
                        value={(item.grade / item.maxGrade) * 100}
                        className="flex-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Aba de Trabalhos */}
          <TabsContent value="assignments" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Trabalhos e Atividades</h3>
              <Dialog
                open={assignmentDialogOpen}
                onOpenChange={setAssignmentDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Trabalho
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Trabalho</DialogTitle>
                    <DialogDescription>
                      Adicione um novo trabalho para o aluno {studentInfo.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Título *</Label>
                      <Input
                        id="title"
                        value={newAssignment.title}
                        onChange={(e) =>
                          setNewAssignment((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Ex: Análise de Caso - RH Estratégico"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={newAssignment.description}
                        onChange={(e) =>
                          setNewAssignment((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Descreva as instruções e objetivos do trabalho..."
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="module">Módulo *</Label>
                      <Select
                        value={newAssignment.module}
                        onValueChange={(value) =>
                          setNewAssignment((prev) => ({
                            ...prev,
                            module: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o módulo" />
                        </SelectTrigger>
                        <SelectContent>
                          {modulesList.map((module) => (
                            <SelectItem key={module} value={module}>
                              {module}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dueDate">Data de Entrega *</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newAssignment.dueDate}
                        onChange={(e) =>
                          setNewAssignment((prev) => ({
                            ...prev,
                            dueDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="maxGrade">Nota Máxima</Label>
                      <Input
                        id="maxGrade"
                        type="number"
                        step="0.1"
                        min="1"
                        max="10"
                        value={newAssignment.maxGrade}
                        onChange={(e) =>
                          setNewAssignment((prev) => ({
                            ...prev,
                            maxGrade: parseFloat(e.target.value) || 10,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setAssignmentDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleAddAssignment}>
                      Criar Trabalho
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {assignmentsData.map((assignment, index) => (
                <Card key={assignment.id} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          {assignment.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {assignment.module}
                        </p>
                        {assignment.description && (
                          <p className="text-sm text-gray-600 mb-3">
                            {assignment.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span className="text-muted-foreground">
                              Atribuído em:
                            </span>
                            <span>{assignment.assignedDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span className="text-muted-foreground">
                              Entrega:
                            </span>
                            <span>
                              {new Date(assignment.dueDate).toLocaleDateString(
                                'pt-BR'
                              )}
                            </span>
                          </div>
                          {assignment.submissionDate && (
                            <div className="flex items-center gap-1">
                              <Upload className="h-3 w-3" />
                              <span className="text-muted-foreground">
                                Entregue em:
                              </span>
                              <span>{assignment.submissionDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge
                          variant="outline"
                          className={`flex items-center gap-1 ${getStatusColor(assignment.status)}`}
                        >
                          {getStatusIcon(assignment.status)}
                          {assignment.status.replace('_', ' ')}
                        </Badge>
                        {assignment.hasSubmission && (
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            {assignment.submissionFile}
                          </Button>
                        )}
                        {assignment.status === 'entregue' && (
                          <Dialog
                            open={assignmentGradeDialogOpen[index] || false}
                            onOpenChange={(open) =>
                              setAssignmentGradeDialogOpen((prev) => ({
                                ...prev,
                                [index]: open,
                              }))
                            }
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="h-3 w-3 mr-1" />
                                {assignment.grade ? 'Editar Nota' : 'Avaliar'}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px] bg-white">
                              <DialogHeader>
                                <DialogTitle>Avaliar Trabalho</DialogTitle>
                                <DialogDescription>
                                  {assignment.title}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="assignmentGrade">Nota</Label>
                                  <Input
                                    id="assignmentGrade"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max={assignment.maxGrade}
                                    defaultValue={assignment.grade || ''}
                                    placeholder={`Nota de 0 a ${assignment.maxGrade}`}
                                    onChange={(e) => {
                                      const grade =
                                        parseFloat(e.target.value) || 0
                                      handleEditAssignmentGrade(
                                        index,
                                        grade,
                                        assignment.feedback || ''
                                      )
                                    }}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="assignmentFeedback">
                                    Feedback
                                  </Label>
                                  <Textarea
                                    id="assignmentFeedback"
                                    defaultValue={assignment.feedback || ''}
                                    placeholder="Comentários sobre o trabalho..."
                                    rows={4}
                                    onChange={(e) => {
                                      handleEditAssignmentGrade(
                                        index,
                                        assignment.grade || 0,
                                        e.target.value
                                      )
                                    }}
                                  />
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Nota máxima: {assignment.maxGrade}
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="button"
                                  onClick={() =>
                                    handleSaveAssignmentGrade(index)
                                  }
                                >
                                  Salvar Avaliação
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>

                    {assignment.grade !== null && (
                      <div className="border-t pt-4">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="text-xl font-bold">
                            {assignment.grade.toFixed(1)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            de {assignment.maxGrade}
                          </div>
                          <Progress
                            value={
                              (assignment.grade / assignment.maxGrade) * 100
                            }
                            className="flex-1"
                          />
                        </div>
                        {assignment.feedback && (
                          <div className="bg-gray-50 p-3 rounded-md">
                            <h5 className="text-sm font-medium mb-1">
                              Feedback do Professor:
                            </h5>
                            <p className="text-sm text-gray-700">
                              {assignment.feedback}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {assignmentsData.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Nenhum trabalho atribuído para este aluno.
                    </p>
                    <Button onClick={() => setAssignmentDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Primeiro Trabalho
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Aba de Estágios */}
          <TabsContent value="internship" className="mt-6">
            <div className="grid gap-4">
              {internshipData.map((item, index) => (
                <Card key={index} className="bg-white">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {item.company}
                        </CardTitle>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`flex items-center gap-1 ${getStatusColor(item.status)}`}
                      >
                        {getStatusIcon(item.status)}
                        {item.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Supervisor:
                          </span>
                          <span className="text-sm font-medium">
                            {item.supervisor}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Início:
                          </span>
                          <span className="text-sm">{item.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Término:
                          </span>
                          <span className="text-sm">{item.endDate}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Horas cumpridas:
                          </span>
                          <span className="text-sm font-medium">
                            {item.hours}h de {item.totalHours}h
                          </span>
                        </div>
                        <Progress
                          value={(item.hours / item.totalHours) * 100}
                          className="w-full"
                        />
                        <div className="text-xs text-muted-foreground text-right">
                          {((item.hours / item.totalHours) * 100).toFixed(1)}%
                          concluído
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {internshipData.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Nenhum estágio cadastrado para este aluno.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
