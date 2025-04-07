import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs/tabs'
import { Progress } from '@/components/ui/progress/progress'
import { Badge } from '@/components/ui/badge/badge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Chart } from '@/components/ui/chart/chart'
import {
  Users,
  Award,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Star,
} from 'lucide-react'
import { CalendarView } from '@/components/ui/calendar/calendar-view'

export default function Dashboard() {
  // Dados para os gráficos
  const cursosMaisAcessadosData = {
    labels: ['Web Dev', 'Dados', 'UX', 'IA', 'Python', 'Marketing'],
    datasets: [
      {
        label: 'Acessos',
        data: [4500, 3800, 3200, 2900, 2700, 2500],
        backgroundColor: 'rgba(20, 184, 166, 0.8)',
        borderColor: 'rgb(20, 184, 166)',
        borderWidth: 1,
      },
    ],
  }

  const receitaMensalData = {
    labels: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    datasets: [
      {
        label: 'Receita (R$ mil)',
        data: [120, 145, 160, 175, 190, 210, 230, 245, 260, 280, 300, 320],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const engajamentoData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Horas de Estudo',
        data: [1250, 1500, 1350, 1400, 1300, 800, 600],
        backgroundColor: 'rgba(20, 184, 166, 0.8)',
        borderColor: 'rgb(20, 184, 166)',
        borderWidth: 1,
      },
    ],
  }

  const retencaoData = {
    labels: ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6'],
    datasets: [
      {
        label: 'Taxa de Retenção (%)',
        data: [100, 85, 75, 68, 62, 60],
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderColor: 'rgb(245, 158, 11)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const conversaoLeadsData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Leads',
        data: [1200, 1300, 1400, 1350, 1500, 1600],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
      {
        label: 'Conversões',
        data: [240, 280, 350, 310, 390, 450],
        backgroundColor: 'rgba(20, 184, 166, 0.5)',
        borderColor: 'rgb(20, 184, 166)',
        borderWidth: 1,
      },
    ],
  }

  // Dados para os instrutores
  const instrutores = [
    {
      nome: 'Dra. Sarah Johnson',
      area: 'Ciência de Dados',
      avaliacao: 4.9,
      alunos: 1245,
      receita: 'R$ 125.000',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      nome: 'Prof. Michael Chen',
      area: 'Desenvolvimento Web',
      avaliacao: 4.8,
      alunos: 1120,
      receita: 'R$ 112.000',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      nome: 'Dra. Emily Rodriguez',
      area: 'Design UX',
      avaliacao: 4.8,
      alunos: 980,
      receita: 'R$ 98.000',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ]

  // Dados para próximas aulas
  const proximasAulas = [
    {
      titulo: 'Introdução a Machine Learning',
      instrutor: 'Dra. Sarah Johnson',
      data: 'Hoje, 14:00',
      alunos: 45,
      sala: 'Sala Virtual 1',
    },
    {
      titulo: 'React Hooks Avançado',
      instrutor: 'Prof. Michael Chen',
      data: 'Hoje, 16:30',
      alunos: 38,
      sala: 'Sala Virtual 2',
    },
    {
      titulo: 'Pesquisa com Usuários',
      instrutor: 'Dra. Emily Rodriguez',
      data: 'Amanhã, 10:00',
      alunos: 32,
      sala: 'Sala Virtual 3',
    },
    {
      titulo: 'Python para Análise de Dados',
      instrutor: 'Dr. Thomas Wilson',
      data: 'Amanhã, 15:00',
      alunos: 41,
      sala: 'Sala Virtual 1',
    },
    {
      titulo: 'Fundamentos de SEO',
      instrutor: 'Profa. Ana Silva',
      data: 'Quinta, 09:00',
      alunos: 28,
      sala: 'Sala Virtual 4',
    },
  ]

  // Dados para alertas
  const alertas = [
    {
      tipo: 'Crítico',
      mensagem: 'Queda de 15% na taxa de conclusão do curso de Python',
      tempo: '2 horas atrás',
    },
    {
      tipo: 'Importante',
      mensagem: '5 instrutores ainda não enviaram material da próxima semana',
      tempo: '5 horas atrás',
    },
    {
      tipo: 'Informação',
      mensagem: 'Pico de 250 usuários simultâneos atingido hoje',
      tempo: 'Hoje, 10:30',
    },
  ]

  // Dados para tickets de suporte
  const tickets = [
    {
      id: '#1234',
      assunto: 'Problema com certificado',
      status: 'Aberto',
      prioridade: 'Alta',
      tempo: '2 horas',
    },
    {
      id: '#1233',
      assunto: 'Dúvida sobre pagamento',
      status: 'Em andamento',
      prioridade: 'Média',
      tempo: '5 horas',
    },
    {
      id: '#1232',
      assunto: 'Erro ao acessar aula',
      status: 'Aberto',
      prioridade: 'Alta',
      tempo: '1 dia',
    },
  ]

  // Dados para feedback
  const feedbacks = [
    {
      curso: 'Machine Learning Avançado',
      avaliacao: 4.8,
      comentario: 'Excelente curso, conteúdo muito prático e relevante.',
      aluno: 'Carlos M.',
      data: 'Hoje',
    },
    {
      curso: 'React & Next.js',
      avaliacao: 4.2,
      comentario: 'Bom curso, mas poderia ter mais exercícios práticos.',
      aluno: 'Mariana S.',
      data: 'Ontem',
    },
    {
      curso: 'Design UX',
      avaliacao: 4.9,
      comentario: 'O melhor curso que já fiz! Professora excelente.',
      aluno: 'Pedro L.',
      data: '2 dias atrás',
    },
  ]

  // Dados para o calendário de eventos
  const eventosCalendario = [
    {
      id: '1',
      date: new Date(2025, 4, 5), // 5 de maio de 2025
      type: 'avaliacao' as const,
      title: 'Avaliação de UX Design',
    },
    {
      id: '2',
      date: new Date(2025, 4, 10), // 10 de maio de 2025
      type: 'avaliacao' as const,
      title: 'Avaliação de Python',
    },
    {
      id: '3',
      date: new Date(2025, 4, 11), // 11 de maio de 2025
      type: 'avaliacao' as const,
      title: 'Avaliação de Web Dev',
    },
    {
      id: '4',
      date: new Date(2025, 4, 12), // 12 de maio de 2025
      type: 'avaliacao' as const,
      title: 'Avaliação de Marketing',
    },
    {
      id: '5',
      date: new Date(2025, 4, 15), // 15 de maio de 2025
      type: 'inicio' as const,
      title: 'Início de IA Avançada',
    },
    {
      id: '6',
      date: new Date(2025, 4, 20), // 20 de maio de 2025
      type: 'inicio' as const,
      title: 'Início de React Native',
    },
    {
      id: '7',
      date: new Date(2025, 4, 24), // 24 de maio de 2025
      type: 'inicio' as const,
      title: 'Início de Data Science',
    },
    {
      id: '8',
      date: new Date(2025, 4, 28), // 28 de maio de 2025
      type: 'fim' as const,
      title: 'Fim de JavaScript Básico',
    },
  ]

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Maio 2025
          </Button>
          <Button variant="default" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="default" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Visão Geral - KPIs */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        <Card className="bg-gradient-to-br from-teal-50 to-white dark:from-teal-950 dark:to-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos Ativos</CardTitle>
            <Users className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">24.389</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+18,2%</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-950 dark:to-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Mensal
            </CardTitle>
            <DollarSign className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">R$ 320K</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+7,1%</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Conclusão
            </CardTitle>
            <Award className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">68,5%</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500 font-medium">-2,3%</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NPS</CardTitle>
            <Star className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">72</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+5 pontos</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Notificações */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-0">
            Atenção necessária
          </h3>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Queda de 15% na taxa de conclusão do curso de Python. Recomendamos
            revisar o material e enviar mensagem aos alunos.
          </p>
        </div>
      </div>

      {/* Tabs principais */}
      <Tabs defaultValue="visao-geral" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4 bg-primary-500 text-white">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="engajamento">Engajamento</TabsTrigger>
          <TabsTrigger value="suporte">Suporte</TabsTrigger>
        </TabsList>

        {/* Seção de Visão Geral */}
        <TabsContent value="visao-geral" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 ">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Próximas Aulas</CardTitle>
                <CardDescription>
                  Aulas agendadas para os próximos dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proximasAulas.map((aula) => (
                    <div
                      key={aula.titulo}
                      className="flex flex-col space-y-2 border-b pb-3 last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{aula.titulo}</h3>
                        <Badge
                          variant="outline"
                          className="bg-teal-50 text-teal-700 border-teal-200 text-xs"
                        >
                          {aula.sala}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {aula.instrutor}
                        </span>
                        <span className="text-teal-600 font-medium">
                          {aula.data}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {aula.alunos} alunos inscritos
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Alertas e Notificações</CardTitle>
                <CardDescription>
                  Itens que precisam de sua atenção
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertas.map((alerta, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 border-b pb-3 last:border-0"
                    >
                      <div
                        className={`w-2 h-2 mt-1.5 rounded-full ${
                          alerta.tipo === 'Crítico'
                            ? 'bg-red-500'
                            : alerta.tipo === 'Importante'
                              ? 'bg-amber-500'
                              : 'bg-blue-500'
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm">{alerta.tipo}</h3>
                          <span className="text-xs text-muted-foreground">
                            {alerta.tempo}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{alerta.mensagem}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Feedback Recente</CardTitle>
                <CardDescription>Últimas avaliações dos alunos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbacks.map((feedback, index) => (
                    <div
                      key={index}
                      className="space-y-2 border-b pb-3 last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{feedback.curso}</h3>
                        <div className="flex items-center">
                          <span className="font-medium mr-1">
                            {feedback.avaliacao}
                          </span>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      <p className="text-sm italic">{feedback.comentario}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{feedback.aluno}</span>
                        <span>{feedback.data}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Melhores Instrutores</CardTitle>
                <CardDescription>Por receita gerada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {instrutores.map((instrutor) => (
                    <div key={instrutor.nome} className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage
                          src={instrutor.avatar}
                          alt={instrutor.nome}
                        />
                        <AvatarFallback>
                          {instrutor.nome
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">
                            {instrutor.nome}
                          </p>
                          <p className="text-sm font-medium">
                            {instrutor.receita}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            {instrutor.area}
                          </p>
                          <p className="text-xs flex items-center">
                            {instrutor.avaliacao}
                            <Star className="h-3 w-3 ml-1 fill-yellow-400 text-yellow-400" />
                          </p>
                        </div>
                        <Progress
                          value={instrutor.avaliacao * 20}
                          className="h-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Seção de Calendário */}
        <TabsContent value="calendario" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Calendário de Eventos</CardTitle>
              <CardDescription>
                Visualize todos os eventos programados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarView
                month={new Date(2025, 4, 1)}
                events={eventosCalendario}
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Próximas Aulas</CardTitle>
                <CardDescription>
                  Aulas agendadas para os próximos dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proximasAulas.map((aula) => (
                    <div
                      key={aula.titulo}
                      className="flex flex-col space-y-2 border-b pb-3 last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{aula.titulo}</h3>
                        <Badge
                          variant="outline"
                          className="bg-teal-50 text-teal-700 border-teal-200 text-xs"
                        >
                          {aula.sala}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {aula.instrutor}
                        </span>
                        <span className="text-teal-600 font-medium">
                          {aula.data}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {aula.alunos} alunos inscritos
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Horários de Pico</CardTitle>
                <CardDescription>
                  Quando os alunos mais acessam a plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <Chart
                    type="bar"
                    data={engajamentoData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: { y: { beginAtZero: true } },
                    }}
                  />
                </div>
                <div className="mt-4 p-3 bg-teal-50 dark:bg-teal-950/30 rounded-lg">
                  <h4 className="text-sm font-medium text-teal-800 dark:text-teal-300">
                    Dica de Otimização
                  </h4>
                  <p className="text-xs text-teal-700 dark:text-teal-400 mt-1">
                    Programe lançamentos de conteúdo e comunicações para
                    terça-feira, quando o engajamento é maior.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Seção Financeira */}
        <TabsContent value="financeiro" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
              <CardDescription>
                Evolução da receita ao longo do ano
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Chart
                  type="line"
                  data={receitaMensalData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } },
                  }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Receita Anual
                  </div>
                  <div className="text-xl font-bold">R$ 2,64M</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Ticket Médio
                  </div>
                  <div className="text-xl font-bold">R$ 1.250</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    LTV
                  </div>
                  <div className="text-xl font-bold">R$ 3.800</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Conversão de Leads</CardTitle>
                <CardDescription>
                  Leads vs. Conversões nos últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <Chart
                    type="bar"
                    data={conversaoLeadsData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: 'top' } },
                      scales: { y: { beginAtZero: true } },
                    }}
                  />
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Taxa de Conversão
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                    A taxa média de conversão é de 25,3%, com crescimento de
                    3,5% no último mês.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Retenção de Alunos</CardTitle>
                <CardDescription>
                  Taxa de retenção ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <Chart
                    type="line"
                    data={retencaoData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: {
                          beginAtZero: false,
                          min: 50,
                          max: 100,
                        },
                      },
                    }}
                  />
                </div>
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                  <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                    Oportunidade
                  </h4>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                    Aumento de 5% na retenção pode gerar R$ 320.000 adicionais
                    em receita anual.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Seção de Engajamento */}
        <TabsContent value="engajamento" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Cursos Mais Acessados</CardTitle>
                <CardDescription>
                  Cursos com maior número de acessos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <Chart
                    type="bar"
                    data={cursosMaisAcessadosData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: { y: { beginAtZero: true } },
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Tempo Médio de Estudo</CardTitle>
                <CardDescription>
                  Horas de estudo por dia da semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <Chart
                    type="bar"
                    data={engajamentoData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: { y: { beginAtZero: true } },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Feedback dos Alunos</CardTitle>
              <CardDescription>Avaliações recentes dos cursos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbacks.map((feedback, index) => (
                  <div
                    key={index}
                    className="space-y-2 border-b pb-3 last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{feedback.curso}</h3>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">
                          {feedback.avaliacao}
                        </span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <p className="text-sm italic">{feedback.comentario}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{feedback.aluno}</span>
                      <span>{feedback.data}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="secondary" className="w-full mt-4">
                Ver Todos os Feedbacks
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seção de Suporte */}
        <TabsContent value="suporte" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Tickets de Suporte</CardTitle>
              <CardDescription>
                Solicitações recentes de suporte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{ticket.id}</span>
                        <Badge
                          variant={
                            ticket.status === 'Aberto'
                              ? 'destructive'
                              : 'outline'
                          }
                        >
                          {ticket.status}
                        </Badge>
                      </div>
                      <p className="text-sm mt-1">{ticket.assunto}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          ticket.prioridade === 'Alta'
                            ? 'destructive'
                            : ticket.prioridade === 'Média'
                              ? 'outline'
                              : 'secondary'
                        }
                        className="mb-1"
                      >
                        {ticket.prioridade}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {ticket.tempo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <div className="text-sm">
                  <span className="font-medium">Tempo médio de resposta:</span>{' '}
                  2h 15min
                </div>
                <Button variant="secondary" size="sm">
                  Ver Todos
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Problemas Comuns</CardTitle>
                <CardDescription>Principais motivos de contato</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Problemas com certificados</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Dúvidas sobre pagamento</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Acesso às aulas</span>
                      <span className="font-medium">24%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Dúvidas sobre conteúdo</span>
                      <span className="font-medium">16%</span>
                    </div>
                    <Progress value={16} className="h-2" />
                  </div>
                </div>
                <div className="mt-4 p-3 bg-teal-50 dark:bg-teal-950/30 rounded-lg">
                  <h4 className="text-sm font-medium text-teal-800 dark:text-teal-300">
                    Recomendação
                  </h4>
                  <p className="text-xs text-teal-700 dark:text-teal-400 mt-1">
                    Criar um tutorial sobre emissão de certificados pode reduzir
                    tickets em até 25%.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Satisfação com Suporte</CardTitle>
                <CardDescription>Avaliação do atendimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-teal-600">92%</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      dos usuários satisfeitos com o atendimento
                    </p>
                  </div>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Muito satisfeito</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <Progress
                      value={72}
                      className="h-2 bg-teal-100 dark:bg-teal-900"
                    >
                      <div
                        className="h-full bg-teal-600"
                        style={{ width: '72%' }}
                      />
                    </Progress>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Satisfeito</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <Progress
                      value={20}
                      className="h-2 bg-teal-100 dark:bg-teal-900"
                    >
                      <div
                        className="h-full bg-teal-400"
                        style={{ width: '20%' }}
                      />
                    </Progress>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Insatisfeito</span>
                      <span className="font-medium">8%</span>
                    </div>
                    <Progress
                      value={8}
                      className="h-2 bg-teal-100 dark:bg-teal-900"
                    >
                      <div
                        className="h-full bg-red-500"
                        style={{ width: '8%' }}
                      />
                    </Progress>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
