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

export default function CursosVisaoGeralPage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Olá, Filipe!</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Veja seu progresso e novidades nos cursos.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Meus certificados</Button>
          <Button>Explorar novos cursos</Button>
        </div>
      </div>

      {/* Progresso do curso atual */}
      <Card className="bg-gradient-to-r from-indigo-500 to-sky-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Curso em andamento</CardTitle>
          <CardDescription className="text-blue-100">
            <span className="font-medium">Auxiliar de farmácia</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso geral</span>
              <span>0%</span>
            </div>
            <Progress
              value={0}
              className="h-2 bg-blue-400"
              indicatorClassName="bg-white"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 justify-between">
          <div className="text-sm">
            <span className="font-medium">Início:</span> 04/06/2025
          </div>
          <div className="text-sm">
            <span className="font-medium">Prazo:</span> 25/06/2025
          </div>
        </CardFooter>
      </Card>

      {/* Stats de cursos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Média geral</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sem avaliação</div>
            <p className="text-xs text-muted-foreground">
              Sua avaliação média dos cursos
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cursos ativos</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Em andamento</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Aulas pendentes
            </CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Aulas para assistir</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Horas investidas
            </CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sem avaliação</div>
            <p className="text-xs text-muted-foreground">
              nas últimas 2 semanas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Atividade */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Seu ritmo de estudo</CardTitle>
          <CardDescription>Progresso semanal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[260px]">
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
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
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

      {/* Próximos conteúdos e progresso dos cursos */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Próximas aulas/atividades */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Próximas aulas/atividades</CardTitle>
              <CardDescription>Acompanhe o que vem a seguir</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Ver todas
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between rounded-lg border p-3 shadow-sm hover:bg-gray-50 transition-all"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{lesson.title}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="mr-1 h-3 w-3" />
                      <span>{lesson.course}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge
                      variant={
                        lesson.daysLeft <= 1
                          ? 'destructive'
                          : lesson.daysLeft <= 3
                            ? 'warning'
                            : 'outline'
                      }
                      className={
                        lesson.daysLeft <= 1
                          ? ''
                          : lesson.daysLeft <= 3
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : ''
                      }
                    >
                      {lesson.daysLeft === 0
                        ? 'Hoje'
                        : lesson.daysLeft === 1
                          ? 'Amanhã'
                          : `${lesson.daysLeft} dias`}
                    </Badge>
                    <span className="mt-1 text-xs text-muted-foreground">
                      {lesson.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progresso por curso */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Progresso por curso</CardTitle>
              <CardDescription>Veja como está em cada curso</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Detalhes
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-2 py-6 text-center text-muted-foreground">
              <Star className="w-8 h-8 text-gray-400" />
              <p className="text-sm font-medium">
                Este curso ainda não possui progressos registrados.
              </p>
              <p className="text-xs max-w-sm">
                Comece suas aulas para poder visualizar seu progresso.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Dados de exemplo para cursos
const activityData = [{ name: 'Semana 1', horas: 0 }]

const upcomingLessons = [
  {
    id: 1,
    title: 'Introdução à Farmácia e Ética Profissional',
    course: 'Curso de Auxiliar de Farmácia',
    daysLeft: 0,
    date: '04/06/2025',
  },
  {
    id: 2,
    title: 'Noções de Anatomia e Fisiologia',
    course: 'Curso de Auxiliar de Farmácia',
    daysLeft: 2,
    date: '06/06/2025',
  },
  {
    id: 3,
    title: 'Classificação de Medicamentos',
    course: 'Curso de Auxiliar de Farmácia',
    daysLeft: 3,
    date: '07/06/2025',
  },
  {
    id: 4,
    title: 'Boas Práticas de Armazenamento e Controle de Estoque',
    course: 'Curso de Auxiliar de Farmácia',
    daysLeft: 5,
    date: '09/06/2025',
  },
]
