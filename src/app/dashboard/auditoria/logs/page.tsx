'use client'

import { useState, useMemo } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Search,
  Filter,
  User,
  Clock,
  CalendarDays,
  ScrollText,
  Briefcase,
} from 'lucide-react'

// Tipos de ações para o filtro
const actionTypes = [
  'Todos',
  'Compra de Curso',
  'Finalização de Turma',
  'Nova Assinatura Empresa',
  'Upgrade Assinatura Empresa',
  'Downgrade Assinatura Empresa',
  'Criação de Turma/Curso',
  'Alteração no Site',
  'Alteração de Usuário',
]

// Dados mockados de auditoria
const mockAuditLogs = Array.from({ length: 100 }).map((_, i) => {
  const actions = [
    'Compra de Curso',
    'Finalização de Turma',
    'Nova Assinatura Empresa',
    'Upgrade Assinatura Empresa',
    'Downgrade Assinatura Empresa',
    'Criação de Turma/Curso',
    'Alteração no Site',
    'Alteração de Usuário',
  ]
  const users = [
    { name: 'João Silva', role: 'Admin' },
    { name: 'Maria Souza', role: 'Gerente' },
    { name: 'Pedro Costa', role: 'Suporte' },
    { name: 'Ana Lima', role: 'Desenvolvedor' },
    { name: 'Laura Mendes', role: 'Psicólogo' },
    { name: 'Bruno Alves', role: 'Recrutador' },
  ]
  const randomUser = users[Math.floor(Math.random() * users.length)]
  const randomDate = new Date(
    Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
  ) // Últimos 30 dias
  const randomTime = `${Math.floor(Math.random() * 24)
    .toString()
    .padStart(2, '0')}:${Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, '0')}`

  return {
    id: i + 1,
    authorName: randomUser.name,
    authorRole: randomUser.role,
    action: actions[Math.floor(Math.random() * actions.length)],
    date: randomDate, // Armazenar como objeto Date para facilitar a filtragem
    time: randomTime,
    details: `Detalhes da ação ${i + 1}`,
  }
})

const ITEMS_PER_PAGE = 10

export default function AuditoriaPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAction, setFilterAction] = useState('Todos')
  const [filterAuthorRole, setFilterAuthorRole] = useState('Todos')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const filteredLogs = useMemo(() => {
    let filtered = mockAuditLogs

    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.authorRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.details.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterAction !== 'Todos') {
      filtered = filtered.filter((log) => log.action === filterAction)
    }

    if (filterAuthorRole !== 'Todos') {
      filtered = filtered.filter((log) => log.authorRole === filterAuthorRole)
    }

    if (startDate) {
      const start = new Date(startDate)
      filtered = filtered.filter((log) => log.date >= start)
    }

    if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999) // Incluir o dia inteiro
      filtered = filtered.filter((log) => log.date <= end)
    }

    return filtered.sort((a, b) => b.date.getTime() - a.date.getTime()) // Ordenar por data mais recente
  }, [searchTerm, filterAction, filterAuthorRole, startDate, endDate])

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE)
  const currentLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredLogs.slice(startIndex, endIndex)
  }, [currentPage, filteredLogs])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const uniqueAuthorRoles = useMemo(() => {
    const roles = new Set(mockAuditLogs.map((log) => log.authorRole))
    return ['Todos', ...Array.from(roles).sort()]
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Auditoria do Sistema</h1>
          <p className="text-muted-foreground">
            Registro de todas as ações importantes na plataforma.
          </p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Auditoria
          </CardTitle>
          <CardDescription>
            Busque e filtre os logs por ação, autor ou período.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ação, autor ou detalhes..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Reset page on search
                }}
              />
            </div>
            <Select
              value={filterAction}
              onValueChange={(value) => {
                setFilterAction(value)
                setCurrentPage(1) // Reset page on filter change
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por Ação" />
              </SelectTrigger>
              <SelectContent>
                {actionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filterAuthorRole}
              onValueChange={(value) => {
                setFilterAuthorRole(value)
                setCurrentPage(1) // Reset page on filter change
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por Cargo" />
              </SelectTrigger>
              <SelectContent>
                {uniqueAuthorRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="date"
              placeholder="Data Início"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value)
                setCurrentPage(1)
              }}
            />
            <Input
              type="date"
              placeholder="Data Fim"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Logs de Auditoria */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Logs de Auditoria ({filteredLogs.length})</CardTitle>
          <CardDescription>
            Registro detalhado de todas as atividades do sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" /> Nome do Autor
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px]">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" /> Cargo
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <ScrollText className="h-4 w-4" /> Ação
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px]">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" /> Data
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px]">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> Hora
                    </div>
                  </TableHead>
                  <TableHead>Motivo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentLogs.length > 0 ? (
                  currentLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">
                        {log.authorName}
                      </TableCell>
                      <TableCell>{log.authorRole}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>
                        {log.date.toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>{log.time}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {log.details}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Nenhum log encontrado com os filtros aplicados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    aria-disabled={currentPage === 1}
                    tabIndex={currentPage === 1 ? -1 : undefined}
                    className={
                      currentPage === 1
                        ? 'pointer-events-none opacity-50'
                        : undefined
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <button
                      className={`px-3 py-1 rounded-md ${
                        currentPage === index + 1
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    aria-disabled={currentPage === totalPages}
                    tabIndex={currentPage === totalPages ? -1 : undefined}
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : undefined
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
