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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Label } from '@/components/ui/label/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs/tabs'
import {
  Download,
  Filter,
  SearchIcon,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  FileEdit,
  Eye,
  File,
  Video,
  Globe,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// -------------------------------------
// Tipagem
// -------------------------------------
type LibraryItem = {
  id: string
  status: 'Publicado' | 'Rascunho' | 'Privado'
  titulo: string
  tipo: 'Arquivo' | 'Vídeo' | 'URL' | 'Outros'
  tamanho: string
  dataCriacao: string
}

// Filtro para data
type SortDirection = 'asc' | 'desc' | null
type SortField = 'titulo' | 'tipo' | 'status' | 'tamanho' | 'dataCriacao' | null

// -------------------------------------
// Dados fictícios
// -------------------------------------
const biblioteca: LibraryItem[] = [
  {
    id: 'BIB001',
    status: 'Publicado',
    titulo: 'Aula Exemplo',
    tipo: 'Arquivo',
    tamanho: '60,2 KB',
    dataCriacao: '2023-10-01',
  },
  {
    id: 'BIB002',
    status: 'Publicado',
    titulo: 'Aula Exemplo',
    tipo: 'Vídeo',
    tamanho: '—',
    dataCriacao: '2023-10-05',
  },
  {
    id: 'BIB003',
    status: 'Rascunho',
    titulo: 'Apresentação de Marketing',
    tipo: 'Arquivo',
    tamanho: '1,2 MB',
    dataCriacao: '2023-09-15',
  },
  {
    id: 'BIB004',
    status: 'Privado',
    titulo: 'Treinamento Interno',
    tipo: 'Vídeo',
    tamanho: '—',
    dataCriacao: '2023-08-20',
  },
  {
    id: 'BIB005',
    status: 'Publicado',
    titulo: 'Landing Page - Guia',
    tipo: 'URL',
    tamanho: '—',
    dataCriacao: '2023-11-02',
  },
]

// Simulando métricas da biblioteca
const espacoEmDiscoUtilizadoGB = 1.23
const espacoEmDiscoTotalGB = 6.0
const percentualUso = (
  (espacoEmDiscoUtilizadoGB / espacoEmDiscoTotalGB) *
  100
).toFixed(0)
const totalArquivos = biblioteca.length

// -------------------------------------
// Componente Principal
// -------------------------------------
export default function BibliotecaPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [tipoFilter, setTipoFilter] = useState<string | null>(null)
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

  // Função de ordenação
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
    setTipoFilter(null)
    setDateRange({ from: subDays(new Date(), 30), to: new Date() })
  }

  // Verificar se há filtros ativos
  const hasActiveFilters = searchTerm || statusFilter.length > 0 || tipoFilter

  // Filtrar dados com base na aba ativa
  const getFilteredItems = () => {
    let filtered = [...biblioteca]

    if (activeTab === 'publicados') {
      filtered = filtered.filter((item) => item.status === 'Publicado')
    } else if (activeTab === 'rascunhos') {
      filtered = filtered.filter((item) => item.status === 'Rascunho')
    } else if (activeTab === 'privados') {
      filtered = filtered.filter((item) => item.status === 'Privado')
    }

    return filtered
  }

  const filteredItems = getFilteredItems()

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Botões de Formatos */}
      <div className="flex flex-wrap gap-2">
        <FormatCard label="EAD Player" icon={<Video className="h-5 w-5" />} />
        <FormatCard label="Arquivos" icon={<File className="h-5 w-5" />} />
        <FormatCard label="EAD Live" icon={<Video className="h-5 w-5" />} />
        <FormatCard label="EAD Meet" icon={<Video className="h-5 w-5" />} />
        <FormatCard label="Embed" icon={<Globe className="h-5 w-5" />} />
      </div>

      {/* Espaço em disco */}
      <div className="flex flex-col items-start md:items-end gap-1">
        <span className="text-sm">
          Espaço em disco: {espacoEmDiscoUtilizadoGB.toFixed(2)}/
          {espacoEmDiscoTotalGB.toFixed(2)} GB ({percentualUso}%)
        </span>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-secondary-500 h-2 rounded-full"
            style={{ width: `${percentualUso}%` }}
          ></div>
        </div>
      </div>
      {/* Linha superior: Abas à esquerda e busca, filtro e exportação à direita */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Abas de status */}
        <Tabs defaultValue="todos" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger
              value="todos"
              className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900"
            >
              Todos ({totalArquivos})
            </TabsTrigger>
            <TabsTrigger
              value="publicados"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-900"
            >
              Publicados
            </TabsTrigger>
            <TabsTrigger
              value="rascunhos"
              className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-900"
            >
              Rascunhos
            </TabsTrigger>
            <TabsTrigger
              value="privados"
              className="data-[state=active]:bg-red-100 data-[state=active]:text-red-900"
            >
              Privados
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Busca, Filtro e Exportar */}
        <div className="flex items-center gap-2">
          <div className="relative w-[300px]">
            <Search
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
            />
          </div>
          <FilterButton
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            tipoFilter={tipoFilter}
            setTipoFilter={setTipoFilter}
            clearFilters={clearFilters}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Exportar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Exportar lista de conteúdos</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Área de Filtros adicionais e Tabela */}
      <div className="bg-white px-7 py-7 rounded-lg space-y-4">
        {/* Exibição de filtros ativos */}
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
            {tipoFilter && (
              <Badge variant="outline" className="flex items-center gap-1">
                Tipo: {tipoFilter}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setTipoFilter(null)}
                />
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Limpar todos
            </Button>
          </div>
        )}

        {/* Tabela de Itens */}
        {isLoading ? (
          <LoadingTable />
        ) : (
          <LibraryTable
            items={filteredItems}
            sortConfig={sortConfig}
            handleSort={handleSort}
          />
        )}

        <Pagination />
      </div>
    </div>
  )
}

// -------------------------------------
// Componentes Auxiliares
// -------------------------------------

// Cartão de Formato (botão)
function FormatCard({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <Button
      variant="outline"
      className="flex flex-col items-center justify-center w-24 h-20 border shadow-sm hover:shadow-md transition-all"
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs">{label}</span>
    </Button>
  )
}

// Barra de busca
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
        placeholder="Pesquisar por título, tipo..."
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

// Filtro de Status e Tipo
function FilterButton({
  statusFilter,
  setStatusFilter,
  tipoFilter,
  setTipoFilter,
  clearFilters,
}: {
  statusFilter: string[]
  setStatusFilter: (value: string[]) => void
  tipoFilter: string | null
  setTipoFilter: (value: string | null) => void
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
          {(statusFilter.length > 0 || tipoFilter) && (
            <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {statusFilter.length + (tipoFilter ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Status</h4>
            <div className="grid gap-2">
              {['Publicado', 'Rascunho', 'Privado'].map((status) => (
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
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Tipo</h4>
            <Select
              value={tipoFilter || 'all'}
              onValueChange={(value) =>
                setTipoFilter(value === 'all' ? null : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="Arquivo">Arquivo</SelectItem>
                <SelectItem value="Vídeo">Vídeo</SelectItem>
                <SelectItem value="URL">URL</SelectItem>
                <SelectItem value="Outros">Outros</SelectItem>
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

// Tabela de Itens da Biblioteca
function LibraryTable({
  items,
  sortConfig,
  handleSort,
}: {
  items: LibraryItem[]
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
                onClick={() => handleSort('status')}
              >
                Status
                {getSortIcon('status')}
              </div>
            </TableHead>
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
                onClick={() => handleSort('tipo')}
              >
                Tipo
                {getSortIcon('tipo')}
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('tamanho')}
              >
                Tamanho
                {getSortIcon('tamanho')}
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('dataCriacao')}
              >
                Data de Criação
                {getSortIcon('dataCriacao')}
              </div>
            </TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              className="hover:bg-purple-50 transition-colors"
            >
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{item.titulo}</span>
                  <span className="text-xs text-muted-foreground">
                    #{item.id}
                  </span>
                </div>
              </TableCell>
              <TableCell>{item.tipo}</TableCell>
              <TableCell>{item.tamanho}</TableCell>
              <TableCell>
                {format(new Date(item.dataCriacao), 'dd/MM/yyyy')}
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
                        <p>Visualizar conteúdo</p>
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
                        <p>Editar conteúdo</p>
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

// Badge de Status
function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    Publicado: {
      label: 'Publicado',
      className: 'bg-green-100 text-green-800 hover:bg-green-100',
    },
    Rascunho: {
      label: 'Rascunho',
      className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    },
    Privado: {
      label: 'Privado',
      className: 'bg-red-100 text-red-800 hover:bg-red-100',
    },
  }
  const config = statusConfig[status as keyof typeof statusConfig]
  return (
    <Badge className={cn('font-normal', config.className)}>
      {config.label}
    </Badge>
  )
}

// Paginação (Exemplo)
function Pagination() {
  const pages = [1, 2, 3, 4, '...', 10]
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
      <div className="text-sm text-muted-foreground order-2 sm:order-1">
        Mostrando 1 a {pages.length} de {biblioteca.length} resultados
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

// Tabela de carregamento (Skeleton)
function LoadingTable() {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Tamanho</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-20 mt-1" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
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
