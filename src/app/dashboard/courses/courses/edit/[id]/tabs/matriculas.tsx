'use client'

import { useState, useRef } from 'react'
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
import {
  Send,
  Download,
  Bold,
  Italic,
  Underline,
  Link,
  FileText,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  MoreHorizontal,
  Undo,
  Redo,
} from 'lucide-react'

// Enrollment interface
interface Matricula {
  id: number
  nome: string
  progresso: number
  inicio: string
  ultimoAcesso: string
  acessos: number
}

// Sample data
const sampleMatriculas: Matricula[] = [
  {
    id: 1,
    nome: 'Roberto Monteiro',
    progresso: 0,
    inicio: '06/04/2025',
    ultimoAcesso: '06/04/2025 17:50',
    acessos: 0,
  },
]

export default function Matriculas() {
  // State
  const [matriculas] = useState<Matricula[]>(sampleMatriculas)
  const [isCommunicationDialogOpen, setIsCommunicationDialogOpen] =
    useState(false)
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Communication form state
  const [communicationForm, setCommunicationForm] = useState({
    status: 'Ativo',
    tipoAndamento: 'Todos',
    mensagem: '',
  })

  // Editor ref
  const editorRef = useRef<HTMLDivElement>(null)

  // Handler for search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Open communication dialog
  const handleOpenCommunicationDialog = () => {
    setIsCommunicationDialogOpen(true)
    setCommunicationForm({
      status: 'Ativo',
      tipoAndamento: 'Todos',
      mensagem: '',
    })
  }

  // Close communication dialog
  const handleCloseCommunicationDialog = () => {
    setIsCommunicationDialogOpen(false)
  }

  // Send communication
  const handleSendCommunication = () => {
    // This would typically send the communication to the enrolled students
    // For now, we'll just close the dialog
    handleCloseCommunicationDialog()
  }

  // Toggle export menu
  const handleToggleExportMenu = () => {
    setIsExportMenuOpen(!isExportMenuOpen)
  }

  // Export attendance
  const handleExportAttendance = () => {
    // This would typically export the attendance data
    setIsExportMenuOpen(false)
  }

  // Export progress
  const handleExportProgress = () => {
    // This would typically export the progress data
    setIsExportMenuOpen(false)
  }

  // Handle form input change
  const handleFormInputChange = (field: string, value: string) => {
    setCommunicationForm({
      ...communicationForm,
      [field]: value,
    })
  }

  // Apply formatting to editor
  const applyFormatting = (format: string) => {
    if (!editorRef.current) return

    // This is a simplified example. In a real app, you would use a rich text editor library
    document.execCommand(format, false, undefined)
    editorRef.current.focus()
  }

  // Monitor character count in the editor
  const countCharacters = () => {
    if (!editorRef.current) return 0
    return editorRef.current.textContent?.length || 0
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-primary text-xl font-medium mb-1">Matrículas</h2>
        <p className="text-gray-600 mb-4">
          Acompanhe o progresso dos alunos matriculados neste curso.
        </p>

        <div className="flex justify-between mb-4">
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Pesquisar por alunos..."
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
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleOpenCommunicationDialog}
            >
              <Send className="h-4 w-4" />
              ENVIAR COMUNICADO
            </Button>
            <div className="relative">
              <Button
                className="bg-primary hover:bg-primary/90 gap-2"
                onClick={handleToggleExportMenu}
              >
                <Download className="h-4 w-4" />
                EXPORTAR
              </Button>
              {isExportMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleExportAttendance}
                    >
                      Exportar Presença
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleExportProgress}
                    >
                      Exportar Progresso
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enrollments Table */}
        <Card className="shadow-sm border-0 rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="uppercase">NOME</TableHead>
                  <TableHead className="uppercase">PROGRESSO</TableHead>
                  <TableHead className="uppercase">INÍCIO</TableHead>
                  <TableHead className="uppercase">ÚLTIMO ACESSO</TableHead>
                  <TableHead className="uppercase">ACESSOS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matriculas.length > 0 ? (
                  matriculas.map((matricula) => (
                    <TableRow key={matricula.id}>
                      <TableCell className="font-medium text-primary">
                        {matricula.nome}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${matricula.progresso}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm">
                            {matricula.progresso}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{matricula.inicio}</TableCell>
                      <TableCell>{matricula.ultimoAcesso}</TableCell>
                      <TableCell>{matricula.acessos}</TableCell>
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
        {matriculas.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Total de {matriculas.length} registros.
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
                disabled={matriculas.length <= itemsPerPage}
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

      {/* Communication Dialog */}
      <Dialog
        open={isCommunicationDialogOpen}
        onOpenChange={setIsCommunicationDialogOpen}
      >
        <DialogContent className="sm:max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium text-white bg-primary -m-6 p-6">
              Enviar comunicado
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <Label>Status</Label>
                </div>
                <Select
                  value={communicationForm.status}
                  onValueChange={(value) =>
                    handleFormInputChange('status', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <Label>Tipo de andamento</Label>
                </div>
                <Select
                  value={communicationForm.tipoAndamento}
                  onValueChange={(value) =>
                    handleFormInputChange('tipoAndamento', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Iniciantes">Iniciantes</SelectItem>
                    <SelectItem value="Intermediários">
                      Intermediários
                    </SelectItem>
                    <SelectItem value="Avançados">Avançados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-red-500 mr-1">*</span>
                <Label>Mensagem</Label>
              </div>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-white p-2 border-b flex flex-wrap gap-1">
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => applyFormatting('bold')}
                  >
                    <Bold size={18} />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => applyFormatting('italic')}
                  >
                    <Italic size={18} />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => applyFormatting('underline')}
                  >
                    <Underline size={18} />
                  </button>
                  <div className="mx-1 w-px bg-gray-300"></div>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => applyFormatting('formatBlock')}
                  >
                    <AlignLeft size={18} />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => applyFormatting('formatBlock')}
                  >
                    <AlignCenter size={18} />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => applyFormatting('formatBlock')}
                  >
                    <AlignRight size={18} />
                  </button>
                  <div className="mx-1 w-px bg-gray-300"></div>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => applyFormatting('insertOrderedList')}
                  >
                    <ListOrdered size={18} />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => applyFormatting('insertUnorderedList')}
                  >
                    <List size={18} />
                  </button>
                  <div className="mx-1 w-px bg-gray-300"></div>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => applyFormatting('createLink')}
                  >
                    <Link size={18} />
                  </button>

                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => applyFormatting('insertHTML')}
                  >
                    <FileText size={18} />
                  </button>
                  <div className="mx-1 w-px bg-gray-300"></div>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => applyFormatting('undo')}
                  >
                    <Undo size={18} />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => applyFormatting('redo')}
                  >
                    <Redo size={18} />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => {}}
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                <div
                  ref={editorRef}
                  className="min-h-[150px] p-3 focus:outline-none"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={() => {
                    // Update character count
                    setCommunicationForm({
                      ...communicationForm,
                      mensagem: editorRef.current?.innerHTML || '',
                    })
                  }}
                ></div>
                <div className="p-2 text-right text-sm text-gray-500">
                  Caracteres: {countCharacters()}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseCommunicationDialog}>
              CANCELAR
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleSendCommunication}
            >
              ENVIAR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
