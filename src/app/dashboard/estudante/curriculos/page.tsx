'use client'

import { useState } from 'react'
import {
  Check,
  ChevronDown,
  Edit,
  Eye,
  File,
  Plus,
  Trash,
  Upload,
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
import { Textarea } from '@/components/ui/textarea/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label/label'
import { Switch } from '@/components/ui/switch/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/dropdown-menu'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion/accordion'

// Define the Curriculo type
interface Curriculo {
  id: number
  titulo: string
  nome: string
  email: string
  telefone: string
  cidade: string
  estado: string
  linkedin: string
  resumo: string
  ultimaAtualizacao: string
  idiomas: { nome: string; nivel: string }[]
  habilidades: string[]
  experiencias: {
    id: number
    cargo: string
    empresa: string
    local: string
    dataInicio: string
    dataFim: string
    atual: boolean
    descricao: string
  }[]
  formacao: {
    id: number
    curso: string
    instituicao: string
    nivel: string
    dataInicio: string
    dataFim: string
    atual: boolean
    descricao: string
  }[]
  certificacoes: string
  projetos: string
  publicacoes: string
}

// Mock data for curriculos
const curriculos: Curriculo[] = [
  {
    id: 1,
    titulo: 'Currículo Padrão',
    nome: 'João da Silva',
    email: 'joao@example.com',
    telefone: '11999999999',
    cidade: 'São Paulo',
    estado: 'SP',
    linkedin: 'linkedin.com/in/joao',
    resumo: 'Desenvolvedor Full Stack com experiência em React e Node.js.',
    ultimaAtualizacao: '2023-10-26',
    idiomas: [
      { nome: 'Português', nivel: 'Nativo' },
      { nome: 'Inglês', nivel: 'Avançado' },
    ],
    habilidades: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS'],
    experiencias: [
      {
        id: 1,
        cargo: 'Desenvolvedor Full Stack',
        empresa: 'Empresa X',
        local: 'São Paulo',
        dataInicio: '2022-01',
        dataFim: '2023-10',
        atual: false,
        descricao:
          'Desenvolvimento de aplicações web utilizando React e Node.js.',
      },
    ],
    formacao: [
      {
        id: 1,
        curso: 'Engenharia da Computação',
        instituicao: 'Universidade Y',
        nivel: 'Graduação',
        dataInicio: '2018-01',
        dataFim: '2021-12',
        atual: false,
        descricao: 'Formação em Engenharia da Computação.',
      },
    ],
    certificacoes: 'Certificação X, Certificação Y',
    projetos: 'Projeto A, Projeto B',
    publicacoes: 'Publicação 1, Publicação 2',
  },
  {
    id: 2,
    titulo: 'Currículo para Vagas de Front-end',
    nome: 'João da Silva',
    email: 'joao@example.com',
    telefone: '11999999999',
    cidade: 'São Paulo',
    estado: 'SP',
    linkedin: 'linkedin.com/in/joao',
    resumo:
      'Desenvolvedor Front-end com foco em React e experiência em interfaces responsivas.',
    ultimaAtualizacao: '2023-10-20',
    idiomas: [
      { nome: 'Português', nivel: 'Nativo' },
      { nome: 'Inglês', nivel: 'Intermediário' },
    ],
    habilidades: ['JavaScript', 'React', 'HTML', 'CSS', 'Redux'],
    experiencias: [
      {
        id: 2,
        cargo: 'Desenvolvedor Front-end',
        empresa: 'Empresa Z',
        local: 'Rio de Janeiro',
        dataInicio: '2021-05',
        dataFim: '2022-12',
        atual: false,
        descricao:
          'Desenvolvimento de interfaces web utilizando React e Redux.',
      },
    ],
    formacao: [
      {
        id: 2,
        curso: 'Análise e Desenvolvimento de Sistemas',
        instituicao: 'Faculdade W',
        nivel: 'Tecnólogo',
        dataInicio: '2017-01',
        dataFim: '2019-12',
        atual: false,
        descricao: 'Formação em Análise e Desenvolvimento de Sistemas.',
      },
    ],
    certificacoes: 'Certificação React, Certificação Redux',
    projetos: 'Projeto C, Projeto D',
    publicacoes: '',
  },
]

// Mock data for suggested skills
const suggestedSkills = [
  'Comunicação',
  'Liderança',
  'Trabalho em equipe',
  'Organização',
  'Proatividade',
  'Resolução de problemas',
  'Pensamento crítico',
  'Criatividade',
  'Adaptabilidade',
  'Inteligência emocional',
]

export default function CurriculosPage() {
  const [curriculoAtivo, setCurriculoAtivo] = useState(1)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState<Curriculo>(curriculos[0])

  // Função para definir um currículo como padrão
  const setDefaultCurriculo = (id: number) => {
    setCurriculoAtivo(id)
  }

  // Função para iniciar edição de um currículo
  const startEditing = (curriculo: Curriculo) => {
    setFormData(curriculo)
    setEditMode(true)
  }

  // Função para adicionar nova experiência
  const addExperience = () => {
    setFormData({
      ...formData,
      experiencias: [
        ...formData.experiencias,
        {
          id: Date.now(),
          cargo: '',
          empresa: '',
          local: '',
          dataInicio: '',
          dataFim: '',
          atual: false,
          descricao: '',
        },
      ],
    })
  }

  // Função para adicionar nova formação
  const addEducation = () => {
    setFormData({
      ...formData,
      formacao: [
        ...formData.formacao,
        {
          id: Date.now(),
          curso: '',
          instituicao: '',
          nivel: '',
          dataInicio: '',
          dataFim: '',
          atual: false,
          descricao: '',
        },
      ],
    })
  }

  // Função para atualizar experiência
  const updateExperience = (
    id: number,
    field: string,
    value: string | boolean
  ) => {
    setFormData({
      ...formData,
      experiencias: formData.experiencias.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    })
  }

  // Função para atualizar formação
  const updateEducation = (
    id: number,
    field: string,
    value: string | boolean
  ) => {
    setFormData({
      ...formData,
      formacao: formData.formacao.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    })
  }

  // Função para remover experiência
  const removeExperience = (id: number) => {
    setFormData({
      ...formData,
      experiencias: formData.experiencias.filter((exp) => exp.id !== id),
    })
  }

  // Função para remover formação
  const removeEducation = (id: number) => {
    setFormData({
      ...formData,
      formacao: formData.formacao.filter((edu) => edu.id !== id),
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Currículos</h1>
          <p className="text-muted-foreground">
            Gerencie seus currículos para candidaturas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo currículo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Criar novo currículo</DialogTitle>
                <DialogDescription>
                  Escolha como deseja criar seu novo currículo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button className="justify-start">
                  <File className="mr-2 h-4 w-4" />
                  Criar do zero
                </Button>
                <Button className="justify-start" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Importar currículo existente
                </Button>
                <Button className="justify-start" variant="outline">
                  <File className="mr-2 h-4 w-4" />
                  Duplicar currículo existente
                </Button>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Lista de currículos */}
      {!editMode ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {curriculos.map((curriculo) => (
            <Card
              key={curriculo.id}
              className={`bg-white ${curriculo.id === curriculoAtivo ? 'border-blue-500' : ''}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{curriculo.titulo}</CardTitle>
                  {curriculo.id === curriculoAtivo && (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      Padrão
                    </Badge>
                  )}
                </div>
                <CardDescription>
                  Última atualização: {curriculo.ultimaAtualizacao}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">
                      {curriculo.idiomas.length} idiomas
                    </Badge>
                    <Badge variant="outline">
                      {curriculo.habilidades.length} habilidades
                    </Badge>
                    <Badge variant="outline">
                      {curriculo.experiencias.length} experiências
                    </Badge>
                  </div>
                  <p className="text-sm line-clamp-2">{curriculo.resumo}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEditing(curriculo)}
                >
                  <Edit className="mr-2 h-3 w-3" />
                  Editar
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem onClick={() => startEditing(curriculo)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Visualizar
                    </DropdownMenuItem>
                    {curriculo.id !== curriculoAtivo && (
                      <DropdownMenuItem
                        onClick={() => setDefaultCurriculo(curriculo.id)}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Definir como padrão
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        // Modo de edição de currículo
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Editando: {formData.titulo}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setEditMode(false)}>
                Salvar alterações
              </Button>
            </div>
          </div>

          <Tabs defaultValue="info" className="space-y-4">
            <TabsList className="bg-white">
              <TabsTrigger value="info">Informações Pessoais</TabsTrigger>
              <TabsTrigger value="education">Formação</TabsTrigger>
              <TabsTrigger value="experience">Experiência</TabsTrigger>
              <TabsTrigger value="skills">Habilidades</TabsTrigger>
              <TabsTrigger value="languages">Idiomas</TabsTrigger>
              <TabsTrigger value="additional">
                Informações Adicionais
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Dados básicos do seu currículo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="titulo">Título do Currículo</Label>
                      <Input
                        id="titulo"
                        value={formData.titulo}
                        onChange={(e) =>
                          setFormData({ ...formData, titulo: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) =>
                          setFormData({ ...formData, nome: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={formData.telefone}
                        onChange={(e) =>
                          setFormData({ ...formData, telefone: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input
                        id="cidade"
                        value={formData.cidade}
                        onChange={(e) =>
                          setFormData({ ...formData, cidade: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <Input
                        id="estado"
                        value={formData.estado}
                        onChange={(e) =>
                          setFormData({ ...formData, estado: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) =>
                          setFormData({ ...formData, linkedin: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="resumo">Resumo Profissional</Label>
                      <Textarea
                        id="resumo"
                        rows={4}
                        value={formData.resumo}
                        onChange={(e) =>
                          setFormData({ ...formData, resumo: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Formação Acadêmica</CardTitle>
                    <CardDescription>
                      Adicione sua formação educacional
                    </CardDescription>
                  </div>
                  <Button onClick={addEducation}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar formação
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.formacao.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Nenhuma formação acadêmica adicionada. Clique em
                      (Adicionar formação) para começar.
                    </div>
                  ) : (
                    <Accordion type="multiple" className="space-y-4">
                      {formData.formacao.map((edu, index) => (
                        <AccordionItem
                          key={edu.id}
                          value={`edu-${edu.id}`}
                          className="border rounded-lg"
                        >
                          <AccordionTrigger className="px-4">
                            <div className="flex-1 text-left">
                              {edu.curso || `Formação ${index + 1}`}
                              {edu.instituicao && ` - ${edu.instituicao}`}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Curso</Label>
                                <Input
                                  value={edu.curso}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      'curso',
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Instituição</Label>
                                <Input
                                  value={edu.instituicao}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      'instituicao',
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Nível</Label>
                                <Select
                                  value={edu.nivel}
                                  onValueChange={(value) =>
                                    updateEducation(edu.id, 'nivel', value)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione o nível" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Ensino Médio">
                                      Ensino Médio
                                    </SelectItem>
                                    <SelectItem value="Técnico">
                                      Técnico
                                    </SelectItem>
                                    <SelectItem value="Graduação">
                                      Graduação
                                    </SelectItem>
                                    <SelectItem value="Pós-graduação">
                                      Pós-graduação
                                    </SelectItem>
                                    <SelectItem value="Mestrado">
                                      Mestrado
                                    </SelectItem>
                                    <SelectItem value="Doutorado">
                                      Doutorado
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label>Cursando atualmente</Label>
                                  <Switch
                                    checked={edu.atual}
                                    onCheckedChange={(checked) =>
                                      updateEducation(edu.id, 'atual', checked)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Data de Início</Label>
                                <Input
                                  type="month"
                                  value={edu.dataInicio}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      'dataInicio',
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              {!edu.atual && (
                                <div className="space-y-2">
                                  <Label>Data de Conclusão</Label>
                                  <Input
                                    type="month"
                                    value={edu.dataFim}
                                    onChange={(e) =>
                                      updateEducation(
                                        edu.id,
                                        'dataFim',
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}
                              <div className="space-y-2 md:col-span-2">
                                <Label>Descrição</Label>
                                <Textarea
                                  rows={3}
                                  value={edu.descricao}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      'descricao',
                                      e.target.value
                                    )
                                  }
                                  placeholder="Descreva atividades relevantes, conquistas, etc."
                                />
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeEducation(edu.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Remover
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Experiência Profissional</CardTitle>
                    <CardDescription>
                      Adicione suas experiências de trabalho
                    </CardDescription>
                  </div>
                  <Button onClick={addExperience}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar experiência
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.experiencias.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Nenhuma experiência profissional adicionada. Clique em
                      (Adicionar experiência) para começar.
                    </div>
                  ) : (
                    <Accordion type="multiple" className="space-y-4">
                      {formData.experiencias.map((exp, index) => (
                        <AccordionItem
                          key={exp.id}
                          value={`exp-${exp.id}`}
                          className="border rounded-lg"
                        >
                          <AccordionTrigger className="px-4">
                            <div className="flex-1 text-left">
                              {exp.cargo || `Experiência ${index + 1}`}
                              {exp.empresa && ` - ${exp.empresa}`}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Cargo</Label>
                                <Input
                                  value={exp.cargo}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      'cargo',
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Empresa</Label>
                                <Input
                                  value={exp.empresa}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      'empresa',
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Local</Label>
                                <Input
                                  value={exp.local}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      'local',
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label>Trabalho atual</Label>
                                  <Switch
                                    checked={exp.atual}
                                    onCheckedChange={(checked) =>
                                      updateExperience(exp.id, 'atual', checked)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Data de Início</Label>
                                <Input
                                  type="month"
                                  value={exp.dataInicio}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      'dataInicio',
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              {!exp.atual && (
                                <div className="space-y-2">
                                  <Label>Data de Término</Label>
                                  <Input
                                    type="month"
                                    value={exp.dataFim}
                                    onChange={(e) =>
                                      updateExperience(
                                        exp.id,
                                        'dataFim',
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}
                              <div className="space-y-2 md:col-span-2">
                                <Label>Descrição</Label>
                                <Textarea
                                  rows={3}
                                  value={exp.descricao}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      'descricao',
                                      e.target.value
                                    )
                                  }
                                  placeholder="Descreva suas responsabilidades, conquistas, etc."
                                />
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeExperience(exp.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Remover
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Habilidades</CardTitle>
                  <CardDescription>
                    Adicione suas habilidades técnicas e competências
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Habilidades Técnicas</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.habilidades.map((skill, index) => (
                          <Badge
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
                          >
                            {skill}
                            <button
                              className="ml-2 text-blue-800 hover:text-blue-900"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  habilidades: formData.habilidades.filter(
                                    (_, i) => i !== index
                                  ),
                                })
                              }}
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Adicionar habilidade"
                            className="w-48"
                            onKeyDown={(e) => {
                              if (
                                e.key === 'Enter' &&
                                e.currentTarget.value.trim()
                              ) {
                                e.preventDefault()
                                setFormData({
                                  ...formData,
                                  habilidades: [
                                    ...formData.habilidades,
                                    e.currentTarget.value.trim(),
                                  ],
                                })
                                e.currentTarget.value = ''
                              }
                            }}
                          />
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Habilidades Sugeridas</Label>
                      <div className="flex flex-wrap gap-2">
                        {suggestedSkills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="cursor-pointer hover:bg-blue-50"
                            onClick={() => {
                              if (!formData.habilidades.includes(skill)) {
                                setFormData({
                                  ...formData,
                                  habilidades: [...formData.habilidades, skill],
                                })
                              }
                            }}
                          >
                            + {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="languages" className="space-y-4">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Idiomas</CardTitle>
                  <CardDescription>
                    Adicione os idiomas que você conhece
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {formData.idiomas.map((idioma, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex-1">
                          <Input
                            value={idioma.nome}
                            onChange={(e) => {
                              const newIdiomas = [...formData.idiomas]
                              newIdiomas[index].nome = e.target.value
                              setFormData({ ...formData, idiomas: newIdiomas })
                            }}
                            placeholder="Nome do idioma"
                          />
                        </div>
                        <div className="w-40">
                          <Select
                            value={idioma.nivel}
                            onValueChange={(value) => {
                              const newIdiomas = [...formData.idiomas]
                              newIdiomas[index].nivel = value
                              setFormData({ ...formData, idiomas: newIdiomas })
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Nível" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Básico">Básico</SelectItem>
                              <SelectItem value="Intermediário">
                                Intermediário
                              </SelectItem>
                              <SelectItem value="Avançado">Avançado</SelectItem>
                              <SelectItem value="Fluente">Fluente</SelectItem>
                              <SelectItem value="Nativo">Nativo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newIdiomas = [...formData.idiomas]
                            newIdiomas.splice(index, 1)
                            setFormData({ ...formData, idiomas: newIdiomas })
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          idiomas: [
                            ...formData.idiomas,
                            { nome: '', nivel: 'Básico' },
                          ],
                        })
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar idioma
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="additional" className="space-y-4">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Informações Adicionais</CardTitle>
                  <CardDescription>
                    Outras informações relevantes para seu currículo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="certificacoes">Certificações</Label>
                      <Textarea
                        id="certificacoes"
                        rows={3}
                        value={formData.certificacoes}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            certificacoes: e.target.value,
                          })
                        }
                        placeholder="Liste suas certificações relevantes"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projetos">Projetos</Label>
                      <Textarea
                        id="projetos"
                        rows={3}
                        value={formData.projetos}
                        onChange={(e) =>
                          setFormData({ ...formData, projetos: e.target.value })
                        }
                        placeholder="Descreva projetos relevantes que você desenvolveu"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="publicacoes">Publicações</Label>
                      <Textarea
                        id="publicacoes"
                        rows={3}
                        value={formData.publicacoes}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            publicacoes: e.target.value,
                          })
                        }
                        placeholder="Liste suas publicações, artigos, etc."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
