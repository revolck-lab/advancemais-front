import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Search, Filter, Users, Calendar, MapPin, Building } from 'lucide-react'

// Dados mockados das vagas
const vagas = [
  {
    id: 1,
    titulo: 'Desenvolvedor Frontend',
    empresa: 'Tech Solutions',
    localizacao: 'São Paulo, SP',
    salario: 'R$ 8.000 - R$ 12.000',
    candidatos: 12,
    status: 'Ativa',
    dataPublicacao: '2024-01-15',
    modalidade: 'Remoto',
    nivel: 'Pleno',
  },
  {
    id: 2,
    titulo: 'Analista de Marketing',
    empresa: 'Marketing Pro',
    localizacao: 'Rio de Janeiro, RJ',
    salario: 'R$ 5.000 - R$ 8.000',
    candidatos: 8,
    status: 'Ativa',
    dataPublicacao: '2024-01-14',
    modalidade: 'Híbrido',
    nivel: 'Junior',
  },
  {
    id: 3,
    titulo: 'Designer UX/UI',
    empresa: 'Creative Agency',
    localizacao: 'Belo Horizonte, MG',
    salario: 'R$ 6.000 - R$ 10.000',
    candidatos: 15,
    status: 'Pausada',
    dataPublicacao: '2024-01-13',
    modalidade: 'Presencial',
    nivel: 'Pleno',
  },
  {
    id: 4,
    titulo: 'Gerente de Vendas',
    empresa: 'Sales Corp',
    localizacao: 'São Paulo, SP',
    salario: 'R$ 10.000 - R$ 15.000',
    candidatos: 6,
    status: 'Ativa',
    dataPublicacao: '2024-01-12',
    modalidade: 'Presencial',
    nivel: 'Senior',
  },
  {
    id: 5,
    titulo: 'Analista de Dados',
    empresa: 'Data Insights',
    localizacao: 'São Paulo, SP',
    salario: 'R$ 7.000 - R$ 11.000',
    candidatos: 20,
    status: 'Ativa',
    dataPublicacao: '2024-01-11',
    modalidade: 'Remoto',
    nivel: 'Pleno',
  },
  {
    id: 6,
    titulo: 'Desenvolvedor Backend',
    empresa: 'Backend Solutions',
    localizacao: 'Curitiba, PR',
    salario: 'R$ 9.000 - R$ 14.000',
    candidatos: 18,
    status: 'Ativa',
    dataPublicacao: '2024-01-10',
    modalidade: 'Híbrido',
    nivel: 'Senior',
  },
]

export default function VagasList() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vagas do Sistema</h1>
          <p className="text-muted-foreground">
            Visualização de todas as vagas cadastradas no sistema
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar vagas..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativa">Ativa</SelectItem>
                <SelectItem value="pausada">Pausada</SelectItem>
                <SelectItem value="encerrada">Encerrada</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="remoto">Remoto</SelectItem>
                <SelectItem value="presencial">Presencial</SelectItem>
                <SelectItem value="hibrido">Híbrido</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="pleno">Pleno</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Vagas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vagas.map((vaga) => (
          <Card
            key={vaga.id}
            className="hover:shadow-md transition-shadow bg-white"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{vaga.titulo}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building className="h-4 w-4" />
                    {vaga.empresa}
                  </div>
                </div>
                <Badge
                  variant={vaga.status === 'Ativa' ? 'default' : 'secondary'}
                >
                  {vaga.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {vaga.localizacao}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Publicada em{' '}
                  {new Date(vaga.dataPublicacao).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  {vaga.candidatos} candidatos
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{vaga.modalidade}</Badge>
                <Badge variant="outline">{vaga.nivel}</Badge>
              </div>

              <div className="pt-2 border-t">
                <p className="font-semibold text-sm">{vaga.salario}</p>
              </div>

              <Button className="w-full" asChild>
                <a href={`/dashboard/recrutadores/vagas/1`}>Ver Detalhes</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
