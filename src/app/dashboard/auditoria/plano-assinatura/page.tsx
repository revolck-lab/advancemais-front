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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  PlusCircle,
  Edit,
  Trash2,
  CreditCard,
  Settings,
  Search,
  Eye,
} from 'lucide-react'

// Dados mockados de planos
const mockPlans = [
  {
    id: 1,
    name: 'Plano Básico Aluno',
    type: 'Aluno',
    price: '29.90',
    features: 'Acesso a 5 cursos, Suporte Básico',
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'Plano Premium Aluno',
    type: 'Aluno',
    price: '79.90',
    features: 'Acesso ilimitado a cursos, Suporte Prioritário, Certificados',
    status: 'Ativo',
  },
  {
    id: 3,
    name: 'Plano Empresa Essencial',
    type: 'Empresa',
    price: '199.00',
    features: '3 vagas/mês, Dashboard de Recrutador, Suporte',
    status: 'Ativo',
  },
  {
    id: 4,
    name: 'Plano Empresa Pro',
    type: 'Empresa',
    price: '499.00',
    features: 'Vagas ilimitadas, Dashboard Completo, Suporte Dedicado',
    status: 'Ativo',
  },
  {
    id: 5,
    name: 'Plano Gratuito Aluno',
    type: 'Aluno',
    price: '0.00',
    features: 'Acesso a cursos gratuitos',
    status: 'Ativo',
  },
]

// Dados mockados de assinaturas ativas
const mockSubscriptions = Array.from({ length: 40 }).map((_, i) => ({
  id: i + 1,
  subscriber: `Usuário ${i + 1}`,
  subscriberType: ['Aluno', 'Empresa'][Math.floor(Math.random() * 2)],
  plan: mockPlans[Math.floor(Math.random() * mockPlans.length)].name,
  startDate: new Date(
    Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
  ).toLocaleDateString('pt-BR'),
  endDate: new Date(
    Date.now() + Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
  ).toLocaleDateString('pt-BR'),
  status: ['Ativa', 'Expirada', 'Cancelada'][Math.floor(Math.random() * 3)],
}))

const ITEMS_PER_PAGE = 10

export default function PlanosAssinaturasPage() {
  const [currentPagePlans, setCurrentPagePlans] = useState(1)
  const [currentPageSubs, setCurrentPageSubs] = useState(1)
  const [filterSubType, setFilterSubType] = useState('Todos')
  const [filterSubStatus, setFilterSubStatus] = useState('Todos')
  const [searchSub, setSearchSub] = useState('')

  const totalPagesPlans = Math.ceil(mockPlans.length / ITEMS_PER_PAGE)
  const currentPlans = useMemo(() => {
    const startIndex = (currentPagePlans - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return mockPlans.slice(startIndex, endIndex)
  }, [currentPagePlans])

  const filteredSubscriptions = useMemo(() => {
    let filtered = mockSubscriptions

    if (searchSub) {
      filtered = filtered.filter((sub) =>
        sub.subscriber.toLowerCase().includes(searchSub.toLowerCase())
      )
    }
    if (filterSubType !== 'Todos') {
      filtered = filtered.filter((sub) => sub.subscriberType === filterSubType)
    }
    if (filterSubStatus !== 'Todos') {
      filtered = filtered.filter((sub) => sub.status === filterSubStatus)
    }
    return filtered
  }, [searchSub, filterSubType, filterSubStatus])

  const totalPagesSubs = Math.ceil(
    filteredSubscriptions.length / ITEMS_PER_PAGE
  )
  const currentSubscriptions = useMemo(() => {
    const startIndex = (currentPageSubs - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredSubscriptions.slice(startIndex, endIndex)
  }, [currentPageSubs, filteredSubscriptions])

  const handlePageChangePlans = (page: number) => setCurrentPagePlans(page)
  const handlePageChangeSubs = (page: number) => setCurrentPageSubs(page)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Planos e Assinaturas</h1>
          <p className="text-muted-foreground">
            Gerencie os planos de assinatura e as assinaturas ativas.
          </p>
        </div>
      </div>

      {/* Gerenciamento de Planos */}
      <Card className="bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuração de Planos
            </CardTitle>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Plano
            </Button>
          </div>
          <CardDescription>
            Defina os planos de assinatura disponíveis na plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Plano</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Recursos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPlans.length > 0 ? (
                  currentPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.name}</TableCell>
                      <TableCell>{plan.type}</TableCell>
                      <TableCell>R$ {plan.price}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {plan.features}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            plan.status === 'Ativo' ? 'default' : 'secondary'
                          }
                        >
                          {plan.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
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
                      Nenhum plano encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {totalPagesPlans > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      handlePageChangePlans(Math.max(1, currentPagePlans - 1))
                    }
                    aria-disabled={currentPagePlans === 1}
                    tabIndex={currentPagePlans === 1 ? -1 : undefined}
                    className={
                      currentPagePlans === 1
                        ? 'pointer-events-none opacity-50'
                        : undefined
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPagesPlans }).map((_, index) => (
                  <PaginationItem key={index}>
                    <button
                      className={`px-3 py-1 rounded-md ${
                        currentPagePlans === index + 1
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }`}
                      onClick={() => handlePageChangePlans(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      handlePageChangePlans(
                        Math.min(totalPagesPlans, currentPagePlans + 1)
                      )
                    }
                    aria-disabled={currentPagePlans === totalPagesPlans}
                    tabIndex={
                      currentPagePlans === totalPagesPlans ? -1 : undefined
                    }
                    className={
                      currentPagePlans === totalPagesPlans
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

      {/* Assinaturas Ativas */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Assinaturas Ativas
          </CardTitle>
          <CardDescription>
            Visualize e gerencie as assinaturas ativas na plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por assinante..."
                className="pl-10"
                value={searchSub}
                onChange={(e) => {
                  setSearchSub(e.target.value)
                  setCurrentPageSubs(1)
                }}
              />
            </div>
            <Select
              value={filterSubType}
              onValueChange={(value) => {
                setFilterSubType(value)
                setCurrentPageSubs(1)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os Tipos</SelectItem>
                <SelectItem value="Aluno">Aluno</SelectItem>
                <SelectItem value="Empresa">Empresa</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filterSubStatus}
              onValueChange={(value) => {
                setFilterSubStatus(value)
                setCurrentPageSubs(1)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os Status</SelectItem>
                <SelectItem value="Ativa">Ativa</SelectItem>
                <SelectItem value="Expirada">Expirada</SelectItem>
                <SelectItem value="Cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assinante</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Início</TableHead>
                  <TableHead>Fim</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentSubscriptions.length > 0 ? (
                  currentSubscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">
                        {sub.subscriber}
                      </TableCell>
                      <TableCell>{sub.subscriberType}</TableCell>
                      <TableCell>{sub.plan}</TableCell>
                      <TableCell>{sub.startDate}</TableCell>
                      <TableCell>{sub.endDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            sub.status === 'Ativa'
                              ? 'default'
                              : sub.status === 'Expirada'
                                ? 'destructive'
                                : 'secondary'
                          }
                        >
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Nenhuma assinatura encontrada com os filtros aplicados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {totalPagesSubs > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      handlePageChangeSubs(Math.max(1, currentPageSubs - 1))
                    }
                    aria-disabled={currentPageSubs === 1}
                    tabIndex={currentPageSubs === 1 ? -1 : undefined}
                    className={
                      currentPageSubs === 1
                        ? 'pointer-events-none opacity-50'
                        : undefined
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPagesSubs }).map((_, index) => (
                  <PaginationItem key={index}>
                    <button
                      className={`px-3 py-1 rounded-md ${
                        currentPageSubs === index + 1
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }`}
                      onClick={() => handlePageChangeSubs(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      handlePageChangeSubs(
                        Math.min(totalPagesSubs, currentPageSubs + 1)
                      )
                    }
                    aria-disabled={currentPageSubs === totalPagesSubs}
                    tabIndex={
                      currentPageSubs === totalPagesSubs ? -1 : undefined
                    }
                    className={
                      currentPageSubs === totalPagesSubs
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
