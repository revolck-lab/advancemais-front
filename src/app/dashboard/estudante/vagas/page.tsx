'use client'

import { useState } from 'react'
import {
  Bookmark,
  BookmarkCheck,
  Building,
  Clock,
  Filter,
  MapPin,
  Search,
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
import { Input } from '@/components/ui/input/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label/label'

export default function VagasPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [matchValue, setMatchValue] = useState([70])
  const [savedJobs, setSavedJobs] = useState<number[]>([2, 5])
  const [appliedJobs, setAppliedJobs] = useState<number[]>([1])
  const [showFilters, setShowFilters] = useState(false)

  // Filtragem de vagas
  const filteredJobs = jobs.filter((job) => {
    // Filtro por tipo
    if (typeFilter !== 'all' && job.type !== typeFilter) return false

    // Filtro por localização
    if (locationFilter !== 'all' && job.location !== locationFilter)
      return false

    // Filtro por correspondência
    if (job.match < matchValue[0]) return false

    // Filtro por busca
    if (
      searchQuery &&
      !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.company.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    return true
  })

  // Função para salvar/remover vaga dos favoritos
  const toggleSaveJob = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId))
    } else {
      setSavedJobs([...savedJobs, jobId])
    }
  }

  // Função para candidatar-se a uma vaga
  const applyToJob = (jobId: number) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId])
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Vagas de Emprego
          </h1>
          <p className="text-muted-foreground">
            Encontre oportunidades alinhadas ao seu perfil acadêmico
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button>Meus currículos</Button>
        </div>
      </div>

      {/* Barra de busca */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar vagas por título, empresa ou palavras-chave..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tipo de vaga" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="Estágio">Estágio</SelectItem>
                <SelectItem value="Trainee">Trainee</SelectItem>
                <SelectItem value="Júnior">Júnior</SelectItem>
                <SelectItem value="Tempo Integral">Tempo Integral</SelectItem>
                <SelectItem value="Meio Período">Meio Período</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Localização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as localizações</SelectItem>
                <SelectItem value="Remoto">Remoto</SelectItem>
                <SelectItem value="Híbrido">Híbrido</SelectItem>
                <SelectItem value="Presencial">Presencial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtros avançados */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label>Correspondência mínima</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={matchValue}
                      onValueChange={setMatchValue}
                      min={0}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                    <span className="w-12 text-center font-medium">
                      {matchValue[0]}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Área de atuação</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Tecnologia</SelectItem>
                      <SelectItem value="engineering">Engenharia</SelectItem>
                      <SelectItem value="business">Negócios</SelectItem>
                      <SelectItem value="health">Saúde</SelectItem>
                      <SelectItem value="education">Educação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Salário mínimo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Qualquer valor</SelectItem>
                      <SelectItem value="1000">A partir de R$ 1.000</SelectItem>
                      <SelectItem value="2000">A partir de R$ 2.000</SelectItem>
                      <SelectItem value="3000">A partir de R$ 3.000</SelectItem>
                      <SelectItem value="5000">A partir de R$ 5.000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Data de publicação</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Qualquer data</SelectItem>
                      <SelectItem value="today">Hoje</SelectItem>
                      <SelectItem value="week">Últimos 7 dias</SelectItem>
                      <SelectItem value="month">Último mês</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Habilidades</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {skills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox id={`skill-${skill}`} />
                        <label
                          htmlFor={`skill-${skill}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Benefícios</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={`benefit-${benefit}`} />
                        <label
                          htmlFor={`benefit-${benefit}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {benefit}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline">Limpar filtros</Button>
                <Button>Aplicar filtros</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Abas para diferentes visualizações */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-white">
          <TabsTrigger value="all">Todas as vagas</TabsTrigger>
          <TabsTrigger value="recommended">Recomendadas</TabsTrigger>
          <TabsTrigger value="saved">Salvas</TabsTrigger>
          <TabsTrigger value="applied">Candidaturas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.includes(job.id)}
                isApplied={appliedJobs.includes(job.id)}
                onSave={() => toggleSaveJob(job.id)}
                onApply={() => applyToJob(job.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs
              .filter((job) => job.match >= 80)
              .map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSaved={savedJobs.includes(job.id)}
                  isApplied={appliedJobs.includes(job.id)}
                  onSave={() => toggleSaveJob(job.id)}
                  onApply={() => applyToJob(job.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs
              .filter((job) => savedJobs.includes(job.id))
              .map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSaved={true}
                  isApplied={appliedJobs.includes(job.id)}
                  onSave={() => toggleSaveJob(job.id)}
                  onApply={() => applyToJob(job.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="applied" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs
              .filter((job) => appliedJobs.includes(job.id))
              .map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSaved={savedJobs.includes(job.id)}
                  isApplied={true}
                  onSave={() => toggleSaveJob(job.id)}
                  onApply={() => applyToJob(job.id)}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Componente de Card de Vaga
interface JobCardProps {
  job: Job
  isSaved: boolean
  isApplied: boolean
  onSave: () => void
  onApply: () => void
}

function JobCard({ job, isSaved, isApplied, onSave, onApply }: JobCardProps) {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            {job.type}
          </Badge>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="bg-gray-50">
              {job.match}% match
            </Badge>
            <Button variant="ghost" size="icon" onClick={onSave}>
              {isSaved ? (
                <BookmarkCheck className="h-5 w-5 text-blue-600" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        <CardTitle className="text-lg mt-2">{job.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Building className="h-3 w-3" /> {job.company}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            <span>{job.posted}</span>
          </div>
        </div>
        <p className="text-sm line-clamp-2 mb-3">{job.description}</p>
        <div className="flex flex-wrap gap-1">
          {job.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <Badge variant="outline" className="bg-gray-50">
              +{job.skills.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {isApplied ? (
          <Button className="w-full" variant="secondary" disabled>
            Candidatura enviada
          </Button>
        ) : (
          <Button className="w-full" onClick={onApply}>
            Candidatar-se
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Tipos
interface Job {
  id: number
  title: string
  company: string
  type: string
  location: string
  posted: string
  description: string
  skills: string[]
  match: number
  salary?: string
}

// Dados de exemplo
const jobs: Job[] = [
  {
    id: 1,
    title: 'Desenvolvedor Front-end Jr',
    company: 'TechSolutions',
    type: 'Estágio',
    location: 'Remoto',
    posted: 'Hoje',
    description:
      'Oportunidade para estudantes de Ciência da Computação com conhecimentos em React e JavaScript.',
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
    match: 95,
    salary: 'R$ 2.000,00',
  },
  {
    id: 2,
    title: 'Analista de Dados',
    company: 'DataInsights',
    type: 'Meio Período',
    location: 'Híbrido',
    posted: 'Há 2 dias',
    description:
      'Vaga para estudantes com conhecimentos em análise de dados e estatística.',
    skills: ['Python', 'SQL', 'Excel', 'Power BI'],
    match: 85,
    salary: 'R$ 2.500,00',
  },
  {
    id: 3,
    title: 'Assistente de Pesquisa',
    company: 'Universidade Federal',
    type: 'Bolsa',
    location: 'Presencial',
    posted: 'Há 3 dias',
    description:
      'Bolsa de iniciação científica para estudantes interessados em pesquisa acadêmica.',
    skills: ['Pesquisa', 'Redação', 'Análise de Dados'],
    match: 90,
  },
  {
    id: 4,
    title: 'Desenvolvedor Back-end',
    company: 'SoftTech',
    type: 'Júnior',
    location: 'Remoto',
    posted: 'Há 1 semana',
    description:
      'Vaga para desenvolvedores com conhecimento em Node.js e bancos de dados.',
    skills: ['Node.js', 'Express', 'MongoDB', 'SQL'],
    match: 75,
    salary: 'R$ 4.000,00',
  },
  {
    id: 5,
    title: 'UX/UI Designer',
    company: 'DesignStudio',
    type: 'Estágio',
    location: 'Híbrido',
    posted: 'Há 5 dias',
    description:
      'Estágio para estudantes de Design ou áreas relacionadas com interesse em experiência do usuário.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    match: 80,
    salary: 'R$ 1.800,00',
  },
  {
    id: 6,
    title: 'Engenheiro de Software Trainee',
    company: 'TechCorp',
    type: 'Trainee',
    location: 'Presencial',
    posted: 'Há 2 semanas',
    description:
      'Programa de trainee para recém-formados em Engenharia de Software ou Ciência da Computação.',
    skills: ['Java', 'Spring', 'Git', 'Agile'],
    match: 70,
    salary: 'R$ 5.000,00',
  },
  {
    id: 7,
    title: 'Analista de Marketing Digital',
    company: 'MarketingPro',
    type: 'Júnior',
    location: 'Remoto',
    posted: 'Há 4 dias',
    description:
      'Vaga para profissionais com conhecimento em marketing digital e redes sociais.',
    skills: ['SEO', 'Google Analytics', 'Facebook Ads', 'Instagram'],
    match: 65,
    salary: 'R$ 3.500,00',
  },
  {
    id: 8,
    title: 'Assistente Administrativo',
    company: 'AdminCorp',
    type: 'Meio Período',
    location: 'Presencial',
    posted: 'Há 1 semana',
    description: 'Vaga para estudantes de Administração ou áreas relacionadas.',
    skills: ['Excel', 'Organização', 'Atendimento', 'Arquivamento'],
    match: 60,
    salary: 'R$ 1.500,00',
  },
  {
    id: 9,
    title: 'Desenvolvedor Mobile',
    company: 'AppDev',
    type: 'Estágio',
    location: 'Híbrido',
    posted: 'Há 3 dias',
    description:
      'Estágio para estudantes com interesse em desenvolvimento de aplicativos móveis.',
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    match: 85,
    salary: 'R$ 2.200,00',
  },
]

const skills = [
  'JavaScript',
  'Python',
  'React',
  'Node.js',
  'SQL',
  'Java',
  'C#',
  'PHP',
  'HTML/CSS',
  'Git',
  'Docker',
  'AWS',
]

const benefits = [
  'Vale Refeição',
  'Vale Transporte',
  'Plano de Saúde',
  'Plano Odontológico',
  'Gympass',
  'Home Office',
  'Horário Flexível',
  'Curso de Idiomas',
]
