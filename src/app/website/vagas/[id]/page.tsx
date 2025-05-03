'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button, Chip } from '@nextui-org/react'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { useToast } from '@/hooks/use-toast'

interface Job {
  id: number
  title: string
  company: string
  location: string
  description: string
  salary: number
  postedTime: string
  contractType: string
  workType: string
  pcd: boolean
  category: string
  level: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  candidatesMustKnow: string[]
}

interface RelatedJob {
  id: number
  title: string
  company: string
  salary: string
  vacancies: string
  location: string
}

interface MockCurriculum {
  id: number
  name: string
  updatedAt: string
}

// Mock data para currículos
const mockCurriculums: MockCurriculum[] = [
  { id: 1, name: 'Currículo Principal', updatedAt: '2024-12-01' },
  { id: 2, name: 'Currículo Tech', updatedAt: '2024-11-15' },
  { id: 3, name: 'Currículo Design', updatedAt: '2024-10-20' },
]

// Mock data para vagas relacionadas
const relatedJobs: RelatedJob[] = [
  {
    id: 2,
    title: 'UX Designer',
    company: 'Tech Solutions',
    salary: 'R$ 3.500,00',
    vacancies: '2 vagas',
    location: 'São Paulo',
  },
  {
    id: 3,
    title: 'UI Designer',
    company: 'Creative Studio',
    salary: 'A combinar',
    vacancies: '1 vaga',
    location: 'Remoto',
  },
  {
    id: 4,
    title: 'Product Manager',
    company: 'StartupX',
    salary: 'R$ 8.000,00',
    vacancies: '1 vaga',
    location: 'Híbrido',
  },
]

// Mock data - em produção isso viria de uma API
const getJobById = (id: number): Job | undefined => {
  const jobs: Job[] = [
    {
      id: 1,
      title: 'Product Designer',
      company: 'Gojek',
      location: 'Singapore',
      description:
        'Como Product Designer, você será responsável por criar experiências digitais excepcionais para nossos usuários. Trabalhará diretamente com times de produto, engenharia e pesquisa para desenvolver soluções inovadoras que atendam às necessidades dos nossos clientes.',
      salary: 5000,
      postedTime: '2024-12-10',
      contractType: 'CLT',
      workType: 'Remoto',
      pcd: false,
      category: 'Design',
      level: 'Pleno',
      requirements: [
        'Formação em Design, UI/UX ou áreas relacionadas',
        'Mínimo de 3 anos de experiência em product design',
        'Domínio de Figma, Sketch ou Adobe XD',
        'Conhecimento em design systems e componentização',
        'Inglês avançado para comunicação com times globais',
      ],
      responsibilities: [
        'Criar interfaces intuitivas e acessíveis para web e mobile',
        'Conduzir pesquisas com usuários e testes de usabilidade',
        'Colaborar com PMs e desenvolvedores na definição de requisitos',
        'Desenvolver e manter o design system da empresa',
        'Apresentar soluções de design para stakeholders',
        'Iterar designs baseado em feedback e métricas',
        'Documentar padrões e guidelines de design',
      ],
      candidatesMustKnow: [
        'Experiência com metodologias ágeis (Scrum/Kanban)',
        'Portfolio demonstrando projetos de produto digital',
        'Conhecimento em HTML/CSS é um diferencial',
        'Experiência com ferramentas de prototipagem',
      ],
      benefits: [
        'Vale refeição/alimentação',
        'Plano de saúde premium',
        'Gympass',
        'Auxílio home office',
        'Horário flexível',
        'Bônus anual por performance',
      ],
    },
  ]

  return jobs.find((job) => job.id === id)
}

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [job, setJob] = useState<Job | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userCurriculums, setUserCurriculums] = useState<MockCurriculum[]>([])
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('')
  const [hasApplied, setHasApplied] = useState(false)

  // Verificar autenticação
  useEffect(() => {
    const checkAuth = () => {
      const token =
        localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
      setIsAuthenticated(!!token)

      // Mock: se autenticado, simula que o usuário tem currículos
      if (token) {
        setUserCurriculums(mockCurriculums)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    const jobId = parseInt(params.id as string)
    const foundJob = getJobById(jobId)
    setJob(foundJob)
    setLoading(false)

    // Verificar se o usuário já se candidatou (simulação)
    const appliedJobs = localStorage.getItem('appliedJobs')
    if (appliedJobs) {
      const appliedJobIds = JSON.parse(appliedJobs)
      setHasApplied(appliedJobIds.includes(jobId))
    }
  }, [params.id])

  const handleApplyClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedCurriculum('')
  }

  const handleLogin = () => {
    router.push('/auth/login')
  }

  const handleCreateCurriculum = () => {
    router.push('/dashboard/curriculum/create')
  }

  const handleConfirmApplication = () => {
    if (userCurriculums.length > 1 && !selectedCurriculum) {
      toast({
        title: 'Selecione um currículo',
        description: 'Por favor, escolha qual currículo deseja enviar.',
        variant: 'warning',
      })
      return
    }

    // Salvar que o usuário se candidatou a esta vaga
    const jobId = parseInt(params.id as string)
    const appliedJobs = localStorage.getItem('appliedJobs')
    const appliedJobIds = appliedJobs ? JSON.parse(appliedJobs) : []

    if (!appliedJobIds.includes(jobId)) {
      appliedJobIds.push(jobId)
      localStorage.setItem('appliedJobs', JSON.stringify(appliedJobIds))
    }

    setHasApplied(true)

    toast({
      title: 'Candidatura enviada!',
      description: 'Seu currículo foi enviado com sucesso para esta vaga.',
      variant: 'success',
    })

    handleModalClose()
  }

  const renderModalContent = () => {
    if (!isAuthenticated) {
      return (
        <>
          <DialogHeader>
            <DialogTitle>Login necessário</DialogTitle>
            <DialogDescription>
              Você precisa estar logado para se candidatar a uma vaga.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 mt-4">
            <Button onClick={handleLogin} color="primary">
              Fazer login
            </Button>
            <Button onClick={handleModalClose} variant="bordered">
              Fechar
            </Button>
          </div>
        </>
      )
    }

    if (userCurriculums.length === 0) {
      return (
        <>
          <DialogHeader>
            <DialogTitle>Currículo necessário</DialogTitle>
            <DialogDescription>
              É necessário criar um currículo para se candidatar a esta vaga.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 mt-4">
            <Button onClick={handleCreateCurriculum} color="primary">
              Cadastrar currículo
            </Button>
            <Button onClick={handleModalClose} variant="bordered">
              Fechar
            </Button>
          </div>
        </>
      )
    }

    if (userCurriculums.length === 1) {
      return (
        <>
          <DialogHeader>
            <DialogTitle>Confirmar candidatura</DialogTitle>
            <DialogDescription>
              Deseja enviar seu currículo ({userCurriculums[0].name}) para esta
              vaga?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 mt-4">
            <Button onClick={handleConfirmApplication} color="primary">
              Confirmar
            </Button>
            <Button onClick={handleModalClose} variant="bordered">
              Cancelar
            </Button>
          </div>
        </>
      )
    }

    return (
      <>
        <DialogHeader>
          <DialogTitle>Selecione um currículo</DialogTitle>
          <DialogDescription>
            Escolha qual currículo deseja enviar para esta vaga.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Select
            value={selectedCurriculum}
            onValueChange={setSelectedCurriculum}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um currículo" />
            </SelectTrigger>
            <SelectContent>
              {userCurriculums.map((curriculum) => (
                <SelectItem
                  key={curriculum.id}
                  value={curriculum.id.toString()}
                >
                  {curriculum.name} - Atualizado em{' '}
                  {new Date(curriculum.updatedAt).toLocaleDateString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4 mt-4">
          <Button
            onClick={handleConfirmApplication}
            color="primary"
            disabled={!selectedCurriculum}
          >
            Enviar currículo
          </Button>
          <Button onClick={handleModalClose} variant="bordered">
            Cancelar
          </Button>
        </div>
      </>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto py-16">
        <div className="flex justify-center items-center h-64">
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container mx-auto py-16">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-xl mb-4">Vaga não encontrada</p>
          <Button color="primary" onClick={() => router.push('/website/vagas')}>
            Voltar para lista de vagas
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        color="primary"
        variant="light"
        startContent={<ArrowLeft className="h-4 w-4" />}
        onClick={() => router.push('/website/vagas')}
        className="mb-6"
      >
        Voltar para vagas
      </Button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Coluna principal */}
        <div className="lg:w-2/3">
          <div className="bg-blue-500 text-white p-6 rounded-t-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-500 font-bold text-2xl">
                  {job.company.charAt(0).toUpperCase()}
                </span>
              </div>
              <h1 className="text-2xl font-bold">{job.title}</h1>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <Chip
                color="primary"
                variant="flat"
                className="bg-white/20 text-white"
              >
                {job.category}
              </Chip>
              <Chip
                color="primary"
                variant="flat"
                className="bg-white/20 text-white"
              >
                {job.level}
              </Chip>
              <Chip
                color="primary"
                variant="flat"
                className="bg-white/20 text-white"
              >
                {job.workType}
              </Chip>
              <Chip
                color="primary"
                variant="flat"
                className="bg-white/20 text-white"
              >
                {job.contractType}
              </Chip>
            </div>
          </div>

          <div className="bg-white border rounded-b-lg p-6">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Descrição da vaga</h2>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Setor</h3>
                <p>{job.category}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Descrição</h3>
                <p className="whitespace-pre-line">{job.description}</p>
              </div>
            </section>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Responsabilidades:
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Requisitos Básicos
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  {job.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {job.candidatesMustKnow && job.candidatesMustKnow.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Requisitos Desejáveis
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  {job.candidatesMustKnow.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Experiências</h2>
              <h3 className="font-semibold text-gray-700 mb-2">
                Experiência Mínima
              </h3>
              <p>6 meses em {job.category}</p>
            </section>

            {job.benefits && job.benefits.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Benefícios</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {job.benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Salários</h2>
              <p>
                De R$ {job.salary.toFixed(2).replace('.', ',')} a R${' '}
                {(job.salary * 1.2).toFixed(2).replace('.', ',')}
              </p>
            </section>
          </div>
        </div>

        {/* Coluna lateral */}
        <div className="lg:w-1/3">
          <div className="bg-white border rounded-lg p-6 sticky top-4">
            <Button
              color="primary"
              className="w-full mb-4"
              size="lg"
              onClick={handleApplyClick}
              disabled={hasApplied}
            >
              {hasApplied ? (
                'Candidatura enviada'
              ) : (
                <>
                  Candidate-se <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <h3 className="font-semibold mb-4">Vagas que podem interessar</h3>

            {/* Cards de vagas relacionadas */}
            <div className="space-y-2">
              {relatedJobs.map((relatedJob) => (
                <div
                  key={relatedJob.id}
                  onClick={() => router.push(`/website/vagas/${relatedJob.id}`)}
                  className="w-full p-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors border rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-base mb-1">
                        {relatedJob.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Salário: {relatedJob.salary}
                      </p>
                      <p className="text-sm text-gray-500">
                        {relatedJob.vacancies} - {relatedJob.location}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de candidatura */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white">
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}
