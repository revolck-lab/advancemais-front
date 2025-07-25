'use client'

import { useState, use } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Search,
  Users,
  GraduationCap,
  ChevronRight,
  SortAsc,
  SortDesc,
  Filter,
  ChevronDown,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Input } from '@/components/ui/input/input'
import { Button } from '@/components/ui/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu/dropdown-menu'

// Interface para dados do aluno
interface StudentData {
  id: string
  name: string
  enrollment: string
  status: 'Regular' | 'Irregular'
  attendance: number
  midtermGrade: number
  finalGrade: number
  avatar: string
}

// Tipos para filtros
type StatusFilter = 'todos' | 'regular' | 'irregular'
type GradeFilter = 'todos' | 'aprovados' | 'reprovados'

export default function CourseStudentsList({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const router = useRouter()
  
  // Resolver params assíncronos - CORREÇÃO PARA NEXT.JS 15
  const resolvedParams = use(params)
  const { courseId } = resolvedParams

  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos')
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>('todos')

  // Dados simulados do curso
  const courseInfo = {
    id: courseId,
    name: 'Gestão de RH e DP',
    code: 'GP404',
    students: 32,
  }

  // Dados simulados dos alunos - com tipagem adequada
  const studentsData: StudentData[] = [
    {
      id: '2023001',
      name: 'Ana Silva',
      enrollment: '2023001',
      status: 'Regular',
      attendance: 92,
      midtermGrade: 8.5,
      finalGrade: 9.0,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2023002',
      name: 'Bruno Santos',
      enrollment: '2023002',
      status: 'Regular',
      attendance: 88,
      midtermGrade: 7.0,
      finalGrade: 7.5,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2023003',
      name: 'Carla Oliveira',
      enrollment: '2023003',
      status: 'Regular',
      attendance: 95,
      midtermGrade: 9.5,
      finalGrade: 9.2,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2023004',
      name: 'Daniel Costa',
      enrollment: '2023004',
      status: 'Irregular',
      attendance: 65,
      midtermGrade: 6.0,
      finalGrade: 5.8,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2023005',
      name: 'Eduardo Lima',
      enrollment: '2023005',
      status: 'Regular',
      attendance: 89,
      midtermGrade: 7.8,
      finalGrade: 8.1,
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ]

  // Filtrar alunos
  const filteredStudents = studentsData.filter((student) => {
    // Filtro de busca
    const matchesSearch =
      !searchTerm ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.enrollment.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de status
    const matchesStatus =
      statusFilter === 'todos' ||
      (statusFilter === 'regular' && student.status === 'Regular') ||
      (statusFilter === 'irregular' && student.status === 'Irregular')

    // Filtro de notas
    const matchesGrade =
      gradeFilter === 'todos' ||
      (gradeFilter === 'aprovados' && student.finalGrade >= 7) ||
      (gradeFilter === 'reprovados' && student.finalGrade < 7)

    return matchesSearch && matchesStatus && matchesGrade
  })

  // Ordenar alunos
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name)
    } else {
      return b.name.localeCompare(a.name)
    }
  })

  // Navegar para o perfil do aluno
  const navigateToStudentProfile = (studentId: string) => {
    router.push(`alunos/${studentId}`)
  }

  // Contagem de alunos por categoria
  const totalStudents = studentsData.length
  const approvedStudents = studentsData.filter(
    (student) => student.finalGrade >= 7
  ).length
  const failedStudents = studentsData.filter(
    (student) => student.finalGrade < 7
  ).length

  // Função para obter variant do badge
  const getStatusBadgeVariant = (status: string): 'default' | 'destructive' => {
    return status === 'Regular' ? 'default' : 'destructive'
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">{courseInfo.name}</h1>
            <p className="text-muted-foreground">
              {courseInfo.code} • {courseInfo.students} alunos
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <GraduationCap className="h-4 w-4 mr-2" />
              Lançar Notas
            </Button>
          </div>
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Lista de Alunos
            </CardTitle>
            <CardDescription>
              Visualize e gerencie os alunos do curso
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Estatísticas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {totalStudents}
                </div>
                <div className="text-sm text-gray-600">Total de Alunos</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {approvedStudents}
                </div>
                <div className="text-sm text-gray-600">Aprovados</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {failedStudents}
                </div>
                <div className="text-sm text-gray-600">Reprovados</div>
              </div>
            </div>

            {/* Filtros e Busca */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nome ou matrícula..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                {/* Filtro de Status */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Status
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                      value={statusFilter}
                      onValueChange={(value) =>
                        setStatusFilter(value as StatusFilter)
                      }
                    >
                      <DropdownMenuRadioItem value="todos">
                        Todos
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="regular">
                        Regular
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="irregular">
                        Irregular
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Filtro de Notas */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Notas
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                      value={gradeFilter}
                      onValueChange={(value) =>
                        setGradeFilter(value as GradeFilter)
                      }
                    >
                      <DropdownMenuRadioItem value="todos">
                        Todos
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="aprovados">
                        Aprovados (≥7.0)
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="reprovados">
                        Reprovados (&lt;7.0)
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Ordenação */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                  }
                >
                  {sortOrder === 'asc' ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Tabela de Alunos */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Frequência</TableHead>
                    <TableHead>Nota Parcial</TableHead>
                    <TableHead>Nota Final</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {sortedStudents.map((student) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigateToStudentProfile(student.id)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={student.avatar}
                                alt={student.name}
                              />
                              <AvatarFallback>
                                {student.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.enrollment}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(student.status)}>
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{student.attendance}%</span>
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  student.attendance >= 75
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${student.attendance}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-medium ${
                              student.midtermGrade >= 7
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {student.midtermGrade.toFixed(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-medium ${
                              student.finalGrade >= 7
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {student.finalGrade.toFixed(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              navigateToStudentProfile(student.id)
                            }}
                          >
                            Ver Perfil
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>

            {/* Mensagem quando não há resultados */}
            {sortedStudents.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum aluno encontrado
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros de busca.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}