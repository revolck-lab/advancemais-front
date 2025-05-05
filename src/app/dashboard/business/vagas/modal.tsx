'use client'

import { useState } from 'react'
import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog/dialog'
import { Badge } from '@/components/ui/badge/badge'

import { Separator } from '@/components/ui/separator/separator'

interface Job {
  id: number
  position: string
  type: string
  postedDate: string
  lastDateToApply: string
  status: string
  sector?: string
  description?: string
  responsibilities?: string[]
  basicRequirements?: string[]
  desiredRequirements?: string[]
  minExperience?: string
  benefits?: string[]
  salary?: {
    min: number
    max: number
  }
}

interface JobViewModalProps {
  job: Job
}

// Dados expandidos para exemplo
const jobsData: Record<number, Job> = {
  1: {
    id: 1,
    position: 'Desenvolvedor Full Stack',
    type: 'Tempo Integral',
    postedDate: '12-01-2024',
    lastDateToApply: '24-01-2024',
    status: 'Ativo',
    sector: 'Tecnologia',
    description:
      'Como Desenvolvedor Full Stack, você será responsável por desenvolver aplicações web completas, trabalhando tanto no frontend quanto no backend. Colaborará com times de produto e design para criar soluções escaláveis e performáticas.',
    responsibilities: [
      'Desenvolver APIs RESTful e GraphQL',
      'Criar interfaces responsivas com React/Next.js',
      'Gerenciar bancos de dados relacionais e não-relacionais',
      'Implementar testes automatizados',
      'Participar de revisões de código',
      'Contribuir para a arquitetura do sistema',
      'Documentar funcionalidades desenvolvidas',
    ],
    basicRequirements: [
      'Graduação em Ciência da Computação ou áreas relacionadas',
      'Mínimo de 3 anos de experiência com desenvolvimento web',
      'Domínio de JavaScript/TypeScript',
      'Experiência com React e Node.js',
      'Conhecimento em banco de dados SQL e NoSQL',
    ],
    desiredRequirements: [
      'Experiência com AWS ou outra cloud',
      'Conhecimento em Docker e Kubernetes',
      'Familiaridade com CI/CD',
      'Experiência com metodologias ágeis',
    ],
    minExperience: '3 anos em desenvolvimento',
    benefits: [
      'Vale refeição/alimentação',
      'Plano de saúde premium',
      'Gympass',
      'Auxílio home office',
      'Horário flexível',
      'Bônus anual por performance',
    ],
    salary: {
      min: 8000,
      max: 12000,
    },
  },
  2: {
    id: 2,
    position: 'Designer UX/UI',
    type: 'Meio Período',
    postedDate: '13-01-2024',
    lastDateToApply: '25-01-2024',
    status: 'Ativo',
    sector: 'Design',
    description:
      'Como Product Designer, você será responsável por criar experiências digitais excepcionais para nossos usuários. Trabalhará diretamente com times de produto, engenharia e pesquisa para desenvolver soluções inovadoras que atendam às necessidades dos nossos clientes.',
    responsibilities: [
      'Criar interfaces intuitivas e acessíveis para web e mobile',
      'Conduzir pesquisas com usuários e testes de usabilidade',
      'Colaborar com PMs e desenvolvedores na definição de requisitos',
      'Desenvolver e manter o design system da empresa',
      'Apresentar soluções de design para stakeholders',
      'Iterar designs baseado em feedback e métricas',
      'Documentar padrões e guidelines de design',
    ],
    basicRequirements: [
      'Formação em Design, UI/UX ou áreas relacionadas',
      'Mínimo de 3 anos de experiência em product design',
      'Domínio de Figma, Sketch ou Adobe XD',
      'Conhecimento em design systems e componentização',
      'Inglês avançado para comunicação com times globais',
    ],
    desiredRequirements: [
      'Experiência com metodologias ágeis (Scrum/Kanban)',
      'Portfolio demonstrando projetos de produto digital',
      'Conhecimento em HTML/CSS é um diferencial',
      'Experiência com ferramentas de prototipagem',
    ],
    minExperience: '6 meses em Design',
    benefits: [
      'Vale refeição/alimentação',
      'Plano de saúde premium',
      'Gympass',
      'Auxílio home office',
      'Horário flexível',
      'Bônus anual por performance',
    ],
    salary: {
      min: 5000,
      max: 6000,
    },
  },
}

export function JobViewModal({ job }: JobViewModalProps) {
  const [open, setOpen] = useState(false)

  // Busca dados expandidos da vaga
  const fullJobData = jobsData[job.id] || job

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-500 hover:text-gray-700"
        onClick={() => setOpen(true)}
      >
        <Eye className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {fullJobData.position}
            </DialogTitle>
          </DialogHeader>

          <div className="max-h-[calc(90vh-8rem)] overflow-y-auto pr-4">
            <div className="space-y-6">
              {/* Informações básicas */}
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="px-3 py-1">
                  {fullJobData.type}
                </Badge>
                <Badge
                  className={
                    fullJobData.status === 'Ativo'
                      ? 'bg-green-100 text-green-800 hover:bg-green-100'
                      : 'bg-red-100 text-red-800 hover:bg-red-100'
                  }
                >
                  {fullJobData.status}
                </Badge>
                {fullJobData.sector && (
                  <Badge variant="secondary" className="px-3 py-1">
                    {fullJobData.sector}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">Data de Publicação:</span>{' '}
                  {fullJobData.postedDate}
                </div>
                <div>
                  <span className="font-semibold">Prazo para candidatura:</span>{' '}
                  {fullJobData.lastDateToApply}
                </div>
              </div>

              <Separator />

              {/* Descrição da vaga */}
              {fullJobData.description && (
                <section>
                  <h3 className="text-lg font-semibold mb-2">
                    Descrição da vaga
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {fullJobData.description}
                  </p>
                </section>
              )}

              {/* Responsabilidades */}
              {fullJobData.responsibilities &&
                fullJobData.responsibilities.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold mb-2">
                      Responsabilidades
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {fullJobData.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )}

              {/* Requisitos básicos */}
              {fullJobData.basicRequirements &&
                fullJobData.basicRequirements.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold mb-2">
                      Requisitos Básicos
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {fullJobData.basicRequirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )}

              {/* Requisitos desejáveis */}
              {fullJobData.desiredRequirements &&
                fullJobData.desiredRequirements.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold mb-2">
                      Requisitos Desejáveis
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {fullJobData.desiredRequirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )}

              {/* Experiência */}
              {fullJobData.minExperience && (
                <section>
                  <h3 className="text-lg font-semibold mb-2">
                    Experiência Mínima
                  </h3>
                  <p className="text-gray-700">{fullJobData.minExperience}</p>
                </section>
              )}

              {/* Benefícios */}
              {fullJobData.benefits && fullJobData.benefits.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold mb-2">Benefícios</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {fullJobData.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Salário */}
              {fullJobData.salary && (
                <section>
                  <h3 className="text-lg font-semibold mb-2">Salário</h3>
                  <p className="text-gray-700 font-medium">
                    De R$ {fullJobData.salary.min.toLocaleString('pt-BR')} a R${' '}
                    {fullJobData.salary.max.toLocaleString('pt-BR')}
                  </p>
                </section>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
