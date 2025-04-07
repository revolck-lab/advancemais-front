'use client'

import type React from 'react'

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
  Eye,
  FileEdit,
  Filter,
  Download,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  SearchIcon,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react'
import { format, subDays } from 'date-fns'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

// Tipos
type Student = {
  id: string
  name: string
  avatar: string
  course: string
  joinDate: string
  earning: string
  balance: string
  status: 'active' | 'suspend' | 'pending'
  email?: string
}

type SortDirection = 'asc' | 'desc' | null
type SortField = 'name' | 'course' | 'joinDate' | 'earning' | 'balance' | null

const students: Student[] = [
  {
    id: 'A12345',
    name: 'Gabriel Oliveira',
    avatar: '/placeholder.svg?height=40&width=40',
    course: 'Engenharia de Software',
    joinDate: '05/01/2024',
    earning: 'R$ 4.450,00',
    balance: 'R$ 445,00',
    status: 'active',
    email: 'gabriel.oliveira@exemplo.com.br',
  },
  {
    id: 'B23456',
    name: 'Juliana Santos',
    avatar: '/placeholder.svg?height=40&width=40',
    course: 'Ciência de Dados',
    joinDate: '05/01/2024',
    earning: 'R$ 4.450,00',
    balance: 'R$ 445,00',
    status: 'suspend',
    email: 'juliana.santos@exemplo.com.br',
  },
  {
    id: 'C34567',
    name: 'Lucas Ferreira',
    avatar: '/placeholder.svg?height=40&width=40',
    course: 'Desenvolvimento Web',
    joinDate: '05/01/2024',
    earning: 'R$ 4.450,00',
    balance: 'R$ 445,00',
    status: 'active',
    email: 'lucas.ferreira@exemplo.com.br',
  },
  {
    id: 'D45678',
    name: 'Mariana Costa',
    avatar: '/placeholder.svg?height=40&width=40',
    course: 'UX/UI Design',
    joinDate: '05/01/2024',
    earning: 'R$ 4.450,00',
    balance: 'R$ 445,00',
    status: 'pending',
    email: 'mariana.costa@exemplo.com.br',
  },
  {
    id: 'E56789',
    name: 'Rafael Almeida',
    avatar: '/placeholder.svg?height=40&width=40',
    course: 'Desenvolvimento Web',
    joinDate: '05/01/2024',
    earning: 'R$ 4.450,00',
    balance: 'R$ 445,00',
    status: 'active',
    email: 'rafael.almeida@exemplo.com.br',
  },
  {
    id: 'F67890',
    name: 'Camila Rodrigues',
    avatar: '/placeholder.svg?height=40&width=40',
    course: 'Marketing Digital',
    joinDate: '05/01/2024',
    earning: 'R$ 4.450,00',
    balance: 'R$ 445,00',
    status: 'active',
    email: 'camila.rodrigues@exemplo.com.br',
  },
  {
    id: 'G78901',
    name: 'Bruno Martins',
    avatar: '/placeholder.svg?height=40&width=40',
    course: 'Engenharia de Software',
    joinDate: '05/01/2024',
    earning: 'R$ 4.450,00',
    balance: 'R$ 445,00',
    status: 'active',
    email: 'bruno.martins@exemplo.com.br',
  },
  {
    id: 'H89012',
    name: 'Fernanda Lima',
    avatar: '/placeholder.svg?height=40&width=40',
    course: 'Ciência de Dados',
    joinDate: '05/01/2024',
    earning: 'R$ 4.450,00',
    balance: 'R$ 445,00',
    status: 'active',
    email: 'fernanda.lima@exemplo.com.br',
  },
  {
    id: 'I90123',
    name: 'Thiago Souza',
    avatar: '/placeholder.svg?height=40&width=40',
    course: 'Desenvolvimento Web',
    joinDate: '05/01/2024',
    earning: 'R$ 4.450,00',
    balance: 'R$ 445,00',
    status: 'active',
    email: 'thiago.souza@exemplo.com.br',
  },
  {
    id: 'J01234',
    name: 'Amanda Pereira',
    avatar: '/placeholder.svg?height=40&width=40',
    course: 'UX/UI Design',
    joinDate: '05/01/2024',
    earning: 'R$ 4.450,00',
    balance: 'R$ 445,00',
    status: 'active',
    email: 'amanda.pereira@exemplo.com.br',
  },
]

export default function StudentsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [courseFilter, setCourseFilter] = useState<string | null>(null)
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
    setCourseFilter(null)
    setDateRange({
      from: subDays(new Date(), 30),
      to: new Date(),
    })
  }

  // Verificar se há filtros ativos
  const hasActiveFilters = searchTerm || statusFilter.length > 0 || courseFilter

  return (
    <div className="container mx-auto py-6 space-y-6 bg-white px-5 border-1 rounded-md mb-10">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-[300px]">
          <Search
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterButton
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            courseFilter={courseFilter}
            setCourseFilter={setCourseFilter}
            clearFilters={clearFilters}
          />
          <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Exportar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Exportar lista de alunos</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">Filtros ativos:</span>
          {searchTerm && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-white"
            >
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
              {status === 'active'
                ? 'Ativo'
                : status === 'suspend'
                  ? 'Suspenso'
                  : 'Pendente'}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() =>
                  setStatusFilter((prev) => prev.filter((s) => s !== status))
                }
              />
            </Badge>
          ))}
          {courseFilter && (
            <Badge variant="outline" className="flex items-center gap-1">
              Curso: {courseFilter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setCourseFilter(null)}
              />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Limpar todos
          </Button>
        </div>
      )}

      {isLoading ? (
        <LoadingTable />
      ) : (
        <StudentsTable sortConfig={sortConfig} handleSort={handleSort} />
      )}

      <Pagination />
    </div>
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
        placeholder="Pesquisar por ID, nome, curso..."
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
  courseFilter,
  setCourseFilter,
  clearFilters,
}: {
  statusFilter: string[]
  setStatusFilter: (value: string[]) => void
  courseFilter: string | null
  setCourseFilter: (value: string | null) => void
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
          {(statusFilter.length > 0 || courseFilter) && (
            <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {statusFilter.length + (courseFilter ? 1 : 0)}
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
                  htmlFor="status-active"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="status-active"
                    checked={statusFilter.includes('active')}
                    onChange={() => toggleStatus('active')}
                    className="rounded text-primary"
                  />
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Ativo
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="status-suspend"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="status-suspend"
                    checked={statusFilter.includes('suspend')}
                    onChange={() => toggleStatus('suspend')}
                    className="rounded text-primary"
                  />
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  Suspenso
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="status-pending"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="status-pending"
                    checked={statusFilter.includes('pending')}
                    onChange={() => toggleStatus('pending')}
                    className="rounded text-primary"
                  />
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  Pendente
                </Label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Curso</h4>
            <Select
              value={courseFilter || ''}
              onValueChange={(value) => setCourseFilter(value || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os cursos</SelectItem>
                <SelectItem value="Engenharia de Software">
                  Engenharia de Software
                </SelectItem>
                <SelectItem value="Ciência de Dados">
                  Ciência de Dados
                </SelectItem>
                <SelectItem value="Desenvolvimento Web">
                  Desenvolvimento Web
                </SelectItem>
                <SelectItem value="UX/UI Design">UX/UI Design</SelectItem>
                <SelectItem value="Marketing Digital">
                  Marketing Digital
                </SelectItem>
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

function StudentsTable({
  sortConfig,
  handleSort,
}: {
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
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Nome
                {getSortIcon('name')}
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('course')}
              >
                Curso
                {getSortIcon('course')}
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('joinDate')}
              >
                Data de Ingresso
                {getSortIcon('joinDate')}
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('earning')}
              >
                Ganhos
                {getSortIcon('earning')}
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('balance')}
              >
                Saldo
                {getSortIcon('balance')}
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.name}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="bg-primary-500 text-white">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">
                      #{student.id}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell>{student.joinDate}</TableCell>
              <TableCell>{student.earning}</TableCell>
              <TableCell>{student.balance}</TableCell>
              <TableCell>
                <StatusBadge status={student.status} />
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
                        <p>Editar aluno</p>
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

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    active: {
      label: 'Ativo',
      className: 'bg-green-100 text-green-800 hover:bg-green-100',
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    },
    suspend: {
      label: 'Suspenso',
      className: 'bg-red-100 text-red-800 hover:bg-red-100',
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
    },
    pending: {
      label: 'Pendente',
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
            <TableHead>Nome</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Data de Ingresso</TableHead>
            <TableHead>Ganhos</TableHead>
            <TableHead>Saldo</TableHead>
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
                <Skeleton className="h-4 w-10" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
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
