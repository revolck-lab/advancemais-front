'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table'
import { Badge } from '@/components/ui/badge/badge'
import { Input } from '@/components/ui/input/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Button } from '@/components/ui/button'
import {
  SearchIcon,
  X,
  Star,
  StarHalf,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip/tooltip'
import { cn } from '@/lib/utils'

type Testimonial = {
  id: string
  aluno: string
  curso: string
  avaliacao: number
  data: string
  status: 'publicado' | 'pendente' | 'rejeitado'
  depoimento: string
}

const testimonials: Testimonial[] = [
  {
    id: 'T2301',
    aluno: 'João Carlos Silva',
    curso: 'Desenvolvimento Web com React',
    avaliacao: 4.8,
    data: '2024-03-15',
    status: 'publicado',
    depoimento:
      'O curso superou minhas expectativas. Conteúdo atualizado e instrutor muito competente. A didática das aulas facilitou muito o aprendizado de conceitos complexos.',
  },
  {
    id: 'T2302',
    aluno: 'Maria Fernanda Oliveira',
    curso: 'Marketing Digital Completo',
    avaliacao: 4.5,
    data: '2024-02-28',
    status: 'pendente',
    depoimento:
      'Aprendi estratégias que já estou aplicando no meu negócio. Recomendo! As aulas práticas foram essenciais para fixar o conhecimento.',
  },
  {
    id: 'T2303',
    aluno: 'Pedro Henrique Souza',
    curso: 'Python para Ciência de Dados',
    avaliacao: 5,
    data: '2024-04-10',
    status: 'publicado',
    depoimento:
      'Material completo e exercícios práticos que realmente ajudam no aprendizado. O suporte da comunidade foi fundamental para tirar dúvidas.',
  },
  {
    id: 'T2304',
    aluno: 'Ana Clara Costa',
    curso: 'Design de Interfaces UX/UI',
    avaliacao: 4.2,
    data: '2024-01-20',
    status: 'rejeitado',
    depoimento:
      'Bom conteúdo, mas senti falta de exemplos mais atuais. Alguns módulos pareciam desatualizados com as tendências atuais de design.',
  },
  {
    id: 'T2305',
    aluno: 'Lucas Pereira Santos',
    curso: 'Gestão Ágil de Projetos',
    avaliacao: 4.7,
    data: '2024-03-05',
    status: 'publicado',
    depoimento:
      'Metodologias bem explicadas e casos reais de aplicação. Os estudos de caso foram especialmente úteis para entender a prática.',
  },
]

export default function TestimonialsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('todos')
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Testimonial | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })
  const [expandedTestimonial, setExpandedTestimonial] = useState<string | null>(
    null
  )

  const handleSort = (key: keyof Testimonial) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const filteredTestimonials = testimonials
    .filter(
      (t) =>
        t.aluno.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.curso.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((t) => statusFilter === 'todos' || t.status === statusFilter)
    .sort((a, b) => {
      if (!sortConfig.key) return 0
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]
      const modifier = sortConfig.direction === 'asc' ? 1 : -1

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * modifier
      }

      return String(aValue).localeCompare(String(bValue)) * modifier
    })

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl">Depoimentos dos Alunos</CardTitle>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-72">
                <Input
                  placeholder="Buscar aluno ou curso..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10 bg-muted/50"
                />
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-7 w-7"
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filtrar status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="publicado">Publicados</SelectItem>
                  <SelectItem value="pendente">Pendentes</SelectItem>
                  <SelectItem value="rejeitado">Rejeitados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[100px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('id')}
                      className="gap-1 px-2 hover:bg-muted"
                    >
                      ID
                      {sortConfig.key === 'id' &&
                        (sortConfig.direction === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </Button>
                  </TableHead>

                  <TableHead>Aluno</TableHead>

                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('curso')}
                      className="gap-1 px-2 hover:bg-muted"
                    >
                      Curso
                      {sortConfig.key === 'curso' &&
                        (sortConfig.direction === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </Button>
                  </TableHead>

                  <TableHead className="text-center">Avaliação</TableHead>

                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('data')}
                      className="gap-1 px-2 hover:bg-muted"
                    >
                      Data
                      {sortConfig.key === 'data' &&
                        (sortConfig.direction === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </Button>
                  </TableHead>

                  <TableHead>Status</TableHead>

                  <TableHead className="w-[300px]">Depoimento</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredTestimonials.map((testimonial) => (
                  <TableRow
                    key={testimonial.id}
                    className={cn(
                      'hover:bg-muted/30 transition-colors',
                      expandedTestimonial === testimonial.id && 'bg-muted/10'
                    )}
                  >
                    <TableCell className="font-medium">
                      {testimonial.id}
                    </TableCell>

                    <TableCell className="font-medium">
                      {testimonial.aluno}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {testimonial.curso}
                    </TableCell>

                    <TableCell className="text-center">
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center justify-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span key={star}>
                                {star <= Math.floor(testimonial.avaliacao) ? (
                                  <Star className="h-5 w-5 fill-primary text-primary" />
                                ) : star - 0.5 <= testimonial.avaliacao ? (
                                  <StarHalf className="h-5 w-5 fill-primary text-primary" />
                                ) : (
                                  <Star className="h-5 w-5 text-muted-foreground" />
                                )}
                              </span>
                            ))}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          Avaliação: {testimonial.avaliacao.toFixed(1)}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      {new Date(testimonial.data)
                        .toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                        .replace(/ de /g, '/')}
                    </TableCell>

                    <TableCell>
                      <StatusBadge status={testimonial.status} />
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <p
                          className={cn(
                            'text-sm line-clamp-2',
                            expandedTestimonial === testimonial.id &&
                              'line-clamp-none'
                          )}
                        >
                          {testimonial.depoimento}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() =>
                            setExpandedTestimonial(
                              expandedTestimonial === testimonial.id
                                ? null
                                : testimonial.id
                            )
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredTestimonials.length === 0 && (
              <div className="p-6 text-center text-muted-foreground">
                Nenhum depoimento encontrado
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusMap = {
    publicado: {
      label: 'Publicado',
      icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
      class: 'bg-green-100/80 text-green-800 hover:bg-green-100',
    },
    pendente: {
      label: 'Pendente',
      icon: <Clock className="h-4 w-4 mr-1" />,
      class: 'bg-yellow-100/80 text-yellow-800 hover:bg-yellow-100',
    },
    rejeitado: {
      label: 'Rejeitado',
      icon: <AlertCircle className="h-4 w-4 mr-1" />,
      class: 'bg-red-100/80 text-red-800 hover:bg-red-100',
    },
  }

  return (
    <Badge
      className={cn(
        'flex items-center py-1 px-2.5',
        statusMap[status as keyof typeof statusMap].class
      )}
    >
      {statusMap[status as keyof typeof statusMap].icon}
      {statusMap[status as keyof typeof statusMap].label}
    </Badge>
  )
}
