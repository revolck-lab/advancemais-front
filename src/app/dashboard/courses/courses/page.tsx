'use client'

import type React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar'
import { Skeleton } from '@/components/ui/skeleton/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip/tooltip'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  SearchIcon,
  X,
  BookOpen,
  Users,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

// Tipos
type Course = {
  id: string
  name: string
  thumbnail: string
  instructor: string
  enrollments: number
  completionRate: number
  createdAt: string
  period: 'Matutino' | 'Vespertino'
}

type SortDirection = 'asc' | 'desc' | null
type SortField = 'name' | 'instructor' | null

const courses: Course[] = [
  {
    id: 'A12345',
    name: 'Portaria Remota CFTV - Turma Matutino',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Patrícia Gomes',
    enrollments: 2,
    completionRate: 85,
    createdAt: '2024-05-10',
    period: 'Matutino',
  },
  {
    id: 'A23456',
    name: 'Atendente de Clínicas - Turma Vespertino',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Marcos Andrade',
    enrollments: 4,
    completionRate: 78,
    createdAt: '2024-05-20',
    period: 'Vespertino',
  },
  {
    id: 'A34567',
    name: 'Pacote Office - Turma Matutino',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Fernanda Lima',
    enrollments: 5,
    completionRate: 90,
    createdAt: '2024-05-25',
    period: 'Matutino',
  },
  {
    id: 'A45678',
    name: 'Agente de Portaria - Turma Vespertino',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Bruno Martins',
    enrollments: 10,
    completionRate: 88,
    createdAt: '2024-06-01',
    period: 'Vespertino',
  },
  {
    id: 'A67890',
    name: 'Camareira de Hotel - Turma Vespertino',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Rafael Almeida',
    enrollments: 5,
    completionRate: 92,
    createdAt: '2024-06-15',
    period: 'Vespertino',
  },
  {
    id: 'A89012',
    name: 'Gestão de RH e DP - Turma Vespertino',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Lucas Ferreira',
    enrollments: 8,
    completionRate: 80,
    createdAt: '2024-06-05',
    period: 'Vespertino',
  },
  {
    id: 'A01234',
    name: 'Auxiliar de Farmácia - Turma Vespertino',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Mariana Costa',
    enrollments: 3,
    completionRate: 75,
    createdAt: '2024-06-12',
    period: 'Vespertino',
  },
  {
    id: 'A11235',
    name: 'Auxiliar Administrativo - Turma Matutino',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Carlos Silva',
    enrollments: 6,
    completionRate: 82,
    createdAt: '2024-06-18',
    period: 'Matutino',
  },
  {
    id: 'A22346',
    name: 'Recepcionista de Hotel - Turma Vespertino',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Ana Oliveira',
    enrollments: 4,
    completionRate: 86,
    createdAt: '2024-06-22',
    period: 'Vespertino',
  },
]

export default function CoursesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{
    field: SortField
    direction: SortDirection
  }>({
    field: null,
    direction: null,
  })

  // Estatísticas dos cursos
  const totalCourses = courses.length
  const totalEnrollments = courses.reduce(
    (sum, course) => sum + course.enrollments,
    0
  )

  const averageCompletionRate = courses
    .filter((c) => c.completionRate > 0)
    .reduce(
      (sum, course, _, array) => sum + course.completionRate / array.length,
      0
    )

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Função para ordenar
  const handleSort = (field: SortField) => {
    setSortConfig({
      field,
      direction:
        sortConfig.field === field && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    })
  }

  // Filtrar cursos por termo de busca
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Dashboard Cards - apenas 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DashboardCard
          title="Total de Cursos"
          value={totalCourses.toString()}
          description="Cursos publicados na plataforma"
          icon={<BookOpen className="h-5 w-5 text-purple-500" />}
          trend={'+2 este mês'}
          trendUp={true}
        />
        <DashboardCard
          title="Alunos Matriculados"
          value={totalEnrollments.toLocaleString('pt-BR')}
          description="Total de matrículas ativas"
          icon={<Users className="h-5 w-5 text-blue-500" />}
          trend={'+48 esta semana'}
          trendUp={true}
        />
        <DashboardCard
          title="Taxa de Conclusão"
          value={`${Math.round(averageCompletionRate)}%`}
          description="Média de conclusão dos cursos"
          icon={<TrendingUp className="h-5 w-5 text-green-500" />}
          trend={'+5% desde o último mês'}
          trendUp={true}
        />
      </div>

      {/* Seção principal com apenas busca */}
      <div className="flex flex-col space-y-4 bg-white px-7 rounded-lg py-7">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">Cursos Publicados</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie os cursos publicados na plataforma
            </p>
          </div>

          <div className="w-full sm:w-[300px]">
            <Search
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
            />
          </div>
        </div>

        {isLoading ? (
          <LoadingTable />
        ) : (
          <CoursesTable
            courses={filteredCourses}
            sortConfig={sortConfig}
            handleSort={handleSort}
          />
        )}

        <Pagination />
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  value,
  description,
  icon,
  trend,
  trendUp,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend: string
  trendUp: boolean
}) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div
          className={`flex items-center mt-2 text-xs ${trendUp ? 'text-green-600' : 'text-red-600'}`}
        >
          {trendUp ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
          )}
          {trend}
        </div>
      </CardContent>
    </Card>
  )
}

function Search({
  value,
  onChange,
  onClear,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}) {
  return (
    <div className="relative">
      <Input
        placeholder="Pesquisar por nome do curso..."
        className="pl-10 w-full pr-10"
        value={value}
        onChange={onChange}
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
      </div>
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
          onClick={onClear}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

function CoursesTable({
  courses,
  sortConfig,
  handleSort,
}: {
  courses: Course[]
  sortConfig: { field: SortField; direction: SortDirection }
  handleSort: (field: SortField) => void
}) {
  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-muted-foreground" />
    }

    return sortConfig.direction === 'asc' ? (
      <ArrowUpDown className="h-4 w-4 ml-1 text-foreground" />
    ) : (
      <ArrowUpDown className="h-4 w-4 ml-1 text-foreground rotate-180" />
    )
  }

  return (
    <div className="border rounded-md overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Nome do Curso
                {getSortIcon('name')}
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('instructor')}
              >
                Coordenador
                {getSortIcon('instructor')}
              </div>
            </TableHead>
            <TableHead>Matrículas</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow
              key={course.id}
              className="hover:bg-purple-50 transition-colors"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={course.thumbnail} alt={course.name} />
                    <AvatarFallback>{course.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{course.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {course.period}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{course.instructor}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{course.enrollments.toLocaleString('pt-BR')}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href="/dashboard/courses/courses/view">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary-500"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Visualizar detalhes</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function Pagination() {
  const pages = [1]

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground order-2 sm:order-1">
        Mostrando 1 a 9 resultados
      </div>
      <div className="flex items-center gap-1 order-1 sm:order-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Página anterior</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {pages.map((page, i) => (
          <Button
            key={i}
            variant={page === 1 ? 'default' : 'outline'}
            size="icon"
            className={cn('h-8 w-8', page === 1 && 'bg-secondary-600')}
          >
            {page}
          </Button>
        ))}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Próxima página</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

function LoadingTable() {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Curso</TableHead>
            <TableHead>Instrutor</TableHead>
            <TableHead>Matrículas</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20 mt-1" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
