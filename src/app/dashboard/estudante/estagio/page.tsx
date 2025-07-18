'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'
import {
  Calendar,
  Clock,
  Building2,
  User,
  GraduationCap,
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Award,
  Check,
  ChevronsUpDown,
} from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar'

interface Internship {
  id: number
  studentCode: string
  studentName: string
  course: string
  companyName: string
  internshipName: string
  startDate: string
  endDate: string
  schedule: {
    [key: string]: { start: string; end: string } | null
  }
  status: 'Em Andamento' | 'Concluído' | 'Cancelado'
  createdAt: string
}

interface Student {
  id: number
  code: string
  name: string
  cpf: string
  course: string
  photo: string
}

const mockStudents: Student[] = [
  {
    id: 1,
    code: '2024001',
    name: 'João Silva Santos',
    cpf: '123.456.789-01',
    course: 'Administração',
    photo: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    code: '2024002',
    name: 'Maria Aparecida Silva',
    cpf: '987.654.321-02',
    course: 'Gestão de RH',
    photo: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    code: '2024003',
    name: 'Carlos Eduardo Lima',
    cpf: '456.789.123-03',
    course: 'Administração',
    photo: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 4,
    code: '2024004',
    name: 'Ana Paula Oliveira',
    cpf: '789.123.456-04',
    course: 'Gestão de RH',
    photo: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 5,
    code: '2024005',
    name: 'Pedro Henrique Costa',
    cpf: '321.654.987-05',
    course: 'Administração',
    photo: '/placeholder.svg?height=40&width=40',
  },
]

const mockInternships: Internship[] = [
  {
    id: 1,
    studentCode: '2024001',
    studentName: 'João Silva Santos',
    course: 'Administração',
    companyName: 'Tech Solutions Ltda',
    internshipName: 'Estágio em Recursos Humanos',
    startDate: '2024-03-01',
    endDate: '2024-08-30',
    schedule: {
      monday: { start: '19:00', end: '22:00' },
      tuesday: { start: '19:00', end: '22:00' },
      wednesday: null,
      thursday: { start: '19:00', end: '22:00' },
      friday: null,
      saturday: null,
      sunday: null,
    },
    status: 'Em Andamento',
    createdAt: '2024-02-15',
  },
  {
    id: 2,
    studentCode: '2024002',
    studentName: 'Maria Aparecida Silva',
    course: 'Gestão de RH',
    companyName: 'Indústria ABC S.A.',
    internshipName: 'Estágio em Departamento Pessoal',
    startDate: '2024-02-15',
    endDate: '2024-07-15',
    schedule: {
      monday: { start: '08:00', end: '12:00' },
      tuesday: { start: '08:00', end: '12:00' },
      wednesday: { start: '08:00', end: '12:00' },
      thursday: { start: '08:00', end: '12:00' },
      friday: { start: '08:00', end: '12:00' },
      saturday: null,
      sunday: null,
    },
    status: 'Concluído',
    createdAt: '2024-01-20',
  },
  {
    id: 3,
    studentCode: '2024003',
    studentName: 'Carlos Eduardo Lima',
    course: 'Administração',
    companyName: 'Comércio XYZ Ltda',
    internshipName: 'Estágio em Gestão Comercial',
    startDate: '2024-04-01',
    endDate: '2024-09-30',
    schedule: {
      monday: { start: '14:00', end: '18:00' },
      tuesday: null,
      wednesday: { start: '14:00', end: '18:00' },
      thursday: null,
      friday: { start: '14:00', end: '18:00' },
      saturday: null,
      sunday: null,
    },
    status: 'Em Andamento',
    createdAt: '2024-03-10',
  },
]

const weekDays = [
  { key: 'monday', label: 'Segunda-feira' },
  { key: 'tuesday', label: 'Terça-feira' },
  { key: 'wednesday', label: 'Quarta-feira' },
  { key: 'thursday', label: 'Quinta-feira' },
  { key: 'friday', label: 'Sexta-feira' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' },
]

export default function AdminInternshipManagement() {
  const [internships, setInternships] = useState<Internship[]>(mockInternships)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [confirmCompleteId, setConfirmCompleteId] = useState<number | null>(
    null
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCourse, setFilterCourse] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [studentSearchOpen, setStudentSearchOpen] = useState(false)
  const [studentSearchValue, setStudentSearchValue] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    studentCode: '',
    companyName: '',
    internshipName: '',
    startDate: '',
    endDate: '',
    schedule: {
      monday: { enabled: false, start: '', end: '' },
      tuesday: { enabled: false, start: '', end: '' },
      wednesday: { enabled: false, start: '', end: '' },
      thursday: { enabled: false, start: '', end: '' },
      friday: { enabled: false, start: '', end: '' },
      saturday: { enabled: false, start: '', end: '' },
      sunday: { enabled: false, start: '', end: '' },
    },
  })

  const filteredStudents = mockStudents.filter((student) => {
    const searchTerm = studentSearchValue.toLowerCase()
    return (
      student.name.toLowerCase().includes(searchTerm) ||
      student.code.toLowerCase().includes(searchTerm) ||
      student.cpf.replace(/\D/g, '').includes(searchTerm.replace(/\D/g, ''))
    )
  })

  const handleCreateInternship = () => {
    if (!selectedStudent) return

    // Simulate API call
    const newInternship: Internship = {
      id: Date.now(),
      studentCode: selectedStudent.code,
      studentName: selectedStudent.name,
      course: selectedStudent.course,
      companyName: formData.companyName,
      internshipName: formData.internshipName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      schedule: Object.fromEntries(
        Object.entries(formData.schedule).map(([day, config]) => [
          day,
          config.enabled ? { start: config.start, end: config.end } : null,
        ])
      ),
      status: 'Em Andamento',
      createdAt: new Date().toISOString().split('T')[0],
    }

    setInternships([...internships, newInternship])
    setIsCreateDialogOpen(false)

    // Reset form
    setSelectedStudent(null)
    setStudentSearchValue('')
    setFormData({
      studentCode: '',
      companyName: '',
      internshipName: '',
      startDate: '',
      endDate: '',
      schedule: {
        monday: { enabled: false, start: '', end: '' },
        tuesday: { enabled: false, start: '', end: '' },
        wednesday: { enabled: false, start: '', end: '' },
        thursday: { enabled: false, start: '', end: '' },
        friday: { enabled: false, start: '', end: '' },
        saturday: { enabled: false, start: '', end: '' },
        sunday: { enabled: false, start: '', end: '' },
      },
    })
  }

  const handleCompleteInternship = (id: number) => {
    setInternships(
      internships.map((internship) =>
        internship.id === id
          ? { ...internship, status: 'Concluído' as const }
          : internship
      )
    )
    setConfirmCompleteId(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Em Andamento':
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Em Andamento
          </Badge>
        )
      case 'Concluído':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Concluído
          </Badge>
        )
      case 'Cancelado':
        return <Badge variant="destructive">Cancelado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatSchedule = (schedule: Internship['schedule']) => {
    const activeDays = Object.entries(schedule)
      .filter(([config]) => config !== null)
      .map(([day, config]) => {
        const dayName = weekDays.find((d) => d.key === day)?.label || day
        return `${dayName}: ${config!.start} - ${config!.end}`
      })

    return activeDays.length > 0 ? activeDays.join(', ') : 'Não definido'
  }

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.internshipName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCourse =
      filterCourse === 'all' || internship.course === filterCourse
    const matchesStatus =
      filterStatus === 'all' || internship.status === filterStatus

    return matchesSearch && matchesCourse && matchesStatus
  })

  const courses = [...new Set(internships.map((i) => i.course))]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestão de Estágios
              </h1>
              <p className="text-gray-600">
                Administre os estágios obrigatórios dos alunos
              </p>
            </div>

            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Estágio
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Estágio</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do estágio obrigatório do aluno
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Student Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Dados do Aluno</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label>Buscar Aluno *</Label>
                        <Popover
                          open={studentSearchOpen}
                          onOpenChange={setStudentSearchOpen}
                        >
                          <PopoverTrigger asChild className="bg-white">
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={studentSearchOpen}
                              className="w-full justify-between h-auto p-3"
                            >
                              {selectedStudent ? (
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={
                                        selectedStudent.photo ||
                                        '/placeholder.svg'
                                      }
                                      alt={selectedStudent.name}
                                      className="rounded-full bg-gray-500 text-white"
                                    />
                                    <AvatarFallback className="rounded-full bg-gray-500 text-white">
                                      {selectedStudent.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="text-left">
                                    <p className="font-medium">
                                      {selectedStudent.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {selectedStudent.code} •{' '}
                                      {selectedStudent.course}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                'Buscar por código, CPF ou nome do aluno...'
                              )}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-full p-0 bg-white"
                            align="start"
                          >
                            <Command>
                              <CommandInput
                                placeholder="Digite código, CPF ou nome..."
                                value={studentSearchValue}
                                onValueChange={setStudentSearchValue}
                              />
                              <CommandList>
                                <CommandEmpty>
                                  Nenhum aluno encontrado.
                                </CommandEmpty>
                                <CommandGroup>
                                  {filteredStudents.map((student) => (
                                    <CommandItem
                                      key={student.id}
                                      value={`${student.name} ${student.code} ${student.cpf}`}
                                      onSelect={() => {
                                        setSelectedStudent(student)
                                        setFormData({
                                          ...formData,
                                          studentCode: student.code,
                                        })
                                        setStudentSearchOpen(false)
                                        setStudentSearchValue('')
                                      }}
                                      className="flex items-center gap-3 p-3"
                                    >
                                      <Avatar className="h-10 w-10">
                                        <AvatarImage
                                          src={
                                            student.photo || '/placeholder.svg'
                                          }
                                          alt={student.name}
                                          className="rounded-full bg-gray-500 text-white"
                                        />
                                        <AvatarFallback className="rounded-full bg-gray-500 text-white">
                                          {student.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <p className="font-medium">
                                          {student.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          Matrícula: {student.code} • CPF:{' '}
                                          {student.cpf}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          Curso: {student.course}
                                        </p>
                                      </div>
                                      <Check
                                        className={`ml-auto h-4 w-4 ${
                                          selectedStudent?.id === student.id
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        }`}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {selectedStudent && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage
                                src={
                                  selectedStudent.photo || '/placeholder.svg'
                                }
                                alt={selectedStudent.name}
                                className="rounded-full bg-gray-500 text-white"
                              />
                              <AvatarFallback className="text-lg rounded-full bg-gray-500 text-white">
                                {selectedStudent.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold text-lg">
                                {selectedStudent.name}
                              </h4>
                              <p className="text-gray-600">
                                Matrícula: {selectedStudent.code}
                              </p>
                              <p className="text-gray-600">
                                CPF: {selectedStudent.cpf}
                              </p>
                              <p className="text-gray-600">
                                Curso: {selectedStudent.course}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Company and Internship Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Dados da Empresa e Estágio
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName">Nome da Empresa *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              companyName: e.target.value,
                            })
                          }
                          placeholder="Ex: Tech Solutions Ltda"
                        />
                      </div>
                      <div>
                        <Label htmlFor="internshipName">
                          Nome do Estágio *
                        </Label>
                        <Input
                          id="internshipName"
                          value={formData.internshipName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              internshipName: e.target.value,
                            })
                          }
                          placeholder="Ex: Estágio em Recursos Humanos"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Período do Estágio
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Data de Início *</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              startDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">Data de Fim *</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              endDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Horários do Estágio
                    </h3>
                    <div className="space-y-3">
                      {weekDays.map((day) => (
                        <div
                          key={day.key}
                          className="flex items-center space-x-4 p-3 border rounded-lg"
                        >
                          <Checkbox
                            id={day.key}
                            checked={
                              formData.schedule[
                                day.key as keyof typeof formData.schedule
                              ].enabled
                            }
                            onCheckedChange={(checked) => {
                              setFormData({
                                ...formData,
                                schedule: {
                                  ...formData.schedule,
                                  [day.key]: {
                                    ...formData.schedule[
                                      day.key as keyof typeof formData.schedule
                                    ],
                                    enabled: checked as boolean,
                                  },
                                },
                              })
                            }}
                          />
                          <Label
                            htmlFor={day.key}
                            className="w-24 text-sm font-medium"
                          >
                            {day.label}
                          </Label>
                          {formData.schedule[
                            day.key as keyof typeof formData.schedule
                          ].enabled && (
                            <div className="flex items-center space-x-2">
                              <Input
                                type="time"
                                value={
                                  formData.schedule[
                                    day.key as keyof typeof formData.schedule
                                  ].start
                                }
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    schedule: {
                                      ...formData.schedule,
                                      [day.key]: {
                                        ...formData.schedule[
                                          day.key as keyof typeof formData.schedule
                                        ],
                                        start: e.target.value,
                                      },
                                    },
                                  })
                                }}
                                className="w-24"
                              />
                              <span className="text-sm text-gray-500">até</span>
                              <Input
                                type="time"
                                value={
                                  formData.schedule[
                                    day.key as keyof typeof formData.schedule
                                  ].end
                                }
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    schedule: {
                                      ...formData.schedule,
                                      [day.key]: {
                                        ...formData.schedule[
                                          day.key as keyof typeof formData.schedule
                                        ],
                                        end: e.target.value,
                                      },
                                    },
                                  })
                                }}
                                className="w-24"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateInternship}>
                    Cadastrar Estágio
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{internships.length}</p>
                    <p className="text-sm text-gray-600">Total de Estágios</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {
                        internships.filter((i) => i.status === 'Em Andamento')
                          .length
                      }
                    </p>
                    <p className="text-sm text-gray-600">Em Andamento</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {
                        internships.filter((i) => i.status === 'Concluído')
                          .length
                      }
                    </p>
                    <p className="text-sm text-gray-600">Concluídos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {new Set(internships.map((i) => i.companyName)).size}
                    </p>
                    <p className="text-sm text-gray-600">Empresas Parceiras</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">Todos os Estágios</TabsTrigger>
            <TabsTrigger value="by-course">Por Curso</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Buscar por aluno, empresa ou estágio..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={filterCourse} onValueChange={setFilterCourse}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filtrar por curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os cursos</SelectItem>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Internships List */}
            <div className="space-y-4">
              {filteredInternships.map((internship) => (
                <Card key={internship.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {internship.internshipName}
                            </h3>
                            <p className="text-gray-600">
                              {internship.companyName}
                            </p>
                          </div>
                          {getStatusBadge(internship.status)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>
                              <strong>Aluno:</strong> {internship.studentName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-gray-400" />
                            <span>
                              <strong>Curso:</strong> {internship.course}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>
                              <strong>Período:</strong> {internship.startDate} a{' '}
                              {internship.endDate}
                            </span>
                          </div>
                        </div>

                        <div className="text-sm">
                          <div className="flex items-start gap-2">
                            <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                            <div>
                              <strong>Horários:</strong>
                              <p className="text-gray-600 mt-1">
                                {formatSchedule(internship.schedule)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        {internship.status === 'Em Andamento' && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => setConfirmCompleteId(internship.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Marcar como Concluído
                          </Button>
                        )}
                        {internship.status === 'Concluído' && (
                          <Button variant="outline" size="sm">
                            <Award className="h-4 w-4 mr-1" />
                            Gerar Certificado
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="by-course" className="space-y-6">
            {courses.map((course) => {
              const courseInternships = internships.filter(
                (i) => i.course === course
              )
              return (
                <Card key={course}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      {course}
                    </CardTitle>
                    <CardDescription>
                      {courseInternships.length} estágio(s) cadastrado(s)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {courseInternships.map((internship) => (
                        <div
                          key={internship.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">
                              {internship.studentName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {internship.internshipName} -{' '}
                              {internship.companyName}
                            </p>
                          </div>
                          {getStatusBadge(internship.status)}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>
        </Tabs>

        {/* Confirmation Dialog */}
        <AlertDialog
          open={confirmCompleteId !== null}
          onOpenChange={() => setConfirmCompleteId(null)}
        >
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 ">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Confirmar Conclusão do Estágio
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div>
                  <p>
                    Você tem certeza que deseja marcar este estágio como
                    concluído?
                  </p>
                  <div className="mt-4">
                    <p className="font-medium">Esta ação irá:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      <li>Gerar automaticamente o certificado do aluno</li>
                      <li>Alterar o status para Concluído</li>
                      <li>Não poderá ser revertida</li>
                    </ul>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  confirmCompleteId &&
                  handleCompleteInternship(confirmCompleteId)
                }
                className="bg-green-600 hover:bg-green-700"
              >
                Confirmar e Gerar Certificado
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
