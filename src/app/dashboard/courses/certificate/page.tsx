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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover/popover'
import { Label } from '@/components/ui/label/label'
import { Calendar } from '@/components/ui/calendar/calendar'
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
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  SearchIcon,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Tipagem dos Certificados
type Certificate = {
  id: string
  aluno: string
  curso: string
  dataEmissao: string
  validade: string
  nota: number
  status: 'emitido' | 'pendente' | 'expirado'
}

type SortDirection = 'asc' | 'desc' | null
type SortField = 'aluno' | 'curso' | 'dataEmissao' | 'nota' | null

// Dados fictícios de certificados
const certificados: Certificate[] = [
  {
    id: 'CERT001',
    aluno: 'Gabriel Oliveira',
    curso: 'React Avançado',
    dataEmissao: '15/11/2023',
    validade: '15/11/2025',
    nota: 9.5,
    status: 'emitido',
  },
  {
    id: 'CERT002',
    aluno: 'Juliana Santos',
    curso: 'Python para Data Science',
    dataEmissao: '10/10/2023',
    validade: '10/10/2025',
    nota: 8.7,
    status: 'emitido',
  },
  {
    id: 'CERT003',
    aluno: 'Lucas Ferreira',
    curso: 'Design de Interfaces',
    dataEmissao: '05/12/2023',
    validade: '05/12/2025',
    nota: 0,
    status: 'pendente',
  },
  {
    id: 'CERT004',
    aluno: 'Mariana Costa',
    curso: 'Marketing Digital',
    dataEmissao: '20/09/2022',
    validade: '20/09/2023',
    nota: 7.8,
    status: 'expirado',
  },
  {
    id: 'CERT005',
    aluno: 'Rafael Almeida',
    curso: 'Gestão de Projetos',
    dataEmissao: '01/11/2023',
    validade: '01/11/2025',
    nota: 9.0,
    status: 'emitido',
  },
  {
    id: 'CERT006',
    aluno: 'Camila Rodrigues',
    curso: 'Excel para Negócios',
    dataEmissao: '18/10/2023',
    validade: '18/10/2025',
    nota: 8.2,
    status: 'emitido',
  },
  {
    id: 'CERT007',
    aluno: 'Bruno Martins',
    curso: 'Introdução à Programação',
    dataEmissao: '25/11/2023',
    validade: '25/11/2025',
    nota: 0,
    status: 'pendente',
  },
  {
    id: 'CERT008',
    aluno: 'Fernanda Lima',
    curso: 'Ciência de Dados',
    dataEmissao: '30/09/2022',
    validade: '30/09/2023',
    nota: 7.0,
    status: 'expirado',
  },
]

// Dashboard - Cálculo de estatísticas
const totalCertificados = certificados.length
const emitidos = certificados.filter((c) => c.status === 'emitido').length
const pendentes = certificados.filter((c) => c.status === 'pendente').length
const expirados = certificados.filter((c) => c.status === 'expirado').length

// Página de Certificados
export default function CertificatesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string[]>([])
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

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Ordenação
  const handleSort = (field: SortField) => {
    setSortConfig({
      field,
      direction:
        sortConfig.field === field && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    })
  }

  // Limpar filtros
  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter([])
    setDateRange({ from: subDays(new Date(), 30), to: new Date() })
  }

  // Verificar se há filtros ativos
  const hasActiveFilters = searchTerm || statusFilter.length > 0

  // Filtrar certificados com base na aba ativa
  const getFilteredCertificates = () => {
    let filtered = [...certificados]
    if (activeTab === 'emitidos') {
      filtered = filtered.filter((cert) => cert.status === 'emitido')
    } else if (activeTab === 'pendentes') {
      filtered = filtered.filter((cert) => cert.status === 'pendente')
    } else if (activeTab === 'expirados') {
      filtered = filtered.filter((cert) => cert.status === 'expirado')
    }
    return filtered
  }

  const filteredCertificates = getFilteredCertificates()

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Dashboard de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total de Certificados"
          value={totalCertificados.toString()}
          description="Certificados emitidos e pendentes"
          icon={<BarChart3 className="h-5 w-5 text-purple-500" />}
          trend={`${emitidos} emitidos`}
          trendUp={true}
        />
        <DashboardCard
          title="Certificados Emitidos"
          value={emitidos.toString()}
          description="Certificados já emitidos aos alunos"
          icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
          trend="Atualizado"
          trendUp={true}
        />
        <DashboardCard
          title="Certificados Pendentes"
          value={pendentes.toString()}
          description="Aguardando emissão"
          icon={<Clock className="h-5 w-5 text-yellow-500" />}
          trend="Atenção"
          trendUp={false}
        />
        <DashboardCard
          title="Certificados Expirados"
          value={expirados.toString()}
          description="Período de validade encerrado"
          icon={<AlertCircle className="h-5 w-5 text-red-500" />}
          trend="Revisar"
          trendUp={false}
        />
      </div>

      {/* Filtros e Abas */}
      <div className="bg-white px-7 py-7 rounded-lg space-y-4">
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
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="emitidos"
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-900"
              >
                Emitidos
              </TabsTrigger>
              <TabsTrigger
                value="pendentes"
                className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-900"
              >
                Pendentes
              </TabsTrigger>
              <TabsTrigger
                value="expirados"
                className="data-[state=active]:bg-red-100 data-[state=active]:text-red-900"
              >
                Expirados
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
              <CertificatesTable
                certificates={filteredCertificates}
                sortConfig={sortConfig}
                handleSort={handleSort}
              />
            )}
          </TabsContent>
          <TabsContent value="emitidos" className="mt-4">
            {isLoading ? (
              <LoadingTable />
            ) : (
              <CertificatesTable
                certificates={filteredCertificates}
                sortConfig={sortConfig}
                handleSort={handleSort}
              />
            )}
          </TabsContent>
          <TabsContent value="pendentes" className="mt-4">
            {isLoading ? (
              <LoadingTable />
            ) : (
              <CertificatesTable
                certificates={filteredCertificates}
                sortConfig={sortConfig}
                handleSort={handleSort}
              />
            )}
          </TabsContent>
          <TabsContent value="expirados" className="mt-4">
            {isLoading ? (
              <LoadingTable />
            ) : (
              <CertificatesTable
                certificates={filteredCertificates}
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
                {status === 'emitido'
                  ? 'Emitido'
                  : status === 'pendente'
                    ? 'Pendente'
                    : 'Expirado'}
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

        <Pagination />
      </div>
    </div>
  )
}

// Componentes auxiliares

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
        placeholder="Pesquisar por ID, aluno ou curso..."
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
  clearFilters,
}: {
  statusFilter: string[]
  setStatusFilter: (value: string[]) => void
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
          {statusFilter.length > 0 && (
            <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {statusFilter.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 bg-white">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Status</h4>
            <div className="grid gap-2">
              {['emitido', 'pendente', 'expirado'].map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Label
                    htmlFor={`status-${status}`}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={`status-${status}`}
                      checked={statusFilter.includes(status)}
                      onChange={() => toggleStatus(status)}
                      className="rounded text-primary"
                    />
                    <span className="capitalize">{status}</span>
                  </Label>
                </div>
              ))}
            </div>
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

function CertificatesTable({
  certificates,
  sortConfig,
  handleSort,
}: {
  certificates: Certificate[]
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
                onClick={() => handleSort('aluno')}
              >
                Aluno
                {getSortIcon('aluno')}
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('curso')}
              >
                Curso
                {getSortIcon('curso')}
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('dataEmissao')}
              >
                Data de Emissão
                {getSortIcon('dataEmissao')}
              </div>
            </TableHead>
            <TableHead>Validade</TableHead>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('nota')}
              >
                Nota Final
                {getSortIcon('nota')}
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates.map((cert) => (
            <TableRow
              key={cert.id}
              className="hover:bg-purple-50 transition-colors"
            >
              <TableCell>
                <div className="font-medium">{cert.aluno}</div>
                <div className="text-xs text-muted-foreground">
                  ID: {cert.id}
                </div>
              </TableCell>
              <TableCell>{cert.curso}</TableCell>
              <TableCell>{cert.dataEmissao}</TableCell>
              <TableCell>{cert.validade}</TableCell>
              <TableCell>
                {cert.nota > 0 ? cert.nota.toFixed(1) : '—'}
              </TableCell>
              <TableCell>
                <StatusBadge status={cert.status} />
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
                        <p>Editar certificado</p>
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
    emitido: {
      label: 'Emitido',
      className: 'bg-green-100 text-green-800 hover:bg-green-100',
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    },
    pendente: {
      label: 'Pendente',
      className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    expirado: {
      label: 'Expirado',
      className: 'bg-red-100 text-red-800 hover:bg-red-100',
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
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
  const pages = [1, 2, 3, 4, '...', 10, 11]
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground order-2 sm:order-1">
        Mostrando 1 a 10 de {totalCertificados} resultados
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
            <TableHead>Aluno</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Data de Emissão</TableHead>
            <TableHead>Validade</TableHead>
            <TableHead>Nota Final</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20 mt-1" />
                </div>
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
                <Skeleton className="h-6 w-16 rounded-full" />
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
