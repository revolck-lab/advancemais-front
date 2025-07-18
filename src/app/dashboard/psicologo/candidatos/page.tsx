import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Search, Filter, ArrowRight, Phone, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'

// Dados mockados dos candidatos
const candidatos = [
  {
    id: 1,
    nome: 'Ana Silva',
    idade: 28,
    email: 'ana.silva@email.com',
    telefone: '(11) 99999-1111',
    ultimaVaga: 'Desenvolvedor Frontend',
    dataUltimaVaga: '2024-01-15',
    status: 'Avaliação Pendente',
    experiencia: '3 anos',
  },
  {
    id: 2,
    nome: 'Carlos Santos',
    idade: 32,
    email: 'carlos.santos@email.com',
    telefone: '(11) 99999-2222',
    ultimaVaga: 'Analista de Marketing',
    dataUltimaVaga: '2024-01-14',
    status: 'Entrevista Agendada',
    experiencia: '5 anos',
  },
  {
    id: 3,
    nome: 'Maria Oliveira',
    idade: 26,
    email: 'maria.oliveira@email.com',
    telefone: '(11) 99999-3333',
    ultimaVaga: 'Designer UX/UI',
    dataUltimaVaga: '2024-01-13',
    status: 'Perfil Analisado',
    experiencia: '2 anos',
  },
  {
    id: 4,
    nome: 'João Pereira',
    idade: 35,
    email: 'joao.pereira@email.com',
    telefone: '(11) 99999-4444',
    ultimaVaga: 'Gerente de Vendas',
    dataUltimaVaga: '2024-01-12',
    status: 'Aprovado',
    experiencia: '8 anos',
  },
  {
    id: 5,
    nome: 'Fernanda Costa',
    idade: 29,
    email: 'fernanda.costa@email.com',
    telefone: '(11) 99999-5555',
    ultimaVaga: 'Analista de Dados',
    dataUltimaVaga: '2024-01-11',
    status: 'Em Processo',
    experiencia: '4 anos',
  },
  {
    id: 6,
    nome: 'Ricardo Lima',
    idade: 31,
    email: 'ricardo.lima@email.com',
    telefone: '(11) 99999-6666',
    ultimaVaga: 'Desenvolvedor Backend',
    dataUltimaVaga: '2024-01-10',
    status: 'Avaliação Pendente',
    experiencia: '6 anos',
  },
]

export default function CandidatosList() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Candidatos</h1>
          <p className="text-muted-foreground">
            Listagem completa de todos os candidatos do sistema
          </p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros e Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, email ou telefone..."
                  className="pl-10"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="pendente">Avaliação Pendente</SelectItem>
                <SelectItem value="agendada">Entrevista Agendada</SelectItem>
                <SelectItem value="analisado">Perfil Analisado</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="processo">Em Processo</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Experiência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="junior">Até 2 anos</SelectItem>
                <SelectItem value="pleno">3-5 anos</SelectItem>
                <SelectItem value="senior">6+ anos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Candidatos */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Lista de Candidatos ({candidatos.length})</CardTitle>
          <CardDescription>
            Informações completas dos candidatos cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidato</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Última Vaga</TableHead>
                  <TableHead>Experiência</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidatos.map((candidato) => (
                  <TableRow key={candidato.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{candidato.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          {candidato.idade} anos
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3" />
                          {candidato.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3" />
                          {candidato.telefone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {candidato.ultimaVaga}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(
                            candidato.dataUltimaVaga
                          ).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{candidato.experiencia}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          candidato.status === 'Aprovado'
                            ? 'default'
                            : candidato.status === 'Entrevista Agendada'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {candidato.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          href={`/dashboard/recrutadores/candidatos/perfil/${candidato.id}`}
                        >
                          Ver Perfil
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
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
