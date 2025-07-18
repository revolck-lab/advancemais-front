'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { Switch } from '@/components/ui/switch/switch'
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
import { Plus, MoreVertical, Settings } from 'lucide-react'

// Final Exam interface
interface ProvaFinal {
  id: number
  titulo: string
  status: 'Ativo' | 'Inativo'
  questoes: number
  notaMinima: number
  tempoLimite: string
  tentativasPermitidas: number
}

export default function ProvaFinal() {
  // State
  const [provas, setProvas] = useState<ProvaFinal[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Form state
  const [formData, setFormData] = useState<ProvaFinal>({
    id: 0,
    titulo: '',
    status: 'Ativo',
    questoes: 10,
    notaMinima: 70,
    tempoLimite: '60',
    tentativasPermitidas: 3,
  })

  // Config state
  const [configData, setConfigData] = useState({
    embaralharQuestoes: true,
    mostrarRespostas: false,
    limiteTempo: true,
    tempoLimiteMinutos: 60,
    notaMinima: 70,
    tentativasPermitidas: 3,
    exibirProvaAprovado: true,
  })

  // Handler for search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handler for opening the new exam dialog
  const handleOpenDialog = () => {
    setIsDialogOpen(true)
    setFormData({
      id: provas.length > 0 ? Math.max(...provas.map((p) => p.id)) + 1 : 1,
      titulo: '',
      status: 'Ativo',
      questoes: 10,
      notaMinima: 70,
      tempoLimite: '60',
      tentativasPermitidas: 3,
    })
  }

  // Handler for closing the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  // Handler for opening the config dialog
  const handleOpenConfigDialog = () => {
    setIsConfigDialogOpen(true)
  }

  // Handler for closing the config dialog
  const handleCloseConfigDialog = () => {
    setIsConfigDialogOpen(false)
  }

  // Handler for saving the exam
  const handleSaveExam = () => {
    if (formData.titulo.trim()) {
      setProvas([...provas, formData])
      handleCloseDialog()
    }
  }

  // Handler for saving the config
  const handleSaveConfig = () => {
    // In a real app, this would save the configuration
    handleCloseConfigDialog()
  }

  // Handler for form input change
  const handleInputChange = (
    field: keyof ProvaFinal,
    value: string | number | boolean
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  // Handler for config input change
  const handleConfigChange = (
    field: keyof typeof configData,
    value: string | number | boolean
  ) => {
    setConfigData({
      ...configData,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-primary text-xl font-medium mb-1">Prova final</h2>
        <p className="text-gray-600 mb-4">
          Configure a prova final do curso para avaliar os alunos.
        </p>

        <div className="flex justify-between mb-4">
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Pesquisar provas..."
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
              onClick={handleOpenConfigDialog}
            >
              <Settings className="h-4 w-4" />
              CONFIGURAR
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

        {/* Final Exams Table */}
        <Card className="shadow-sm border-0 rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="uppercase">TÍTULO</TableHead>
                  <TableHead className="uppercase">STATUS</TableHead>
                  <TableHead className="uppercase">QUESTÕES</TableHead>
                  <TableHead className="uppercase">NOTA MÍNIMA</TableHead>
                  <TableHead className="uppercase">TEMPO LIMITE</TableHead>
                  <TableHead className="uppercase">TENTATIVAS</TableHead>
                  <TableHead className="uppercase">OPÇÕES</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {provas.length > 0 ? (
                  provas.map((prova) => (
                    <TableRow key={prova.id}>
                      <TableCell className="font-medium">
                        {prova.titulo}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            prova.status === 'Ativo'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {prova.status}
                        </span>
                      </TableCell>
                      <TableCell>{prova.questoes}</TableCell>
                      <TableCell>{prova.notaMinima}%</TableCell>
                      <TableCell>{prova.tempoLimite} min</TableCell>
                      <TableCell>{prova.tentativasPermitidas}</TableCell>
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
        {provas.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Total de {provas.length} registros.
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
                disabled={provas.length <= itemsPerPage}
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

      {/* New Exam Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              Nova prova final
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-red-500 mr-1">*</span>
                <Label>Título</Label>
              </div>
              <Input
                placeholder="Digite o título da prova"
                value={formData.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={formData.status === 'Ativo' ? 'default' : 'outline'}
                  onClick={() => handleInputChange('status', 'Ativo')}
                  className={
                    formData.status === 'Ativo' ? 'bg-primary text-white' : ''
                  }
                >
                  Ativo
                </Button>
                <Button
                  type="button"
                  variant={
                    formData.status === 'Inativo' ? 'default' : 'outline'
                  }
                  onClick={() => handleInputChange('status', 'Inativo')}
                  className={
                    formData.status === 'Inativo' ? 'bg-primary text-white' : ''
                  }
                >
                  Inativo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Número de questões</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.questoes}
                  onChange={(e) =>
                    handleInputChange('questoes', parseInt(e.target.value) || 0)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Nota mínima (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.notaMinima}
                  onChange={(e) =>
                    handleInputChange(
                      'notaMinima',
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Tempo limite (minutos)</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.tempoLimite}
                  onChange={(e) =>
                    handleInputChange('tempoLimite', e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Tentativas permitidas</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.tentativasPermitidas}
                  onChange={(e) =>
                    handleInputChange(
                      'tentativasPermitidas',
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              CANCELAR
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleSaveExam}
              disabled={!formData.titulo.trim()}
            >
              SALVAR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Configuration Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              Configurações da prova
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="embaralharQuestoes" className="flex-grow">
                Embaralhar questões
              </Label>
              <Switch
                id="embaralharQuestoes"
                checked={configData.embaralharQuestoes}
                onCheckedChange={(checked) =>
                  handleConfigChange('embaralharQuestoes', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="mostrarRespostas" className="flex-grow">
                Mostrar respostas corretas após envio
              </Label>
              <Switch
                id="mostrarRespostas"
                checked={configData.mostrarRespostas}
                onCheckedChange={(checked) =>
                  handleConfigChange('mostrarRespostas', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="limiteTempo" className="flex-grow">
                Limite de tempo
              </Label>
              <Switch
                id="limiteTempo"
                checked={configData.limiteTempo}
                onCheckedChange={(checked) =>
                  handleConfigChange('limiteTempo', checked)
                }
              />
            </div>

            {configData.limiteTempo && (
              <div className="space-y-2 pl-4">
                <Label>Tempo limite (minutos)</Label>
                <Input
                  type="number"
                  min="1"
                  value={configData.tempoLimiteMinutos}
                  onChange={(e) =>
                    handleConfigChange(
                      'tempoLimiteMinutos',
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Nota mínima para aprovação (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={configData.notaMinima}
                onChange={(e) =>
                  handleConfigChange(
                    'notaMinima',
                    parseInt(e.target.value) || 0
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Tentativas permitidas</Label>
              <Input
                type="number"
                min="1"
                value={configData.tentativasPermitidas}
                onChange={(e) =>
                  handleConfigChange(
                    'tentativasPermitidas',
                    parseInt(e.target.value) || 0
                  )
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="exibirProvaAprovado" className="flex-grow">
                Exibir prova novamente para alunos aprovados
              </Label>
              <Switch
                id="exibirProvaAprovado"
                checked={configData.exibirProvaAprovado}
                onCheckedChange={(checked) =>
                  handleConfigChange('exibirProvaAprovado', checked)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseConfigDialog}>
              CANCELAR
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleSaveConfig}
            >
              SALVAR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
