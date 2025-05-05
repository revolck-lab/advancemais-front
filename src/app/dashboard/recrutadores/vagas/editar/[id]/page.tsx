'use client'

import type React from 'react'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Save } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Textarea } from '@/components/ui/textarea/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Label } from '@/components/ui/label/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'
import { Separator } from '@/components/ui/separator/separator'
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast/toast'

export default function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const resolvedParams = use(params)
  const jobId = Number.parseInt(resolvedParams.id)
  const jobData = jobs.find((j) => j.id === jobId) || jobs[0]

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    title: jobData.title,
    company: jobData.company,
    location: jobData.location,
    type: jobData.type,
    startDate: jobData.startDate,
    endDate: jobData.endDate,
    status: jobData.status,
    description: jobData.description,
    responsibilities: jobData.responsibilities.join('\n'),
    requirements: jobData.requirements.join('\n'),
    benefits: jobData.benefits.join('\n'),
  })

  // Função para atualizar o estado do formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Função para atualizar campos de select
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Função para salvar as alterações
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (
      !formData.title.trim() ||
      !formData.company.trim() ||
      !formData.description.trim()
    ) {
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar',
        description: 'Por favor, preencha todos os campos obrigatórios.',
      })
      return
    }

    // Aqui você implementaria a lógica para salvar as alterações no backend
    toast({
      variant: 'success',
      title: 'Vaga atualizada com sucesso!',
      description: `As alterações na vaga "${formData.title}" foram salvas.`,
      action: <ToastAction altText="Ver vaga">Ver vaga</ToastAction>,
    })

    // Redirecionar para a página de detalhes da vaga
    router.push(`/dashboard/recrutadores/vagas/${jobId}`)
  }

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
            <h1 className="text-2xl font-bold tracking-tight">Editar Vaga</h1>
            <p className="text-muted-foreground">{jobData.title}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="col-span-7 md:col-span-5">
              <CardHeader>
                <CardTitle>Informações da Vaga</CardTitle>
                <CardDescription>
                  Edite os detalhes da vaga de emprego
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic">
                  <TabsList className="mb-4 gap-1">
                    <TabsTrigger
                      value="basic"
                      className="border-1 border-black/50 rounded-sm"
                    >
                      Informações Básicas
                    </TabsTrigger>
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

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="title">
                          Título da Vaga <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Ex: Desenvolvedor Full Stack"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">
                          Empresa <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Ex: TechSolutions"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">
                          Localização <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="Ex: São Paulo, SP"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Tipo de Contrato</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) =>
                            handleSelectChange('type', value)
                          }
                        >
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tempo Integral">
                              Tempo Integral
                            </SelectItem>
                            <SelectItem value="Meio Período">
                              Meio Período
                            </SelectItem>
                            <SelectItem value="Freelancer">
                              Freelancer
                            </SelectItem>
                            <SelectItem value="Estágio">Estágio</SelectItem>
                            <SelectItem value="Temporário">
                              Temporário
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Data de Início</Label>
                        <div className="flex items-center">
                          <Input
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            placeholder="DD-MM-AAAA"
                          />
                          <Calendar className="ml-2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">Data de Término</Label>
                        <div className="flex items-center">
                          <Input
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            placeholder="DD-MM-AAAA"
                          />
                          <Calendar className="ml-2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) =>
                            handleSelectChange('status', value)
                          }
                        >
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ativo">Ativo</SelectItem>
                            <SelectItem value="Pendente">Pendente</SelectItem>
                            <SelectItem value="Rascunho">Rascunho</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="description" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Descrição da Vaga{' '}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Descreva a vaga em detalhes..."
                        className="min-h-[150px]"
                        required
                      />
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <Label htmlFor="responsibilities">
                        Responsabilidades
                      </Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Insira uma responsabilidade por linha
                      </p>
                      <Textarea
                        id="responsibilities"
                        name="responsibilities"
                        value={formData.responsibilities}
                        onChange={handleChange}
                        placeholder="- Desenvolver aplicações web
- Colaborar com designers
- Implementar APIs"
                        className="min-h-[200px] font-mono text-sm"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="requirements" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="requirements">Requisitos</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Insira um requisito por linha
                      </p>
                      <Textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        placeholder="- Experiência com React
- Conhecimento de Node.js
- Inglês intermediário"
                        className="min-h-[200px] font-mono text-sm"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="benefits" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="benefits">Benefícios</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Insira um benefício por linha
                      </p>
                      <Textarea
                        id="benefits"
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleChange}
                        placeholder="- Plano de saúde
- Vale refeição
- Home office"
                        className="min-h-[200px] font-mono text-sm"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Link href={`/dashboard/recrutadores/vagas/${jobId}`}>
                  <Button variant="outline">Cancelar</Button>
                </Link>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </CardFooter>
            </Card>

            <div className="col-span-7 md:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dicas</CardTitle>
                  <CardDescription>Como criar uma boa vaga</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h3 className="font-medium">Título claro</h3>
                      <p className="text-muted-foreground">
                        Use títulos específicos que descrevam claramente a
                        função.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Descrição detalhada</h3>
                      <p className="text-muted-foreground">
                        Forneça informações completas sobre as responsabilidades
                        e o dia a dia.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Requisitos realistas</h3>
                      <p className="text-muted-foreground">
                        Liste apenas os requisitos realmente necessários para a
                        função.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Benefícios atrativos</h3>
                      <p className="text-muted-foreground">
                        Destaque os diferenciais da sua empresa e os benefícios
                        oferecidos.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campos Obrigatórios</CardTitle>
                  <CardDescription>Informações essenciais</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">*</span>
                      <span>Título da Vaga</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">*</span>
                      <span>Empresa</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">*</span>
                      <span>Localização</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">*</span>
                      <span>Descrição da Vaga</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
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
