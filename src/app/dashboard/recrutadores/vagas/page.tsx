'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, Filter, Pencil } from 'lucide-react'
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

export default function VagasPage() {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filtragem de vagas baseada no status
  const filteredJobs = jobs
    .filter((job) => {
      if (filter === 'all') return true
      if (filter === 'active') return job.status === 'Ativo'
      if (filter === 'pending') return job.status === 'Pendente'
      if (filter === 'draft') return job.status === 'Rascunho'
      return true
    })
    .filter((job) => {
      // Filtragem por busca
      if (!searchQuery) return true
      return (
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Vagas</h1>
            <p className="text-muted-foreground">
              Gerencie todas as vagas de emprego
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
            <CardTitle>Listagem de Vagas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex flex-1 items-center gap-2">
                <Input
                  placeholder="Buscar vagas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-xs"
                />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as vagas</SelectItem>
                    <SelectItem value="active">Ativas</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                    <SelectItem value="draft">Rascunhos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">N°</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data de Publicação</TableHead>
                    <TableHead>Fim da Publicação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.id}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{job.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {job.company}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{job.type}</TableCell>
                      <TableCell>{job.startDate}</TableCell>
                      <TableCell>{job.endDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            job.status === 'Ativo'
                              ? 'success'
                              : job.status === 'Pendente'
                                ? 'warning'
                                : 'outline'
                          }
                        >
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/dashboard/recrutadores/vagas/${job.id}`}
                          >
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Visualizar</span>
                            </Button>
                          </Link>
                          <Link
                            href={`/dashboard/recrutadores/vagas/editar/${job.id}`}
                          >
                            <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
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
                Mostrando 1 a 10 de 14 registros
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
    type: 'Tempo Integral',
    startDate: '12-01-2024',
    endDate: '24-01-2024',
    status: 'Ativo',
  },
  {
    id: 2,
    title: 'Designer UX/UI',
    company: 'AgênciaDigital',
    type: 'Meio Período',
    startDate: '13-01-2024',
    endDate: '25-01-2024',
    status: 'Ativo',
  },
  {
    id: 3,
    title: 'Gerente de Produto',
    company: 'Construtora ABC',
    type: 'Tempo Integral',
    startDate: '13-01-2024',
    endDate: '26-01-2024',
    status: 'Pendente',
  },
  {
    id: 4,
    title: 'Analista de Marketing',
    company: 'MarketingPro',
    type: 'Tempo Integral',
    startDate: '14-01-2024',
    endDate: '27-01-2024',
    status: 'Rascunho',
  },
  {
    id: 5,
    title: 'Desenvolvedor Frontend',
    company: 'WebDev',
    type: 'Tempo Integral',
    startDate: '15-01-2024',
    endDate: '28-01-2024',
    status: 'Ativo',
  },
]
