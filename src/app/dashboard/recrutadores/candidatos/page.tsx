'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, User } from 'lucide-react'
import {
  Card,
  CardContent,
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

export default function CandidatosPage() {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filtragem de candidatos
  const filteredCandidates = candidates
    .filter((candidate) => {
      if (filter === 'all') return true
      return candidate.jobId.toString() === filter
    })
    .filter((candidate) => {
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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Candidatos</h1>
            <p className="text-muted-foreground">
              Gerencie todos os candidatos às vagas
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline">Voltar ao Dashboard</Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Listagem de Candidatos</CardTitle>
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
                <Select defaultValue={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Filtrar por vaga" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as vagas</SelectItem>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id.toString()}>
                        {job.title}
                      </SelectItem>
                    ))}
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
                    <TableHead>Vaga</TableHead>
                    <TableHead>Data de Candidatura</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCandidates.map((candidate) => {
                    const job = jobs.find((j) => j.id === candidate.jobId)
                    return (
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
                        <TableCell>
                          {job?.title || 'Vaga não encontrada'}
                        </TableCell>
                        <TableCell>{candidate.applyDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              candidate.status === 'Avaliado'
                                ? 'success'
                                : candidate.status === 'Em análise'
                                  ? 'warning'
                                  : 'outline'
                            }
                          >
                            {candidate.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link
                            href={`/dashboard/recrutadores/candidatos/perfil/${candidate.id}`}
                          >
                            <Button variant="outline" size="sm">
                              <User className="mr-2 h-4 w-4" />
                              Ver Perfil
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

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
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <div className="mt-2 text-sm text-muted-foreground">
                Mostrando 1 a 10 de {filteredCandidates.length} registros
              </div>
            </div>
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
  },
  {
    id: 2,
    title: 'Designer UX/UI',
    company: 'AgênciaDigital',
  },
  {
    id: 3,
    title: 'Gerente de Produto',
    company: 'Construtora ABC',
  },
]

const candidates = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@email.com',
    jobId: 1,
    applyDate: '15-01-2024',
    status: 'Em análise',
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    jobId: 1,
    applyDate: '16-01-2024',
    status: 'Avaliado',
  },
  {
    id: 3,
    name: 'Pedro Santos',
    email: 'pedro.santos@email.com',
    jobId: 2,
    applyDate: '14-01-2024',
    status: 'Novo',
  },
  {
    id: 4,
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    jobId: 3,
    applyDate: '17-01-2024',
    status: 'Em análise',
  },
  {
    id: 5,
    name: 'Lucas Ferreira',
    email: 'lucas.ferreira@email.com',
    jobId: 1,
    applyDate: '18-01-2024',
    status: 'Novo',
  },
]
