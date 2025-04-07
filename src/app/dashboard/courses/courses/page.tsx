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
import { Badge } from '@/components/ui/badge/badge'
import { Calendar } from '@/components/ui/calendar/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Dialog, DialogTrigger } from '@/components/ui/dialog/dialog'
import { Label } from '@/components/ui/label/label'
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import {
  Eye,
  FileEdit,
  Filter,
  Download,
  Plus,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  SearchIcon,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  BookOpen,
  Users,
  TrendingUp,
  BarChart3,
  Layers,
  MoreHorizontal,
  Star,
  StarHalf,
} from 'lucide-react'
import { format, subDays } from 'date-fns'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

// Tipos
type Course = {
  id: string
  name: string
  thumbnail: string
  instructor: string
  price: string
  lessons: number
  duration: string
  status: 'published' | 'paused' | 'upcoming'
  category: string
  enrollments: number
  rating: number
  completionRate: number
  revenue: string
  createdAt: string
}

type SortDirection = 'asc' | 'desc' | null
type SortField = 'name' | 'instructor' | 'price' | 'lessons' | 'duration' | null

const courses: Course[] = [
  {
    id: 'C12345',
    name: 'Desenvolvimento Web com React',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Rodrigo Oliveira',
    price: 'R$ 397,00',
    lessons: 24,
    duration: '48 horas',
    status: 'published',
    category: 'Programação',
    enrollments: 562,
    rating: 4.8,
    completionRate: 78,
    revenue: 'R$ 223.114,00',
    createdAt: '2023-10-15',
  },
  {
    id: 'C23456',
    name: 'Python para Ciência de Dados',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Camila Santos',
    price: 'R$ 497,00',
    lessons: 32,
    duration: '64 horas',
    status: 'published',
    category: 'Ciência de Dados',
    enrollments: 428,
    rating: 4.7,
    completionRate: 65,
    revenue: 'R$ 212.716,00',
    createdAt: '2023-11-05',
  },
  {
    id: 'C34567',
    name: 'Marketing Digital Completo',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Fernanda Lima',
    price: 'R$ 397,00',
    lessons: 20,
    duration: '40 horas',
    status: 'paused',
    category: 'Marketing',
    enrollments: 315,
    rating: 4.2,
    completionRate: 52,
    revenue: 'R$ 125.055,00',
    createdAt: '2023-09-20',
  },
  {
    id: 'C45678',
    name: 'Design de Interfaces UX/UI',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Bruno Martins',
    price: 'R$ 447,00',
    lessons: 28,
    duration: '56 horas',
    status: 'published',
    category: 'Design',
    enrollments: 289,
    rating: 4.9,
    completionRate: 81,
    revenue: 'R$ 129.183,00',
    createdAt: '2023-12-10',
  },
  {
    id: 'C56789',
    name: 'Gestão Ágil de Projetos',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Amanda Pereira',
    price: 'R$ 347,00',
    lessons: 18,
    duration: '36 horas',
    status: 'upcoming',
    category: 'Gestão',
    enrollments: 0,
    rating: 0,
    completionRate: 0,
    revenue: 'R$ 0,00',
    createdAt: '2024-04-01',
  },
  {
    id: 'C67890',
    name: 'Excel Avançado para Negócios',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Rafael Almeida',
    price: 'R$ 297,00',
    lessons: 16,
    duration: '32 horas',
    status: 'published',
    category: 'Negócios',
    enrollments: 476,
    rating: 4.5,
    completionRate: 92,
    revenue: 'R$ 141.372,00',
    createdAt: '2023-08-15',
  },
  {
    id: 'C78901',
    name: 'Fotografia Profissional',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Juliana Costa',
    price: 'R$ 397,00',
    lessons: 22,
    duration: '44 horas',
    status: 'paused',
    category: 'Fotografia',
    enrollments: 183,
    rating: 3.9,
    completionRate: 45,
    revenue: 'R$ 72.651,00',
    createdAt: '2023-07-20',
  },
  {
    id: 'C89012',
    name: 'Desenvolvimento Mobile com Flutter',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Lucas Ferreira',
    price: 'R$ 497,00',
    lessons: 30,
    duration: '60 horas',
    status: 'published',
    category: 'Programação',
    enrollments: 342,
    rating: 4.6,
    completionRate: 73,
    revenue: 'R$ 169.974,00',
    createdAt: '2023-10-25',
  },
  {
    id: 'C90123',
    name: 'Inteligência Artificial: Fundamentos',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Thiago Souza',
    price: 'R$ 597,00',
    lessons: 36,
    duration: '72 horas',
    status: 'upcoming',
    category: 'Ciência de Dados',
    enrollments: 0,
    rating: 0,
    completionRate: 0,
    revenue: 'R$ 0,00',
    createdAt: '2024-04-15',
  },
  {
    id: 'C01234',
    name: 'Copywriting e Produção de Conteúdo',
    thumbnail: '/placeholder.svg?height=40&width=40',
    instructor: 'Mariana Costa',
    price: 'R$ 347,00',
    lessons: 20,
    duration: '40 horas',
    status: 'published',
    category: 'Marketing',
    enrollments: 256,
    rating: 4.4,
    completionRate: 68,
    revenue: 'R$ 88.832,00',
    createdAt: '2023-11-30',
  },
]

function AddCourseDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Link href="/dashboard/courses/courses/create">
          <Button variant="default" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Curso
          </Button>
        </Link>
      </DialogTrigger>
    </Dialog>
  )
}

export default function CoursesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [sortConfig, setSortConfig] = useState<{
    field: SortField
    direction: SortDirection
  }>({
    field: null,
    direction: null,
  })
  const [activeTab, setActiveTab] = useState('todos')

  // Estatísticas
  const totalCourses = courses.length
  const totalEnrollments = courses.reduce(
    (sum, course) => sum + course.enrollments,
    0
  )
  const totalRevenue = courses.reduce((sum, course) => {
    const value = Number.parseFloat(
      course.revenue.replace('R$ ', '').replace('.', '').replace(',', '.')
    )
    return sum + value
  }, 0)

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

  // Função para limpar filtros
  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter([])
    setCategoryFilter(null)
    setDateRange({
      from: subDays(new Date(), 30),
      to: new Date(),
    })
  }

  // Verificar se há filtros ativos
  const hasActiveFilters =
    searchTerm || statusFilter.length > 0 || categoryFilter

  // Filtrar cursos com base na tab ativa
  const getFilteredCourses = () => {
    let filtered = [...courses]

    if (activeTab === 'publicados') {
      filtered = filtered.filter((course) => course.status === 'published')
    } else if (activeTab === 'pausados') {
      filtered = filtered.filter((course) => course.status === 'paused')
    } else if (activeTab === 'embreve') {
      filtered = filtered.filter((course) => course.status === 'upcoming')
    }

    return filtered
  }

  const filteredCourses = getFilteredCourses()

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-end items-start gap-4">
        <div className="flex gap-2 w-full sm:w-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Exportar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Exportar lista de cursos</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <AddCourseDialog />
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total de Cursos"
          value={totalCourses.toString()}
          description="Cursos cadastrados na plataforma"
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
        <DashboardCard
          title="Receita Total"
          value={`R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          description="Receita gerada pelos cursos"
          icon={<BarChart3 className="h-5 w-5 text-emerald-500" />}
          trend={'+12% este mês'}
          trendUp={true}
        />
      </div>

      {/* Tabs e Filtros */}
      <div className="flex flex-col space-y-4 bg-white px-7 rounded-lg py-7">
        <Tabs
          defaultValue="todos"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger
                value="todos"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900"
              >
                Todos os Cursos
              </TabsTrigger>
              <TabsTrigger
                value="publicados"
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-900"
              >
                Publicados
              </TabsTrigger>
              <TabsTrigger
                value="pausados"
                className="data-[state=active]:bg-red-100 data-[state=active]:text-red-900"
              >
                Pausados
              </TabsTrigger>
              <TabsTrigger
                value="embreve"
                className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-900"
              >
                Em Breve
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-[300px]">
                <Search
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClear={() => setSearchTerm('')}
                />
              </div>
              <FilterButton
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                clearFilters={clearFilters}
              />
              <DateRangePicker
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </div>
          </div>

          <TabsContent value="todos" className="mt-4">
            {isLoading ? (
              <LoadingTable />
            ) : (
              <CoursesTable
                courses={courses}
                sortConfig={sortConfig}
                handleSort={handleSort}
              />
            )}
          </TabsContent>

          <TabsContent value="publicados" className="mt-4">
            {isLoading ? (
              <LoadingTable />
            ) : (
              <CoursesTable
                courses={filteredCourses}
                sortConfig={sortConfig}
                handleSort={handleSort}
              />
            )}
          </TabsContent>

          <TabsContent value="pausados" className="mt-4">
            {isLoading ? (
              <LoadingTable />
            ) : (
              <CoursesTable
                courses={filteredCourses}
                sortConfig={sortConfig}
                handleSort={handleSort}
              />
            )}
          </TabsContent>

          <TabsContent value="embreve" className="mt-4">
            {isLoading ? (
              <LoadingTable />
            ) : (
              <CoursesTable
                courses={filteredCourses}
                sortConfig={sortConfig}
                handleSort={handleSort}
              />
            )}
          </TabsContent>
        </Tabs>

        {hasActiveFilters && (
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Filtros ativos:</span>
            {searchTerm && (
              <Badge variant="outline" className="flex items-center gap-1">
                Busca: {searchTerm}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSearchTerm('')}
                />
              </Badge>
            )}
            {statusFilter.map((status) => (
              <Badge
                key={status}
                variant="outline"
                className="flex items-center gap-1"
              >
                Status:{' '}
                {status === 'published'
                  ? 'Publicado'
                  : status === 'paused'
                    ? 'Pausado'
                    : 'Em breve'}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setStatusFilter((prev) => prev.filter((s) => s !== status))
                  }
                />
              </Badge>
            ))}
            {categoryFilter && (
              <Badge variant="outline" className="flex items-center gap-1">
                Categoria: {categoryFilter}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setCategoryFilter(null)}
                />
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Limpar todos
            </Button>
          </div>
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
        placeholder="Pesquisar por ID, nome, coorde..."
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

function FilterButton({
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  clearFilters,
}: {
  statusFilter: string[]
  setStatusFilter: (value: string[]) => void
  categoryFilter: string | null
  setCategoryFilter: (value: string | null) => void
  clearFilters: () => void
}) {
  const toggleStatus = (status: string) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter((s) => s !== status))
    } else {
      setStatusFilter([...statusFilter, status])
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filtrar</span>
          {(statusFilter.length > 0 || categoryFilter) && (
            <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {statusFilter.length + (categoryFilter ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Status</h4>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="status-published"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="status-published"
                    checked={statusFilter.includes('published')}
                    onChange={() => toggleStatus('published')}
                    className="rounded text-primary"
                  />
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Publicado
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="status-paused"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="status-paused"
                    checked={statusFilter.includes('paused')}
                    onChange={() => toggleStatus('paused')}
                    className="rounded text-primary"
                  />
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  Pausado
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="status-upcoming"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="status-upcoming"
                    checked={statusFilter.includes('upcoming')}
                    onChange={() => toggleStatus('upcoming')}
                    className="rounded text-primary"
                  />
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  Em breve
                </Label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Categoria</h4>
            <Select
              value={categoryFilter || 'all'}
              onValueChange={(value) =>
                setCategoryFilter(value === 'all' ? null : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="Programação">Programação</SelectItem>
                <SelectItem value="Ciência de Dados">
                  Ciência de Dados
                </SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Negócios">Negócios</SelectItem>
                <SelectItem value="Gestão">Gestão</SelectItem>
                <SelectItem value="Fotografia">Fotografia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={clearFilters}>
              Limpar
            </Button>
            <Button>Aplicar Filtros</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function DateRangePicker({
  dateRange,
  setDateRange,
}: {
  dateRange: { from: Date | undefined; to: Date | undefined }
  setDateRange: (value: {
    from: Date | undefined
    to: Date | undefined
  }) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 justify-start"
        >
          <CalendarIcon className="h-4 w-4" />
          <span className="hidden sm:inline">
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'dd/MM/yy')} -{' '}
                  {format(dateRange.to, 'dd/MM/yy')}
                </>
              ) : (
                format(dateRange.from, 'dd/MM/yy')
              )
            ) : (
              'Selecionar período'
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white" align="end">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={(range) =>
            setDateRange({ from: range?.from, to: range?.to })
          }
          initialFocus
          numberOfMonths={2}
        />
        <div className="p-3 border-t border-border flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDateRange({ from: undefined, to: undefined })}
          >
            Limpar
          </Button>
          <Button
            size="sm"
            onClick={() =>
              setDateRange({
                from: subDays(new Date(), 30),
                to: new Date(),
              })
            }
          >
            Últimos 30 dias
          </Button>
        </div>
      </PopoverContent>
    </Popover>
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
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('price')}
              >
                Preço
                {getSortIcon('price')}
              </div>
            </TableHead>
            <TableHead>Matrículas</TableHead>
            <TableHead>Avaliação</TableHead>
            <TableHead>Status</TableHead>
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
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Layers className="h-3 w-3" /> {course.lessons} aulas •{' '}
                      {course.duration}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{course.instructor}</TableCell>
              <TableCell>{course.price}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{course.enrollments.toLocaleString('pt-BR')}</span>
                </div>
              </TableCell>
              <TableCell>
                {course.rating > 0 ? (
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>
                          {star <= Math.floor(course.rating) ? (
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ) : star - 0.5 <= course.rating ? (
                            <StarHalf className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ) : (
                            <Star className="h-3 w-3 text-gray-300" />
                          )}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm">{course.rating.toFixed(1)}</span>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Sem avaliações
                  </span>
                )}
              </TableCell>
              <TableCell>
                <StatusBadge status={course.status} />
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary-500"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Visualizar detalhes</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary-500"
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar curso</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-48 p-2 bg-white">
                      <div className="grid gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Ver alunos
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start"
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Estatísticas
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    published: {
      label: 'Publicado',
      className: 'bg-green-100 text-green-800 hover:bg-green-100',
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    },
    paused: {
      label: 'Pausado',
      className: 'bg-red-100 text-red-800 hover:bg-red-100',
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
    },
    upcoming: {
      label: 'Em breve',
      className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
  }

  const config = statusConfig[status as keyof typeof statusConfig]

  return (
    <Badge className={cn('font-normal flex items-center', config.className)}>
      {config.icon}
      {config.label}
    </Badge>
  )
}

function Pagination() {
  const pages = [1, 2, 3, 4, '...', 20, 21]

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground order-2 sm:order-1">
        Mostrando 1 a 10 de 97 resultados
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
            <TableHead>Preço</TableHead>
            <TableHead>Matrículas</TableHead>
            <TableHead>Avaliação</TableHead>
            <TableHead>Status</TableHead>
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
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16 rounded-full" />
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
