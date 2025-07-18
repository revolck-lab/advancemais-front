'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
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
import { Plus, Trash2 } from 'lucide-react'

// Colaborador interface
interface Colaborador {
  nome: string
  tipo: string
  aulasAssociadas: number
  modulosAssociados: number
}

export default function Colaboradores() {
  // State
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([
    {
      nome: 'Roberto Monteiro',
      tipo: 'Professor',
      aulasAssociadas: 0,
      modulosAssociados: 0,
    },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedColaborador, setSelectedColaborador] = useState('')
  const [selectedTipo, setSelectedTipo] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Handlers
  const handleRemoveColaborador = (nome: string) => {
    setColaboradores(
      colaboradores.filter((colaborador) => colaborador.nome !== nome)
    )
  }

  const handleSaveColaborador = () => {
    if (selectedColaborador && selectedTipo) {
      const newColaborador: Colaborador = {
        nome: selectedColaborador,
        tipo: selectedTipo,
        aulasAssociadas: 0,
        modulosAssociados: 0,
      }
      setColaboradores([...colaboradores, newColaborador])
      handleCloseDialog()
    }
  }

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
    setSelectedColaborador('')
    setSelectedTipo('')
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-primary text-xl font-medium mb-1">Colaboradores</h2>
        <p className="text-gray-600 mb-4">
          Defina os colaboradores deste curso. Clique para editar
        </p>

        <div className="flex justify-end mb-4">
          <Button
            onClick={handleOpenDialog}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-1" />
            NOVO
          </Button>
        </div>

        {/* Colaboradores Table */}
        <Card className="shadow-sm border-0 rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="uppercase">Colaborador</TableHead>
                  <TableHead className="uppercase">Tipo</TableHead>
                  <TableHead className="uppercase">Aulas Associadas</TableHead>
                  <TableHead className="uppercase">
                    Módulos Associados
                  </TableHead>
                  <TableHead className="uppercase">Remover</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {colaboradores.length > 0 ? (
                  colaboradores.map((colaborador) => (
                    <TableRow key={colaborador.nome}>
                      <TableCell className="font-medium text-primary">
                        {colaborador.nome}
                      </TableCell>
                      <TableCell>{colaborador.tipo}</TableCell>
                      <TableCell>{colaborador.aulasAssociadas}</TableCell>
                      <TableCell>{colaborador.modulosAssociados}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleRemoveColaborador(colaborador.nome)
                          }
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
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
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
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
        {colaboradores.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Total de {colaboradores.length} registros.
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
                disabled={colaboradores.length <= itemsPerPage}
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

      {/* Add Colaborador Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              Adicionar colaborador
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-red-500 mr-1">*</span>
                <Label>Colaborador</Label>
              </div>
              <Input
                placeholder="Pesquise por um colaborador..."
                value={selectedColaborador}
                onChange={(e) => setSelectedColaborador(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-red-500 mr-1">*</span>
                <Label>Tipo</Label>
              </div>
              <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Tutor">Tutor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              CANCELAR
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleSaveColaborador}
              disabled={!selectedColaborador || !selectedTipo}
            >
              SALVAR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
