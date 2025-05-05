'use client'

import { useState, useEffect } from 'react'
import { FileDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog/dialog'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Badge } from '@/components/ui/badge/badge'

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

interface StatusOption {
  value: string
  label: string
  color: string
}

const statusOptions: StatusOption[] = [
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

const getInitials = (name: string) => {
  const names = name.split(' ')
  return names[0][0] + (names[1] ? names[1][0] : '')
}

interface EditStatusModalProps {
  candidate: Candidate | null
  isOpen: boolean
  onClose: () => void
  onStatusChange: (candidateId: string, newStatus: string) => void
  onSave: (candidate: Candidate) => void
}

export function EditStatusModal({
  candidate,
  isOpen,
  onClose,
  onSave,
}: EditStatusModalProps) {
  const [localCandidate, setLocalCandidate] = useState<Candidate | null>(null)

  useEffect(() => {
    if (candidate) {
      setLocalCandidate({ ...candidate })
    }
  }, [candidate])

  const handleStatusChange = (value: string) => {
    if (localCandidate) {
      setLocalCandidate({ ...localCandidate, status: value })
    }
  }

  const handleMeetingLinkChange = (value: string) => {
    if (localCandidate) {
      setLocalCandidate({ ...localCandidate, meetingLink: value })
    }
  }

  const handleSave = () => {
    if (localCandidate) {
      onSave(localCandidate)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  if (!localCandidate) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-[425px] bg-white"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Editar Status do Candidato</DialogTitle>
          <DialogDescription>
            Alterando status de {localCandidate.name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={localCandidate.photo} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {getInitials(localCandidate.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{localCandidate.name}</p>
              <p className="text-sm text-muted-foreground">
                {localCandidate.position}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right text-sm font-medium">Status:</label>
            <div className="col-span-3">
              <Select
                value={localCandidate.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {localCandidate.status === 'interview' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Link:</label>
              <div className="col-span-3">
                <Input
                  placeholder="Link da reunião"
                  value={localCandidate.meetingLink || ''}
                  onChange={(e) => handleMeetingLinkChange(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface ViewResumeModalProps {
  candidate: Candidate | null
  isOpen: boolean
  onClose: () => void
}

export function ViewResumeModal({
  candidate,
  isOpen,
  onClose,
}: ViewResumeModalProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  if (!candidate) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Currículo de {candidate.name}</DialogTitle>
          <DialogDescription>{candidate.position}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={candidate.photo} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-2xl">
                {getInitials(candidate.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{candidate.name}</h2>
              <p className="text-lg text-muted-foreground">
                {candidate.position}
              </p>
              <div className="mt-2 text-sm text-muted-foreground">
                <p>Email: {candidate.email}</p>
                <p>Telefone: {candidate.phone}</p>
                <p>Experiência: {candidate.experience}</p>
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              Baixar PDF
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumo Profissional</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Profissional com {candidate.experience} de experiência em{' '}
                {candidate.position}. Apaixonado por tecnologia e sempre em
                busca de novos desafios. Experiência em projetos de grande
                escala e trabalho em equipes multidisciplinares.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experiência Profissional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">
                    Empresa ABC - {candidate.position}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Janeiro 2020 - Presente
                  </p>
                  <ul className="list-disc list-inside text-sm mt-1">
                    <li>
                      Desenvolvimento de aplicações web utilizando React e
                      Node.js
                    </li>
                    <li>Liderança de equipe de 5 desenvolvedores</li>
                    <li>Implementação de metodologias ágeis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">
                    Empresa XYZ - Desenvolvedor Júnior
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Março 2018 - Dezembro 2019
                  </p>
                  <ul className="list-disc list-inside text-sm mt-1">
                    <li>Manutenção de sistemas legados</li>
                    <li>Desenvolvimento de novas funcionalidades</li>
                    <li>Suporte técnico aos usuários</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Formação Acadêmica</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">
                    Bacharelado em Ciência da Computação
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Universidade Federal - 2014 a 2018
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Habilidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">JavaScript</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">SQL</Badge>
                <Badge variant="secondary">Git</Badge>
                <Badge variant="secondary">Agile</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
