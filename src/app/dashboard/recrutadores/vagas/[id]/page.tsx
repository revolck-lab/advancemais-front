'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  ThumbsDown,
  ThumbsUp,
  Users,
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
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast/toast'

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()

  const resolvedParams = use(params)
  const jobId = Number.parseInt(resolvedParams.id)

  const job = jobs.find((j) => j.id === jobId) || jobs[0]

  const [rejectReason, setRejectReason] = useState('')
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)

  // Função para aprovar a vaga
  const approveJob = () => {
    toast({
      variant: 'success',
      title: 'Vaga aprovada com sucesso!',
      description: `A vaga "${job.title}" foi publicada.`,
      action: <ToastAction altText="Ver vagas">Ver vagas</ToastAction>,
    })

    // Aqui você implementaria a lógica para atualizar o status da vaga no backend
    router.push('/dashboard/recrutadores/vagas')
  }

  // Função para rejeitar a vaga
  const rejectJob = () => {
    if (!rejectReason.trim()) {
      toast({
        variant: 'destructive',
        title: 'Erro ao rejeitar vaga',
        description: 'É necessário informar um motivo para rejeitar a vaga.',
      })
      return
    }

    toast({
      variant: 'destructive',
      title: 'Vaga rejeitada',
      description: `A vaga "${job.title}" foi rejeitada e retornada como rascunho.`,
      action: <ToastAction altText="Ver vagas">Ver vagas</ToastAction>,
    })

    // Aqui você implementaria a lógica para atualizar o status da vaga no backend
    setIsRejectDialogOpen(false)
    router.push('/dashboard/recrutadores/vagas')
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/recrutadores/vagas">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{job.title}</h1>
            <p className="text-muted-foreground">{job.company}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="col-span-7 md:col-span-5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Detalhes da Vaga</CardTitle>
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
              </div>
              <CardDescription>
                Informações completas sobre a vaga
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="description">
                <TabsList className="mb-4 bg-white gap-2">
                  <TabsTrigger
                    value="description"
                    className="border-1 border-black/50 rounded-sm"
                  >
                    Descrição
                  </TabsTrigger>
                  <TabsTrigger
                    value="requirements"
                    className="border-1 border-black/50 rounded-sm"
                  >
                    Requisitos
                  </TabsTrigger>
                  <TabsTrigger
                    value="benefits"
                    className="border-1 border-black/50 rounded-sm"
                  >
                    Benefícios
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Publicada em: {job.startDate}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Descrição da Vaga</h3>
                    <p>{job.description}</p>

                    <h4 className="text-md font-medium mt-4">
                      Responsabilidades:
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="space-y-4">
                  <h3 className="text-lg font-medium">Requisitos</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="benefits" className="space-y-4">
                  <h3 className="text-lg font-medium">Benefícios</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Link href={`/dashboard/recrutadores/vagas/editar/${job.id}`}>
                <Button variant="outline">Editar</Button>
              </Link>
              <div className="flex gap-2">
                {job.status === 'Pendente' && (
                  <>
                    <Dialog
                      open={isRejectDialogOpen}
                      onOpenChange={setIsRejectDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="secondary">
                          <ThumbsDown className="mr-2 h-4 w-4" />
                          Recusar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white">
                        <DialogHeader>
                          <DialogTitle>Recusar Vaga</DialogTitle>
                          <DialogDescription>
                            Informe o motivo da recusa. Esta informação será
                            enviada para a empresa.
                          </DialogDescription>
                        </DialogHeader>
                        <Textarea
                          placeholder="Descreva o motivo da recusa..."
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          className="min-h-[120px]"
                        />
                        <DialogFooter className="mt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsRejectDialogOpen(false)}
                          >
                            Cancelar
                          </Button>
                          <Button variant="secondary" onClick={rejectJob}>
                            Recusar Vaga
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button onClick={approveJob}>
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Aprovar
                    </Button>
                  </>
                )}

                {job.status === 'Ativo' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <ThumbsDown className="mr-2 h-4 w-4" />
                        Despublicar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Despublicar Vaga</DialogTitle>
                        <DialogDescription>
                          Informe o motivo para despublicar esta vaga. Esta
                          informação será enviada para a empresa.
                        </DialogDescription>
                      </DialogHeader>
                      <Textarea
                        placeholder="Descreva o motivo..."
                        className="min-h-[120px]"
                      />
                      <DialogFooter className="mt-4">
                        <Button variant="outline">Cancelar</Button>
                        <Button variant="destructive">Despublicar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardFooter>
          </Card>

          <div className="col-span-7 md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Candidatos</CardTitle>
                <CardDescription>Candidatos para esta vaga</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold">
                      {job.candidatesCount}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      candidatos
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/dashboard/recrutadores/candidatos/${job.id}`}
                  className="w-full"
                >
                  <Button className="w-full">
                    <Users className="mr-2 h-4 w-4" />
                    Ver Candidatos
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico</CardTitle>
                <CardDescription>Atividades recentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {job.history.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
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
    type: 'Tempo Integral',
    startDate: '12-01-2024',
    endDate: '24-01-2024',
    status: 'Pendente',
    description:
      'Estamos procurando um desenvolvedor Full Stack talentoso para se juntar à nossa equipe de tecnologia em rápido crescimento. O candidato ideal terá experiência com desenvolvimento web moderno, incluindo frontend e backend.',
    responsibilities: [
      'Desenvolver e manter aplicações web utilizando React, Node.js e outras tecnologias modernas',
      'Colaborar com designers e product managers para criar interfaces intuitivas',
      'Implementar APIs RESTful e integrar com serviços de terceiros',
      'Otimizar aplicações para máxima velocidade e escalabilidade',
      'Participar de code reviews e garantir a qualidade do código',
    ],
    requirements: [
      'Experiência comprovada como desenvolvedor Full Stack (mínimo 3 anos)',
      'Proficiência em JavaScript/TypeScript, React, Node.js',
      'Conhecimento de bancos de dados SQL e NoSQL',
      'Experiência com metodologias ágeis',
      'Boa comunicação e trabalho em equipe',
    ],
    benefits: [
      'Salário competitivo',
      'Plano de saúde e odontológico',
      'Vale refeição e vale transporte',
      'Horário flexível e home office',
      'Ambiente de trabalho descontraído',
    ],
    candidatesCount: 12,
    history: [
      { action: 'Vaga recebida', date: '10-01-2024, 14:30' },
      { action: 'Revisão inicial', date: '11-01-2024, 09:45' },
      { action: 'Aguardando aprovação', date: '12-01-2024, 10:30' },
    ],
  },
]
