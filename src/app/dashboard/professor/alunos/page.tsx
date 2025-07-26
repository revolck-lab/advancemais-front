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
  Check,
  X,
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
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu/dropdown-menu'

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
  const [statusFilter, setStatusFilter] = useState<'todos' | 'regular' | 'irregular'>('todos')
  const [gradeFilter, setGradeFilter] = useState<'todos' | 'aprovados' | 'reprovados'>('todos')

  // Dados simulados do curso
  const courseInfo = {
    id: courseId,
    name: 'Gestão de RH e DP',
    code: 'GP404',
    students: 32,
  }

  // Dados simulados dos alunos
  const studentsData = [
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
      finalGrade: 9.8,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2023004',
      name: 'Daniel Pereira',
      enrollment: '2023004',
      status: 'Irregular',
      attendance: 65,
      midtermGrade: 5.0,
      finalGrade: 6.0,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2023005',
      name: 'Eduarda Costa',
      enrollment: '2023005',
      status: 'Regular',
      attendance: 90,
      midtermGrade: 8.0,
      finalGrade: 8.5,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2023006',
      name: 'Fábio Martins',
      enrollment: '2023006',
      status: 'Regular',
      attendance: 85,
      midtermGrade: 7.5,
      finalGrade: 8.0,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2023007',
      name: 'Gabriela Lima',
      enrollment: '2023007',
      status: 'Irregular',
      attendance: 70,
      midtermGrade: 6.0,
      finalGrade: 6.5,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2023008',
      name: 'Henrique Alves',
      enrollment: '2023008',
      status: 'Regular',
      attendance: 93,
      midtermGrade: 9.0,
      finalGrade: 9.5,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2023009',
      name: 'Isabela Ferreira',
      enrollment: '2023009',
      status: 'Regular',
      attendance: 87,
      midtermGrade: 7.8,
      finalGrade: 8.2,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2023010',
      name: 'João Ribeiro',
      enrollment: '2023010',
      status: 'Irregular',
      attendance: 60,
      midtermGrade: 4.5,
      finalGrade: 5.5,
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ]

  // Filtrar alunos com base na pesquisa e filtros
  const filteredStudents = studentsData.filter((student) => {
    // Filtro de pesquisa
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.enrollment.includes(searchTerm)

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
              Visualize e gerencie os alunos matriculados neste curso
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="bg-muted/30">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Total de Alunos
                  </p>
                  <p className="text-2xl font-bold">{totalStudents}</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <p className="text-sm text-green-700">Aprovados</p>
                  <p className="text-2xl font-bold text-green-700">
                    {approvedStudents}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-red-50">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <p className="text-sm text-red-700">Reprovados</p>
                  <p className="text-2xl font-bold text-red-700">
                    {failedStudents}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Barra de pesquisa e filtros */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por nome ou matrícula..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                  }
                  title={sortOrder === 'asc' ? 'Ordenar Z-A' : 'Ordenar A-Z'}
                >
                  {sortOrder === 'asc' ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  )}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      <span>Filtros</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white">
                    <DropdownMenuItem className="font-medium">
                      Status do Aluno
                    </DropdownMenuItem>
                    <DropdownMenuRadioGroup
                      value={statusFilter}
                      onValueChange={(value: string) =>
                        setStatusFilter(
                          value as 'todos' | 'regular' | 'irregular'
                        )
                      }
                    >
                      <DropdownMenuRadioItem value="todos">
                        <div className="flex items-center">
                          <span className="mr-2">Todos</span>
                          {statusFilter === 'todos' && (
                            <Check className="h-4 w-4 ml-auto" />
                          )}
                        </div>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="regular">
                        <div className="flex items-center">
                          <span className="mr-2">Regular</span>
                          {statusFilter === 'regular' && (
                            <Check className="h-4 w-4 ml-auto" />
                          )}
                        </div>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="irregular">
                        <div className="flex items-center">
                          <span className="mr-2">Irregular</span>
                          {statusFilter === 'irregular' && (
                            <Check className="h-4 w-4 ml-auto" />
                          )}
                        </div>
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="font-medium">
                      Situação Acadêmica
                    </DropdownMenuItem>
                    <DropdownMenuRadioGroup
                      value={gradeFilter}
                      onValueChange={(value: string) =>
                        setGradeFilter(
                          value as 'todos' | 'aprovados' | 'reprovados'
                        )
                      }
                    >
                      <DropdownMenuRadioItem value="todos">
                        <div className="flex items-center">
                          <span className="mr-2">Todos</span>
                          {gradeFilter === 'todos' && (
                            <Check className="h-4 w-4 ml-auto" />
                          )}
                        </div>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="aprovados">
                        <div className="flex items-center">
                          <span className="mr-2">Aprovados</span>
                          {gradeFilter === 'aprovados' && (
                            <Check className="h-4 w-4 ml-auto" />
                          )}
                        </div>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="reprovados">
                        <div className="flex items-center">
                          <span className="mr-2">Reprovados</span>
                          {gradeFilter === 'reprovados' && (
                            <Check className="h-4 w-4 ml-auto" />
                          )}
                        </div>
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Filtros ativos */}
            {(statusFilter !== 'todos' ||
              gradeFilter !== 'todos' ||
              searchTerm) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {searchTerm && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <span>Busca: {searchTerm}</span>
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => setSearchTerm('')}
                    />
                  </Badge>
                )}
                {statusFilter !== 'todos' && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <span>
                      Status:{' '}
                      {statusFilter === 'regular' ? 'Regular' : 'Irregular'}
                    </span>
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => setStatusFilter('todos')}
                    />
                  </Badge>
                )}
                {gradeFilter !== 'todos' && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <span>
                      Situação:{' '}
                      {gradeFilter === 'aprovados' ? 'Aprovados' : 'Reprovados'}
                    </span>
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => setGradeFilter('todos')}
                    />
                  </Badge>
                )}
              </div>
            )}

            {/* Tabela de alunos */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Frequência</TableHead>
                    <TableHead className="text-center">Nota Parcial</TableHead>
                    <TableHead className="text-center">Nota Final</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {sortedStudents.length > 0 ? (
                      sortedStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={student.avatar || '/placeholder.svg'}
                                  alt={student.name}
                                />
                                <AvatarFallback className="bg-gray-200 text-gray-800">
                                  {student.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">
                                {student.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{student.enrollment}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                student.status === 'Regular'
                                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                  : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                              }
                            >
                              {student.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <span
                              className={`font-medium ${student.attendance >= 75 ? 'text-green-600' : 'text-red-600'}`}
                            >
                              {student.attendance}%
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span
                              className={`font-medium ${student.midtermGrade >= 7 ? 'text-green-600' : 'text-red-600'}`}
                            >
                              {student.midtermGrade.toFixed(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span
                              className={`font-medium ${student.finalGrade >= 7 ? 'text-green-600' : 'text-red-600'}`}
                            >
                              {student.finalGrade.toFixed(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                navigateToStudentProfile(student.id)
                              }
                            >
                              Ver Perfil
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Nenhum aluno encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}