'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Info,
  Search,
  ChevronRight,
  Clock,
  ArrowRight,
  Filter,
  BookOpen,
  Calendar,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card/card'
import { Progress } from '@/components/ui/progress/progress'
import { Input } from '@/components/ui/input/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip/tooltip'
import { Badge } from '@/components/ui/badge/badge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/dropdown-menu'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card/hover-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Skeleton } from '@/components/ui/skeleton/skeleton'

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [, setSelectedFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  // Simula carregamento quando o filtro muda
  const handleFilterChange = (value: string) => {
    setIsLoading(true)
    setSelectedFilter(value)
    setTimeout(() => setIsLoading(false), 500)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Bom dia, Adit 👋</h1>
        <p className="text-muted-foreground">
          Bem-vindo a plataforma de cursos da AdvanceMais, confira seu
          aprendizado prioritário.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          {/* Alerta de novo recurso */}
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Badge
                  variant="outline"
                  className="bg-green-500 text-white border-0 text-xs"
                >
                  Novo
                </Badge>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">Discussão de Recursos</h3>
                <div className="mt-1 text-sm text-muted-foreground">
                  O conteúdo de aprendizado é um novo recurso em Discussão de
                  Recursos que pode explicar o problema do material no chat.
                  <Link
                    href="#"
                    className="inline-flex items-center ml-2 text-sm font-medium text-primary"
                  >
                    Ver detalhes
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Filtro e pesquisa */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold mr-2">
                Conteúdo de aprendizado em progresso
              </h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Informações</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cursos que você começou mas ainda não concluiu</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar cursos..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleFilterChange('all')}>
                    Todos os Cursos
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFilterChange('design')}
                  >
                    UI/UX Design
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFilterChange('development')}
                  >
                    Desenvolvimento
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFilterChange('deadline')}
                  >
                    Prazos Próximos
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Select
                defaultValue="newest"
                onValueChange={() => setIsLoading(true)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mais recentes</SelectItem>
                  <SelectItem value="oldest">Mais antigos</SelectItem>
                  <SelectItem value="progress">Progresso</SelectItem>
                  <SelectItem value="deadline">Prazo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Cursos em progresso */}
          <div className="space-y-4 mb-8">
            {isLoading ? (
              <>
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-20 w-20 rounded-md" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-5 w-3/4" />
                        <div className="flex gap-4">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-9 w-20" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-20 w-20 rounded-md" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-5 w-3/4" />
                        <div className="flex gap-4">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-9 w-20" />
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Card className="overflow-hidden border-l-4 border-l-primary hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-12 sm:col-span-5 md:col-span-4 flex items-center gap-3">
                            <div className="flex-shrink-0">
                              <Image
                                src="/placeholder.svg?height=80&width=80"
                                width={80}
                                height={80}
                                alt="UI/UX Design"
                                className="rounded-md object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <Badge
                                  variant="outline"
                                  className="bg-blue-100 text-blue-800 border-0 text-xs"
                                >
                                  Curso
                                </Badge>
                              </div>
                              <h3 className="font-medium mt-1">
                                Dominando UI/UX Design: Um Guia...
                              </h3>
                            </div>
                          </div>

                          <div className="col-span-4 sm:col-span-2 md:col-span-2">
                            <div className="text-xs text-muted-foreground">
                              Conteúdo
                            </div>
                            <div className="flex items-center mt-1">
                              <BookOpen className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span>5 Materiais</span>
                            </div>
                          </div>

                          <div className="col-span-4 sm:col-span-2 md:col-span-2">
                            <div className="text-xs text-muted-foreground">
                              Conclusão
                            </div>
                            <div className="mt-1">-</div>
                          </div>

                          <div className="col-span-4 sm:col-span-3 md:col-span-2">
                            <div className="text-xs text-muted-foreground">
                              Prazo
                            </div>
                            <div className="flex items-center mt-1 text-muted-foreground">
                              <Clock className="mr-1 h-4 w-4" />
                              <span>1 Dia</span>
                            </div>
                          </div>

                          <div className="col-span-12 sm:col-span-12 md:col-span-2 flex justify-start md:justify-end">
                            <Button size="sm">Iniciar</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          Dominando UI/UX Design: Um Guia para Iniciantes
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Aprenda os fundamentos de UI/UX design e crie
                          interfaces de usuário impressionantes.
                        </p>
                        <div className="flex items-center pt-2">
                          <Avatar className="h-5 w-5 mr-2">
                            <AvatarImage
                              src="/placeholder.svg"
                              alt="Instrutor"
                            />
                            <AvatarFallback>IN</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            Leonardo Samsul
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Card className="overflow-hidden border-l-4 border-l-primary hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-12 sm:col-span-5 md:col-span-4 flex items-center gap-3">
                            <div className="flex-shrink-0">
                              <Image
                                src="/placeholder.svg?height=80&width=80"
                                width={80}
                                height={80}
                                alt="Jornada de Aprendizado"
                                className="rounded-md object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <Badge
                                  variant="outline"
                                  className="bg-blue-100 text-blue-800 border-0 text-xs"
                                >
                                  Curso
                                </Badge>
                              </div>
                              <h3 className="font-medium mt-1">
                                Criando Jornadas de Aprendizado...
                              </h3>
                            </div>
                          </div>

                          <div className="col-span-4 sm:col-span-2 md:col-span-2">
                            <div className="text-xs text-muted-foreground">
                              Conteúdo
                            </div>
                            <div className="flex items-center mt-1">
                              <BookOpen className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span>12 Materiais</span>
                            </div>
                          </div>

                          <div className="col-span-4 sm:col-span-2 md:col-span-2">
                            <div className="text-xs text-muted-foreground">
                              Conclusão
                            </div>
                            <div className="mt-1">
                              <div className="flex items-center">
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-1 h-4 w-4 text-green-500"
                                >
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="opacity-25"
                                  ></circle>
                                  <path
                                    d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    className="opacity-25"
                                  ></path>
                                  <path
                                    d="M2 12C2 6.47715 6.47715 2 12 2V12H22C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                                <span className="text-green-600">64%</span>
                              </div>
                              <Progress value={64} className="h-1 mt-1 w-16" />
                            </div>
                          </div>

                          <div className="col-span-4 sm:col-span-3 md:col-span-2">
                            <div className="text-xs text-muted-foreground">
                              Prazo
                            </div>
                            <div className="flex items-center mt-1 text-red-500">
                              <Clock className="mr-1 h-4 w-4" />
                              <span>12 hrs</span>
                            </div>
                          </div>

                          <div className="col-span-12 sm:col-span-12 md:col-span-2 flex justify-start md:justify-end">
                            <Button size="sm">Continuar</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          Criando Jornadas de Aprendizado Envolventes
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Projete experiências de aprendizado eficazes que
                          mantenham os alunos engajados.
                        </p>
                        <div className="flex items-center pt-2">
                          <Avatar className="h-5 w-5 mr-2">
                            <AvatarImage
                              src="/placeholder.svg"
                              alt="Instrutor"
                            />
                            <AvatarFallback>PS</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            Padhang Satrio
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </>
            )}
          </div>

          {/* Novas matrículas */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold mr-2">Nova matrícula</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Informações</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cursos em que você se matriculou recentemente</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Link
              href="#"
              className="text-sm font-medium text-primary flex items-center"
            >
              Ver todos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-[160px] w-full" />
                    <CardContent className="p-4">
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-5 w-full mb-4" />
                      <div className="flex gap-2 mb-4">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <Skeleton className="h-4 w-24" />
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <>
                <Card className="overflow-hidden border hover:shadow-md transition-shadow">
                  <div className="relative">
                    <div className="absolute top-2 left-2 bg-purple-100 text-purple-800 text-xs py-1 px-2 rounded">
                      10 materiais
                    </div>
                    <Image
                      src="/placeholder.svg?height=160&width=320"
                      width={320}
                      height={160}
                      alt="Engajamento de Aprendizado"
                      className="w-full object-cover h-[160px]"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800 border-0 text-xs mb-2"
                    >
                      Curso
                    </Badge>
                    <h3 className="font-medium mb-4">
                      Aprimorando o Engajamento de Aprendizado Através de UI/UX
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge
                        variant="outline"
                        className="bg-slate-100 text-slate-800 border-0 text-xs"
                      >
                        Prototipagem
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-slate-100 text-slate-800 border-0 text-xs"
                      >
                        Não Urgente
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Não Iniciado
                      </div>
                      <Button variant="outline" size="sm">
                        Explorar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border hover:shadow-md transition-shadow">
                  <div className="relative">
                    <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 text-xs py-1 px-2 rounded">
                      5 materiais
                    </div>
                    <Image
                      src="/placeholder.svg?height=160&width=320"
                      width={320}
                      height={160}
                      alt="UI/UX 101"
                      className="w-full object-cover h-[160px]"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800 border-0 text-xs mb-2"
                    >
                      Curso
                    </Badge>
                    <h3 className="font-medium mb-4">
                      UI/UX 101 - Para Iniciantes se Tornarem Ótimos Designers
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge
                        variant="outline"
                        className="bg-slate-100 text-slate-800 border-0 text-xs"
                      >
                        Prototipagem
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-slate-100 text-slate-800 border-0 text-xs"
                      >
                        Não Urgente
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Não Iniciado
                      </div>
                      <Button variant="outline" size="sm">
                        Explorar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border hover:shadow-md transition-shadow">
                  <div className="relative">
                    <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded">
                      12 materiais
                    </div>
                    <Image
                      src="/placeholder.svg?height=160&width=320"
                      width={320}
                      height={160}
                      alt="UI Design"
                      className="w-full object-cover h-[160px]"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800 border-0 text-xs mb-2"
                    >
                      Curso
                    </Badge>
                    <h3 className="font-medium mb-4">
                      Dominando UI Design para Experiências Impactantes
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge
                        variant="outline"
                        className="bg-slate-100 text-slate-800 border-0 text-xs"
                      >
                        Prototipagem
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-slate-100 text-slate-800 border-0 text-xs"
                      >
                        Não Urgente
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Não Iniciado
                      </div>
                      <Button variant="outline" size="sm">
                        Explorar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        {/* Barra lateral */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 gap-6">
            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 flex flex-col items-center justify-center">
                <div className="text-amber-500 mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="6"></circle>
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                  </svg>
                </div>
                <div className="text-xl font-bold">100</div>
                <div className="text-xs text-muted-foreground">Pontos</div>
              </Card>

              <Card className="p-4 flex flex-col items-center justify-center">
                <div className="text-amber-500 mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div className="text-xl font-bold">32</div>
                <div className="text-xs text-muted-foreground">Emblemas</div>
              </Card>

              <Card className="p-4 flex flex-col items-center justify-center">
                <div className="text-amber-500 mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 7V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3"></path>
                    <path d="M14 2v6h6"></path>
                    <path d="M10 12H4v6h6v-6Z"></path>
                    <path d="M10 12V6H4v6"></path>
                  </svg>
                </div>
                <div className="text-xl font-bold">12</div>
                <div className="text-xs text-muted-foreground">
                  Certificados
                </div>
              </Card>
            </div>

            {/* Conteúdo de aprendizado */}
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  <div className="text-xl font-bold">120</div>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Conteúdo de aprendizado
              </div>
            </Card>

            {/* Tempo de aprendizado */}
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  <div className="text-xl font-bold">44</div>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Tempo de aprendizado
              </div>
            </Card>

            {/* Metas */}
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Metas</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Suas metas de aprendizado</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full transform -rotate-90"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e6e6e6"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="10"
                      strokeDasharray="282.7"
                      strokeDashoffset="200"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3v4"></path>
                      <path d="M12 21v-4"></path>
                      <path d="M3 12h4"></path>
                      <path d="M21 12h-4"></path>
                      <path d="m18.364 5.636-2.828 2.828"></path>
                      <path d="m5.636 18.364 2.828-2.828"></path>
                      <path d="m5.636 5.636 2.828 2.828"></path>
                      <path d="m18.364 18.364-2.828-2.828"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="font-medium">
                  Meta Diária: <span className="font-bold">6/30</span>{' '}
                  aprendizado
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-sm mb-1">
                  Sua sequência mais longa:{' '}
                  <span className="font-bold">1 Dia</span>
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  (28 Set 23 - 4 Out 23)
                </div>
                <Link href="#" className="text-sm font-medium text-primary">
                  Ver Detalhes
                </Link>
              </div>
            </Card>

            {/* Classificação */}
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Classificação</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ranking dos alunos</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="font-bold mr-2">#1</div>
                  <div className="w-8 h-8 rounded-full bg-slate-200 mr-2 overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      width={32}
                      height={32}
                      alt="Arif Brata"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Arif Brata</div>
                    <div className="text-xs text-muted-foreground">
                      Designer Jr UI/UX
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 text-xs font-medium flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <circle cx="12" cy="8" r="6"></circle>
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                      </svg>
                      100pts
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="font-bold mr-2">#2</div>
                  <div className="w-8 h-8 rounded-full bg-slate-200 mr-2 overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      width={32}
                      height={32}
                      alt="Você"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Você</div>
                    <div className="text-xs text-muted-foreground">
                      Estudante
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 text-xs font-medium flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <circle cx="12" cy="8" r="6"></circle>
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                      </svg>
                      85pts
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="font-bold mr-2">#3</div>
                  <div className="w-8 h-8 rounded-full bg-slate-200 mr-2 overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      width={32}
                      height={32}
                      alt="Sarah"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Sarah L.</div>
                    <div className="text-xs text-muted-foreground">
                      Estudante
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 text-xs font-medium flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <circle cx="12" cy="8" r="6"></circle>
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                      </svg>
                      72pts
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Button variant="outline" size="sm" className="w-full">
                  Ver Classificação Completa
                </Button>
              </div>
            </Card>

            {/* Calendário */}
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Próximas Sessões</h3>
                <Button variant="ghost" size="icon">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center p-2 rounded-md bg-blue-50">
                  <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Workshop de UI/UX</div>
                    <div className="text-xs text-muted-foreground">
                      Amanhã, 14:00
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center p-2 rounded-md hover:bg-slate-50">
                  <div className="w-10 h-10 rounded-md bg-purple-100 flex items-center justify-center mr-3">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      Reunião com Mentor
                    </div>
                    <div className="text-xs text-muted-foreground">
                      5 Out, 10:00
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
