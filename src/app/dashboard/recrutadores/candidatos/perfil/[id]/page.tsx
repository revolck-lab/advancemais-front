'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Building,
  Calendar,
  Download,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog'
import { Textarea } from '@/components/ui/textarea/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast/toast'

export default function CandidateProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const candidateId = Number.parseInt(resolvedParams.id)
  const candidate =
    candidates.find((c) => c.id === candidateId) || candidates[0]
  const job = jobs.find((j) => j.id === candidate.jobId)

  const [status, setStatus] = useState(candidate.status)
  const [feedback, setFeedback] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Função para atualizar o status do candidato
  const updateCandidateStatus = () => {
    if (status === 'Rejeitado' && !feedback.trim()) {
      toast({
        variant: 'destructive',
        title: 'Feedback obrigatório',
        description:
          'Por favor, forneça um feedback para o candidato rejeitado.',
      })
      return
    }

    toast({
      variant: 'success',
      title: 'Status atualizado',
      description: `O candidato ${candidate.name} foi marcado como ${status}.`,
      action: (
        <ToastAction altText="Ver candidatos">Ver candidatos</ToastAction>
      ),
    })

    // Aqui você implementaria a lógica para atualizar o status no backend
    setIsDialogOpen(false)
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/recrutadores/candidatos/${candidate.jobId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {candidate.name}
            </h1>
            <p className="text-muted-foreground">
              Candidato para {job?.title || 'Vaga não encontrada'}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="col-span-7 md:col-span-5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Perfil do Candidato</CardTitle>
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
              </div>
              <CardDescription>
                Informações completas sobre o candidato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="resume">
                <TabsList className="mb-4 gap-1">
                  <TabsTrigger
                    value="resume"
                    className="border-1 border-black/50 rounded-sm"
                  >
                    Currículo
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience"
                    className="border-1 border-black/50 rounded-sm"
                  >
                    Experiência
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="border-1 border-black/50 rounded-sm"
                  >
                    Formação
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="resume" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{candidate.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{candidate.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Candidatura: {candidate.applyDate}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Resumo Profissional</h3>
                    <p>{candidate.summary}</p>

                    <h4 className="text-md font-medium mt-4">Habilidades:</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Experiência Profissional
                  </h3>
                  <div className="space-y-6">
                    {candidate.experiences.map((exp, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{exp.title}</h4>
                          <span className="text-sm text-muted-foreground">
                            {exp.period}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building className="h-4 w-4" />
                          <span>{exp.company}</span>
                        </div>
                        <p className="text-sm">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  <h3 className="text-lg font-medium">Formação Acadêmica</h3>
                  <div className="space-y-6">
                    {candidate.education.map((edu, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{edu.degree}</h4>
                          <span className="text-sm text-muted-foreground">
                            {edu.period}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building className="h-4 w-4" />
                          <span>{edu.institution}</span>
                        </div>
                        {edu.description && (
                          <p className="text-sm">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Baixar Currículo
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Atualizar Status</Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Atualizar Status do Candidato</DialogTitle>
                    <DialogDescription>
                      Altere o status do candidato e forneça feedback quando
                      necessário.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="status" className="text-sm font-medium">
                        Status
                      </label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Selecione um status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Novo">Novo</SelectItem>
                          <SelectItem value="Em análise">Em análise</SelectItem>
                          <SelectItem value="Avaliado">Avaliado</SelectItem>
                          <SelectItem value="Aprovado">Aprovado</SelectItem>
                          <SelectItem value="Rejeitado">Rejeitado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="feedback" className="text-sm font-medium">
                        Feedback{' '}
                        {status === 'Rejeitado' && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <Textarea
                        id="feedback"
                        placeholder="Forneça um feedback para o candidato..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="min-h-[120px]"
                      />
                      {status === 'Rejeitado' && (
                        <p className="text-xs text-muted-foreground">
                          O feedback é obrigatório para candidatos rejeitados.
                        </p>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={updateCandidateStatus}>Salvar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          <div className="col-span-7 md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vaga</CardTitle>
                <CardDescription>Detalhes da vaga</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{job?.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {job?.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{job?.location}</span>
                  </div>
                  <Link
                    href={`/dashboard/recrutadores/vagas/${candidate.jobId}`}
                  >
                    <Button variant="outline" className="w-full">
                      Ver Vaga
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documentos</CardTitle>
                <CardDescription>Arquivos do candidato</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {candidate.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{doc.name}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico</CardTitle>
                <CardDescription>Atividades recentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidate.history.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p>{item.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
    phone: '(11) 98765-4321',
    location: 'São Paulo, SP',
    jobId: 1,
    experience: '5 anos',
    applyDate: '15-01-2024',
    status: 'Em análise',
    summary:
      'Desenvolvedor Full Stack com 5 anos de experiência em desenvolvimento web, especializado em React, Node.js e bancos de dados SQL/NoSQL. Apaixonado por criar soluções eficientes e escaláveis.',
    skills: [
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'PostgreSQL',
      'Git',
      'Docker',
    ],
    experiences: [
      {
        title: 'Desenvolvedor Full Stack Sênior',
        company: 'TechInnovate',
        period: 'Jan 2022 - Presente',
        description:
          'Desenvolvimento de aplicações web utilizando React, Node.js e MongoDB. Implementação de APIs RESTful e integração com serviços de terceiros.',
      },
      {
        title: 'Desenvolvedor Front-end',
        company: 'WebSolutions',
        period: 'Mar 2019 - Dez 2021',
        description:
          'Desenvolvimento de interfaces de usuário responsivas utilizando React e TypeScript. Colaboração com designers e back-end developers.',
      },
    ],
    education: [
      {
        degree: 'Bacharelado em Ciência da Computação',
        institution: 'Universidade de São Paulo',
        period: '2015 - 2019',
      },
      {
        degree: 'Curso de Especialização em Desenvolvimento Web',
        institution: 'Digital House',
        period: '2020',
        description: 'Especialização em tecnologias web modernas.',
      },
    ],
    documents: [{ name: 'Currículo.pdf', url: '#' }],
    history: [
      { action: 'Candidatura recebida', date: '15-01-2024, 14:30' },
      { action: 'Currículo analisado', date: '16-01-2024, 09:45' },
      {
        action: "Status alterado para 'Em análise'",
        date: '17-01-2024, 10:30',
      },
    ],
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    phone: '(11) 91234-5678',
    location: 'São Paulo, SP',
    jobId: 1,
    experience: '3 anos',
    applyDate: '16-01-2024',
    status: 'Avaliado',
    summary:
      'Desenvolvedora Full Stack com 3 anos de experiência, especializada em JavaScript e frameworks modernos. Experiência em desenvolvimento de aplicações web e mobile.',
    skills: [
      'JavaScript',
      'React',
      'React Native',
      'Node.js',
      'Express',
      'MongoDB',
      'Git',
    ],
    experiences: [
      {
        title: 'Desenvolvedora Full Stack',
        company: 'MobileTech',
        period: 'Jun 2021 - Presente',
        description:
          'Desenvolvimento de aplicações web e mobile utilizando React, React Native e Node.js. Implementação de APIs e integração com serviços externos.',
      },
      {
        title: 'Desenvolvedora Front-end',
        company: 'WebDev',
        period: 'Fev 2020 - Mai 2021',
        description:
          'Desenvolvimento de interfaces responsivas e acessíveis utilizando React e TypeScript.',
      },
    ],
    education: [
      {
        degree: 'Bacharelado em Sistemas de Informação',
        institution: 'Universidade Federal de São Paulo',
        period: '2016 - 2020',
      },
    ],
    documents: [{ name: 'Currículo_Maria.pdf', url: '#' }],
    history: [
      { action: 'Candidatura recebida', date: '16-01-2024, 10:15' },
      { action: 'Currículo analisado', date: '17-01-2024, 11:30' },
      { action: "Status alterado para 'Avaliado'", date: '18-01-2024, 14:45' },
    ],
  },
]
