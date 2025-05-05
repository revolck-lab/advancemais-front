'use client'

import { useState } from 'react'
import {
  Download,
  ChevronUp,
  ChevronDown,
  Search,
  MoreVertical,
  Eye,
  FileDown,
  Edit2,
  Calendar,
  Video,
  MessageSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'
import { Badge } from '@/components/ui/badge/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/dropdown-menu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar'
import { EditStatusModal, ViewResumeModal } from './modal'

interface Candidate {
  id: string
  name: string
  position: string
  date: string
  experience: string
  status: string
  email?: string
  phone?: string
  photo?: string
  resume?: string
  meetingLink?: string
}

const initialCandidates: Candidate[] = [
  {
    id: 'C10045',
    name: 'Ana Silva',
    position: 'Desenvolvedor Front-end',
    date: '15 Julho 2023',
    experience: '4 Anos',
    status: 'approved',
    email: 'ana.silva@email.com',
    phone: '(11) 99999-9999',
  },
  {
    id: 'C10046',
    name: 'Carlos Mendes',
    position: 'Desenvolvedor Back-end',
    date: '18 Julho 2023',
    experience: '6 Anos',
    status: 'rejected',
    email: 'carlos.mendes@email.com',
    phone: '(11) 98888-8888',
  },
  {
    id: 'C10047',
    name: 'Mariana Costa',
    position: 'UX/UI Designer',
    date: '20 Julho 2023',
    experience: '3 Anos',
    status: 'new',
    email: 'mariana.costa@email.com',
    phone: '(11) 97777-7777',
  },
  {
    id: 'C10048',
    name: 'Pedro Alves',
    position: 'Desenvolvedor Full-stack',
    date: '22 Julho 2023',
    experience: '5 Anos',
    status: 'interview',
    email: 'pedro.alves@email.com',
    phone: '(11) 96666-6666',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
  },
  {
    id: 'C10049',
    name: 'Juliana Santos',
    position: 'Product Manager',
    date: '25 Julho 2023',
    experience: '7 Anos',
    status: 'approved',
    email: 'juliana.santos@email.com',
    phone: '(11) 95555-5555',
  },
]

const statusOptions = [
  { value: 'new', label: 'Novo', color: 'bg-amber-100 text-amber-800' },
  {
    value: 'interview',
    label: 'Entrevista marcada',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    value: 'approved',
    label: 'Aprovado',
    color: 'bg-green-100 text-green-800',
  },
  { value: 'rejected', label: 'Rejeitado', color: 'bg-red-100 text-red-800' },
  {
    value: 'shortlisted',
    label: 'Pré-selecionado',
    color: 'bg-purple-100 text-purple-800',
  },
]

export default function CandidateList() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(
    null
  )
  const [viewingResume, setViewingResume] = useState<Candidate | null>(null)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) return null
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    )
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = statusOptions.find((s) => s.value === status)
    return statusConfig ? statusConfig.color : 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status: string) => {
    const statusConfig = statusOptions.find((s) => s.value === status)
    return statusConfig ? statusConfig.label : status
  }

  const getInitials = (name: string) => {
    const names = name.split(' ')
    return names[0][0] + (names[1] ? names[1][0] : '')
  }

  const handleStatusChange = (candidateId: string, newStatus: string) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId
          ? { ...candidate, status: newStatus }
          : candidate
      )
    )
  }

  const handleSaveCandidate = (updatedCandidate: Candidate) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate
      )
    )
    setEditingCandidate(null)
  }

  const handleEditCandidate = (candidate: Candidate) => {
    setEditingCandidate(candidate)
  }

  const handleViewResume = (candidate: Candidate) => {
    setViewingResume(candidate)
  }

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCandidatesByStatus = (status: string) => {
    return candidates.filter((candidate) => candidate.status === status)
  }

  const renderCandidateTable = (candidatesToRender: Candidate[]) => (
    <div className="rounded-md border bg-background">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  ID {renderSortIcon('id')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => handleSort('candidate')}
                >
                  Candidato {renderSortIcon('candidate')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  Data de inscrição {renderSortIcon('date')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => handleSort('experience')}
                >
                  Experiência {renderSortIcon('experience')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Status da candidatura
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {candidatesToRender.map((candidate) => (
              <tr
                key={candidate.id}
                className="border-t hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm">{candidate.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={candidate.photo} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(candidate.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{candidate.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {candidate.position}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{candidate.date}</td>
                <td className="px-4 py-3 text-sm">{candidate.experience}</td>
                <td className="px-4 py-3">
                  <Badge
                    className={`${getStatusBadge(candidate.status)} hover:${getStatusBadge(candidate.status)}`}
                  >
                    {getStatusLabel(candidate.status)}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {candidate.status === 'new' && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="flex items-center gap-1"
                        onClick={() => handleEditCandidate(candidate)}
                      >
                        <Calendar className="h-3 w-3" />
                        Agendar
                      </Button>
                    )}
                    {candidate.status === 'interview' &&
                      candidate.meetingLink && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="flex items-center gap-1"
                          onClick={() =>
                            window.open(candidate.meetingLink, '_blank')
                          }
                        >
                          <Video className="h-3 w-3" />
                          Entrar
                        </Button>
                      )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-white"
                        sideOffset={5}
                      >
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onSelect={() => handleViewResume(candidate)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                          Visualizar currículo
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 cursor-pointer"
                          onSelect={() => {
                            // Função para baixar currículo (implementar)
                          }}
                        >
                          <FileDown className="h-4 w-4" />
                          Baixar currículo
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => handleEditCandidate(candidate)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4" />
                          Editar status
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 cursor-pointer"
                          onSelect={() => {
                            // Função para enviar mensagem (implementar)
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
                          Enviar mensagem
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-4 pb-12 bg-white border border-[#ececec] rounded-lg mb-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestão de Candidatos</h1>
        <Button variant="default" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Exportar todos
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 border-b w-full justify-start rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="all"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2 h-10"
          >
            Todos os candidatos
            <Badge variant="secondary" className="ml-2">
              {candidates.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="shortlisted"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2 h-10"
          >
            Pré-selecionados
            <Badge variant="secondary" className="ml-2">
              {getCandidatesByStatus('shortlisted').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="interviews"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2 h-10"
          >
            Entrevistas
            <Badge variant="secondary" className="ml-2">
              {getCandidatesByStatus('interview').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2 h-10"
          >
            Aprovados
            <Badge variant="secondary" className="ml-2">
              {getCandidatesByStatus('approved').length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <div className="mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar candidato por nome, cargo ou ID..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          {renderCandidateTable(filteredCandidates)}
        </TabsContent>

        <TabsContent value="shortlisted" className="mt-0">
          {getCandidatesByStatus('shortlisted').length > 0 ? (
            renderCandidateTable(getCandidatesByStatus('shortlisted'))
          ) : (
            <div className="p-8 text-center text-muted-foreground border rounded-md">
              Nenhum candidato pré-selecionado no momento.
            </div>
          )}
        </TabsContent>

        <TabsContent value="interviews" className="mt-0">
          {getCandidatesByStatus('interview').length > 0 ? (
            renderCandidateTable(getCandidatesByStatus('interview'))
          ) : (
            <div className="p-8 text-center text-muted-foreground border rounded-md">
              Nenhuma entrevista agendada no momento.
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="mt-0">
          {getCandidatesByStatus('approved').length > 0 ? (
            renderCandidateTable(getCandidatesByStatus('approved'))
          ) : (
            <div className="p-8 text-center text-muted-foreground border rounded-md">
              Nenhum candidato aprovado no momento.
            </div>
          )}
        </TabsContent>
      </Tabs>

      <EditStatusModal
        candidate={editingCandidate}
        isOpen={editingCandidate !== null}
        onClose={() => setEditingCandidate(null)}
        onStatusChange={handleStatusChange}
        onSave={handleSaveCandidate}
      />

      <ViewResumeModal
        candidate={viewingResume}
        isOpen={viewingResume !== null}
        onClose={() => setViewingResume(null)}
      />
    </div>
  )
}
