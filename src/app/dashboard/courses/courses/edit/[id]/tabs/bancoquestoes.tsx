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
import { Plus, MoreVertical } from 'lucide-react'

// Question interface
interface Questao {
  id: number
  ordem: number
  pergunta: string
  tipo: 'Múltipla escolha' | 'Verdadeiro/Falso' | 'Dissertativa'
}

export default function BancoQuestoes() {
  // State
  const [questoes, setQuestoes] = useState<Questao[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Form state
  const [formData, setFormData] = useState<{
    pergunta: string
    tipo: 'Múltipla escolha' | 'Verdadeiro/Falso' | 'Dissertativa'
    opcoes: string[]
    resposta: string
  }>({
    pergunta: '',
    tipo: 'Múltipla escolha',
    opcoes: ['', '', '', ''],
    resposta: '',
  })

  // Handler for opening the add question dialog
  const handleOpenDialog = () => {
    setIsDialogOpen(true)
    setFormData({
      pergunta: '',
      tipo: 'Múltipla escolha',
      opcoes: ['', '', '', ''],
      resposta: '',
    })
  }

  // Handler for closing the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  // Handler for saving the question
  const handleSaveQuestion = () => {
    if (formData.pergunta.trim()) {
      const newQuestao: Questao = {
        id:
          questoes.length > 0 ? Math.max(...questoes.map((q) => q.id)) + 1 : 1,
        ordem: questoes.length + 1,
        pergunta: formData.pergunta,
        tipo: formData.tipo,
      }

      setQuestoes([...questoes, newQuestao])
      handleCloseDialog()
    }
  }

  // Handler for search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handler for form input change
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  // Handler for option input change
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.opcoes]
    newOptions[index] = value
    setFormData({
      ...formData,
      opcoes: newOptions,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-primary text-xl font-medium mb-1">
          Banco de questões
        </h2>
        <p className="text-gray-600 mb-4">
          Insira aqui todas as perguntas que serão usadas em quiz ou provas.
        </p>

        <div className="flex justify-between mb-4">
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Pesquisar por questões..."
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
          <Button
            onClick={handleOpenDialog}
            className="bg-primary hover:bg-primary/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            NOVO
          </Button>
        </div>

        {/* Questions Table */}
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
                  <TableHead className="uppercase">PERGUNTA</TableHead>
                  <TableHead className="uppercase">TIPO</TableHead>
                  <TableHead className="uppercase">OPÇÕES</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questoes.length > 0 ? (
                  questoes.map((questao) => (
                    <TableRow key={questao.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </TableCell>
                      <TableCell>{questao.id}</TableCell>
                      <TableCell>{questao.ordem}</TableCell>
                      <TableCell className="font-medium">
                        {questao.pergunta}
                      </TableCell>
                      <TableCell>{questao.tipo}</TableCell>
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
                    <TableCell colSpan={6} className="text-center py-8">
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
                              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
        {questoes.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Total de {questoes.length} registros.
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
                disabled={questoes.length <= itemsPerPage}
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

      {/* Add Question Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              Nova questão
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Tipo de questão</Label>
              <Select
                value={formData.tipo}
                onValueChange={(
                  value:
                    | 'Múltipla escolha'
                    | 'Verdadeiro/Falso'
                    | 'Dissertativa'
                ) => handleInputChange('tipo', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de questão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Múltipla escolha">
                    Múltipla escolha
                  </SelectItem>
                  <SelectItem value="Verdadeiro/Falso">
                    Verdadeiro/Falso
                  </SelectItem>
                  <SelectItem value="Dissertativa">Dissertativa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-red-500 mr-1">*</span>
                <Label>Pergunta</Label>
              </div>
              <Textarea
                placeholder="Digite sua pergunta aqui"
                rows={3}
                value={formData.pergunta}
                onChange={(e) => handleInputChange('pergunta', e.target.value)}
                className="resize-none"
              />
            </div>

            {formData.tipo === 'Múltipla escolha' && (
              <div className="space-y-4">
                <Label>Opções de resposta</Label>
                {formData.opcoes.map((opcao, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-none">
                      <input
                        type="radio"
                        name="resposta"
                        className="mr-2"
                        checked={formData.resposta === index.toString()}
                        onChange={() =>
                          handleInputChange('resposta', index.toString())
                        }
                      />
                    </div>
                    <Input
                      placeholder={`Opção ${index + 1}`}
                      value={opcao}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      className="flex-grow"
                    />
                  </div>
                ))}
                <p className="text-sm text-gray-500">
                  Selecione a opção correta
                </p>
              </div>
            )}

            {formData.tipo === 'Verdadeiro/Falso' && (
              <div className="space-y-2">
                <Label>Resposta correta</Label>
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="vf"
                      className="mr-2"
                      checked={formData.resposta === 'verdadeiro'}
                      onChange={() =>
                        handleInputChange('resposta', 'verdadeiro')
                      }
                    />
                    <Label>Verdadeiro</Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="vf"
                      className="mr-2"
                      checked={formData.resposta === 'falso'}
                      onChange={() => handleInputChange('resposta', 'falso')}
                    />
                    <Label>Falso</Label>
                  </div>
                </div>
              </div>
            )}

            {formData.tipo === 'Dissertativa' && (
              <div className="space-y-2">
                <Label>Resposta modelo (opcional)</Label>
                <Textarea
                  placeholder="Digite uma resposta modelo para referência"
                  rows={3}
                  value={formData.resposta}
                  onChange={(e) =>
                    handleInputChange('resposta', e.target.value)
                  }
                  className="resize-none"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              CANCELAR
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleSaveQuestion}
              disabled={!formData.pergunta.trim()}
            >
              SALVAR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
