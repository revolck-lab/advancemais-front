'use client'

import React, { useState, useEffect } from 'react'
import { Checkbox, Input, Button, Pagination } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import {
  MapPin,
  Briefcase,
  Accessibility,
  Monitor,
  Heart,
  Eye,
} from 'lucide-react'
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
  salary: number
  postedTime: string
  contractType: string
  workType: string
  pcd: boolean
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

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Product Designer',
    company: 'Gojek',
    location: 'Singapore',
    salary: 2500,
    postedTime: '2024-12-10',
    contractType: 'CLT',
    workType: 'Remoto',
    pcd: false,
  },
  {
    id: 2,
    title: 'Copywriting Specialist',
    company: 'Odama Studio',
    location: 'Paris',
    salary: 1800,
    postedTime: '2024-12-08',
    contractType: 'PJ',
    workType: 'Presencial',
    pcd: true,
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'Twitter',
    location: 'Málaga',
    salary: 2000,
    postedTime: '2024-12-05',
    contractType: 'CLT',
    workType: 'Híbrido',
    pcd: false,
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    company: 'Facebook',
    location: 'New York',
    salary: 4000,
    postedTime: '2024-11-15',
    contractType: 'CLT',
    workType: 'Híbrido',
    pcd: true,
  },
  {
    id: 5,
    title: 'Backend Developer',
    company: 'Google',
    location: 'California',
    salary: 4500,
    postedTime: '2024-11-10',
    contractType: 'PJ',
    workType: 'Presencial',
    pcd: false,
  },
  {
    id: 6,
    title: 'Frontend Developer',
    company: 'Microsoft',
    location: 'Seattle',
    salary: 3500,
    postedTime: '2024-11-05',
    contractType: 'CLT',
    workType: 'Remoto',
    pcd: false,
  },
]

const ITEMS_PER_PAGE = 5

const JobsCareer: React.FC = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs)
  const [filters, setFilters] = useState({
    keyword: '',
    contractType: [] as string[],
    workType: [] as string[],
    pcd: false,
    salary: 0,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userCurriculums, setUserCurriculums] = useState<MockCurriculum[]>([])
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('')
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
  const [appliedJobs, setAppliedJobs] = useState<number[]>([])

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

      // Verificar quais vagas o usuário já se candidatou
      const savedAppliedJobs = localStorage.getItem('appliedJobs')
      if (savedAppliedJobs) {
        setAppliedJobs(JSON.parse(savedAppliedJobs))
      }
    }

    checkAuth()
  }, [])

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)

  const handleFilterChange = (
    key: keyof typeof filters,
    value: string | string[] | boolean | number
  ) => {
    const updatedFilters = { ...filters, [key]: value }

    let updatedJobs = mockJobs

    if (updatedFilters.keyword) {
      updatedJobs = updatedJobs.filter((job) =>
        job.title.toLowerCase().includes(updatedFilters.keyword.toLowerCase())
      )
    }

    if (updatedFilters.contractType.length > 0) {
      updatedJobs = updatedJobs.filter((job) =>
        updatedFilters.contractType.includes(job.contractType)
      )
    }

    if (updatedFilters.workType.length > 0) {
      updatedJobs = updatedJobs.filter((job) =>
        updatedFilters.workType.includes(job.workType)
      )
    }

    if (updatedFilters.pcd) {
      updatedJobs = updatedJobs.filter((job) => job.pcd)
    }

    if (updatedFilters.salary > 0) {
      updatedJobs = updatedJobs.filter(
        (job) => job.salary >= updatedFilters.salary
      )
    }

    setFilters(updatedFilters)
    setFilteredJobs(updatedJobs)
    setCurrentPage(1)
  }

  const handleViewJob = (jobId: number) => {
    router.push(`/website/vagas/${jobId}`)
  }

  const handleApplyClick = (jobId: number) => {
    setSelectedJobId(jobId)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedCurriculum('')
    setSelectedJobId(null)
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
    if (selectedJobId) {
      const updatedAppliedJobs = [...appliedJobs, selectedJobId]
      setAppliedJobs(updatedAppliedJobs)
      localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs))
    }

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

  return (
    <div className="container mx-auto py-16">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Section */}
        <div className="lg:w-1/4">
          <div className="border border-secondary border-opacity-30 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center bg-primary px-6 py-4">
              <h3 className="text-lg font-bold text-white">Filtrar vagas</h3>
              <Button
                color="secondary"
                size="sm"
                onPress={() => {
                  setFilters({
                    keyword: '',
                    contractType: [],
                    workType: [],
                    pcd: false,
                    salary: 0,
                  })
                  setFilteredJobs(mockJobs)
                }}
                className="text-white"
              >
                Limpar filtros
              </Button>
            </div>
            <div className="p-6 pt-1 bg-white">
              <Input
                placeholder="Pesquisar por cargo"
                value={filters.keyword}
                onChange={(e) => handleFilterChange('keyword', e.target.value)}
                className="mb-4 mt-4 border-1 border-secondary border-opacity-20 rounded-lg"
              />

              <h4 className="text-sm font-semibold mb-3">Tipo de Contrato</h4>
              <div className="flex flex-col gap-2 mb-4">
                {['CLT', 'PJ'].map((type) => (
                  <Checkbox
                    key={type}
                    isSelected={filters.contractType.includes(type)}
                    onChange={(e) =>
                      handleFilterChange(
                        'contractType',
                        e.target.checked
                          ? [...filters.contractType, type]
                          : filters.contractType.filter((t) => t !== type)
                      )
                    }
                  >
                    {type}
                  </Checkbox>
                ))}
              </div>

              <h4 className="text-sm font-semibold mb-3">Regime de trabalho</h4>
              <div className="flex flex-col gap-2 mb-4">
                {['Presencial', 'Híbrido', 'Remoto'].map((type) => (
                  <Checkbox
                    key={type}
                    isSelected={filters.workType.includes(type)}
                    onChange={(e) =>
                      handleFilterChange(
                        'workType',
                        e.target.checked
                          ? [...filters.workType, type]
                          : filters.workType.filter((t) => t !== type)
                      )
                    }
                  >
                    {type}
                  </Checkbox>
                ))}
              </div>

              <h4 className="text-sm font-semibold mb-3">
                Possui alguma deficiência (PCD)
              </h4>
              <Checkbox
                isSelected={filters.pcd}
                onChange={(e) => handleFilterChange('pcd', e.target.checked)}
              >
                Candidato com alguma deficiência
              </Checkbox>

              <h4 className="text-sm font-semibold mb-3 mt-4">
                Salário mínimo
              </h4>
              <div className="flex flex-col gap-2">
                {[800, 1000, 2000, 3000, 4000].map((salary) => (
                  <Checkbox
                    key={salary}
                    isSelected={filters.salary === salary}
                    onChange={() => handleFilterChange('salary', salary)}
                  >
                    Acima de R$ {salary.toFixed(2).replace('.', ',')}
                  </Checkbox>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Jobs List Section */}
        <div className="lg:w-3/4">
          <h2 className="text-xl font-semibold mb-4">
            {filteredJobs.length} Vagas encontradas
          </h2>
          <div className="space-y-4 my-5">VAGA EM DESTAQUE</div>
          <div className="space-y-4">
            {paginatedJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col bg-white border rounded-lg overflow-hidden"
              >
                {/* Header */}
                <div className="flex justify-between items-center px-6 pt-4 pb-2 border-b">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Logo</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-0">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                  </div>
                  <button
                    className="text-neutral-300 hover:text-secondary transition"
                    title="Favoritar vaga"
                  >
                    <Heart className="w-6 h-6" />
                  </button>
                </div>

                {/* Detalhes */}
                <div className="flex flex-wrap items-center gap-x-8 p-4 text-sm text-gray-600 border-b ml-2 mr-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>{job.location || 'Local não informado'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gray-500" />
                    <span>{job.contractType || 'Tipo não informado'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-gray-500" />
                    <span>{job.workType || 'Formato não informado'}</span>
                  </div>
                  {job.pcd && (
                    <div className="flex items-center gap-2">
                      <Accessibility className="w-5 h-5 text-gray-500" />
                      <span>Elegível para PCD</span>
                    </div>
                  )}
                </div>

                {/* Descrição */}
                <div className="p-4 text-gray-700 border-b ml-3 mr-3">
                  <h6 className="font-bold mb-2">Descrição</h6>
                  <p className="font-light">
                    Garantir volume de artes para suprir necessidades gráficas
                    de materiais tanto digitais quanto físicos. Desenvolver o
                    papel de guardião da identidade visual da marca garantindo
                    sinergia entre todos os pontos de contato da jornada do
                    cliente.
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
                  <p className="text-sm text-gray-500 ml-3">
                    Vaga publicada em:{' '}
                    {new Intl.DateTimeFormat('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    }).format(new Date(job.postedTime))}
                  </p>
                  <div className="flex gap-4">
                    <Button
                      color="primary"
                      size="lg"
                      className="text-white"
                      onPress={() => handleApplyClick(job.id)}
                      disabled={appliedJobs.includes(job.id)}
                    >
                      {appliedJobs.includes(job.id)
                        ? 'Candidatura enviada'
                        : 'Quero me candidatar'}
                    </Button>
                    <Button
                      color="default"
                      size="lg"
                      startContent={<Eye className="w-5 h-5" />}
                      onPress={() => handleViewJob(job.id)}
                    >
                      Visualizar vaga
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-6">
            <Pagination
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={(page) => setCurrentPage(page)}
              size="lg"
            />
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

export default JobsCareer
