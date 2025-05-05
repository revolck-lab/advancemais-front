'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Search, User } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export default function CandidatosPorVagaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const jobId = Number.parseInt(resolvedParams.id)

  const job = jobs.find((j) => j.id === jobId) || jobs[0]

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Filtragem de candidatos para esta vaga específica
  const jobCandidates = candidates.filter(
    (candidate) => candidate.jobId === jobId
  )

  const filteredCandidates = jobCandidates.filter((candidate) => {
    // Filtragem por status
    if (statusFilter !== 'all' && candidate.status !== statusFilter)
      return false

    // Filtragem por busca
    if (!searchQuery) return true
    return (
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/recrutadores/vagas/${jobId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Candidatos para {job.title}
            </h1>
            <p className="text-muted-foreground">{job.company}</p>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Candidatos</CardTitle>
              <CardDescription>
                Total de {jobCandidates.length} candidatos para esta vaga
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex flex-1 items-center gap-2">
                <Input
                  placeholder="Buscar candidatos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-xs"
                />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  defaultValue={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="Novo">Novos</SelectItem>
                    <SelectItem value="Em análise">Em análise</SelectItem>
                    <SelectItem value="Avaliado">Avaliados</SelectItem>
                    <SelectItem value="Aprovado">Aprovados</SelectItem>
                    <SelectItem value="Rejeitado">Rejeitados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">ID</TableHead>
                    <TableHead>Candidato</TableHead>
                    <TableHead>Experiência</TableHead>
                    <TableHead>Data de Candidatura</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>{candidate.id}</TableCell>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{candidate.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {candidate.email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.experience}</TableCell>
                        <TableCell>{candidate.applyDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              candidate.status === 'Aprovado'
                                ? 'success'
                                : candidate.status === 'Em análise'
                                  ? 'warning'
                                  : candidate.status === 'Rejeitado'
                                    ? 'destructive'
                                    : 'outline'
                            }
                          >
                            {candidate.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/dashboard/recrutadores/candidatos/perfil/${candidate.id}`}
                            >
                              <Button variant="outline" size="sm">
                                <User className="mr-2 h-4 w-4" />
                                Ver Perfil
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Nenhum candidato encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {filteredCandidates.length > 0 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {filteredCandidates.length > 10 && (
                      <>
                        <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      </>
                    )}
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <div className="mt-2 text-sm text-muted-foreground">
                  Mostrando 1 a {Math.min(10, filteredCandidates.length)} de{' '}
                  {filteredCandidates.length} candidatos
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

// Dados de exemplo
const jobs = [
  {
    id: 1,
    title: 'Desenvolvedor Full Stack',
    company: 'TechSolutions',
    location: 'São Paulo, SP',
  },
  {
    id: 2,
    title: 'Designer UX/UI',
    company: 'AgênciaDigital',
    location: 'Remoto',
  },
  {
    id: 3,
    title: 'Gerente de Produto',
    company: 'Construtora ABC',
    location: 'Rio de Janeiro, RJ',
  },
]

const candidates = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@email.com',
    jobId: 1,
    experience: '5 anos',
    applyDate: '15-01-2024',
    status: 'Em análise',
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    jobId: 1,
    experience: '3 anos',
    applyDate: '16-01-2024',
    status: 'Avaliado',
  },
  {
    id: 3,
    name: 'Pedro Santos',
    email: 'pedro.santos@email.com',
    jobId: 2,
    experience: '2 anos',
    applyDate: '14-01-2024',
    status: 'Novo',
  },
  {
    id: 4,
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    jobId: 3,
    experience: '7 anos',
    applyDate: '17-01-2024',
    status: 'Em análise',
  },
  {
    id: 5,
    name: 'Lucas Ferreira',
    email: 'lucas.ferreira@email.com',
    jobId: 1,
    experience: '4 anos',
    applyDate: '18-01-2024',
    status: 'Novo',
  },
  {
    id: 6,
    name: 'Juliana Mendes',
    email: 'juliana.mendes@email.com',
    jobId: 1,
    experience: '6 anos',
    applyDate: '14-01-2024',
    status: 'Aprovado',
  },
  {
    id: 7,
    name: 'Rafael Almeida',
    email: 'rafael.almeida@email.com',
    jobId: 1,
    experience: '2 anos',
    applyDate: '15-01-2024',
    status: 'Rejeitado',
  },
  {
    id: 8,
    name: 'Camila Rodrigues',
    email: 'camila.rodrigues@email.com',
    jobId: 1,
    experience: '3 anos',
    applyDate: '16-01-2024',
    status: 'Em análise',
  },
  {
    id: 9,
    name: 'Bruno Martins',
    email: 'bruno.martins@email.com',
    jobId: 1,
    experience: '5 anos',
    applyDate: '17-01-2024',
    status: 'Avaliado',
  },
  {
    id: 10,
    name: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    jobId: 1,
    experience: '4 anos',
    applyDate: '18-01-2024',
    status: 'Novo',
  },
  {
    id: 11,
    name: 'Gabriel Costa',
    email: 'gabriel.costa@email.com',
    jobId: 1,
    experience: '7 anos',
    applyDate: '19-01-2024',
    status: 'Em análise',
  },
  {
    id: 12,
    name: 'Mariana Santos',
    email: 'mariana.santos@email.com',
    jobId: 1,
    experience: '3 anos',
    applyDate: '20-01-2024',
    status: 'Novo',
  },
]
