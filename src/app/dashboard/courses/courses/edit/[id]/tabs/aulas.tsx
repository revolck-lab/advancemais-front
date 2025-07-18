'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { Textarea } from '@/components/ui/textarea/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog/dialog'
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
  Plus,
  Copy,
  Check,
  SlashIcon,
  Settings,
  MoreVertical,
} from 'lucide-react'

// Class interface
interface Aula {
  id: number
  ordem: number
  status: 'Rascunho' | 'Publicado'
  modulo: string
  titulo: string
  tipo: 'Arquivo' | 'Video (URL)'
  tamanho?: string
}

// Sample data
const sampleAulas: Aula[] = [
  {
    id: 3,
    ordem: 1,
    status: 'Rascunho',
    modulo: 'teste',
    titulo: 'teste',
    tipo: 'Arquivo',
  },
  {
    id: 4,
    ordem: 2,
    status: 'Rascunho',
    modulo: 'teste',
    titulo: '12',
    tipo: 'Arquivo',
  },
  {
    id: 5,
    ordem: 3,
    status: 'Rascunho',
    modulo: 'teste',
    titulo: '12',
    tipo: 'Arquivo',
  },
]

export default function Aulas() {
  // State
  const [aulas, setAulas] = useState<Aula[]>(sampleAulas)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentStep, setCurrentStep] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const itemsPerPage = 10

  // Form state
  const [formData, setFormData] = useState({
    status: 'Rascunho' as 'Rascunho' | 'Publicado',
    professor: '',
    titulo: '',
    modulo: '',
    descricao: '',
    tipoConteudo: 'Biblioteca' as 'Biblioteca' | 'Novo',
    selectedContent: null,
  })

  // Handlers
  const handleOpenDialog = () => {
    setIsDialogOpen(true)
    setCurrentStep(1)
    setFormData({
      status: 'Rascunho',
      professor: '',
      titulo: '',
      modulo: '',
      descricao: '',
      tipoConteudo: 'Biblioteca',
      selectedContent: null,
    })
    setUploading(false)
    setUploadProgress(0)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleNextStep = () => {
    setCurrentStep(2)
  }

  const handlePrevStep = () => {
    setCurrentStep(1)
  }

  const handleFinish = () => {
    // Here we would normally save the class
    const newAula: Aula = {
      id: Math.max(...aulas.map((a) => a.id), 0) + 1,
      ordem: aulas.length + 1,
      status: formData.status,
      modulo: formData.modulo,
      titulo: formData.titulo,
      tipo: 'Arquivo',
    }

    setAulas([...aulas, newAula])
    handleCloseDialog()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleStatusChange = (value: 'Rascunho' | 'Publicado') => {
    setFormData({
      ...formData,
      status: value,
    })
  }

  const handleTipoConteudoChange = (value: 'Biblioteca' | 'Novo') => {
    setFormData({
      ...formData,
      tipoConteudo: value,
    })
  }

  const handleFileUpload = () => {
    setUploading(true)

    // Simulate file upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 1
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setUploading(false)
      }
    }, 50)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Group aulas by module
  const aulasByModule = aulas.reduce(
    (acc, aula) => {
      if (!acc[aula.modulo]) {
        acc[aula.modulo] = []
      }
      acc[aula.modulo].push(aula)
      return acc
    },
    {} as Record<string, Aula[]>
  )

  // State for view mode
  const [viewMode, setViewMode] = useState<'table' | 'list'>('table')

  // State to track the dragged aula and target position
  const [draggedItem, setDraggedItem] = useState<Aula | null>(null)
  const [hoveredItem, setHoveredItem] = useState<Aula | null>(null)

  const handleDragStart = (aula: Aula) => {
    setDraggedItem(aula)
  }

  const handleDragOver = (e: React.DragEvent, aula: Aula) => {
    e.preventDefault()
    setHoveredItem(aula)
  }

  const handleDrop = (e: React.DragEvent, targetAula: Aula) => {
    e.preventDefault()
    if (!draggedItem) return

    // Create a new array with the updated order
    const updatedAulas = [...aulas]
    const draggedIndex = updatedAulas.findIndex((a) => a.id === draggedItem.id)
    const targetIndex = updatedAulas.findIndex((a) => a.id === targetAula.id)

    // Only reorder if in the same module
    if (
      draggedItem.modulo === targetAula.modulo &&
      draggedIndex !== targetIndex
    ) {
      // Remove the dragged item
      const [removed] = updatedAulas.splice(draggedIndex, 1)
      // Insert at the target position
      updatedAulas.splice(targetIndex, 0, removed)

      // Update the ordem property
      const moduleAulas = updatedAulas.filter(
        (a) => a.modulo === targetAula.modulo
      )
      moduleAulas.forEach((aula, index) => {
        aula.ordem = index + 1
      })

      setAulas(updatedAulas)
    }

    setDraggedItem(null)
    setHoveredItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setHoveredItem(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-primary text-xl font-medium mb-1">Aulas</h2>
        <p className="text-gray-600 mb-4">Crie e organize suas aulas.</p>

        {/* Action buttons */}
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              className="gap-2"
              onClick={() => setViewMode('list')}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6H20M9 12H20M9 18H20M5 6V6.01M5 12V12.01M5 18V18.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              LISTAR
            </Button>
            <Button variant="outline" className="gap-2">
              <Copy className="h-4 w-4" />
              COPIAR
            </Button>
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              CONFIGURAR
            </Button>
          </div>

          <Button
            onClick={handleOpenDialog}
            className="bg-primary hover:bg-primary/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            NOVO
          </Button>
        </div>

        {viewMode === 'table' ? (
          <>
            {/* Search bar - only in table view */}
            <div className="flex mb-4">
              <div className="relative w-full max-w-md">
                <Input
                  type="text"
                  placeholder="Pesquisar por aulas..."
                  className="pr-10 w-full"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Aulas Table */}
            <Card className="shadow-sm border-0 rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </TableHead>
                      <TableHead className="uppercase">ID</TableHead>
                      <TableHead className="uppercase">ORDEM</TableHead>
                      <TableHead className="uppercase">STATUS</TableHead>
                      <TableHead className="uppercase">MÓDULO</TableHead>
                      <TableHead className="uppercase">AULA</TableHead>
                      <TableHead className="uppercase">TIPO</TableHead>
                      <TableHead className="uppercase">OPÇÕES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aulas.length > 0 ? (
                      aulas.map((aula) => (
                        <TableRow key={aula.id}>
                          <TableCell>
                            <input
                              type="checkbox"
                              className="rounded border-gray-300"
                            />
                          </TableCell>
                          <TableCell>{aula.id}</TableCell>
                          <TableCell>{aula.ordem}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                aula.status === 'Publicado'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {aula.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-primary">
                            {aula.modulo}
                          </TableCell>
                          <TableCell className="font-medium">
                            {aula.titulo}
                          </TableCell>
                          <TableCell>{aula.tipo}</TableCell>
                          <TableCell>
                            <div className="flex justify-end">
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <p>Não há dados</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Pagination */}
            {aulas.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-600">
                  Total de {aulas.length} registros.
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    &lt;
                  </Button>
                  <span className="px-4 py-2 bg-white border rounded">
                    {currentPage}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={aulas.length <= itemsPerPage}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    &gt;
                  </Button>
                  <Select defaultValue="10">
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="10 / página" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 / página</SelectItem>
                      <SelectItem value="25">25 / página</SelectItem>
                      <SelectItem value="50">50 / página</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </>
        ) : (
          // List view (organized by modules)
          <div className="space-y-4">
            {Object.entries(aulasByModule).map(([moduleName, moduleAulas]) => (
              <div
                key={moduleName}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-primary font-medium">
                    Módulo: {moduleName} | Ordem: {moduleAulas[0]?.ordem || 1}
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {moduleAulas.map((aula) => (
                    <div
                      key={aula.id}
                      className={`p-4 flex items-center cursor-move ${
                        draggedItem?.id === aula.id
                          ? 'opacity-50'
                          : hoveredItem?.id === aula.id
                            ? 'bg-blue-50'
                            : ''
                      }`}
                      draggable
                      onDragStart={() => handleDragStart(aula)}
                      onDragOver={(e) => handleDragOver(e, aula)}
                      onDrop={(e) => handleDrop(e, aula)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="flex-grow">
                        <p className="text-gray-700">Aula: {aula.titulo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Class Dialog - Multi-step */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-5xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium text-white bg-primary -m-6 p-6">
              Nova aula
            </DialogTitle>
          </DialogHeader>

          {/* Step Indicator */}
          <div className="flex items-center w-full mt-4">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'
                }`}
              >
                {currentStep > 1 ? <Check className="h-4 w-4" /> : 1}
              </div>
              <span className="ml-2 font-medium">Informações</span>
            </div>
            <div className="flex-1 h-px mx-4 bg-gray-300"></div>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'
                }`}
              >
                2
              </div>
              <span className="ml-2 font-medium">Conteúdo</span>
            </div>
          </div>

          {/* Step 1: Informações */}
          {currentStep === 1 && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={
                      formData.status === 'Rascunho' ? 'default' : 'outline'
                    }
                    onClick={() => handleStatusChange('Rascunho')}
                    className={
                      formData.status === 'Rascunho'
                        ? 'bg-primary text-white'
                        : ''
                    }
                  >
                    Rascunho
                  </Button>
                  <Button
                    type="button"
                    variant={
                      formData.status === 'Publicado' ? 'default' : 'outline'
                    }
                    onClick={() => handleStatusChange('Publicado')}
                    className={
                      formData.status === 'Publicado'
                        ? 'bg-primary text-white'
                        : ''
                    }
                  >
                    Publicado
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <Label>Professor</Label>
                </div>
                <Select
                  value={formData.professor}
                  onValueChange={(value) =>
                    handleInputChange('professor', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um professor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Roberto Monteiro">
                      Roberto Monteiro
                    </SelectItem>
                    <SelectItem value="Ana Silva">Ana Silva</SelectItem>
                    <SelectItem value="Carlos Oliveira">
                      Carlos Oliveira
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>
                    <Label>Título</Label>
                  </div>
                  <Input
                    placeholder="Defina um título para a aula"
                    value={formData.titulo}
                    onChange={(e) =>
                      handleInputChange('titulo', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-red-500 mr-1">*</span>
                    <Label>Módulo</Label>
                    <button className="ml-2 text-primary">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <Select
                    value={formData.modulo}
                    onValueChange={(value) =>
                      handleInputChange('modulo', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar módulo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teste">teste</SelectItem>
                      <SelectItem value="Módulo 1">Módulo 1</SelectItem>
                      <SelectItem value="Módulo 2">Módulo 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  placeholder="Escreva algum complemento sobre essa aula"
                  rows={4}
                  value={formData.descricao}
                  onChange={(e) =>
                    handleInputChange('descricao', e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {/* Step 2: Conteúdo */}
          {currentStep === 2 && (
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <Label>Tipo do conteúdo</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={
                      formData.tipoConteudo === 'Biblioteca'
                        ? 'default'
                        : 'outline'
                    }
                    onClick={() => handleTipoConteudoChange('Biblioteca')}
                    className={
                      formData.tipoConteudo === 'Biblioteca'
                        ? 'bg-primary text-white'
                        : ''
                    }
                  >
                    Biblioteca
                  </Button>
                  <Button
                    type="button"
                    variant={
                      formData.tipoConteudo === 'Novo' ? 'default' : 'outline'
                    }
                    onClick={() => handleTipoConteudoChange('Novo')}
                    className={
                      formData.tipoConteudo === 'Novo'
                        ? 'bg-primary text-white'
                        : ''
                    }
                  >
                    Novo
                  </Button>
                </div>
              </div>

              {formData.tipoConteudo === 'Biblioteca' ? (
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Pesquisar conteúdo"
                    className="w-full"
                  />

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </TableHead>
                        <TableHead className="uppercase">ID</TableHead>
                        <TableHead className="uppercase">STATUS</TableHead>
                        <TableHead className="uppercase">TÍTULO</TableHead>
                        <TableHead className="uppercase">TAMANHO</TableHead>
                        <TableHead className="uppercase">TIPO</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Publicado
                          </span>
                        </TableCell>
                        <TableCell>Aula exemplo</TableCell>
                        <TableCell>60.2 KB</TableCell>
                        <TableCell>Arquivo</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Publicado
                          </span>
                        </TableCell>
                        <TableCell>Aula exemplo</TableCell>
                        <TableCell>---</TableCell>
                        <TableCell>Video (URL)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-600">
                      Total de 2 registros.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" disabled={true}>
                        &lt;
                      </Button>
                      <span className="px-4 py-2 bg-white border rounded">
                        1
                      </span>
                      <Button variant="outline" size="icon" disabled={true}>
                        &gt;
                      </Button>
                      <Select defaultValue="10">
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="10 / página" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 / página</SelectItem>
                          <SelectItem value="25">25 / página</SelectItem>
                          <SelectItem value="50">50 / página</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {!uploading ? (
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center cursor-pointer hover:border-primary transition-colors"
                      onClick={handleFileUpload}
                    >
                      <div className="mx-auto flex flex-col items-center">
                        <svg
                          className="w-12 h-12 text-gray-400 mb-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="mb-2 text-lg font-medium text-gray-900">
                          Clique para fazer upload
                        </p>
                        <p className="text-sm text-gray-500">
                          ou arraste e solte seu arquivo aqui
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="relative mx-auto w-24 h-24 mb-4">
                        <div className="absolute inset-0">
                          <div className="h-full w-full rounded-full border-4 border-gray-200"></div>
                        </div>
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            clipPath: `circle(${uploadProgress}% at center)`,
                          }}
                        >
                          <div className="h-full w-full rounded-full border-4 border-primary"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-medium">
                            {uploadProgress}%
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Verificando as propriedades do arquivo...
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            {currentStep === 1 ? (
              <>
                <Button variant="outline" onClick={handleCloseDialog}>
                  CANCELAR
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleNextStep}
                  disabled={
                    !formData.professor || !formData.titulo || !formData.modulo
                  }
                >
                  PRÓXIMO
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleCloseDialog}>
                  CANCELAR
                </Button>
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  className="flex items-center"
                >
                  <SlashIcon className="h-4 w-4 mr-2 rotate-180" />
                  ANTERIOR
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90 flex items-center"
                  onClick={handleFinish}
                >
                  <Check className="h-4 w-4 mr-2" />
                  CONCLUIR
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
