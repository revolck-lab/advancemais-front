'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FileText, Users, CheckCircle, Clock, MapPin, Star } from 'lucide-react'

// Dados mockados para relatórios
const relatoriosData = {
  diario: {
    data: new Date().toLocaleDateString('pt-BR'),
    candidatosRecebidos: 15,
    entrevistasRealizadas: 8,
    candidatosAprovados: 5,
    // Métricas extras que apareceriam no PDF exportado
    candidatosReprovados: 3,
    candidatosAusentes: 2,
  },
  semanal: {
    periodo: '15/01 - 21/01/2024',
    candidatosRecebidos: 89,
    entrevistasRealizadas: 45,
    candidatosAprovados: 28,
    candidatosReprovados: 17,
    candidatosAusentes: 6,
  },
  mensal: {
    periodo: 'Janeiro 2024',
    candidatosRecebidos: 320,
    entrevistasRealizadas: 180,
    candidatosAprovados: 110,
    candidatosReprovados: 70,
    candidatosAusentes: 25,
  },
}

// Listas detalhadas dos candidatos
const candidatosRecebidosHoje = [
  {
    nome: 'Pedro Lima',
    vaga: 'Desenvolvedor Python',
    horario: '08:30',
    origem: 'LinkedIn',
  },
  {
    nome: 'Laura Santos',
    vaga: 'Designer UX',
    horario: '09:15',
    origem: 'Site da empresa',
  },
  {
    nome: 'Rafael Costa',
    vaga: 'Analista de Dados',
    horario: '10:20',
    origem: 'Indeed',
  },
  {
    nome: 'Juliana Moura',
    vaga: 'Product Manager',
    horario: '11:45',
    origem: 'Indicação',
  },
  {
    nome: 'Bruno Silva',
    vaga: 'DevOps Engineer',
    horario: '14:10',
    origem: 'LinkedIn',
  },
  {
    nome: 'Camila Rocha',
    vaga: 'Marketing Digital',
    horario: '15:30',
    origem: 'Site da empresa',
  },
  {
    nome: 'Diego Ferreira',
    vaga: 'Analista Financeiro',
    horario: '16:20',
    origem: 'Vagas.com',
  },
  {
    nome: 'Amanda Oliveira',
    vaga: 'Scrum Master',
    horario: '17:05',
    origem: 'LinkedIn',
  },
  {
    nome: 'Thiago Alves',
    vaga: 'Desenvolvedor Frontend',
    horario: '17:40',
    origem: 'GitHub Jobs',
  },
  {
    nome: 'Beatriz Cunha',
    vaga: 'Data Scientist',
    horario: '18:15',
    origem: 'Indicação',
  },
  {
    nome: 'Lucas Barros',
    vaga: 'QA Tester',
    horario: '18:50',
    origem: 'Indeed',
  },
  {
    nome: 'Fernanda Reis',
    vaga: 'UI Designer',
    horario: '19:25',
    origem: 'Behance',
  },
  {
    nome: 'Gabriel Matos',
    vaga: 'Backend Developer',
    horario: '20:10',
    origem: 'Stack Overflow Jobs',
  },
  {
    nome: 'Mariana Dias',
    vaga: 'Business Analyst',
    horario: '20:45',
    origem: 'Site da empresa',
  },
  {
    nome: 'André Souza',
    vaga: 'Cloud Architect',
    horario: '21:20',
    origem: 'LinkedIn',
  },
]

const entrevistasRealizadasHoje = [
  {
    nome: 'Ana Silva',
    vaga: 'Desenvolvedor Frontend',
    horario: '14:30',
    duracao: '45 min',
    tipo: 'Avaliação Psicológica',
  },
  {
    nome: 'Carlos Santos',
    vaga: 'Analista de Marketing',
    horario: '10:00',
    duracao: '60 min',
    tipo: 'Entrevista Comportamental',
  },
  {
    nome: 'Maria Oliveira',
    vaga: 'Designer UX/UI',
    horario: '16:00',
    duracao: '30 min',
    tipo: 'Avaliação de Perfil',
  },
  {
    nome: 'João Pereira',
    vaga: 'Gerente de Vendas',
    horario: '09:30',
    duracao: '50 min',
    tipo: 'Avaliação Psicológica',
  },
  {
    nome: 'Patricia Lima',
    vaga: 'Analista de Sistemas',
    horario: '11:15',
    duracao: '40 min',
    tipo: 'Entrevista Técnica',
  },
  {
    nome: 'Roberto Silva',
    vaga: 'Coordenador de TI',
    horario: '13:45',
    duracao: '55 min',
    tipo: 'Avaliação de Liderança',
  },
  {
    nome: 'Isabela Costa',
    vaga: 'Assistente Administrativo',
    horario: '15:20',
    duracao: '35 min',
    tipo: 'Entrevista Comportamental',
  },
  {
    nome: 'Marcos Ferreira',
    vaga: 'Engenheiro de Software',
    horario: '17:30',
    duracao: '65 min',
    tipo: 'Avaliação Completa',
  },
]

const candidatosAprovadosHoje = [
  {
    nome: 'Ana Silva',
    vaga: 'Desenvolvedor Frontend',
    score: '8.5/10',
    observacao: 'Excelente perfil técnico e interpessoal',
  },
  {
    nome: 'Carlos Santos',
    vaga: 'Analista de Marketing',
    score: '9.0/10',
    observacao: 'Liderança natural, altamente recomendado',
  },
  {
    nome: 'Patricia Lima',
    vaga: 'Analista de Sistemas',
    score: '8.2/10',
    observacao: 'Boa capacidade analítica e resolução de problemas',
  },
  {
    nome: 'Roberto Silva',
    vaga: 'Coordenador de TI',
    score: '8.8/10',
    observacao: 'Experiência sólida em gestão de equipes',
  },
  {
    nome: 'Marcos Ferreira',
    vaga: 'Engenheiro de Software',
    score: '9.2/10',
    observacao: 'Perfil excepcional, pronto para começar',
  },
]

const atendimentosRecentes = [
  {
    id: 1,
    candidato: 'Ana Silva',
    vaga: 'Desenvolvedor Frontend',
    data: '2024-01-21',
    hora: '14:30',
    duracao: '45 min',
    tipo: 'Avaliação Psicológica',
    status: 'Aprovado',
    observacoes: 'Candidato demonstrou boa capacidade de trabalho em equipe',
  },
  {
    id: 2,
    candidato: 'Carlos Santos',
    vaga: 'Analista de Marketing',
    data: '2024-01-21',
    hora: '10:00',
    duracao: '60 min',
    tipo: 'Entrevista Comportamental',
    status: 'Aprovado',
    observacoes: 'Perfil adequado para liderança, recomendo para próxima fase',
  },
  {
    id: 3,
    candidato: 'Maria Oliveira',
    vaga: 'Designer UX/UI',
    data: '2024-01-20',
    hora: '16:00',
    duracao: '30 min',
    tipo: 'Avaliação de Perfil',
    status: 'Reprovado',
    observacoes:
      'Criatividade elevada, mas precisa desenvolver habilidades de comunicação',
  },
  {
    id: 4,
    candidato: 'João Pereira',
    vaga: 'Gerente de Vendas',
    data: '2024-01-20',
    hora: '09:30',
    duracao: '50 min',
    tipo: 'Avaliação Psicológica',
    status: 'Pendente',
    observacoes: 'Aguardando finalização do relatório técnico',
  },
  {
    id: 5,
    candidato: 'Sofia Costa',
    vaga: 'Analista Financeiro',
    data: '2024-01-19',
    hora: '15:00',
    duracao: '0 min',
    tipo: 'Entrevista Agendada',
    status: 'Ausente',
    observacoes: 'Candidato não compareceu ao horário agendado',
  },
]

export default function RelatoriosPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatórios de Atendimento</h1>
          <p className="text-muted-foreground">
            Acompanhe o desempenho diário, semanal e mensal
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="diario">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diario">Relatório Diário</SelectItem>
              <SelectItem value="semanal">Relatório Semanal</SelectItem>
              <SelectItem value="mensal">Relatório Mensal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards de Resumo com Modais */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Candidatos Recebidos */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-900">
                  Candidatos Recebidos
                </CardTitle>
                <Users className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-900 mb-2">
                  {relatoriosData.diario.candidatosRecebidos}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-blue-700 font-medium">
                    Currículos recebidos hoje
                  </p>
                  <p className="text-xs text-blue-600">
                    Clique para ver a lista completa
                  </p>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-blue-900 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Candidatos Recebidos Hoje (
                {relatoriosData.diario.candidatosRecebidos})
              </DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[60vh] pr-4">
              <div className="grid gap-3">
                {candidatosRecebidosHoje.map((candidato, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900 text-lg">
                        {candidato.nome}
                      </p>
                      <p className="text-blue-700 font-medium">
                        {candidato.vaga}
                      </p>
                      <p className="text-sm text-blue-600 flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        Origem: {candidato.origem}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        {candidato.horario}
                      </Badge>
                      <p className="text-xs text-blue-600">Recebido hoje</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Entrevistas Realizadas */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-900">
                  Entrevistas Realizadas
                </CardTitle>
                <FileText className="h-5 w-5 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-900 mb-2">
                  {relatoriosData.diario.entrevistasRealizadas}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-amber-700 font-medium">
                    Avaliações psicológicas concluídas
                  </p>
                  <p className="text-xs text-amber-600">
                    Clique para ver detalhes
                  </p>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-amber-900 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Entrevistas Realizadas Hoje (
                {relatoriosData.diario.entrevistasRealizadas})
              </DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[60vh] pr-4">
              <div className="grid gap-3">
                {entrevistasRealizadasHoje.map((entrevista, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-amber-900 text-lg">
                        {entrevista.nome}
                      </p>
                      <p className="text-amber-700 font-medium">
                        {entrevista.vaga}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {entrevista.tipo}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-600 font-medium flex items-center gap-1 justify-end">
                        <Clock className="h-4 w-4" />
                        {entrevista.horario}
                      </p>
                      <p className="text-sm text-amber-600">
                        {entrevista.duracao}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Candidatos Aprovados */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-900">
                  Candidatos Aprovados
                </CardTitle>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-900 mb-2">
                  {relatoriosData.diario.candidatosAprovados}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-green-700 font-medium">
                    Perfis aprovados para próxima etapa
                  </p>
                  <p className="text-xs text-green-600">
                    Clique para ver aprovados
                  </p>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-green-900 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Candidatos Aprovados Hoje (
                {relatoriosData.diario.candidatosAprovados})
              </DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[60vh] pr-4">
              <div className="grid gap-3">
                {candidatosAprovadosHoje.map((aprovado, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-green-900 text-lg">
                        {aprovado.nome}
                      </p>
                      <p className="text-green-700 font-medium">
                        {aprovado.vaga}
                      </p>
                      <p className="text-sm text-green-600 mt-2 leading-relaxed">
                        {aprovado.observacao}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <Badge className="bg-green-600 text-white flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {aprovado.score}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Histórico de Atendimentos */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Histórico de Atendimentos Recentes</CardTitle>
          <CardDescription>
            Últimos atendimentos realizados com detalhes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidato</TableHead>
                  <TableHead>Vaga</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Observações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atendimentosRecentes.map((atendimento) => (
                  <TableRow key={atendimento.id}>
                    <TableCell className="font-medium">
                      {atendimento.candidato}
                    </TableCell>
                    <TableCell>{atendimento.vaga}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div>
                          {new Date(atendimento.data).toLocaleDateString(
                            'pt-BR'
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {atendimento.hora}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{atendimento.tipo}</Badge>
                    </TableCell>
                    <TableCell>{atendimento.duracao}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          atendimento.status === 'Aprovado'
                            ? 'default'
                            : atendimento.status === 'Reprovado'
                              ? 'destructive'
                              : atendimento.status === 'Ausente'
                                ? 'outline'
                                : 'secondary'
                        }
                      >
                        {atendimento.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p
                        className="text-sm truncate"
                        title={atendimento.observacoes}
                      >
                        {atendimento.observacoes}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
