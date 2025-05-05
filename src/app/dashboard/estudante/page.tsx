'use client'
import { BookOpen, Clock, FileText, Star } from 'lucide-react'
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
import { Progress } from '@/components/ui/progress/progress'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function VisaoGeralPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Olá, João Silva</h1>
          <p className="text-muted-foreground">
            Semestre atual: 2024.1 • Semana 8 de 16
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Calendário acadêmico</Button>
          <Button>Meu desempenho</Button>
        </div>
      </div>

      {/* Card de progresso do semestre */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Progresso do semestre</CardTitle>
          <CardDescription className="text-blue-100">
            Você está na metade do caminho!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Progresso geral</span>
              <span>50%</span>
            </div>
            <Progress
              value={50}
              className="h-2 bg-blue-400"
              indicatorClassName="bg-white"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm">
            <span className="font-medium">Início:</span> 01/02/2024
          </div>
          <div className="text-sm">
            <span className="font-medium">Término:</span> 30/06/2024
          </div>
        </CardFooter>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.7</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+0.3</span> vs semestre anterior
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Disciplinas Atuais
            </CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">24 créditos totais</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Tarefas Pendentes
            </CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 com prazo próximo</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Horas de Estudo
            </CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32h</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+4h</span> vs semana anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Atividade de Estudo</CardTitle>
          <CardDescription>Horas de estudo nas últimas semanas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activityData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="horas"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorHours)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Tasks and Recent Courses */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Próximas Tarefas</CardTitle>
              <CardDescription>Tarefas com prazo próximo</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Ver todas
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-lg border p-3 shadow-sm transition-all hover:bg-gray-50"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{task.title}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="mr-1 h-3 w-3" />
                      <span>{task.course}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge
                      variant={
                        task.daysLeft <= 1
                          ? 'destructive'
                          : task.daysLeft <= 3
                            ? 'warning'
                            : 'outline'
                      }
                      className={
                        task.daysLeft <= 1
                          ? ''
                          : task.daysLeft <= 3
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : ''
                      }
                    >
                      {task.daysLeft === 0
                        ? 'Hoje'
                        : task.daysLeft === 1
                          ? 'Amanhã'
                          : `${task.daysLeft} dias`}
                    </Badge>
                    <span className="mt-1 text-xs text-muted-foreground">
                      {task.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Desempenho por Disciplina</CardTitle>
              <CardDescription>Notas e progresso atual</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Ver detalhes
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentCourses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: course.color }}
                      ></div>
                      <span className="font-medium">{course.title}</span>
                    </div>
                    <span className="font-medium">{course.grade}</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Oportunidades de Emprego */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Oportunidades de Emprego</CardTitle>
            <CardDescription>
              Vagas recomendadas para seu perfil
            </CardDescription>
          </div>
          <Button>Ver todas as vagas</Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendedJobs.map((job) => (
              <Card key={job.id} className="bg-white">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {job.type}
                    </Badge>
                    <Badge variant="outline">{job.location}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm line-clamp-2">{job.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-gray-50"
                      >
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
                <CardFooter>
                  <Button className="w-full">Ver detalhes</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Dados de exemplo
const activityData = [
  { name: 'Semana 1', horas: 22 },
  { name: 'Semana 2', horas: 25 },
  { name: 'Semana 3', horas: 18 },
  { name: 'Semana 4', horas: 30 },
  { name: 'Semana 5', horas: 28 },
  { name: 'Semana 6', horas: 32 },
  { name: 'Semana 7', horas: 26 },
  { name: 'Semana 8', horas: 32 },
]

const upcomingTasks = [
  {
    id: 1,
    title: 'Relatório de Laboratório',
    course: 'Física Experimental',
    daysLeft: 0,
    date: '25/05/2024',
  },
  {
    id: 2,
    title: 'Projeto Final',
    course: 'Programação Web',
    daysLeft: 2,
    date: '27/05/2024',
  },
  {
    id: 3,
    title: 'Lista de Exercícios',
    course: 'Cálculo III',
    daysLeft: 3,
    date: '28/05/2024',
  },
  {
    id: 4,
    title: 'Apresentação',
    course: 'Engenharia de Software',
    daysLeft: 5,
    date: '30/05/2024',
  },
]

const currentCourses = [
  {
    id: 1,
    title: 'Programação Web',
    grade: '9.2',
    progress: 65,
    color: '#3b82f6',
  },
  {
    id: 2,
    title: 'Cálculo III',
    grade: '8.5',
    progress: 60,
    color: '#10b981',
  },
  {
    id: 3,
    title: 'Engenharia de Software',
    grade: '9.0',
    progress: 70,
    color: '#8b5cf6',
  },
  {
    id: 4,
    title: 'Física Experimental',
    grade: '7.8',
    progress: 55,
    color: '#f59e0b',
  },
]

const recommendedJobs = [
  {
    id: 1,
    title: 'Desenvolvedor Front-end Jr',
    company: 'TechSolutions',
    type: 'Estágio',
    location: 'Remoto',
    description:
      'Oportunidade para estudantes de Ciência da Computação com conhecimentos em React e JavaScript.',
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
    match: 95,
  },
  {
    id: 2,
    title: 'Analista de Dados',
    company: 'DataInsights',
    type: 'Meio Período',
    location: 'Híbrido',
    description:
      'Vaga para estudantes com conhecimentos em análise de dados e estatística.',
    skills: ['Python', 'SQL', 'Excel', 'Power BI'],
    match: 85,
  },
  {
    id: 3,
    title: 'Assistente de Pesquisa',
    company: 'Universidade Federal',
    type: 'Bolsa',
    location: 'Presencial',
    description:
      'Bolsa de iniciação científica para estudantes interessados em pesquisa acadêmica.',
    skills: ['Pesquisa', 'Redação', 'Análise de Dados'],
    match: 90,
  },
]
