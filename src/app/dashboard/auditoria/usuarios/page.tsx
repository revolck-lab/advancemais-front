'use client'

import { useState, useMemo } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Search, Filter, Ban, Edit, CheckCircle, UserPlus } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

// Tipos de usuários
const userRoles = [
  'Todos',
  'Admin',
  'Recrutador',
  'Professor',
  'Psicólogo',
  'Empresa',
  'Aluno',
]

// Duração das punições
const punishmentDurations = [
  { label: '1 Dia', value: 1 },
  { label: '2 Dias', value: 2 },
  { label: '7 Dias', value: 7 },
  { label: '30 Dias', value: 30 },
  { label: '60 Dias', value: 60 },
  { label: '90 Dias', value: 90 },
  { label: 'Permanente', value: 'permanent' },
]

// Dados mockados de usuários
const mockUsers = Array.from({ length: 50 }).map((_, i) => {
  const roles = [
    'Admin',
    'Recrutador',
    'Professor',
    'Psicólogo',
    'Empresa',
    'Aluno',
  ]
  const randomRole = roles[Math.floor(Math.random() * roles.length)]
  const isPunished = randomRole === 'Aluno' && Math.random() > 0.7 // 30% de chance de Aluno estar punido
  let punishment = null
  if (isPunished) {
    const duration =
      punishmentDurations[
        Math.floor(Math.random() * (punishmentDurations.length - 1))
      ] // Exclui permanente por enquanto
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + (duration.value as number))
    punishment = {
      type: 'temporary',
      duration: duration.label,
      endDate: endDate.toLocaleDateString('pt-BR'),
    }
    if (Math.random() > 0.9) {
      // 10% de chance de ser permanente
      punishment = { type: 'permanent', duration: 'Permanente', endDate: 'N/A' }
    }
  }

  return {
    id: i + 1,
    name: `Usuário ${i + 1}`,
    email: `usuario${i + 1}@example.com`,
    role: randomRole,
    status: 'Ativo',
    punishment: punishment,
  }
})

const ITEMS_PER_PAGE = 10

export default function UserManagementPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('Todos')
  const [filterPunishmentStatus, setFilterPunishmentStatus] = useState('Todos')
  const [isPunishDialogOpen, setIsPunishDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<
    (typeof mockUsers)[0] | null
  >(null)
  const [selectedPunishmentDuration, setSelectedPunishmentDuration] = useState<
    string | number
  >('1')

  const filteredUsers = useMemo(() => {
    let filtered = mockUsers

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterRole !== 'Todos') {
      filtered = filtered.filter((user) => user.role === filterRole)
    }

    if (filterPunishmentStatus === 'Punidos') {
      filtered = filtered.filter((user) => user.punishment !== null)
    } else if (filterPunishmentStatus === 'Ativos') {
      filtered = filtered.filter((user) => user.punishment === null)
    }

    return filtered
  }, [searchTerm, filterRole, filterPunishmentStatus])

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  const currentUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredUsers.slice(startIndex, endIndex)
  }, [currentPage, filteredUsers])

  const handlePunishClick = (user: (typeof mockUsers)[0]) => {
    if (user.role === 'Aluno') {
      setSelectedUser(user)
      setIsPunishDialogOpen(true)
    } else {
      alert("A punição é permitida apenas para usuários com o cargo 'Aluno'.")
    }
  }

  const handleApplyPunishment = () => {
    if (selectedUser) {
      // Lógica para aplicar a punição (mockada)
      console.log(
        `Aplicando punição de ${selectedPunishmentDuration} dias/permanente para o usuário: ${selectedUser.name}`
      )
      // Em um cenário real, você faria uma chamada à API para atualizar o status do usuário
      // Para fins de demonstração, vamos apenas fechar o diálogo e resetar o estado
      setIsPunishDialogOpen(false)
      setSelectedUser(null)
      setSelectedPunishmentDuration('1')
      // Em um cenário real, você recarregaria os dados ou atualizaria o estado local
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Usuários</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie todos os usuários da plataforma.
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar Usuário
        </Button>
      </div>

      {/* Filtros e Busca */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Usuários
          </CardTitle>
          <CardDescription>
            Busque e filtre usuários por nome, email, tipo ou status de punição.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
            <Select
              value={filterRole}
              onValueChange={(value) => {
                setFilterRole(value)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por Tipo de Usuário" />
              </SelectTrigger>
              <SelectContent>
                {userRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filterPunishmentStatus}
              onValueChange={(value) => {
                setFilterPunishmentStatus(value)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por Punição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os Status</SelectItem>
                <SelectItem value="Ativos">Ativos (Sem Punição)</SelectItem>
                <SelectItem value="Punidos">Punidos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Usuários */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Lista de Usuários ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Informações e ações para cada usuário cadastrado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Punição</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === 'Ativo' ? 'default' : 'secondary'
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.punishment ? (
                          <Badge variant="destructive">
                            <Ban className="h-3 w-3 mr-1" />
                            {user.punishment.duration}
                            {user.punishment.type === 'temporary' &&
                              ` (até ${user.punishment.endDate})`}
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Nenhuma
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handlePunishClick(user)}
                            disabled={user.role !== 'Aluno'} // Desabilita o botão se não for Aluno
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            Punir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Nenhum usuário encontrado com os filtros aplicados.
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

      {/* Diálogo de Punição */}
      <Dialog open={isPunishDialogOpen} onOpenChange={setIsPunishDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Punir Usuário: {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              Selecione a duração da punição para este usuário.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select
              value={String(selectedPunishmentDuration)}
              onValueChange={(value) =>
                setSelectedPunishmentDuration(
                  value === 'permanent' ? 'permanent' : Number(value)
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Duração da Punição" />
              </SelectTrigger>
              <SelectContent>
                {punishmentDurations.map((duration) => (
                  <SelectItem
                    key={duration.value}
                    value={String(duration.value)}
                  >
                    {duration.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPunishDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleApplyPunishment}>Aplicar Punição</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
