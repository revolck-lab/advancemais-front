import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Input } from '@/components/ui/input/input'
import { Separator } from '@/components/ui/separator/separator'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar'
import {
  Calendar,
  Clock,
  Download,
  Eye,
  Search,
  Award,
  Filter,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'

const certificates = [
  {
    id: 1,
    title: 'Gestão de Recursos Humanos',
    institution: 'Instituto de Capacitação Profissional',
    completionDate: '15/11/2024',
    duration: '40 horas',
    category: 'Recursos Humanos',
    status: 'Concluído',
    grade: '9.2',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 2,
    title: 'Departamento Pessoal na Prática',
    institution: 'Centro de Educação Continuada',
    completionDate: '28/10/2024',
    duration: '30 horas',
    category: 'Departamento Pessoal',
    status: 'Concluído',
    grade: '8.8',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 3,
    title: 'Liderança e Gestão de Equipes',
    institution: 'Academia de Liderança',
    completionDate: '05/10/2024',
    duration: '25 horas',
    category: 'Liderança',
    status: 'Concluído',
    grade: '9.5',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 4,
    title: 'Excel Avançado para RH',
    institution: 'TechSkills Online',
    completionDate: '20/09/2024',
    duration: '20 horas',
    category: 'Tecnologia',
    status: 'Concluído',
    grade: '9.0',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 5,
    title: 'Comunicação Corporativa',
    institution: 'Instituto de Comunicação',
    completionDate: '12/08/2024',
    duration: '15 horas',
    category: 'Comunicação',
    status: 'Concluído',
    grade: '8.7',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 6,
    title: 'Gestão de Conflitos',
    institution: 'Centro de Desenvolvimento Humano',
    completionDate: '03/07/2024',
    duration: '18 horas',
    category: 'Recursos Humanos',
    status: 'Concluído',
    grade: '9.1',
    image: '/placeholder.svg?height=200&width=300',
  },
]

export default function StudentCertificates() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16 bg-gray-500 text-white">
              <AvatarImage
                src="/placeholder.svg?height=64&width=64"
                alt="Foto do aluno"
              />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-0">
                Meus Certificados
              </h1>
              <p className="text-gray-600">Maria Aparecida Silva</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{certificates.length}</p>
                    <p className="text-sm text-gray-600">Certificados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">148h</p>
                    <p className="text-sm text-gray-600">Horas Totais</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">2024</p>
                    <p className="text-sm text-gray-600">Último Ano</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">9.0</p>
                    <p className="text-sm text-gray-600">Nota Média</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar certificados..."
                    className="pl-10"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  <SelectItem value="rh">Recursos Humanos</SelectItem>
                  <SelectItem value="dp">Departamento Pessoal</SelectItem>
                  <SelectItem value="lideranca">Liderança</SelectItem>
                  <SelectItem value="tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="comunicacao">Comunicação</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <Card
              key={certificate.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-3 flex items-center justify-center">
                  <Award className="h-12 w-12 text-white" />
                </div>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">
                      {certificate.title}
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {certificate.institution}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {certificate.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Concluído em {certificate.completionDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{certificate.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">
                        Nota: {certificate.grade}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Visualizar
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Baixar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (if no certificates) */}
        {certificates.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum certificado encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                Você ainda não possui certificados. Complete seus primeiros
                cursos para começar sua jornada!
              </p>
              <Button>Explorar Cursos</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
