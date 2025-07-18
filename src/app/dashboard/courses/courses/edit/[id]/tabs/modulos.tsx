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
import { Plus, Copy } from 'lucide-react'

// Module interface
interface Modulo {
  id: number
  ordem: number
  status: 'Rascunho' | 'Publicado'
  titulo: string
  professor: string
  cargaHoraria?: string
  descricao?: string
}

export default function Modulos() {
  // State
  const [modulos, setModulos] = useState<Modulo[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Form state
  const [novoModulo, setNovoModulo] = useState<Omit<Modulo, 'id' | 'ordem'>>({
    status: 'Rascunho',
    titulo: '',
    professor: '',
    cargaHoraria: '',
    descricao: '',
  })

  // Handlers
  const handleOpenDialog = () => {
    setNovoModulo({
      status: 'Rascunho',
      titulo: '',
      professor: '',
      cargaHoraria: '',
      descricao: '',
    })
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleSaveModulo = () => {
    if (novoModulo.titulo && novoModulo.professor) {
      const newModulo: Modulo = {
        id: modulos.length + 1,
        ordem: modulos.length + 1,
        ...novoModulo,
      }
      setModulos([...modulos, newModulo])
      handleCloseDialog()
    }
  }

  const handleInputChange = (
    field: keyof Omit<Modulo, 'id' | 'ordem'>,
    value: string
  ) => {
    setNovoModulo({
      ...novoModulo,
      [field]: value,
    })
  }

  const handleStatusChange = (value: 'Rascunho' | 'Publicado') => {
    setNovoModulo({
      ...novoModulo,
      status: value,
    })
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-primary text-xl font-medium mb-1">Módulos</h2>
        <p className="text-gray-600 mb-4">
          Crie módulos e organize suas aulas por tópicos.
        </p>

        <div className="flex justify-between mb-4">
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Pesquisar por módulos..."
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
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Copy className="h-4 w-4" />
              COPIAR
            </Button>
            <Button
              onClick={handleOpenDialog}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Plus className="h-4 w-4" />
              NOVO
            </Button>
          </div>
        </div>

        {/* Módulos Table */}
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
                  <TableHead className="uppercase">PROFESSOR</TableHead>
                  <TableHead className="uppercase">OPÇÕES</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modulos.length > 0 ? (
                  modulos.map((modulo) => (
                    <TableRow key={modulo.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </TableCell>
                      <TableCell>{modulo.id}</TableCell>
                      <TableCell>{modulo.ordem}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            modulo.status === 'Publicado'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {modulo.status}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">
                        {modulo.titulo}
                      </TableCell>
                      <TableCell>{modulo.professor}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
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
        {modulos.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Total de {modulos.length} registros.
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
                disabled={modulos.length <= itemsPerPage}
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
      </div>

      {/* New Module Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              Novo módulo
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <Label>Status</Label>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={
                      novoModulo.status === 'Rascunho' ? 'default' : 'outline'
                    }
                    onClick={() => handleStatusChange('Rascunho')}
                    size="sm"
                    className={
                      novoModulo.status === 'Rascunho'
                        ? 'bg-primary text-white'
                        : ''
                    }
                  >
                    Rascunho
                  </Button>
                  <Button
                    type="button"
                    variant={
                      novoModulo.status === 'Publicado' ? 'default' : 'outline'
                    }
                    onClick={() => handleStatusChange('Publicado')}
                    size="sm"
                    className={
                      novoModulo.status === 'Publicado'
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
                <Input
                  placeholder="Pesquise um professor"
                  value={novoModulo.professor}
                  onChange={(e) =>
                    handleInputChange('professor', e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3 space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <Label>Título</Label>
                </div>
                <Input
                  placeholder="Defina um título"
                  value={novoModulo.titulo}
                  onChange={(e) => handleInputChange('titulo', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Carga horária</Label>
                <Input
                  value={novoModulo.cargaHoraria}
                  onChange={(e) =>
                    handleInputChange('cargaHoraria', e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                placeholder="Defina uma descrição"
                rows={4}
                value={novoModulo.descricao || ''}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              CANCELAR
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleSaveModulo}
              disabled={!novoModulo.titulo || !novoModulo.professor}
            >
              SALVAR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
