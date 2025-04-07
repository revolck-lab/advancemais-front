'use client'

import { useState, useEffect } from 'react'
import { format, subDays } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table'
import { Badge } from '@/components/ui/badge/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Skeleton } from '@/components/ui/skeleton/skeleton'
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip/tooltip'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs/tabs'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card/card'
import {
  Eye,
  FileEdit,
  Plus,
  Download,
  SearchIcon,
  X,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// -------------------------
// Tipagem das Provas
// -------------------------
type ExamStatus = 'agendada' | 'em andamento' | 'finalizada'

type Exam = {
  id: string
  titulo: string
  disciplina: string
  dataInicio: string
  dataFim: string
  status: ExamStatus
  totalAlunos: number
  aprovados: number
  reprovados: number
}

// Tipos para ordenação e filtros
type SortDirection = 'asc' | 'desc' | null
type SortField = 'titulo' | 'disciplina' | 'dataInicio' | 'totalAlunos' | null

// -------------------------
// Dados fictícios de Provas
// -------------------------
const provas: Exam[] = [
  {
    id: 'EX001',
    titulo: 'Prova de Matemática - 1º Bimestre',
    disciplina: 'Matemática',
    dataInicio: '2023-11-20T08:00:00',
    dataFim: '2023-11-20T10:00:00',
    status: 'agendada',
    totalAlunos: 120,
    aprovados: 0,
    reprovados: 0,
  },
  {
    id: 'EX002',
    titulo: 'Prova de História - 1º Bimestre',
    disciplina: 'História',
    dataInicio: '2023-11-15T09:00:00',
    dataFim: '2023-11-15T11:00:00',
    status: 'finalizada',
    totalAlunos: 100,
    aprovados: 85,
    reprovados: 15,
  },
  {
    id: 'EX003',
    titulo: 'Prova de Química - 1º Bimestre',
    disciplina: 'Química',
    dataInicio: '2023-11-18T13:00:00',
    dataFim: '2023-11-18T15:00:00',
    status: 'em andamento',
    totalAlunos: 90,
    aprovados: 45,
    reprovados: 10,
  },
  {
    id: 'EX004',
    titulo: 'Prova de Geografia - 1º Bimestre',
    disciplina: 'Geografia',
    dataInicio: '2023-11-10T08:00:00',
    dataFim: '2023-11-10T10:00:00',
    status: 'finalizada',
    totalAlunos: 110,
    aprovados: 95,
    reprovados: 15,
  },
  {
    id: 'EX005',
    titulo: 'Prova de Português - 1º Bimestre',
    disciplina: 'Português',
    dataInicio: '2023-11-22T10:00:00',
    dataFim: '2023-11-22T12:00:00',
    status: 'agendada',
    totalAlunos: 130,
    aprovados: 0,
    reprovados: 0,
  },
]

// -------------------------
// Dashboard de Métricas
// -------------------------
const totalProvas = provas.length
const provasAgendadas = provas.filter((p) => p.status === 'agendada').length
const provasEmAndamento = provas.filter(
  (p) => p.status === 'em andamento'
).length
const provasFinalizadas = provas.filter((p) => p.status === 'finalizada').length

// -------------------------
// Página de Provas
// -------------------------
export default function ExamsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [, setDateRange] = useState<{
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

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Função para ordenar a tabela
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
    setDateRange({ from: subDays(new Date(), 30), to: new Date() })
  }

  // Verificar se há filtros ativos
  const hasActiveFilters = searchTerm || statusFilter.length > 0

  // Filtrar provas com base na aba ativa
  const getFilteredExams = () => {
    let filtered = [...provas]
    if (activeTab === 'agendadas') {
      filtered = filtered.filter((exam) => exam.status === 'agendada')
    } else if (activeTab === 'andamento') {
      filtered = filtered.filter((exam) => exam.status === 'em andamento')
    } else if (activeTab === 'finalizadas') {
      filtered = filtered.filter((exam) => exam.status === 'finalizada')
    }
    // Filtros adicionais (ex.: busca) podem ser aplicados aqui
    if (searchTerm) {
      filtered = filtered.filter(
        (exam) =>
          exam.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exam.disciplina.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return filtered
  }

  const filteredExams = getFilteredExams()

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Dashboard com Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total de Provas"
          value={totalProvas.toString()}
          description="Provas cadastradas"
          icon={<TrendingUp className="h-5 w-5 text-purple-500" />}
          trend={`${totalProvas} provas`}
          trendUp={true}
        />
        <DashboardCard
          title="Agendadas"
          value={provasAgendadas.toString()}
          description="Provas que ainda vão acontecer"
          icon={<CalendarIcon className="h-5 w-5 text-blue-500" />}
          trend="Aguardando"
          trendUp={true}
        />
        <DashboardCard
          title="Em Andamento"
          value={provasEmAndamento.toString()}
          description="Provas em curso"
          icon={<Eye className="h-5 w-5 text-yellow-500" />}
          trend="Verifique já"
          trendUp={true}
        />
        <DashboardCard
          title="Finalizadas"
          value={provasFinalizadas.toString()}
          description="Provas concluídas"
          icon={<TrendingDown className="h-5 w-5 text-green-500" />}
          trend="Resultados Disponíveis"
          trendUp={true}
        />
      </div>

      {/* Linha superior: abas à esquerda e controles à direita */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Abas de status */}
        <Tabs defaultValue="todos" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger
              value="todos"
              className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900"
            >
              Todos ({provas.length})
            </TabsTrigger>
            <TabsTrigger
              value="agendadas"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
            >
              Agendadas
            </TabsTrigger>
            <TabsTrigger
              value="andamento"
              className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-900"
            >
              Em Andamento
            </TabsTrigger>
            <TabsTrigger
              value="finalizadas"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-900"
            >
              Finalizadas
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Controles: busca, filtro e exportação */}
        <div className="flex items-center gap-2">
          <div className="relative w-[300px]">
            <Search
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Exportar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Exportar lista de provas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* O botão de "Criar Nova Prova" pode ser integrado aos atalhos visuais abaixo */}
          <Button variant="default" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Prova
          </Button>
        </div>
      </div>

      {/* Área de filtros adicionais */}
      <div className="bg-white px-7 py-7 rounded-lg space-y-4">
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
                Status: {status}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setStatusFilter((prev) => prev.filter((s) => s !== status))
                  }
                />
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Limpar todos
            </Button>
          </div>
        )}

        {/* Tabela de Provas */}
        {isLoading ? (
          <LoadingTable />
        ) : (
          <ExamsTable
            exams={filteredExams}
            sortConfig={sortConfig}
            handleSort={handleSort}
          />
        )}

        <Pagination />
      </div>
    </div>
  )
}

// -------------------------
// Componentes Auxiliares
// -------------------------

// Dashboard Card
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
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          {trend}
        </div>
      </CardContent>
    </Card>
  )
}

// Barra de Busca
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
        placeholder="Pesquisar por título ou disciplina..."
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

// Tabela de Provas
function ExamsTable({
  exams,
  sortConfig,
  handleSort,
}: {
  exams: Exam[]
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
                onClick={() => handleSort('titulo')}
              >
                Título
                {getSortIcon('titulo')}
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('disciplina')}
              >
                Disciplina
                {getSortIcon('disciplina')}
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('dataInicio')}
              >
                Início
                {getSortIcon('dataInicio')}
              </div>
            </TableHead>
            <TableHead>Fim</TableHead>
            <TableHead>Alunos</TableHead>
            <TableHead>Aprovados / Reprovados</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.map((exam) => (
            <TableRow
              key={exam.id}
              className="hover:bg-purple-50 transition-colors"
            >
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{exam.titulo}</span>
                  <span className="text-xs text-muted-foreground">
                    ID: {exam.id}
                  </span>
                </div>
              </TableCell>
              <TableCell>{exam.disciplina}</TableCell>
              <TableCell>
                {format(new Date(exam.dataInicio), 'dd/MM/yyyy HH:mm')}
              </TableCell>
              <TableCell>
                {format(new Date(exam.dataFim), 'dd/MM/yyyy HH:mm')}
              </TableCell>
              <TableCell>{exam.totalAlunos}</TableCell>
              <TableCell>
                <div className="flex flex-col text-xs">
                  <span>Aprovados: {exam.aprovados}</span>
                  <span>Reprovados: {exam.reprovados}</span>
                </div>
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
                        <p>Editar prova</p>
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

// Paginação (exemplo simples)
function Pagination() {
  const pages = [1, 2, 3, 4, '...', 5]
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
      <div className="text-sm text-muted-foreground order-2 sm:order-1">
        Mostrando 1 a {pages.length} de {provas.length} resultados
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

// Skeleton de Carregamento para a Tabela
function LoadingTable() {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Disciplina</TableHead>
            <TableHead>Início</TableHead>
            <TableHead>Fim</TableHead>
            <TableHead>Alunos</TableHead>
            <TableHead>Aprovados / Reprovados</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-20 mt-1" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-28" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
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
