import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Users,
  Briefcase,
  Calendar,
  TrendingUp,
  Eye,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

// Dados mockados
const statsData = {
  totalCandidatos: 156,
  totalVagas: 23,
  atendimentosHoje: 8,
  atendimentosSemana: 45,
}

const vagasRecentes = [
  {
    id: 1,
    titulo: 'Desenvolvedor Frontend',
    empresa: 'Tech Solutions',
    candidatos: 12,
    status: 'Ativa',
    dataPublicacao: '2024-01-15',
  },
  {
    id: 2,
    titulo: 'Analista de Marketing',
    empresa: 'Marketing Pro',
    candidatos: 8,
    status: 'Ativa',
    dataPublicacao: '2024-01-14',
  },
  {
    id: 3,
    titulo: 'Designer UX/UI',
    empresa: 'Creative Agency',
    candidatos: 15,
    status: 'Pausada',
    dataPublicacao: '2024-01-13',
  },
  {
    id: 4,
    titulo: 'Gerente de Vendas',
    empresa: 'Sales Corp',
    candidatos: 6,
    status: 'Ativa',
    dataPublicacao: '2024-01-12',
  },
]

const candidatosRecentes = [
  {
    id: 1,
    nome: 'Ana Silva',
    idade: 28,
    email: 'ana.silva@email.com',
    ultimaVaga: 'Desenvolvedor Frontend',
    status: 'Avaliação Pendente',
  },
  {
    id: 2,
    nome: 'Carlos Santos',
    idade: 32,
    email: 'carlos.santos@email.com',
    ultimaVaga: 'Analista de Marketing',
    status: 'Entrevista Agendada',
  },
  {
    id: 3,
    nome: 'Maria Oliveira',
    idade: 26,
    email: 'maria.oliveira@email.com',
    ultimaVaga: 'Designer UX/UI',
    status: 'Perfil Analisado',
  },
]

export default function PsicologoOverview() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-0">Bem vindo(a) Filipe</h1>
          <p className="text-muted-foreground">
            Aqui você pode ver a visão geral do sistema de vagas e candidatos
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/psicologo/relatorios">
              <Calendar className="mr-2 h-4 w-4" />
              Gerar Relatório
            </Link>
          </Button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Candidatos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsData.totalCandidatos}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vagas Ativas</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalVagas}</div>
            <p className="text-xs text-muted-foreground">
              +3 novas vagas esta semana
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Atendimentos Hoje
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsData.atendimentosHoje}
            </div>
            <p className="text-xs text-muted-foreground">
              Meta diária: 10 atendimentos
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsData.atendimentosSemana}
            </div>
            <p className="text-xs text-muted-foreground">
              +8% em relação à semana anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Vagas Recentes */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Vagas Recentes</CardTitle>
                <CardDescription>
                  Últimas vagas cadastradas no sistema
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/psicologo/vagas">
                  Ver Todas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vagasRecentes.map((vaga) => (
                <div
                  key={vaga.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{vaga.titulo}</p>
                    <p className="text-sm text-muted-foreground">
                      {vaga.empresa}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{vaga.candidatos} candidatos</span>
                      <span>•</span>
                      <span>
                        {new Date(vaga.dataPublicacao).toLocaleDateString(
                          'pt-BR'
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        vaga.status === 'Ativa' ? 'default' : 'secondary'
                      }
                    >
                      {vaga.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Candidatos Recentes */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Candidatos Recentes</CardTitle>
                <CardDescription>
                  Últimos candidatos cadastrados
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/psicologo/candidatos">
                  Ver Todos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidatosRecentes.map((candidato) => (
                <div
                  key={candidato.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{candidato.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {candidato.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Última vaga: {candidato.ultimaVaga}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {candidato.status}
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        href={`/dashboard/recrutadores/candidatos/perfil/${candidato.id}`}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
